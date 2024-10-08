import { useQuery } from '@tanstack/react-query';
import httpClient from 'src/config/lib/axios/api-client';

type TipoAcao = {
  tipo: string;
  finalidade: string;
  acaoId: number;
};

const getAllTipoAcoes = async (): Promise<TipoAcao[]> => {
  const { data } = await httpClient.get<TipoAcao[]>('/getAllAcoes');
  return data;
};

export default function useTipoAcoes() {
  return useQuery({
    queryKey: ['tipoAcoes'],
    queryFn: getAllTipoAcoes,
    refetchOnWindowFocus: false,
  });
}
