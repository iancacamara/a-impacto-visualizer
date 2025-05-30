
import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Route, Clock, MapPin, TrendingDown } from "lucide-react";
import { RoteirizacaoData, RotaSimulada } from '../types/roteirizacao';

interface EstatisticasRoteirizacaoProps {
  dados: RoteirizacaoData[];
  rotasSelecionadas: RotaSimulada[];
}

const EstatisticasRoteirizacao = ({ dados, rotasSelecionadas }: EstatisticasRoteirizacaoProps) => {
  const totalPromotores = dados.length;
  const totalRotas = rotasSelecionadas.length;
  const distanciaTotal = rotasSelecionadas.reduce((sum, rota) => sum + rota.distanciaTotal, 0);
  const tempoTotal = rotasSelecionadas.reduce((sum, rota) => sum + rota.tempoEstimado, 0);
  const economia = totalRotas > 0 ? Math.floor(Math.random() * 30) + 15 : 0; // Simulado

  const stats = [
    {
      title: "Total de Promotores",
      value: totalPromotores,
      icon: MapPin,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      format: (val: number) => val.toString()
    },
    {
      title: "Rotas Criadas",
      value: totalRotas,
      icon: Route,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      format: (val: number) => val.toString()
    },
    {
      title: "Distância Total",
      value: distanciaTotal,
      icon: MapPin,
      color: "text-amber-600",
      bgColor: "bg-amber-50",
      format: (val: number) => `${val} km`
    },
    {
      title: "Tempo Estimado",
      value: tempoTotal,
      icon: Clock,
      color: "text-emerald-600",
      bgColor: "bg-emerald-50",
      format: (val: number) => `${Math.floor(val / 60)}h ${val % 60}m`
    },
    {
      title: "Economia Estimada",
      value: economia,
      icon: TrendingDown,
      color: "text-green-600",
      bgColor: "bg-green-50",
      format: (val: number) => `${val}%`
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <Card className="hover:shadow-lg transition-shadow duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-800">
                    {stat.format(stat.value)}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
};

export default EstatisticasRoteirizacao;
