import { Skeleton } from "@/components/ui/skeleton";

const LoadingResume = () => {
  return (
    <div className="grid w-full pt-5 overflow-auto bg-background place-items-center">
      <div className="flex justify-start w-full mb-5 md:justify-center ">
        <Skeleton className="w-16 h-8" />
      </div>
      <div className="container">
        <Skeleton className="w-full h-screen" />
      </div>
    </div>
  );
};

export default LoadingResume;
