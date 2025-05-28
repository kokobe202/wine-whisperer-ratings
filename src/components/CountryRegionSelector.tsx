
import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CountryRegionSelectorProps {
  country: string;
  region: string;
  onCountryChange: (country: string) => void;
  onRegionChange: (region: string) => void;
}

const CountryRegionSelector = ({ country, region, onCountryChange, onRegionChange }: CountryRegionSelectorProps) => {
  const countries = {
    "France": ["Bordeaux", "Bourgogne", "Champagne", "Loire", "Rhône", "Languedoc", "Provence", "Alsace"],
    "Italie": ["Toscane", "Piémont", "Vénétie", "Sicile", "Ombrie", "Marches"],
    "Espagne": ["Rioja", "Ribera del Duero", "Priorat", "Jerez", "Rías Baixas"],
    "Allemagne": ["Mosel", "Rheingau", "Pfalz", "Baden", "Württemberg"],
    "États-Unis": ["Californie", "Oregon", "Washington", "New York"],
    "Argentine": ["Mendoza", "Salta", "San Juan", "Patagonie"],
    "Chili": ["Valle Central", "Casablanca", "Colchagua", "Maipo"],
    "Australie": ["Barossa Valley", "Hunter Valley", "Adelaide Hills", "Margaret River"]
  };

  const regions = countries[country] || [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium">Pays *</label>
        <Select value={country} onValueChange={(value) => {
          onCountryChange(value);
          onRegionChange(""); // Reset region when country changes
        }}>
          <SelectTrigger>
            <SelectValue placeholder="Sélectionner le pays" />
          </SelectTrigger>
          <SelectContent>
            {Object.keys(countries).map((countryName) => (
              <SelectItem key={countryName} value={countryName}>
                {countryName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium">Région</label>
        <Select value={region} onValueChange={onRegionChange} disabled={!country}>
          <SelectTrigger>
            <SelectValue placeholder={country ? "Sélectionner la région" : "Choisir d'abord un pays"} />
          </SelectTrigger>
          <SelectContent>
            {regions.map((regionName) => (
              <SelectItem key={regionName} value={regionName}>
                {regionName}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default CountryRegionSelector;
