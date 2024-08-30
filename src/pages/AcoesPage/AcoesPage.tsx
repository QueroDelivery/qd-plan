import { MetasMunicipio } from 'src/components/MetasMunicipio';
import { PlanAcaoTable } from 'src/components/PlanAcaoTable';
import { AcoesDashboard } from 'src/components/AcoesDashboard';
import { PlacesDashboard } from 'src/components/PlacesDashboard/PlacesDashboard';
import useAcoes, { PlanoAcao } from 'src/hooks/useAcoes';
import { Loading } from './components/Loading';
import Select from 'react-select';
import { singleSelectStyles } from 'src/styles/selectStyles';
import { useState } from 'react';

const AcoesPage = () => {
  const [municipioId, setMunicipioId] = useState<string | null>(null);
  const acoesQuery = useAcoes(municipioId || '');

  const options = [
    {
      value: '5ea31f471a1c270051bd4966',
      label: 'SALGADO/SE',
    },
    {
      value: '5fb90c531f9daa00a6a6e75b',
      label: 'UNIÃO DOS PALMARES/AL',
    },
  ];

  return (
    <div className="flex flex-col overflow-x-hidden">
      <h1 className="text-xl md:text-2xl font-bold text-purple-500 px-6 py-4 border-b border-gray-300/60">
        Metas e ações
      </h1>
      <div className="container py-8 mx-auto min-w-[336px] space-y-8">
        <Select
          options={options}
          placeholder="Cidade"
          isMulti={false}
          noOptionsMessage={() => 'Cidade não encontrada.'}
          onChange={(option) => setMunicipioId(option?.value as string)}
          styles={singleSelectStyles}
        />
        <MetasMunicipio />
        {acoesQuery.isLoading ? (
          <Loading times={10} />
        ) : (
          <>
            <div className="grid grid-cols-1 min-[1720px]:grid-cols-2 gap-6">
              <AcoesDashboard data={acoesQuery.data as PlanoAcao[]} />
              <PlacesDashboard
                data={acoesQuery.data as PlanoAcao[]}
                municipioId="5ea31f471a1c270051bd4966"
              />
            </div>
            <PlanAcaoTable data={acoesQuery.data as PlanoAcao[]} />
          </>
        )}
      </div>
    </div>
  );
};

export { AcoesPage };
