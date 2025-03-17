"use client";

import { useRouter } from "next/navigation";
import React from "react";
import { AiOutlineLoading } from "react-icons/ai";

const RedirectTo404: React.FC = (): React.JSX.Element => {
  const router = useRouter();

  React.useEffect(() => {
    router.push("/404");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen">
      <AiOutlineLoading className="text-7xl text-red-500 animate-spin" />
    </div>
  );
};

export default RedirectTo404;
