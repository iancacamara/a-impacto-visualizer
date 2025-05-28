
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
      
      return matchesSearch && matchesType && matchesRegional && matchesLoja && matchesMarca && matchesCategoria && matchesSupervisor;
    }).sort((a, b) => 
      filters.sortOrder === "desc" 
        ? b.horasRegistradas - a.horasRegistradas 
        : a.horasRegistradas - b.horasRegistradas
    );
  }, [promotorData, filters]);

  return {
    filters,
    setFilters,
    resetAllFilters,
    filteredData
  };
};
