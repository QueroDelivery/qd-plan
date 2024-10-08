import { useQuery } from '@tanstack/react-query';
import httpClient from 'src/config/lib/axios/api-client';

type Place = {
  nomeExibicao: string;
  placeId: string;
};

type PlacesByMunicipioResponse = {
  r: boolean;
  data: Place[];
};

const getAllPlacesByMunicipioId = async (
  municipioId: string
): Promise<Place[]> => {
  const { data: response } = await httpClient.get<PlacesByMunicipioResponse>(
    `/getAllPlacesByMunicipioId?municipioId=${municipioId}`
  );
  return response.data;
};

export default function usePlaces(municipioId: string) {
  return useQuery({
    queryKey: ['places', municipioId],
    queryFn: () => getAllPlacesByMunicipioId(municipioId),
    refetchOnWindowFocus: false,
  });
}
