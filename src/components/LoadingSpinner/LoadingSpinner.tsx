import { ImSpinner8 } from 'react-icons/im';
import { cn } from 'src/config/lib/shadcn/utils';

const LoadingSpinner = ({
  size = 24,
  className,
}: {
  size?: number;
  className?: string;
}) => {
  return (
    <div className="flex justify-center items-center">
      <ImSpinner8
        className={cn('animate-spin text-purple-500', className)}
        size={size}
      />
    </div>
  );
};

export { LoadingSpinner };
