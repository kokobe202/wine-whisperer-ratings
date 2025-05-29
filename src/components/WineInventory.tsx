
import React, { useState } from "react";
import WineDetailModal from "./WineDetailModal";
import WineSearchFilters from "./wine-inventory/WineSearchFilters";
import WineGrid from "./wine-inventory/WineGrid";
import WineRemovalDialog from "./wine-inventory/WineRemovalDialog";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useWineFiltering } from "@/hooks/useWineFiltering";
import { useUserWines } from "@/hooks/useWines";
import { useTastings } from "@/hooks/useTastings";
import { UserWine } from "@/types/database";

const WineInventory = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const { wines, loading, removeWineFromUser } = useUserWines();
  const { addTasting } = useTastings();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterType, setFilterType] = useState("all");
  const [selectedWine, setSelectedWine] = useState<UserWine | null>(null);
  const [wineToRemove, setWineToRemove] = useState<UserWine | null>(null);
  const [removalReason, setRemovalReason] = useState("");
  const [showRemovalDialog, setShowRemovalDialog] = useState(false);

  const removalReasons = [
    { value: "tasted", label: t('wine.tasted') },
    { value: "sold", label: t('wine.sold') },
    { value: "gifted", label: t('wine.gifted') },
    { value: "broken", label: t('wine.broken') },
    { value: "spoiled", label: t('wine.spoiled') },
    { value: "other", label: t('wine.other') }
  ];

  // Transformer les données pour le hook de filtrage
  const transformedWines = wines.map(userWine => ({
    ...userWine.wine,
    id: userWine.id,
    isFavorite: userWine.is_favorite || false,
    rating: 0, // TODO: calculer la moyenne des notes
    tastingDate: userWine.created_at,
    notes: userWine.notes || ''
  }));

  const filteredAndSortedWines = useWineFiltering(transformedWines, searchTerm, filterType, sortBy);

  const handleWineCardClick = (wine: any) => {
    const userWine = wines.find(w => w.id === wine.id);
    setSelectedWine(userWine || null);
  };

  const handleAddTasting = async () => {
    if (!selectedWine?.wine) return;

    try {
      await addTasting({
        wine_id: selectedWine.wine.id,
        rating: 5,
        tasting_date: new Date().toISOString().split('T')[0],
        tasting_notes: `Dégustation de ${selectedWine.wine.name}`
      });

      toast({
        title: t('toast.addTastingTitle'),
        description: `${t('toast.addTastingDesc')} ${selectedWine.wine.name}`,
      });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter la dégustation",
        variant: "destructive"
      });
    }
  };

  const handleRemoveWine = (wine: UserWine, reason: string) => {
    setWineToRemove(wine);
    setRemovalReason(reason);
    setSelectedWine(null);
    setShowRemovalDialog(true);
  };

  const confirmRemoval = async () => {
    if (!wineToRemove) return;

    try {
      await removeWineFromUser(wineToRemove.id, removalReason);
      
      const reasonLabel = removalReasons.find(r => r.value === removalReason)?.label || removalReason;
      
      toast({
        title: t('wine.removed'),
        description: `${wineToRemove.wine?.name} ${t('wine.removedDescription')} (${reasonLabel.toLowerCase()}).`,
      });
      
      setShowRemovalDialog(false);
      setWineToRemove(null);
      setRemovalReason("");
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Impossible de retirer le vin",
        variant: "destructive"
      });
    }
  };

  const cancelRemoval = () => {
    setShowRemovalDialog(false);
    setWineToRemove(null);
    setRemovalReason("");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
        <span className="ml-2">Chargement de votre cave...</span>
      </div>
    );
  }

  return (
    <div>
      <WineSearchFilters
        searchTerm={searchTerm}
        filterType={filterType}
        sortBy={sortBy}
        onSearchChange={setSearchTerm}
        onFilterChange={setFilterType}
        onSortChange={setSortBy}
      />

      <WineGrid
        wines={filteredAndSortedWines}
        searchTerm={searchTerm}
        filterType={filterType}
        onWineClick={handleWineCardClick}
      />

      {selectedWine && (
        <WineDetailModal
          wine={{
            ...selectedWine.wine,
            id: selectedWine.id,
            isFavorite: selectedWine.is_favorite || false,
            rating: 0, // TODO: calculer moyenne
            tastingDate: selectedWine.created_at,
            notes: selectedWine.notes || ''
          }}
          isOpen={!!selectedWine}
          onClose={() => setSelectedWine(null)}
          onAddTasting={handleAddTasting}
          onRemoveWine={(wine, reason) => handleRemoveWine(selectedWine, reason)}
        />
      )}

      <WineRemovalDialog
        isOpen={showRemovalDialog}
        wine={wineToRemove}
        removalReason={removalReason}
        removalReasons={removalReasons}
        onConfirm={confirmRemoval}
        onCancel={cancelRemoval}
      />
    </div>
  );
};

export default WineInventory;
