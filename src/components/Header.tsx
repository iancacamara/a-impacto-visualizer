
import React from 'react';
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

interface HeaderProps {
  lastUpdate: Date;
  onClearFilters?: () => void;
}

const Header = ({ lastUpdate, onClearFilters }: HeaderProps) => {
  return (
    <motion.header 
      className="bg-white shadow-sm relative overflow-hidden border-b border-gray-100"
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-teal-500 to-cyan-500"></div>
      
      <div className="container mx-auto px-6 py-6 relative">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center space-x-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <img 
                src="/lovable-uploads/1419f815-c548-4d18-914c-14b8e01040e1.png" 
                alt="Supera Holdings" 
                className="h-16 w-auto drop-shadow-lg"
              />
            </div>
            <div>
              <motion.h1 
                className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                PresenceControl Pro
              </motion.h1>
              <motion.p 
                className="text-gray-600 text-sm font-medium mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Sistema Avançado de Controle de Presença e Ausência
              </motion.p>
            </div>
          </motion.div>
          
          <motion.div 
            className="text-right"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <RefreshCw className="w-4 h-4 text-gray-600" />
                <span className="text-sm text-gray-600 font-medium">Última Atualização:</span>
              </div>
              <div className="text-lg font-mono text-gray-800">
                {lastUpdate.toLocaleDateString('pt-BR')} {lastUpdate.toLocaleTimeString('pt-BR')}
              </div>
            </div>
            {onClearFilters && (
              <motion.button
                onClick={onClearFilters}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 font-medium"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Limpar Filtros
              </motion.button>
            )}
          </motion.div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;
