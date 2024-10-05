import {
  CiInstagram,
  CiCalendarDate,
  CiAlignBottom,
  CiShoppingCart,
  CiLogout,
} from 'react-icons/ci';
import { PiCakeThin } from 'react-icons/pi';
import { SidebarItem } from './components/SidebarItem';
import { BrandLogo } from '../BrandLogo';
import { logout } from 'src/services/auth/authService';
import { Button } from '../ui/button';

export const items = [
  {
    label: 'Minha Agenda',
    icon: CiCalendarDate,
    href: '/calendario',
  },
  {
    label: 'Feriados',
    icon: PiCakeThin,
    href: '/feriados',
  },
  {
    label: 'Influencers',
    icon: CiInstagram,
    href: '/cadastro/influencers',
  },
  {
    label: 'Fornecedores',
    icon: CiShoppingCart,
    href: 'cadastro/fornecedor',
  },
  {
    label: 'Leads',
    icon: CiAlignBottom,
    href: '/lead/view',
  },
];

const Sidebar = () => {
  return (
    <div className="hidden xl:flex xl:flex-col">
      <aside className="fixed bg-gray-100 shadow-md">
        <div className="px-4 h-screen flex flex-col justify-between">
          <div>
            <div className="px-5 py-4">
              <div className="mb-10 w-[150px]">
                <BrandLogo />
              </div>
            </div>
            <nav className="w-full">
              <ul className="w-[250px]">
                {items.map((item) => (
                  <SidebarItem
                    label={item.label}
                    icon={item.icon}
                    href={item.href}
                    key={item.href}
                  />
                ))}
              </ul>
            </nav>
          </div>
          <Button
            size="lg"
            className="w-full bg-purple-500 text-md hover:bg-purple-600 mb-5"
            onClick={() => logout()}
          >
            <div className="w-full flex items-center justify-center gap-4">
              <CiLogout size={24} />
              <div className="text-md">Sair</div>
            </div>
          </Button>
        </div>
      </aside>
    </div>
  );
};

export { Sidebar };
