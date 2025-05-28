
import { useState, useMemo } from "react";
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
  
  // Novos filtros estilo Power BI
  const [selectedRegional, setSelectedRegional] = useState("all");
  const [selectedLoja, setSelectedLoja] = useState("all");
  const [selectedMarca, setSelectedMarca] = useState("all");
  const [selectedCategoria, setSelectedCategoria] = useState("all");
  const [selectedSupervisor, setSelectedSupervisor] = useState("all");

  // Dados simulados expandidos com mais informações
  const promotorData = [
    { id: 1, nome: "João Silva", tipo: "promotor", status: "registrou", loja: "Shopping Center Norte", marca: "Samsung", categoria: "Eletrônicos", horasRegistradas: 8, horasPlanejadas: 8, data: "2024-01-28", regional: "Norte", supervisor: "Roberto Santos" },
    { id: 2, nome: "Maria Santos", tipo: "supervisor", status: "não registrou", loja: "Shopping Ibirapuera", marca: "Apple", categoria: "Eletrônicos", horasRegistradas: 0, horasPlanejadas: 8, data: "2024-01-28", regional: "Sul", supervisor: "Ana Costa" },
    { id: 3, nome: "Carlos Oliveira", tipo: "parttime4", status: "registrou", loja: "Shopping Morumbi", marca: "LG", categoria: "Eletrônicos", horasRegistradas: 4, horasPlanejadas: 4, data: "2024-01-28", regional: "Sul", supervisor: "Roberto Santos" },
    { id: 4, nome: "Ana Costa", tipo: "lider", status: "registrou", loja: "Shopping Vila Olímpia", marca: "Sony", categoria: "Eletrônicos", horasRegistradas: 8, horasPlanejadas: 8, data: "2024-01-28", regional: "Centro", supervisor: "Mariana Silva" },
    { id: 5, nome: "Pedro Almeida", tipo: "parttime6", status: "não registrou", loja: "Shopping Eldorado", marca: "Motorola", categoria: "Eletrônicos", horasRegistradas: 0, horasPlanejadas: 6, data: "2024-01-28", regional: "Oeste", supervisor: "Roberto Santos" },
    { id: 6, nome: "Luciana Ferreira", tipo: "promotorexpress", status: "registrou", loja: "Shopping Anália Franco", marca: "Xiaomi", categoria: "Eletrônicos", horasRegistradas: 6, horasPlanejadas: 6, data: "2024-01-28", regional: "Leste", supervisor: "Ana Costa" },
    { id: 7, nome: "Ricardo Mendes", tipo: "promotor", status: "não registrou", loja: "Shopping Iguatemi", marca: "Aurora", categoria: "Perecíveis", horasRegistradas: 0, horasPlanejadas: 8, data: "2024-01-28", regional: "Norte", supervisor: "Juliano Pereira" },
    { id: 8, nome: "Fernanda Lima", tipo: "parttime4", status: "registrou", loja: "Shopping Aricanduva", marca: "Seara", categoria: "Perecíveis", horasRegistradas: 4, horasPlanejadas: 4, data: "2024-01-28", regional: "Leste", supervisor: "Mariana Silva" },
    { id: 9, nome: "Bruno Costa", tipo: "supervisor", status: "registrou", loja: "Shopping Continental", marca: "Perdigão", categoria: "Perecíveis", horasRegistradas: 8, horasPlanejadas: 8, data: "2024-01-28", regional: "Centro", supervisor: "Roberto Santos" },
    { id: 10, nome: "Patricia Oliveira", tipo: "parttime6", status: "não registrou", loja: "Shopping Tatuapé", marca: "Coca-Cola", categoria: "Bebidas", horasRegistradas: 0, horasPlanejadas: 6, data: "2024-01-28", regional: "Leste", supervisor: "Ana Costa" },
  ];

  // Extrair valores únicos para os filtros
  const regionais = [...new Set(promotorData.map(p => p.regional))].sort();
  const lojas = [...new Set(promotorData.map(p => p.loja))].sort();
  const marcas = [...new Set(promotorData.map(p => p.marca))].sort();
  const categorias = [...new Set(promotorData.map(p => p.categoria))].sort();
  const supervisores = [...new Set(promotorData.map(p => p.supervisor))].sort();

  // Dados filtrados com base em todos os filtros
  const filteredData = useMemo(() => {
    return promotorData.filter(item => {
      const matchesSearch = item.nome.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === "all" || item.tipo === filterType;
      const matchesRegional = selectedRegional === "all" || item.regional === selectedRegional;
      const matchesLoja = selectedLoja === "all" || item.loja === selectedLoja;
      const matchesMarca = selectedMarca === "all" || item.marca === selectedMarca;
      const matchesCategoria = selectedCategoria === "all" || item.categoria === selectedCategoria;
      const matchesSupervisor = selectedSupervisor === "all" || item.supervisor === selectedSupervisor;
      
      return matchesSearch && matchesType && matchesRegional && matchesLoja && matchesMarca && matchesCategoria && matchesSupervisor;
    }).sort((a, b) => 
      sortOrder === "desc" 
        ? b.horasRegistradas - a.horasRegistradas 
        : a.horasRegistradas - b.horasRegistradas
    );
  }, [searchTerm, filterType, selectedRegional, selectedLoja, selectedMarca, selectedCategoria, selectedSupervisor, sortOrder]);

  // Recalcular estatísticas baseadas nos dados filtrados
  const totalPromotores = filteredData.length;
  const registraram = filteredData.filter(p => p.status === "registrou").length;
  const naoRegistraram = filteredData.filter(p => p.status === "não registrou").length;
  const lojasAfetadas = new Set(filteredData.filter(p => p.status === "não registrou").map(p => p.loja)).size;
  const marcasAfetadasCount = new Set(filteredData.filter(p => p.status === "não registrou").map(p => p.marca)).size;

  // Dados para gráficos baseados nos dados filtrados
  const statusData = [
    { name: "Registraram", value: registraram, color: "#10B981" },
    { name: "Não Registraram", value: naoRegistraram, color: "#EF4444" }
  ];

  const tipoData = useMemo(() => {
    const tipos = ["promotor", "supervisor", "parttime4", "parttime6", "lider", "promotorexpress"];
    return tipos.map(tipo => ({
      tipo: tipo.charAt(0).toUpperCase() + tipo.slice(1),
      registrou: filteredData.filter(p => p.tipo === tipo && p.status === "registrou").length,
      naoRegistrou: filteredData.filter(p => p.tipo === tipo && p.status === "não registrou").length,
    })).filter(item => item.registrou > 0 || item.naoRegistrou > 0);
  }, [filteredData]);

  const marcasAfetadas = useMemo(() => {
    const marcasData = {};
    filteredData.forEach(item => {
      if (!marcasData[item.marca]) {
        marcasData[item.marca] = { marca: item.marca, horas: 0, afetada: false };
      }
      if (item.status === "não registrou") {
        marcasData[item.marca].horas += item.horasPlanejadas;
        marcasData[item.marca].afetada = true;
      }
    });
    return Object.values(marcasData).filter(marca => marca.horas > 0);
  }, [filteredData]);

  const resetAllFilters = () => {
    setSelectedRegional("all");
    setSelectedLoja("all");
    setSelectedMarca("all");
    setSelectedCategoria("all");
    setSelectedSupervisor("all");
    setFilterType("all");
    setSearchTerm("");
  };

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

      {/* Filtros estilo Power BI */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center gap-2 mb-4">
            <Filter className="h-5 w-5 text-blue-600" />
            <h2 className="text-lg font-semibold text-slate-800">Filtros</h2>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={resetAllFilters}
              className="ml-auto"
            >
              Limpar Filtros
            </Button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Regional</label>
              <Select value={selectedRegional} onValueChange={setSelectedRegional}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {regionais.map(regional => (
                    <SelectItem key={regional} value={regional}>{regional}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Loja</label>
              <Select value={selectedLoja} onValueChange={setSelectedLoja}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {lojas.map(loja => (
                    <SelectItem key={loja} value={loja}>{loja}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Marca</label>
              <Select value={selectedMarca} onValueChange={setSelectedMarca}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {marcas.map(marca => (
                    <SelectItem key={marca} value={marca}>{marca}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Categoria</label>
              <Select value={selectedCategoria} onValueChange={setSelectedCategoria}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Todas" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas</SelectItem>
                  {categorias.map(categoria => (
                    <SelectItem key={categoria} value={categoria}>{categoria}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Supervisor</label>
              <Select value={selectedSupervisor} onValueChange={setSelectedSupervisor}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  {supervisores.map(supervisor => (
                    <SelectItem key={supervisor} value={supervisor}>{supervisor}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Tipo Contrato</label>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="h-9">
                  <SelectValue placeholder="Todos" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="promotor">Promotor</SelectItem>
                  <SelectItem value="supervisor">Supervisor</SelectItem>
                  <SelectItem value="parttime4">Part-time 4h</SelectItem>
                  <SelectItem value="parttime6">Part-time 6h</SelectItem>
                  <SelectItem value="lider">Líder</SelectItem>
                  <SelectItem value="promotorexpress">Promotor Express</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

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
              {statusData.some(item => item.value > 0) ? (
                <>
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
                </>
              ) : (
                <div className="flex items-center justify-center h-64 text-slate-500">
                  Nenhum dado disponível para os filtros selecionados
                </div>
              )}
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
              {tipoData.length > 0 ? (
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
              ) : (
                <div className="flex items-center justify-center h-64 text-slate-500">
                  Nenhum dado disponível para os filtros selecionados
                </div>
              )}
            </CardContent>
          </Card>

          {marcasAfetadas.length > 0 && (
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
          )}
        </div>

        {/* Filtros e Tabela */}
        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <Filter className="h-5 w-5 text-blue-600" />
              Dados Detalhados dos Promotores ({filteredData.length} registros)
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
                    <th className="text-left p-3 font-semibold text-slate-700">Regional</th>
                    <th className="text-left p-3 font-semibold text-slate-700">Loja</th>
                    <th className="text-left p-3 font-semibold text-slate-700">Marca</th>
                    <th className="text-left p-3 font-semibold text-slate-700">Categoria</th>
                    <th className="text-left p-3 font-semibold text-slate-700">Supervisor</th>
                    <th className="text-left p-3 font-semibold text-slate-700">Horas Reg.</th>
                    <th className="text-left p-3 font-semibold text-slate-700">Horas Plan.</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.length > 0 ? (
                    filteredData.map((item) => (
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
                        <td className="p-3">{item.regional}</td>
                        <td className="p-3">{item.loja}</td>
                        <td className="p-3">{item.marca}</td>
                        <td className="p-3">{item.categoria}</td>
                        <td className="p-3">{item.supervisor}</td>
                        <td className="p-3 font-mono">
                          <span className={item.horasRegistradas < item.horasPlanejadas ? "text-red-600" : "text-green-600"}>
                            {item.horasRegistradas}h
                          </span>
                        </td>
                        <td className="p-3 font-mono">{item.horasPlanejadas}h</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={11} className="p-8 text-center text-slate-500">
                        Nenhum promotor encontrado com os filtros selecionados
                      </td>
                    </tr>
                  )}
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
