
import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import WineInventory from "@/components/WineInventory";
import CaveStatistics from "@/components/CaveStatistics";

const MyCave = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Retour
          </Button>
          <h1 className="text-3xl font-bold text-red-900 flex items-center gap-3">
            <BookOpen size={32} />
            {t('myCave.title')}
          </h1>
        </div>

        <div className="mb-6">
          <CaveStatistics />
        </div>

        <WineInventory />
      </div>
    </div>
  );
};

export default MyCave;
