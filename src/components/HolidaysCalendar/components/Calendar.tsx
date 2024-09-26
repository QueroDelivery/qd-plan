import dayGridPlugin from '@fullcalendar/daygrid';
import { ptBR } from 'date-fns/locale';
import FullCalendar from '@fullcalendar/react';
import { Heading } from 'src/components/Heading';
import { CalendarActions } from './CalendarActions';
import { CalendarDate } from './CalendarDate';
import './customCalendar.css';
import { useRef, useState } from 'react';
import type { MunicipioValue } from '../HolidaysCalendar';
import { LoadingSpinner } from 'src/LoadingSpinner';

const events = [
  {
    start: '2024-09-25',
    display: 'background',
    backgroundColor: '#64ff86',
  },
];

type CalendarProps = {
  municipios?: MunicipioValue[];
  isPending: boolean;
};

const Calendar = ({ isPending, municipios }: CalendarProps) => {
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const calendarRef = useRef<FullCalendar | null>(null);

  const handleNavigation = (action: 'prev' | 'next' | 'today') => {
    const calendarApi = calendarRef.current?.getApi();
    if (calendarApi) {
      calendarApi[action]();
      setCurrentDate(calendarApi.getDate());
    }
  };

  return (
    <div className="flex flex-col">
      <Heading className="border-b border-gray-300/60">
        Feriados e pontos facultativos
      </Heading>
      <div className="w-full px-6 lg:w-4/5 pt-10 pb-20 lg:px-10 space-y-6">
        <div className="relative bg-zinc-100 border-[1px] border-zinc-200 px-6 py-8 rounded-3xl shadow-xl">
          <div className="flex items-center justify-between gap-3 px-[3px] pb-5">
            <CalendarActions onNavigate={handleNavigation} />
            <CalendarDate date={currentDate} />
          </div>
          <div className="bg-white px-2 py-2 rounded-xl">
            <FullCalendar
              ref={calendarRef}
              plugins={[dayGridPlugin]}
              initialView="dayGridMonth"
              headerToolbar={false}
              weekends={true}
              events={events}
              locale={ptBR}
            />
          </div>
          <div className="p-4">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-4 h-4 bg-[#64ff86]"></div>
              <span className="text-gray-700 font-light">Feriados</span>
            </div>
            <div className="flex items-center gap-4">
              <div className="italic">7 de setembro</div>
              <div className="text-gray-500">Independência do Brasil</div>
            </div>
            <div className="flex items-center gap-4">
              <div className="italic">7 de setembro</div>
              <div className="text-gray-500">Independência do Brasil</div>
            </div>
          </div>
          {isPending && (
            <>
              <div className="absolute inset-0 bg-white rounded-3xl z-[100] opacity-80"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[200]">
                <LoadingSpinner size={30} />
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Calendar;
