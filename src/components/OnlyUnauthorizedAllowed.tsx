"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const OnlyUnauthorizedAllowed: React.FC = (): React.JSX.Element => {
  const router = useRouter();
  const { status } = useSession();

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [router, status]);

  return <></>;
};

export default OnlyUnauthorizedAllowed;
