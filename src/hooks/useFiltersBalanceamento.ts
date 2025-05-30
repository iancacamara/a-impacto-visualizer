
import { useState, useMemo } from 'react';
import { BalanceamentoData, BalanceamentoFilters } from '../types/balanceamento';

export const useFiltersBalanceamento = (balanceamentoData: BalanceamentoData[]) => {
  const [filters, setFiltersState] = useState<BalanceamentoFilters>({
    searchTerm: "",
    selectedUF: "",
    selectedCidade: "",
    selectedRegional: "",
    selectedGestorRegional: "",
    selectedCoordenador: "",
    selectedSupervisorLoja: "",
    selectedStatus: "",
    sortOrder: "desc",
  });

  const setFilters = (newFilters: Partial<BalanceamentoFilters>) => {
    setFiltersState(prev => ({ ...prev, ...newFilters }));
  };

  const resetAllFilters = () => {
    setFiltersState({
      searchTerm: "",
      selectedUF: "",
      selectedCidade: "",
      selectedRegional: "",
      selectedGestorRegional: "",
      selectedCoordenador: "",
      selectedSupervisorLoja: "",
      selectedStatus: "",
      sortOrder: "desc",
    });
  };

  const filteredData = useMemo(() => {
    return balanceamentoData.filter(item => {
      const matchesSearch = item.promotor.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           item.coordenador.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesUF = !filters.selectedUF || item.uf === filters.selectedUF;
      const matchesCidade = !filters.selectedCidade || item.cidade === filters.selectedCidade;
      const matchesRegional = !filters.selectedRegional || item.regional === filters.selectedRegional;
      const matchesGestorRegional = !filters.selectedGestorRegional || item.gestorRegional === filters.selectedGestorRegional;
      const matchesCoordenador = !filters.selectedCoordenador || item.coordenador === filters.selectedCoordenador;
      const matchesSupervisorLoja = !filters.selectedSupervisorLoja || item.supervisorLoja === filters.selectedSupervisorLoja;
      const matchesStatus = !filters.selectedStatus || item.status === filters.selectedStatus;
      
      return matchesSearch && matchesUF && matchesCidade && matchesRegional && 
             matchesGestorRegional && matchesCoordenador && matchesSupervisorLoja && matchesStatus;
    }).sort((a, b) => 
      filters.sortOrder === "desc" 
        ? b.eficiencia - a.eficiencia 
        : a.eficiencia - b.eficiencia
    );
  }, [balanceamentoData, filters]);

  return {
    filters,
    setFilters,
    resetAllFilters,
    filteredData
  };
};
