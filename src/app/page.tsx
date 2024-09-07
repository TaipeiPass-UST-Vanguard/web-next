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
import { UserEntity } from "@/module/user/doamain/userEntity";
import { useHandleConnectionData } from "@/composables/useHandleConnectionData";
import { useConnectionMessage } from "@/composables/useConnectionMessage";
import { LatLngTuple } from "leaflet";

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

  // return (

  const [position, setPosition] = useState<LatLngTuple | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [storageGroups, setStorageGroups] = useState<StorageGroupViewModel[]>([]);
  const [storages, setStorages] = useState<StorageViewModel[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  async function fetchAllStorageGroup() {
    const entities = await storageGroupUsecase.getAllStorageGroup();
    setStorageGroups(entities.map(entity => new StorageGroupViewModel(entity)));
  }

  async function fetchAllStorage(groupId: number) {
    const entities = await storageUsecase.getAllStorage(groupId);
    console.debug(entities);
    setStorages(entities.map(entity => new StorageViewModel(entity)));
  }

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

  useEffect(() => {
    fetchAllStorageGroup().catch(console.error);
  }, []);

  function handleLocationClicked(index: number) {
    const groupId = storageGroups[index].id;
    fetchAllStorage(groupId).catch(console.error);
    setSelectedIndex(index);
    setIsDrawerOpen(true);
  }

  useHandleConnectionData(handlePosition);
  useConnectionMessage('location', null);

  return (
    <div className="h-screen relative">
      <div className="absolute top-20 h-fit w-full z-10 p-4">
        <NavBar user={fakeUser} />
      </div>
      <div className="absolute inset-0 z-0">
        <Map
          position={position ?? [25.033, 121.565]}
          locations={storageGroups.map(group => [group.latitude, group.longitude])}
          onClick={handleLocationClicked}
        />
        {/* <Map /> */}
      </div>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        {
          selectedIndex >= 0 &&
          <DrawerContent className="backdrop-blur-3xl bg-white bg-opacity-90">
            <DrawerHeader>
              <DrawerTitle>
                <div className="text-sky-900 text-left text-lg">
                  {storageGroups[selectedIndex].name}
                </div>
              </DrawerTitle>
              <DrawerDescription className="mt-5">
                <div className="flex flex-col gap-5">
                  <div className="flex flex-row gap-3">
                    <div className="w-full h-16 rounded-md bg-white flex flex-col justify-center px-2 gap-1">
                      <p className="text-sky-700 text-left font-bold">交換物數量</p>
                      <p className="text-green-500 text-left font-bold">{storageGroups[selectedIndex].available}</p>
                    </div>
                    <div className="w-full h-16 rounded-md bg-white flex flex-col justify-center px-2 gap-1">
                      <p className="text-sky-700 text-left font-bold">總櫃位數量</p>
                      <p className="text-black text-left font-bold">{storageGroups[selectedIndex].total}</p>
                    </div>
                  </div>
                  <hr className="text-slate-200" />
                  <div className="flex flex-col gap-2">
                    {
                      storages.map((storage, index) => (
                        <div key={index} className="w-full h-16 rounded-md bg-white flex flex-col justify-center px-2 gap-1">
                          <p className="text-sky-700 text-left font-bold border-sky-900">{"NAME"}</p>
                          <div className="flex flex-row gap-1.5 font-semibold text-black text-[10px]">
                            <div className="rounded-full border px-2">{"#TAG"}</div>
                            <div className="rounded-full border px-2 ">{"#STATUS"}</div>
                          </div>
                        </div>
                      ))
                    }
                  </div>
                  <div className="flex flex-row justify-end">
                    <Button className="rounded-full bg-sky-500 text-white font-bold">新增交換物</Button>
                  </div>
                </div>
              </DrawerDescription>
            </DrawerHeader>
          </DrawerContent>
        }
      </Drawer>
    </div>
  );
}
