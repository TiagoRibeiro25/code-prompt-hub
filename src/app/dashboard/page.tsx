"use client";

import { useSession } from "next-auth/react";

const DashboardPage: React.FC = (): React.JSX.Element => {
  const { data } = useSession();

  return (
    <div className="pt-28 flex flex-col px-4 min-h-screen">
      <h1 className="text-7xl font-bold text-center monolisa-font bg-gradient-to-r from-red-400 via-red-500 to-red-600 inline-block text-transparent bg-clip-text">
        Welcome back {data?.user?.name}
      </h1>
    </div>
  );
};

export default DashboardPage;
