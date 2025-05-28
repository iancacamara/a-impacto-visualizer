
export interface PromotorData {
  id: number;
  nome: string;
  tipo: string;
  status: "registrou" | "não registrou";
  loja: string;
  marca: string;
  categoria: string;
  horasRegistradas: number;
  horasPlanejadas: number;
  data: string;
  regional: string;
  supervisor: string;
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
}
