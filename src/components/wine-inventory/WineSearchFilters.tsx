
import React from "react";
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
  CardContent 
} from "@/components/ui/card";
import { Search, Filter } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

interface WineSearchFiltersProps {
  searchTerm: string;
  filterType: string;
  sortBy: string;
  onSearchChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  onSortChange: (value: string) => void;
}

const WineSearchFilters = ({
  searchTerm,
  filterType,
  sortBy,
  onSearchChange,
  onFilterChange,
  onSortChange
}: WineSearchFiltersProps) => {
  const { t } = useLanguage();

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              placeholder={t('cave.searchPlaceholder')}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={filterType} onValueChange={onFilterChange}>
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
          
          <Select value={sortBy} onValueChange={onSortChange}>
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
  );
};

export default WineSearchFilters;
