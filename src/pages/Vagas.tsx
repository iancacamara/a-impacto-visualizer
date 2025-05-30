
import React, { useState } from "react";
import Header from "../components/Header";
import FilterBarVagas from "../components/FilterBarVagas";
import EstatisticasVagas from "../components/EstatisticasVagas";
import ListaVagas from "../components/ListaVagas";
import ModalVaga from "../components/ModalVaga";
import { useNavigate } from "react-router-dom";
import { vagasData } from "../data/vagasData";
import { Vaga, TipoVaga } from "../types/vagas";

const Vagas = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [dados, setDados] = useState<Vaga[]>(vagasData);
  const [tipoSelecionado, setTipoSelecionado] = useState<TipoVaga | 'todas'>('todas');
  const [vagaSelecionada, setVagaSelecionada] = useState<Vaga | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  const handleDateChange = (date: string) => {
    setSelectedDate(date);
  };

  const resetAllFilters = () => {
    setTipoSelecionado('todas');
  };

  const vagasFiltradas = dados.filter(vaga => {
    if (tipoSelecionado === 'todas') return true;
    return vaga.tipo === tipoSelecionado;
  });

  const handleEditarVaga = (vaga: Vaga) => {
    setVagaSelecionada(vaga);
    setModalAberto(true);
  };

  const handleSalvarVaga = (vaga: Vaga) => {
    if (vagaSelecionada) {
      setDados(dados.map(v => v.id === vaga.id ? vaga : v));
    } else {
      setDados([...dados, { ...vaga, id: Date.now().toString() }]);
    }
    setModalAberto(false);
    setVagaSelecionada(null);
  };

  return (
    <div className="min-h-screen bg-white">
      <Header 
        lastUpdate={lastUpdate} 
        onClearFilters={resetAllFilters}
        selectedDate={selectedDate}
        onDateChange={handleDateChange}
        title="Central de Vagas"
        subtitle="PCP + Inteligência - Gestão Completa de Vagas e Recrutamento"
        showBackButton={true}
        onBack={() => navigate('/')}
      />
      
      <FilterBarVagas 
        tipoSelecionado={tipoSelecionado}
        setTipoSelecionado={setTipoSelecionado}
        onNovaVaga={() => {
          setVagaSelecionada(null);
          setModalAberto(true);
        }}
      />

      <div className="container mx-auto px-6 py-8">
        <EstatisticasVagas dados={vagasFiltradas} />
        
        <div className="mt-8">
          <ListaVagas 
            vagas={vagasFiltradas}
            onEditarVaga={handleEditarVaga}
          />
        </div>
      </div>

      <ModalVaga
        vaga={vagaSelecionada}
        aberto={modalAberto}
        onFechar={() => {
          setModalAberto(false);
          setVagaSelecionada(null);
        }}
        onSalvar={handleSalvarVaga}
      />
    </div>
  );
};

export default Vagas;
