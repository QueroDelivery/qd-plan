import useLancamentos from 'src/hooks/useLancamentos';
import { LancamentosTable } from './LancamentosTable';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { type Lancamentos } from 'src/hooks/useLancamentos';
import { Input } from 'src/components/ui/input';
import { MultiValue } from 'react-select';

type Option = {
  label: string;
  value: string;
};

type LancamentosProps = {
  planAcaoId: number;
  places: MultiValue<Option>;
};

type LancamentosValue = Omit<Lancamentos, 'placeId'>;

type LancamentosTableData = {
  placeId: string;
  placeName: string;
  valorCredito: number;
};

const columnHelper = createColumnHelper<LancamentosTableData>();

const columns: ColumnDef<LancamentosTableData, any>[] = [
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
      const value = props.getValue();
      return <Input type="number" value={value} />;
    },
  }),
];

const Lancamentos = ({ planAcaoId, places }: LancamentosProps) => {
  const { data, isPending } = useLancamentos(planAcaoId);

  const lancamentosMap = new Map<string, LancamentosValue>();

  data?.forEach((lancamento) => {
    const { placeId, ...value } = lancamento;
    lancamentosMap.set(placeId, value);
  });

  const refinedData = places.map((place) => {
    const result = lancamentosMap.get(place.value);
    return {
      placeId: place.value,
      placeName: place.label,
      valorCredito: result?.valorCredito || 0,
    };
  });

  if (isPending) return 'Loading...';

  if (data) {
    return <LancamentosTable data={refinedData} columns={columns} />;
  }
};

export { Lancamentos };
