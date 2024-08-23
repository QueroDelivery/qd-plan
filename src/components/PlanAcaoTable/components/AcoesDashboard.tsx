import { PlanoAcao } from '../PlanAcaoTable';
import { TbReportSearch, TbPointFilled } from 'react-icons/tb';

type TAcoesDashboard = {
  data: PlanoAcao[];
};

const AcoesDashboard = ({ data }: TAcoesDashboard) => {
  const totalAcoes = data.length;

  type GroupedItems = {
    [key in PlanoAcao['status']]: PlanoAcao[];
  };

  const statusList: PlanoAcao['status'][] = [
    'ATRASADO',
    'NAO_INICIADA',
    'EM_ANDAMENTO',
    'CANCELADO',
    'CONCLUIDO',
  ];

  const initialGrouped: GroupedItems = statusList.reduce((acc, status) => {
    acc[status] = [];
    return acc;
  }, {} as GroupedItems);

  const grouped = data.reduce((acc: GroupedItems, item: PlanoAcao) => {
    acc[item.status].push(item);
    return acc;
  }, initialGrouped);

  const acoesAtrasadas = grouped.ATRASADO.length;
  const acoesConcluidas = grouped.CONCLUIDO.length;
  const acoesNaoIniciadas = grouped.NAO_INICIADA.length;
  const acoesCanceladas = grouped.CANCELADO.length;
  const acoesEmAndamento = grouped.EM_ANDAMENTO.length;

  const totalInvestimentoPrevisto = data.reduce((acc, acao) => {
    return acao.quantoCusta + acc;
  }, 0);

  const totalInvestimentoRealizado = data.reduce((acc, acao) => {
    return (acao.valorRealizado || 0) + acc;
  }, 0);

  const valorDisponivel =
    totalInvestimentoPrevisto - totalInvestimentoRealizado;

  console.log(totalInvestimentoPrevisto);

  return (
    <div className="border-[1px] border-gray-200 p-6 rounded-xl shadow-md max-w-[800px]">
      <div className="flex flex-col">
        <div className="flex flex-row items-center gap-2">
          <TbReportSearch size={18} className="text-purple-500 font-bold" />
          <p className="text-sm text-purple-500">
            Resumo <strong>ações</strong>
          </p>
        </div>
        <div className="grid grid-cols-1 min-[350px]:grid-cols-2 min-[560px]:grid-cols-3 mt-6 gap-5">
          <div className="flex flex-col justify-center items-center w-[100px]">
            <p className="text-2xl font-semibold text-gray-700/80">
              {totalAcoes}
            </p>
            <p className="text-sm text-gray-500">Total de ações</p>
          </div>
          <div className="flex flex-col justify-center">
            <ul>
              <li className="flex gap-1 items-center">
                <TbPointFilled className="text-green-500" />
                <p className="text-sm text-gray-500">
                  {acoesConcluidas} concluídas{' '}
                  <span>
                    ({((acoesConcluidas / totalAcoes) * 100).toFixed(2)}%)
                  </span>
                </p>
              </li>
              <li className="flex gap-1 items-center">
                <TbPointFilled className="text-red-500" />
                <p className="text-sm text-gray-500 text-light">
                  {acoesAtrasadas} atrasadas{' '}
                  <span>
                    ({((acoesAtrasadas / totalAcoes) * 100).toFixed(2)}%)
                  </span>
                </p>
              </li>
              <li className="flex gap-1 items-center">
                <TbPointFilled className="text-orange-500" />
                <p className="text-sm text-gray-500">
                  {acoesNaoIniciadas} não iniciadas{' '}
                  <span>
                    ({((acoesNaoIniciadas / totalAcoes) * 100).toFixed(2)}%)
                  </span>
                </p>
              </li>
              <li className="flex gap-1 items-center">
                <TbPointFilled className="text-gray-500" />
                <p className="text-sm text-gray-500">
                  {acoesCanceladas} canceladas{' '}
                  <span>
                    ({((acoesCanceladas / totalAcoes) * 100).toFixed(2)}%)
                  </span>
                </p>
              </li>
              <li className="flex gap-1 items-center">
                <TbPointFilled className="text-sky-500" />
                <p className="text-sm text-gray-500">
                  {acoesEmAndamento} em andamento{' '}
                  <span>
                    ({((acoesEmAndamento / totalAcoes) * 100).toFixed(2)}%)
                  </span>
                </p>
              </li>
            </ul>
          </div>
          <div className="border-l px-4 space-y-2">
            <div>
              <p className="text-md font-medium text-gray-700/80">
                {totalInvestimentoPrevisto.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
              <p className="text-xs text-gray-500">Investimento Previsto</p>
            </div>
            <div>
              <p className="text-md font-medium text-gray-700/80">
                {totalInvestimentoRealizado.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
              <p className="text-xs text-gray-500">Investimento Realizado</p>
            </div>
            <div>
              <p className="text-md font-medium text-gray-700/80">
                {valorDisponivel.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </p>
              <p className="text-xs text-gray-500">Valor disponível</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export { AcoesDashboard };
