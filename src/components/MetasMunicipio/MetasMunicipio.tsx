import 'react-circular-progressbar/dist/styles.css';
import { ImSpinner8 } from 'react-icons/im';
import { DashboardMetas } from './components/DashboardMetas';
import useMetas from 'src/hooks/useMetas';
import { VscError } from 'react-icons/vsc';
import { Button } from 'src/components/ui/button';

const MetasMunicipio = ({ municipioId }: { municipioId: string }) => {
  const metasQuery = useMetas(municipioId);

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

  const loading = (
    <div className="flex justify-center">
      <ImSpinner8 className="animate-spin text-purple-500" size={24} />
    </div>
  );

  if (metasQuery.data) {
    return (
      <div className="grid sm:grid-cols-1 min-[950px]:grid-cols-2 min-[1720px]:grid-cols-3 gap-5">
        {content}
      </div>
    );
  }

  if (metasQuery.error) {
    return (
      <div className="flex flex-col justify-center items-center gap-3">
        <div className="flex items-center">
          <VscError size={24} className="mr-3" color="red" />
          <p className="text-gray-700">
            Erro ao exibir metas: {metasQuery.error.message}. Tente novamente em
            instantes.
          </p>
        </div>
        <Button variant="destructive" onClick={() => metasQuery.refetch()}>
          Tentar novamente
        </Button>
      </div>
    );
  }

  return loading;
};

export { MetasMunicipio };
