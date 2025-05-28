
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Store, Package, TrendingDown } from "lucide-react";

interface StatsCardsProps {
  totalPromotores: number;
  registraram: number;
  naoRegistraram: number;
  lojasAfetadas: number;
  marcasAfetadasCount: number;
}

const StatsCards = ({ 
  totalPromotores, 
  registraram, 
  naoRegistraram, 
  lojasAfetadas, 
  marcasAfetadasCount 
}: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="bg-gradient-to-br from-green-500 to-green-600 text-white shadow-xl border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium opacity-90">Registraram Presença</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{registraram}</p>
              <p className="text-sm opacity-90">de {totalPromotores} promotores</p>
            </div>
            <Users className="h-8 w-8 opacity-80" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-red-500 to-red-600 text-white shadow-xl border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium opacity-90">Não Registraram</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{naoRegistraram}</p>
              <p className="text-sm opacity-90">ausências detectadas</p>
            </div>
            <TrendingDown className="h-8 w-8 opacity-80" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-xl border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium opacity-90">Lojas Afetadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{lojasAfetadas}</p>
              <p className="text-sm opacity-90">pontos de venda</p>
            </div>
            <Store className="h-8 w-8 opacity-80" />
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-xl border-0">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium opacity-90">Marcas Afetadas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold">{marcasAfetadasCount}</p>
              <p className="text-sm opacity-90">marcas impactadas</p>
            </div>
            <Package className="h-8 w-8 opacity-80" />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
