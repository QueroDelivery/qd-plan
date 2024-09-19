import { MetasMunicipio } from 'src/components/MetasMunicipio';
import Select from 'react-select';
import { singleSelectStyles } from 'src/styles/selectStyles';
import { useState } from 'react';
import { AcoesContent } from './components/AcoesContent';
import { Calendar } from 'src/components/ui/calendar';
import { ptBR } from 'date-fns/locale';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'src/components/ui/popover';
import { Button } from 'src/components/ui/button';
import { CalendarIcon } from 'lucide-react';
import { cn } from 'src/lib/utils';

const AcoesPage = () => {
  const [municipioId, setMunicipioId] = useState<string | null>(null);
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [popoverOpen, setPopoverOpen] = useState(false);

  const currentDate = new Date().toLocaleDateString('pt-BR');

  const options = [
    {
      value: '5ea31f471a1c270051bd4966',
      label: 'SALGADO/SE',
    },
    {
      value: '5fb90c531f9daa00a6a6e75b',
      label: 'UNIÃO DOS PALMARES/AL',
    },
  ];

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setPopoverOpen(false);
  };

  return (
    <div className="flex flex-col overflow-x-hidden min-h-[calc(100vh-5rem)]">
      <h1 className="text-xl md:text-2xl font-bold text-purple-500 px-6 py-4 border-b border-gray-300/60">
        Metas e ações
      </h1>
      <div className="container py-8 mx-auto min-w-[336px] space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-[720px]">
          <Select
            options={options}
            placeholder="Cidade"
            isMulti={false}
            noOptionsMessage={() => 'Cidade não encontrada.'}
            onChange={(option) => setMunicipioId(option?.value as string)}
            styles={singleSelectStyles}
          />
          <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  'w-full pl-3 text-left font-normal text-gray-500 hover:text-gray-500 text-md rounded hover:bg-transparent hover:shadow transition-all border-gray-300'
                )}
              >
                {date?.toLocaleDateString('pt-BR') === currentDate ? (
                  <span>Data Personalizada</span>
                ) : (
                  date?.toLocaleDateString('pt-BR')
                )}
                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                locale={ptBR}
                mode="single"
                selected={date}
                onSelect={handleDateSelect}
                disabled={(date) => date < new Date('1900-01-01')}
                defaultMonth={date}
              />
            </PopoverContent>
          </Popover>
        </div>
        {municipioId ? (
          <>
            <MetasMunicipio
              municipioId={municipioId}
              month={date!.getMonth() + 1}
              year={date!.getFullYear()}
            />
            <AcoesContent
              municipioId={municipioId}
              month={date!.getMonth() + 1}
              year={date!.getFullYear()}
            />
          </>
        ) : (
          <p className="flex justify-center p-10 text-gray-700">
            Por favor, selecione um município para ver os dados.
          </p>
        )}
      </div>
    </div>
  );
};

export { AcoesPage };
