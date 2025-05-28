
import React from "react";
import { Wine } from "lucide-react";

interface WineRatingProps {
  rating: number;
  onRatingChange: (rating: number) => void;
  size?: number;
}

const WineRating = ({ rating, onRatingChange, size = 28 }: WineRatingProps) => {
  const [hoverRating, setHoverRating] = React.useState(0);

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((bottle) => (
        <Wine
          key={bottle}
          size={size}
          className={`cursor-pointer transition-colors ${
            bottle <= (hoverRating || rating) 
              ? "text-red-500 fill-red-500" 
              : "text-gray-300"
          }`}
          onClick={() => onRatingChange(bottle)}
          onMouseEnter={() => setHoverRating(bottle)}
          onMouseLeave={() => setHoverRating(0)}
        />
      ))}
    </div>
  );
};

export default WineRating;
