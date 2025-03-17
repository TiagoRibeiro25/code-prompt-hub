"use client";

import { formatDateTime } from "@/lib/date";
import { Exercise } from "@prisma/client";
import React, { useState } from "react";

type Props = {
  exercise: Exercise;
};

const ExerciseAnswers: React.FC<Props> = ({ exercise }): React.JSX.Element => {
  const isExerciseFinished: boolean = !!exercise.ai_review;
  const [userAnswer, setUserAnswer] = useState<string>("");

  //TODO: Implement submit function

  return (
    <div className="lg:w-1/2 w-full md:px-16 px-4 py-8 lg:py-0">
      <div className="flex flex-row justify-between md:text-2xl text-lg text-gray-400">
        <span>Difficulty {exercise.difficulty}</span>
        <span>{formatDateTime(exercise.createdAt)}</span>
      </div>
      <h2 className="text-2xl font-bold mt-12 text-gray-300">
        Explain what the following piece of code does and how it works.
      </h2>
      <textarea
        className="w-full h-72 mt-8 bg-gray-800 text-gray-400 p-4 rounded-md focus:outline-none focus:border border-red-500"
        readOnly={isExerciseFinished}
        value={exercise.user_explanation || userAnswer}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          return setUserAnswer(e.target.value);
        }}
      />
      {!isExerciseFinished && (
        <button
          className="w-full mt-8 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 focus:outline-none"
          disabled={isExerciseFinished}
        >
          Submit
        </button>
      )}

      <hr className="my-8 border border-gray-700" />

      <h2 className="text-2xl font-bold mt-8 text-gray-300">Review by AI</h2>
      <textarea
        className="w-full h-72 mt-8 bg-gray-800 text-gray-400 p-4 rounded-md focus:outline-none focus:border border-red-500"
        value={exercise.ai_review || ""}
        readOnly
      />

      {isExerciseFinished && (
        <>
          <hr className="my-8 border border-gray-700" />

          <div className="flex flex-row justify-between md:text-2xl text-lg text-gray-400 mb-12">
            <span>Score {exercise.score}</span>
            <span>{formatDateTime(exercise.updatedAt)}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default ExerciseAnswers;
