
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'fr' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Navigation
    'nav.back': 'Retour',
    'nav.myCave': 'Ma Cave',
    'nav.addWine': 'Ajouter un Vin',
    'nav.community': 'Communauté',
    'nav.settings': 'Paramètres',

    // Home page
    'home.title': 'Wine Journal',
    'home.subtitle': 'Suivez vos expériences vinicoles et partagez vos favoris',
    'home.addWine': 'Ajouter un Vin',
    'home.myCave': 'Ma Cave',
    'home.community': 'Communauté',
    'home.settings': 'Paramètres',
    'home.recentWines': 'Vins Récents',
    'home.recentWinesEmpty': 'Vos vins récemment ajoutés apparaîtront ici',

    // My Cave
    'cave.title': 'Ma Cave',
    'cave.searchPlaceholder': 'Rechercher par nom, région, producteur...',
    'cave.allTypes': 'Tous les types',
    'cave.red': 'Rouge',
    'cave.white': 'Blanc',
    'cave.rose': 'Rosé',
    'cave.sparkling': 'Pétillant',
    'cave.dessert': 'Dessert',
    'cave.sortBy': 'Trier par',
    'cave.name': 'Nom',
    'cave.rating': 'Note',
    'cave.vintage': 'Millésime',
    'cave.price': 'Prix',
    'cave.date': 'Date de dégustation',
    'cave.noWines': 'Aucun vin trouvé avec ces critères',
    'cave.emptyTitle': 'Votre cave est vide',
    'cave.addFirstWine': 'Ajouter votre premier vin',
    'cave.wineCount': 'vin',
    'cave.wineCountPlural': 'vins',

    // Wine actions
    'wine.actions': 'Actions pour',
    'wine.viewDetails': 'Voir les détails',
    'wine.addTasting': 'Ajouter une dégustation',
    'wine.removeFromCave': 'Supprimer de la cave',
    'wine.tasted': 'Dégusté',
    'wine.sold': 'Vendu',
    'wine.gifted': 'Offert',
    'wine.broken': 'Cassé',
    'wine.spoiled': 'Abîmé',
    'wine.other': 'Autre raison',
    'wine.confirmRemoval': 'Confirmer la suppression',
    'wine.confirmRemovalText': 'Êtes-vous sûr de vouloir supprimer',
    'wine.reason': 'Raison',
    'wine.cancel': 'Annuler',
    'wine.remove': 'Supprimer',
    'wine.removed': 'Bouteille supprimée',
    'wine.removedDescription': 'a été supprimé de votre cave',

    // Community
    'community.title': 'Communauté',
    'community.recentActivity': 'Activité Récente',
    'community.noActivity': 'Aucune activité récente',
    'community.added': 'a ajouté',
    'community.removed': 'a supprimé',
    'community.toCave': 'à sa cave',
    'community.fromCave': 'de sa cave',
    'community.reason': 'Raison',

    // Settings
    'settings.title': 'Paramètres',
    'settings.language': 'Langue',
    'settings.french': 'Français',
    'settings.english': 'English',
    'settings.languageChanged': 'Langue changée',
    'settings.languageChangedDesc': 'L\'interface a été mise à jour',

    // Toast messages
    'toast.addTastingTitle': 'Ajouter dégustation',
    'toast.addTastingDesc': 'Redirection vers le formulaire de dégustation pour',
    'toast.communityComingSoon': 'Page communauté bientôt disponible',
    'toast.settingsComingSoon': 'Page paramètres bientôt disponible'
  },
  en: {
    // Navigation
    'nav.back': 'Back',
    'nav.myCave': 'My Cave',
    'nav.addWine': 'Add Wine',
    'nav.community': 'Community',
    'nav.settings': 'Settings',

    // Home page
    'home.title': 'Wine Journal',
    'home.subtitle': 'Track your wine experiences and share your favorites',
    'home.addWine': 'Add Wine',
    'home.myCave': 'My Cave',
    'home.community': 'Community',
    'home.settings': 'Settings',
    'home.recentWines': 'Recent Wines',
    'home.recentWinesEmpty': 'Your recently added wines will appear here',

    // My Cave
    'cave.title': 'My Cave',
    'cave.searchPlaceholder': 'Search by name, region, producer...',
    'cave.allTypes': 'All types',
    'cave.red': 'Red',
    'cave.white': 'White',
    'cave.rose': 'Rosé',
    'cave.sparkling': 'Sparkling',
    'cave.dessert': 'Dessert',
    'cave.sortBy': 'Sort by',
    'cave.name': 'Name',
    'cave.rating': 'Rating',
    'cave.vintage': 'Vintage',
    'cave.price': 'Price',
    'cave.date': 'Tasting date',
    'cave.noWines': 'No wines found with these criteria',
    'cave.emptyTitle': 'Your cave is empty',
    'cave.addFirstWine': 'Add your first wine',
    'cave.wineCount': 'wine',
    'cave.wineCountPlural': 'wines',

    // Wine actions
    'wine.actions': 'Actions for',
    'wine.viewDetails': 'View details',
    'wine.addTasting': 'Add tasting',
    'wine.removeFromCave': 'Remove from cave',
    'wine.tasted': 'Tasted',
    'wine.sold': 'Sold',
    'wine.gifted': 'Gifted',
    'wine.broken': 'Broken',
    'wine.spoiled': 'Spoiled',
    'wine.other': 'Other reason',
    'wine.confirmRemoval': 'Confirm removal',
    'wine.confirmRemovalText': 'Are you sure you want to remove',
    'wine.reason': 'Reason',
    'wine.cancel': 'Cancel',
    'wine.remove': 'Remove',
    'wine.removed': 'Bottle removed',
    'wine.removedDescription': 'has been removed from your cave',

    // Community
    'community.title': 'Community',
    'community.recentActivity': 'Recent Activity',
    'community.noActivity': 'No recent activity',
    'community.added': 'added',
    'community.removed': 'removed',
    'community.toCave': 'to their cave',
    'community.fromCave': 'from their cave',
    'community.reason': 'Reason',

    // Settings
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.french': 'Français',
    'settings.english': 'English',
    'settings.languageChanged': 'Language changed',
    'settings.languageChangedDesc': 'Interface has been updated',

    // Toast messages
    'toast.addTastingTitle': 'Add tasting',
    'toast.addTastingDesc': 'Redirecting to tasting form for',
    'toast.communityComingSoon': 'Wine community page coming soon',
    'toast.settingsComingSoon': 'Settings page coming soon'
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('wine-journal-language');
    return (saved as Language) || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('wine-journal-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
