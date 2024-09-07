



export default function SearchPopDialog({ isVisible, items }: { isVisible: boolean, items: []}){
  
 
  
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-end">
      <div className="bg-white w-full rounded-t-2xl p-4">
        <div className="flex justify-end">
          <button onClick={()=>{isVisible=false}} className="text-gray-500">✖ Close</button>
        </div>

        {/* List of items */}
        <div className="space-y-4">
          {items.map((item, index) => (
            <div key={index} className="p-4 bg-gray-100 rounded-lg">
              <h2 className="text-lg font-bold">{}</h2>
              <div className="flex flex-wrap space-x-2 mt-2">
                
              </div>
              <div className="flex items-center justify-end mt-2">
                <span className="text-blue-500 flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M16.88 3.549l2.122 2.121a5.5 5.5 0 010 7.778l-9.193 9.193a3 3 0 01-4.242 0l-2.12-2.121a5.5 5.5 0 010-7.779l9.193-9.193a3 3 0 014.243 0z"
                    />
                  </svg>
                
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

}