import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, Search, Star, Wine, Filter } from "lucide-react";
import WineCard from "../components/WineCard";
import WineDetailModal from "../components/WineDetailModal";
import { useToast } from "@/hooks/use-toast";

// Mock data pour les vins (normalement ça viendrait d'une base de données)
const mockWines = [
  {
    id: 1,
    name: "Château Margaux",
    type: "red",
    vintage: "2018",
    region: "Bordeaux, France",
    winery: "Château Margaux",
    rating: 5,
    price: "€450",
    image: "/placeholder.svg",
    isFavorite: true,
    tastingDate: "2024-01-15",
    notes: "Exceptional wine with complex flavors of dark fruit and oak."
  },
  {
    id: 2,
    name: "Chablis Premier Cru",
    type: "white",
    vintage: "2020",
    region: "Burgundy, France",
    winery: "Domaine Raveneau",
    rating: 4,
    price: "€85",
    image: "/placeholder.svg",
    isFavorite: false,
    tastingDate: "2024-02-10",
    notes: "Crisp and mineral with notes of citrus and stone fruit."
  },
  {
    id: 3,
    name: "Dom Pérignon",
    type: "sparkling",
    vintage: "2012",
    region: "Champagne, France",
    winery: "Moët & Chandon",
    rating: 5,
    price: "€200",
    image: "/placeholder.svg",
    isFavorite: true,
    tastingDate: "2024-03-05",
    notes: "Elegant bubbles with complex layers of flavor."
  }
];

const removalReasons = [
  { value: "tasted", label: "Dégusté" },
  { value: "sold", label: "Vendu" },
  { value: "gifted", label: "Offert" },
  { value: "broken", label: "Cassé" },
  { value: "spoiled", label: "Abîmé" },
  { value: "other", label: "Autre" }
];

const MyCave = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [wines, setWines] = useState(mockWines);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [filterType, setFilterType] = useState("all");
  const [selectedWine, setSelectedWine] = useState(null);
  const [wineToRemove, setWineToRemove] = useState(null);
  const [removalReason, setRemovalReason] = useState("");
  const [showRemovalDialog, setShowRemovalDialog] = useState(false);

  // Filtrage et tri des vins
  const filteredAndSortedWines = wines
    .filter(wine => {
      const matchesSearch = wine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           wine.region.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           wine.winery.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = filterType === "all" || wine.type === filterType;
      return matchesSearch && matchesType;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "rating":
          return b.rating - a.rating;
        case "vintage":
          return b.vintage.localeCompare(a.vintage);
        case "price":
          return parseFloat(a.price.replace(/[€$]/g, "")) - parseFloat(b.price.replace(/[€$]/g, ""));
        case "date":
          return new Date(b.tastingDate).getTime() - new Date(a.tastingDate).getTime();
        default:
          return 0;
      }
    });

  const handleRemoveWine = (wine, reason) => {
    setWineToRemove(wine);
    setRemovalReason(reason);
    setShowRemovalDialog(true);
  };

  const confirmRemoval = () => {
    if (wineToRemove) {
      setWines(wines.filter(wine => wine.id !== wineToRemove.id));
      const reasonLabel = removalReasons.find(r => r.value === removalReason)?.label || removalReason;
      toast({
        title: "Bouteille supprimée",
        description: `${wineToRemove.name} a été supprimé de votre cave (${reasonLabel.toLowerCase()}).`,
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
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-slate-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Barre de navigation et titre */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Retour
          </Button>
          
          <h1 className="text-3xl font-bold text-red-900 flex items-center gap-2">
            <Wine size={32} />
            Ma Cave
          </h1>
          
          <div className="text-sm text-red-700">
            {filteredAndSortedWines.length} vin{filteredAndSortedWines.length !== 1 ? 's' : ''}
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Rechercher par nom, région, producteur..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Type de vin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Tous les types</SelectItem>
                  <SelectItem value="red">Rouge</SelectItem>
                  <SelectItem value="white">Blanc</SelectItem>
                  <SelectItem value="rose">Rosé</SelectItem>
                  <SelectItem value="sparkling">Pétillant</SelectItem>
                  <SelectItem value="dessert">Dessert</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Trier par" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Nom</SelectItem>
                  <SelectItem value="rating">Note</SelectItem>
                  <SelectItem value="vintage">Millésime</SelectItem>
                  <SelectItem value="price">Prix</SelectItem>
                  <SelectItem value="date">Date de dégustation</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Grille des vins avec menu contextuel */}
        {filteredAndSortedWines.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Wine className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500 mb-4">
                {searchTerm || filterType !== "all" 
                  ? "Aucun vin trouvé avec ces critères" 
                  : "Votre cave est vide"}
              </p>
              <Button onClick={() => navigate("/add-wine")} className="bg-red-600 hover:bg-red-700">
                Ajouter votre premier vin
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {filteredAndSortedWines.map((wine) => (
              <ContextMenu key={wine.id}>
                <ContextMenuTrigger>
                  <WineCard
                    wine={wine}
                    onClick={() => setSelectedWine(wine)}
                  />
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                  <ContextMenuItem onClick={() => setSelectedWine(wine)}>
                    Voir les détails
                  </ContextMenuItem>
                  <ContextMenuItem 
                    onClick={() => handleRemoveWine(wine, "tasted")}
                    className="text-orange-600"
                  >
                    Supprimer - Dégusté
                  </ContextMenuItem>
                  <ContextMenuItem 
                    onClick={() => handleRemoveWine(wine, "sold")}
                    className="text-green-600"
                  >
                    Supprimer - Vendu
                  </ContextMenuItem>
                  <ContextMenuItem 
                    onClick={() => handleRemoveWine(wine, "gifted")}
                    className="text-blue-600"
                  >
                    Supprimer - Offert
                  </ContextMenuItem>
                  <ContextMenuItem 
                    onClick={() => handleRemoveWine(wine, "broken")}
                    className="text-red-600"
                  >
                    Supprimer - Cassé
                  </ContextMenuItem>
                  <ContextMenuItem 
                    onClick={() => handleRemoveWine(wine, "spoiled")}
                    className="text-red-600"
                  >
                    Supprimer - Abîmé
                  </ContextMenuItem>
                  <ContextMenuItem 
                    onClick={() => handleRemoveWine(wine, "other")}
                    className="text-gray-600"
                  >
                    Supprimer - Autre raison
                  </ContextMenuItem>
                </ContextMenuContent>
              </ContextMenu>
            ))}
          </div>
        )}
      </div>

      {/* Modal pour les détails du vin */}
      {selectedWine && (
        <WineDetailModal
          wine={selectedWine}
          isOpen={!!selectedWine}
          onClose={() => setSelectedWine(null)}
        />
      )}

      {/* Dialog de confirmation pour la suppression */}
      <AlertDialog open={showRemovalDialog} onOpenChange={setShowRemovalDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer "{wineToRemove?.name}" de votre cave ?
              <br />
              <span className="font-medium">
                Raison : {removalReasons.find(r => r.value === removalReason)?.label}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelRemoval}>
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmRemoval}
              className="bg-red-600 hover:bg-red-700"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyCave;
