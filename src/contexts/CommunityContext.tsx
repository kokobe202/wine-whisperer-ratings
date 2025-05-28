
import React, { createContext, useContext, useState } from 'react';

interface CommunityActivity {
  id: string;
  username: string;
  action: 'added' | 'removed';
  wineName: string;
  reason?: string;
  timestamp: Date;
}

interface CommunityContextType {
  activities: CommunityActivity[];
  addActivity: (activity: Omit<CommunityActivity, 'id' | 'timestamp'>) => void;
}

const CommunityContext = createContext<CommunityContextType | undefined>(undefined);

export const CommunityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activities, setActivities] = useState<CommunityActivity[]>([]);

  const addActivity = (activity: Omit<CommunityActivity, 'id' | 'timestamp'>) => {
    const newActivity: CommunityActivity = {
      ...activity,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: new Date()
    };
    setActivities(prev => [newActivity, ...prev].slice(0, 50)); // Keep only last 50 activities
  };

  return (
    <CommunityContext.Provider value={{ activities, addActivity }}>
      {children}
    </CommunityContext.Provider>
  );
};

export const useCommunity = () => {
  const context = useContext(CommunityContext);
  if (context === undefined) {
    throw new Error('useCommunity must be used within a CommunityProvider');
  }
  return context;
};
