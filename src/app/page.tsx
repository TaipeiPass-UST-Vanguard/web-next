"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
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
import { InfoBlocks } from "./_blocks/InfoBlocks";
import { Separator } from "@/components/ui/separator";

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
    
  // const [storageGroups, setStorageGroups] = useState<StorageGroupViewModel[]>([]);
  // const [storages, setStorages] = useState<StorageViewModel[]>([]);
  // const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  // async function fetchAllStorageGroup() {
  //   const entities = await storageGroupUsecase.getAllStorageGroup();
  //   setStorageGroups(entities.map(entity => new StorageGroupViewModel(entity)));
  // }

  // async function fetchAllStorage(groupId: number) {
  //   const entities = await storageUsecase.getAllStorage(groupId);
  //   setStorages(entities.map(entity => new StorageViewModel(entity)));
  // }

  // useEffect(() => {
  //   fetchAllStorageGroup().catch(console.error);
  // }, []);

  // function handleLocationClicked(index: number) {
  //   const groupId = storageGroups[index].id;
  //   fetchAllStorage(groupId).catch(console.error);
  //   setSelectedIndex(index);
  //   // setIsDrawerOpen(true);
  // }

  return (
    <div className="h-screen relative">
       <div className="absolute top-10 h-10 w-full z-10 p-4">
        <NavBar user={fakeUser} />
      </div>
      <div className="absolute inset-0 z-0">
        <Map
          // locations={storageGroups.map(group => [group.latitude, group.longitude])}
          // onClick={handleLocationClicked}
        />
      </div>
    </div>
  );
}
