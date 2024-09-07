import { useState, useRef } from 'react';
import { FaStar } from 'react-icons/fa';

// Star component that takes an `x` value (0 to 1) for percentage of yellow fill
function Star({ x }: { x: number }) {
  const percentage = Math.min(1, Math.max(0, x)) * 100; // Convert x (0 to 1) to percentage

  return (
    <div className="relative inline-block text-lg w-12 h-12"> {/* Ensure consistent height and size */}
      {/* Full grey star as background */}
      <FaStar size={50} className="text-gray-200 relative" style={{ zIndex: 1 }} />

      {/* Partially yellow star on top */}
      <FaStar
        size={50}
        className="text-yellow-500 absolute top-0 left-0"
        style={{
          clipPath: `inset(0 ${100 - percentage}% 0 0)`,
          zIndex: 2 // Ensure the partially filled star is on top
        }}
      />
    </div>
  );
}


interface DraggableStarsProps {
  initialRating: number;
  onRatingChange: (newRating: number) => void; // Add a callback for rating change
}

const DraggableStars: React.FC<DraggableStarsProps> = ({ initialRating, onRatingChange }) => {
  const [rating, setRating] = useState(initialRating);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const updateRatingFromPosition = (clientX: number) => {
    if (!containerRef.current) return;

    const { left, width } = containerRef.current.getBoundingClientRect();
    const relativeX = clientX - left;
    const newRating = Math.ceil((relativeX / width) * 5);
    const finalRating = Math.max(1, Math.min(5, newRating));
    
    setRating(finalRating);
    onRatingChange(finalRating); // Call the callback when the rating changes
  };

  const updateRatingFromClick = (index: number) => {
    const newRating = index + 1;
    setRating(newRating);
    onRatingChange(newRating); // Call the callback when the rating changes
  };

  const handleMouseDown = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    updateRatingFromPosition(clientX);
  };

  const handleMouseMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    updateRatingFromPosition(clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const starsArray = Array.from({ length: 5 }, (_, index) => {
    const fillLevel = Math.max(0, Math.min(1, rating - index));
    return (
      <div
        key={index}
        onClick={() => updateRatingFromClick(index)}
        className="cursor-pointer"
      >
        <Star x={fillLevel} />
      </div>
    );
  });

  return (
    <div
      className="space-x-1 flex cursor-pointer"
      ref={containerRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchStart={handleMouseDown}
      onTouchMove={handleMouseMove}
      onTouchEnd={handleMouseUp}
    >
      {starsArray}
    </div>
  );
};

export default DraggableStars;
