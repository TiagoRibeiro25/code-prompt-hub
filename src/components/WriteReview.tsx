"use client";

import React, { useState } from "react";
import { toast } from "react-toastify";

type Props = {
  review: string | undefined | null;
};

const WriteReview: React.FC<Props> = ({ review }): React.JSX.Element => {
  const [reviewContent, setReviewContent] = useState<string>(review || "");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/user/review", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ review: reviewContent }),
      });

      const data = await response.json();

      if (!response.ok) {
        toast.error(data.error, { theme: "dark" });
      } else {
        toast.success("Review Updated!", { theme: "dark" });
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong!", { theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      className="flex flex-col mt-8 mb-28 sm:w-[500px] w-full mx-auto"
      onSubmit={handleSubmit}
    >
      <textarea
        value={reviewContent}
        onChange={(e) => setReviewContent(e.target.value)}
        className="w-full p-4 mt-8 border border-red-500 bg-transparent text-white rounded-md"
        placeholder="Write your review here..."
        rows={7}
      />
      <button
        type="submit"
        className="w-full p-4 mt-4 bg-red-500 text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={
          loading ||
          reviewContent === review ||
          reviewContent.length > 80 ||
          reviewContent.length < 10
        }
      >
        {loading ? "Please Wait..." : "Submit Review"}
      </button>
    </form>
  );
};

export default WriteReview;
