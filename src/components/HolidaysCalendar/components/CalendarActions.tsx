import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

const CalendarActions = ({
  onNavigate,
}: {
  onNavigate: (action: 'prev' | 'next' | 'today') => void;
}) => {
  return (
    <div className="flex items-center">
      <button
        onClick={() => onNavigate('today')}
        className="text-xs px-[10px] py-[6px] text-gray-700 md:text-sm md:px-4 md:py-2 border-[1px] rounded hover:bg-gray-50 transition-all mr-6 bg-white border-zinc-200"
      >
        Hoje
      </button>
      <button
        onClick={() => onNavigate('prev')}
        className="flex items-center justify-center w-10 h-10 hover:bg-gray-200 rounded-full transition-all"
      >
        <GoChevronLeft className="text-gray-700" size={22} />
      </button>
      <button
        onClick={() => onNavigate('next')}
        className="flex items-center justify-center w-10 h-10 hover:bg-gray-200 rounded-full transition-all"
      >
        <GoChevronRight className="text-gray-700" size={22} />
      </button>
    </div>
  );
};

export { CalendarActions };
