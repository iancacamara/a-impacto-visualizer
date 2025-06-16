
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingDown } from "lucide-react";
import { PromotorAgrupado } from '../hooks/usePromotorGrouping';

interface TopOciosasTableProps {
  promotoresAgrupados: PromotorAgrupado[];
}

const TopOciosasTable = ({ promotoresAgrupados }: TopOciosasTableProps) => {
  // Filtrar apenas promotores OCIOSOS (diferenca_horas < 0)
  const promotoresOciosos = promotoresAgrupados.filter(p => p.diferenca_horas < 0);
  
  console.log("Promotores ociosos:", promotoresOciosos);
  
  // Ordenar por DIFERENCA_HORAS ASC (mais negativos primeiro) e pegar top 10
  const topOciosos = promotoresOciosos
    .sort((a, b) => a.diferenca_horas - b.diferenca_horas)
    .slice(0, 10);

  return (
    <Card className="mb-6">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="w-5 h-5" />
          Top 10 - Ociosos ({promotoresOciosos.length} promotores)
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-800 text-white">
              <TableHead className="text-white font-semibold">PROMOTOR</TableHead>
              <TableHead className="text-white font-semibold">PERFIL</TableHead>
              <TableHead className="text-white font-semibold">HORASMES</TableHead>
              <TableHead className="text-white font-semibold">TETO</TableHead>
              <TableHead className="text-white font-semibold">DIFERENCA_HORAS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topOciosos.length > 0 ? (
              topOciosos.map((item, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{item.promotor}</TableCell>
                  <TableCell>{item.perfil}</TableCell>
                  <TableCell className="text-center font-semibold">{item.horasmes}</TableCell>
                  <TableCell className="text-center">{item.teto}</TableCell>
                  <TableCell className="text-center text-red-600 font-semibold">
                    {item.diferenca_horas}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                  Nenhum promotor ocioso encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopOciosasTable;
