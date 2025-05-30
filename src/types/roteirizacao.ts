
export interface RoteirizacaoData {
  id: string;
  nomePromotor: string;
  uf: string;
  cidade: string;
  bairro: string;
  endereco: string;
  marca: string;
  familia: string;
  horas: number;
  coordenadas: {
    lat: number;
    lng: number;
  };
  gestorRegional: string;
  coordenador: string;
  supervisorLoja: string;
  status: 'ativo' | 'inativo' | 'pendente';
}

export interface RotaSimulada {
  id: string;
  nome: string;
  pontos: RoteirizacaoData[];
  distanciaTotal: number;
  tempoEstimado: number;
  cor: string;
  otimizada: boolean;
}

export interface EstatisticasRota {
  totalPromotores: number;
  totalRotas: number;
  distanciaTotal: number;
  tempoTotal: number;
  economia: number;
}
