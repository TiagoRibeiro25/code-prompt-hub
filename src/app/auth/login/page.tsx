"use client";

import OnlyUnauthorizedAllowed from "@/components/OnlyUnauthorizedAllowed";
import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Zoom } from "react-awesome-reveal";
import { toast } from "react-toastify";

const LoginPage: React.FC = (): React.JSX.Element => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const router = useRouter();
  const callbackUrl = useSearchParams().get("callbackUrl") || "/dashboard";
  const { status } = useSession();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.ok) {
        toast.success("Login successfully!", { theme: "dark" });
        router.push(callbackUrl);
      } else {
        toast.error(result?.error || "Something went wrong!", {
          theme: "dark",
        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", { theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      router.push("/dashboard");
    }
  }, [router, status]);

  return (
    <div className="pt-12 flex justify-center items-center h-screen">
      <OnlyUnauthorizedAllowed />
      <Zoom>
        <form
          className="border border-red-500 rounded-lg p-16 backdrop-blur-sm bg-black/30"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              className="block text-red-700 text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-red-700 text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="******************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-center mb-4">
            <Link href="/auth/register">
              <span className="text-gray-500 hover:text-red-700 text-sm">
                Don&apos;t have an account?
              </span>
            </Link>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded w-full focus:outline-none focus:shadow-outline"
              type="submit"
              disabled={loading}
            >
              {loading ? "Please Wait..." : "Login"}
            </button>
          </div>
        </form>
      </Zoom>
    </div>
  );
};

export default LoginPage;
