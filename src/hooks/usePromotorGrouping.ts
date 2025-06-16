
import { useMemo } from 'react';
import { BalanceamentoData } from '../types/balanceamento';

// Teto por perfil exatamente como especificado
const TETO_POR_PERFIL: Record<string, number> = {
  "coordenador": 320,
  "intermitente": 320,
  "líder": 320,
  "lider": 320,
  "lidersupervisor": 320,
  "parttime4": 120,
  "parttime5": 150,
  "parttime6": 175,
  "promotor": 220,
  "promotorexpress": 320,
  "promotorlivre": 320,
  "semroteiro": 320,
  "supervisor": 320,
  "terceirizado": 320
};

export interface PromotorAgrupado {
  id: string;
  promotor: string;
  perfil: string;
  horasmes: number;
  teto: number;
  diferenca_horas: number;
  status_final: "SOBRECARGA" | "OCIOSO" | "DENTRO";
  eficiencia: number;
  coordenador: string;
  regional: string;
  gestorRegional: string;
  loja: string;
  supervisorLoja: string;
  uf: string;
  cidade: string;
  bairro: string;
  data: string;
}

export const usePromotorGrouping = (rawData: BalanceamentoData[]) => {
  const promotoresAgrupados = useMemo(() => {
    // Agrupar por nome do promotor
    const grupos = rawData.reduce((acc, curr) => {
      const key = curr.promotor.trim();
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(curr);
      return acc;
    }, {} as Record<string, BalanceamentoData[]>);

    // Processar cada grupo de promotor
    const resultado: PromotorAgrupado[] = [];
    
    Object.entries(grupos).forEach(([nomePromotor, linhas]) => {
      // Usar dados da primeira linha para informações não-agregáveis
      const primeiraLinha = linhas[0];
      
      // Somar horas de todas as linhas do promotor
      const horasmes = linhas.reduce((sum, linha) => sum + linha.horasRealizadas, 0);
      
      // Usar perfil da primeira linha válida
      const perfil = (primeiraLinha.perfil || 'promotor').toLowerCase().trim();
      
      // Calcular teto baseado no perfil
      const teto = TETO_POR_PERFIL[perfil] || TETO_POR_PERFIL['promotor'];
      
      // Calcular diferença
      const diferenca_horas = horasmes - teto;
      
      // Determinar status
      let status_final: "SOBRECARGA" | "OCIOSO" | "DENTRO";
      if (diferenca_horas > 0) status_final = "SOBRECARGA";
      else if (diferenca_horas < 0) status_final = "OCIOSO";
      else status_final = "DENTRO";
      
      // Calcular eficiência
      const eficiencia = teto > 0 ? Math.round((horasmes / teto) * 100 * 10) / 10 : 0;
      
      resultado.push({
        id: `promotor-${resultado.length + 1}`,
        promotor: nomePromotor,
        perfil,
        horasmes,
        teto,
        diferenca_horas,
        status_final,
        eficiencia,
        coordenador: primeiraLinha.coordenador,
        regional: primeiraLinha.regional,
        gestorRegional: primeiraLinha.gestorRegional,
        loja: primeiraLinha.loja,
        supervisorLoja: primeiraLinha.supervisorLoja,
        uf: primeiraLinha.uf,
        cidade: primeiraLinha.cidade,
        bairro: primeiraLinha.bairro,
        data: primeiraLinha.data
      });
    });

    return resultado;
  }, [rawData]);

  return promotoresAgrupados;
};

export default usePromotorGrouping;
