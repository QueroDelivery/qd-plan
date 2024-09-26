import { ImSpinner8 } from 'react-icons/im';

const LoadingSpinner = ({ size = 24 }: { size?: number }) => {
  return (
    <div className="flex justify-center items-center">
      <ImSpinner8 className="animate-spin text-purple-500" size={size} />
    </div>
  );
};

export { LoadingSpinner };
