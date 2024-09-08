/* eslint-disable @typescript-eslint/no-unused-vars */
"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { UserEntity } from "@/module/user/doamain/userEntity";
import { useForm } from "react-hook-form";
import { LuAlignJustify, LuRefreshCcw, LuSearch } from "react-icons/lu";
import CommodityUsecase from "@/module/commodity/application/commodityUsecase"
import CommodityRepoImpl from "@/module/commodity/presenter/commodityRepoImpl";
import CommodityEntity from "@/module/commodity/domain/commodityEntity";
import SearchPopDialog from "@/components/searchPopDialog";
import { useContext, useState } from "react";
import CommodityViewModel from "@/module/commodity/presenter/commodityViewModel";
import { CommodityQueryParams } from "@/module/commodity/domain/commodityRepo";
import { PositionContext } from "../_context/positionContext";
import CommodityStatus from "@/module/commodity/domain/commodityStatus";
import { useRouter } from "next/navigation";
const commodityUsecase = new CommodityUsecase(new CommodityRepoImpl());

async function search({ keyword, location }: CommodityQueryParams) {
  const entities = await commodityUsecase.getAllCommodity({
    keyword: keyword,
    location: location,
    status: CommodityStatus.pending,
  });
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
  const position = useContext(PositionContext);

  async function onSubmit(values: SearchFormSchema) {
    console.log(values)

    form.reset(
      {
        name: ''
      }
    )
    const commodityList = await search({ keyword: values.name, location: [position[0], position[1]] });
    setCommodityList(commodityList.map(entity => new CommodityViewModel(entity)));
  }

  const router = useRouter();

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
                    placeholder="搜尋二手物品"
                    className={cn(
                      'w-full text-md border-0 bg-transparent px-2 py-1 m-0 shadow-none',
                    )}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="button" variant={'ghost'} size='icon' onClick={
            () => {
              window.location.reload();
            }
          }>
            <LuRefreshCcw />
          </Button>
        </form>

      </Form >
      <SearchPopDialog items={commodityList} />
    </div>
  )
}