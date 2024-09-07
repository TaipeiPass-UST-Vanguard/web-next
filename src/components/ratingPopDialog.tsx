"use client";

import StorageGroupUsecase from "@/module/storage/application/storageGroupUsecase";
import StorageGroupRepoImpl from "@/module/storage/presenter/storageGroupRepoImpl";
import { useContext, useEffect, useState, useTransition } from "react";
import { Drawer, DrawerContent } from "./ui/drawer";
import DraggableStars from "./draggableStar";
import { Button } from "./ui/button";
import RewardEntity from "@/module/reward/domain/rewardEntity";
import RewardUsecase from "@/module/reward/application/rewardUsecase";
import RewardRepoImpl from "@/module/reward/presenter/rewardRepoImpl";
import RewardViewModel from "@/module/reward/presenter/rewardViewModel";
import { UserContext } from "@/app/_context/userContext";
const usecase = new StorageGroupUsecase(new StorageGroupRepoImpl());
const rewardUsecase = new RewardUsecase(new RewardRepoImpl());
async function submit({ commodityID, userID, reward }: { commodityID: number, userID: string, reward: number }) {
    await rewardUsecase.createReward({ commodityId: commodityID, userId: userID, reward: reward });
}

const RatingDrawer = ({ commodityID }: { commodityID: number }) => {
    const [currentRating, setCurrentRating] = useState(1); // State to hold the rating

    const handleRatingChange = (newRating: number) => {
        setCurrentRating(newRating); // Update rating in parent
    };
    const [isOpen, setIsOpen] = useState(true);
    useEffect(() => {
        setIsOpen(true);
    }, [])

    const user = useContext(UserContext);

    return (
        <div>
            {/* Drawer Trigger (Button to open the drawer) */}
            <Drawer open={isOpen}>
                <DrawerContent className="bg-white p-4 rounded-t-2xl  h-[300px]"  >

                    <div className="flex justify-center items-center px-5 py-7">
                        <h1 className="text-2xl font-bold">收到的物品是否符合敘述？</h1>
                    </div>

                    <div className="flex justify-center items-center px-5 py-5">
                        <DraggableStars initialRating={0} onRatingChange={handleRatingChange}>
                        </DraggableStars>
                    </div>
                    <Button className="bg-black" onClick={() => {submit({ commodityID: commodityID, userID: user.id, reward: currentRating }) ;
                        setIsOpen(!isOpen);
                        window.location.reload();
                        }} >
                        確認
                    </Button>
                </DrawerContent>
            </Drawer>
        </div>
    );
};



export default RatingDrawer;

