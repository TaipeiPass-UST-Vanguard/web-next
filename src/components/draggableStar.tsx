import { useState, useRef } from 'react';
import { FaStar } from 'react-icons/fa';

// Star component that takes an `x` value (0 to 1) for percentage of yellow fill
function Star({ x }: { x: number }) {
  const percentage = Math.min(1, Math.max(0, x)) * 100; // Convert x (0 to 1) to percentage

  return (
    <div className="relative inline-block text-lg w-6 h-6"> {/* Ensure consistent height and size */}
      {/* Full grey star as background */}
      <FaStar className="text-gray-200 relative" style={{ zIndex: 1 }} />

      {/* Partially yellow star on top */}
      <FaStar
        className="text-yellow-500 absolute top-0 left-0"
        style={{
          clipPath: `inset(0 ${100 - percentage}% 0 0)`,
          zIndex: 2 // Ensure the partially filled star is on top
        }}
      />
    </div>
  );
}

// Stars component with tap and drag rating feature
export default function DraggableStars({ initialRating }: { initialRating: number }) {
  const [rating, setRating] = useState(initialRating); // State for rating
  const [isDragging, setIsDragging] = useState(false); // State to track if dragging is happening
  const containerRef = useRef<HTMLDivElement | null>(null); // Ref to track star container

  // Function to update the rating based on mouse or touch position
  const updateRatingFromPosition = (clientX: number) => {
    if (!containerRef.current) return;

    const { left, width } = containerRef.current.getBoundingClientRect();
    const relativeX = clientX - left; // Calculate the position within the star container
    const newRating = Math.ceil((relativeX / width) * 5); // Convert the position to a 1-5 rating
    setRating(Math.max(1, Math.min(5, newRating))); // Ensure the rating stays within 1-5
  };

  // Function to handle click/tap on a specific star
  const updateRatingFromClick = (index: number) => {
    setRating(index + 1); // Update rating directly based on star index (1 to 5)
  };

  // Handle mouse/touch events for dragging
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

  // Create an array of 5 stars based on the current rating
  const starsArray = Array.from({ length: 5 }, (_, index) => {
    const fillLevel = Math.max(0, Math.min(1, rating - index)); // Determine how much of each star should be filled
    return (
      <div
        key={index}
        onClick={() => updateRatingFromClick(index)} // Handle tap/click for each star
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
}
