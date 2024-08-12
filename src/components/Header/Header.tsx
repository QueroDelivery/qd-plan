import { useEffect, useState } from 'react';
import { BrandLogo } from '../BrandLogo';
import { MenuBurguerButton } from './components/MenuBurguerButton';
import { items } from '../Sidebar';
import HeaderItem from './components/HeaderItem';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="block lg:hidden z-40 sticky top-0 bg-white shadow-sm">
      <div className="flex items-center justify-between min-w-[336px] w-full h-20 px-5">
        <div className="w-[100px] sm:w-[120px]">
          <BrandLogo />
        </div>
        <MenuBurguerButton isOpen={isOpen} toggleOpen={setIsOpen} />
      </div>
      {isOpen && (
        <div className="fixed top-20 left-0 right-0 bottom-0 bg-white z-20">
          <div className="flex flex-col">
            <ul>
              {items.map((item) => (
                <HeaderItem
                  key={item.href}
                  href={item.href}
                  label={item.label}
                  icon={item.icon}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export { Header };
