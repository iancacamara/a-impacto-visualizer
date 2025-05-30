
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { RoteirizacaoData, RotaSimulada } from '../types/roteirizacao';

// Fix para os ícones do Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapaRoteirizacaoProps {
  dados: RoteirizacaoData[];
  rotasSelecionadas: RotaSimulada[];
  modoVisualizacao: 'matriz' | 'simulacao';
}

const MapaRoteirizacao = ({ dados, rotasSelecionadas, modoVisualizacao }: MapaRoteirizacaoProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;

    // Remover mapa existente se houver
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
    }

    // Criar novo mapa
    const map = L.map(mapRef.current).setView([-23.5505, -46.6333], 10);

    // Adicionar camada do mapa
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    mapInstanceRef.current = map;

    // Adicionar marcadores dos dados
    if (modoVisualizacao === 'matriz') {
      dados.forEach((item) => {
        const marker = L.marker([item.coordenadas.lat, item.coordenadas.lng])
          .addTo(map)
          .bindPopup(`
            <div class="p-2">
              <h3 class="font-semibold text-purple-600">${item.nomePromotor}</h3>
              <p class="text-sm text-gray-600">${item.marca} - ${item.familia}</p>
              <p class="text-sm text-gray-500">${item.endereco}</p>
              <p class="text-xs text-gray-400">${item.horas}h planejadas</p>
            </div>
          `);
      });
    }

    // Adicionar rotas simuladas
    if (modoVisualizacao === 'simulacao' && rotasSelecionadas.length > 0) {
      rotasSelecionadas.forEach((rota) => {
        // Criar linha da rota
        const pontos = rota.pontos.map(p => [p.coordenadas.lat, p.coordenadas.lng] as [number, number]);
        
        L.polyline(pontos, {
          color: rota.cor,
          weight: 3,
          opacity: 0.8
        }).addTo(map);

        // Adicionar marcadores coloridos
        rota.pontos.forEach((ponto, index) => {
          const customIcon = L.divIcon({
            html: `<div style="background-color: ${rota.cor}; width: 25px; height: 25px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 12px;">${index + 1}</div>`,
            className: 'custom-marker',
            iconSize: [25, 25],
            iconAnchor: [12, 12]
          });

          L.marker([ponto.coordenadas.lat, ponto.coordenadas.lng], { icon: customIcon })
            .addTo(map)
            .bindPopup(`
              <div class="p-2">
                <h3 class="font-semibold" style="color: ${rota.cor}">${ponto.nomePromotor}</h3>
                <p class="text-sm text-gray-600">${ponto.marca} - ${ponto.familia}</p>
                <p class="text-sm text-gray-500">${ponto.endereco}</p>
                <p class="text-xs" style="color: ${rota.cor}">Parada ${index + 1} - Rota: ${rota.nome}</p>
              </div>
            `);
        });
      });

      // Ajustar visualização para mostrar todas as rotas
      if (rotasSelecionadas.length > 0) {
        const allPoints = rotasSelecionadas.flatMap(r => 
          r.pontos.map(p => [p.coordenadas.lat, p.coordenadas.lng] as [number, number])
        );
        if (allPoints.length > 0) {
          const group = new L.FeatureGroup(allPoints.map(point => L.marker(point)));
          map.fitBounds(group.getBounds().pad(0.1));
        }
      }
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [dados, rotasSelecionadas, modoVisualizacao]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.4 }}
    >
      <Card className="overflow-hidden">
        <CardContent className="p-0">
          <div className="relative">
            <div 
              ref={mapRef} 
              className="w-full h-[600px] rounded-lg"
              style={{ minHeight: '600px' }}
            />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-2">
                {modoVisualizacao === 'matriz' ? 'Rotas Matriz' : 'Rotas Simulação'}
              </h3>
              <div className="text-sm text-gray-600">
                {modoVisualizacao === 'matriz' 
                  ? `${dados.length} pontos disponíveis`
                  : `${rotasSelecionadas.length} rota(s) ativa(s)`
                }
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default MapaRoteirizacao;
