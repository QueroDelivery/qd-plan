import { IconType } from 'react-icons';

type HeaderItemProps = {
  label: string;
  icon: IconType;
  href: string;
};

const HeaderItem = ({ label, icon: Icon, href }: HeaderItemProps) => {
  return (
    <li className="flex items-center gap-4 w-full p-4 hover:bg-purple-500 hover:bg-opacity-20 cursor-pointer transition-all">
      <Icon size={24} />
      {label}
    </li>
  );
};

export default HeaderItem;
