
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Wine } from "lucide-react";
import WineCard from "../WineCard";
import { useLanguage } from "@/contexts/LanguageContext";

interface Wine {
  id: number;
  name: string;
  type: string;
  vintage: string;
  region: string;
  winery: string;
  rating: number;
  price: string;
  image: string;
  isFavorite: boolean;
  tastingDate: string;
  notes: string;
}

interface WineGridProps {
  wines: Wine[];
  searchTerm: string;
  filterType: string;
  onWineClick: (wine: Wine) => void;
}

const WineGrid = ({ wines, searchTerm, filterType, onWineClick }: WineGridProps) => {
  const { t } = useLanguage();

  if (wines.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <Wine className="mx-auto h-12 w-12 text-gray-400 mb-4" />
          <p className="text-gray-500 mb-4">
            {searchTerm || filterType !== "all" 
              ? t('cave.noWines')
              : t('cave.emptyTitle')}
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
      {wines.map((wine) => (
        <WineCard
          key={wine.id}
          wine={wine}
          onClick={() => onWineClick(wine)}
        />
      ))}
    </div>
  );
};

export default WineGrid;
