import { AcoesDashboard } from 'src/components/AcoesDashboard';
import { PlacesDashboard } from 'src/components/PlacesDashboard';
import { PlanAcaoTable } from 'src/components/PlanAcaoTable';
import useAcoes, { PlanoAcao } from 'src/hooks/useAcoes';
import { Loading } from './Loading';

type TAcoesContent = {
  municipioId: string;
};

const AcoesContent = ({ municipioId }: TAcoesContent) => {
  const acoesQuery = useAcoes(municipioId);

  if (acoesQuery.isPending) {
    return <Loading times={10} />;
  }

  return (
    <>
      <div className="grid grid-cols-1 min-[1720px]:grid-cols-2 gap-6">
        <AcoesDashboard data={acoesQuery.data as PlanoAcao[]} />
        <PlacesDashboard
          data={acoesQuery.data as PlanoAcao[]}
          municipioId={municipioId}
        />
      </div>
      <PlanAcaoTable data={acoesQuery.data as PlanoAcao[]} />
    </>
  );
};

export { AcoesContent };
