
import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Briefcase, Users, TrendingUp, CheckCircle, Clock, AlertCircle } from "lucide-react";
import { Vaga } from '../types/vagas';

interface EstatisticasVagasProps {
  dados: Vaga[];
}

const EstatisticasVagas = ({ dados }: EstatisticasVagasProps) => {
  const estatisticas = {
    total: dados.length,
    compartilhadas: dados.filter(v => v.tipo === 'compartilhado-normal').length,
    expansao: dados.filter(v => v.tipo === 'expansao').length,
    abertas: dados.filter(v => !['finalizada', 'cancelada'].includes(v.status)).length,
    finalizadas: dados.filter(v => v.status === 'finalizada').length,
    urgentes: dados.filter(v => v.prioridade === 'urgente').length
  };

  const cards = [
    {
      title: "Total de Vagas",
      value: estatisticas.total,
      icon: Briefcase,
      color: "bg-blue-500",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600"
    },
    {
      title: "Compartilhado Normal",
      value: estatisticas.compartilhadas,
      icon: Users,
      color: "bg-green-500",
      bgColor: "bg-green-50",
      textColor: "text-green-600"
    },
    {
      title: "Expansão (Freelance)",
      value: estatisticas.expansao,
      icon: TrendingUp,
      color: "bg-purple-500",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600"
    },
    {
      title: "Vagas Abertas",
      value: estatisticas.abertas,
      icon: Clock,
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
      textColor: "text-orange-600"
    },
    {
      title: "Finalizadas",
      value: estatisticas.finalizadas,
      icon: CheckCircle,
      color: "bg-emerald-500",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600"
    },
    {
      title: "Urgentes",
      value: estatisticas.urgentes,
      icon: AlertCircle,
      color: "bg-red-500",
      bgColor: "bg-red-50",
      textColor: "text-red-600"
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6"
    >
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
        >
          <Card className={`${card.bgColor} border-none shadow-lg hover:shadow-xl transition-all duration-300`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className={`text-sm font-medium ${card.textColor}`}>
                {card.title}
              </CardTitle>
              <card.icon className={`h-4 w-4 ${card.textColor}`} />
            </CardHeader>
            <CardContent>
              <div className={`text-2xl font-bold ${card.textColor}`}>
                {card.value}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default EstatisticasVagas;
