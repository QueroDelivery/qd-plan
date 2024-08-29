import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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
  const { data: response } = await axios.get<PlacesByMunicipioResponse>(
    `https://69p49iiw43.execute-api.us-east-2.amazonaws.com/getAllPlacesByMunicipioId?municipioId=${municipioId}`,
    {
      headers: {
        Authorization: import.meta.env.VITE_AUTHORIZATION_TOKEN,
      },
    }
  );
  return response.data;
};

export default function usePlaces(municipioId: string) {
  return useQuery({
    queryKey: ['places'],
    queryFn: () => getAllPlacesByMunicipioId(municipioId),
    refetchOnWindowFocus: false,
  });
}
