import { RxHamburgerMenu } from 'react-icons/rx';
import { TfiClose } from 'react-icons/tfi';

type MenuBurguerButton = {
  isOpen: boolean;
  toggleOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const MenuBurguerButton = ({ isOpen, toggleOpen }: MenuBurguerButton) => {
  return (
    <button
      onClick={() => toggleOpen((value) => !value)}
      className="rounded-full flex items-center justify-center w-12 h-12 hover:bg-purple-500 hover:bg-opacity-20 transition-all"
    >
      {isOpen ? <TfiClose size={22} /> : <RxHamburgerMenu size={25} />}
    </button>
  );
};

export { MenuBurguerButton };
