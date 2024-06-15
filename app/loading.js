import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex flex-col-reverse flex-wrap items-center justify-center py-5 overflow-hidden md:py-10 lg:py-0 md:flex-row lg:h-[calc(100vh-64px)] h-full">
      <div className="flex flex-col w-full gap-4 pl-8 md:pr-4 md:w-7/12 lg:w-2/3">
        <Skeleton className="w-1/3 h-6 rounded-md" />
        <Skeleton className="w-2/3 h-6 rounded-md" />
        <Skeleton className="w-full h-12 rounded-md" />
        <Skeleton className="w-1/2 h-8 rounded-md" />
      </div>
      <div className="w-full p-8 md:w-5/12 lg:w-1/3 aspect-square">
        <Skeleton className="relative grid w-full h-full p-8 rounded-full place-items-center" />
      </div>
    </div>
  );
}
