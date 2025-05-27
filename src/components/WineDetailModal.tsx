
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, MapPin, Calendar, DollarSign, Wine } from "lucide-react";

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

interface WineDetailModalProps {
  wine: Wine;
  isOpen: boolean;
  onClose: () => void;
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

const WineDetailModal = ({ wine, isOpen, onClose }: WineDetailModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Wine className="h-5 w-5 text-red-600" />
              Détails du vin
            </span>
            {wine.isFavorite && (
              <Heart className="h-5 w-5 text-red-500 fill-red-500" />
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Image */}
          <div className="space-y-4">
            <img
              src={wine.image}
              alt={wine.name}
              className="w-full h-64 object-cover rounded-lg bg-gray-100"
            />
            <Badge className={getWineTypeColor(wine.type)}>
              {getWineTypeLabel(wine.type)}
            </Badge>
          </div>

          {/* Informations */}
          <div className="space-y-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {wine.name}
              </h2>
              <p className="text-lg text-gray-600">{wine.winery}</p>
            </div>

            {/* Note */}
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Note:</span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-4 w-4 ${
                      star <= wine.rating 
                        ? "text-red-500 fill-red-500" 
                        : "text-gray-300"
                    }`}
                  />
                ))}
                <span className="ml-1 text-sm font-medium">
                  ({wine.rating}/5)
                </span>
              </div>
            </div>

            {/* Informations détaillées */}
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Millésime:</span>
                <span>{wine.vintage}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Région:</span>
                <span>{wine.region}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <DollarSign className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Prix:</span>
                <span className="font-semibold text-red-700">{wine.price}</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-gray-500" />
                <span className="font-medium">Date de dégustation:</span>
                <span>{new Date(wine.tastingDate).toLocaleDateString('fr-FR')}</span>
              </div>
            </div>

            {/* Notes de dégustation */}
            {wine.notes && (
              <div className="space-y-2">
                <h3 className="font-medium">Notes de dégustation:</h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {wine.notes}
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-6 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            Fermer
          </Button>
          <Button className="bg-red-600 hover:bg-red-700">
            Modifier
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default WineDetailModal;
