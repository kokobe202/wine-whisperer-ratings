
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
import { ArrowLeft, Star, Wine, Upload } from "lucide-react";
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
};

const AddWine = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, setValue, watch } = useForm<WineFormData>();
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
    // In a real app, we would save the data to a database
    console.log({
      ...data,
      rating,
      sweetness: sweetness[0],
      body: body[0],
      tannin: tannin[0],
      acidity: acidity[0],
      image: imagePreview
    });
    
    toast.success("Wine added successfully!");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50 to-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Button 
          variant="ghost" 
          className="mb-6" 
          onClick={() => navigate("/")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
        
        <Card>
          <CardHeader className="bg-red-600 text-white rounded-t-lg">
            <CardTitle className="text-2xl flex items-center gap-2">
              <Wine size={24} /> Add New Wine
            </CardTitle>
            <CardDescription className="text-red-100">
              Record your wine tasting experience
            </CardDescription>
          </CardHeader>
          
          <CardContent className="pt-6">
            <form id="wine-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Wine Image */}
              <div className="space-y-2">
                <Label htmlFor="wine-image">Wine Image</Label>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-6 bg-gray-50">
                  {imagePreview ? (
                    <div className="relative">
                      <img 
                        src={imagePreview} 
                        alt="Wine preview" 
                        className="h-48 object-contain mb-2"
                      />
                      <Button 
                        type="button" 
                        variant="destructive" 
                        size="sm"
                        className="absolute top-0 right-0" 
                        onClick={() => setImagePreview(null)}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="text-center">
                      <Upload className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="mt-2 text-sm text-gray-500">
                        <label htmlFor="file-upload" className="cursor-pointer text-red-600 hover:text-red-500">
                          Upload a file
                        </label> or drag and drop
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
                  <Label htmlFor="name">Wine Name *</Label>
                  <Input id="name" {...register("name", { required: true })} placeholder="e.g. Château Margaux" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Wine Type *</Label>
                  <Select onValueChange={(value) => setValue("type", value)}>
                    <SelectTrigger id="type">
                      <SelectValue placeholder="Select wine type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="red">Red</SelectItem>
                        <SelectItem value="white">White</SelectItem>
                        <SelectItem value="rose">Rosé</SelectItem>
                        <SelectItem value="sparkling">Sparkling</SelectItem>
                        <SelectItem value="dessert">Dessert</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="vintage">Vintage</Label>
                  <Input id="vintage" {...register("vintage")} placeholder="e.g. 2018" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="region">Region</Label>
                  <Input id="region" {...register("region")} placeholder="e.g. Bordeaux, France" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="winery">Winery/Producer</Label>
                  <Input id="winery" {...register("winery")} placeholder="e.g. Château Margaux" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="grapes">Grape Varieties</Label>
                  <Input id="grapes" {...register("grapes")} placeholder="e.g. Cabernet Sauvignon, Merlot" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="price">Price</Label>
                  <Input id="price" {...register("price")} placeholder="e.g. $45" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="purchaseLocation">Purchase Location</Label>
                  <Input id="purchaseLocation" {...register("purchaseLocation")} placeholder="e.g. Wine Shop" />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="tastingDate">Tasting Date</Label>
                  <Input id="tastingDate" type="date" {...register("tastingDate")} />
                </div>
              </div>

              {/* Rating */}
              <div className="space-y-2">
                <Label>Rating</Label>
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
                <Label>Wine Characteristics</Label>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Dry</span>
                    <span>Sweetness</span>
                    <span>Sweet</span>
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
                    <span>Light</span>
                    <span>Body</span>
                    <span>Full</span>
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
                      <span>Low</span>
                      <span>Tannin</span>
                      <span>High</span>
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
                    <span>Soft</span>
                    <span>Acidity</span>
                    <span>Crisp</span>
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
                <Label htmlFor="notes">Tasting Notes</Label>
                <Textarea 
                  id="notes" 
                  {...register("notes")} 
                  placeholder="Describe the aroma, taste, finish, etc."
                  className="min-h-[100px]"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="foodPairings">Food Pairings</Label>
                <Textarea 
                  id="foodPairings" 
                  {...register("foodPairings")} 
                  placeholder="e.g. Grilled steak, aged cheeses"
                />
              </div>

              {/* Favorite */}
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="isFavorite"
                  onCheckedChange={(checked) => {
                    setValue("isFavorite", checked as boolean);
                  }}
                />
                <Label htmlFor="isFavorite" className="text-sm font-normal">
                  Save to favorites
                </Label>
              </div>
            </form>
          </CardContent>
          
          <CardFooter className="flex justify-end space-x-4 border-t p-6">
            <Button variant="outline" onClick={() => navigate("/")}>Cancel</Button>
            <Button type="submit" form="wine-form" className="bg-red-600 hover:bg-red-700">
              Save Wine
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default AddWine;
