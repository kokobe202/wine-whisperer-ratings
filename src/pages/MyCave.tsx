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
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { ArrowLeft, Search, Star, Wine, Filter, ChevronDown } from "lucide-react";
import WineCard from "../components/WineCard";
import WineDetailModal from "../components/WineDetailModal";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/contexts/LanguageContext";
import { useCommunity } from "@/contexts/CommunityContext";

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

const MyCave = () => {
  const navigate = useNavigate();
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
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [actionWine, setActionWine] = useState(null);

  const removalReasons = [
    { value: "tasted", label: t('wine.tasted') },
    { value: "sold", label: t('wine.sold') },
    { value: "gifted", label: t('wine.gifted') },
    { value: "broken", label: t('wine.broken') },
    { value: "spoiled", label: t('wine.spoiled') },
    { value: "other", label: t('wine.other') }
  ];

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

  const handleWineCardClick = (wine) => {
    setActionWine(wine);
    setShowActionDialog(true);
  };

  const handleAddTasting = () => {
    setShowActionDialog(false);
    toast({
      title: t('toast.addTastingTitle'),
      description: `${t('toast.addTastingDesc')} ${actionWine?.name}`,
    });
  };

  const handleRemoveWine = (wine, reason) => {
    setWineToRemove(wine);
    setRemovalReason(reason);
    setShowActionDialog(false);
    setShowRemovalDialog(true);
  };

  const confirmRemoval = () => {
    if (wineToRemove) {
      setWines(wines.filter(wine => wine.id !== wineToRemove.id));
      const reasonLabel = removalReasons.find(r => r.value === removalReason)?.label || removalReason;
      
      // Add activity to community
      addActivity({
        username: "Utilisateur", // In a real app, this would be the current user's name
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
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-slate-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Barre de navigation et titre */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> {t('nav.back')}
          </Button>
          
          <h1 className="text-3xl font-bold text-red-900 flex items-center gap-2">
            <Wine size={32} />
            {t('cave.title')}
          </h1>
          
          <div className="text-sm text-red-700">
            {filteredAndSortedWines.length} {filteredAndSortedWines.length !== 1 ? t('cave.wineCountPlural') : t('cave.wineCount')}
          </div>
        </div>

        {/* Barre de recherche et filtres */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder={t('cave.searchPlaceholder')}
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
                  <SelectItem value="all">{t('cave.allTypes')}</SelectItem>
                  <SelectItem value="red">{t('cave.red')}</SelectItem>
                  <SelectItem value="white">{t('cave.white')}</SelectItem>
                  <SelectItem value="rose">{t('cave.rose')}</SelectItem>
                  <SelectItem value="sparkling">{t('cave.sparkling')}</SelectItem>
                  <SelectItem value="dessert">{t('cave.dessert')}</SelectItem>
                </SelectContent>
              </Select>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder={t('cave.sortBy')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">{t('cave.name')}</SelectItem>
                  <SelectItem value="rating">{t('cave.rating')}</SelectItem>
                  <SelectItem value="vintage">{t('cave.vintage')}</SelectItem>
                  <SelectItem value="price">{t('cave.price')}</SelectItem>
                  <SelectItem value="date">{t('cave.date')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Grille des vins */}
        {filteredAndSortedWines.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <Wine className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-500 mb-4">
                {searchTerm || filterType !== "all" 
                  ? t('cave.noWines')
                  : t('cave.emptyTitle')}
              </p>
              <Button onClick={() => navigate("/add-wine")} className="bg-red-600 hover:bg-red-700">
                {t('cave.addFirstWine')}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
            {filteredAndSortedWines.map((wine) => (
              <WineCard
                key={wine.id}
                wine={wine}
                onClick={() => handleWineCardClick(wine)}
              />
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

      {/* Dialog d'actions pour le vin */}
      <Dialog open={showActionDialog} onOpenChange={setShowActionDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('wine.actions')} {actionWine?.name}</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <Button
              onClick={() => setSelectedWine(actionWine)}
              variant="outline"
              className="w-full"
            >
              {t('wine.viewDetails')}
            </Button>
            
            <Button
              onClick={handleAddTasting}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {t('wine.addTasting')}
            </Button>
            
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="w-full">
                  {t('wine.removeFromCave')}
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full">
                <DropdownMenuItem 
                  onClick={() => handleRemoveWine(actionWine, "tasted")}
                  className="text-orange-600"
                >
                  {t('wine.tasted')}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleRemoveWine(actionWine, "sold")}
                  className="text-green-600"
                >
                  {t('wine.sold')}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleRemoveWine(actionWine, "gifted")}
                  className="text-blue-600"
                >
                  {t('wine.gifted')}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleRemoveWine(actionWine, "broken")}
                  className="text-red-600"
                >
                  {t('wine.broken')}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleRemoveWine(actionWine, "spoiled")}
                  className="text-red-600"
                >
                  {t('wine.spoiled')}
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => handleRemoveWine(actionWine, "other")}
                  className="text-gray-600"
                >
                  {t('wine.other')}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialog de confirmation pour la suppression */}
      <AlertDialog open={showRemovalDialog} onOpenChange={setShowRemovalDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{t('wine.confirmRemoval')}</AlertDialogTitle>
            <AlertDialogDescription>
              {t('wine.confirmRemovalText')} "{wineToRemove?.name}" de votre cave ?
              <br />
              <span className="font-medium">
                {t('wine.reason')} : {removalReasons.find(r => r.value === removalReason)?.label}
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelRemoval}>
              {t('wine.cancel')}
            </AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmRemoval}
              className="bg-red-600 hover:bg-red-700"
            >
              {t('wine.remove')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default MyCave;
