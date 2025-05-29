
export interface PromotorData {
  id: number;
  nome: string;
  tipo: string;
  status: "registrou" | "não registrou";
  loja: string;
  marca: string;
  categoria: string;
  familia: string;
  trade: string;
  horasRegistradas: number;
  horasPlanejadas: number;
  atendimentosImpactados: number;
  data: string;
  regional: string;
  supervisor: string;
  coordenador: string;
  statusPromotor: string;
}

export interface FilterState {
  searchTerm: string;
  sortOrder: "asc" | "desc";
  filterType: string;
  selectedRegional: string;
  selectedLoja: string;
  selectedMarca: string;
  selectedCategoria: string;
  selectedSupervisor: string;
  selectedTrade: string;
  selectedFamilia: string;
  selectedCoordenador: string;
  selectedStatusPromotor: string;
}

export interface DashboardStats {
  promotoresAusentes: number;
  atendimentosImpactados: number;
  totalPromotores: number;
  lojasAfetadas: number;
  marcasAfetadas: number;
  familiasAfetadas: number;
}
