"use client";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import { toast } from "react-toastify";

const CreateExercisePage: React.FC = (): React.JSX.Element => {
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleNewExercise = async (difficulty: number): Promise<void> => {
    setLoading(true);

    try {
      const response = await fetch("/api/exercise", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ difficulty }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error, { theme: "dark" });
      } else {
        toast.success("New exercise created!", { theme: "dark" });
        router.push(`/exercise/${data.exercise.id}`);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", { theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center flex-col">
      <h1 className="text-4xl font-bold text-center text-red-500">
        Choose a difficulty level for your new exercise
      </h1>
      <p className="text-gray-500 text-center mt-4">
        1 being the easiest and 5 the hardest
      </p>

      {loading ? (
        <div className="flex items-center justify-center mt-8">
          <AiOutlineLoading className="text-7xl text-red-500 animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-5 gap-4 mt-8">
          {[1, 2, 3, 4, 5].map((difficulty) => (
            <DifficultyButton
              key={difficulty}
              difficulty={difficulty}
              onClick={() => handleNewExercise(difficulty)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

type DifficultyButtonProps = {
  difficulty: number;
  onClick: () => void;
};

const DifficultyButton: React.FC<DifficultyButtonProps> = ({
  difficulty,
  onClick,
}): React.JSX.Element => {
  return (
    <button
      className="bg-gray-800 text-gray-300 p-4 rounded-lg border-2 hover:border-red-500 border-transparent"
      onClick={onClick}
    >
      <h3>{difficulty}</h3>
    </button>
  );
};

export default CreateExercisePage;
