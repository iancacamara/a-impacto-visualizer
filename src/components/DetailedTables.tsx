
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { Users, User, Package, Building, Layers } from "lucide-react";
import { PromotorData } from '../types/promoter';

interface DetailedTablesProps {
  filteredData: PromotorData[];
}

const DetailedTables = ({ filteredData }: DetailedTablesProps) => {
  // ... keep existing code (data processing logic)
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

  const promotorList = filteredData
    .filter(p => p.status === "não registrou")
    .sort((a, b) => b.atendimentosImpactados - a.atendimentosImpactados);

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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const tableConfigs = [
    { title: "Supervisor", data: supervisorList, icon: Users, gradient: "from-blue-500 to-cyan-500", bg: "bg-blue-50" },
    { title: "Promotor", data: promotorList.slice(0, 10), icon: User, gradient: "from-emerald-500 to-teal-500", bg: "bg-emerald-50" },
    { title: "Marca", data: marcaList, icon: Package, gradient: "from-violet-500 to-purple-500", bg: "bg-violet-50" },
    { title: "Loja", data: lojaList.slice(0, 10), icon: Building, gradient: "from-amber-500 to-orange-500", bg: "bg-amber-50" },
    { title: "Família", data: familiaList, icon: Layers, gradient: "from-rose-500 to-pink-500", bg: "bg-rose-50" }
  ];

  return (
    <motion.div 
      className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {tableConfigs.map((config, index) => (
        <motion.div key={config.title} variants={cardVariants}>
          <Card className="shadow-lg border border-gray-200 bg-white overflow-hidden">
            <CardHeader className={`bg-gradient-to-r ${config.gradient} text-white relative overflow-hidden`}>
              <div className="absolute inset-0 bg-white/10"></div>
              <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full -translate-y-10 translate-x-10"></div>
              <CardTitle className="text-lg flex items-center gap-3 relative z-10">
                <config.icon className="w-6 h-6" />
                {config.title}
              </CardTitle>
            </CardHeader>
            <CardContent className={`p-0 ${config.bg}`}>
              <Table>
                <TableHeader>
                  <TableRow className="bg-white border-gray-200">
                    <TableHead className="text-gray-700 font-semibold">
                      {config.title}
                    </TableHead>
                    {config.title !== "Promotor" && (
                      <TableHead className="text-gray-700 text-right font-semibold">
                        Promotores Ausentes
                      </TableHead>
                    )}
                    <TableHead className="text-gray-700 text-right font-semibold">
                      Atendimentos Impactados
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {config.data.map((item: any, itemIndex) => (
                    <motion.tr 
                      key={itemIndex}
                      className="border-gray-200 hover:bg-white/70 transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: itemIndex * 0.05 }}
                    >
                      <TableCell className="font-medium text-gray-700">
                        {item[Object.keys(item)[0]]}
                      </TableCell>
                      {config.title !== "Promotor" && (
                        <TableCell className="text-right text-gray-600">
                          {item.promotoresAusentes || item.promotoresAusentes}
                        </TableCell>
                      )}
                      <TableCell className="text-right text-gray-600">
                        {item.atendimentosImpactados}
                      </TableCell>
                    </motion.tr>
                  ))}
                  <TableRow className={`bg-gradient-to-r ${config.gradient} text-white font-bold border-0`}>
                    <TableCell className="font-bold">Total</TableCell>
                    {config.title !== "Promotor" && (
                      <TableCell className="text-right font-bold">
                        {config.data.reduce((sum: number, item: any) => sum + (item.promotoresAusentes || 0), 0)}
                      </TableCell>
                    )}
                    <TableCell className="text-right font-bold">
                      {config.data.reduce((sum: number, item: any) => sum + item.atendimentosImpactados, 0)}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default DetailedTables;
