import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

const WelcomeTitle: React.FC = async (): Promise<React.JSX.Element> => {
  const session = await getServerSession(authOptions);

  return (
    <h1 className="text-7xl font-bold text-center monolisa-font bg-gradient-to-r from-red-400 via-red-500 to-red-600 inline-block text-transparent bg-clip-text">
      Welcome back {session?.user?.name}!
    </h1>
  );
};

export default WelcomeTitle;
