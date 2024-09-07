import CommodityViewModel from "@/module/commodity/presenter/commodityViewModel";
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerFooter,

} from "@/components/ui/drawer";
import StatusWidget from "@/components/statusWidget";
import { LabelChip } from "@/components/chip";
import { InfoBlocks } from "./InfoBlocks";
import Stars from "@/components/star";
import { useContext, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LuPlus } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { UserContext } from "../_context/userContext";
import CommodityUsecase from "@/module/commodity/application/commodityUsecase";
import CommodityRepoImpl from "@/module/commodity/presenter/commodityRepoImpl";

const commodityUsecase = new CommodityUsecase(new CommodityRepoImpl());

export function CommodityCard(
    {
        commodityViewModel,
    } : {
        commodityViewModel: CommodityViewModel;
    }
){  

    const [open, setOpen] = useState(true);
    const route = useRouter();
    const pathName = usePathname() ?? "";
    const user = useContext(UserContext);
    return <Drawer open={open} onOpenChange={(value) => {

        setOpen(value)
        if(value === false) {
            route.push(pathName)
        }
        
    }}>
    <DrawerContent className="backdrop-blur-md bg-white/50 max-h-[600px] h-fit w-full flex flex-col justify-start items-start">
      <DrawerHeader className="w-full flex flex-col justify-start items-start space-y-1">
        <div>
         <StatusWidget status={commodityViewModel.status}/>
        </div>
        <DrawerTitle className="text-sky-900">
          {commodityViewModel.name}
        </DrawerTitle>
        <DrawerDescription>
          {commodityViewModel.description}
        </DrawerDescription>
        <div className="flex flex-row gap-1.5 font-semibold text-black text-[10px]">
        <LabelChip label={commodityViewModel.category}/>
        <LabelChip label={commodityViewModel.condition}/>
      </div>
      </DrawerHeader>
      <div className="w-full flex flex-row px-4 py-2 space-x-2">
        <div className="w-full">
            <InfoBlocks label="賣家評分" value={
                <Stars star={3.4}/>
            }/>
        </div>
        <div className="w-full">
            <InfoBlocks label="到期日" value={String(commodityViewModel?.expireTimeString ?? "")}/>
        </div>
        </div>
        <DrawerFooter className="w-full flex flex-row justify-end">
            {
                commodityViewModel.status === "pending" ? (
                    <Button className="rounded-full bg-sky-500 text-white font-bold" onClick={
                        () => {
                            setOpen(false)
                            commodityUsecase.updateCommodityStatus(commodityViewModel.id, {
                                receiverId: user.id,
                                status: "receiving",
                            })
                            // route.push(`/commodity/${commodityViewModel.id}`)
                        }
                    }>
                        <div className="flex flex-row justify-center items-center space-x-2">
                        <LuPlus/> 
                        <span>接收</span>
                        </div>
                    </Button>
                ) : null
            }
        </DrawerFooter>
    </DrawerContent>
  </Drawer>
}