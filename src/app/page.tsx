"use client";
import dynamic from "next/dynamic";
import { useContext, useEffect, useState } from "react";
import { NavBar } from "./_blocks/navBar";
import { useSearchParams} from 'next/navigation'
import CommodityUsecase from "@/module/commodity/application/commodityUsecase";
import CommodityRepoImpl from "@/module/commodity/presenter/commodityRepoImpl";
import CommodityViewModel from "@/module/commodity/presenter/commodityViewModel";
import { CommodityCard } from "./_blocks/commodityCard";
import { UserContext } from "./_context/userContext";
import { PositionContext } from "./_context/positionContext";
import { CreateCommodityForm } from "./_blocks/CreateCommodityForm";

const commodityUsecase = new CommodityUsecase(new CommodityRepoImpl());
const Map = dynamic(() => import("@/components/map"), {
  ssr: false
});

export default function Page() {
  const [commodityViewModel, setCommodityViewModel] = useState<CommodityViewModel | undefined>(undefined); 

  const searchParams = useSearchParams();

  const user = useContext(UserContext);
  const position = useContext(PositionContext);
  const commodityId = searchParams.get('commodityId');
  


  useEffect(() => {
    const fetchCommodity = async (commodityId: string) => {
      // const commodityId = searchParams.get('commodityId');
      if (commodityId) {
        const commodity = await commodityUsecase.getCommodityById(Number.parseInt(commodityId));
        setCommodityViewModel(new CommodityViewModel(commodity));
      }
      else{
        setCommodityViewModel(undefined);
      }
    };
    const fetchUserCurrentOrder = async () => {
      if (user) {
        const order = await commodityUsecase.getAllCommodity({receiverId: user.id});
        if (order && order.length > 0) {
          setCommodityViewModel(new CommodityViewModel(order[0]));
          // setCurrentCommodityViewModel(new CommodityViewModel(order[0]));
          // route.push(pathName + `?commodityId=${order[0].id}`);
        }
      }
    }
    if (commodityId && commodityId !== '-1') {
      fetchCommodity(commodityId);
    }
    else {
      fetchUserCurrentOrder();
    }
  }, [searchParams]);


  return (
    <div className="h-screen relative">
      <div className="absolute top-20 h-fit w-full z-10 p-4">
        <NavBar user={user} />
      </div>
      <div className="absolute inset-0 z-0">
        <Map
          position={position ?? [25.033, 121.565]}
        />
      </div>
      {
        commodityViewModel && <CommodityCard commodityViewModel={commodityViewModel}/>
      }
      {
        commodityId === '-1' && <CreateCommodityForm/>
      }
    </div>
  );
}
