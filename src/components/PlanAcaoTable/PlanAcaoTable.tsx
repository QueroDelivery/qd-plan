import { DataTable } from '../DataTable';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';

import classNames from 'classnames';
import { createColumnHelper } from '@tanstack/react-table';
import {
  ArrowUpDown,
  Check,
  ListFilter,
  MoreHorizontal,
  Trash2,
} from 'lucide-react';
import { Button } from '../ui/button';
import useAcaoModalStore from 'src/store/useAcaoModalStore';
import { AcaoModal } from '../AcaoModal';
import { PlanoAcao } from 'src/hooks/useAcoes';
import { AcoesSelect, Option } from './components/AcoesSelect';
import { useState } from 'react';
import { PlacesSelect } from './components/PlacesSelect';

const statusOptions = [
  {
    label: 'Todos',
    value: '',
  },
  {
    label: 'Concluído',
    value: 'CONCLUIDO',
  },
  {
    label: 'Não iniciada',
    value: 'NAO_INICIADA',
  },
  {
    label: 'Cancelado',
    value: 'CANCELADO',
  },
  {
    label: 'Em andamento',
    value: 'EM_ANDAMENTO',
  },
  {
    label: 'Atrasado',
    value: 'ATRASADO',
  },
];

const columnHelper = createColumnHelper<PlanoAcao>();

const columns = [
  columnHelper.accessor('planoAcaoId', {
    header: 'Id',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('acaoTipo', {
    header: 'Ação',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('nomeCriador', {
    header: 'Criado por',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('nomeExecutor', {
    header: 'Execução',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('acaoFinalidade', {
    header: 'Finalidade',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('prazoInicio', {
    header: 'Data de início',
    cell: (props) => {
      const date = new Date(props.getValue());
      return date.toLocaleDateString('pt-BR');
    },
  }),
  columnHelper.accessor('valorRealizado', {
    header: 'Valor realizado',
    cell: (props) => {
      const value = props.getValue() || 0;
      return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      });
    },
  }),
  columnHelper.accessor('status', {
    header: ({ column }) => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="border-none" variant="ghost">
              <p className="mr-3">Status</p>
              <ListFilter size={15} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuRadioGroup value={column.getFilterValue() as string}>
              {statusOptions.map((option) => (
                <DropdownMenuRadioItem
                  onSelect={() => column.setFilterValue(option.value)}
                  className="py-2"
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </DropdownMenuRadioItem>
              ))}
            </DropdownMenuRadioGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
    cell: (props) => {
      const status = props.getValue();
      const updatedStatus = (
        status[0] + status.substring(1).toLowerCase()
      ).replace('_', ' ');
      const renderedStatus = (
        <div className="px-1">
          <span
            className={classNames('ml-1 p-1 rounded-md text-white truncate', {
              'bg-green-500/70': updatedStatus === 'Concluido',
              'bg-gray-500/70': updatedStatus === 'Cancelado',
              'bg-red-500/70': updatedStatus === 'Atrasado',
              'bg-orange-500/70': updatedStatus === 'Nao iniciada',
              'bg-sky-500': updatedStatus === 'Em andamento',
            })}
          >
            {updatedStatus}
          </span>
        </div>
      );
      return renderedStatus;
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sortingFn: (rowA, rowB, _columnId) => {
      const statusA = rowA.original.status;
      const statusB = rowB.original.status;
      const statusOrder = [
        'ATRASADO',
        'NAO_INICIADA',
        'EM_ANDAMENTO',
        'CANCELADO',
        'CONCLUIDO',
      ];
      return statusOrder.indexOf(statusA) - statusOrder.indexOf(statusB);
    },
  }),
  columnHelper.display({
    id: 'actions',
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            onClick={(e) => e.stopPropagation()}
            align="center"
          >
            <DropdownMenuItem className="flex items-center gap-2 text-green-500 focus:text-green-500">
              <Check size={18} />
              <span>Aprovar</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="flex items-center gap-2 text-red-500 focus:text-red-500">
              <Trash2 size={18} />
              <span>Excluir</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  }),
];

const initialSortingState = [
  {
    id: 'status',
    desc: false,
  },
];

type TPlanAcaoTable = {
  data: PlanoAcao[];
  municipioId: string;
};

const PlanAcaoTable = ({ data, municipioId }: TPlanAcaoTable) => {
  const { onOpen } = useAcaoModalStore();
  const [selectedTipoAcao, setSelectedTipoAcao] = useState<Option | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<Option | null>(null);

  const filteredData = data.filter((acao) => {
    const matchesTipoAcao =
      !selectedTipoAcao || acao.acaoTipo === selectedTipoAcao?.label;
    const matchesPlace =
      !selectedPlace ||
      acao.placeIds?.split(',').includes(selectedPlace?.value as string);

    return matchesTipoAcao && matchesPlace;
  });

  const onRowClick = (row: PlanoAcao) => {
    onOpen(row);
  };

  const selects = (
    <div className="grid grid-cols-2 gap-6">
      <AcoesSelect
        value={selectedTipoAcao as Option}
        onChange={setSelectedTipoAcao}
      />
      <PlacesSelect
        value={selectedPlace as Option}
        onChange={setSelectedPlace}
        municipioId={municipioId}
      />
    </div>
  );

  return (
    <>
      <DataTable
        filterSelect={selects}
        data={filteredData}
        columns={columns}
        onRowClick={onRowClick}
        initialSortingState={initialSortingState}
      />
      <AcaoModal />
    </>
  );
};

export { PlanAcaoTable };
