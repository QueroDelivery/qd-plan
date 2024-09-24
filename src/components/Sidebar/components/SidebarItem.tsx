import { IconType } from 'react-icons';
import { useNavigate } from 'react-router-dom';

type SidebarItemProps = {
  label: string;
  icon: IconType;
  href: string;
};

const SidebarItem = ({ label, icon: Icon, href }: SidebarItemProps) => {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(href)}
      className="flex items-center px-5 py-4 gap-4 rounded-full hover:bg-purple-500 hover:bg-opacity-20 cursor-pointer transition-all"
    >
      <Icon size={24} />
      <p className="text-gray-700">{label}</p>
    </li>
  );
};

export { SidebarItem };
