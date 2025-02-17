import WelcomeTitle from "@/app/dashboard/_components/WelcomeTitle";
import UnfinishedExercises from "./_components/UnfinishedExercises";

const DashboardPage: React.FC = async (): Promise<React.JSX.Element> => {
  return (
    <div className="pt-28 flex flex-col px-4 min-h-screen">
      <WelcomeTitle />

      <div className="mt-32 monolisa-font xl:w-[1150px] w-full mx-auto">
        <h2 className="text-2xl text-gray-300 mb-8">
          Continue where you left off or start a new challenge!
        </h2>

        <UnfinishedExercises />
      </div>
    </div>
  );
};

export default DashboardPage;
