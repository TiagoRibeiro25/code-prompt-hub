import Link from "next/link";
import React from "react";
import { Fade } from "react-awesome-reveal";

const NotFoundPage: React.FC = (): React.JSX.Element => {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      <section
        id="not-found"
        className="flex items-center justify-center h-screen text-white flex-col"
      >
        <Fade direction="up" duration={1000}>
          <h1 className="text-9xl font-bold text-center monolisa-font bg-gradient-to-r from-red-400 via-red-500 to-red-600 inline-block text-transparent bg-clip-text">
            404
          </h1>
        </Fade>
        <Fade direction="down" duration={1000} delay={800} className="mt-4">
          <p className="text-2xl text-center text-gray-500">Page not found</p>
        </Fade>

        <Fade direction="up" duration={1000} delay={1600} className="mt-12">
          <Link
            href="/"
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-4 rounded"
          >
            Go back to home
          </Link>
        </Fade>
      </section>
    </div>
  );
};

export default NotFoundPage;
