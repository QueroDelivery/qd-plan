import { useMemo } from 'react';
import useMunicipios from 'src/hooks/useMunicipios';
import Calendar from './components/Calendar';

export type MunicipioValue = {
  uf: string;
  nome: string;
};

const HolidaysCalendar = () => {
  const municipiosId = ['5ea31f471a1c270051bd4966', '5fb90c531f9daa00a6a6e75b'];
  const { data, isPending } = useMunicipios();

  const municipiosMap = useMemo(
    () =>
      new Map<string, MunicipioValue>(
        data?.map((municipio) => {
          const { municipioId, nome, uf } = municipio;
          return [municipioId, { nome, uf }];
        })
      ),
    [data]
  );

  const refinedMunicipios = useMemo(() => {
    const arr: MunicipioValue[] = [];
    municipiosId.forEach((id) => {
      const municipio = municipiosMap.get(id);
      if (municipio) {
        arr.push(municipio);
      }
    });
    return arr;
  }, [municipiosMap, municipiosId]);

  return <Calendar isPending={isPending} municipios={refinedMunicipios} />;
};

export { HolidaysCalendar };
