
import React, { useState } from "react";
import Header from "../components/Header";
import FilterBarBalanceamento from "../components/FilterBarBalanceamento";
import UploadPlanilhaBalanceamento from "../components/UploadPlanilhaBalanceamento";
import StatsCardsBalanceamentoPython from "../components/StatsCardsBalanceamentoPython";
import TopOciosasTable from "../components/TopOciosasTable";
import TopSobrecargaTable from "../components/TopSobrecargaTable";
import VisaoPorCoordenadorTable from "../components/VisaoPorCoordenadorTable";
import VisaoPorLojaTable from "../components/VisaoPorLojaTable";
import VisaoPorRegionalTable from "../components/VisaoPorRegionalTable";
import { useFiltersBalanceamento } from "../hooks/useFiltersBalanceamento";
import { balanceamentoData as initialData } from "../data/balanceamentoData";
import { BalanceamentoData } from "../types/balanceamento";
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

  return (
    <div className="min-h-screen bg-gray-50">
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

        <StatsCardsBalanceamentoPython filteredData={filteredData} />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <TopOciosasTable filteredData={filteredData} />
          <TopSobrecargaTable filteredData={filteredData} />
        </div>

        <VisaoPorCoordenadorTable filteredData={filteredData} />
        <VisaoPorLojaTable filteredData={filteredData} />
        <VisaoPorRegionalTable filteredData={filteredData} />
      </div>
    </div>
  );
};

export default Balanceamento;
