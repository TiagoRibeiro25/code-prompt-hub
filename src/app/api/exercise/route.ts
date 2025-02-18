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

  // Check if the user has more than 5 uncompleted exercises
  const userUnfinishedExercises = await prisma.exercise.findMany({
    where: {
      user_id: userId,
      score: { equals: null },
    },
    select: { id: true },
  });

  if (userUnfinishedExercises.length >= 5) {
    return NextResponse.json(
      {
        error:
          "You have too many unfinished exercises. Complete or delete them before creating a new one.",
      },
      { status: 400 }
    );
  }

  // TODO: Generate code from ChatGPT API
  // const code = "console.log('Hello, World!');";
  const code = `function exercise(str) {
  return str.split('').reverse().join('');
  }
  `;
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
