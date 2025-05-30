
import React from 'react';
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Briefcase, Users, TrendingUp, Plus } from "lucide-react";
import { TipoVaga } from '../types/vagas';

interface FilterBarVagasProps {
  tipoSelecionado: TipoVaga | 'todas';
  setTipoSelecionado: (tipo: TipoVaga | 'todas') => void;
  onNovaVaga: () => void;
}

const FilterBarVagas = ({ tipoSelecionado, setTipoSelecionado, onNovaVaga }: FilterBarVagasProps) => {
  return (
    <motion.div
      className="bg-white border-b border-gray-200 px-6 py-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
    >
      <div className="container mx-auto">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-800">Gestão de Vagas</h3>
          </div>
          
          <Button
            onClick={onNovaVaga}
            className="bg-purple-600 hover:bg-purple-700 text-white gap-2"
          >
            <Plus className="w-4 h-4" />
            Nova Vaga
          </Button>
        </div>
        
        <div className="flex items-center gap-4 mt-4">
          <Button
            variant={tipoSelecionado === 'todas' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTipoSelecionado('todas')}
            className="gap-2"
          >
            <Briefcase className="w-4 h-4" />
            Todas as Vagas
          </Button>
          
          <Button
            variant={tipoSelecionado === 'compartilhado-normal' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTipoSelecionado('compartilhado-normal')}
            className="gap-2"
          >
            <Users className="w-4 h-4" />
            Compartilhado Normal
          </Button>
          
          <Button
            variant={tipoSelecionado === 'expansao' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setTipoSelecionado('expansao')}
            className="gap-2"
          >
            <TrendingUp className="w-4 h-4" />
            Expansão (Freelance)
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default FilterBarVagas;
