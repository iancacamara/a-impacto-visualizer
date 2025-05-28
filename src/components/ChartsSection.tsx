
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, Package } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area } from 'recharts';

interface ChartsSectionProps {
  statusData: { name: string; value: number; color: string; }[];
  tipoData: { tipo: string; registrou: number; naoRegistrou: number; }[];
  marcasAfetadas: { marca: string; horas: number; afetada: boolean; }[];
}

const ChartsSection = ({ statusData, tipoData, marcasAfetadas }: ChartsSectionProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-blue-600" />
            Status dos Promotores
          </CardTitle>
        </CardHeader>
        <CardContent>
          {statusData.some(item => item.value > 0) ? (
            <>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                {statusData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-slate-600">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-64 text-slate-500">
              Nenhum dado disponível para os filtros selecionados
            </div>
          )}
        </CardContent>
      </Card>

      <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <Users className="h-5 w-5 text-green-600" />
            Registro por Tipo de Contrato
          </CardTitle>
        </CardHeader>
        <CardContent>
          {tipoData.length > 0 ? (
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={tipoData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="tipo" fontSize={10} />
                <YAxis />
                <Tooltip />
                <Bar dataKey="registrou" fill="#10B981" name="Registraram" />
                <Bar dataKey="naoRegistrou" fill="#EF4444" name="Não Registraram" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-64 text-slate-500">
              Nenhum dado disponível para os filtros selecionados
            </div>
          )}
        </CardContent>
      </Card>

      {marcasAfetadas.length > 0 && (
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Package className="h-5 w-5 text-purple-600" />
              Impacto por Marca (Horas Perdidas)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={marcasAfetadas}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="marca" />
                <YAxis />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="horas" 
                  stroke="#8B5CF6" 
                  fill="url(#colorGradient)" 
                  fillOpacity={0.7}
                />
                <defs>
                  <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ChartsSection;
