
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Globe } from "lucide-react";
import { BalanceamentoData } from '../types/balanceamento';

interface VisaoPorRegionalTableProps {
  filteredData: BalanceamentoData[];
}

const VisaoPorRegionalTable = ({ filteredData }: VisaoPorRegionalTableProps) => {
  // Visão por Regional exatamente como no Python
  const regionalData = filteredData.reduce((acc, curr) => {
    const key = curr.regional;
    if (!acc[key]) {
      acc[key] = {
        regional: key,
        total_promotores: 0,
        total_horas_mes: 0,
        media_eficiencia: 0,
        horas_excedentes: 0,
        horas_ociosas: 0,
        eficienciaSum: 0
      };
    }
    acc[key].total_promotores += 1;
    acc[key].total_horas_mes += curr.horasRealizadas;
    acc[key].horas_excedentes += curr.horasExcedentes;
    acc[key].horas_ociosas += curr.horasOciosas;
    acc[key].eficienciaSum += curr.eficiencia;
    return acc;
  }, {} as Record<string, any>);

  const regionalList = Object.values(regionalData)
    .map((item: any, index) => ({
      index,
      regional: item.regional,
      total_promotores: item.total_promotores,
      total_horas_mes: item.total_horas_mes,
      media_eficiencia: Math.round(item.eficienciaSum / item.total_promotores),
      horas_excedentes: item.horas_excedentes,
      horas_ociosas: item.horas_ociosas
    }))
    .sort((a, b) => b.total_horas_mes - a.total_horas_mes);

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
              <TableHead className="text-white font-semibold">Total_Promotores</TableHead>
              <TableHead className="text-white font-semibold">Total_Horas_Mes</TableHead>
              <TableHead className="text-white font-semibold">Media_Eficiencia</TableHead>
              <TableHead className="text-white font-semibold">Horas_Excedentes</TableHead>
              <TableHead className="text-white font-semibold">Horas_Ociosas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {regionalList.map((item) => (
              <TableRow key={item.index} className="hover:bg-gray-50">
                <TableCell className="font-medium">{item.regional}</TableCell>
                <TableCell className="text-center">{item.total_promotores}</TableCell>
                <TableCell className="text-center">{item.total_horas_mes}</TableCell>
                <TableCell className="text-center">{item.media_eficiencia}</TableCell>
                <TableCell className="text-center">{item.horas_excedentes}</TableCell>
                <TableCell className="text-center">{item.horas_ociosas}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default VisaoPorRegionalTable;
