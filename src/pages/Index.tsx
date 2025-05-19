
import React from "react";
import { Button } from "@/components/ui/button";
import { Plus, Users, Settings } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/sonner";

const Index = () => {
  const navigate = useNavigate();

  const handleAddClick = () => {
    toast("Add functionality coming soon");
  };

  const handleCommunityClick = () => {
    toast("Community page coming soon");
  };

  const handleSettingsClick = () => {
    toast("Settings page coming soon");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Welcome to Your App</h1>
        <p className="text-xl text-gray-600 max-w-md mx-auto">
          Get started by using one of the options below
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-3xl px-4">
        <Button
          onClick={handleAddClick}
          className="flex-1 py-8 text-lg flex flex-col items-center gap-4"
          size="lg"
        >
          <Plus size={28} />
          <span>Add New</span>
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
    </div>
  );
};

export default Index;
