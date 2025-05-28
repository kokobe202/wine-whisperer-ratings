
import { useMemo } from "react";

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

export const useWineFiltering = (
  wines: Wine[],
  searchTerm: string,
  filterType: string,
  sortBy: string
) => {
  return useMemo(() => {
    return wines
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
  }, [wines, searchTerm, filterType, sortBy]);
};
