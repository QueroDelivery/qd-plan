import { useQuery } from '@tanstack/react-query';
import httpClient from 'src/config/lib/axios/api-client';

type MunicipiosResponse = {
  r: boolean;
  data: TMunicipio[];
};

type TMunicipio = {
  municipioId: string;
  nome: string;
  uf: string;
};

const getAllMunicipios = async (): Promise<TMunicipio[]> => {
  const { data: response } = await httpClient.get<MunicipiosResponse>(
    'getAllMunicipios'
  );
  return response.data;
};

export default function useMunicipios() {
  return useQuery({
    queryKey: ['municipios'],
    queryFn: getAllMunicipios,
    refetchOnWindowFocus: false,
  });
}
