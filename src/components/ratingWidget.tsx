import Stars from "./star";

export default function RatingWidget({ rating }: { rating: number }) {
  return (

      <div bg-grey>
        <div className="rounded-md bg-white px-2 py-2 ">
          <text className="text-sky-700 text-sm font-bold "> 
            賣家評分
          </text>
          <div className="h-1">
            <Stars star={rating} />
          </div>
        </div>
      </div>
     
  
  )
}