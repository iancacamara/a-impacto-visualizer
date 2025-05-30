
import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, MapPin, Clock, Route } from "lucide-react";
import { RoteirizacaoData, RotaSimulada } from '../types/roteirizacao';

interface PainelRotasProps {
  dados: RoteirizacaoData[];
  rotasSelecionadas: RotaSimulada[];
  onRemoveRota: (index: number) => void;
}

const PainelRotas = ({ dados, rotasSelecionadas, onRemoveRota }: PainelRotasProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.6 }}
      className="space-y-6"
    >
      {/* Painel de Rotas Ativas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Route className="w-5 h-5 text-purple-600" />
            Rotas Ativas
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {rotasSelecionadas.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              Nenhuma rota criada ainda.<br />
              Use os filtros acima para criar uma rota.
            </p>
          ) : (
            rotasSelecionadas.map((rota, index) => (
              <div key={rota.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-gray-800">{rota.nome}</h4>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onRemoveRota(index)}
                    className="text-red-500 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: rota.cor }}
                    />
                    <span className="text-gray-600">{rota.pontos.length} paradas</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-600">{rota.distanciaTotal} km</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-gray-400" />
                    <span className="text-gray-600">{Math.floor(rota.tempoEstimado / 60)}h {rota.tempoEstimado % 60}m</span>
                  </div>
                </div>

                {rota.otimizada && (
                  <Badge variant="secondary" className="bg-green-50 text-green-700">
                    Otimizada
                  </Badge>
                )}

                <div className="space-y-2">
                  <h5 className="text-sm font-medium text-gray-700">Paradas:</h5>
                  {rota.pontos.map((ponto, idx) => (
                    <div key={ponto.id} className="flex items-center gap-2 text-sm">
                      <div 
                        className="w-5 h-5 rounded-full flex items-center justify-center text-white text-xs font-bold"
                        style={{ backgroundColor: rota.cor }}
                      >
                        {idx + 1}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-gray-800">{ponto.nomePromotor}</p>
                        <p className="text-gray-500 text-xs">{ponto.bairro}, {ponto.cidade}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      {/* Painel de Promotores Disponíveis */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-blue-600" />
            Promotores Disponíveis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {dados.slice(0, 10).map((item) => (
              <div key={item.id} className="flex items-center justify-between p-2 rounded-lg hover:bg-gray-50">
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-800">{item.nomePromotor}</p>
                  <p className="text-xs text-gray-500">{item.bairro}, {item.cidade} - {item.uf}</p>
                </div>
                <Badge variant="outline" className="text-xs">
                  {item.horas}h
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PainelRotas;
