
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TrendingUp } from "lucide-react";
import { BalanceamentoData } from '../types/balanceamento';

interface TopSobrecargaTableProps {
  filteredData: BalanceamentoData[];
}

const TopSobrecargaTable = ({ filteredData }: TopSobrecargaTableProps) => {
  // Top 10 Sobrecarga exatamente como no Python
  const topSobrecarga = filteredData
    .filter(p => p.horasExcedentes > 0)
    .sort((a, b) => b.horasExcedentes - a.horasExcedentes)
    .slice(0, 10)
    .map((item, index) => ({
      index: index,
      promotor: item.promotor,
      perfil: item.perfil || 'promotorexpress',
      horasmes: item.horasRealizadas,
      teto: item.horasMaximas,
      diferenca_horas: item.horasExcedentes
    }));

  return (
    <Card className="mb-6">
      <CardHeader className="bg-gradient-to-r from-orange-500 to-red-500 text-white">
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5" />
          Top 10 - Sobrecarga
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-800 text-white">
              <TableHead className="text-white font-semibold">PROMOTOR</TableHead>
              <TableHead className="text-white font-semibold">Perfil</TableHead>
              <TableHead className="text-white font-semibold">+ HORASMES</TableHead>
              <TableHead className="text-white font-semibold">TETO</TableHead>
              <TableHead className="text-white font-semibold">DIFERENCA_HORAS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {topSobrecarga.map((item) => (
              <TableRow key={item.index} className="hover:bg-gray-50">
                <TableCell className="font-medium">{item.promotor}</TableCell>
                <TableCell>{item.perfil}</TableCell>
                <TableCell className="text-center">{item.horasmes}</TableCell>
                <TableCell className="text-center">{item.teto}</TableCell>
                <TableCell className="text-center text-green-600 font-semibold">
                  +{item.diferenca_horas}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default TopSobrecargaTable;
