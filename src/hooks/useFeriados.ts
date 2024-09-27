import { useQuery } from '@tanstack/react-query';
import httpClient from 'src/axiosClient';

type TFeriados = {
  id: string;
  data: string;
  nomeFeriado: string;
  facultativo: 'sim' | 'não';
};

const getFeriadosByMunicipioAno = async (
  cidade: string,
  ano: number
): Promise<TFeriados[]> => {
  const { data } = await httpClient.get<TFeriados[]>(
    `/feriados?cidade=${cidade}&ano=${ano}`,
    {
      baseURL: import.meta.env.VITE_FERIADOS_URL,
    }
  );
  return data;
};

export default function useFeriados(cidade: string, ano: number) {
  return useQuery({
    queryKey: ['feriados'],
    queryFn: () => getFeriadosByMunicipioAno(cidade, ano),
    refetchOnWindowFocus: false,
  });
}
