
import React, { useState } from 'react';
import { motion } from "framer-motion";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Route, MapPin, Zap, Eye, Plus } from "lucide-react";
import { RoteirizacaoData, RotaSimulada } from '../types/roteirizacao';

interface FilterBarRoteirizacaoProps {
  dados: RoteirizacaoData[];
  onCreateRota: (rota: RotaSimulada) => void;
  modoVisualizacao: 'matriz' | 'simulacao';
  setModoVisualizacao: (modo: 'matriz' | 'simulacao') => void;
}

const FilterBarRoteirizacao = ({ dados, onCreateRota, modoVisualizacao, setModoVisualizacao }: FilterBarRoteirizacaoProps) => {
  const [selectedUF, setSelectedUF] = useState("");
  const [selectedCidade, setSelectedCidade] = useState("");
  const [nomeRota, setNomeRota] = useState("");

  const ufs = [...new Set(dados.map(d => d.uf))].sort();
  const cidades = [...new Set(dados.filter(d => !selectedUF || d.uf === selectedUF).map(d => d.cidade))].sort();

  const criarRotaAutomatica = () => {
    const dadosFiltrados = dados.filter(d => 
      (!selectedUF || d.uf === selectedUF) && 
      (!selectedCidade || d.cidade === selectedCidade)
    );

    if (dadosFiltrados.length === 0) return;

    const cores = ['#8B5CF6', '#F59E0B', '#EF4444', '#10B981', '#3B82F6'];
    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];

    const novaRota: RotaSimulada = {
      id: Date.now().toString(),
      nome: nomeRota || `Rota ${selectedCidade || selectedUF || 'Automática'}`,
      pontos: dadosFiltrados.slice(0, 5), // Limite de 5 pontos
      distanciaTotal: Math.floor(Math.random() * 50) + 20, // Simulado
      tempoEstimado: Math.floor(Math.random() * 120) + 30, // Simulado
      cor: corAleatoria,
      otimizada: true
    };

    onCreateRota(novaRota);
    setNomeRota("");
  };

  return (
    <motion.div
      className="bg-white border-b border-gray-200 px-6 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Route className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-800">Criação de Rotas</h3>
          </div>
          
          <div className="flex items-center gap-3">
            <Button
              variant={modoVisualizacao === 'matriz' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setModoVisualizacao('matriz')}
              className="gap-2"
            >
              <Eye className="w-4 h-4" />
              Matriz
            </Button>
            <Button
              variant={modoVisualizacao === 'simulacao' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setModoVisualizacao('simulacao')}
              className="gap-2"
            >
              <MapPin className="w-4 h-4" />
              Simulação
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Input
            placeholder="Nome da rota..."
            value={nomeRota}
            onChange={(e) => setNomeRota(e.target.value)}
            className="border-gray-300 focus:border-purple-500 focus:ring-purple-500"
          />

          <Select value={selectedUF} onValueChange={setSelectedUF}>
            <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
              <SelectValue placeholder="Selecionar UF" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos os UFs</SelectItem>
              {ufs.map(uf => (
                <SelectItem key={uf} value={uf}>{uf}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedCidade} onValueChange={setSelectedCidade}>
            <SelectTrigger className="border-gray-300 focus:border-purple-500 focus:ring-purple-500">
              <SelectValue placeholder="Selecionar Cidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todas as Cidades</SelectItem>
              {cidades.map(cidade => (
                <SelectItem key={cidade} value={cidade}>{cidade}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button
            onClick={criarRotaAutomatica}
            className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
          >
            <Plus className="w-4 h-4" />
            Criar Rota
          </Button>

          <Button
            variant="outline"
            className="border-amber-500 text-amber-600 hover:bg-amber-50 gap-2"
          >
            <Zap className="w-4 h-4" />
            Otimizar
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBarRoteirizacao;
