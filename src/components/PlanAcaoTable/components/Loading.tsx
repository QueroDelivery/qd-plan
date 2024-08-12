import { Skeleton } from 'src/components/ui/skeleton';

const Loading = ({ times }: { times: number }) => {
  const skeletons = new Array(times).fill(0);

  return (
    <div className="flex flex-col gap-4">
      {skeletons.map((_, i) => (
        <Skeleton key={i} className="w-full h-8 bg-gray-500/30" />
      ))}
    </div>
  );
};

export default Loading;
