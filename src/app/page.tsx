

"use client";

import { Button } from "@/components/ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import StorageGroupUsecase from "@/module/storage/application/storageGroupUsecase";
import StorageGroupRepoImpl from "@/module/storage/presenter/storageGroupRepoImpl";
import StorageGroupViewModel from "@/module/storage/presenter/storageGroupViewModel";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { NavBar } from "./_blocks/NavBar";
import { UserEntity } from "@/module/storage/domain/userEntity";

const Map = dynamic(() => import("@/components/map"), {
  ssr: false
});

const usecase = new StorageGroupUsecase(new StorageGroupRepoImpl());

export default function Page() {
  const fakeUser = {
    name: "test",
    avatar: "https://www.gravatar.com/avatar"
  } as UserEntity;

  // return (
    // <div className="w-full h-screen relative">
    //   {/* NavBar section with higher z-index */}
    //   <div className="absolute top-10 h-10 w-full z-10">
    //     <NavBar user={fakeUser} />
    //   </div>
    //   {/* Map section */}
    //   <div className="absolute h-screen top-0 z-0 bg-blue-500">
    //     <Map posix={[25.021589159405476, 121.53505492217596]} />
    //   </div>
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [storageGroups, setStorageGroups] = useState<StorageGroupViewModel[]>([]);

  async function fetchAll() {
    const entities = await usecase.getAllStorageGroup();
    setStorageGroups(entities.map(entity => new StorageGroupViewModel(entity)));
  }

  useEffect(() => {
    fetchAll().catch(console.error);
  }, []);


  return (
    <div className="h-screen relative">
      <div className="absolute inset-0 z-0">
        <Map
          locations={storageGroups.map(group => [group.latitude, group.longitude])}
          onClick={() => setIsDrawerOpen(true)}
        />
      </div>
      <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose asChild>
              <Button variant="outline">Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
}
