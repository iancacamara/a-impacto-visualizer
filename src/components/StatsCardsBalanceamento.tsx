
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, Clock, TrendingUp, TrendingDown, Target, Zap } from "lucide-react";
import { BalanceamentoStats } from '../types/balanceamento';

interface StatsCardsBalanceamentoProps {
  stats: BalanceamentoStats;
}

const StatsCardsBalanceamento = ({ stats }: StatsCardsBalanceamentoProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    hover: { scale: 1.05, y: -5 }
  };

  const statsData = [
    {
      title: "Total de Promotores",
      value: stats.totalPromotores,
      icon: Users,
      gradient: "from-blue-400 to-blue-500",
      shadowColor: "shadow-blue-300/30",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500"
    },
    {
      title: "Horas Excedentes",
      value: stats.horasExcedentesTotal,
      icon: TrendingUp,
      gradient: "from-red-400 to-red-500",
      shadowColor: "shadow-red-300/30",
      iconBg: "bg-red-100",
      iconColor: "text-red-500"
    },
    {
      title: "Horas Ociosas",
      value: stats.horasOciosasTotal,
      icon: TrendingDown,
      gradient: "from-orange-300 to-orange-400",
      shadowColor: "shadow-orange-300/30",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500"
    },
    {
      title: "Eficiência Média",
      value: `${stats.eficienciaMedia.toFixed(1)}%`,
      icon: Target,
      gradient: "from-green-400 to-green-500",
      shadowColor: "shadow-green-300/30",
      iconBg: "bg-green-100",
      iconColor: "text-green-500"
    },
    {
      title: "Promotores Excedentes",
      value: stats.promotoresExcedentes,
      icon: Zap,
      gradient: "from-purple-400 to-purple-500",
      shadowColor: "shadow-purple-300/30",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-500"
    },
    {
      title: "Promotores Ociosos",
      value: stats.promotoresOciosos,
      icon: Clock,
      gradient: "from-yellow-400 to-yellow-500",
      shadowColor: "shadow-yellow-300/30",
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-500"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      {statsData.map((stat, index) => (
        <motion.div
          key={stat.title}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className={`relative overflow-hidden border-0 bg-gradient-to-br ${stat.gradient} text-white ${stat.shadowColor} shadow-xl`}>
            <div className="absolute inset-0 bg-white/10"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/90 text-sm font-medium mb-2">{stat.title}</p>
                  <p className="text-3xl font-bold text-white">
                    {typeof stat.value === 'number' ? stat.value.toLocaleString() : stat.value}
                  </p>
                </div>
                <div className={`p-3 ${stat.iconBg} rounded-full backdrop-blur-sm shadow-lg`}>
                  <stat.icon className={`w-8 h-8 ${stat.iconColor}`} />
                </div>
              </div>
              <div className="mt-4 h-2 bg-white/30 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-white/50 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCardsBalanceamento;
