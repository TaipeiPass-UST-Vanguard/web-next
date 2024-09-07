"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { NavBar } from "./_blocks/NavBar";
import { useHandleConnectionData } from "@/composables/useHandleConnectionData";
import { useConnectionMessage } from "@/composables/useConnectionMessage";
import { LatLngTuple } from "leaflet";
import { useSearchParams} from 'next/navigation'
import CommodityUsecase from "@/module/commodity/application/commodityUsecase";
import CommodityRepoImpl from "@/module/commodity/presenter/commodityRepoImpl";
import CommodityViewModel from "@/module/commodity/presenter/commodityViewModel";
import { CommodityCard } from "./_blocks/CommodityCard";
import { UserContext } from "./_context/userContext";

const commodityUsecase = new CommodityUsecase(new CommodityRepoImpl());
const Map = dynamic(() => import("@/components/map"), {
  ssr: false
});

export default function Page() {
  const [commodityViewModel, setCommodityViewModel] = useState<CommodityViewModel | undefined>(undefined);
  const searchParams = useSearchParams();
  
  const [position, setPosition] = useState<LatLngTuple | null>(
    [25.021721, 121.535205]
  );

  const handlePosition = (event: { data: string }) => {
    try {
      const result = JSON.parse(event.data);
      console.log(result);
      if (result.name === 'location') {
        setPosition([result.data.latitude, result.data.longitude]);
      }
    } catch (error) {
      console.error('Error handling message:', error);
    }
  };

  useHandleConnectionData(handlePosition);
  useConnectionMessage('location', null);

  useEffect(() => {
    const fetchCommodity = async () => {
      const commodityId = searchParams.get('commodityId');
      if (commodityId) {
        const commodity = await commodityUsecase.getCommodityById(Number.parseInt(commodityId));
        setCommodityViewModel(new CommodityViewModel(commodity));
      }
      else{
        setCommodityViewModel(undefined);
      }
    };
    fetchCommodity();
  }, [searchParams]);

  return (
    <div className="h-screen relative">
      <div className="absolute top-20 h-fit w-full z-10 p-4">
        <UserContext.Consumer>
          {
            (value) => <NavBar user={value} />
          }

        </UserContext.Consumer>
      </div>
      <div className="absolute inset-0 z-0">
        <Map
          position={position ?? [25.033, 121.565]}
        />
      </div>
      {
        commodityViewModel && <CommodityCard commodityViewModel={commodityViewModel}/>
      }
    </div>
  );
}
