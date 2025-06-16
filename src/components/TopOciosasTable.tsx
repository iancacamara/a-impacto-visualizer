
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingDown } from "lucide-react";
import { PromotorAgrupado } from '../hooks/usePromotorGrouping';

interface TopOciosasTableProps {
  promotoresAgrupados: PromotorAgrupado[];
}

const TopOciosasTable = ({ promotoresAgrupados }: TopOciosasTableProps) => {
  // Top 10 Ociosos - ordenar por DIFERENCA_HORAS crescente (valores mais negativos primeiro)
  const topOciosos = promotoresAgrupados
    .filter(p => p.status_final === "OCIOSO")
    .sort((a, b) => a.diferenca_horas - b.diferenca_horas) // Crescente para pegar os mais negativos
    .slice(0, 10);

  return (
    <Card className="mb-6">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <CardTitle className="flex items-center gap-2">
          <TrendingDown className="w-5 h-5" />
          Top 10 - Ociosos
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-800 text-white">
              <TableHead className="text-white font-semibold">PROMOTOR</TableHead>
              <TableHead className="text-white font-semibold">Perfil</TableHead>
              <TableHead className="text-white font-semibold">HORASMES</TableHead>
              <TableHead className="text-white font-semibold">TETO</TableHead>
              <TableHead className="text-white font-semibold">DIFERENCA_HORAS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topOciosos.map((item, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="font-medium">{item.promotor}</TableCell>
                <TableCell>{item.perfil}</TableCell>
                <TableCell className="text-center">{item.horasmes}</TableCell>
                <TableCell className="text-center">{item.teto}</TableCell>
                <TableCell className="text-center text-red-600 font-semibold">
                  {item.diferenca_horas}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopOciosasTable;
