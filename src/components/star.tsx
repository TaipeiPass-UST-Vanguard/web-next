import { FaStar } from 'react-icons/fa';

// Star component that takes an `x` value (0 to 1) for percentage of yellow fill
function Star({ x }: {x:number}) {
  const percentage = Math.min(1, Math.max(0, x)) * 100; // Convert x (0 to 1) to percentage

  return (
    <div className="relative inline-block text-3xl w-7">
      {/* Full black star as background */}
      <FaStar className="text-black absolute top-0 left-0" />
      
      {/* Partially yellow star on top */}
      <FaStar
        className="text-yellow-500 absolute top-0 left-0"
        style={{ clipPath: `inset(0 ${100 - percentage}% 0 0)` }} 
      />
    </div>
  );
}


// Stars component that takes a `star` rating (0 to 5)
export default function Stars({ star }: {star: number}) {
  // Array of 5 stars, each either fully filled or partially filled based on `star` rating
  const starsArray = Array.from({ length: 5 }, (_, index) => {
    const fillLevel = Math.max(0, Math.min(1, star - index)); // Determine how much of the star should be filled
    return <Star key={index} x={fillLevel} />;
  });

  return (
    <div className="flex space-x-1">
      {starsArray}
    </div>
  );
}
