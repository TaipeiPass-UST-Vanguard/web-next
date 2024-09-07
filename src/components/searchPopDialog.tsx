"use client";

import StorageGroupUsecase from "@/module/storage/application/storageGroupUsecase";
import StorageGroupRepoImpl from "@/module/storage/presenter/storageGroupRepoImpl";
import { useEffect, useState, useTransition } from "react";
import { Drawer, DrawerContent} from "./ui/drawer";
import CommodityViewModel from "@/module/commodity/presenter/commodityViewModel";
// import StorageGroupViewModel from "@/module/storage/presenter/storageGroupViewModel";
import StorageGroupEntity from "@/module/storage/domain/storageGroupEntity";
import { FaMapMarkerAlt } from "react-icons/fa";
import { ScrollArea } from "./ui/scroll-area";
const usecase = new StorageGroupUsecase(new StorageGroupRepoImpl());

const SearchDrawer = ({ items}:{ items: CommodityViewModel[]}) => {
  const [isOpen, setIsOpen] = useState(true);
  useEffect(()=>{
    setIsOpen(true);
  },[items])
  if (items.length === 0 ) return <></>

  return (
    <div>
      {/* Drawer Trigger (Button to open the drawer) */}
      <Drawer open={isOpen} onOpenChange={()=>{setIsOpen(!open)}}>
        <DrawerContent className="bg-white p-4 rounded-t-2xl h-[100vh] max-h-[600px] overflow-y-auto scroll-m-0"  >
          
        
          <div className="space-y-4 mt-4">
            {items.map((item) =><CommoditySearchCard key={item.id + item.name} commodity={item}/>)}
          </div>
          
        </DrawerContent>
      </Drawer>
    </div>
  );
};

function CommoditySearchCard(
  {
    commodity
  } : {
    commodity: CommodityViewModel
  }){
  const [groupData, setGroupData] = useState<StorageGroupEntity>()

  const [isLoading, startGetGroupData] = useTransition()
  
  useEffect(() => {
    startGetGroupData(async () => {
      const entity = await usecase.getStorageGroup(commodity.storageGroupId);
      setGroupData(entity)
    })
    }, [commodity]
  )


  return (
      <div className="p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-bold">{commodity.name}</h2>
        <div className="flex flex-wrap space-x-2 mt-2">
        <span
          className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-sm"
        >
          {commodity.category}
        </span>
        <span
          className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 text-sm"
        >
          {commodity.condition}
        </span>
        </div>
        <div className="flex items-center justify-end mt-2">
          <span className="text-blue-500 flex items-center">
            <FaMapMarkerAlt />
              
        
            { isLoading || groupData!=undefined  ? groupData?.name ?? "" : null}
          </span>
        </div>
      </div>
    )
}

export default SearchDrawer;

