import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import Image from "next/image";
import React from "react";
import { FaRegUserCircle } from "react-icons/fa";

const LeaderboardPage: React.FC = async (): Promise<React.JSX.Element> => {
  const session = await getServerSession(authOptions);

  // Fetch all users and order them by experience
  const users = await prisma.user.findMany({
    orderBy: {
      experience: "desc",
    },
    select: {
      id: true,
      name: true,
      experience: true,
      user_image: true,
    },
  });

  // Get the top 10 users and format the data
  const leaderboard = users.slice(0, 10).map((user, index) => {
    return {
      id: user.id,
      name: user.name,
      experience: user.experience,
      user_image: user.user_image,
      position: index + 1,
    };
  });

  let loggedUser: { id: string } | null = null;
  if (session) {
    loggedUser = await prisma.user.findUnique({
      where: { email: session.user?.email as string },
      select: { id: true },
    });

    // Check if the logged user is in the top 10
    const loggedUserPosition = leaderboard.findIndex(
      (user) => user.id === loggedUser?.id
    );

    // If he's not in the top 10, get his position and add him to the leaderboard
    if (loggedUserPosition === -1) {
      const user = await prisma.user.findFirst({
        where: { email: session.user?.email as string },
        select: {
          id: true,
          name: true,
          experience: true,
          user_image: true,
        },
      });

      if (!user) {
        // This should never happen
        throw new Error("User not found");
      }

      const userPosition = users.findIndex((u) => u.id === user.id) + 1;

      leaderboard.push({
        id: user.id,
        name: user.name,
        experience: user.experience,
        user_image: user.user_image,
        position: userPosition,
      });
    }
  }

  return (
    <div className="max-w-screen-xl mx-auto px-4 py-20 min-h-screen">
      <h1 className="sm:text-7xl text-3xl font-bold text-center monolisa-font bg-gradient-to-r from-red-400 via-red-500 to-red-600 inline-block text-transparent bg-clip-text w-full">
        Leaderboard
      </h1>
      <p className="sm:text-2xl text-lg text-center text-gray-500">
        Top 10 users by experience
      </p>

      <div className="mt-12">
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-900 border border-gray-700 rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-800">
                <th className="py-3 px-6 text-left text-gray-300 font-bold">
                  Rank
                </th>
                <th className="py-3 px-6 text-left text-gray-300 font-bold">
                  User
                </th>
                <th className="py-3 px-6 text-left text-gray-300 font-bold">
                  Experience
                </th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user) => (
                <tr
                  key={user.id}
                  className={` hover:bg-gray-800 transition-colors ${
                    user.id === loggedUser?.id
                      ? "bg-gray-800 border-red-400 border"
                      : "border-gray-700"
                  }`}
                >
                  <td className="py-4 px-6 text-gray-300">{user.position}</td>
                  <td className="py-4 px-6 flex items-center">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden">
                      {user.user_image ? (
                        <Image
                          src={user.user_image?.cloudinary_image}
                          alt={user.name || "User"}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <FaRegUserCircle className="text-4xl cursor-pointer text-red-500" />
                      )}
                    </div>
                    <span className="ml-4 text-gray-300">{user.name}</span>
                  </td>
                  <td className="py-4 px-6 text-gray-300">
                    {user.experience} XP
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LeaderboardPage;
