
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Globe } from "lucide-react";
import { PromotorAgrupado } from '../hooks/usePromotorGrouping';

interface VisaoPorRegionalTableProps {
  promotoresAgrupados: PromotorAgrupado[];
}

const VisaoPorRegionalTable = ({ promotoresAgrupados }: VisaoPorRegionalTableProps) => {
  // Agrupar por regional
  const regionalData = promotoresAgrupados.reduce((acc, curr) => {
    const key = curr.regional;
    if (!acc[key]) {
      acc[key] = {
        regional: key,
        total_promotores: 0,
        total_horas_mes: 0
      };
    }
    acc[key].total_promotores += 1;
    acc[key].total_horas_mes += curr.horasmes;
    return acc;
  }, {} as Record<string, any>);

  const regionalList = Object.values(regionalData)
    .map((item: any) => ({
      ...item,
      media: Math.round(item.total_horas_mes / item.total_promotores) // Divisão simples
    }))
    .sort((a: any, b: any) => b.total_horas_mes - a.total_horas_mes);

  return (
    <Card className="mb-6">
      <CardHeader className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white">
        <CardTitle className="flex items-center gap-2">
          <Globe className="w-5 h-5" />
          Visão por Regional
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-800 text-white">
              <TableHead className="text-white font-semibold">Regional</TableHead>
              <TableHead className="text-white font-semibold">Total Horas Mês</TableHead>
              <TableHead className="text-white font-semibold">Total Promotores</TableHead>
              <TableHead className="text-white font-semibold">Média</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {regionalList.map((item: any, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="font-medium">{item.regional}</TableCell>
                <TableCell className="text-center font-semibold text-blue-600">{item.total_horas_mes}</TableCell>
                <TableCell className="text-center">{item.total_promotores}</TableCell>
                <TableCell className="text-center font-semibold">{item.media}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default VisaoPorRegionalTable;
