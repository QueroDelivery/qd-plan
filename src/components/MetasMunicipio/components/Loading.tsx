import { Skeleton } from 'src/components/ui/skeleton';

const Loading = () => {
  return (
    <div className="grid sm:grid-cols-1 min-[950px]:grid-cols-2 min-[1720px]:grid-cols-3 gap-5">
      <Skeleton className="h-[200px] bg-gray-500/30 rounded-xl" />
      <Skeleton className="h-[200px] bg-gray-500/30 rounded-xl" />
      <Skeleton className="h-[200px] bg-gray-500/30 rounded-xl" />
    </div>
  );
};

export { Loading };
