
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Wine, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import { useUserWines } from "@/hooks/useWines";
import { toast } from "@/components/ui/sonner";

const AddWine = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { addWineToUser } = useUserWines();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    vintage: "",
    country: "",
    region: "",
    winery: "",
    price: "",
    image_url: "",
    notes: "",
    storage_location: "",
    quantity: 1
  });

  const wineTypes = [
    { value: "red", label: "Rouge" },
    { value: "white", label: "Blanc" },
    { value: "rose", label: "Rosé" },
    { value: "sparkling", label: "Pétillant" },
    { value: "dessert", label: "Dessert" }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.type) {
      toast.error("Veuillez remplir au moins le nom et le type du vin");
      return;
    }

    setLoading(true);
    try {
      await addWineToUser({
        name: formData.name,
        type: formData.type,
        vintage: formData.vintage || null,
        country: formData.country || null,
        region: formData.region || null,
        winery: formData.winery || null,
        price: formData.price || null,
        image_url: formData.image_url || null
      });

      toast.success(`${formData.name} a été ajouté à votre cave !`);
      navigate("/my-cave");
    } catch (error) {
      toast.error("Erreur lors de l'ajout du vin");
      console.error("Erreur:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-slate-100 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="ghost"
            onClick={() => navigate("/")}
            className="flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Retour
          </Button>
          <h1 className="text-3xl font-bold text-red-900 flex items-center gap-3">
            <Wine size={32} />
            {t('addWine.title')}
          </h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus size={20} />
              Ajouter un nouveau vin
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du vin *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Ex: Château Margaux"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="type">Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange("type", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sélectionner le type" />
                    </SelectTrigger>
                    <SelectContent>
                      {wineTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="vintage">Millésime</Label>
                  <Input
                    id="vintage"
                    value={formData.vintage}
                    onChange={(e) => handleInputChange("vintage", e.target.value)}
                    placeholder="Ex: 2020"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="winery">Domaine</Label>
                  <Input
                    id="winery"
                    value={formData.winery}
                    onChange={(e) => handleInputChange("winery", e.target.value)}
                    placeholder="Ex: Château Margaux"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="country">Pays</Label>
                  <Input
                    id="country"
                    value={formData.country}
                    onChange={(e) => handleInputChange("country", e.target.value)}
                    placeholder="Ex: France"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="region">Région</Label>
                  <Input
                    id="region"
                    value={formData.region}
                    onChange={(e) => handleInputChange("region", e.target.value)}
                    placeholder="Ex: Bordeaux"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="price">Prix</Label>
                  <Input
                    id="price"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    placeholder="Ex: 50€"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="storage_location">Emplacement</Label>
                  <Input
                    id="storage_location"
                    value={formData.storage_location}
                    onChange={(e) => handleInputChange("storage_location", e.target.value)}
                    placeholder="Ex: Cave A, Étagère 3"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image_url">URL de l'image</Label>
                <Input
                  id="image_url"
                  value={formData.image_url}
                  onChange={(e) => handleInputChange("image_url", e.target.value)}
                  placeholder="https://exemple.com/image.jpg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="notes">Notes personnelles</Label>
                <Textarea
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => handleInputChange("notes", e.target.value)}
                  placeholder="Vos impressions, notes de dégustation..."
                  rows={3}
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700"
                disabled={loading}
              >
                {loading ? "Ajout en cours..." : "Ajouter à ma cave"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddWine;
