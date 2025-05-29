
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PromotorData } from '../types/promoter';

interface DetailedTablesProps {
  filteredData: PromotorData[];
}

const DetailedTables = ({ filteredData }: DetailedTablesProps) => {
  // Dados agrupados por supervisor
  const supervisorData = filteredData
    .filter(p => p.status === "não registrou")
    .reduce((acc, curr) => {
      const key = curr.supervisor;
      if (!acc[key]) {
        acc[key] = { supervisor: key, promotoresAusentes: 0, atendimentosImpactados: 0 };
      }
      acc[key].promotoresAusentes += 1;
      acc[key].atendimentosImpactados += curr.atendimentosImpactados;
      return acc;
    }, {} as Record<string, { supervisor: string; promotoresAusentes: number; atendimentosImpactados: number }>);

  const supervisorList = Object.values(supervisorData)
    .sort((a, b) => b.promotoresAusentes - a.promotoresAusentes);

  // Dados por promotor
  const promotorList = filteredData
    .filter(p => p.status === "não registrou")
    .sort((a, b) => b.atendimentosImpactados - a.atendimentosImpactados);

  // Dados por marca
  const marcaData = filteredData
    .filter(p => p.status === "não registrou")
    .reduce((acc, curr) => {
      const key = curr.marca;
      if (!acc[key]) {
        acc[key] = { marca: key, promotoresAusentes: 0, atendimentosImpactados: 0 };
      }
      acc[key].promotoresAusentes += 1;
      acc[key].atendimentosImpactados += curr.atendimentosImpactados;
      return acc;
    }, {} as Record<string, { marca: string; promotoresAusentes: number; atendimentosImpactados: number }>);

  const marcaList = Object.values(marcaData)
    .sort((a, b) => b.atendimentosImpactados - a.atendimentosImpactados);

  // Dados por loja
  const lojaData = filteredData
    .filter(p => p.status === "não registrou")
    .reduce((acc, curr) => {
      const key = curr.loja;
      if (!acc[key]) {
        acc[key] = { loja: key, promotoresAusentes: 0, atendimentosImpactados: 0 };
      }
      acc[key].promotoresAusentes += 1;
      acc[key].atendimentosImpactados += curr.atendimentosImpactados;
      return acc;
    }, {} as Record<string, { loja: string; promotoresAusentes: number; atendimentosImpactados: number }>);

  const lojaList = Object.values(lojaData)
    .sort((a, b) => b.atendimentosImpactados - a.atendimentosImpactados);

  // Dados por família
  const familiaData = filteredData
    .filter(p => p.status === "não registrou")
    .reduce((acc, curr) => {
      const key = curr.familia;
      if (!acc[key]) {
        acc[key] = { familia: key, promotoresAusentes: 0, atendimentosImpactados: 0 };
      }
      acc[key].promotoresAusentes += 1;
      acc[key].atendimentosImpactados += curr.atendimentosImpactados;
      return acc;
    }, {} as Record<string, { familia: string; promotoresAusentes: number; atendimentosImpactados: number }>);

  const familiaList = Object.values(familiaData)
    .sort((a, b) => b.atendimentosImpactados - a.atendimentosImpactados);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Tabela de Supervisores */}
      <Card>
        <CardHeader className="bg-blue-900 text-white">
          <CardTitle className="text-lg">Supervisor</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-800 text-white">
                <TableHead className="text-white">Supervisor</TableHead>
                <TableHead className="text-white text-right">Promotores Ausentes</TableHead>
                <TableHead className="text-white text-right">Atendimentos Impactados</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {supervisorList.map((item, index) => (
                <TableRow key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <TableCell className="font-medium">{item.supervisor}</TableCell>
                  <TableCell className="text-right">{item.promotoresAusentes}</TableCell>
                  <TableCell className="text-right">{item.atendimentosImpactados}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-blue-900 text-white font-bold">
                <TableCell>Total</TableCell>
                <TableCell className="text-right">
                  {supervisorList.reduce((sum, item) => sum + item.promotoresAusentes, 0)}
                </TableCell>
                <TableCell className="text-right">
                  {supervisorList.reduce((sum, item) => sum + item.atendimentosImpactados, 0)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tabela de Promotores */}
      <Card>
        <CardHeader className="bg-blue-900 text-white">
          <CardTitle className="text-lg">Promotor</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-800 text-white">
                <TableHead className="text-white">Promotor</TableHead>
                <TableHead className="text-white text-right">Atendimentos Impactados</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {promotorList.slice(0, 10).map((item, index) => (
                <TableRow key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <TableCell className="font-medium">{item.nome}</TableCell>
                  <TableCell className="text-right">{item.atendimentosImpactados}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-blue-900 text-white font-bold">
                <TableCell>Total</TableCell>
                <TableCell className="text-right">
                  {promotorList.reduce((sum, item) => sum + item.atendimentosImpactados, 0)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tabela de Marcas */}
      <Card>
        <CardHeader className="bg-blue-900 text-white">
          <CardTitle className="text-lg">Marca</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-800 text-white">
                <TableHead className="text-white">Marca</TableHead>
                <TableHead className="text-white text-right">Promotores Ausentes</TableHead>
                <TableHead className="text-white text-right">Atendimentos Impactados</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {marcaList.map((item, index) => (
                <TableRow key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <TableCell className="font-medium">{item.marca}</TableCell>
                  <TableCell className="text-right">{item.promotoresAusentes}</TableCell>
                  <TableCell className="text-right">{item.atendimentosImpactados}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-blue-900 text-white font-bold">
                <TableCell>Total</TableCell>
                <TableCell className="text-right">
                  {marcaList.reduce((sum, item) => sum + item.promotoresAusentes, 0)}
                </TableCell>
                <TableCell className="text-right">
                  {marcaList.reduce((sum, item) => sum + item.atendimentosImpactados, 0)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tabela de Lojas */}
      <Card>
        <CardHeader className="bg-blue-900 text-white">
          <CardTitle className="text-lg">Loja</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-800 text-white">
                <TableHead className="text-white">Loja</TableHead>
                <TableHead className="text-white text-right">Promotores Ausentes</TableHead>
                <TableHead className="text-white text-right">Atendimentos Impactados</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lojaList.slice(0, 10).map((item, index) => (
                <TableRow key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <TableCell className="font-medium">{item.loja}</TableCell>
                  <TableCell className="text-right">{item.promotoresAusentes}</TableCell>
                  <TableCell className="text-right">{item.atendimentosImpactados}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-blue-900 text-white font-bold">
                <TableCell>Total</TableCell>
                <TableCell className="text-right">
                  {lojaList.reduce((sum, item) => sum + item.promotoresAusentes, 0)}
                </TableCell>
                <TableCell className="text-right">
                  {lojaList.reduce((sum, item) => sum + item.atendimentosImpactados, 0)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Tabela de Famílias */}
      <Card>
        <CardHeader className="bg-blue-900 text-white">
          <CardTitle className="text-lg">Família</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-blue-800 text-white">
                <TableHead className="text-white">Família</TableHead>
                <TableHead className="text-white text-right">Promotores Ausentes</TableHead>
                <TableHead className="text-white text-right">Atendimentos Impactados</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {familiaList.map((item, index) => (
                <TableRow key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                  <TableCell className="font-medium">{item.familia}</TableCell>
                  <TableCell className="text-right">{item.promotoresAusentes}</TableCell>
                  <TableCell className="text-right">{item.atendimentosImpactados}</TableCell>
                </TableRow>
              ))}
              <TableRow className="bg-blue-900 text-white font-bold">
                <TableCell>Total</TableCell>
                <TableCell className="text-right">
                  {familiaList.reduce((sum, item) => sum + item.promotoresAusentes, 0)}
                </TableCell>
                <TableCell className="text-right">
                  {familiaList.reduce((sum, item) => sum + item.atendimentosImpactados, 0)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailedTables;
