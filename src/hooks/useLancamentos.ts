import { useQuery } from '@tanstack/react-query';
import httpClient from 'src/axiosClient';

type TLancamentosResponse = {
  r: boolean;
  data: Lancamentos[];
};

export type Lancamentos = {
  lancamentoId: number;
  planoAcaoId: number;
  placeId: string;
  valorCredito: number;
};

const getLancamentosByPlanAcaoId = async (planAcaoId: number) => {
  const { data: response } = await httpClient.get<TLancamentosResponse>(
    `/getAllLancamentoByPlanoAcaoId?planoAcaoId=${planAcaoId}`
  );
  return response.data;
};

export default function useLancamentos(planAcaoId: number) {
  return useQuery({
    queryKey: ['lancamentos', planAcaoId],
    queryFn: () => getLancamentosByPlanAcaoId(planAcaoId),
  });
}
