import { prisma } from "@/lib/prisma";
import React from "react";
import { Fade } from "react-awesome-reveal";
import { FaCrown, FaMedal, FaTrophy } from "react-icons/fa";

const Leaderboard: React.FC = async (): Promise<React.JSX.Element> => {
  const leaderboardDummyData = [
    { name: "Alice", score: 1200 },
    { name: "Bob", score: 1100 },
    { name: "Charlie", score: 1000 },
  ];

  let data = leaderboardDummyData;

  const users = await prisma.user.findMany({
    select: {
      name: true,
      experience: true,
    },
    orderBy: {
      experience: "desc",
    },
    take: 3,
  });

  if (users.length === 3) {
    data = users.map((user) => ({
      name: user.name,
      score: user.experience,
    }));
  }

  return (
    <>
      <Fade
        cascade
        duration={1000}
        delay={200}
        direction="up"
        triggerOnce
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-white">Leaderboard</h2>
        <p className="text-gray-500 mt-4">See who&apos;s on top!</p>
      </Fade>

      <div className="mt-12 flex flex-col md:flex-row gap-8">
        {data.map((user, index) => (
          <Fade
            duration={1000}
            delay={200 + index * 200}
            direction="up"
            triggerOnce
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-full"
          >
            <div>
              <div className="text-4xl text-yellow-400 flex justify-center">
                {index === 0 ? (
                  <FaCrown />
                ) : index === 1 ? (
                  <FaTrophy />
                ) : (
                  <FaMedal />
                )}
              </div>
              <h3 className="text-xl font-bold text-white mt-4">{user.name}</h3>
              <p className="text-gray-400 mt-2">Score: {user.score}</p>
            </div>
          </Fade>
        ))}
      </div>
    </>
  );
};

export default Leaderboard;
