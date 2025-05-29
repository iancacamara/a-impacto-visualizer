
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TrendingUp, Users, Package, BarChart } from "lucide-react";
import { BarChart as RechartsBar, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area, LineChart, Line } from 'recharts';

interface ChartsSectionProps {
  statusData: { name: string; value: number; color: string; }[];
  tipoData: { tipo: string; registrou: number; naoRegistrou: number; }[];
  marcasAfetadas: { marca: string; horas: number; afetada: boolean; }[];
}

const ChartsSection = ({ statusData, tipoData, marcasAfetadas }: ChartsSectionProps) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30, rotateX: -15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    },
    hover: { 
      scale: 1.02, 
      y: -5,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.div 
      className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Status dos Promotores - Gráfico de Pizza 3D */}
      <motion.div variants={cardVariants} whileHover="hover">
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-slate-800 to-slate-900 text-white backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
          <CardHeader className="relative">
            <CardTitle className="text-xl font-bold flex items-center gap-3">
              <div className="p-2 bg-blue-500/20 rounded-lg backdrop-blur-sm">
                <TrendingUp className="h-6 w-6 text-blue-400" />
              </div>
              Status dos Promotores
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            {statusData.some(item => item.value > 0) ? (
              <>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={120}
                      dataKey="value"
                      startAngle={90}
                      endAngle={450}
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth={2}
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                        color: 'white'
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-6 mt-4">
                  {statusData.map((item, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center gap-2"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <div className="w-4 h-4 rounded-full shadow-lg" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-slate-300">{item.name}: {item.value}</span>
                    </motion.div>
                  ))}
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center h-64 text-slate-400">
                <div className="text-center">
                  <BarChart className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Nenhum dado disponível para os filtros selecionados</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Registro por Tipo - Gráfico de Barras Moderno */}
      <motion.div variants={cardVariants} whileHover="hover">
        <Card className="shadow-2xl border-0 bg-gradient-to-br from-slate-800 to-slate-900 text-white backdrop-blur-sm overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 to-blue-500/10"></div>
          <CardHeader className="relative">
            <CardTitle className="text-xl font-bold flex items-center gap-3">
              <div className="p-2 bg-green-500/20 rounded-lg backdrop-blur-sm">
                <Users className="h-6 w-6 text-green-400" />
              </div>
              Registro por Tipo de Contrato
            </CardTitle>
          </CardHeader>
          <CardContent className="relative">
            {tipoData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <RechartsBar data={tipoData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="tipo" 
                    fontSize={12}
                    tick={{ fill: 'rgba(255,255,255,0.7)' }}
                  />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.7)' }} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Bar 
                    dataKey="registrou" 
                    fill="url(#greenGradient)" 
                    name="Registraram"
                    radius={[4, 4, 0, 0]}
                  />
                  <Bar 
                    dataKey="naoRegistrou" 
                    fill="url(#redGradient)" 
                    name="Não Registraram"
                    radius={[4, 4, 0, 0]}
                  />
                  <defs>
                    <linearGradient id="greenGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10B981" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#10B981" stopOpacity={0.6}/>
                    </linearGradient>
                    <linearGradient id="redGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0.6}/>
                    </linearGradient>
                  </defs>
                </RechartsBar>
              </ResponsiveContainer>
            ) : (
              <div className="flex items-center justify-center h-64 text-slate-400">
                <div className="text-center">
                  <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p>Nenhum dado disponível para os filtros selecionados</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Impacto por Marca - Gráfico de Área com Gradiente */}
      {marcasAfetadas.length > 0 && (
        <motion.div variants={cardVariants} whileHover="hover" className="lg:col-span-2">
          <Card className="shadow-2xl border-0 bg-gradient-to-br from-slate-800 to-slate-900 text-white backdrop-blur-sm overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>
            <CardHeader className="relative">
              <CardTitle className="text-xl font-bold flex items-center gap-3">
                <div className="p-2 bg-purple-500/20 rounded-lg backdrop-blur-sm">
                  <Package className="h-6 w-6 text-purple-400" />
                </div>
                Impacto por Marca (Horas Perdidas)
              </CardTitle>
            </CardHeader>
            <CardContent className="relative">
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={marcasAfetadas}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis 
                    dataKey="marca" 
                    tick={{ fill: 'rgba(255,255,255,0.7)', fontSize: 12 }}
                  />
                  <YAxis tick={{ fill: 'rgba(255,255,255,0.7)' }} />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'rgba(0,0,0,0.8)',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px',
                      color: 'white'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="horas" 
                    stroke="#8B5CF6" 
                    fill="url(#purpleGradient)" 
                    strokeWidth={3}
                  />
                  <defs>
                    <linearGradient id="purpleGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      )}
    </motion.div>
  );
};

export default ChartsSection;
