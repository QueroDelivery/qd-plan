import { Skeleton } from 'src/components/ui/skeleton';

const Loading = ({ times }: { times: number }) => {
  const skeletons = new Array(times).fill(0);

  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-1 min-[1720px]:grid-cols-2 gap-6 mb-5">
        <Skeleton className="h-[270px] bg-gray-500/30 rounded-xl" />
        <Skeleton className="h-[270px] bg-gray-500/30 rounded-xl" />
      </div>
      {skeletons.map((_, i) => (
        <Skeleton key={i} className="w-full h-8 bg-gray-500/30" />
      ))}
    </div>
  );
};

export { Loading };
