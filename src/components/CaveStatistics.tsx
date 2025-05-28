
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, PieChart, Pie, Cell, LineChart, Line, ResponsiveContainer } from "recharts";
import { TrendingUp, Wine, DollarSign, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const CaveStatistics = () => {
  const { t } = useLanguage();
  const [chartType, setChartType] = useState("bar");
  const [timeFilter, setTimeFilter] = useState("all");

  // Données mockées pour les statistiques
  const winesByType = [
    { name: "Rouge", value: 45, color: "#DC2626" },
    { name: "Blanc", value: 25, color: "#F59E0B" },
    { name: "Rosé", value: 15, color: "#EC4899" },
    { name: "Pétillant", value: 10, color: "#3B82F6" },
    { name: "Dessert", value: 5, color: "#8B5CF6" }
  ];

  const valueOverTime = [
    { month: "Jan", value: 2500 },
    { month: "Fév", value: 2800 },
    { month: "Mar", value: 3200 },
    { month: "Avr", value: 3800 },
    { month: "Mai", value: 4200 },
    { month: "Juin", value: 4500 }
  ];

  const winesByRegion = [
    { region: "Bordeaux", count: 25 },
    { region: "Bourgogne", count: 20 },
    { region: "Champagne", count: 15 },
    { region: "Loire", value: 12 },
    { region: "Rhône", count: 10 },
    { region: "Autres", count: 18 }
  ];

  const totalValue = 4500;
  const totalWines = 100;
  const averageValue = totalValue / totalWines;

  return (
    <div className="space-y-6">
      {/* Statistiques générales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valeur totale</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{totalValue.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">
              +12% par rapport au mois dernier
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Nombre de vins</CardTitle>
            <Wine className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalWines}</div>
            <p className="text-xs text-muted-foreground">
              +5 nouveaux ce mois
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valeur moyenne</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{averageValue.toFixed(0)}</div>
            <p className="text-xs text-muted-foreground">
              Par bouteille
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Millésime moyen</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2018</div>
            <p className="text-xs text-muted-foreground">
              Âge moyen de la cave
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres pour les graphiques */}
      <div className="flex gap-4">
        <Select value={chartType} onValueChange={setChartType}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Type de graphique" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="bar">Graphique en barres</SelectItem>
            <SelectItem value="pie">Graphique circulaire</SelectItem>
            <SelectItem value="line">Graphique linéaire</SelectItem>
          </SelectContent>
        </Select>

        <Select value={timeFilter} onValueChange={setTimeFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Période" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Toute la période</SelectItem>
            <SelectItem value="year">Cette année</SelectItem>
            <SelectItem value="month">Ce mois</SelectItem>
            <SelectItem value="week">Cette semaine</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Graphiques */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Répartition par type</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              {chartType === "pie" ? (
                <PieChart>
                  <Pie
                    data={winesByType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {winesByType.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              ) : (
                <BarChart data={winesByType}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#DC2626" />
                </BarChart>
              )}
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Évolution de la valeur</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={valueOverTime}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`€${value}`, 'Valeur']} />
                <Line type="monotone" dataKey="value" stroke="#DC2626" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Répartition par région</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={winesByRegion} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="region" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="count" fill="#DC2626" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CaveStatistics;
