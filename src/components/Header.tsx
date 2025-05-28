
import React from 'react';

const Header = () => {
  return (
    <header className="bg-white shadow-lg border-b border-slate-200">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/1419f815-c548-4d18-914c-14b8e01040e1.png" 
              alt="Supera Holdings" 
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold text-slate-800">PresenceControl Pro</h1>
              <p className="text-sm text-slate-600">Sistema de Controle de Presença e Ausência</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-slate-600">Relatório Diário</p>
            <p className="text-lg font-semibold text-slate-800">{new Date().toLocaleDateString('pt-BR')}</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
