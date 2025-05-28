
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Users, Store, Package, Clock, TrendingUp, TrendingDown, Filter } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts';

const Index = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("desc");
  const [filterType, setFilterType] = useState("all");

  // Dados simulados
  const promotorData = [
    { id: 1, nome: "João Silva", tipo: "promotor", status: "registrou", loja: "Shopping Center Norte", marca: "Samsung", categoria: "Eletrônicos", horasRegistradas: 8, horasPlanejadas: 8, data: "2024-01-28" },
    { id: 2, nome: "Maria Santos", tipo: "supervisor", status: "não registrou", loja: "Shopping Ibirapuera", marca: "Apple", categoria: "Eletrônicos", horasRegistradas: 0, horasPlanejadas: 8, data: "2024-01-28" },
    { id: 3, nome: "Carlos Oliveira", tipo: "parttime4", status: "registrou", loja: "Shopping Morumbi", marca: "LG", categoria: "Eletrônicos", horasRegistradas: 4, horasPlanejadas: 4, data: "2024-01-28" },
    { id: 4, nome: "Ana Costa", tipo: "lider", status: "registrou", loja: "Shopping Vila Olímpia", marca: "Sony", categoria: "Eletrônicos", horasRegistradas: 8, horasPlanejadas: 8, data: "2024-01-28" },
    { id: 5, nome: "Pedro Almeida", tipo: "parttime6", status: "não registrou", loja: "Shopping Eldorado", marca: "Motorola", categoria: "Eletrônicos", horasRegistradas: 0, horasPlanejadas: 6, data: "2024-01-28" },
    { id: 6, nome: "Luciana Ferreira", tipo: "promotorexpress", status: "registrou", loja: "Shopping Anália Franco", marca: "Xiaomi", categoria: "Eletrônicos", horasRegistradas: 6, horasPlanejadas: 6, data: "2024-01-28" },
  ];

  const statusData = [
    { name: "Registraram", value: 4, color: "#10B981" },
    { name: "Não Registraram", value: 2, color: "#EF4444" }
  ];

  const tipoData = [
    { tipo: "Promotor", registrou: 1, naoRegistrou: 0 },
    { tipo: "Supervisor", registrou: 0, naoRegistrou: 1 },
    { tipo: "Part-time 4h", registrou: 1, naoRegistrou: 0 },
    { tipo: "Líder", registrou: 1, naoRegistrou: 0 },
    { tipo: "Part-time 6h", registrou: 0, naoRegistrou: 1 },
    { tipo: "Promotor Express", registrou: 1, naoRegistrou: 0 },
  ];

  const marcasAfetadas = [
    { marca: "Samsung", horas: 8, afetada: false },
    { marca: "Apple", horas: 8, afetada: true },
    { marca: "LG", horas: 4, afetada: false },
    { marca: "Sony", horas: 8, afetada: false },
    { marca: "Motorola", horas: 6, afetada: true },
    { marca: "Xiaomi", horas: 6, afetada: false },
  ];

  const filteredData = promotorData
    .filter(item => 
      item.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterType === "all" || item.tipo === filterType)
    )
    .sort((a, b) => 
      sortOrder === "desc" 
        ? b.horasRegistradas - a.horasRegistradas 
        : a.horasRegistradas - b.horasRegistradas
    );

  const totalPromotores = promotorData.length;
  const registraram = promotorData.filter(p => p.status === "registrou").length;
  const naoRegistraram = promotorData.filter(p => p.status === "não registrou").length;
  const lojasAfetadas = new Set(promotorData.filter(p => p.status === "não registrou").map(p => p.loja)).size;
  const marcasAfetadasCount = new Set(promotorData.filter(p => p.status === "não registrou").map(p => p.marca)).size;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
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

      <div className="container mx-auto px-6 py-8">
        {/* Cards de Status */}
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

        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-600" />
                Status dos Promotores
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-4">
                {statusData.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-sm text-slate-600">{item.name}: {item.value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                Registro por Tipo de Contrato
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={tipoData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="tipo" fontSize={10} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="registrou" fill="#10B981" name="Registraram" />
                  <Bar dataKey="naoRegistrou" fill="#EF4444" name="Não Registraram" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
                <Package className="h-5 w-5 text-purple-600" />
                Impacto por Marca (Horas Perdidas)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={marcasAfetadas}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="marca" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="horas" 
                    stroke="#8B5CF6" 
                    fill="url(#colorGradient)" 
                    fillOpacity={0.7}
                  />
                  <defs>
                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Filtros e Tabela */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Filter className="h-5 w-5 text-blue-600" />
              Dados Detalhados dos Promotores
            </CardTitle>
            <div className="flex flex-col sm:flex-row gap-4 mt-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Buscar por nome..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Filtrar por tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os tipos</SelectItem>
                  <SelectItem value="promotor">Promotor</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                  <SelectItem value="parttime4">Part-time 4h</SelectItem>
                  <SelectItem value="parttime6">Part-time 6h</SelectItem>
                  <SelectItem value="lider">Líder</SelectItem>
                  <SelectItem value="promotorexpress">Promotor Express</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                variant="outline" 
                onClick={() => setSortOrder(sortOrder === "desc" ? "asc" : "desc")}
                className="w-full sm:w-auto"
              >
                {sortOrder === "desc" ? "Maior → Menor" : "Menor → Maior"}
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="text-left p-3 font-semibold text-slate-700">Data</th>
                    <th className="text-left p-3 font-semibold text-slate-700">Nome</th>
                    <th className="text-left p-3 font-semibold text-slate-700">Tipo</th>
                    <th className="text-left p-3 font-semibold text-slate-700">Status</th>
                    <th className="text-left p-3 font-semibold text-slate-700">Loja</th>
                    <th className="text-left p-3 font-semibold text-slate-700">Marca</th>
                    <th className="text-left p-3 font-semibold text-slate-700">Horas Reg.</th>
                    <th className="text-left p-3 font-semibold text-slate-700">Horas Plan.</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                      <td className="p-3">{new Date(item.data).toLocaleDateString('pt-BR')}</td>
                      <td className="p-3 font-medium">{item.nome}</td>
                      <td className="p-3">
                        <Badge variant="outline" className="text-xs">
                          {item.tipo}
                        </Badge>
                      </td>
                      <td className="p-3">
                        <Badge 
                          className={`${
                            item.status === "registrou" 
                              ? "bg-green-100 text-green-800 hover:bg-green-100" 
                              : "bg-red-100 text-red-800 hover:bg-red-100"
                          }`}
                        >
                          {item.status === "registrou" ? "✓ Registrou" : "✗ Não Registrou"}
                        </Badge>
                      </td>
                      <td className="p-3">{item.loja}</td>
                      <td className="p-3">{item.marca}</td>
                      <td className="p-3 font-mono">
                        <span className={item.horasRegistradas < item.horasPlanejadas ? "text-red-600" : "text-green-600"}>
                          {item.horasRegistradas}h
                        </span>
                      </td>
                      <td className="p-3 font-mono">{item.horasPlanejadas}h</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
