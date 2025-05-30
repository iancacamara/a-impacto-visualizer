import React from 'react';
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Users, BarChart3, Calendar, MapPin, Clock, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      title: "Balanceamento Operacional",
      description: "Visualize horas excedentes, ociosas e performance dos promotores",
      icon: BarChart3,
      gradient: "from-blue-500 to-cyan-500",
      route: "/balanceamento",
      stats: "447 Promotores"
    },
    {
      title: "Controle de Ausências", 
      description: "Monitore presenças, ausências e impactos nos atendimentos",
      icon: Users,
      gradient: "from-pink-500 to-purple-500",
      route: "/ausencias",
      stats: "7 Ausentes hoje"
    },
    {
      title: "Roteirização Inteligente",
      description: "Crie e otimize rotas para seus promotores com mapas interativos",
      icon: MapPin,
      gradient: "from-emerald-500 to-teal-500",
      route: "/roteirizacao",
      stats: "12 Rotas ativas"
    },
    {
      title: "Agenda & Planejamento",
      description: "Gerencie cronogramas e planejamento operacional",
      icon: Calendar,
      gradient: "from-amber-500 to-orange-500",
      route: "/agenda",
      stats: "Em breve"
    }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: { opacity: 1, y: 0, scale: 1 },
    hover: { scale: 1.02, y: -5 }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <motion.header 
        className="bg-white shadow-sm relative overflow-hidden border-b border-gray-100"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 via-purple-500 to-violet-500"></div>
        
        <div className="container mx-auto px-6 py-6 relative">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img 
                src="/lovable-uploads/1419f815-c548-4d18-914c-14b8e01040e1.png" 
                alt="Supera Holdings" 
                className="h-16 w-auto drop-shadow-lg"
              />
            </div>
            <div>
              <motion.h1 
                className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
              >
                Central de Operações
              </motion.h1>
              <motion.p 
                className="text-gray-600 text-sm font-medium mt-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                Sistema Integrado de Gestão Departamental
              </motion.p>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Escolha o módulo que deseja acessar
          </h2>
          <p className="text-gray-600">
            Gerencie todos os aspectos operacionais do seu departamento
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {menuItems.map((item, index) => (
            <motion.div
              key={item.title}
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              whileHover="hover"
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card 
                className="relative overflow-hidden border-0 bg-gradient-to-br from-gray-50 to-gray-100 hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(item.route)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/20 rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-500"></div>
                
                <CardContent className="relative p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className={`p-4 bg-gradient-to-br ${item.gradient} rounded-2xl text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                      <item.icon className="w-8 h-8" />
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-gray-500 font-medium">Status</div>
                      <div className="text-lg font-bold text-gray-700">{item.stats}</div>
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6">
                    {item.description}
                  </p>
                  
                  <div className="flex items-center text-sm font-medium text-gray-500 group-hover:text-gray-700 transition-colors">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Acessar módulo
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          {[
            { label: "Total Promotores", value: "447", icon: Users },
            { label: "Lojas Ativas", value: "285", icon: MapPin },
            { label: "Horas Trabalhadas", value: "3.2K", icon: Clock },
            { label: "Performance", value: "98.5%", icon: TrendingUp }
          ].map((stat, index) => (
            <Card key={stat.label} className="bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
              <CardContent className="p-6 text-center">
                <stat.icon className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
