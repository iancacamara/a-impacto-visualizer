
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { motion } from "framer-motion";
import { TrendingUp, BarChart3, PieChart as PieChartIcon } from "lucide-react";

interface ChartsBalanceamentoProps {
  chartData: {
    statusData: Array<{ name: string; value: number; color: string }>;
    eficienciaData: Array<{ regional: string; eficiencia: number; promotores: number }>;
    horasData: Array<{ coordenador: string; horasExcedentes: number; horasOciosas: number; total: number }>;
  };
}

const ChartsBalanceamento = ({ chartData }: ChartsBalanceamentoProps) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      <motion.div variants={cardVariants} initial="hidden" animate="visible">
        <Card className="shadow-lg border border-gray-200 bg-white">
          <CardHeader className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
            <CardTitle className="text-lg flex items-center gap-3">
              <PieChartIcon className="w-6 h-6" />
              Status dos Promotores
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={chartData.statusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {chartData.statusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
        <Card className="shadow-lg border border-gray-200 bg-white">
          <CardHeader className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
            <CardTitle className="text-lg flex items-center gap-3">
              <TrendingUp className="w-6 h-6" />
              Eficiência por Regional
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.eficienciaData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="regional" tick={{ fontSize: 12 }} />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => [`${value}%`, 'Eficiência']}
                  labelFormatter={(label) => `Regional: ${label}`}
                />
                <Bar dataKey="eficiencia" fill="#10B981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div variants={cardVariants} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
        <Card className="shadow-lg border border-gray-200 bg-white">
          <CardHeader className="bg-gradient-to-r from-purple-500 to-violet-500 text-white">
            <CardTitle className="text-lg flex items-center gap-3">
              <BarChart3 className="w-6 h-6" />
              Horas por Coordenador
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData.horasData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="coordenador" tick={{ fontSize: 10 }} angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="horasExcedentes" stackId="a" fill="#EF4444" name="Horas Excedentes" />
                <Bar dataKey="horasOciosas" stackId="a" fill="#F59E0B" name="Horas Ociosas" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default ChartsBalanceamento;
