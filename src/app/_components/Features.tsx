import React from "react";
import { Fade } from "react-awesome-reveal";

const Features: React.FC = (): React.JSX.Element => {
  return (
    <>
      <Fade
        direction="up"
        duration={1000}
        delay={200}
        triggerOnce
        cascade
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-white">Features</h2>
        <p className="text-gray-500 mt-4">What makes Code Prompt Hub unique?</p>
      </Fade>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        <Fade direction="up" duration={1000} delay={200} triggerOnce>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-white">AI-Generated Code</h3>
            <p className="text-gray-400 mt-2">
              Practice with code snippets across 5 levels of difficulty.
            </p>
          </div>
        </Fade>
        <Fade direction="up" duration={1000} delay={400} triggerOnce>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-white">
              Explanation & Evaluation
            </h3>
            <p className="text-gray-400 mt-2">
              Submit your explanations and get instant AI feedback.
            </p>
          </div>
        </Fade>
        <Fade direction="up" duration={1000} delay={600} triggerOnce>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-white">Leaderboard</h3>
            <p className="text-gray-400 mt-2">
              Compete with others and showcase your progress.
            </p>
          </div>
        </Fade>
      </div>
    </>
  );
};

export default Features;
