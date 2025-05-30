
import React, { useState } from "react";
import Header from "../components/Header";
import FilterBarRoteirizacao from "../components/FilterBarRoteirizacao";
import MapaRoteirizacao from "../components/MapaRoteirizacao";
import PainelRotas from "../components/PainelRotas";
import EstatisticasRoteirizacao from "../components/EstatisticasRoteirizacao";
import { useNavigate } from "react-router-dom";
import { roteirizacaoData } from "../data/roteirizacaoData";
import { RoteirizacaoData, RotaSimulada } from "../types/roteirizacao";

const Roteirizacao = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [dados, setDados] = useState<RoteirizacaoData[]>(roteirizacaoData);
  const [rotasSelecionadas, setRotasSelecionadas] = useState<RotaSimulada[]>([]);
  const [modoVisualizacao, setModoVisualizacao] = useState<'matriz' | 'simulacao'>('matriz');

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const handleCreateRota = (rota: RotaSimulada) => {
    setRotasSelecionadas([...rotasSelecionadas, rota]);
    setModoVisualizacao('simulacao');
  };

  const resetAllFilters = () => {
    setRotasSelecionadas([]);
    setModoVisualizacao('matriz');
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        lastUpdate={lastUpdate} 
        onClearFilters={resetAllFilters}
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        title="Roteirização Inteligente"
        subtitle="Criação e Simulação de Rotas Otimizadas"
        showBackButton={true}
        onBack={() => navigate('/')}
      />
      
      <FilterBarRoteirizacao 
        dados={dados}
        onCreateRota={handleCreateRota}
        modoVisualizacao={modoVisualizacao}
        setModoVisualizacao={setModoVisualizacao}
      />

      <div className="container mx-auto px-6 py-8">
        <EstatisticasRoteirizacao dados={dados} rotasSelecionadas={rotasSelecionadas} />
        
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2">
            <MapaRoteirizacao 
              dados={dados}
              rotasSelecionadas={rotasSelecionadas}
              modoVisualizacao={modoVisualizacao}
            />
          </div>
          <div className="xl:col-span-1">
            <PainelRotas 
              dados={dados}
              rotasSelecionadas={rotasSelecionadas}
              onRemoveRota={(index) => {
                const novasRotas = [...rotasSelecionadas];
                novasRotas.splice(index, 1);
                setRotasSelecionadas(novasRotas);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roteirizacao;
