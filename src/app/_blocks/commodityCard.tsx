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
import { set } from "date-fns";
import RatingDrawer from "@/components/ratingPopDialog";

const commodityUsecase = new CommodityUsecase(new CommodityRepoImpl());

export function CommodityCard(
    {
        commodityViewModel,
        lock = false
    }: {
        lock?: boolean;
        commodityViewModel: CommodityViewModel;
    }
) {
    const [open, setOpen] = useState(true);
    const [showButton, setShowButton] = useState(false); // 控制按鈕顯示的狀態
    const [showRating, setShowRating] = useState(false);
    const route = useRouter();
    const pathName = usePathname() ?? "";
    const user = useContext(UserContext);

    useEffect(() => {
        setOpen(true);
    }, [commodityViewModel.receiverId, commodityViewModel.id]);

    return (
        <>
            <Drawer
                open={open}
                onOpenChange={(value) => {
                    setOpen(value);
                    if (value === false) {
                        setShowButton(true); // 關閉時顯示按鈕
                        route.push(pathName);
                    }
                }}
            >
                <DrawerContent className="backdrop-blur-md bg-white/50 max-h-[600px] h-fit w-full flex flex-col justify-start items-start">
                    <DrawerHeader className="w-full flex flex-col justify-start items-start space-y-1">
                        <div>
                            <StatusWidget status={commodityViewModel.status} />
                        </div>
                        <DrawerTitle className="text-sky-900">
                            {commodityViewModel.name}
                        </DrawerTitle>
                        <DrawerDescription>
                            {commodityViewModel.description}
                        </DrawerDescription>
                        <div className="flex flex-row gap-1.5 font-semibold text-black text-[10px]">
                            <LabelChip label={commodityViewModel.category} />
                            <LabelChip label={commodityViewModel.condition} />
                        </div>
                    </DrawerHeader>
                    <div className="w-full flex flex-row px-4 py-2 space-x-2">
                        <div className="w-full">
                            <InfoBlocks label="賣家評分" value={
                                <Stars star={3.4} />
                            } />
                        </div>
                        <div className="w-full">
                            <InfoBlocks label="到期日" value={String(commodityViewModel?.expireTimeString ?? "")} />
                        </div>
                    </div>
                    {commodityViewModel.status === "receiving" && (
                        <div className="w-full flex flex-row px-4 py-2 space-x-2">
                            <div className="w-full">
                                <InfoBlocks label="取貨時間" value={
                                    <Timer className="text-xl" initialDuration={commodityViewModel.receiveExpireDuration} />
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
                                let params = new URLSearchParams({
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
                            </>
                        )}
                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
            {showButton && (
                <div className="fixed bottom-4 right-4">
                    <Button
                        onClick={() => {
                            setOpen(true);
                            setShowButton(false); // 隱藏按鈕
                        }}
                    >
                        <InfoBlocks label="取貨時間" value={
                            <Timer className="text-xl" initialDuration={commodityViewModel.receiveExpireDuration} />
                        } />
                    </Button>
                </div>
            )}
            {showRating && (
                <RatingDrawer commodityID={commodityViewModel.id} />
            )}
        </>
    );
}
