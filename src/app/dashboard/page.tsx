import WelcomeTitle from "@/components/WelcomeTitle";

const DashboardPage: React.FC = async (): Promise<React.JSX.Element> => {
  return (
    <div className="pt-28 flex flex-col px-4 min-h-screen">
      <WelcomeTitle />
    </div>
  );
};

export default DashboardPage;
