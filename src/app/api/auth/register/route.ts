import { prisma } from "@/lib/prisma";
import validateSchema from "@/lib/validateSchema";
import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

const REQUEST_SCHEMA = {
  type: "object",
  properties: {
    name: { type: "string", minLength: 3, maxLength: 20 },
    email: { type: "string", format: "email", maxLength: 50 },
    password: { type: "string", minLength: 4, maxLength: 100 },
  },
  required: ["name", "email", "password"],
};

type RequestBody = {
  name: string;
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {
  try {
    const requestBody: RequestBody = await req.json();
    const requestBodyValidation = validateSchema(REQUEST_SCHEMA, requestBody);

    if (!requestBodyValidation.isValid) {
      return NextResponse.json(
        { error: requestBodyValidation.error },
        { status: 400 }
      );
    }

    const userEmail = requestBody.email.toLowerCase();

    // Check if there's an existing user with the same email
    const existingUser = await prisma.user.findFirst({
      where: { email: userEmail },
      select: { id: true },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "User with the same email already exists" },
        { status: 400 }
      );
    }

    // Create a new user with hashed password
    const hashedPassword = await bcrypt.hash(requestBody.password, 10);
    await prisma.user.create({
      data: {
        name: requestBody.name,
        email: userEmail,
        password: hashedPassword,
      },
    });

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.log("500 error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
