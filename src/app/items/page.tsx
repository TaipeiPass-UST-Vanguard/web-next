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
// import { NavBar } from "./_blocks/NavBar";
import { UserEntity } from "@/module/storage/domain/userEntity";
// import { InfoBlocks } from "./_blocks/InfoBlocks";
import { Separator } from "@/components/ui/separator";
import { NavBar } from "../_blocks/NavBar";

const Map = dynamic(() => import("@/components/map"), {
  ssr: false
});

export default function Page() {
  const fakeUser = {
    name: "test",
    avatar: "https://www.gravatar.com/avatar"
  } as UserEntity;


  return (
    <div className="h-screen relative">
      <div className="absolute top-20 h-fit w-full z-10 p-4">
        <NavBar user={fakeUser} />
      </div>
      <div className="absolute inset-0 z-0">
        {/* <Map/> */}
      </div>
    </div>
  );
}
