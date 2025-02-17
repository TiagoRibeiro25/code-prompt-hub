import WriteReview from "@/app/review/_components/WriteReview";
import { authOptions } from "@/lib/authOptions";
import { prisma } from "@/lib/prisma";
import { getServerSession, Session } from "next-auth";

const ReviewPage: React.FC = async (): Promise<React.JSX.Element> => {
  const session = (await getServerSession(authOptions)) as Session;

  const data = await prisma.user.findFirst({
    where: { email: session.user?.email as string },
    select: {
      id: true,
      review: true,
    },
  });

  return (
    <div className="min-h-screen">
      <div className="pt-28 flex flex-col px-4">
        <h1 className="text-4xl font-bold text-center text-red-500">
          Write a Review
        </h1>
        <p className="text-gray-500 mt-8 text-center">
          Write us a review about your experience with our services. This will
          help us improve and serve you better.
        </p>

        <WriteReview review={data?.review} />
      </div>
    </div>
  );
};

export default ReviewPage;
