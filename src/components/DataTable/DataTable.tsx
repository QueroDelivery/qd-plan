import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  getSortedRowModel,
  getFilteredRowModel,
  ColumnDef,
  SortingState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/components/ui/table';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';

import { Button } from '../ui/button';

import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react';

import { CiFilter } from 'react-icons/ci';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick: (row: TData) => void;
  initialSortingState?: SortingState;
}

const DataTable = <TData, TValue>({
  data,
  columns,
  onRowClick,
  initialSortingState,
}: DataTableProps<TData, TValue>) => {
  const table = useReactTable({
    data,
    columns,
    initialState: {
      sorting: initialSortingState,
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  let name = 'registros encontrados';
  if (table.getPrePaginationRowModel().rows.length === 1) {
    name = 'registro encontrado';
  }

  return (
    <>
      <div className="my-4">
        <div className="flex justify-end p-2 items-center gap-2">
          <CiFilter size={18} />
          <p className="text-md text-gray-700/80">
            {table.getPrePaginationRowModel().rows.length} {name}
          </p>
        </div>
      </div>
      <div className="rounded-xl border shadow-md">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  className="cursor-pointer"
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                  onClick={() => onRowClick(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Nenhum resultado encontrado.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-4 flex items-center justify-between flex-wrap">
        <div className="flex items-center gap-2">
          <p>Mostrando</p>
          <Select
            defaultValue={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger className="w-[60px] h-8">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {['10', '20', '30', '40', '50'].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p>
            registros de{' '}
            <span className="font-semibold">
              {table.getRowCount().toLocaleString()}
            </span>
          </p>
        </div>
        <div className="flex items-center">
          <Button
            variant="ghost"
            className="gap-3"
            onClick={() => table.firstPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronsLeft size={18} />
          </Button>
          <Button
            variant="ghost"
            className="gap-3"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <ChevronLeft size={18} />
            <p>Voltar</p>
          </Button>
          <Button
            variant="ghost"
            className="gap-3"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <p>Próximo</p>
            <ChevronRight size={18} />
          </Button>
          <Button
            variant="ghost"
            className="gap-3"
            onClick={() => table.lastPage()}
            disabled={!table.getCanNextPage()}
          >
            <ChevronsRight size={18} />
          </Button>
        </div>
      </div>
    </>
  );
};

export { DataTable };
