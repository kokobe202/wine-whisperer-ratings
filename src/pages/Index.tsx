
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Users, Settings, Wine, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

const Index = () => {
  const navigate = useNavigate();

  const handleAddWineClick = () => {
    toast("Add wine functionality coming soon");
  };

  const handleCommunityClick = () => {
    toast("Wine community page coming soon");
  };

  const handleSettingsClick = () => {
    toast("Settings page coming soon");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-purple-50 to-slate-100">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 text-purple-900">Wine Journal</h1>
        <p className="text-xl text-purple-700 max-w-md mx-auto">
          Track your wine experiences and share your favorites
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl px-4">
        <Button
          onClick={handleAddWineClick}
          className="flex-1 py-8 text-lg flex flex-col items-center gap-4 bg-purple-600 hover:bg-purple-700"
          size="lg"
        >
          <div className="flex items-center gap-2">
            <Wine size={24} />
            <Plus size={16} className="absolute -top-1 -right-1" />
          </div>
          <span>Add Wine</span>
        </Button>

        <Button
          onClick={handleCommunityClick}
          className="flex-1 py-8 text-lg flex flex-col items-center gap-4"
          variant="secondary"
          size="lg"
        >
          <Users size={28} />
          <span>Community</span>
        </Button>

        <Button
          onClick={handleSettingsClick}
          className="flex-1 py-8 text-lg flex flex-col items-center gap-4"
          variant="outline"
          size="lg"
        >
          <Settings size={28} />
          <span>Settings</span>
        </Button>
      </div>

      <div className="mt-12 px-4 py-6 bg-white rounded-lg shadow-md max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-4 text-purple-800">Recent Wines</h2>
        <div className="text-center text-gray-500 italic">
          Your recently added wines will appear here
        </div>
        <div className="flex justify-center mt-4">
          <div className="flex space-x-1">
            <Star className="text-orange-400" size={20} />
            <Star className="text-orange-400" size={20} />
            <Star className="text-orange-400" size={20} />
            <Star className="text-gray-300" size={20} />
            <Star className="text-gray-300" size={20} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
