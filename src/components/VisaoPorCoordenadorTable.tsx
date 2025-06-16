
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users } from "lucide-react";
import { BalanceamentoData } from '../types/balanceamento';

interface VisaoPorCoordenadorTableProps {
  filteredData: BalanceamentoData[];
}

const VisaoPorCoordenadorTable = ({ filteredData }: VisaoPorCoordenadorTableProps) => {
  // Visão por Coordenador exatamente como no Python
  const coordenadorData = filteredData.reduce((acc, curr) => {
    const key = curr.coordenador;
    if (!acc[key]) {
      acc[key] = {
        coordenador: key,
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

  const coordenadorList = Object.values(coordenadorData)
    .map((item: any, index) => ({
      index,
      coordenador: item.coordenador,
      total_promotores: item.total_promotores,
      total_horas_mes: item.total_horas_mes,
      media_eficiencia: Math.round(item.eficienciaSum / item.total_promotores),
      horas_excedentes: item.horas_excedentes,
      horas_ociosas: item.horas_ociosas
    }))
    .sort((a, b) => b.total_horas_mes - a.total_horas_mes);

  return (
    <Card className="mb-6">
      <CardHeader className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
        <CardTitle className="flex items-center gap-2">
          <Users className="w-5 h-5" />
          Visão por Coordenador
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-800 text-white">
              <TableHead className="text-white font-semibold">Coordenador</TableHead>
              <TableHead className="text-white font-semibold">Total_Promotores</TableHead>
              <TableHead className="text-white font-semibold">Total_Horas_Mes</TableHead>
              <TableHead className="text-white font-semibold">Media_Eficiencia</TableHead>
              <TableHead className="text-white font-semibold">Horas_Excedentes</TableHead>
              <TableHead className="text-white font-semibold">Horas_Ociosas</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {coordenadorList.map((item) => (
              <TableRow key={item.index} className="hover:bg-gray-50">
                <TableCell className="font-medium">{item.coordenador}</TableCell>
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

export default VisaoPorCoordenadorTable;
