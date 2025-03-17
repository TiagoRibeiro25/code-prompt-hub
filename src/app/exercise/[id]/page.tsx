import Code from "@/components/Code";
import RedirectTo404 from "@/components/RedirectTo404";
import { prisma } from "@/lib/prisma";
import type { Exercise } from "@prisma/client";
import React from "react";
import ExerciseAnswers from "./_components/ExerciseAnswers";

const Exercise = async ({
  params,
}: {
  params: { id: string };
}): Promise<React.JSX.Element> => {
  const { id } = await params;

  const exercise = await prisma.exercise.findUnique({
    where: { id },
  });

  if (!exercise) {
    return <RedirectTo404 />
  }

  return (
    <div className="min-h-screen pt-28 flex lg:flex-row flex-col">
      <Code
        className="lg:w-1/2 w-full lg:h-screen border border-red-500 rounded-md"
        code={exercise.code}
      />
      <ExerciseAnswers exercise={exercise} />
    </div>
  );
};

export default Exercise;
