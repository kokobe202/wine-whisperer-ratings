
export interface Wine {
  id: string;
  name: string;
  type: 'red' | 'white' | 'rose' | 'sparkling' | 'dessert';
  vintage?: string;
  country?: string;
  region?: string;
  winery?: string;
  price?: string;
  image_url?: string;
  created_at: string;
  updated_at: string;
}

export interface UserWine {
  id: string;
  user_id: string;
  wine_id: string;
  is_favorite?: boolean;
  quantity?: number;
  purchase_date?: string;
  storage_location?: string;
  notes?: string;
  mode: 'tasted' | 'library';
  created_at: string;
  updated_at: string;
  wine?: Wine;
}

export interface Tasting {
  id: string;
  user_id: string;
  wine_id: string;
  rating?: number;
  tasting_date: string;
  tasting_notes?: string;
  color_notes?: string;
  aroma_notes?: string;
  taste_notes?: string;
  finish_notes?: string;
  overall_impression?: string;
  created_at: string;
  updated_at: string;
  wine?: Wine;
}

export interface CommunityActivity {
  id: string;
  user_id: string;
  activity_type: 'added' | 'tasted' | 'removed' | 'shared';
  wine_id?: string;
  wine_name: string;
  reason?: string;
  rating?: number;
  notes?: string;
  created_at: string;
}
