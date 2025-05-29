
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Tasting } from '@/types/database';

export const useTastings = () => {
  const [tastings, setTastings] = useState<Tasting[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchTastings = async () => {
    if (!user) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('tastings')
        .select(`
          *,
          wine:wines(*)
        `)
        .eq('user_id', user.id)
        .order('tasting_date', { ascending: false });

      if (error) throw error;
      setTastings(data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  const addTasting = async (tastingData: Omit<Tasting, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) throw new Error('Utilisateur non connecté');

    try {
      const { data, error } = await supabase
        .from('tastings')
        .insert([{
          ...tastingData,
          user_id: user.id
        }])
        .select(`
          *,
          wine:wines(*)
        `)
        .single();

      if (error) throw error;

      // Ajouter l'activité communautaire
      const wine = await supabase
        .from('wines')
        .select('name')
        .eq('id', tastingData.wine_id)
        .single();

      if (wine.data) {
        await supabase
          .from('community_activities')
          .insert([{
            user_id: user.id,
            activity_type: 'tasted',
            wine_id: tastingData.wine_id,
            wine_name: wine.data.name,
            rating: tastingData.rating,
            notes: tastingData.tasting_notes
          }]);
      }

      setTastings(prev => [data, ...prev]);
      return data;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchTastings();
  }, [user]);

  return {
    tastings,
    loading,
    error,
    refetch: fetchTastings,
    addTasting
  };
};
