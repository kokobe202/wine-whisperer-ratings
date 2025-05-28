
import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Users, Clock } from "lucide-react";
import { useCommunity } from "@/contexts/CommunityContext";
import { useLanguage } from "@/contexts/LanguageContext";

const Community = () => {
  const navigate = useNavigate();
  const { activities } = useCommunity();
  const { t } = useLanguage();

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "maintenant";
    if (diffInMinutes < 60) return `il y a ${diffInMinutes}min`;
    if (diffInMinutes < 1440) return `il y a ${Math.floor(diffInMinutes / 60)}h`;
    return `il y a ${Math.floor(diffInMinutes / 1440)}j`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-slate-100 py-8 px-4">
      <div className="max-w-4xl mx-auto">
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
            <Users size={32} />
            {t('community.title')}
          </h1>
          
          <div className="w-20" /> {/* Spacer for centering */}
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              {t('community.recentActivity')}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {activities.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                {t('community.noActivity')}
              </div>
            ) : (
              <div className="space-y-4">
                {activities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm border">
                    <div className="flex-1">
                      <p className="text-sm">
                        <span className="font-medium text-red-700">{activity.username}</span>
                        {' '}
                        {activity.action === 'added' ? t('community.added') : t('community.removed')}
                        {' '}
                        <span className="font-medium">{activity.wineName}</span>
                        {' '}
                        {activity.action === 'added' ? t('community.toCave') : t('community.fromCave')}
                        {activity.reason && (
                          <>
                            {' - '}
                            <span className="text-gray-600">
                              {t('community.reason')}: {activity.reason}
                            </span>
                          </>
                        )}
                      </p>
                    </div>
                    <div className="text-xs text-gray-400">
                      {formatTimeAgo(activity.timestamp)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Community;
