
import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FilterState } from '../types/promoter';

interface FilterBarProps {
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
  regionais: string[];
  lojas: string[];
  marcas: string[];
  categorias: string[];
  supervisores: string[];
  trades: string[];
  familias: string[];
  coordenadores: string[];
  statusPromotores: string[];
}

const FilterBar = ({ 
  filters, 
  setFilters, 
  regionais, 
  lojas, 
  marcas, 
  categorias, 
  supervisores,
  trades,
  familias,
  coordenadores,
  statusPromotores
}: FilterBarProps) => {
  return (
    <div className="bg-blue-800 text-white border-b border-blue-700">
      <div className="container mx-auto px-6 py-4">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Loja</label>
            <Select value={filters.selectedLoja} onValueChange={(value) => setFilters({ selectedLoja: value })}>
              <SelectTrigger className="h-9 bg-blue-700 border-blue-600 text-white">
                <SelectValue placeholder="Tudo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tudo</SelectItem>
                {lojas.map(loja => (
                  <SelectItem key={loja} value={loja}>{loja}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Trade</label>
            <Select value={filters.selectedTrade} onValueChange={(value) => setFilters({ selectedTrade: value })}>
              <SelectTrigger className="h-9 bg-blue-700 border-blue-600 text-white">
                <SelectValue placeholder="Tudo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tudo</SelectItem>
                {trades.map(trade => (
                  <SelectItem key={trade} value={trade}>{trade}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Marca</label>
            <Select value={filters.selectedMarca} onValueChange={(value) => setFilters({ selectedMarca: value })}>
              <SelectTrigger className="h-9 bg-blue-700 border-blue-600 text-white">
                <SelectValue placeholder="Tudo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tudo</SelectItem>
                {marcas.map(marca => (
                  <SelectItem key={marca} value={marca}>{marca}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Família</label>
            <Select value={filters.selectedFamilia} onValueChange={(value) => setFilters({ selectedFamilia: value })}>
              <SelectTrigger className="h-9 bg-blue-700 border-blue-600 text-white">
                <SelectValue placeholder="Tudo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tudo</SelectItem>
                {familias.map(familia => (
                  <SelectItem key={familia} value={familia}>{familia}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Promotor</label>
            <Select value={filters.filterType} onValueChange={(value) => setFilters({ filterType: value })}>
              <SelectTrigger className="h-9 bg-blue-700 border-blue-600 text-white">
                <SelectValue placeholder="Tudo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tudo</SelectItem>
                <SelectItem value="promotor">Promotor</SelectItem>
                <SelectItem value="supervisor">Supervisor</SelectItem>
                <SelectItem value="parttime4">Part-time 4h</SelectItem>
                <SelectItem value="parttime6">Part-time 6h</SelectItem>
                <SelectItem value="lider">Líder</SelectItem>
                <SelectItem value="promotorexpress">Promotor Express</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Supervisor</label>
            <Select value={filters.selectedSupervisor} onValueChange={(value) => setFilters({ selectedSupervisor: value })}>
              <SelectTrigger className="h-9 bg-blue-700 border-blue-600 text-white">
                <SelectValue placeholder="Tudo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tudo</SelectItem>
                {supervisores.map(supervisor => (
                  <SelectItem key={supervisor} value={supervisor}>{supervisor}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Coordenador</label>
            <Select value={filters.selectedCoordenador} onValueChange={(value) => setFilters({ selectedCoordenador: value })}>
              <SelectTrigger className="h-9 bg-blue-700 border-blue-600 text-white">
                <SelectValue placeholder="Tudo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tudo</SelectItem>
                {coordenadores.map(coordenador => (
                  <SelectItem key={coordenador} value={coordenador}>{coordenador}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Status Promotor</label>
            <Select value={filters.selectedStatusPromotor} onValueChange={(value) => setFilters({ selectedStatusPromotor: value })}>
              <SelectTrigger className="h-9 bg-blue-700 border-blue-600 text-white">
                <SelectValue placeholder="Tudo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tudo</SelectItem>
                {statusPromotores.map(status => (
                  <SelectItem key={status} value={status}>{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
