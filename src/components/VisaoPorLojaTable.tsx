
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building } from "lucide-react";
import { PromotorAgrupado } from '../hooks/usePromotorGrouping';

interface VisaoPorLojaTableProps {
  promotoresAgrupados: PromotorAgrupado[];
}

const VisaoPorLojaTable = ({ promotoresAgrupados }: VisaoPorLojaTableProps) => {
  // Agrupar por loja
  const lojaData = promotoresAgrupados.reduce((acc, curr) => {
    const key = curr.loja;
    if (!acc[key]) {
      acc[key] = {
        loja: key,
        total_promotores: 0,
        total_horas_mes: 0
      };
    }
    acc[key].total_promotores += 1;
    acc[key].total_horas_mes += curr.horasmes;
    return acc;
  }, {} as Record<string, any>);

  const lojaList = Object.values(lojaData)
    .map((item: any) => ({
      ...item,
      media: Math.round(item.total_horas_mes / item.total_promotores) // Divisão simples
    }))
    .sort((a: any, b: any) => b.total_horas_mes - a.total_horas_mes)
    .slice(0, 15); // Mostrar top 15 lojas

  return (
    <Card className="mb-6">
      <CardHeader className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
        <CardTitle className="flex items-center gap-2">
          <Building className="w-5 h-5" />
          Visão por Loja
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-800 text-white">
              <TableHead className="text-white font-semibold">Nome Loja</TableHead>
              <TableHead className="text-white font-semibold">Total Horas Mês</TableHead>
              <TableHead className="text-white font-semibold">Total Promotores</TableHead>
              <TableHead className="text-white font-semibold">Média</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lojaList.map((item: any, index) => (
              <TableRow key={index} className="hover:bg-gray-50">
                <TableCell className="font-medium text-sm">{item.loja}</TableCell>
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

export default VisaoPorLojaTable;
