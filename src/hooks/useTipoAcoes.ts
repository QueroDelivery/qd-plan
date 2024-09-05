import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

type TipoAcao = {
  tipo: string;
  finalidade: string;
  acaoId: number;
};

const getAllTipoAcoes = async (): Promise<TipoAcao[]> => {
  const { data } = await axios.get<TipoAcao[]>(
    'https://69p49iiw43.execute-api.us-east-2.amazonaws.com/getAllAcoes',
    {
      headers: {
        Authorization: import.meta.env.VITE_AUTHORIZATION_TOKEN,
      },
    }
  );
  return data;
};

export default function useTipoAcoes() {
  return useQuery({
    queryKey: ['tipoAcoes'],
    queryFn: getAllTipoAcoes,
    refetchOnWindowFocus: false,
  });
}
