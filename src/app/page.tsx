"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import StorageGroupUsecase from "@/module/storage/application/storageGroupUsecase";
import StorageUsecase from "@/module/storage/application/storageUsecase";
import StorageGroupRepoImpl from "@/module/storage/presenter/storageGroupRepoImpl";
import StorageGroupViewModel from "@/module/storage/presenter/storageGroupViewModel";
import StorageRepoImpl from "@/module/storage/presenter/storageRepoImpl";
import StorageViewModel from "@/module/storage/presenter/storageViewModel";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { NavBar } from "./_blocks/NavBar";
import { UserEntity } from "@/module/storage/domain/userEntity";
import { useHandleConnectionData } from "@/composables/useHandleConnectionData";
import { useConnectionMessage } from "@/composables/useConnectionMessage";
import { LatLngTuple } from "leaflet";
import { useRouter, usePathname, useSearchParams} from 'next/navigation'
import CommodityUsecase from "@/module/commodity/application/commodityUsecase";
import CommodityRepoImpl from "@/module/commodity/presenter/commodityRepoImpl";
import CommodityViewModel from "@/module/commodity/presenter/commodityViewModel";
import { CommodityCard } from "./_blocks/CommodityCard";

const commodityUsecase = new CommodityUsecase(new CommodityRepoImpl());
const Map = dynamic(() => import("@/components/map"), {
  ssr: false
});

const storageGroupUsecase = new StorageGroupUsecase(new StorageGroupRepoImpl());
const storageUsecase = new StorageUsecase(new StorageRepoImpl());

export default function Page() {
  const fakeUser = {
    name: "test",
    avatar: "https://www.gravatar.com/avatar"
  } as UserEntity;
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
        <NavBar user={fakeUser} />
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
