
import { useState, useMemo } from 'react';
import { BalanceamentoData, BalanceamentoFilters } from '../types/balanceamento';
import { PromotorAgrupado } from './usePromotorGrouping';

export const useFiltersBalanceamento = (promotoresAgrupados: PromotorAgrupado[]) => {
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
    return promotoresAgrupados.filter(item => {
      const matchesSearch = item.promotor.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
                           item.coordenador.toLowerCase().includes(filters.searchTerm.toLowerCase());
      const matchesUF = !filters.selectedUF || item.uf === filters.selectedUF;
      const matchesCidade = !filters.selectedCidade || item.cidade === filters.selectedCidade;
      const matchesRegional = !filters.selectedRegional || item.regional === filters.selectedRegional;
      const matchesGestorRegional = !filters.selectedGestorRegional || item.gestorRegional === filters.selectedGestorRegional;
      const matchesCoordenador = !filters.selectedCoordenador || item.coordenador === filters.selectedCoordenador;
      const matchesSupervisorLoja = !filters.selectedSupervisorLoja || item.supervisorLoja === filters.selectedSupervisorLoja;
      
      // Mapear status do filtro para o status_final baseado em DIFERENCA_HORAS
      let matchesStatus = true;
      if (filters.selectedStatus) {
        if (filters.selectedStatus === "excedente") {
          matchesStatus = item.diferenca_horas > 0; // SOBRECARGA
        } else if (filters.selectedStatus === "ocioso") {
          matchesStatus = item.diferenca_horas < 0; // OCIOSO
        } else if (filters.selectedStatus === "normal") {
          matchesStatus = item.diferenca_horas === 0; // DENTRO
        }
      }
      
      return matchesSearch && matchesUF && matchesCidade && matchesRegional && 
             matchesGestorRegional && matchesCoordenador && matchesSupervisorLoja && matchesStatus;
    }).sort((a, b) => 
      filters.sortOrder === "desc" 
        ? b.eficiencia - a.eficiencia 
        : a.eficiencia - b.eficiencia
    );
  }, [promotoresAgrupados, filters]);

  return {
    filters,
    setFilters,
    resetAllFilters,
    filteredData
  };
};
