
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { BalanceamentoData } from '../types/balanceamento';
import * as XLSX from 'xlsx';

interface UploadPlanilhaBalanceamentoProps {
  onDataLoad: (data: BalanceamentoData[]) => void;
  onError: (message: string) => void;
}

const UploadPlanilhaBalanceamento = ({ onDataLoad, onError }: UploadPlanilhaBalanceamentoProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Configuração de teto por perfil (exatamente como no código Python)
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

  const processarPlanilhaExcel = async (file: File) => {
    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data);
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      
      console.log("Dados brutos da planilha:", jsonData);
      
      if (!jsonData || jsonData.length < 2) {
        onError("A planilha está vazia ou não contém dados suficientes.");
        return;
      }

      const headers = (jsonData[0] as string[]) || [];
      const rows = jsonData.slice(1) as any[][];

      console.log("Cabeçalhos encontrados:", headers);
      console.log("Total de linhas de dados:", rows.length);

      // Encontrar índices das colunas importantes
      const findColumnIndex = (possibleNames: string[]): number => {
        for (const name of possibleNames) {
          const index = headers.findIndex(h => {
            if (!h) return false;
            const headerStr = String(h).toLowerCase().trim();
            const nameStr = name.toLowerCase();
            return headerStr === nameStr || headerStr.includes(nameStr);
          });
          if (index !== -1) return index;
        }
        return -1;
      };

      const colIndexes = {
        promotor: findColumnIndex(['PROMOTOR SUGERIDO', 'PROMOTOR', 'Promotor']),
        perfil: findColumnIndex(['Perfil Promotor', 'Perfil', 'PERFIL']),
        horasmes: findColumnIndex(['HORASMES', 'Horas Mes', 'Horas Mês']),
        coordenador: findColumnIndex(['Coordenador', 'COORDENADOR']),
        regional: findColumnIndex(['Regional', 'REGIONAL']),
        loja: findColumnIndex(['Nome Loja', 'NOME', 'Loja']),
        uf: findColumnIndex(['UF Loja', 'UF']),
        cidade: findColumnIndex(['Cidade Loja', 'Cidade'])
      };

      console.log("Índices das colunas encontradas:", colIndexes);

      // Validar se encontramos pelo menos as colunas essenciais
      if (colIndexes.promotor === -1 && colIndexes.horasmes === -1) {
        onError("Colunas essenciais não encontradas. Verifique se a planilha contém 'PROMOTOR SUGERIDO' ou 'HORASMES'.");
        return;
      }

      // Processar cada linha de dados
      const dadosProcessados: BalanceamentoData[] = [];
      
      rows.forEach((row, index) => {
        // Verificar se a linha tem dados válidos
        if (!row || !Array.isArray(row) || row.length === 0) {
          return;
        }

        // Verificar se há pelo menos algum dado na linha
        const hasAnyData = row.some(cell => 
          cell !== null && 
          cell !== undefined && 
          String(cell).trim() !== ''
        );

        if (!hasAnyData) {
          return;
        }

        // Extrair dados da linha
        const promotorValue = colIndexes.promotor >= 0 ? row[colIndexes.promotor] : null;
        const horasValue = colIndexes.horasmes >= 0 ? row[colIndexes.horasmes] : 0;

        // Se não tem promotor nem horas, pular linha
        if (!promotorValue && (!horasValue || isNaN(Number(horasValue)))) {
          return;
        }

        const promotor = String(promotorValue || `Promotor ${index + 1}`).trim();
        const perfilValue = colIndexes.perfil >= 0 ? row[colIndexes.perfil] : 'promotor';
        const perfil = String(perfilValue || 'promotor').toLowerCase().trim();
        const horasRealizadas = Number(horasValue) || 0;

        // Calcular teto baseado no perfil
        const teto = TETO_POR_PERFIL[perfil] || TETO_POR_PERFIL['promotor'] || 220;
        
        // Calcular métricas
        const horasExcedentes = Math.max(0, horasRealizadas - teto);
        const horasOciosas = Math.max(0, teto - horasRealizadas);
        const eficiencia = teto > 0 ? Math.round((horasRealizadas / teto) * 100) : 0;
        
        // Determinar status
        let status: "excedente" | "ocioso" | "normal";
        if (horasExcedentes > 0) status = "excedente";
        else if (horasOciosas > 0) status = "ocioso";
        else status = "normal";

        // Extrair outros dados com valores padrão
        const coordenador = colIndexes.coordenador >= 0 ? 
          String(row[colIndexes.coordenador] || 'Coordenador Não Informado') : 
          'Coordenador Não Informado';
        
        const regional = colIndexes.regional >= 0 ? 
          String(row[colIndexes.regional] || 'Regional 1') : 
          'Regional 1';
        
        const uf = colIndexes.uf >= 0 ? 
          String(row[colIndexes.uf] || 'SP') : 
          'SP';
        
        const cidade = colIndexes.cidade >= 0 ? 
          String(row[colIndexes.cidade] || 'São Paulo') : 
          'São Paulo';
        
        const loja = colIndexes.loja >= 0 ? 
          String(row[colIndexes.loja] || `Loja ${String(index + 1).padStart(3, '0')}`) : 
          `Loja ${String(index + 1).padStart(3, '0')}`;

        // Criar objeto de dados
        const dadoProcessado: BalanceamentoData = {
          id: dadosProcessados.length + 1,
          promotor,
          coordenador,
          uf,
          cidade,
          bairro: `Bairro ${dadosProcessados.length + 1}`,
          regional,
          gestorRegional: `Gestor ${regional}`,
          loja,
          supervisorLoja: `Supervisor ${dadosProcessados.length + 1}`,
          horasMaximas: teto,
          horasRealizadas,
          horasExcedentes,
          horasOciosas,
          eficiencia,
          data: new Date().toISOString().split('T')[0],
          status
        };

        dadosProcessados.push(dadoProcessado);
      });

      console.log(`Total de registros processados: ${dadosProcessados.length}`);
      console.log("Primeiros 3 registros:", dadosProcessados.slice(0, 3));

      if (dadosProcessados.length === 0) {
        onError("Nenhum dado válido foi encontrado na planilha. Verifique se há dados nas colunas PROMOTOR SUGERIDO e HORASMES.");
        return;
      }

      onDataLoad(dadosProcessados);
    } catch (error) {
      console.error("Erro ao processar planilha:", error);
      onError(`Erro ao processar o arquivo: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.match(/\.(xlsx|xls)$/i)) {
      onError("Por favor, selecione um arquivo Excel (.xlsx ou .xls)");
      return;
    }

    processarPlanilhaExcel(file);
  };

  return (
    <Card className="mb-6 border-2 border-dashed border-blue-300 hover:border-blue-400 transition-colors">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
        <CardTitle className="flex items-center gap-3 text-blue-700">
          <Upload className="h-6 w-6" />
          Upload de Planilha - Balanceamento Operacional
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="flex items-center gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                <FileText className="h-5 w-5" />
                Carregar Planilha Excel
              </Button>
            </div>
            
            <div className="text-sm text-gray-600 max-w-2xl">
              <div className="flex items-start gap-2 mb-2">
                <AlertCircle className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium mb-1">Formato esperado da planilha:</p>
                  <ul className="text-xs space-y-1 text-gray-500">
                    <li>• Colunas essenciais: PROMOTOR SUGERIDO, HORASMES</li>
                    <li>• Colunas opcionais: Perfil Promotor, Coordenador, Regional, Nome Loja, UF Loja, Cidade Loja</li>
                    <li>• Formato: .xlsx ou .xls</li>
                    <li>• Primeira linha deve conter os cabeçalhos</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UploadPlanilhaBalanceamento;
