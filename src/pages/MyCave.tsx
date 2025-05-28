
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Wine, BarChart3 } from "lucide-react";
import WineInventory from "../components/WineInventory";
import CaveStatistics from "../components/CaveStatistics";
import { useLanguage } from "@/contexts/LanguageContext";

const MyCave = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState("inventory");

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-slate-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> {t('nav.back')}
          </Button>
          
          <h1 className="text-3xl font-bold text-red-900 flex items-center gap-2">
            <Wine size={32} />
            {t('cave.title')}
          </h1>
          
          <div className="w-20" />
        </div>

        {/* Navigation par onglets */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="inventory" className="flex items-center gap-2">
              <Wine className="h-4 w-4" />
              Mes Vins
            </TabsTrigger>
            <TabsTrigger value="statistics" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              Statistiques
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="inventory" className="space-y-4">
            <WineInventory />
          </TabsContent>
          
          <TabsContent value="statistics" className="space-y-4">
            <CaveStatistics />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default MyCave;
