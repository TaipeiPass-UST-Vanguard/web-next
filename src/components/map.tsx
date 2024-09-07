"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { Button } from "./ui/button";
import { Drawer, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { InfoBlocks } from "@/app/_blocks/InfoBlocks";
import { Separator } from "./ui/separator";
import StorageGroupViewModel from "@/module/storage/presenter/storageGroupViewModel";
import StorageViewModel from "@/module/storage/presenter/storageViewModel";
import StorageGroupUsecase from "@/module/storage/application/storageGroupUsecase";
import StorageGroupRepoImpl from "@/module/storage/presenter/storageGroupRepoImpl";
import StorageUsecase from "@/module/storage/application/storageUsecase";
import StorageRepoImpl from "@/module/storage/presenter/storageRepoImpl";
import { LuPlus } from "react-icons/lu";
import { LoadingWidget } from "./LoadingWidget";
const storageGroupUsecase = new StorageGroupUsecase(new StorageGroupRepoImpl());
const storageUsecase = new StorageUsecase(new StorageRepoImpl());

type MapProps = {
  locations?: LatLngTuple[];
  zoom?: number;
  onClick?: (index: number) => void;
};

export default function Map({
  locations = [],
  zoom = 18,
  onClick,
}: MapProps) {
  const [position, setPosition] = useState<LatLngTuple | null>(null);
  const [open, setOpen] = useState(false);

  const [storageGroups, setStorageGroups] = useState<StorageGroupViewModel[]>([]);
  const [selectedStorageGroups, setSelectedStorageGroups] = useState<StorageGroupViewModel>();

  async function fetchAllStorageGroup() {
    const entities = await storageGroupUsecase.getAllStorageGroup();
    setStorageGroups(entities.map(entity => new StorageGroupViewModel(entity)));
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        console.log(`Location: ${pos.coords.latitude}, ${pos.coords.longitude}`);
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      (error) => {
        console.error(`Error getting location: ${error.message}`);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
    fetchAllStorageGroup().catch(console.error);
  }, []);

  function onClickMarker(storageGroup: StorageGroupViewModel) {
    setOpen(true)
    setSelectedStorageGroups(storageGroup)
  }
  
  return position === null || storageGroups.length === 0 ?  (
    <div className="w-full h-full flex flex-col justify-center items-center bg-white">
      <LoadingWidget/>
    </div>
  ):(
    <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
        <Drawer open={open} onOpenChange={
          (isOpen) => {
            setOpen(isOpen);
          }
        }>
              <DrawerTrigger >
              {
                storageGroups.map((group, index) => (
                  <Marker
                      key={index}
                      position={[group.latitude, group.longitude]}
                      draggable={false}
                      eventHandlers={{
                        click: () => onClickMarker(group),
                      }}
                  />
                ))}
              </DrawerTrigger>
              {
                selectedStorageGroups && <StorageDrawerCardContent storageGroup={selectedStorageGroups}/>
              }
      </Drawer>
      </MapContainer >
  );
};


function StorageDrawerCardContent({
  storageGroup,
}: {
  storageGroup: StorageGroupViewModel;
}){
  const [storages, setStorages] = useState<StorageViewModel[]>([]);

  async function fetchAllStorage(groupId: number) {
    const entities = await storageUsecase.getAllStorage(groupId);
    setStorages(entities.map(entity => new StorageViewModel(entity)));
  }
  useEffect(() => {
    fetchAllStorage(storageGroup.id).catch(console.error);
  }, [storageGroup.id]);
  return (
      <DrawerContent className="backdrop-blur-md bg-white/50 max-h-[500px] h-fit w-full flex flex-col justify-start items-start">
          <DrawerHeader className="w-full">
          <div className="w-full flex flex-row justify-between h-fit">
            <DrawerTitle>
              <div className="text-sky-900 text-left text-xl">
                {storageGroup?.name ?? ""}
              </div>
            </DrawerTitle>
            <Button className="rounded-full bg-sky-500 text-white font-bold">
            <div className="flex flex-row justify-center items-center space-x-2">
              <LuPlus/> 
              <span>新增物品</span>
            </div>
            </Button>
            
          </div>
          </DrawerHeader>
          <div className="w-full flex flex-col p-4 space-y-4 h-[400px] overflow-scroll">
            <div className="flex flex-row gap-3">
              <InfoBlocks label="交換物數量" value={String(storageGroup?.available ?? "")}/>
              <InfoBlocks label="總櫃位數量" value={String(storageGroup?.total ?? "")}/>
            </div>
            <Separator/>
            <div className="flex flex-col gap-2">
              {
                storages.map((storage, index) => (
                  <div key={storage.commodityId??"Empty" + index} className="w-full h-16 rounded-md bg-white/50 flex flex-col justify-center px-2 gap-1">
                    <p className="text-sky-700 text-left font-bold border-sky-900">{"NAME"}</p>
                    <div className="flex flex-row gap-1.5 font-semibold text-black text-[10px]">
                      <div className="rounded-full border px-2">{"#TAG"}</div>
                      <div className="rounded-full border px-2 ">{"#STATUS"}</div>
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
    </DrawerContent>
  )
}