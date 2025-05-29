
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Users, Settings, BookOpen, LogIn, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import UserProfile from "@/components/UserProfile";

const Index = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { user, loading } = useAuth();

  const handleAddWineClick = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    navigate("/add-wine");
  };

  const handleMyCaveClick = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    navigate("/my-cave");
  };

  const handleCommunityClick = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    navigate("/community");
  };

  const handleSettingsClick = () => {
    if (!user) {
      navigate("/auth");
      return;
    }
    navigate("/settings");
  };

  const handleAuthClick = () => {
    navigate("/auth");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-rose-50 to-slate-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
          <p className="mt-4 text-red-700">Chargement...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-rose-50 to-slate-100">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 text-red-900">{t('home.title')}</h1>
        <p className="text-xl text-red-700 max-w-md mx-auto">
          {t('home.subtitle')}
        </p>
      </div>

      {user ? (
        // Authenticated user view
        <div className="flex flex-col gap-4 w-full max-w-md px-4">
          <div className="mb-4">
            <UserProfile />
          </div>
          
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
            className="py-8 text-lg flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white"
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
      ) : (
        // Non-authenticated user view
        <div className="flex flex-col gap-4 w-full max-w-md px-4">
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 mb-6 text-center">
            <User className="mx-auto h-12 w-12 text-red-600 mb-4" />
            <h2 className="text-xl font-semibold text-red-900 mb-2">
              Bienvenue sur Wine Whisperer
            </h2>
            <p className="text-red-700 mb-4">
              Connectez-vous pour gérer votre cave personnelle et découvrir de nouveaux vins.
            </p>
          </div>
          
          <Button
            onClick={handleAuthClick}
            className="py-8 text-lg flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700"
            size="lg"
          >
            <LogIn size={24} />
            <span>Se connecter / S'inscrire</span>
          </Button>

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handleAddWineClick}
              className="py-6 text-base flex flex-col items-center justify-center gap-2 bg-red-700 hover:bg-red-800"
              size="lg"
            >
              <Plus size={20} />
              <span>{t('home.addWine')}</span>
            </Button>

            <Button
              onClick={handleMyCaveClick}
              className="py-6 text-base flex flex-col items-center justify-center gap-2 bg-red-700 hover:bg-red-800"
              size="lg"
            >
              <BookOpen size={20} />
              <span>{t('home.myCave')}</span>
            </Button>
          </div>

          <Button
            onClick={handleCommunityClick}
            className="py-6 text-base flex items-center justify-center gap-3 bg-red-500 hover:bg-red-600 text-white"
            size="lg"
          >
            <Users size={20} />
            <span>{t('home.community')}</span>
          </Button>
        </div>
      )}
    </div>
  );
};

export default Index;
