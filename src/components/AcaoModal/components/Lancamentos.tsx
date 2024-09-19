import useLancamentos from 'src/hooks/useLancamentos';
import { LancamentosTable } from './LancamentosTable';
import { createColumnHelper } from '@tanstack/react-table';
import { type Lancamentos } from 'src/hooks/useLancamentos';
import { MultiValue } from 'react-select';
import { LoadingSpinner } from 'src/LoadingSpinner';
import { FormLancamentos } from 'src/components/FormLancamentos/FormLancamentos';
import { useMemo } from 'react';

type Option = {
  label: string;
  value: string;
};

type LancamentosProps = {
  planAcaoId: number;
  places: MultiValue<Option>;
};

type LancamentosValue = Omit<Lancamentos, 'placeId'>;

export type LancamentosTableData = {
  placeId: string;
  placeName: string;
  valorCredito: number;
  lancamentoId?: number;
  planoAcaoId?: number;
};

const columnHelper = createColumnHelper<LancamentosTableData>();

const columns = [
  columnHelper.accessor('placeId', {
    header: () => <span className="text-purple-500">PlaceId</span>,
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('placeName', {
    header: () => <span className="text-purple-500">Parceiro</span>,
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('valorCredito', {
    header: () => <span className="text-purple-500">Valor do crédito</span>,
    cell: (props) => {
      const row = props.row.original;
      return <FormLancamentos row={row} />;
    },
  }),
];

const Lancamentos = ({ planAcaoId, places }: LancamentosProps) => {
  const { data, isPending } = useLancamentos(planAcaoId);

  const lancamentosMap = useMemo(
    () =>
      new Map<string, LancamentosValue>(
        data?.map((lancamento) => {
          const { placeId, ...value } = lancamento;
          return [placeId, value];
        })
      ),
    [data]
  );

  const refinedData = useMemo(
    () =>
      places.map((place) => {
        const result = lancamentosMap.get(place.value);

        const row = {
          placeId: place.value,
          placeName: place.label,
          valorCredito: 0,
        };

        if (!result) return row;

        return {
          ...row,
          valorCredito: result.valorCredito,
          lancamentoId: result.lancamentoId,
          planoAcaoId: result.planoAcaoId,
        };
      }),
    [lancamentosMap, places]
  );

  if (isPending) return <LoadingSpinner />;

  if (data) {
    return <LancamentosTable data={refinedData} columns={columns} />;
  }
};

export { Lancamentos };
