
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, Clock, TrendingUp, TrendingDown } from "lucide-react";
import { BalanceamentoData } from '../types/balanceamento';

interface StatsCardsBalanceamentoPythonProps {
  filteredData: BalanceamentoData[];
}

const StatsCardsBalanceamentoPython = ({ filteredData }: StatsCardsBalanceamentoPythonProps) => {
  // Calcular métricas exatamente como no código Python
  const totalPromotores = filteredData.length;
  const horasTotais = filteredData.reduce((sum, p) => sum + p.horasRealizadas, 0);
  const ociosos = filteredData.filter(p => p.horasOciosas > 0).length;
  const sobrecarga = filteredData.filter(p => p.horasExcedentes > 0).length;

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    hover: { scale: 1.02, y: -2 }
  };

  const statsData = [
    {
      title: "Promotores",
      value: totalPromotores,
      icon: Users,
      color: "text-blue-600",
      bg: "bg-blue-50"
    },
    {
      title: "Horas Totais",
      value: horasTotais,
      icon: Clock,
      color: "text-green-600",
      bg: "bg-green-50"
    },
    {
      title: "Ociosos",
      value: ociosos,
      icon: TrendingDown,
      color: "text-orange-600",
      bg: "bg-orange-50"
    },
    {
      title: "Sobrecarga",
      value: sobrecarga,
      icon: TrendingUp,
      color: "text-red-600",
      bg: "bg-red-50"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.title}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className={`${stat.bg} border-l-4 border-l-gray-600`}>
            <CardHeader className="pb-3">
              <CardTitle className={`text-sm font-medium ${stat.color} uppercase tracking-wide`}>
                {stat.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900">
                  {stat.value.toLocaleString()}
                </span>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCardsBalanceamentoPython;
