export interface BalanceamentoData {
  id: number;
  coordenador: string;
  promotor: string;
  uf: string;
  cidade: string;
  bairro: string;
  regional: string;
  gestorRegional: string;
  loja: string;
  supervisorLoja: string;
  horasMaximas: number;
  horasRealizadas: number;
  horasExcedentes: number;
  horasOciosas: number;
  eficiencia: number;
  data: string;
  status: "excedente" | "ocioso" | "normal";
  perfil?: string; // Novo campo para suportar o perfil do promotor
}

export interface BalanceamentoStats {
  totalPromotores: number;
  horasExcedentesTotal: number;
  horasOciosasTotal: number;
  eficienciaMedia: number;
  promotoresExcedentes: number;
  promotoresOciosos: number;
}

export interface BalanceamentoFilters {
  searchTerm: string;
  selectedUF: string;
  selectedCidade: string;
  selectedRegional: string;
  selectedGestorRegional: string;
  selectedCoordenador: string;
  selectedSupervisorLoja: string;
  selectedStatus: string;
  sortOrder: "asc" | "desc";
}
