
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Users, Settings, Wine, Star, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

const Index = () => {
  const navigate = useNavigate();

  const handleAddWineClick = () => {
    navigate("/add-wine");
  };

  const handleMyCaveClick = () => {
    navigate("/my-cave");
  };

  const handleCommunityClick = () => {
    toast("Wine community page coming soon");
  };

  const handleSettingsClick = () => {
    toast("Settings page coming soon");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-rose-50 to-slate-100">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 text-red-900">Wine Journal</h1>
        <p className="text-xl text-red-700 max-w-md mx-auto">
          Track your wine experiences and share your favorites
        </p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-md px-4">
        <Button
          onClick={handleAddWineClick}
          className="py-8 text-lg flex items-center justify-center gap-3 bg-red-600 hover:bg-red-700"
          size="lg"
        >
          <Plus size={24} />
          <span>Add Wine</span>
        </Button>

        <Button
          onClick={handleMyCaveClick}
          className="py-8 text-lg flex items-center justify-center gap-3 bg-red-700 hover:bg-red-800"
          size="lg"
        >
          <BookOpen size={24} />
          <span>Ma Cave</span>
        </Button>

        <Button
          onClick={handleCommunityClick}
          className="py-8 text-lg flex items-center justify-center gap-3"
          variant="secondary"
          size="lg"
        >
          <Users size={24} />
          <span>Community</span>
        </Button>

        <Button
          onClick={handleSettingsClick}
          className="py-8 text-lg flex items-center justify-center gap-3"
          variant="outline"
          size="lg"
        >
          <Settings size={24} />
          <span>Settings</span>
        </Button>
      </div>

      <div className="mt-12 px-4 py-6 bg-white rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-4 text-red-800">Recent Wines</h2>
        <div className="text-center text-gray-500 italic">
          Your recently added wines will appear here
        </div>
        <div className="flex justify-center mt-4">
          <div className="flex space-x-1">
            <Star className="text-red-500" size={20} />
            <Star className="text-red-500" size={20} />
            <Star className="text-red-500" size={20} />
            <Star className="text-gray-300" size={20} />
            <Star className="text-gray-300" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
