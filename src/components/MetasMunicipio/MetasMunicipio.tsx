import 'react-circular-progressbar/dist/styles.css';
import { ImSpinner8 } from 'react-icons/im';
import { DashboardMetas } from './components/DashboardMetas';
import useMetas from 'src/hooks/useMetas';

const MetasMunicipio = ({ municipioId }: { municipioId: string }) => {
  const metasQuery = useMetas(municipioId);

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
        meta={metasQuery.data?.[0].meta as number}
        metaAchieved={metasQuery.data?.[0].totalVendas as number}
        style="currency"
        title="meta GMV"
      />
      <DashboardMetas
        labelMeta="Meta Places Vendendo"
        labelMetaAchieved="Meta Realizada"
        meta={metasQuery.data?.[0].metaPlacesVendendo as number}
        metaAchieved={metasQuery.data?.[0].totalPlacesVendendo as number}
        style="decimal"
        title="meta Places Vendendo"
      />
      <DashboardMetas
        labelMeta="Meta novos usuários compradores"
        labelMetaAchieved="Meta Realizada"
        meta={metasQuery.data?.[0].metaUsuariosCompradores as number}
        metaAchieved={metasQuery.data?.[0].totalUsuarios as number}
        style="decimal"
        title="meta Novos Usuários Compradores"
      />
    </>
  );

  return (
    <div className="grid sm:grid-cols-1 min-[950px]:grid-cols-2 min-[1720px]:grid-cols-3 gap-5">
      {metasQuery.isLoading ? loading : content}
    </div>
  );
};

export { MetasMunicipio };
