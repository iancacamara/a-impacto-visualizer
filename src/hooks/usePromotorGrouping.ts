
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
    if (!rawData || rawData.length === 0) {
      return [];
    }

    console.log("=== INÍCIO DO PROCESSAMENTO (CORRIGIDO) ===");
    console.log("Total de linhas na planilha:", rawData.length);
    
    // Criar um Map para agrupar por nome EXATO do promotor (SEM TRIM)
    const promotorMap = new Map<string, {
      dados: BalanceamentoData;
      totalHoras: number;
      linhasCount: number;
    }>();

    // Processar cada linha da planilha
    rawData.forEach((linha) => {
      const nomePromotorExato = linha.promotor; // Nome EXATO sem modificações
      
      if (!promotorMap.has(nomePromotorExato)) {
        promotorMap.set(nomePromotorExato, {
          dados: linha, // Primeira linha encontrada para este promotor
          totalHoras: 0,
          linhasCount: 0
        });
      }
      
      const promotorInfo = promotorMap.get(nomePromotorExato)!;
      promotorInfo.totalHoras += linha.horasRealizadas;
      promotorInfo.linhasCount++;
    });

    console.log("=== RESULTADO DO AGRUPAMENTO (CORRIGIDO) ===");
    console.log("Total de promotores ÚNICOS encontrados:", promotorMap.size);
    
    let totalHorasCalculadas = 0;
    let totalOciosos = 0;
    let totalSobrecarga = 0;
    let totalDentro = 0;
    
    // Converter Map para array de PromotorAgrupado
    const resultado: PromotorAgrupado[] = Array.from(promotorMap.entries()).map(([nomePromotor, info], index) => {
      const primeiraLinha = info.dados;
      const horasmes = info.totalHoras;
      
      totalHorasCalculadas += horasmes;
      
      // Calcular teto baseado no perfil
      const perfilOriginal = primeiraLinha.perfil || 'promotorexpress';
      const perfilParaCalculo = perfilOriginal.toLowerCase().trim();
      const teto = TETO_POR_PERFIL[perfilParaCalculo] || TETO_POR_PERFIL['promotorexpress'] || 320;
      
      // Calcular diferença
      const diferenca_horas = horasmes - teto;
      
      // Determinar status e contar
      let status_final: "SOBRECARGA" | "OCIOSO" | "DENTRO";
      if (diferenca_horas > 0) {
        status_final = "SOBRECARGA";
        totalSobrecarga++;
      } else if (diferenca_horas < 0) {
        status_final = "OCIOSO";
        totalOciosos++;
      } else {
        status_final = "DENTRO";
        totalDentro++;
      }
      
      // Calcular eficiência
      const eficiencia = teto > 0 ? Math.round((horasmes / teto) * 100 * 10) / 10 : 0;
      
      return {
        id: `promotor-${index + 1}`,
        promotor: nomePromotor,
        perfil: perfilOriginal,
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
      };
    });

    console.log("=== TOTAIS FINAIS (CORRIGIDOS) ===");
    console.log("Promotores únicos:", resultado.length);
    console.log("Total horas:", totalHorasCalculadas);
    console.log("Ociosos:", totalOciosos);
    console.log("Sobrecarga:", totalSobrecarga);
    console.log("Dentro do teto:", totalDentro);
    
    // Mostrar alguns exemplos de promotores processados
    console.log("Exemplos de promotores processados:");
    resultado.slice(0, 5).forEach(p => {
      console.log(`- ${p.promotor}: ${p.horasmes}h (${p.status_final})`);
    });
    
    // Verificar se chegamos aos números corretos
    console.log("=== VERIFICAÇÃO DOS NÚMEROS ESPERADOS ===");
    console.log("Esperado: 1344 promotores, obtido:", resultado.length);
    console.log("Esperado: 257450 horas, obtido:", totalHorasCalculadas);
    console.log("Esperado: 1126 ociosos, obtido:", totalOciosos);
    console.log("Esperado: 209 sobrecarga, obtido:", totalSobrecarga);
    
    return resultado.sort((a, b) => b.horasmes - a.horasmes);
  }, [rawData]);

  return promotoresAgrupados;
};

export default usePromotorGrouping;
