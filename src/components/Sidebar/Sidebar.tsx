import {
  CiInstagram,
  CiCalendarDate,
  CiAlignBottom,
  CiShoppingCart,
  CiLogout,
} from 'react-icons/ci';
import { SidebarItem } from './components/SidebarItem';
import { BrandLogo } from '../BrandLogo';

 export const items = [
  {
    label: 'Minha Agenda',
    icon: CiCalendarDate,
    href: '/calendario',
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
  {
    label: 'Sair',
    icon: CiLogout,
    href: '/logout',
  },
];

const Sidebar = () => {
  return (
    <aside className="bg-white hidden lg:flex lg:flex-col">
      <div className="px-4 h-screen">
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
    </aside>
  );
};

export { Sidebar };
