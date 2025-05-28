
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Wine, Upload, BookOpen, Utensils } from "lucide-react";
import { toast } from "@/components/ui/sonner";
import CountryRegionSelector from "../components/CountryRegionSelector";
import WineRating from "../components/WineRating";

type WineFormData = {
  name: string;
  type: string;
  vintage: string;
  country: string;
  region: string;
  winery: string;
  price: string;
  tastingDate: string;
  isFavorite: boolean;
};

type WineMode = "tasted" | "library" | null;

const AddWine = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch } = useForm<WineFormData>();
  const [mode, setMode] = useState<WineMode>(null);
  const [rating, setRating] = useState(0);
  const [country, setCountry] = useState("");
  const [region, setRegion] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  // Set today's date as default
  React.useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setValue("tastingDate", today);
  }, [setValue]);

  const onImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        setImagePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: WineFormData) => {
    const wineData = {
      ...data,
      country,
      region,
      mode,
      rating: mode === "tasted" ? rating : undefined,
      image: imagePreview
    };
    
    console.log(wineData);
    
    toast.success(mode === "tasted" ? "Vin dégusté ajouté avec succès!" : "Vin ajouté à votre bibliothèque!");
    navigate("/my-cave");
  };

  const resetForm = () => {
    setMode(null);
    setRating(0);
    setCountry("");
    setRegion("");
    setImagePreview(null);
  };

  if (mode === null) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-rose-50 to-slate-100 py-8 px-4">
        <div className="max-w-2xl mx-auto">
          <Button 
            variant="ghost" 
            className="mb-6" 
            onClick={() => navigate("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour
          </Button>
          
          <Card className="overflow-hidden">
            <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white text-center">
              <CardTitle className="text-2xl flex items-center justify-center gap-2">
                <Wine size={24} /> Ajouter un Vin
              </CardTitle>
              <CardDescription className="text-red-100">
                Choisissez le type d'ajout
              </CardDescription>
            </CardHeader>
            
            <CardContent className="pt-8 pb-8">
              <div className="space-y-4">
                <Button
                  onClick={() => setMode("tasted")}
                  className="w-full py-8 text-lg flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700 transition-all duration-200 hover:scale-105"
                  size="lg"
                >
                  <Utensils size={24} />
                  <div className="text-left">
                    <div className="font-semibold">Déjà dégusté</div>
                    <div className="text-sm opacity-90">Ajouter une expérience de dégustation</div>
                  </div>
                </Button>

                <Button
                  onClick={() => setMode("library")}
                  className="w-full py-8 text-lg flex items-center justify-center gap-3 bg-red-700 hover:bg-red-800 transition-all duration-200 hover:scale-105"
                  size="lg"
                >
                  <BookOpen size={24} />
                  <div className="text-left">
                    <div className="font-semibold">À ajouter dans ma bibliothèque</div>
                    <div className="text-sm opacity-90">Ajouter un vin à déguster plus tard</div>
                  </div>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={resetForm}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour
        </Button>
        
        <Card className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-red-600 to-red-700 text-white">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Wine size={24} /> 
              {mode === "tasted" ? "Vin Dégusté" : "Ajouter à ma Bibliothèque"}
            </CardTitle>
            <CardDescription className="text-red-100">
              {mode === "tasted" 
                ? "Enregistrez votre expérience de dégustation" 
                : "Ajoutez un vin à votre collection"
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <form id="wine-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Photo du vin */}
              <div className="space-y-3">
                <Label htmlFor="wine-image" className="text-base font-semibold">Photo du Vin</Label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-red-200 rounded-lg p-6 bg-red-50 hover:bg-red-100 transition-colors">
                  {imagePreview ? (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Aperçu du vin" 
                        className="h-48 object-contain mb-2 rounded-lg"
                      />
                      <Button 
                        type="button" 
                        variant="destructive" 
                        size="sm"
                        className="absolute -top-2 -right-2" 
                        onClick={() => setImagePreview(null)}
                      >
                        ×
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-red-400" />
                      <div className="mt-2 text-sm text-red-600">
                        <label htmlFor="file-upload" className="cursor-pointer font-medium hover:text-red-500">
                          Télécharger une photo
                        </label> ou glisser-déposer
                      </div>
                    </div>
                  )}
                  <Input 
                    id="file-upload" 
                    type="file" 
                    onChange={onImageChange} 
                    className="hidden" 
                    accept="image/*"
                  />
                </div>
              </div>

              {/* Informations de base */}
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-base font-semibold">Nom du Vin *</Label>
                  <Input 
                    id="name" 
                    {...register("name", { required: true })} 
                    placeholder="ex. Château Margaux"
                    className="text-lg"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type" className="text-base font-semibold">Type de Vin *</Label>
                  <Select onValueChange={(value) => setValue("type", value)}>
                    <SelectTrigger id="type" className="text-lg">
                      <SelectValue placeholder="Sélectionner le type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="red">🍷 Rouge</SelectItem>
                        <SelectItem value="white">🥂 Blanc</SelectItem>
                        <SelectItem value="rose">🌹 Rosé</SelectItem>
                        <SelectItem value="sparkling">🍾 Pétillant</SelectItem>
                        <SelectItem value="dessert">🍯 Dessert</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <CountryRegionSelector
                  country={country}
                  region={region}
                  onCountryChange={setCountry}
                  onRegionChange={setRegion}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="vintage" className="text-base font-semibold">Millésime</Label>
                    <Input id="vintage" {...register("vintage")} placeholder="ex. 2018" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price" className="text-base font-semibold">Prix</Label>
                    <Input id="price" {...register("price")} placeholder="ex. 45€" />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="winery" className="text-base font-semibold">Domaine/Producteur</Label>
                  <Input id="winery" {...register("winery")} placeholder="ex. Château Margaux" />
                </div>

                {mode === "tasted" && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="tastingDate" className="text-base font-semibold">Date de dégustation</Label>
                      <Input id="tastingDate" type="date" {...register("tastingDate")} />
                    </div>

                    <div className="space-y-3">
                      <Label className="text-base font-semibold">Note</Label>
                      <div className="flex items-center justify-center p-4 bg-gray-50 rounded-lg">
                        <WineRating rating={rating} onRatingChange={setRating} size={36} />
                      </div>
                    </div>
                  </>
                )}

                <div className="flex items-center space-x-2 p-4 bg-gray-50 rounded-lg">
                  <Checkbox 
                    id="isFavorite"
                    onCheckedChange={(checked) => {
                      setValue("isFavorite", checked as boolean);
                    }}
                  />
                  <Label htmlFor="isFavorite" className="text-base font-medium">
                    ⭐ Ajouter aux favoris
                  </Label>
                </div>
              </div>
            </form>
          </CardContent>
          
          <CardFooter className="flex justify-end space-x-4 border-t p-6 bg-gray-50">
            <Button variant="outline" onClick={resetForm}>Annuler</Button>
            <Button type="submit" form="wine-form" className="bg-red-600 hover:bg-red-700">
              {mode === "tasted" ? "Enregistrer la dégustation" : "Ajouter à ma bibliothèque"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AddWine;
