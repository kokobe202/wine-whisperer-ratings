
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Wine, Star, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCommunityActivities } from "@/hooks/useCommunityActivities";

const Community = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { activities, loading } = useCommunityActivities();

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'added':
        return '🍷';
      case 'tasted':
        return '👃';
      case 'removed':
        return '📦';
      case 'shared':
        return '🤝';
      default:
        return '📝';
    }
  };

  const getActivityText = (activity: any) => {
    switch (activity.activity_type) {
      case 'added':
        return `a ajouté ${activity.wine_name} à sa cave`;
      case 'tasted':
        return `a dégusté ${activity.wine_name}${activity.rating ? ` (${activity.rating}/5 ⭐)` : ''}`;
      case 'removed':
        return `a retiré ${activity.wine_name} de sa cave${activity.reason ? ` (${activity.reason})` : ''}`;
      case 'shared':
        return `a partagé ${activity.wine_name}`;
      default:
        return `a interagi avec ${activity.wine_name}`;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return "aujourd'hui";
    if (diffDays === 2) return "hier";
    if (diffDays <= 7) return `il y a ${diffDays - 1} jours`;
    return date.toLocaleDateString('fr-FR');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-slate-100 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-center p-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
            <span className="ml-2">Chargement des activités...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-slate-100 p-4">
      <div className="max-w-4xl mx-auto">
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
            <Users size={32} />
            {t('community.title')}
          </h1>
        </div>

        <div className="grid gap-4">
          {activities.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <Users className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <p className="text-gray-600">Aucune activité dans la communauté pour le moment.</p>
                <p className="text-sm text-gray-500 mt-2">
                  Ajoutez des vins à votre cave ou créez des dégustations pour voir les activités ici !
                </p>
              </CardContent>
            </Card>
          ) : (
            activities.map((activity) => (
              <Card key={activity.id} className="hover:shadow-md transition-shadow">
                <CardContent className="pt-4">
                  <div className="flex items-start gap-3">
                    <div className="text-2xl">{getActivityIcon(activity.activity_type)}</div>
                    <div className="flex-1">
                      <p className="text-gray-900">
                        <span className="font-medium">Utilisateur</span>{' '}
                        {getActivityText(activity)}
                      </p>
                      {activity.notes && (
                        <p className="text-sm text-gray-600 mt-1 italic">
                          "{activity.notes}"
                        </p>
                      )}
                      <p className="text-sm text-gray-500 mt-2">
                        {formatDate(activity.created_at)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Community;
