
import React, { useState } from "react";
import Header from "../components/Header";
import FilterBarBalanceamento from "../components/FilterBarBalanceamento";
import StatsCardsBalanceamento from "../components/StatsCardsBalanceamento";
import ChartsBalanceamento from "../components/ChartsBalanceamento";
import DetailedTablesBalanceamento from "../components/DetailedTablesBalanceamento";
import UploadPlanilhaBalanceamento from "../components/UploadPlanilhaBalanceamento";
import { useFiltersBalanceamento } from "../hooks/useFiltersBalanceamento";
import { useChartDataBalanceamento } from "../hooks/useChartDataBalanceamento";
import { balanceamentoData as initialData } from "../data/balanceamentoData";
import { BalanceamentoData, BalanceamentoStats } from "../types/balanceamento";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Balanceamento = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [balanceamentoData, setBalanceamentoData] = useState<BalanceamentoData[]>(initialData);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [dadosCarregados, setDadosCarregados] = useState(false);
  
  const { filters, setFilters, resetAllFilters, filteredData } = useFiltersBalanceamento(balanceamentoData);
  const chartData = useChartDataBalanceamento(filteredData);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleDataLoad = (newData: BalanceamentoData[]) => {
    setBalanceamentoData(newData);
    setLastUpdate(new Date());
    setDadosCarregados(true);
    toast({
      title: "Planilha carregada com sucesso!",
      description: `${newData.length} registros processados e carregados.`,
    });
  };

  const handleUploadError = (message: string) => {
    toast({
      title: "Erro no upload",
      description: message,
      variant: "destructive",
    });
  };

  // Extract unique values for filters
  const ufs = [...new Set(balanceamentoData.map(p => p.uf))].filter(Boolean).sort();
  const cidades = [...new Set(balanceamentoData.map(p => p.cidade))].filter(Boolean).sort();
  const regionais = [...new Set(balanceamentoData.map(p => p.regional))].filter(Boolean).sort();
  const gestoresRegionais = [...new Set(balanceamentoData.map(p => p.gestorRegional))].filter(Boolean).sort();
  const coordenadores = [...new Set(balanceamentoData.map(p => p.coordenador))].filter(Boolean).sort();
  const supervisoresLoja = [...new Set(balanceamentoData.map(p => p.supervisorLoja))].filter(Boolean).sort();
  const statusOptions = ["excedente", "ocioso", "normal"];

  // Calculate statistics based on filtered data
  const stats: BalanceamentoStats = {
    totalPromotores: filteredData.length,
    horasExcedentesTotal: filteredData.reduce((sum, p) => sum + p.horasExcedentes, 0),
    horasOciosasTotal: filteredData.reduce((sum, p) => sum + p.horasOciosas, 0),
    eficienciaMedia: filteredData.length > 0 ? 
      filteredData.reduce((sum, p) => sum + p.eficiencia, 0) / filteredData.length : 0,
    promotoresExcedentes: filteredData.filter(p => p.status === "excedente").length,
    promotoresOciosos: filteredData.filter(p => p.status === "ocioso").length,
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        lastUpdate={lastUpdate} 
        onClearFilters={resetAllFilters}
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        title="Balanceamento Operacional"
        subtitle="Controle de Horas e Performance dos Promotores"
        showBackButton={true}
        onBack={() => navigate('/')}
      />
      
      <div className="container mx-auto px-6 py-8">
        <UploadPlanilhaBalanceamento 
          onDataLoad={handleDataLoad}
          onError={handleUploadError}
        />
        
        {dadosCarregados && (
          <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-700 font-medium">
              ✅ Dados carregados com sucesso! Total de {balanceamentoData.length} registros processados.
            </p>
          </div>
        )}
        
        <FilterBarBalanceamento
          filters={filters}
          setFilters={setFilters}
          ufs={ufs}
          cidades={cidades}
          regionais={regionais}
          gestoresRegionais={gestoresRegionais}
          coordenadores={coordenadores}
          supervisoresLoja={supervisoresLoja}
          statusOptions={statusOptions}
        />

        <StatsCardsBalanceamento stats={stats} />
        <ChartsBalanceamento chartData={chartData} />
        <DetailedTablesBalanceamento filteredData={filteredData} />
      </div>
    </div>
  );
};

export default Balanceamento;
