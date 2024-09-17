import { ImSpinner8 } from 'react-icons/im';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center">
      <ImSpinner8 className="animate-spin text-purple-500" size={24} />
    </div>
  );
};

export { LoadingSpinner };
