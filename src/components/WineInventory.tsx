
import React, { useState } from "react";
import WineDetailModal from "./WineDetailModal";
import WineSearchFilters from "./wine-inventory/WineSearchFilters";
import WineGrid from "./wine-inventory/WineGrid";
import WineRemovalDialog from "./wine-inventory/WineRemovalDialog";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCommunity } from "@/contexts/CommunityContext";
import { useWineFiltering } from "@/hooks/useWineFiltering";
import { mockWines } from "@/data/mockWines";

const WineInventory = () => {
  const { toast } = useToast();
  const { t } = useLanguage();
  const { addActivity } = useCommunity();
  const [wines, setWines] = useState(mockWines);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterType, setFilterType] = useState("all");
  const [selectedWine, setSelectedWine] = useState(null);
  const [wineToRemove, setWineToRemove] = useState(null);
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

  const filteredAndSortedWines = useWineFiltering(wines, searchTerm, filterType, sortBy);

  const handleWineCardClick = (wine) => {
    setSelectedWine(wine);
  };

  const handleAddTasting = () => {
    toast({
      title: t('toast.addTastingTitle'),
      description: `${t('toast.addTastingDesc')} ${selectedWine?.name}`,
    });
  };

  const handleRemoveWine = (wine, reason) => {
    setWineToRemove(wine);
    setRemovalReason(reason);
    setSelectedWine(null);
    setShowRemovalDialog(true);
  };

  const confirmRemoval = () => {
    if (wineToRemove) {
      setWines(wines.filter(wine => wine.id !== wineToRemove.id));
      const reasonLabel = removalReasons.find(r => r.value === removalReason)?.label || removalReason;
      
      addActivity({
        username: "Utilisateur",
        action: "removed",
        wineName: wineToRemove.name,
        reason: reasonLabel
      });

      toast({
        title: t('wine.removed'),
        description: `${wineToRemove.name} ${t('wine.removedDescription')} (${reasonLabel.toLowerCase()}).`,
      });
      setShowRemovalDialog(false);
      setWineToRemove(null);
      setRemovalReason("");
    }
  };

  const cancelRemoval = () => {
    setShowRemovalDialog(false);
    setWineToRemove(null);
    setRemovalReason("");
  };

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
          wine={selectedWine}
          isOpen={!!selectedWine}
          onClose={() => setSelectedWine(null)}
          onAddTasting={handleAddTasting}
          onRemoveWine={handleRemoveWine}
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
