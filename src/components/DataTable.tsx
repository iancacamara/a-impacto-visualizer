
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import { PromotorData, FilterState } from '../types/promoter';

interface DataTableProps {
  filteredData: PromotorData[];
  filters: FilterState;
  setFilters: (filters: Partial<FilterState>) => void;
}

const DataTable = ({ filteredData, filters, setFilters }: DataTableProps) => {
  return (
    <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
          <Filter className="h-5 w-5 text-blue-600" />
          Dados Detalhados dos Promotores ({filteredData.length} registros)
        </CardTitle>
        <div className="flex flex-col sm:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Buscar por nome..."
              value={filters.searchTerm}
              onChange={(e) => setFilters({ searchTerm: e.target.value })}
              className="pl-10"
            />
          </div>
          <Button 
            variant="outline" 
            onClick={() => setFilters({ sortOrder: filters.sortOrder === "desc" ? "asc" : "desc" })}
            className="w-full sm:w-auto"
          >
            {filters.sortOrder === "desc" ? "Maior → Menor" : "Menor → Maior"}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-slate-200">
                <th className="text-left p-3 font-semibold text-slate-700">Data</th>
                <th className="text-left p-3 font-semibold text-slate-700">Nome</th>
                <th className="text-left p-3 font-semibold text-slate-700">Tipo</th>
                <th className="text-left p-3 font-semibold text-slate-700">Status</th>
                <th className="text-left p-3 font-semibold text-slate-700">Regional</th>
                <th className="text-left p-3 font-semibold text-slate-700">Loja</th>
                <th className="text-left p-3 font-semibold text-slate-700">Marca</th>
                <th className="text-left p-3 font-semibold text-slate-700">Categoria</th>
                <th className="text-left p-3 font-semibold text-slate-700">Supervisor</th>
                <th className="text-left p-3 font-semibold text-slate-700">Horas Reg.</th>
                <th className="text-left p-3 font-semibold text-slate-700">Horas Plan.</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item) => (
                  <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-3">{new Date(item.data).toLocaleDateString('pt-BR')}</td>
                    <td className="p-3 font-medium">{item.nome}</td>
                    <td className="p-3">
                      <Badge variant="outline" className="text-xs">
                        {item.tipo}
                      </Badge>
                    </td>
                    <td className="p-3">
                      <Badge 
                        className={`${
                          item.status === "registrou" 
                            ? "bg-green-100 text-green-800 hover:bg-green-100" 
                            : "bg-red-100 text-red-800 hover:bg-red-100"
                        }`}
                      >
                        {item.status === "registrou" ? "✓ Registrou" : "✗ Não Registrou"}
                      </Badge>
                    </td>
                    <td className="p-3">{item.regional}</td>
                    <td className="p-3">{item.loja}</td>
                    <td className="p-3">{item.marca}</td>
                    <td className="p-3">{item.categoria}</td>
                    <td className="p-3">{item.supervisor}</td>
                    <td className="p-3 font-mono">
                      <span className={item.horasRegistradas < item.horasPlanejadas ? "text-red-600" : "text-green-600"}>
                        {item.horasRegistradas}h
                      </span>
                    </td>
                    <td className="p-3 font-mono">{item.horasPlanejadas}h</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="p-8 text-center text-slate-500">
                    Nenhum promotor encontrado com os filtros selecionados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataTable;
