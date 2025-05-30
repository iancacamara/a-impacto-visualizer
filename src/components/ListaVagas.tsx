
import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Users, MapPin, Calendar, Star } from "lucide-react";
import { Vaga } from '../types/vagas';

interface ListaVagasProps {
  vagas: Vaga[];
  onEditarVaga: (vaga: Vaga) => void;
}

const ListaVagas = ({ vagas, onEditarVaga }: ListaVagasProps) => {
  const getStatusColor = (status: string) => {
    const colors = {
      'solicitada': 'bg-gray-100 text-gray-800',
      'analise-regional': 'bg-blue-100 text-blue-800',
      'aprovacao-gerencia': 'bg-yellow-100 text-yellow-800',
      'aprovacao-coordenacao': 'bg-orange-100 text-orange-800',
      'aprovada': 'bg-green-100 text-green-800',
      'em-recrutamento': 'bg-purple-100 text-purple-800',
      'candidatos-triagem': 'bg-indigo-100 text-indigo-800',
      'entrevistas': 'bg-pink-100 text-pink-800',
      'contratacao': 'bg-emerald-100 text-emerald-800',
      'finalizada': 'bg-green-200 text-green-900',
      'cancelada': 'bg-red-100 text-red-800'
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  };

  const getPrioridadeColor = (prioridade: string) => {
    const colors = {
      'baixa': 'bg-gray-100 text-gray-600',
      'media': 'bg-blue-100 text-blue-600',
      'alta': 'bg-orange-100 text-orange-600',
      'urgente': 'bg-red-100 text-red-600'
    };
    return colors[prioridade as keyof typeof colors] || 'bg-gray-100 text-gray-600';
  };

  const getTipoLabel = (tipo: string) => {
    return tipo === 'compartilhado-normal' ? 'Compartilhado Normal' : 'Expansão (Freelance)';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Lista de Vagas</h2>
        <span className="text-sm text-gray-600">{vagas.length} vaga(s) encontrada(s)</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {vagas.map((vaga, index) => (
          <motion.div
            key={vaga.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-purple-500">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <CardTitle className="text-lg font-semibold text-gray-800 line-clamp-2">
                    {vaga.titulo}
                  </CardTitle>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEditarVaga(vaga)}
                    className="text-gray-500 hover:text-purple-600"
                  >
                    <Edit className="w-4 h-4" />
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-2 mt-2">
                  <Badge className={getStatusColor(vaga.status)}>
                    {vaga.status.replace('-', ' ').toUpperCase()}
                  </Badge>
                  <Badge className={getPrioridadeColor(vaga.prioridade)}>
                    <Star className="w-3 h-3 mr-1" />
                    {vaga.prioridade.toUpperCase()}
                  </Badge>
                </div>
              </CardHeader>

              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{vaga.cidade}, {vaga.uf} - {vaga.regional}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{getTipoLabel(vaga.tipo)} - {vaga.marca}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>Limite: {new Date(vaga.dataLimite).toLocaleDateString('pt-BR')}</span>
                </div>

                <div className="text-sm text-gray-700">
                  <strong>Horas:</strong> {vaga.horasSemanais}h/semana
                  {vaga.salario && (
                    <>
                      <br />
                      <strong>Salário:</strong> R$ {vaga.salario.toLocaleString('pt-BR')}
                    </>
                  )}
                </div>

                <div className="text-sm text-gray-600">
                  <strong>Candidatos:</strong> {vaga.candidatos || 0}
                </div>

                <div className="text-sm text-gray-600">
                  <strong>Solicitado por:</strong> {vaga.solicitadoPor}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {vagas.length === 0 && (
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">Nenhuma vaga encontrada</h3>
          <p className="text-gray-500">Tente ajustar os filtros ou criar uma nova vaga.</p>
        </div>
      )}
    </div>
  );
};

export default ListaVagas;
