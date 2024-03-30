import { Skeleton } from "@/components/ui/skeleton";

const Loading = () => {
  return (
    <div className="flex flex-col-reverse flex-wrap items-center justify-center py-5 overflow-hidden md:py-10 lg:py-0 md:flex-row lg:h-[calc(100vh-64px)] h-full">
      <div className="flex flex-col w-full gap-4 md:pr-4 md:w-7/12 lg:w-2/3">
        <Skeleton className="h-4 w-[250px]" />
        <Skeleton className="h-4 w-[200px]" />
      </div>
      <div className="w-full p-8 md:w-5/12 lg:w-1/3">
        <Skeleton className="relative grid p-8 rounded-full place-items-center" />
      </div>
    </div>
  );
};

export default Loading;
