
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp } from "lucide-react";
import { PromotorAgrupado } from '../hooks/usePromotorGrouping';

interface TopSobrecargaTableProps {
  promotoresAgrupados: PromotorAgrupado[];
}

const TopSobrecargaTable = ({ promotoresAgrupados }: TopSobrecargaTableProps) => {
  // Filtrar apenas promotores com SOBRECARGA (diferenca_horas > 0)
  const promotoresSobrecarga = promotoresAgrupados.filter(p => p.diferenca_horas > 0);
  
  console.log("Promotores com sobrecarga:", promotoresSobrecarga);
  
  // Ordenar por DIFERENCA_HORAS DESC e pegar top 10
  const topSobrecarga = promotoresSobrecarga
    .sort((a, b) => b.diferenca_horas - a.diferenca_horas)
    .slice(0, 10);

  return (
    <Card className="mb-6">
      <CardHeader className="bg-gradient-to-r from-red-500 to-red-600 text-white">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Top 10 - Sobrecarga ({promotoresSobrecarga.length} promotores)
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
            {topSobrecarga.length > 0 ? (
              topSobrecarga.map((item, index) => (
                <TableRow key={index} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{item.promotor}</TableCell>
                  <TableCell>{item.perfil}</TableCell>
                  <TableCell className="text-center font-semibold">{item.horasmes}</TableCell>
                  <TableCell className="text-center">{item.teto}</TableCell>
                  <TableCell className="text-center text-red-600 font-semibold">
                    +{item.diferenca_horas}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                  Nenhum promotor com sobrecarga encontrado
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopSobrecargaTable;
