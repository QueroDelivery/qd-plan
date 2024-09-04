import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

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

const getAllAcoesByMunicipioId = async (
  municipioId: string,
  month: number,
  year: number
): Promise<PlanoAcao[]> => {
  const { data: response } = await axios.get<PlanAcaoResponse>(
    `https://69p49iiw43.execute-api.us-east-2.amazonaws.com/getAllPlanoAcaoByMunicipioId?municipioId=${municipioId}&ano=${year}&mes=${month}`,
    {
      headers: {
        Authorization: import.meta.env.VITE_AUTHORIZATION_TOKEN,
      },
    }
  );
  return response.data;
};

export default function useAcoes(
  municipioId: string,
  month: number,
  year: number
) {
  return useQuery({
    queryKey: ['acoes', municipioId, month, year],
    queryFn: () => getAllAcoesByMunicipioId(municipioId, month, year),
    refetchOnWindowFocus: false,
  });
}
