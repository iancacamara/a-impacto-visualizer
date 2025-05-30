
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { motion } from "framer-motion";
import { Users, TrendingUp, TrendingDown, Clock, Target } from "lucide-react";
import { BalanceamentoData } from '../types/balanceamento';
import CardFilter from './CardFilter';

interface DetailedTablesBalanceamentoProps {
  filteredData: BalanceamentoData[];
}

const DetailedTablesBalanceamento = ({ filteredData }: DetailedTablesBalanceamentoProps) => {
  const [filters, setFilters] = useState({
    promotorExcedente: '',
    promotorOcioso: '',
    coordenador: '',
    regional: '',
    loja: ''
  });

  const handleFilterChange = (type: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [type]: value
    }));
  };

  // Top promotores com horas excedentes
  const promotoresExcedentes = filteredData
    .filter(p => p.horasExcedentes > 0)
    .filter(item => filters.promotorExcedente === '' || item.promotor.toLowerCase().includes(filters.promotorExcedente.toLowerCase()))
    .sort((a, b) => b.horasExcedentes - a.horasExcedentes)
    .slice(0, 10);

  // Top promotores com horas ociosas
  const promotoresOciosos = filteredData
    .filter(p => p.horasOciosas > 0)
    .filter(item => filters.promotorOcioso === '' || item.promotor.toLowerCase().includes(filters.promotorOcioso.toLowerCase()))
    .sort((a, b) => b.horasOciosas - a.horasOciosas)
    .slice(0, 10);

  // Dados por coordenador
  const coordenadorData = filteredData
    .reduce((acc, curr) => {
      const key = curr.coordenador;
      if (!acc[key]) {
        acc[key] = { 
          coordenador: key, 
          totalPromotores: 0, 
          horasExcedentes: 0, 
          horasOciosas: 0,
          eficienciaMedia: 0
        };
      }
      acc[key].totalPromotores += 1;
      acc[key].horasExcedentes += curr.horasExcedentes;
      acc[key].horasOciosas += curr.horasOciosas;
      acc[key].eficienciaMedia += curr.eficiencia;
      return acc;
    }, {} as Record<string, any>);

  const coordenadorList = Object.values(coordenadorData)
    .map((item: any) => ({
      ...item,
      eficienciaMedia: item.eficienciaMedia / item.totalPromotores
    }))
    .filter((item: any) => filters.coordenador === '' || item.coordenador.toLowerCase().includes(filters.coordenador.toLowerCase()))
    .sort((a: any, b: any) => b.horasExcedentes - a.horasExcedentes);

  // Dados por regional
  const regionalData = filteredData
    .reduce((acc, curr) => {
      const key = curr.regional;
      if (!acc[key]) {
        acc[key] = { 
          regional: key, 
          totalPromotores: 0, 
          horasExcedentes: 0, 
          horasOciosas: 0,
          eficienciaMedia: 0
        };
      }
      acc[key].totalPromotores += 1;
      acc[key].horasExcedentes += curr.horasExcedentes;
      acc[key].horasOciosas += curr.horasOciosas;
      acc[key].eficienciaMedia += curr.eficiencia;
      return acc;
    }, {} as Record<string, any>);

  const regionalList = Object.values(regionalData)
    .map((item: any) => ({
      ...item,
      eficienciaMedia: item.eficienciaMedia / item.totalPromotores
    }))
    .filter((item: any) => filters.regional === '' || item.regional.toLowerCase().includes(filters.regional.toLowerCase()))
    .sort((a: any, b: any) => b.eficienciaMedia - a.eficienciaMedia);

  // Dados por loja
  const lojaData = filteredData
    .reduce((acc, curr) => {
      const key = curr.loja;
      if (!acc[key]) {
        acc[key] = { 
          loja: key, 
          totalPromotores: 0, 
          horasExcedentes: 0, 
          horasOciosas: 0,
          eficienciaMedia: 0
        };
      }
      acc[key].totalPromotores += 1;
      acc[key].horasExcedentes += curr.horasExcedentes;
      acc[key].horasOciosas += curr.horasOciosas;
      acc[key].eficienciaMedia += curr.eficiencia;
      return acc;
    }, {} as Record<string, any>);

  const lojaList = Object.values(lojaData)
    .map((item: any) => ({
      ...item,
      eficienciaMedia: item.eficienciaMedia / item.totalPromotores
    }))
    .filter((item: any) => filters.loja === '' || item.loja.toLowerCase().includes(filters.loja.toLowerCase()))
    .sort((a: any, b: any) => b.horasExcedentes - a.horasExcedentes)
    .slice(0, 10);

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
    { 
      title: "Promotores Excedentes", 
      data: promotoresExcedentes, 
      icon: TrendingUp, 
      gradient: "from-red-500 to-pink-500", 
      bg: "bg-red-50",
      filterKey: "promotorExcedente",
      columns: [
        { key: "promotor", label: "Nome" },
        { key: "horasExcedentes", label: "Horas Excedentes" },
        { key: "eficiencia", label: "Eficiência %" }
      ]
    },
    { 
      title: "Promotores Ociosos", 
      data: promotoresOciosos, 
      icon: TrendingDown, 
      gradient: "from-orange-500 to-yellow-500", 
      bg: "bg-orange-50",
      filterKey: "promotorOcioso",
      columns: [
        { key: "promotor", label: "Nome" },
        { key: "horasOciosas", label: "Horas Ociosas" },
        { key: "eficiencia", label: "Eficiência %" }
      ]
    },
    { 
      title: "Por Coordenador", 
      data: coordenadorList, 
      icon: Users, 
      gradient: "from-blue-500 to-cyan-500", 
      bg: "bg-blue-50",
      filterKey: "coordenador",
      columns: [
        { key: "coordenador", label: "Coordenador" },
        { key: "totalPromotores", label: "Total Promotores" },
        { key: "horasExcedentes", label: "Horas Excedentes" },
        { key: "eficienciaMedia", label: "Eficiência Média" }
      ]
    },
    { 
      title: "Por Regional", 
      data: regionalList, 
      icon: Target, 
      gradient: "from-green-500 to-emerald-500", 
      bg: "bg-green-50",
      filterKey: "regional",
      columns: [
        { key: "regional", label: "Regional" },
        { key: "totalPromotores", label: "Total Promotores" },
        { key: "eficienciaMedia", label: "Eficiência Média" },
        { key: "horasExcedentes", label: "Horas Excedentes" }
      ]
    },
    { 
      title: "Por Loja", 
      data: lojaList, 
      icon: Clock, 
      gradient: "from-purple-500 to-violet-500", 
      bg: "bg-purple-50",
      filterKey: "loja",
      columns: [
        { key: "loja", label: "Loja" },
        { key: "totalPromotores", label: "Total Promotores" },
        { key: "horasExcedentes", label: "Horas Excedentes" },
        { key: "eficienciaMedia", label: "Eficiência Média" }
      ]
    }
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
              <CardTitle className="text-lg flex items-center gap-3 relative z-10 mb-4">
                <config.icon className="w-6 h-6" />
                {config.title}
              </CardTitle>
              <CardFilter
                placeholder={`Buscar ${config.title.toLowerCase()}...`}
                onFilter={(value) => handleFilterChange(config.filterKey, value)}
                className="relative z-10"
              />
            </CardHeader>
            <CardContent className={`p-0 ${config.bg}`}>
              <Table>
                <TableHeader>
                  <TableRow className="bg-white border-gray-200">
                    {config.columns.map((column) => (
                      <TableHead key={column.key} className="text-gray-700 font-semibold">
                        {column.label}
                      </TableHead>
                    ))}
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
                      {config.columns.map((column) => (
                        <TableCell key={column.key} className="text-gray-600">
                          {column.key.includes('eficiencia') || column.key === 'eficienciaMedia' 
                            ? `${typeof item[column.key] === 'number' ? item[column.key].toFixed(1) : item[column.key]}%`
                            : typeof item[column.key] === 'string' 
                              ? item[column.key].length > 20 
                                ? item[column.key].substring(0, 20) + '...'
                                : item[column.key]
                              : item[column.key]
                          }
                        </TableCell>
                      ))}
                    </motion.tr>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default DetailedTablesBalanceamento;
