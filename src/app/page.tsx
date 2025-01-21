import OnlyUnauthorizedAllowed from "@/components/OnlyUnauthorizedAllowed";
import Link from "next/link";
import React from "react";
import { Fade } from "react-awesome-reveal";

const HomePage: React.FC = (): React.JSX.Element => {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <OnlyUnauthorizedAllowed />
      <section
        id="home"
        className="flex items-center justify-center h-screen text-white flex-col"
      >
        <Fade direction="up" duration={1000}>
          <h1 className="text-7xl font-bold text-center monolisa-font bg-gradient-to-r from-red-400 via-red-500 to-red-600 inline-block text-transparent bg-clip-text">
            Code Prompt Hub
          </h1>
        </Fade>
        <Fade direction="down" duration={1000} delay={800} className="mt-4">
          <p className="text-2xl text-center text-gray-500">
            A new way to learn with AI
          </p>
        </Fade>

        <Fade direction="up" duration={1000} delay={1600} className="mt-12">
          <Link
            href="/auth/register"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded"
          >
            Get Started
          </Link>
        </Fade>
      </section>

      <section></section>
    </div>
  );
};

export default HomePage;
