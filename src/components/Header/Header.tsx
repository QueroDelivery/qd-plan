import { BrandLogo } from '../BrandLogo';
import { MenuBurguerButton } from './components/MenuBurguerButton';

const Header = () => {
  return (
    <div className="block lg:hidden z-40 sticky top-0 bg-white shadow-sm">
      <div className="flex items-center justify-between min-w-[336px] w-full h-20 px-5">
        <div className="w-[100px] sm:w-[120px]">
          <BrandLogo />
        </div>
        <MenuBurguerButton />
      </div>
    </div>
  );
};

export { Header };
