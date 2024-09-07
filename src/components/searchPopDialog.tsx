"use client";

import StorageGroupUsecase from "@/module/storage/application/storageGroupUsecase";
import StorageGroupRepoImpl from "@/module/storage/presenter/storageGroupRepoImpl";
import { useEffect, useState, useTransition } from "react";
import { Drawer, DrawerClose, DrawerContent} from "./ui/drawer";
import CommodityViewModel from "@/module/commodity/presenter/commodityViewModel";
// import StorageGroupViewModel from "@/module/storage/presenter/storageGroupViewModel";
import StorageGroupEntity from "@/module/storage/domain/storageGroupEntity";
import { FaMapMarkerAlt } from "react-icons/fa";
import { usePathname, useRouter} from "next/navigation";
import { LabelChip } from "./chip";
const usecase = new StorageGroupUsecase(new StorageGroupRepoImpl());

const SearchDrawer = ({items}:{ items: CommodityViewModel[]}) => {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(()=>{
    setIsOpen(true);
  },[items])
  if (items.length === 0 ) return <></>

  return (
    <div>
      {/* Drawer Trigger (Button to open the drawer) */}
      <Drawer open={isOpen} onOpenChange={(isOpen)=>{setIsOpen(isOpen)}} >
        <DrawerContent className="w-full bg-white p-4 rounded-t-2xl  max-h-[500px]"  >
          <div className="w-full space-y-4 mt-4 h-[500px] overflow-y-auto" >
              {items.map((item) => <CommoditySearchCard  key={item.id + item.name} commodity={item}/>)}
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

  const router = useRouter()
  const pathName = usePathname()
  
  useEffect(() => {
    startGetGroupData(async () => {
      const entity = await usecase.getStorageGroup(commodity.storageGroupId);
      setGroupData(entity)
    })
    }, [commodity]
  )


  return (
    <DrawerClose className="w-full p-4 bg-gray-100 rounded-lg ">
      <div className="flex flex-col justify-start items-start" onClick= {()=>{  
          const params = new URLSearchParams(
            {
              commodityId: String(commodity.id)
            }
          );
          router.push(
            pathName + "?" + params.toString()
          );
        }
      }>
        <h2 className="text-lg font-bold">{commodity.name}</h2>
        <div className="w-full flex flex-row justify-between space-x-2 mt-2">
          <div className="flex flex-row justify-start items-center space-x-2">
            <LabelChip label={commodity.category} />
            <LabelChip label={commodity.condition} />
          </div>
          <div className="text-blue-500 flex items-center">
              <FaMapMarkerAlt />
              { isLoading || groupData!=undefined  ? groupData?.name ?? "" : null}
          </div>
        </div>
  
      </div>
    </DrawerClose>
      
    )
}

export default SearchDrawer;

