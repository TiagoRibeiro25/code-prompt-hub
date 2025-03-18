import { reviewAnswer } from "@/lib/ai";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getUserIdOnServer } from "@/lib/session";
import validateSchema from "@/lib/validateSchema";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

const PATCH_REQUEST_SCHEMA = {
  type: "object",
  properties: {
    answer: { type: "string", minimum: 3, maximum: 1000 },
  },
};

type PatchRequestBody = {
  answer: string;
};

export async function PATCH(req: NextRequest) {
  try {
    const requestBody: PatchRequestBody = await req.json();
    const requestBodyValidation = validateSchema(
      PATCH_REQUEST_SCHEMA,
      requestBody,
    );

    if (!requestBodyValidation.isValid) {
      return NextResponse.json(
        { error: requestBodyValidation.error },
        { status: 400 },
      );
    }

    const parts = req.nextUrl.pathname.split("/");
    const exerciseId = parts[parts.length - 1];

    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = await getUserIdOnServer(session);

    const exercise = await prisma.exercise.findUnique({
      where: { id: exerciseId },
    });

    if (!exercise) {
      return NextResponse.json(
        { error: "Exercise not found" },
        { status: 404 },
      );
    }

    // Check if the exercise is from the user
    if (exercise.user_id !== userId) {
      return NextResponse.json(
        { error: "You are not allowed to access this exercise" },
        { status: 403 },
      );
    }

    const reviewResult = await reviewAnswer(exercise.code, requestBody.answer);

    await prisma.exercise.update({
      where: { id: exerciseId },
      data: {
        user_explanation: requestBody.answer,
        ai_review: reviewResult.review,
        score: reviewResult.score,
      },
    });

    return NextResponse.json(
      {
        review: reviewResult.review,
        score: reviewResult.score,
      },
      { status: 200 },
    );
  } catch (error) {
    console.log("500 error:", error);

    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
