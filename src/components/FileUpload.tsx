
import React, { useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, FileText } from "lucide-react";
import { PromotorData } from '../types/promoter';

interface FileUploadProps {
  onDataLoad: (data: PromotorData[]) => void;
}

const FileUpload = ({ onDataLoad }: FileUploadProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        let data: any[];

        if (file.name.endsWith('.json')) {
          data = JSON.parse(content);
        } else if (file.name.endsWith('.csv')) {
          // Processamento básico de CSV
          const lines = content.split('\n');
          const headers = lines[0].split(',').map(h => h.trim());
          data = lines.slice(1).filter(line => line.trim()).map((line, index) => {
            const values = line.split(',').map(v => v.trim());
            const obj: any = { id: index + 1 };
            headers.forEach((header, i) => {
              obj[header] = values[i] || '';
            });
            return obj;
          });
        } else {
          throw new Error('Formato de arquivo não suportado');
        }

        // Mapeamento dos dados para o formato esperado
        const mappedData: PromotorData[] = data.map((item, index) => ({
          id: item.id || index + 1,
          nome: item.nome || item.Promotor || item.name || '',
          tipo: item.tipo || 'promotor',
          status: item.status === 'registrou' || item.status === 'presente' ? 'registrou' : 'não registrou',
          loja: item.loja || item.Loja || '',
          marca: item.marca || item.Marca || '',
          categoria: item.categoria || item.Categoria || '',
          familia: item.familia || item.Familia || '',
          trade: item.trade || item.Trade || '',
          horasRegistradas: Number(item.horasRegistradas) || 0,
          horasPlanejadas: Number(item.horasPlanejadas) || 8,
          atendimentosImpactados: Number(item.atendimentosImpactados) || Number(item['Atendimentos Impactados']) || 0,
          data: item.data || new Date().toISOString().split('T')[0],
          regional: item.regional || item.Regional || '',
          supervisor: item.supervisor || item.Supervisor || '',
          coordenador: item.coordenador || item.Coordenador || '',
          statusPromotor: item.statusPromotor || item['Status Promotor'] || 'ativo'
        }));

        onDataLoad(mappedData);
        console.log('Dados carregados:', mappedData);
      } catch (error) {
        console.error('Erro ao processar arquivo:', error);
        alert('Erro ao processar arquivo. Verifique o formato dos dados.');
      }
    };

    reader.readAsText(file);
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5" />
          Upload de Dados
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-4">
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,.csv"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button
            onClick={() => fileInputRef.current?.click()}
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Carregar Planilha (JSON/CSV)
          </Button>
          <span className="text-sm text-slate-600">
            Formatos suportados: JSON, CSV
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default FileUpload;
