import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { DataTable } from '../DataTable';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from 'src/components/ui/dropdown-menu';

import classNames from 'classnames';
import { createColumnHelper } from '@tanstack/react-table';
import { ArrowUpDown, ListFilter } from 'lucide-react';
import { Button } from '../ui/button';
import useAcaoModalStore from 'src/store/useAcaoModalStore';
import { AcaoModal } from '../AcaoModal';
import { Loading } from './components/Loading';
import { AcoesDashboard } from './components/AcoesDashboard';

export type PlanoAcao = {
  municipioId: string;
  planoAcaoId: number;
  nomeCriador: string;
  nomeExecutor: string;
  emailCriador: string | null;
  acaoTipo: string;
  comentario: string | null;
  createdAt: string;
  prazoInicio: string;
  prazoFim: string;
  onde: string;
  acaoFinalidade: string;
  quantoCusta: number;
  valorRealizado: number | null;
  como: string;
  status: string;
  observacao: string | null;
  influencerId: string;
  placeIds: string | null;
  isCreditoFaturaPlace: number;
};

type PlanAcaoResponse = {
  r: boolean;
  data: PlanoAcao[];
};

const getPlanAcoes = async (): Promise<PlanoAcao[]> => {
  const { data: response } = await axios.get<PlanAcaoResponse>(
    import.meta.env.VITE_URL,
    {
      headers: {
        Authorization: import.meta.env.VITE_AUTHORIZATION_TOKEN,
      },
    }
  );
  return response.data;
};

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
  columnHelper.accessor('acaoTipo', {
    header: 'Ação',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('nomeCriador', {
    header: 'Criado por',
    cell: (props) => props.getValue(),
  }),
  columnHelper.accessor('acaoFinalidade', {
    header: 'Finalidade',
    cell: (props) => props.getValue(),
  }),
  // columnHelper.accessor('createdAt', {
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() =>
  //           column.toggleSorting(
  //             column.getIsSorted() === 'asc' || !column.getIsSorted()
  //           )
  //         }
  //       >
  //         Criado em
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: (props) => {
  //     const date = props.getValue();
  //     const formatedDate = new Date(date);
  //     return (
  //       <span className="px-4">{formatedDate.toLocaleDateString('pt-BR')}</span>
  //     );
  //   },
  // }),
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
            className={classNames('ml-1 p-1 rounded-md text-white', {
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
  //   columnHelper.display(),
];

const initialSortingState = [
  {
    id: 'status',
    desc: false,
  },
];

const PlanAcaoTable = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['acoes'],
    queryFn: getPlanAcoes,
  });
  const { onOpen } = useAcaoModalStore();

  const onRowClick = (row: PlanoAcao) => {
    onOpen(row);
  };

  if (isLoading) return <Loading times={10} />;

  return (
    <>
      <AcoesDashboard data={data as PlanoAcao[]} />
      <DataTable
        data={data as PlanoAcao[]}
        columns={columns}
        onRowClick={onRowClick}
        initialSortingState={initialSortingState}
      />
      <AcaoModal />
    </>
  );
};

export { PlanAcaoTable };
