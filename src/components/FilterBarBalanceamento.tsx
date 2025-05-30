
import React from 'react';
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { BalanceamentoFilters } from '../types/balanceamento';

interface FilterBarBalanceamentoProps {
  filters: BalanceamentoFilters;
  setFilters: (filters: Partial<BalanceamentoFilters>) => void;
  ufs: string[];
  cidades: string[];
  regionais: string[];
  gestoresRegionais: string[];
  coordenadores: string[];
  supervisoresLoja: string[];
  statusOptions: string[];
}

const FilterBarBalanceamento = ({
  filters,
  setFilters,
  ufs,
  cidades,
  regionais,
  gestoresRegionais,
  coordenadores,
  supervisoresLoja,
  statusOptions
}: FilterBarBalanceamentoProps) => {
  return (
    <motion.div
      className="bg-white border-b border-gray-200 px-6 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-purple-600" />
          <h3 className="text-lg font-semibold text-gray-800">Filtros</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-8 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Buscar promotor..."
              value={filters.searchTerm}
              onChange={(e) => setFilters({ searchTerm: e.target.value })}
              className="pl-10 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
            />
          </div>

          <Select value={filters.selectedUF} onValueChange={(value) => setFilters({ selectedUF: value === "all" ? "" : value })}>
            <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
              <SelectValue placeholder="UF" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os UFs</SelectItem>
              {ufs.map(uf => (
                <SelectItem key={uf} value={uf}>{uf}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.selectedCidade} onValueChange={(value) => setFilters({ selectedCidade: value === "all" ? "" : value })}>
            <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
              <SelectValue placeholder="Cidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Cidades</SelectItem>
              {cidades.map(cidade => (
                <SelectItem key={cidade} value={cidade}>{cidade}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.selectedRegional} onValueChange={(value) => setFilters({ selectedRegional: value === "all" ? "" : value })}>
            <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
              <SelectValue placeholder="Regional" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Regionais</SelectItem>
              {regionais.map(regional => (
                <SelectItem key={regional} value={regional}>{regional}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.selectedGestorRegional} onValueChange={(value) => setFilters({ selectedGestorRegional: value === "all" ? "" : value })}>
            <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
              <SelectValue placeholder="Gestor Regional" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Gestores</SelectItem>
              {gestoresRegionais.map(gestor => (
                <SelectItem key={gestor} value={gestor}>{gestor}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.selectedCoordenador} onValueChange={(value) => setFilters({ selectedCoordenador: value === "all" ? "" : value })}>
            <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
              <SelectValue placeholder="Coordenador" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Coordenadores</SelectItem>
              {coordenadores.map(coordenador => (
                <SelectItem key={coordenador} value={coordenador}>{coordenador}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.selectedSupervisorLoja} onValueChange={(value) => setFilters({ selectedSupervisorLoja: value === "all" ? "" : value })}>
            <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
              <SelectValue placeholder="Supervisor Loja" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Supervisores</SelectItem>
              {supervisoresLoja.map(supervisor => (
                <SelectItem key={supervisor} value={supervisor}>{supervisor}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={filters.selectedStatus} onValueChange={(value) => setFilters({ selectedStatus: value === "all" ? "" : value })}>
            <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os Status</SelectItem>
              {statusOptions.map(status => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBarBalanceamento;
