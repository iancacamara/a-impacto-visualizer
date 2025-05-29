
import React from 'react';

interface HeaderProps {
  lastUpdate: Date;
  onClearFilters?: () => void;
}

const Header = ({ lastUpdate, onClearFilters }: HeaderProps) => {
  return (
    <header className="bg-blue-900 text-white shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <img 
              src="/lovable-uploads/1419f815-c548-4d18-914c-14b8e01040e1.png" 
              alt="Supera Holdings" 
              className="h-12 w-auto"
            />
            <div>
              <h1 className="text-2xl font-bold">PresenceControl Pro</h1>
              <p className="text-sm opacity-90">Sistema de Controle de Presença e Ausência</p>
            </div>
          </div>
          <div className="text-right">
            <div className="mb-2">
              <span className="text-sm opacity-90">Atualizado em:</span>
              <br />
              <span className="text-lg font-mono">
                {lastUpdate.toLocaleDateString('pt-BR')} {lastUpdate.toLocaleTimeString('pt-BR')}
              </span>
            </div>
            {onClearFilters && (
              <button
                onClick={onClearFilters}
                className="text-sm underline opacity-90 hover:opacity-100 italic"
              >
                Limpar filtros
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
