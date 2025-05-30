
import { useMemo } from 'react';
import { BalanceamentoData } from '../types/balanceamento';

export const useChartDataBalanceamento = (filteredData: BalanceamentoData[]) => {
  const statusData = useMemo(() => {
    const excedentes = filteredData.filter(p => p.status === "excedente").length;
    const ociosos = filteredData.filter(p => p.status === "ocioso").length;
    const normais = filteredData.filter(p => p.status === "normal").length;
    
    return [
      { name: "Excedentes", value: excedentes, color: "#EF4444" },
      { name: "Ociosos", value: ociosos, color: "#F59E0B" },
      { name: "Normais", value: normais, color: "#10B981" }
    ];
  }, [filteredData]);

  const eficienciaData = useMemo(() => {
    const regionais = [...new Set(filteredData.map(p => p.regional))];
    return regionais.map(regional => {
      const promotoresRegional = filteredData.filter(p => p.regional === regional);
      const eficienciaMedia = promotoresRegional.length > 0 ? 
        promotoresRegional.reduce((sum, p) => sum + p.eficiencia, 0) / promotoresRegional.length : 0;
      
      return {
        regional: regional,
        eficiencia: Math.round(eficienciaMedia * 100) / 100,
        promotores: promotoresRegional.length
      };
    }).filter(item => item.promotores > 0);
  }, [filteredData]);

  const horasData = useMemo(() => {
    const coordenadores = [...new Set(filteredData.map(p => p.coordenador))];
    return coordenadores.map(coordenador => {
      const promotoresCoordenador = filteredData.filter(p => p.coordenador === coordenador);
      const horasExcedentes = promotoresCoordenador.reduce((sum, p) => sum + p.horasExcedentes, 0);
      const horasOciosas = promotoresCoordenador.reduce((sum, p) => sum + p.horasOciosas, 0);
      
      return {
        coordenador: coordenador.split(' ').slice(0, 2).join(' '), // Abreviar nome
        horasExcedentes,
        horasOciosas,
        total: promotoresCoordenador.length
      };
    }).filter(item => item.total > 0).slice(0, 10); // Limitar a 10 para visualização
  }, [filteredData]);

  return {
    statusData,
    eficienciaData,
    horasData
  };
};
