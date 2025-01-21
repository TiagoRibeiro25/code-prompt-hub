import { AiOutlineLoading } from "react-icons/ai";

const Loading: React.FC = (): React.JSX.Element => {
  return (
    <div className="flex items-center justify-center h-screen">
      <AiOutlineLoading className="text-7xl text-red-500 animate-spin" />
    </div>
  );
};

export default Loading;
