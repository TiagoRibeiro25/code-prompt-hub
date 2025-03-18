"use client";

import { formatDateTime } from "@/lib/date";
import { Exercise } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  ex: Exercise;
};

const ExerciseAnswers: React.FC<Props> = ({ ex }): React.JSX.Element => {
  const [isExerciseFinished, setIsExerciseFinished] = useState<boolean>(
    !!ex.ai_review,
  );
  const [exercise, setExercise] = useState<Exercise>(ex);
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleSubmit = async (): Promise<void> => {
    setLoading(true);

    try {
      const response = await fetch(`/api/exercise/${exercise.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ answer: exercise.user_explanation }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error, { theme: "dark" });
      } else {
        toast.success("Submitted successfully!", { theme: "dark" });
        setExercise((prev) => ({
          ...prev,
          ai_review: data.review,
          score: data.score,
          updatedAt: new Date(),
        }));
        setIsExerciseFinished(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (): Promise<void> => {
    setLoading(true);

    try {
      const response = await fetch(`/api/exercise/${exercise.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        toast.error(data.error, { theme: "dark" });
      } else {
        toast.success("Deleted successfully!", { theme: "dark" });
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }  

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
        value={exercise.user_explanation || ""}
        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
          return setExercise((prev) => ({
            ...prev,
            user_explanation: e.target.value,
          }));
        }}
      />
      {!isExerciseFinished && (
        <div className="flex flex-row space-x-12">
          <button
            className="w-full mt-8 py-2 bg-green-500 text-white font-bold rounded-md hover:bg-green-600 focus:outline-none disabled:opacity-50"
            disabled={loading || !exercise.user_explanation}
            onClick={handleSubmit}
          >
            {loading ? "Loading..." : "Submit"}
          </button>
          <button
            className="w-full mt-8 py-2 bg-red-500 text-white font-bold rounded-md hover:bg-red-600 focus:outline-none disabled:opacity-50"
            disabled={loading}
            onClick={handleDelete}
          >
            {loading ? "Loading..." : "Cancel"}
          </button>
        </div>
      )}

      <hr className="my-8 border border-gray-700" />

      <h2 className="text-2xl font-bold mt-8 text-gray-300">Review by AI</h2>
      <textarea
        className="w-full h-72 mt-8 bg-gray-800 text-gray-400 p-4 rounded-md focus:outline-none focus:border border-red-500"
        readOnly
        value={exercise.ai_review || ""}
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
