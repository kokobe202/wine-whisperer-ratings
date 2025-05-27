
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Heart } from "lucide-react";

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
}

interface WineCardProps {
  wine: Wine;
  onClick: () => void;
}

const getWineTypeColor = (type: string) => {
  switch (type) {
    case "red":
      return "bg-red-100 text-red-800";
    case "white":
      return "bg-yellow-100 text-yellow-800";
    case "rose":
      return "bg-pink-100 text-pink-800";
    case "sparkling":
      return "bg-blue-100 text-blue-800";
    case "dessert":
      return "bg-purple-100 text-purple-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const getWineTypeLabel = (type: string) => {
  switch (type) {
    case "red":
      return "Rouge";
    case "white":
      return "Blanc";
    case "rose":
      return "Rosé";
    case "sparkling":
      return "Pétillant";
    case "dessert":
      return "Dessert";
    default:
      return type;
  }
};

const WineCard = ({ wine, onClick }: WineCardProps) => {
  return (
    <Card 
      className="cursor-pointer hover:shadow-lg transition-shadow duration-200 group"
      onClick={onClick}
    >
      <CardContent className="p-3">
        {/* Image du vin */}
        <div className="relative mb-3">
          <img
            src={wine.image}
            alt={wine.name}
            className="w-full h-32 sm:h-40 object-cover rounded-md bg-gray-100"
          />
          {wine.isFavorite && (
            <Heart 
              className="absolute top-2 right-2 h-4 w-4 text-red-500 fill-red-500" 
            />
          )}
          <div className={`absolute bottom-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${getWineTypeColor(wine.type)}`}>
            {getWineTypeLabel(wine.type)}
          </div>
        </div>

        {/* Informations du vin */}
        <div className="space-y-2">
          <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-red-700 transition-colors">
            {wine.name}
          </h3>
          
          <p className="text-xs text-gray-600 line-clamp-1">
            {wine.winery}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-gray-500">
              {wine.vintage}
            </span>
            <div className="flex items-center gap-1">
              <Star className="h-3 w-3 text-red-500 fill-red-500" />
              <span className="text-xs font-medium">{wine.rating}</span>
            </div>
          </div>
          
          <p className="text-xs text-gray-600 line-clamp-1">
            {wine.region}
          </p>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-red-700">
              {wine.price}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WineCard;
