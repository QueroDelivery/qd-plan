import 'react-circular-progressbar/dist/styles.css';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { ImSpinner8 } from 'react-icons/im';
import { DashboardMetas } from './components/DashboardMetas';

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

const getMetasByMunicipioId = async () => {
  const { data: response } = await axios.get<MetasMunicipioResponse>(
    'https://69p49iiw43.execute-api.us-east-2.amazonaws.com/getMetas?municipioId=5ea31f471a1c270051bd4966&mes=08&ano=2024',
    {
      headers: {
        Authorization: import.meta.env.VITE_AUTHORIZATION_TOKEN,
      },
    }
  );
  return response.data;
};

const MetasMunicipio = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['meta-municipio'],
    queryFn: getMetasByMunicipioId,
  });

  const loading = (
    <div className="col-span-full justify-self-center">
      <ImSpinner8 className="animate-spin text-purple-500" size={24} />
    </div>
  );

  const content = (
    <>
      <DashboardMetas
        labelMeta="Meta GMV"
        labelMetaAchieved="Meta Realizada"
        meta={data?.[0].meta as number}
        metaAchieved={data?.[0].totalVendas as number}
        style="currency"
        title="meta GMV"
      />
      <DashboardMetas
        labelMeta="Meta Places Vendendo"
        labelMetaAchieved="Meta Realizada"
        meta={data?.[0].metaPlacesVendendo as number}
        metaAchieved={data?.[0].totalPlacesVendendo as number}
        style="decimal"
        title="meta Places Vendendo"
      />
      <DashboardMetas
        labelMeta="Meta novos usuários compradores"
        labelMetaAchieved="Meta Realizada"
        meta={data?.[0].metaUsuariosCompradores as number}
        metaAchieved={data?.[0].totalUsuarios as number}
        style="decimal"
        title="meta Novos Usuários Compradores"
      />
    </>
  );

  return (
    <div className="m-8 grid sm:grid-cols-1 min-[950px]:grid-cols-2 min-[1720px]:grid-cols-3 gap-5">
      {isLoading ? loading : content}
    </div>
  );
};

export { MetasMunicipio };
