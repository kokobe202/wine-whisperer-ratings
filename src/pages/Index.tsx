
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Users, Settings, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleAddWineClick = () => {
    navigate("/add-wine");
  };

  const handleMyCaveClick = () => {
    navigate("/my-cave");
  };

  const handleCommunityClick = () => {
    navigate("/community");
  };

  const handleSettingsClick = () => {
    navigate("/settings");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-rose-50 to-slate-100">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 text-red-900">{t('home.title')}</h1>
        <p className="text-xl text-red-700 max-w-md mx-auto">
          {t('home.subtitle')}
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-md px-4">
        <Button
          onClick={handleAddWineClick}
          className="py-8 text-lg flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700"
          size="lg"
        >
          <Plus size={24} />
          <span>{t('home.addWine')}</span>
        </Button>

        <Button
          onClick={handleMyCaveClick}
          className="py-8 text-lg flex items-center justify-center gap-3 bg-red-700 hover:bg-red-800"
          size="lg"
        >
          <BookOpen size={24} />
          <span>{t('home.myCave')}</span>
        </Button>

        <Button
          onClick={handleCommunityClick}
          className="py-8 text-lg flex items-center justify-center gap-3"
          variant="secondary"
          size="lg"
        >
          <Users size={24} />
          <span>{t('home.community')}</span>
        </Button>

        <Button
          onClick={handleSettingsClick}
          className="py-8 text-lg flex items-center justify-center gap-3"
          variant="outline"
          size="lg"
        >
          <Settings size={24} />
          <span>{t('home.settings')}</span>
        </Button>
      </div>
    </div>
  );
};

export default Index;
