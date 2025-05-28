
import { useMemo } from 'react';
import { PromotorData } from '../types/promoter';

export const useChartData = (filteredData: PromotorData[]) => {
  const statusData = useMemo(() => {
    const registraram = filteredData.filter(p => p.status === "registrou").length;
    const naoRegistraram = filteredData.filter(p => p.status === "não registrou").length;
    
    return [
      { name: "Registraram", value: registraram, color: "#10B981" },
      { name: "Não Registraram", value: naoRegistraram, color: "#EF4444" }
    ];
  }, [filteredData]);

  const tipoData = useMemo(() => {
    const tipos = ["promotor", "supervisor", "parttime4", "parttime6", "lider", "promotorexpress"];
    return tipos.map(tipo => ({
      tipo: tipo.charAt(0).toUpperCase() + tipo.slice(1),
      registrou: filteredData.filter(p => p.tipo === tipo && p.status === "registrou").length,
      naoRegistrou: filteredData.filter(p => p.tipo === tipo && p.status === "não registrou").length,
    })).filter(item => item.registrou > 0 || item.naoRegistrou > 0);
  }, [filteredData]);

  const marcasAfetadas = useMemo(() => {
    const marcasData: { [key: string]: { marca: string; horas: number; afetada: boolean } } = {};
    filteredData.forEach(item => {
      if (!marcasData[item.marca]) {
        marcasData[item.marca] = { marca: item.marca, horas: 0, afetada: false };
      }
      if (item.status === "não registrou") {
        marcasData[item.marca].horas += item.horasPlanejadas;
        marcasData[item.marca].afetada = true;
      }
    });
    return Object.values(marcasData).filter(marca => marca.horas > 0);
  }, [filteredData]);

  return {
    statusData,
    tipoData,
    marcasAfetadas
  };
};
