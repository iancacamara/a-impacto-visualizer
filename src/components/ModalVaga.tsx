
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Vaga, TipoVaga, StatusVaga, TipoSolicitacao } from '../types/vagas';

interface ModalVagaProps {
  vaga: Vaga | null;
  aberto: boolean;
  onFechar: () => void;
  onSalvar: (vaga: Vaga) => void;
}

const ModalVaga = ({ vaga, aberto, onFechar, onSalvar }: ModalVagaProps) => {
  const [formData, setFormData] = useState<Partial<Vaga>>({
    titulo: '',
    tipo: 'compartilhado-normal',
    descricao: '',
    regional: '',
    cidade: '',
    uf: '',
    marca: '',
    familia: '',
    horasSemanais: 44,
    salario: 0,
    status: 'solicitada',
    tipoSolicitacao: 'regional',
    solicitadoPor: '',
    dataAbertura: new Date().toISOString().split('T')[0],
    dataLimite: '',
    gestorResponsavel: '',
    coordenador: '',
    prioridade: 'media',
    candidatos: 0,
    observacoes: ''
  });

  useEffect(() => {
    if (vaga) {
      setFormData(vaga);
    } else {
      setFormData({
        titulo: '',
        tipo: 'compartilhado-normal',
        descricao: '',
        regional: '',
        cidade: '',
        uf: '',
        marca: '',
        familia: '',
        horasSemanais: 44,
        salario: 0,
        status: 'solicitada',
        tipoSolicitacao: 'regional',
        solicitadoPor: '',
        dataAbertura: new Date().toISOString().split('T')[0],
        dataLimite: '',
        gestorResponsavel: '',
        coordenador: '',
        prioridade: 'media',
        candidatos: 0,
        observacoes: ''
      });
    }
  }, [vaga]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSalvar(formData as Vaga);
  };

  const handleChange = (field: keyof Vaga, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={aberto} onOpenChange={onFechar}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {vaga ? 'Editar Vaga' : 'Nova Vaga'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título da Vaga *</Label>
              <Input
                id="titulo"
                value={formData.titulo}
                onChange={(e) => handleChange('titulo', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo de Vaga *</Label>
              <Select 
                value={formData.tipo} 
                onValueChange={(value) => handleChange('tipo', value as TipoVaga)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="compartilhado-normal">Compartilhado Normal</SelectItem>
                  <SelectItem value="expansao">Expansão (Freelance)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
              <Select 
                value={formData.status} 
                onValueChange={(value) => handleChange('status', value as StatusVaga)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="solicitada">Solicitada</SelectItem>
                  <SelectItem value="analise-regional">Análise Regional</SelectItem>
                  <SelectItem value="aprovacao-gerencia">Aprovação Gerência</SelectItem>
                  <SelectItem value="aprovacao-coordenacao">Aprovação Coordenação</SelectItem>
                  <SelectItem value="aprovada">Aprovada</SelectItem>
                  <SelectItem value="em-recrutamento">Em Recrutamento</SelectItem>
                  <SelectItem value="candidatos-triagem">Candidatos Triagem</SelectItem>
                  <SelectItem value="entrevistas">Entrevistas</SelectItem>
                  <SelectItem value="contratacao">Contratação</SelectItem>
                  <SelectItem value="finalizada">Finalizada</SelectItem>
                  <SelectItem value="cancelada">Cancelada</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prioridade">Prioridade *</Label>
              <Select 
                value={formData.prioridade} 
                onValueChange={(value) => handleChange('prioridade', value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="baixa">Baixa</SelectItem>
                  <SelectItem value="media">Média</SelectItem>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="urgente">Urgente</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="regional">Regional *</Label>
              <Input
                id="regional"
                value={formData.regional}
                onChange={(e) => handleChange('regional', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cidade">Cidade *</Label>
              <Input
                id="cidade"
                value={formData.cidade}
                onChange={(e) => handleChange('cidade', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="uf">UF *</Label>
              <Input
                id="uf"
                value={formData.uf}
                onChange={(e) => handleChange('uf', e.target.value)}
                maxLength={2}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="marca">Marca *</Label>
              <Input
                id="marca"
                value={formData.marca}
                onChange={(e) => handleChange('marca', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="familia">Família *</Label>
              <Input
                id="familia"
                value={formData.familia}
                onChange={(e) => handleChange('familia', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="horasSemanais">Horas Semanais *</Label>
              <Input
                id="horasSemanais"
                type="number"
                value={formData.horasSemanais}
                onChange={(e) => handleChange('horasSemanais', parseInt(e.target.value))}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="salario">Salário (R$)</Label>
              <Input
                id="salario"
                type="number"
                value={formData.salario}
                onChange={(e) => handleChange('salario', parseFloat(e.target.value))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipoSolicitacao">Tipo de Solicitação *</Label>
              <Select 
                value={formData.tipoSolicitacao} 
                onValueChange={(value) => handleChange('tipoSolicitacao', value as TipoSolicitacao)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="regional">Regional</SelectItem>
                  <SelectItem value="gerente">Gerente</SelectItem>
                  <SelectItem value="coordenacao">Coordenação</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="solicitadoPor">Solicitado Por *</Label>
              <Input
                id="solicitadoPor"
                value={formData.solicitadoPor}
                onChange={(e) => handleChange('solicitadoPor', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataLimite">Data Limite *</Label>
              <Input
                id="dataLimite"
                type="date"
                value={formData.dataLimite}
                onChange={(e) => handleChange('dataLimite', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="gestorResponsavel">Gestor Responsável *</Label>
              <Input
                id="gestorResponsavel"
                value={formData.gestorResponsavel}
                onChange={(e) => handleChange('gestorResponsavel', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="coordenador">Coordenador *</Label>
              <Input
                id="coordenador"
                value={formData.coordenador}
                onChange={(e) => handleChange('coordenador', e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="candidatos">Número de Candidatos</Label>
              <Input
                id="candidatos"
                type="number"
                value={formData.candidatos}
                onChange={(e) => handleChange('candidatos', parseInt(e.target.value))}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="descricao">Descrição da Vaga *</Label>
            <Textarea
              id="descricao"
              value={formData.descricao}
              onChange={(e) => handleChange('descricao', e.target.value)}
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="observacoes">Observações</Label>
            <Textarea
              id="observacoes"
              value={formData.observacoes}
              onChange={(e) => handleChange('observacoes', e.target.value)}
              rows={2}
            />
          </div>

          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={onFechar}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-purple-600 hover:bg-purple-700">
              {vaga ? 'Atualizar' : 'Criar'} Vaga
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModalVaga;
