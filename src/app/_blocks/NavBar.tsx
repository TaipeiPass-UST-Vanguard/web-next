/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { UserEntity } from "@/module/user/doamain/userEntity";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LuAlignJustify, LuSearch } from "react-icons/lu";
import CommodityUsecase from "@/module/commodity/application/commodityUsecase"
import CommodityRepoImpl from "@/module/commodity/presenter/commodityRepoImpl";
import CommodityEntity from "@/module/commodity/domain/commodityEntity";
import SearchPopDialog from "@/components/searchPopDialog";
import { useState } from "react";
import { Drawer } from "vaul";
import CommodityViewModel from "@/module/commodity/presenter/commodityViewModel";
const commodityUsecase = new CommodityUsecase(new CommodityRepoImpl());

async function search(keyword: string) {
    const entities = await commodityUsecase.getAllCommodity({ keyword: keyword, location: [25.021721, 121.535205]});
    const newList: CommodityEntity[] = [];
    entities.map((item, _) => {
        newList.push(item)
    });
    return newList;
}

function Avatar({ name }: { name: string }) {
    return (
        <div className="w-10 h-10 rounded-full bg-gray-500 flex flex-col justify-center items-center backdrop-blur-lg">
            <span>
                {name}
            </span>
        </div>
    )
}

interface SearchFormSchema {
    name: string
}


export function NavBar({ user }: {
    user: UserEntity
}) {
    const form = useForm<SearchFormSchema>({
        defaultValues: {
            name: ''
        }

    })
    const [commodityList, setCommodityList] = useState<CommodityViewModel[]>([]);
    const router = useRouter()

    async function onSubmit(values: SearchFormSchema) {
        console.log(values)

        form.reset(
            {
                name: ''
            }
        )
        const commodityList = await search(values.name, );
        setCommodityList(commodityList.map(entity => new CommodityViewModel(entity)));

    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-12 flex flex-row items-center justify-between p-4 bg-white/50 rounded-full backdrop-blur-sm space-x-2">
                    <LuSearch />
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <FormControl>
                                    <Input
                                        placeholder="Search"
                                        className={cn(
                                            'w-full text-md border-0 bg-transparent px-2 py-1 m-0 shadow-none',
                                        )}
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <Button type="button" variant={'ghost'} size='icon'>
                        <LuAlignJustify />
                    </Button>
                </form>
                
            </Form >
        <SearchPopDialog items={commodityList} />
        </div>
    )
}