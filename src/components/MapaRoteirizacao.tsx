
import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Route } from "lucide-react";
import { RoteirizacaoData, RotaSimulada } from '../types/roteirizacao';

interface MapaRoteirizacaoProps {
  dados: RoteirizacaoData[];
  rotasSelecionadas: RotaSimulada[];
  modoVisualizacao: 'matriz' | 'simulacao';
}

const MapaRoteirizacao = ({ dados, rotasSelecionadas, modoVisualizacao }: MapaRoteirizacaoProps) => {
  // Função para converter coordenadas em posição no SVG
  const coordToSVG = (lat: number, lng: number) => {
    // Área aproximada de São Paulo e Rio de Janeiro
    const minLat = -23.8, maxLat = -22.5;
    const minLng = -47.0, maxLng = -43.0;
    
    const x = ((lng - minLng) / (maxLng - minLng)) * 800;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 600;
    
    return { x: Math.max(50, Math.min(750, x)), y: Math.max(50, Math.min(550, y)) };
  };

  const cores = ['#8B5CF6', '#F59E0B', '#EF4444', '#10B981', '#3B82F6'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            <svg 
              className="w-full h-[600px] bg-gradient-to-br from-blue-50 to-green-50" 
              viewBox="0 0 800 600"
            >
              {/* Background grid */}
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e5e7eb" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
              
              {/* Região de São Paulo (simulada) */}
              <circle cx="200" cy="300" r="80" fill="#e0e7ff" stroke="#6366f1" strokeWidth="2" opacity="0.3" />
              <text x="200" y="305" textAnchor="middle" className="fill-gray-600 text-sm font-medium">São Paulo</text>
              
              {/* Região do Rio de Janeiro (simulada) */}
              <circle cx="600" cy="400" r="60" fill="#fef3c7" stroke="#f59e0b" strokeWidth="2" opacity="0.3" />
              <text x="600" y="405" textAnchor="middle" className="fill-gray-600 text-sm font-medium">Rio de Janeiro</text>

              {/* Marcadores dos dados no modo matriz */}
              {modoVisualizacao === 'matriz' && dados.map((item, index) => {
                const pos = coordToSVG(item.coordenadas.lat, item.coordenadas.lng);
                return (
                  <g key={item.id}>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="8"
                      fill="#8B5CF6"
                      stroke="white"
                      strokeWidth="2"
                      className="cursor-pointer hover:scale-110 transition-transform"
                    />
                    <text
                      x={pos.x}
                      y={pos.y - 15}
                      textAnchor="middle"
                      className="fill-gray-700 text-xs font-medium pointer-events-none"
                    >
                      {item.nomePromotor.split(' ')[0]}
                    </text>
                  </g>
                );
              })}

              {/* Rotas simuladas */}
              {modoVisualizacao === 'simulacao' && rotasSelecionadas.map((rota, rotaIndex) => {
                const cor = cores[rotaIndex % cores.length];
                return (
                  <g key={rota.id}>
                    {/* Linha da rota */}
                    {rota.pontos.length > 1 && (
                      <path
                        d={`M ${rota.pontos.map((ponto) => {
                          const pos = coordToSVG(ponto.coordenadas.lat, ponto.coordenadas.lng);
                          return `${pos.x},${pos.y}`;
                        }).join(' L ')}`}
                        stroke={cor}
                        strokeWidth="3"
                        fill="none"
                        strokeDasharray="5,5"
                        className="animate-pulse"
                      />
                    )}
                    
                    {/* Marcadores numerados */}
                    {rota.pontos.map((ponto, index) => {
                      const pos = coordToSVG(ponto.coordenadas.lat, ponto.coordenadas.lng);
                      return (
                        <g key={ponto.id}>
                          <circle
                            cx={pos.x}
                            cy={pos.y}
                            r="15"
                            fill={cor}
                            stroke="white"
                            strokeWidth="2"
                            className="cursor-pointer hover:scale-110 transition-transform"
                          />
                          <text
                            x={pos.x}
                            y={pos.y + 4}
                            textAnchor="middle"
                            className="fill-white text-sm font-bold pointer-events-none"
                          >
                            {index + 1}
                          </text>
                          <text
                            x={pos.x}
                            y={pos.y - 25}
                            textAnchor="middle"
                            className="fill-gray-700 text-xs font-medium pointer-events-none"
                          >
                            {ponto.nomePromotor.split(' ')[0]}
                          </text>
                        </g>
                      );
                    })}
                  </g>
                );
              })}
            </svg>
            
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                {modoVisualizacao === 'matriz' ? (
                  <>
                    <MapPin className="w-4 h-4 text-purple-600" />
                    Matriz de Promotores
                  </>
                ) : (
                  <>
                    <Route className="w-4 h-4 text-purple-600" />
                    Simulação de Rotas
                  </>
                )}
              </h3>
              <div className="text-sm text-gray-600">
                {modoVisualizacao === 'matriz' 
                  ? `${dados.length} promotores disponíveis`
                  : `${rotasSelecionadas.length} rota(s) ativa(s)`
                }
              </div>
            </div>

            {/* Legenda das rotas */}
            {modoVisualizacao === 'simulacao' && rotasSelecionadas.length > 0 && (
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
                <h4 className="font-semibold text-gray-800 mb-2 text-sm">Legenda</h4>
                <div className="space-y-1">
                  {rotasSelecionadas.map((rota, index) => (
                    <div key={rota.id} className="flex items-center gap-2 text-xs">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: cores[index % cores.length] }}
                      />
                      <span className="text-gray-700">{rota.nome}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MapaRoteirizacao;
