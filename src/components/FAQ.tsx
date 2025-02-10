import React from "react";
import { Fade } from "react-awesome-reveal";

const FAQ: React.FC = (): React.JSX.Element => {
  const faq = [
    {
      question: "How does the AI evaluate my explanations?",
      answer:
        "The AI uses natural language processing to analyze your response and compare it to the expected explanation.",
    },
    {
      question: "Can I try it for free?",
      answer:
        "Yes, you can start with a free account and upgrade later for more features.",
    },
  ];

  return (
    <>
      <Fade
        cascade
        direction="up"
        triggerOnce
        duration={1000}
        delay={200}
        className="text-center"
      >
        <h2 className="text-4xl font-bold text-white">FAQs</h2>
        <p className="text-gray-500 mt-4">
          Got questions? We&apos;ve got answers.
        </p>
      </Fade>

      <Fade
        direction="up"
        triggerOnce
        duration={1000}
        delay={400}
        className="mt-12 space-y-4"
      >
        {faq.map((faq, index) => (
          <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold text-white">{faq.question}</h3>
            <p className="text-gray-400 mt-2">{faq.answer}</p>
          </div>
        ))}
      </Fade>
    </>
  );
};

export default FAQ;
