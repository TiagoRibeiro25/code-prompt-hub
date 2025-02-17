import { prisma } from "@/lib/prisma";
import React from "react";
import { Fade } from "react-awesome-reveal";

type Testimonial = {
  quote: string;
  author: string;
};

const Testimonials: React.FC = async (): Promise<React.JSX.Element> => {
  const testimonialsDummyData: Testimonial[] = [
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

  let data = testimonialsDummyData;

  const testimonials = await prisma.user.findMany({
    where: {
      review: {
        not: null,
      },
    },
    select: {
      id: true,
      name: true,
      review: true,
    },
    take: 3,
    orderBy: {
      createdAt: "desc",
    },
  });

  if (testimonials.length === 3) {
    data = testimonials.map((testimonial) => {
      return {
        quote: testimonial.review,
        author: testimonial.name,
      } as Testimonial;
    });
  }

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
        {data.map((testimonial, index) => (
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
