import OnlyUnauthorizedAllowed from "@/components/OnlyUnauthorizedAllowed";
import Link from "next/link";
import React from "react";
import { Fade } from "react-awesome-reveal";

const HomePage: React.FC = (): React.JSX.Element => {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <OnlyUnauthorizedAllowed />
      {/* Hero Section */}
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

        <Fade
          direction="up"
          duration={1000}
          delay={1600}
          className="mt-12 flex gap-4"
        >
          <Link
            href="/auth/register"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded transition-all transform hover:scale-105"
          >
            Get Started
          </Link>
          <Link
            href="/leaderboard"
            className="bg-transparent border-2 border-red-500 text-red-500 hover:bg-red-500 hover:text-white font-bold py-3 px-6 rounded transition-all transform hover:scale-105"
          >
            View Leaderboard
          </Link>
        </Fade>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-white">Features</h2>
          <p className="text-gray-500 mt-4">
            What makes Code Prompt Hub unique?
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-12">
          <Fade direction="up" duration={1000} delay={200}>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-white">
                AI-Generated Code
              </h3>
              <p className="text-gray-400 mt-2">
                Practice with code snippets across 5 levels of difficulty.
              </p>
            </div>
          </Fade>
          <Fade direction="up" duration={1000} delay={400}>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-white">
                Explanation & Evaluation
              </h3>
              <p className="text-gray-400 mt-2">
                Submit your explanations and get instant AI feedback.
              </p>
            </div>
          </Fade>
          <Fade direction="up" duration={1000} delay={600}>
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold text-white">Leaderboard</h3>
              <p className="text-gray-400 mt-2">
                Compete with others and showcase your progress.
              </p>
            </div>
          </Fade>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
