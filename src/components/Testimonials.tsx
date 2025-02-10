import React from "react";
import { Fade } from "react-awesome-reveal";

const Testimonials: React.FC = (): React.JSX.Element => {
  const testimonials = [
    {
      quote:
        "This platform helped me understand complex code like never before!",
      author: "Alice",
    },
    {
      quote: "The leaderboard makes learning competitive and fun!",
      author: "Bob",
    },
    {
      quote: "I love the interactive coding challenges!",
      author: "Charlie",
    },
  ];

  return (
    <>
      <Fade
        cascade
        direction="up"
        duration={1000}
        delay={200}
        triggerOnce
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-white">What Users Are Saying</h2>
        <p className="text-gray-500 mt-4">Hear from our community.</p>
      </Fade>

      <Fade
        direction="up"
        duration={1000}
        delay={200}
        triggerOnce
        className="mt-12 flex flex-col md:flex-row gap-8"
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="bg-gray-800 p-6 rounded-lg shadow-lg w-full flex sm:flex-row flex-col items-center gap-8"
          >
            <p className="text-gray-400 italic">
              &quot;{testimonial.quote}&quot;
            </p>
            <p className="text-white sm:ml-auto"> {testimonial.author}</p>
          </div>
        ))}
      </Fade>
    </>
  );
};

export default Testimonials;
