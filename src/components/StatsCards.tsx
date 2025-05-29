
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import { Users, AlertTriangle, Building, Package } from "lucide-react";
import { DashboardStats } from '../types/promoter';

interface StatsCardsProps {
  stats: DashboardStats;
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    hover: { scale: 1.05, y: -5 }
  };

  const statsData = [
    {
      title: "Promotores Ausentes",
      value: stats.promotoresAusentes,
      icon: AlertTriangle,
      gradient: "from-red-500 to-red-700",
      shadowColor: "shadow-red-500/25"
    },
    {
      title: "Atendimentos Impactados",
      value: stats.atendimentosImpactados,
      icon: Users,
      gradient: "from-orange-500 to-orange-700",
      shadowColor: "shadow-orange-500/25"
    },
    {
      title: "Total de Promotores",
      value: stats.totalPromotores,
      icon: Users,
      gradient: "from-blue-500 to-blue-700",
      shadowColor: "shadow-blue-500/25"
    },
    {
      title: "Lojas Afetadas",
      value: stats.lojasAfetadas,
      icon: Building,
      gradient: "from-purple-500 to-purple-700",
      shadowColor: "shadow-purple-500/25"
    },
    {
      title: "Marcas Afetadas",
      value: stats.marcasAfetadas,
      icon: Package,
      gradient: "from-green-500 to-green-700",
      shadowColor: "shadow-green-500/25"
    },
    {
      title: "Famílias Afetadas",
      value: stats.familiasAfetadas,
      icon: Package,
      gradient: "from-indigo-500 to-indigo-700",
      shadowColor: "shadow-indigo-500/25"
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
          <Card className={`relative overflow-hidden border-0 bg-gradient-to-br ${stat.gradient} text-white ${stat.shadowColor} shadow-2xl`}>
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
            <CardContent className="relative p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white/80 text-sm font-medium mb-2">{stat.title}</p>
                  <p className="text-3xl font-bold text-white">
                    {stat.value.toLocaleString()}
                  </p>
                </div>
                <div className="p-3 bg-white/20 rounded-full backdrop-blur-sm">
                  <stat.icon className="w-8 h-8 text-white" />
                </div>
              </div>
              <div className="mt-4 h-2 bg-white/20 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-white/40 rounded-full"
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

export default StatsCards;
