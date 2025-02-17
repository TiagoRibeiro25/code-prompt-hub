import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getUserIdOnServer } from "@/lib/session";
import { getServerSession, Session } from "next-auth";
import Link from "next/link";
import React, { PropsWithChildren } from "react";
import { FaPlus } from "react-icons/fa6";

const UnfinishedExercises: React.FC = async (): Promise<React.JSX.Element> => {
  const session = (await getServerSession(authOptions)) as Session;
  const loggedUserId = await getUserIdOnServer(session);

  const exercises = await prisma.exercise.findMany({
    where: {
      user_id: loggedUserId,
      score: {
        equals: null,
      },
    },
    select: {
      id: true,
      difficulty: true,
      createdAt: true,
    },
  });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {exercises.map((exercise) => (
        <Button href={`/exercise/${exercise.id}`} key={exercise.id}>
          <p>Created at: {new Date(exercise.createdAt).toLocaleDateString()}</p>
          <h3>Difficulty: {exercise.difficulty}</h3>
        </Button>
      ))}

      <Button href="/exercise/create">
        <div className="flex justify-center items-center h-full">
          <FaPlus />
        </div>
      </Button>
    </div>
  );
};

type Props = PropsWithChildren & {
  href: string;
};

const Button: React.FC<Props> = ({ children, href }): React.JSX.Element => {
  return (
    <Link
      className="md:w-64 w-full bg-gray-800 text-gray-300 p-4 rounded-lg border-2 hover:border-red-500 border-transparent"
      href={href}
    >
      {children}
    </Link>
  );
};

export default UnfinishedExercises;
