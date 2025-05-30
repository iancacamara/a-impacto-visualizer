
export type TipoVaga = 'compartilhado-normal' | 'expansao';

export type StatusVaga = 
  | 'solicitada'
  | 'analise-regional'
  | 'aprovacao-gerencia'
  | 'aprovacao-coordenacao'
  | 'aprovada'
  | 'em-recrutamento'
  | 'candidatos-triagem'
  | 'entrevistas'
  | 'contratacao'
  | 'finalizada'
  | 'cancelada';

export type TipoSolicitacao = 'regional' | 'gerente' | 'coordenacao';

export interface Vaga {
  id: string;
  titulo: string;
  tipo: TipoVaga;
  descricao: string;
  regional: string;
  cidade: string;
  uf: string;
  marca: string;
  familia: string;
  horasSemanais: number;
  salario?: number;
  status: StatusVaga;
  tipoSolicitacao: TipoSolicitacao;
  solicitadoPor: string;
  dataAbertura: string;
  dataLimite: string;
  observacoes?: string;
  candidatos?: number;
  gestorResponsavel: string;
  coordenador: string;
  prioridade: 'baixa' | 'media' | 'alta' | 'urgente';
}

export interface EstatisticasVagas {
  totalVagas: number;
  vagasCompartilhadas: number;
  vagasExpansao: number;
  vagasAbertas: number;
  vagasFinalizadas: number;
  tempoMedioPreenchimento: number;
}
