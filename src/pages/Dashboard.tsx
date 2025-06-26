
import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { BarChart3, Users, Calendar, MapPin, Briefcase } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const modules = [
    {
      title: "Ausências",
      description: "Controle de faltas e ausências dos promotores",
      icon: Users,
      path: "/ausencias",
      color: "from-blue-500 to-blue-600"
    },
    {
      title: "Balanceamento",
      description: "Análise de carga horária e distribuição de trabalho",
      icon: BarChart3,
      path: "/balanceamento",
      color: "from-green-500 to-green-600"
    },
    {
      title: "Roteirização",
      description: "Otimização de rotas e planejamento de visitas",
      icon: MapPin,
      path: "/roteirizacao",
      color: "from-purple-500 to-purple-600"
    },
    {
      title: "Vagas",
      description: "Gestão de oportunidades e posições abertas",
      icon: Briefcase,
      path: "/vagas",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <motion.header 
        className="bg-white shadow-sm relative overflow-hidden border-b border-gray-100"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500"></div>
        
        <div className="container mx-auto px-6 py-8">
          <motion.div 
            className="flex items-center space-x-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative">
              <img 
                src="/lovable-uploads/9a67413b-7982-4d25-9367-ce54c809f137.png" 
                alt="GMPromo" 
                className="h-16 w-auto drop-shadow-lg"
              />
            </div>
            <div>
              <motion.h1 
                className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Central de Operações
              </motion.h1>
              <motion.p 
                className="text-gray-600 text-lg font-medium mt-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                PCP + Inteligência - Sistema Avançado de Controle e Gestão
              </motion.p>
            </div>
          </motion.div>
        </div>
      </motion.header>

      <main className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Escolha o módulo que deseja acessar
          </h2>
          <p className="text-gray-600 text-lg">
            Gerencie todos os aspectos operacionais do seu departamento
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {modules.map((module, index) => (
            <motion.div
              key={module.title}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
            >
              <Card 
                className="h-full cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 border-0 bg-white/80 backdrop-blur-sm"
                onClick={() => navigate(module.path)}
              >
                <CardContent className="p-8 text-center h-full flex flex-col justify-between">
                  <div>
                    <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${module.color} flex items-center justify-center shadow-lg`}>
                      <module.icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-800 mb-3">
                      {module.title}
                    </h3>
                    <p className="text-gray-600">
                      {module.description}
                    </p>
                  </div>
                  <div className={`mt-6 px-4 py-2 rounded-lg bg-gradient-to-r ${module.color} text-white font-medium opacity-80 hover:opacity-100 transition-opacity`}>
                    Acessar módulo
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
