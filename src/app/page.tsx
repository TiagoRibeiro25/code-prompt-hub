import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import Leaderboard from "@/components/Leaderboard";
import OnlyUnauthorizedAllowed from "@/components/OnlyUnauthorizedAllowed";
import Testimonials from "@/components/Testimonials";
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
        <Fade direction="up" duration={1000} triggerOnce>
          <h1 className="text-7xl font-bold text-center monolisa-font bg-gradient-to-r from-red-400 via-red-500 to-red-600 inline-block text-transparent bg-clip-text">
            Code Prompt Hub
          </h1>
        </Fade>
        <Fade
          direction="down"
          duration={1000}
          delay={800}
          className="mt-4"
          triggerOnce
        >
          <p className="text-2xl text-center text-gray-500">
            A new way to learn with AI
          </p>
        </Fade>

        <Fade
          direction="up"
          duration={1000}
          delay={1600}
          className="mt-12 flex gap-4"
          triggerOnce
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
      <section id="features" className="py-20">
        <Features />
      </section>
      <section id="leaderboard" className="py-32">
        <Leaderboard />
      </section>
      <section id="testimonials" className="py-32">
        <Testimonials />
      </section>
      <section id="faq" className="py-32">
        <FAQ />
      </section>
    </div>
  );
};

export default HomePage;
