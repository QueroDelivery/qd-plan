import { PlanoAcao } from 'src/hooks/useAcoes';
import usePlaces from 'src/hooks/usePlaces';
import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { PlacesTable } from 'src/components/PlacesDashboard/components/PlacesTable';

type TPlacesDashboard = {
  data: PlanoAcao[];
  municipioId: string;
};

type TopPlaces = {
  name: string;
  quantidadeAcoes: number;
  valorInvestido: number;
};

const PlacesDashboard = ({ data, municipioId }: TPlacesDashboard) => {
  const placesQuery = usePlaces(municipioId);

  const placeMap = new Map<string, string>();
  placesQuery.data?.forEach((place) => {
    placeMap.set(place.placeId, place.nomeExibicao);
  });

  const rankingMap = new Map<
    string,
    { quantidadeAcoes: number; valorInvestido: number }
  >();

  data.forEach((acao) => {
    if (!acao.placeIds) return;

    const placeIds = acao.placeIds.split(',');

    placeIds.forEach((placeId) => {
      const placeName = placeMap.get(placeId);

      if (!placeName) return;

      if (rankingMap.has(placeName)) {
        const currentData = rankingMap.get(placeName)!;
        currentData.quantidadeAcoes += 1;
        currentData.valorInvestido += acao.valorRealizado || 0;
      } else {
        rankingMap.set(placeName, {
          quantidadeAcoes: 1,
          valorInvestido: acao.valorRealizado || 0,
        });
      }
    });
  });

  const rankingArray: TopPlaces[] = [];
  rankingMap.forEach((value, key) => {
    rankingArray.push({ name: key, ...value });
  });

  const ranking = rankingArray
    .sort((a, b) => b.quantidadeAcoes - a.quantidadeAcoes)
    .slice(0, 3);

  const columnHelper = createColumnHelper<TopPlaces>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const columns: ColumnDef<TopPlaces, any>[] = [
    columnHelper.display({
      id: 'position',
      header: () => <span className="text-purple-500">#</span>,
      cell: (props) => <span>{props.row.index + 1}º</span>,
    }),
    columnHelper.accessor('name', {
      header: () => <span className="text-purple-500">Place</span>,
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('quantidadeAcoes', {
      header: () => <span className="text-purple-500">Ações</span>,
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('valorInvestido', {
      header: () => <span className="text-purple-500">Valor investido</span>,
      cell: (props) =>
        props.getValue().toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
    }),
  ];

  return <PlacesTable data={ranking} columns={columns} />;
};

export { PlacesDashboard };
