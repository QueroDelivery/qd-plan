import { useQuery } from '@tanstack/react-query';
import httpClient from 'src/config/lib/axios/api-client';

type MetasMunicipio = {
  meta: number | null;
  metaUsuarios: number | null;
  metaPlacesAtivos: number | null;
  metaValorPedidosOnline: number | null;
  metaUsuariosCompradores: number | null;
  metaPlaces: number | null;
  metaPlacesVendendo: number | null;
  totalUsuarios: number | null;
  totalVendas: number | null;
  totalUsuariosCompradores: number | null;
  totalPlacesVendendo: number | null;
  totalVendasOnline: number | null;
  totalPlacesMunicipio: number | null;
  totalPlacesAtivos: number | null;
};

type MetasMunicipioResponse = {
  r: boolean;
  data: MetasMunicipio[];
};

const getMetasByMunicipioId = async (
  municipioId: string,
  month: number,
  year: number
): Promise<MetasMunicipio[]> => {
  const { data: response } = await httpClient.get<MetasMunicipioResponse>(
    `/getMetas?municipioId=${municipioId}&mes=${month}&ano=${year}`
  );
  return response.data;
};

export default function useMetas(
  municipioId: string,
  month: number,
  year: number
) {
  return useQuery({
    queryKey: ['metas', municipioId, month, year],
    queryFn: () => getMetasByMunicipioId(municipioId, month, year),
    refetchOnWindowFocus: false,
  });
}
