
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

  // Configuração de teto por perfil (baseado no código Python)
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

      // Mapear colunas de forma mais flexível
      const colIndexes = {
        promotor: findColumnIndex(headers, ['PROMOTOR SUGERIDO', 'PROMOTOR', 'Promotor', 'Nome', 'nome']),
        perfil: findColumnIndex(headers, ['Perfil Promotor', 'Perfil', 'PERFIL', 'perfil']),
        horasmes: findColumnIndex(headers, ['HORASMES', 'Horas Mes', 'Horas Mês', 'Horas', 'horas']),
        coordenador: findColumnIndex(headers, ['Coordenador', 'COORDENADOR', 'coordenador']),
        regional: findColumnIndex(headers, ['Regional', 'REGIONAL', 'regional']),
        loja: findColumnIndex(headers, ['Nome Loja', 'NOME', 'Loja', 'loja']),
        uf: findColumnIndex(headers, ['UF Loja', 'UF', 'Estado', 'uf']),
        cidade: findColumnIndex(headers, ['Cidade Loja', 'Cidade', 'CIDADE', 'cidade'])
      };

      console.log("Índices das colunas:", colIndexes);

      // Filtrar apenas linhas com dados válidos - mudança na lógica
      const rowsValidas = rows.filter(row => {
        if (!row || !Array.isArray(row) || row.length === 0) return false;
        
        // Verificar se há pelo menos um valor não vazio na linha
        const hasData = row.some(cell => cell !== null && cell !== undefined && cell !== '');
        
        // Se encontrou a coluna PROMOTOR, verificar se tem valor
        if (colIndexes.promotor >= 0) {
          const promotorValue = row[colIndexes.promotor];
          return hasData && promotorValue && String(promotorValue).trim() !== '';
        }
        
        // Se não encontrou coluna PROMOTOR, verificar se há dados nas colunas de horas
        if (colIndexes.horasmes >= 0) {
          const horasValue = row[colIndexes.horasmes];
          return hasData && horasValue && !isNaN(Number(horasValue));
        }
        
        return hasData;
      });

      console.log(`Linhas válidas encontradas: ${rowsValidas.length}`);

      if (rowsValidas.length === 0) {
        onError("Nenhuma linha válida encontrada. Verifique se a planilha contém dados válidos.");
        return;
      }

      const dadosProcessados: BalanceamentoData[] = rowsValidas.map((row, index) => {
        // Extrair dados da linha
        const promotorValue = colIndexes.promotor >= 0 ? row[colIndexes.promotor] : null;
        const promotor = String(promotorValue || `Promotor ${index + 1}`).trim();
        
        const perfilValue = colIndexes.perfil >= 0 ? row[colIndexes.perfil] : 'promotor';
        const perfil = String(perfilValue || 'promotor').toLowerCase().trim();
        
        const horasValue = colIndexes.horasmes >= 0 ? row[colIndexes.horasmes] : 0;
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

        // Extrair outros dados
        const coordenador = colIndexes.coordenador >= 0 ? String(row[colIndexes.coordenador] || 'Não informado') : 'Não informado';
        const regional = colIndexes.regional >= 0 ? String(row[colIndexes.regional] || 'Regional 1') : 'Regional 1';
        const uf = colIndexes.uf >= 0 ? String(row[colIndexes.uf] || 'SP') : 'SP';
        const cidade = colIndexes.cidade >= 0 ? String(row[colIndexes.cidade] || 'São Paulo') : 'São Paulo';
        const loja = colIndexes.loja >= 0 ? String(row[colIndexes.loja] || `Loja ${String(index + 1).padStart(3, '0')}`) : `Loja ${String(index + 1).padStart(3, '0')}`;

        return {
          id: index + 1,
          promotor,
          coordenador,
          uf,
          cidade,
          bairro: `Bairro ${index + 1}`,
          regional,
          gestorRegional: `Gestor ${regional}`,
          loja,
          supervisorLoja: `Supervisor ${index + 1}`,
          horasMaximas: teto,
          horasRealizadas,
          horasExcedentes,
          horasOciosas,
          eficiencia,
          data: new Date().toISOString().split('T')[0],
          status
        };
      });

      console.log("Dados processados:", dadosProcessados);
      console.log(`Total de registros processados: ${dadosProcessados.length}`);
      
      onDataLoad(dadosProcessados);
    } catch (error) {
      console.error("Erro ao processar planilha:", error);
      onError(`Erro ao processar o arquivo: ${error instanceof Error ? error.message : 'Erro desconhecido'}`);
    }
  };

  const findColumnIndex = (headers: string[], possibleNames: string[]): number => {
    for (const name of possibleNames) {
      const index = headers.findIndex(h => {
        if (!h) return false;
        const headerStr = String(h).toLowerCase().trim();
        const nameStr = name.toLowerCase();
        return headerStr.includes(nameStr) || headerStr === nameStr;
      });
      if (index !== -1) return index;
    }
    return -1;
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
                    <li>• Colunas obrigatórias: PROMOTOR SUGERIDO ou PROMOTOR, HORASMES</li>
                    <li>• Colunas opcionais: Perfil Promotor, Coordenador, Regional, Nome Loja, UF Loja, Cidade Loja</li>
                    <li>• Formato: .xlsx ou .xls</li>
                    <li>• Primeira linha deve conter os cabeçalhos</li>
                    <li>• Os dados serão processados automaticamente com base no perfil do promotor</li>
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
