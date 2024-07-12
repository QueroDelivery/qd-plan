import { RxHamburgerMenu } from 'react-icons/rx';

const MenuBurguerButton = () => {
  return (
    <button className="rounded-full flex items-center justify-center w-12 h-12 hover:bg-purple-500 hover:bg-opacity-20">
      <RxHamburgerMenu size={25} />
    </button>
  );
};

export { MenuBurguerButton };
