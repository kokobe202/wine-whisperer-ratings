
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
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
import { ArrowLeft, Star, Wine, Upload, BookOpen, Utensils } from "lucide-react";
import { toast } from "@/components/ui/sonner";

type WineFormData = {
  name: string;
  type: string;
  vintage: string;
  region: string;
  winery: string;
  grapes: string;
  price: string;
  purchaseLocation: string;
  tastingDate: string;
  notes: string;
  foodPairings: string;
  isFavorite: boolean;
  tastingExperience?: string;
};

type WineMode = "tasted" | "library" | null;

const AddWine = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch } = useForm<WineFormData>();
  const [mode, setMode] = useState<WineMode>(null);
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [sweetness, setSweetness] = useState([50]);
  const [body, setBody] = useState([50]);
  const [tannin, setTannin] = useState([50]);
  const [acidity, setAcidity] = useState([50]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  
  const wineType = watch("type");

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
      mode,
      rating: mode === "tasted" ? rating : undefined,
      sweetness: mode === "tasted" ? sweetness[0] : undefined,
      body: mode === "tasted" ? body[0] : undefined,
      tannin: mode === "tasted" ? tannin[0] : undefined,
      acidity: mode === "tasted" ? acidity[0] : undefined,
      image: imagePreview
    };
    
    console.log(wineData);
    
    toast.success(mode === "tasted" ? "Vin dégusté ajouté avec succès!" : "Vin ajouté à votre bibliothèque!");
    navigate("/");
  };

  const resetForm = () => {
    setMode(null);
    setRating(0);
    setHoverRating(0);
    setSweetness([50]);
    setBody([50]);
    setTannin([50]);
    setAcidity([50]);
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
          
          <Card>
            <CardHeader className="bg-red-600 text-white rounded-t-lg text-center">
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
                  className="w-full py-8 text-lg flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700"
                  size="lg"
                >
                  <Utensils size={24} />
                  <div className="text-left">
                    <div className="font-semibold">Déjà dégusté</div>
                    <div className="text-sm opacity-90">Ajouter une expérience de dégustation complète</div>
                  </div>
                </Button>

                <Button
                  onClick={() => setMode("library")}
                  className="w-full py-8 text-lg flex items-center justify-center gap-3 bg-red-700 hover:bg-red-800"
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
        
        <Card>
          <CardHeader className="bg-red-600 text-white rounded-t-lg">
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
              {/* Wine Image */}
              <div className="space-y-2">
                <Label htmlFor="wine-image">Photo du Vin</Label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                  {imagePreview ? (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Aperçu du vin" 
                        className="h-48 object-contain mb-2"
                      />
                      <Button 
                        type="button" 
                        variant="destructive" 
                        size="sm"
                        className="absolute top-0 right-0" 
                        onClick={() => setImagePreview(null)}
                      >
                        Supprimer
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-2 text-sm text-gray-500">
                        <label htmlFor="file-upload" className="cursor-pointer text-red-600 hover:text-red-500">
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

              {/* Basic Wine Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nom du Vin *</Label>
                  <Input id="name" {...register("name", { required: true })} placeholder="ex. Château Margaux" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Type de Vin *</Label>
                  <Select onValueChange={(value) => setValue("type", value)}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Sélectionner le type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="red">Rouge</SelectItem>
                        <SelectItem value="white">Blanc</SelectItem>
                        <SelectItem value="rose">Rosé</SelectItem>
                        <SelectItem value="sparkling">Pétillant</SelectItem>
                        <SelectItem value="dessert">Dessert</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="vintage">Millésime</Label>
                  <Input id="vintage" {...register("vintage")} placeholder="ex. 2018" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="region">Région</Label>
                  <Input id="region" {...register("region")} placeholder="ex. Bordeaux, France" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="winery">Domaine/Producteur</Label>
                  <Input id="winery" {...register("winery")} placeholder="ex. Château Margaux" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="grapes">Cépages</Label>
                  <Input id="grapes" {...register("grapes")} placeholder="ex. Cabernet Sauvignon, Merlot" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Prix</Label>
                  <Input id="price" {...register("price")} placeholder="ex. 45€" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="purchaseLocation">Lieu d'achat</Label>
                  <Input id="purchaseLocation" {...register("purchaseLocation")} placeholder="ex. Cave à vin" />
                </div>
              </div>

              {mode === "tasted" && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="tastingDate">Date de dégustation</Label>
                    <Input id="tastingDate" type="date" {...register("tastingDate")} />
                  </div>

                  {/* Rating */}
                  <div className="space-y-2">
                    <Label>Note</Label>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={28}
                          className={`cursor-pointer ${
                            star <= (hoverRating || rating) ? "text-red-500 fill-red-500" : "text-gray-300"
                          }`}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Characteristics */}
                  <div className="space-y-4">
                    <Label>Caractéristiques du Vin</Label>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Sec</span>
                        <span>Douceur</span>
                        <span>Sucré</span>
                      </div>
                      <Slider 
                        value={sweetness} 
                        onValueChange={setSweetness}
                        max={100}
                        step={1}
                        className="mb-6"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Léger</span>
                        <span>Corps</span>
                        <span>Corsé</span>
                      </div>
                      <Slider 
                        value={body} 
                        onValueChange={setBody}
                        max={100}
                        step={1}
                        className="mb-6"
                      />
                    </div>

                    {wineType === "red" && (
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Faible</span>
                          <span>Tanins</span>
                          <span>Élevé</span>
                        </div>
                        <Slider 
                          value={tannin} 
                          onValueChange={setTannin}
                          max={100}
                          step={1}
                          className="mb-6"
                        />
                      </div>
                    )}
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Souple</span>
                        <span>Acidité</span>
                        <span>Vive</span>
                      </div>
                      <Slider 
                        value={acidity} 
                        onValueChange={setAcidity}
                        max={100}
                        step={1}
                        className="mb-6"
                      />
                    </div>
                  </div>

                  {/* Notes & Food Pairings */}
                  <div className="space-y-2">
                    <Label htmlFor="notes">Notes de dégustation</Label>
                    <Textarea 
                      id="notes" 
                      {...register("notes")} 
                      placeholder="Décrivez l'arôme, le goût, la finale, etc."
                      className="min-h-[100px]"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="foodPairings">Accords mets-vins</Label>
                    <Textarea 
                      id="foodPairings" 
                      {...register("foodPairings")} 
                      placeholder="ex. Viande grillée, fromages affinés"
                    />
                  </div>

                  {/* Tasting Experience */}
                  <div className="space-y-2">
                    <Label htmlFor="tastingExperience">Expérience de dégustation</Label>
                    <Textarea 
                      id="tastingExperience" 
                      {...register("tastingExperience")} 
                      placeholder="Décrivez le contexte, l'occasion, vos impressions générales..."
                      className="min-h-[120px]"
                    />
                  </div>
                </>
              )}

              {/* Favorite */}
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="isFavorite"
                  onCheckedChange={(checked) => {
                    setValue("isFavorite", checked as boolean);
                  }}
                />
                <Label htmlFor="isFavorite" className="text-sm font-normal">
                  Ajouter aux favoris
                </Label>
              </div>
            </form>
          </CardContent>
          
          <CardFooter className="flex justify-end space-x-4 border-t p-6">
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
