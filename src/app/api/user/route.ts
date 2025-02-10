import { authOptions } from "@/lib/authOptions";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import validateSchema from "@/lib/validateSchema";
import bcrypt from "bcrypt";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const PUT_REQUEST_SCHEMA = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 3, maxLength: 20 },
    email: { type: "string", format: "email", maxLength: 50 },
    password: { type: "string", minLength: 4, maxLength: 100 },
    image: { type: "string", format: "base64" },
  },
};

type PutRequestBody = {
  name?: string;
  email?: string;
  password?: string;
  image?: string;
};

type PutContentToUpdate = {
  name?: string;
  email?: string;
  password?: string;
};

export async function PUT(req: NextRequest) {
  try {
    const requestBody: PutRequestBody = await req.json();
    const requestBodyValidation = validateSchema(
      PUT_REQUEST_SCHEMA,
      requestBody
    );

    if (!requestBodyValidation.isValid) {
      return NextResponse.json(
        { error: requestBodyValidation.error },
        { status: 400 }
      );
    }

    // Get the session
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findFirst({
      where: { email: session.user?.email as string },
      include: { user_image: true },
    });

    if (!user) {
      // This should never happen
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Handle user image update/creation
    if (requestBody.image) {
      // Check if the user has already an image, and if so, update it
      if (user.user_image) {
        const result = await cloudinary.uploader.upload(requestBody.image, {
          public_id: user.user_image?.cloudinary_id,
          overwrite: true,
          transformation: { width: 150, height: 150, crop: "limit" },
        });

        // Update the image in the database
        await prisma.userImage.update({
          where: { id: user.user_image?.id },
          data: {
            cloudinary_id: result.public_id,
            cloudinary_image: result.secure_url,
          },
        });
      } else {
        const folderName =
          process.env.NODE_ENV === "production" ? "prod" : "dev";

        // Create a new user image in the cloud storage
        const result = await cloudinary.uploader.upload(requestBody.image, {
          folder: `code_prompt_hub/${folderName}/users`,
          crop: "scale",
          transformation: { width: 150, height: 150, crop: "limit" },
        });

        // Create a new user image in the database
        await prisma.userImage.create({
          data: {
            cloudinary_id: result.public_id,
            cloudinary_image: result.secure_url,
            user_id: user.id,
          },
        });
      }
    }

    const contentToUpdate: PutContentToUpdate = {};

    if (requestBody.name) {
      contentToUpdate.name = requestBody.name;
    }

    if (requestBody.email) {
      contentToUpdate.email = requestBody.email;
    }

    if (requestBody.password) {
      const hashedPassword = await bcrypt.hash(requestBody.password, 10);
      contentToUpdate.password = hashedPassword;
    }

    // Check if the content has any data to update
    if (Object.keys(contentToUpdate).length === 0 && !requestBody.image) {
      return NextResponse.json(
        { message: "No content to update" },
        { status: 400 }
      );
    } else {
      await prisma.user.update({
        where: { id: user.id },
        data: contentToUpdate,
      });

      return NextResponse.json({ message: "User updated" }, { status: 200 });
    }
  } catch (error) {
    console.log("500 error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
