
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
      gradient: "from-red-400 to-red-500",
      shadowColor: "shadow-red-300/30",
      iconBg: "bg-red-100",
      iconColor: "text-red-500"
    },
    {
      title: "Atendimentos Impactados",
      value: stats.atendimentosImpactados,
      icon: Users,
      gradient: "from-orange-300 to-orange-400",
      shadowColor: "shadow-orange-300/30",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-500"
    },
    {
      title: "Total de Promotores",
      value: stats.totalPromotores,
      icon: Users,
      gradient: "from-purple-300 to-purple-400",
      shadowColor: "shadow-purple-300/30",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-500"
    },
    {
      title: "Lojas Afetadas",
      value: stats.lojasAfetadas,
      icon: Building,
      gradient: "from-pink-300 to-pink-400",
      shadowColor: "shadow-pink-300/30",
      iconBg: "bg-pink-100",
      iconColor: "text-pink-500"
    },
    {
      title: "Marcas Afetadas",
      value: stats.marcasAfetadas,
      icon: Package,
      gradient: "from-blue-300 to-blue-400",
      shadowColor: "shadow-blue-300/30",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-500"
    },
    {
      title: "Famílias Afetadas",
      value: stats.familiasAfetadas,
      icon: Package,
      gradient: "from-indigo-300 to-indigo-400",
      shadowColor: "shadow-indigo-300/30",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-500"
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
                    {stat.value.toLocaleString()}
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

export default StatsCards;
