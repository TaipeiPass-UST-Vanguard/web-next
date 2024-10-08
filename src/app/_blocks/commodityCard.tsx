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
import { useContext, useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LuCheck, LuPlus, LuX } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { UserContext } from "../_context/userContext";
import CommodityUsecase from "@/module/commodity/application/commodityUsecase";
import CommodityRepoImpl from "@/module/commodity/presenter/commodityRepoImpl";
import Timer from "@/components/timer";
import CommodityStatus from "@/module/commodity/domain/commodityStatus";
import RatingDrawer from "@/components/ratingPopDialog";
import ImageCarousel from "@/components/imageCarousel";
import { BACKEND_URL } from "@/config/config";
import RewardRepoImpl from "@/module/reward/presenter/rewardRepoImpl";
import RewardUsecase from "@/module/reward/application/rewardUsecase";

const commodityUsecase = new CommodityUsecase(new CommodityRepoImpl());
const rewardUsecase = new RewardUsecase(new RewardRepoImpl());

export function CommodityCard(
  {
    commodityViewModel,
  }: {
    commodityViewModel: CommodityViewModel;
  }
) {
  const [open, setOpen] = useState(true);
  const [showButton, setShowButton] = useState(false); // 控制按鈕顯示的狀態
  const [showRating, setShowRating] = useState(false);
  const [rating, setRating] = useState(0);
  const route = useRouter();
  const pathName = usePathname() ?? "";
  const user = useContext(UserContext);

  useEffect(() => {
    rewardUsecase.getUserReward(user.id).then((reward) => {setRating(reward.meanReward)});
    
    const show = 
    commodityViewModel.receiverId === user.id 
    || commodityViewModel.userId === user.id;
    setShowButton(show)
    setOpen(true);
  }, [commodityViewModel.receiverId, commodityViewModel.id, commodityViewModel.status, commodityViewModel.userId]);

  return (
    <>
      <Drawer
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (value === false) {
            // setShowButton(true); // 關閉時顯示按鈕
            route.push(pathName);
          }
        }}
      >
        <DrawerContent className="backdrop-blur-md bg-white/50 max-h-[700px] h-fit w-full flex flex-col justify-start items-start">
          <DrawerHeader className="w-full flex flex-col justify-start items-start space-y-1">
            <ImageCarousel images={commodityViewModel.images.map(id => new URL(`/api/image/${id}`, BACKEND_URL).href)} />
            <div>
              <StatusWidget status={commodityViewModel.status} />
            </div>
            <DrawerTitle className="text-sky-900">
              {commodityViewModel.name}
            </DrawerTitle>
            <DrawerDescription className="text-left w-full text-nowrap overflow-hidden">
              {commodityViewModel.description}
            </DrawerDescription>
            <div className="flex flex-row gap-1.5 font-semibold text-black text-[10px]">
              <LabelChip label={commodityViewModel.categoryString} />
              <LabelChip label={commodityViewModel.conditionString} />
            </div>
          </DrawerHeader>
          <div className="w-full flex flex-row px-4 py-2 space-x-2">
            <div className="w-full">
              <InfoBlocks label="賣家評分" value={
                <Stars star={rating} />
              } />
            </div>
            <div className="w-full">
              <InfoBlocks label="到期日" value={String(commodityViewModel?.expireTimeString ?? "")} />
            </div>
          </div>
          {commodityViewModel.status === "receiving" && (
            <div className="w-full flex flex-row px-4 py-2 space-x-2">
              <div className="w-full">
                <InfoBlocks label={"剩餘領物時間"} value={
                  <Timer className="w-full flex flex-col justify-center items-center text-4xl font-mono text-sky-950" initialDuration={
                    commodityViewModel.receiveExpireDuration
                  } />
                } />
              </div>
            </div>
          )}
          {commodityViewModel.status === "giving" && (
            <div className="w-full flex flex-row px-4 py-2 space-x-2">
              <div className="w-full">
                <InfoBlocks label={"剩餘擺貨時間"} value={
                  <Timer className="w-full flex flex-col justify-center items-center text-4xl font-mono text-sky-950" initialDuration={
                    commodityViewModel.giveExpireDuration
                  } />
                } />
              </div>
            </div>
          )}
          <DrawerFooter className="w-full flex flex-row justify-end">
            {commodityViewModel.status === "pending" ? (
              <Button className="rounded-full bg-sky-500 text-white font-bold" onClick={() => {
                setOpen(false);
                commodityUsecase.updateCommodityStatus(commodityViewModel.id, {
                  receiverId: user.id,
                  status: "receiving",
                });
                const params = new URLSearchParams({
                  commodityId: String(commodityViewModel.id)
                });
                route.push(pathName + "?" + params.toString());
              }}>
                <div className="flex flex-row justify-center items-center space-x-2">
                  <LuPlus />
                  <span>接收</span>
                </div>
              </Button>
            ) : (
              <>
                {commodityViewModel.status === "giving" && (
                  <Button className="rounded-full bg-rose-500 text-white font-bold" onClick={() => {
                    setOpen(false);
                    commodityUsecase.updateCommodityStatus(commodityViewModel.id, {
                      receiverId: "",
                      status: "giveExpired",
                    });
                  }}>
                    <div className="flex flex-row justify-center items-center space-x-2">
                      <LuX />
                      <span>放棄置物</span>
                    </div>
                  </Button>
                )}
                {commodityViewModel.status === "receiving" && (
                  <Button className="rounded-full bg-rose-500 text-white font-bold" onClick={() => {
                    setOpen(false);
                    commodityUsecase.updateCommodityStatus(commodityViewModel.id, {
                      receiverId: "",
                      status: "pending",
                    });
                  }}>
                    <div className="flex flex-row justify-center items-center space-x-2">
                      <LuX />
                      <span>放棄取物</span>
                    </div>
                  </Button>
                )}
                {commodityViewModel.status === "giving" && (
                  <Button className="rounded-full bg-sky-500 text-white font-bold" onClick={() => {
                    setOpen(false);
                    commodityUsecase.updateCommodityStatus(commodityViewModel.id, {
                      receiverId: "",
                      status: CommodityStatus.pending,
                    });
                    // setShowRating(true);
                    route.refresh();
                  }}>
                    <div className="flex flex-row justify-center items-center space-x-2">
                      <LuCheck />
                      <span>完成置物</span>
                    </div>
                  </Button>
                )}
                {commodityViewModel.status === "receiving" && (
                  <Button className="rounded-full bg-sky-500 text-white font-bold" onClick={() => {
                    setOpen(false);
                    commodityUsecase.updateCommodityStatus(commodityViewModel.id, {
                      receiverId: "",
                      status: CommodityStatus.finished,
                    });
                    setShowRating(true);
                    // route.push(`/commodity/${commodityViewModel.id}`)
                  }}>
                    <div className="flex flex-row justify-center items-center space-x-2">
                      <LuCheck />
                      <span>完成取物</span>
                    </div>
                  </Button>
                )}
              </>
            )}
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
      {(showButton && commodityViewModel.status === 'receiving') && (
        <div className="fixed bottom-4 right-4">
          <div className="rounded-lg border-4 cursor-pointer" onClick={() => {
            setOpen(true);
          }}>
            <InfoBlocks label="取物時間" value={
              <Timer className="text-xl" initialDuration={commodityViewModel.receiveExpireDuration} />
            } />
          </div>
        </div>
      )}
      {
      (showButton && commodityViewModel.status === 'giving') && (
        <div className="fixed bottom-4 right-4">
          <div className="rounded-lg border-4 cursor-pointer" onClick={() => {
            setOpen(true);
          }}>
            <InfoBlocks label="放物時間" value={
              <Timer className="text-xl" initialDuration={commodityViewModel.giveExpireDuration} />
            } />
          </div>
        </div>
      )}
      {showRating && (
        <RatingDrawer commodityID={commodityViewModel.id} />
      )}
    </>
  );
}
