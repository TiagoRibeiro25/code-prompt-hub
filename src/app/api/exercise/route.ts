import { generateExercise } from "@/lib/ai";
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
  try {
    const requestBody: PostRequestBody = await req.json();
    const requestBodyValidation = validateSchema(
      POST_REQUEST_SCHEMA,
      requestBody,
    );

    if (!requestBodyValidation.isValid) {
      return NextResponse.json(
        { error: requestBodyValidation.error },
        { status: 400 },
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
        { status: 400 },
      );
    }

    const code = await generateExercise(requestBody.difficulty);

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
      { status: 201 },
    );
  } catch (error) {
    console.log("500 error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
