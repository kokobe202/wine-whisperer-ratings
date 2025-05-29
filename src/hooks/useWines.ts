
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { UserWine } from '@/types/database';

export const useUserWines = () => {
  const [wines, setWines] = useState<UserWine[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchUserWines = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_wines')
        .select(`
          *,
          wine:wines(*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setWines(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const addWineToUser = async (wineData: any) => {
    if (!user) throw new Error('Utilisateur non connecté');

    try {
      // Créer le vin d'abord
      const { data: wine, error: wineError } = await supabase
        .from('wines')
        .insert([wineData])
        .select()
        .single();

      if (wineError) throw wineError;

      // Ajouter le vin à la cave de l'utilisateur
      const { data, error } = await supabase
        .from('user_wines')
        .insert([{
          user_id: user.id,
          wine_id: wine.id,
          mode: 'library',
          quantity: 1
        }])
        .select(`
          *,
          wine:wines(*)
        `)
        .single();

      if (error) throw error;

      // Ajouter l'activité communautaire
      await supabase
        .from('community_activities')
        .insert([{
          user_id: user.id,
          activity_type: 'added',
          wine_id: wine.id,
          wine_name: wine.name
        }]);

      setWines(prev => [data, ...prev]);
      return data;
    } catch (err) {
      throw err;
    }
  };

  const removeWineFromUser = async (userWineId: string, reason: string) => {
    if (!user) throw new Error('Utilisateur non connecté');

    try {
      const wineToRemove = wines.find(w => w.id === userWineId);
      if (!wineToRemove) throw new Error('Vin non trouvé');

      const { error } = await supabase
        .from('user_wines')
        .delete()
        .eq('id', userWineId)
        .eq('user_id', user.id);

      if (error) throw error;

      // Ajouter l'activité communautaire
      await supabase
        .from('community_activities')
        .insert([{
          user_id: user.id,
          activity_type: 'removed',
          wine_id: wineToRemove.wine_id,
          wine_name: wineToRemove.wine?.name || '',
          reason
        }]);

      setWines(prev => prev.filter(w => w.id !== userWineId));
    } catch (err) {
      throw err;
    }
  };

  const updateUserWine = async (userWineId: string, updates: Partial<UserWine>) => {
    if (!user) throw new Error('Utilisateur non connecté');

    try {
      const { data, error } = await supabase
        .from('user_wines')
        .update(updates)
        .eq('id', userWineId)
        .eq('user_id', user.id)
        .select(`
          *,
          wine:wines(*)
        `)
        .single();

      if (error) throw error;

      setWines(prev => prev.map(w => w.id === userWineId ? data : w));
      return data;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchUserWines();
  }, [user]);

  return {
    wines,
    loading,
    error,
    refetch: fetchUserWines,
    addWineToUser,
    removeWineFromUser,
    updateUserWine
  };
};
