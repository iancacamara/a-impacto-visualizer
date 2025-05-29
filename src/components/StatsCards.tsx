
import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { DashboardStats } from '../types/promoter';

interface StatsCardsProps {
  stats: DashboardStats;
}

const StatsCards = ({ stats }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <Card className="bg-blue-900 text-white border-0">
        <CardContent className="p-6 text-center">
          <div className="text-4xl font-bold mb-2">{stats.promotoresAusentes}</div>
          <div className="text-lg font-medium">Promotores Ausentes</div>
        </CardContent>
      </Card>

      <Card className="bg-blue-900 text-white border-0">
        <CardContent className="p-6 text-center">
          <div className="text-4xl font-bold mb-2">{stats.atendimentosImpactados}</div>
          <div className="text-lg font-medium">Atendimentos Impactados</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
