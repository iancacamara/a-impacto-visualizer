
import { useState, useMemo } from 'react';
import { PromotorData, FilterState } from '../types/promoter';

export const useFilters = (promotorData: PromotorData[]) => {
  const [filters, setFiltersState] = useState<FilterState>({
    searchTerm: "",
    sortOrder: "desc",
    filterType: "all",
    selectedRegional: "all",
    selectedLoja: "all",
    selectedMarca: "all",
    selectedCategoria: "all",
    selectedSupervisor: "all",
    selectedTrade: "all",
    selectedFamilia: "all",
    selectedCoordenador: "all",
    selectedStatusPromotor: "all",
  });

  const setFilters = (newFilters: Partial<FilterState>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  };

  const resetAllFilters = () => {
    setFiltersState({
      searchTerm: "",
      sortOrder: "desc",
      filterType: "all",
      selectedRegional: "all",
      selectedLoja: "all",
      selectedMarca: "all",
      selectedCategoria: "all",
      selectedSupervisor: "all",
      selectedTrade: "all",
      selectedFamilia: "all",
      selectedCoordenador: "all",
      selectedStatusPromotor: "all",
    });
  };

  const filteredData = useMemo(() => {
    return promotorData.filter(item => {
      const matchesSearch = item.nome.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesType = filters.filterType === "all" || item.tipo === filters.filterType;
      const matchesRegional = filters.selectedRegional === "all" || item.regional === filters.selectedRegional;
      const matchesLoja = filters.selectedLoja === "all" || item.loja === filters.selectedLoja;
      const matchesMarca = filters.selectedMarca === "all" || item.marca === filters.selectedMarca;
      const matchesCategoria = filters.selectedCategoria === "all" || item.categoria === filters.selectedCategoria;
      const matchesSupervisor = filters.selectedSupervisor === "all" || item.supervisor === filters.selectedSupervisor;
      const matchesTrade = filters.selectedTrade === "all" || item.trade === filters.selectedTrade;
      const matchesFamilia = filters.selectedFamilia === "all" || item.familia === filters.selectedFamilia;
      const matchesCoordenador = filters.selectedCoordenador === "all" || item.coordenador === filters.selectedCoordenador;
      const matchesStatusPromotor = filters.selectedStatusPromotor === "all" || item.statusPromotor === filters.selectedStatusPromotor;
      
      return matchesSearch && matchesType && matchesRegional && matchesLoja && matchesMarca && 
             matchesCategoria && matchesSupervisor && matchesTrade && matchesFamilia && 
             matchesCoordenador && matchesStatusPromotor;
    }).sort((a, b) => 
      filters.sortOrder === "desc" 
        ? b.atendimentosImpactados - a.atendimentosImpactados 
        : a.atendimentosImpactados - b.atendimentosImpactados
    );
  }, [promotorData, filters]);

  return {
    filters,
    setFilters,
    resetAllFilters,
    filteredData
  };
};
