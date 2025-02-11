import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import validateSchema from "@/lib/validateSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const PATCH_REQUEST_SCHEMA = {
  type: "object",
  properties: {
    review: { type: "string", minLength: 5, maxLength: 80 },
  },
};

type PatchRequestBody = {
  review: string;
};

export async function PATCH(req: NextRequest) {
  try {
    const requestBody: PatchRequestBody = await req.json();
    const requestBodyValidation = validateSchema(
      PATCH_REQUEST_SCHEMA,
      requestBody
    );

    if (!requestBodyValidation.isValid) {
      return NextResponse.json(
        { error: requestBodyValidation.error },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await prisma.user.findFirst({
      where: { email: session.user?.email as string },
      select: {
        id: true,
        review: true,
      },
    });

    if (!user) {
      // This should never happen
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Create/Update review
    await prisma.user.update({
      where: { id: user.id },
      data: {
        review: requestBody.review,
      },
    });

    return NextResponse.json({ message: "Review updated" }, { status: 200 });
  } catch (error) {
    console.log("500 error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
