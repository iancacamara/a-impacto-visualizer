
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
      
      if (jsonData.length < 2) {
        onError("A planilha deve conter pelo menos um cabeçalho e uma linha de dados.");
        return;
      }

      const headers = jsonData[0] as string[];
      const rows = jsonData.slice(1) as any[][];

      // Mapear colunas esperadas
      const colIndexes = {
        promotor: findColumnIndex(headers, ['PROMOTOR', 'Promotor', 'Nome']),
        perfil: findColumnIndex(headers, ['Perfil Promotor', 'Perfil', 'PERFIL']),
        horasmes: findColumnIndex(headers, ['HORASMES', 'Horas Mes', 'Horas']),
        coordenador: findColumnIndex(headers, ['Coordenador', 'COORDENADOR']),
        regional: findColumnIndex(headers, ['Regional', 'REGIONAL']),
        loja: findColumnIndex(headers, ['NOME', 'Loja', 'Nome Loja']),
        uf: findColumnIndex(headers, ['UF', 'Estado']),
        cidade: findColumnIndex(headers, ['Cidade', 'CIDADE'])
      };

      const dadosProcessados: BalanceamentoData[] = rows
        .filter(row => row.length > 0 && row[colIndexes.promotor])
        .map((row, index) => {
          const promotor = row[colIndexes.promotor] || `Promotor ${index + 1}`;
          const perfil = String(row[colIndexes.perfil] || 'promotor').toLowerCase().trim();
          const horasRealizadas = Number(row[colIndexes.horasmes]) || 0;
          const teto = TETO_POR_PERFIL[perfil] || 220;
          
          const horasExcedentes = Math.max(0, horasRealizadas - teto);
          const horasOciosas = Math.max(0, teto - horasRealizadas);
          const eficiencia = teto > 0 ? Math.round((horasRealizadas / teto) * 100) : 0;
          
          let status: "excedente" | "ocioso" | "normal";
          if (horasExcedentes > 0) status = "excedente";
          else if (horasOciosas > 0) status = "ocioso";
          else status = "normal";

          return {
            id: index + 1,
            promotor: String(promotor),
            coordenador: String(row[colIndexes.coordenador] || 'Não informado'),
            uf: String(row[colIndexes.uf] || 'SP'),
            cidade: String(row[colIndexes.cidade] || 'São Paulo'),
            bairro: `Bairro ${index + 1}`,
            regional: String(row[colIndexes.regional] || 'Regional 1'),
            gestorRegional: `Gestor ${String(row[colIndexes.regional] || 'Regional 1')}`,
            loja: String(row[colIndexes.loja] || `Loja ${String(index + 1).padStart(3, '0')}`),
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

      if (dadosProcessados.length === 0) {
        onError("Nenhum dado válido foi encontrado na planilha.");
        return;
      }

      onDataLoad(dadosProcessados);
    } catch (error) {
      console.error("Erro ao processar planilha:", error);
      onError("Erro ao processar o arquivo. Verifique o formato da planilha.");
    }
  };

  const findColumnIndex = (headers: string[], possibleNames: string[]): number => {
    for (const name of possibleNames) {
      const index = headers.findIndex(h => 
        h && h.toString().toLowerCase().includes(name.toLowerCase())
      );
      if (index !== -1) return index;
    }
    return -1;
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.name.endsWith('.xlsx') && !file.name.endsWith('.xls')) {
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
                    <li>• Colunas: PROMOTOR, Perfil Promotor, HORASMES, Coordenador, Regional, Loja</li>
                    <li>• Formato: .xlsx ou .xls</li>
                    <li>• Os dados serão processados automaticamente com base no perfil do promotor</li>
                    <li>• Cálculo automático de horas excedentes/ociosas baseado no teto por perfil</li>
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
