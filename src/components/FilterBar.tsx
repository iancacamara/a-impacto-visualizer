
import React from 'react';
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Filter } from "lucide-react";
import { FilterState } from '../types/promoter';

interface FilterBarProps {
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
  regionais: string[];
  lojas: string[];
  marcas: string[];
  categorias: string[];
  supervisores: string[];
  onResetFilters: () => void;
}

const FilterBar = ({ 
  filters, 
  setFilters, 
  regionais, 
  lojas, 
  marcas, 
  categorias, 
  supervisores, 
  onResetFilters 
}: FilterBarProps) => {
  return (
    <div className="bg-white border-b border-slate-200 shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center gap-2 mb-4">
          <Filter className="h-5 w-5 text-blue-600" />
          <h2 className="text-lg font-semibold text-slate-800">Filtros</h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={onResetFilters}
            className="ml-auto"
          >
            Limpar Filtros
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Regional</label>
            <Select value={filters.selectedRegional} onValueChange={(value) => setFilters({ selectedRegional: value })}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {regionais.map(regional => (
                  <SelectItem key={regional} value={regional}>{regional}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Loja</label>
            <Select value={filters.selectedLoja} onValueChange={(value) => setFilters({ selectedLoja: value })}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {lojas.map(loja => (
                  <SelectItem key={loja} value={loja}>{loja}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Marca</label>
            <Select value={filters.selectedMarca} onValueChange={(value) => setFilters({ selectedMarca: value })}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {marcas.map(marca => (
                  <SelectItem key={marca} value={marca}>{marca}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Categoria</label>
            <Select value={filters.selectedCategoria} onValueChange={(value) => setFilters({ selectedCategoria: value })}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Todas" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas</SelectItem>
                {categorias.map(categoria => (
                  <SelectItem key={categoria} value={categoria}>{categoria}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Supervisor</label>
            <Select value={filters.selectedSupervisor} onValueChange={(value) => setFilters({ selectedSupervisor: value })}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                {supervisores.map(supervisor => (
                  <SelectItem key={supervisor} value={supervisor}>{supervisor}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Tipo Contrato</label>
            <Select value={filters.filterType} onValueChange={(value) => setFilters({ filterType: value })}>
              <SelectTrigger className="h-9">
                <SelectValue placeholder="Todos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="promotor">Promotor</SelectItem>
                <SelectItem value="supervisor">Supervisor</SelectItem>
                <SelectItem value="parttime4">Part-time 4h</SelectItem>
                <SelectItem value="parttime6">Part-time 6h</SelectItem>
                <SelectItem value="lider">Líder</SelectItem>
                <SelectItem value="promotorexpress">Promotor Express</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
