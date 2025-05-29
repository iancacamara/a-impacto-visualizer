import React, { useState } from "react";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import StatsCards from "../components/StatsCards";
import ChartsSection from "../components/ChartsSection";
import DetailedTables from "../components/DetailedTables";
import FileUpload from "../components/FileUpload";
import { useFilters } from "../hooks/useFilters";
import { useChartData } from "../hooks/useChartData";
import { promotorData as initialData } from "../data/promotorData";
import { PromotorData, DashboardStats } from "../types/promoter";

const Index = () => {
  const [promotorData, setPromotorData] = useState<PromotorData[]>(initialData);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  
  const { filters, setFilters, resetAllFilters, filteredData } = useFilters(promotorData);
  const chartData = useChartData(filteredData);

  const handleDataLoad = (newData: PromotorData[]) => {
    setPromotorData(newData);
    setLastUpdate(new Date());
    resetAllFilters();
  };

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
    // Aqui você pode implementar a lógica para filtrar os dados por data
    // Por exemplo, filtrar promotorData baseado na data selecionada
  };

  // Extract unique values for filters
  const regionais = [...new Set(promotorData.map(p => p.regional))].filter(Boolean).sort();
  const lojas = [...new Set(promotorData.map(p => p.loja))].filter(Boolean).sort();
  const marcas = [...new Set(promotorData.map(p => p.marca))].filter(Boolean).sort();
  const categorias = [...new Set(promotorData.map(p => p.categoria))].filter(Boolean).sort();
  const supervisores = [...new Set(promotorData.map(p => p.supervisor))].filter(Boolean).sort();
  const trades = [...new Set(promotorData.map(p => p.trade))].filter(Boolean).sort();
  const familias = [...new Set(promotorData.map(p => p.familia))].filter(Boolean).sort();
  const coordenadores = [...new Set(promotorData.map(p => p.coordenador))].filter(Boolean).sort();
  const statusPromotores = [...new Set(promotorData.map(p => p.statusPromotor))].filter(Boolean).sort();

  // Calculate statistics based on filtered data
  const stats: DashboardStats = {
    promotoresAusentes: filteredData.filter(p => p.status === "não registrou").length,
    atendimentosImpactados: filteredData
      .filter(p => p.status === "não registrou")
      .reduce((sum, p) => sum + p.atendimentosImpactados, 0),
    totalPromotores: filteredData.length,
    lojasAfetadas: new Set(filteredData.filter(p => p.status === "não registrou").map(p => p.loja)).size,
    marcasAfetadas: new Set(filteredData.filter(p => p.status === "não registrou").map(p => p.marca)).size,
    familiasAfetadas: new Set(filteredData.filter(p => p.status === "não registrou").map(p => p.familia)).size,
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        lastUpdate={lastUpdate} 
        onClearFilters={resetAllFilters}
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
      />
      
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        regionais={regionais}
        lojas={lojas}
        marcas={marcas}
        categorias={categorias}
        supervisores={supervisores}
        trades={trades}
        familias={familias}
        coordenadores={coordenadores}
        statusPromotores={statusPromotores}
      />

      <div className="container mx-auto px-6 py-8">
        <FileUpload onDataLoad={handleDataLoad} />
        
        <StatsCards stats={stats} />

        <ChartsSection 
          statusData={chartData.statusData}
          tipoData={chartData.tipoData}
          marcasAfetadas={chartData.marcasAfetadas}
        />

        <DetailedTables filteredData={filteredData} />
      </div>
    </div>
  );
};

export default Index;
