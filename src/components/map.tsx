"use client";

import { useState, useEffect, useTransition } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import { LatLngTuple } from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { Button } from "./ui/button";
import { Drawer, DrawerClose, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "./ui/drawer";
import { InfoBlocks } from "@/app/_blocks/InfoBlocks";
import { Separator } from "./ui/separator";
import StorageGroupViewModel from "@/module/storage/presenter/storageGroupViewModel";
import StorageViewModel from "@/module/storage/presenter/storageViewModel";
import StorageGroupUsecase from "@/module/storage/application/storageGroupUsecase";
import StorageGroupRepoImpl from "@/module/storage/presenter/storageGroupRepoImpl";
import StorageUsecase from "@/module/storage/application/storageUsecase";
import StorageRepoImpl from "@/module/storage/presenter/storageRepoImpl";
import { LuPlus } from "react-icons/lu";
import { LoadingWidget } from "./loadingWidget";
import CommodityUsecase from "@/module/commodity/application/commodityUsecase";
import CommodityRepoImpl from "@/module/commodity/presenter/commodityRepoImpl";
import CommodityViewModel from "@/module/commodity/presenter/commodityViewModel";
import { Skeleton } from "./ui/skeleton";
import Image from "next/image";
import { LabelChip } from "./chip";
import { usePathname, useRouter } from "next/navigation";
import { DialogClose } from "@radix-ui/react-dialog";
import CommodityStatus from "@/module/commodity/domain/commodityStatus";

const storageGroupUsecase = new StorageGroupUsecase(new StorageGroupRepoImpl());
const storageUsecase = new StorageUsecase(new StorageRepoImpl());
const commodityUsecase = new CommodityUsecase(new CommodityRepoImpl());

type MapProps = {
  position: LatLngTuple;
  locations?: LatLngTuple[];
  zoom?: number;
  onClick?: (index: number) => void;
};

export default function Map({
  position,
  zoom = 18,
}: MapProps) {

  // const [position, setPosition] = useState<LatLngTuple | null>(null);
  const [isGroupDialogOpen, setGroupDialogOpen] = useState(false);
  const [storageGroups, setStorageGroups] = useState<StorageGroupViewModel[]>([]);
  const [selectedStorageGroups, setSelectedStorageGroups] = useState<StorageGroupViewModel>();
  const route = useRouter();
  const pathName = usePathname() ?? "";
  async function fetchAllStorageGroup() {
    const entities = await storageGroupUsecase.getAllStorageGroup();
    setStorageGroups(entities.map(entity => new StorageGroupViewModel(entity)));
  }

  useEffect(() => {
    fetchAllStorageGroup().catch(console.error);
  }, []);

  function onClickMarker(storageGroup: StorageGroupViewModel) {
    setGroupDialogOpen(true)
    setSelectedStorageGroups(storageGroup)
  }

  return position === null || storageGroups.length === 0 ? (
    <div className="w-full h-full flex flex-col justify-center items-center bg-white">
      <LoadingWidget />
    </div>
  ) : (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={true}
      zoomControl={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
      <Drawer open={isGroupDialogOpen} onOpenChange={
        (isOpen) => {
          setGroupDialogOpen(isOpen);
          if (isOpen) {
            route.push(pathName)
          }
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
          selectedStorageGroups && <StorageDrawerCardContent storageGroup={selectedStorageGroups} />
        }
      </Drawer>
    </MapContainer >
  );
};


function StorageDrawerCardContent({
  storageGroup,
}: {
  storageGroup: StorageGroupViewModel;
}) {
  const [storages, setStorages] = useState<StorageViewModel[]>([]);

  // const storageWithCommodity = storages.filter(storage => !storage.commodityId);
  async function fetchAllStorage(groupId: number) {
    const entities = await storageUsecase.getAllStorage(groupId);
    const pendingStorages: StorageViewModel[] = [];
    for (const entity of entities) {
      if (!entity.commodityId) continue;
      const commodity = await commodityUsecase.getCommodityById(entity.commodityId);
      if (commodity.status === CommodityStatus.pending) pendingStorages.push(new StorageViewModel(entity));
    }
    console.debug(pendingStorages);
    setStorages(pendingStorages);
  }
  const route = useRouter();
  const pathName = usePathname()
  useEffect(() => {
    fetchAllStorage(storageGroup.id).catch(console.error);
  }, [storageGroup.id]);
  return (
    <DrawerContent className="backdrop-blur-md bg-white/50 max-h-[600px] h-fit w-full flex flex-col justify-start items-start">
      <DrawerHeader className="w-full">
        <div className="w-full flex flex-row justify-between h-fit">
          <DrawerTitle asChild>
            <div className="text-sky-900 text-left text-xl">
              {storageGroup?.name ?? ""}
            </div>
          </DrawerTitle>
          <DrawerClose asChild>
            <Button className="rounded-full bg-sky-500 text-white font-bold" onClick={
              () => {
                const params = new URLSearchParams(
                  {
                    commodityId: "-1",
                    defaultGroupId: String(storageGroup.id)
                  }
                );
                route.push(
                  pathName + "?" + params.toString()
                )
              }
            }>
              <div className="flex flex-row justify-center items-center space-x-2">
                <LuPlus />
                <span>新增物品</span>
              </div>
            </Button>
          </DrawerClose>

        </div>
      </DrawerHeader>
      <div className="w-full flex flex-col p-4 space-y-4 h-[400px] overflow-scroll">
        <div className="flex flex-row gap-3">
          <InfoBlocks label="交換物數量" value={String(storageGroup?.withCommodityNumber ?? "")} />
          <InfoBlocks label="總櫃位數量" value={String(storageGroup?.total ?? "")} />
        </div>
        <Separator />

        <div className="flex flex-col gap-2">
          {
            storages.filter(storage => storage.commodityId != undefined).length === 0 ? (
              <div className="flex items-center justify-center">
                <Image
                  alt="empty"
                  src="/svgs/empty.svg"
                  width={300}
                  height={300}
                />
              </div>
            ) :
              storages.map((storage) => (
                <StorageCardView key={storage.commodityId + storage.createdTime.toISOString()} commodityId={storage.commodityId!} />
              ))
          }
        </div>
      </div>
    </DrawerContent>
  )
}

function StorageCardView({
  commodityId,
}: {
  commodityId: number;

}) {
  const [commodity, setCommodity] = useState<CommodityViewModel>();
  const [isLoading, startLoadingCommodity] = useTransition();
  const route = useRouter();
  const pathName = usePathname()

  useEffect(() => {
    startLoadingCommodity(async () => {
      try {
        const commodity = await commodityUsecase.getCommodityById(commodityId)
        setCommodity(new CommodityViewModel(commodity));
      } catch (error) {
        console.error(error);
      }
    }
    )
  }, [commodityId])

  return isLoading || !commodity ? (
    <Skeleton className="w-full h-16 rounded-md" />
  ) : (
    <DialogClose>
      <div className="w-full h-16 rounded-md bg-white flex flex-col justify-center px-2 gap-1" onClick={
        () => {
          const params = new URLSearchParams(
            {
              commodityId: String(commodityId)
            }
          );
          route.push(
            pathName + "?" + params.toString()
          )
        }
      }>
        <p className="text-sky-700 text-left font-bold border-sky-900">{
          commodity?.name ?? ""
        }</p>
        <div className="flex flex-row gap-1.5 font-semibold text-black text-[10px]">
          <LabelChip label={commodity.categoryString} />
          <LabelChip label={commodity.conditionString} />
        </div>
      </div>
    </DialogClose>
  )
}