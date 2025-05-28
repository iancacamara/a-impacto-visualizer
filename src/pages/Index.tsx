
import React from "react";
import Header from "../components/Header";
import FilterBar from "../components/FilterBar";
import StatsCards from "../components/StatsCards";
import ChartsSection from "../components/ChartsSection";
import DataTable from "../components/DataTable";
import { useFilters } from "../hooks/useFilters";
import { useChartData } from "../hooks/useChartData";
import { promotorData } from "../data/promotorData";

const Index = () => {
  const { filters, setFilters, resetAllFilters, filteredData } = useFilters(promotorData);
  const { statusData, tipoData, marcasAfetadas } = useChartData(filteredData);

  // Extract unique values for filters
  const regionais = [...new Set(promotorData.map(p => p.regional))].sort();
  const lojas = [...new Set(promotorData.map(p => p.loja))].sort();
  const marcas = [...new Set(promotorData.map(p => p.marca))].sort();
  const categorias = [...new Set(promotorData.map(p => p.categoria))].sort();
  const supervisores = [...new Set(promotorData.map(p => p.supervisor))].sort();

  // Calculate statistics based on filtered data
  const totalPromotores = filteredData.length;
  const registraram = filteredData.filter(p => p.status === "registrou").length;
  const naoRegistraram = filteredData.filter(p => p.status === "não registrou").length;
  const lojasAfetadas = new Set(filteredData.filter(p => p.status === "não registrou").map(p => p.loja)).size;
  const marcasAfetadasCount = new Set(filteredData.filter(p => p.status === "não registrou").map(p => p.marca)).size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Header />
      
      <FilterBar
        filters={filters}
        setFilters={setFilters}
        regionais={regionais}
        lojas={lojas}
        marcas={marcas}
        categorias={categorias}
        supervisores={supervisores}
        onResetFilters={resetAllFilters}
      />

      <div className="container mx-auto px-6 py-8">
        <StatsCards
          totalPromotores={totalPromotores}
          registraram={registraram}
          naoRegistraram={naoRegistraram}
          lojasAfetadas={lojasAfetadas}
          marcasAfetadasCount={marcasAfetadasCount}
        />

        <ChartsSection
          statusData={statusData}
          tipoData={tipoData}
          marcasAfetadas={marcasAfetadas}
        />

        <DataTable
          filteredData={filteredData}
          filters={filters}
          setFilters={setFilters}
        />
      </div>
    </div>
  );
};

export default Index;
