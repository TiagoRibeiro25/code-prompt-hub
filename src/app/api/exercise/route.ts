import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getUserIdOnServer } from "@/lib/session";
import validateSchema from "@/lib/validateSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const POST_REQUEST_SCHEMA = {
  type: "object",
  properties: {
    difficulty: { type: "number", minimum: 1, maximum: 5 },
  },
};

type PostRequestBody = {
  difficulty: number; // 1-5
};

export async function POST(req: NextRequest) {
  const requestBody: PostRequestBody = await req.json();
  const requestBodyValidation = validateSchema(
    POST_REQUEST_SCHEMA,
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

  const userId = await getUserIdOnServer(session);

  // TODO: Generate code from ChatGPT API
  const code = "console.log('Hello, World!');";
  console.log("difficulty:", requestBody.difficulty);
  console.log("code:", code);

  // Create exercise
  const exercise = await prisma.exercise.create({
    data: {
      user_id: userId,
      code,
      difficulty: requestBody.difficulty,
    },
  });

  return NextResponse.json(
    { message: "Exercise Created", exercise },
    { status: 201 }
  );
}
