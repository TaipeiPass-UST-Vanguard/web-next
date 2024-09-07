import commodityViewModel from "@/module/commodity/presenter/commodityViewModel";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../_context/userContext";
import { Drawer, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import StatusWidget from "@/components/statusWidget";
import { LabelChip } from "@/components/chip";
import { InfoBlocks } from "./InfoBlocks";
import Stars from "@/components/star";
import { useForm } from "react-hook-form";
import CommodityEntity from "@/module/commodity/domain/commodityEntity";
import { CommodityCreateParams } from "@/module/commodity/domain/commodityRepo";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Select, SelectContent, SelectTrigger, SelectValue, SelectItem} from "@/components/ui/select";
import CommodityCategory from "@/module/commodity/domain/commodityCategory";
// import { SelectItem } from "@radix-ui/react-select";
import { commodityCategoryString, commodityConditionString } from "@/module/commodity/presenter/commodityStrings";
import CommodityCondition from "@/module/commodity/domain/commodityCondition";
import { Button } from "@/components/ui/button";
import { LuPlus } from "react-icons/lu";

const focusSettings =
  "focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:bg-background focus-visible:shadow-lg";
const hoverSettings = "hover:bg-secondary";

export function CreateCommodityForm(){
    const [open, setOpen] = useState(true);
    const route = useRouter();
    const pathName = usePathname() ?? "";
    
    const user = useContext(UserContext);

    const form = useForm<CommodityCreateParams>({
        defaultValues: {
            name: "",
            description: "",
            userId: user?.id ?? 0,
            category: undefined,
            condition: "",
        }
    })

    function onSubmit(data: CommodityCreateParams){
        console.log(data)
    }


    return <Drawer open={open} onOpenChange={(value) => {
            setOpen(value)
            if(value === false) {
                route.push(pathName)
            }
        }}>
    
    <DrawerContent className="backdrop-blur-md bg-white/50 max-h-[600px] h-fit w-full flex flex-col justify-start items-start">
        <Form {...form}>
            <form className="w-full h-[500px]" onSubmit={form.handleSubmit(onSubmit)}>
                 <DrawerHeader className="w-full flex flex-col justify-start items-start space-y-1">
                    <div>
                        <StatusWidget status={"draft"}/>
                    </div>
                    <DrawerTitle className="w-full">
                    <FormField
                        control={form.control}
                        name={"name"}
                        render={({ field }) => (
                            <FormItem className="w-full flex flex-row justify-start items-center">
                            <FormControl>
                                <Input
                                    className={cn(
                                        'w-full text-md border-0 bg-transparent px-2 py-1 m-0 required:after:content-["*"]',
                                        focusSettings,
                                        hoverSettings,
                                    )}
                                    {...field}
                                    placeholder={"物品名稱"}
                                    required={true}
                                />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                    </DrawerTitle>
                    <DrawerDescription className="w-full">
                        <FormField
                            control={form.control}
                            name={"description"}
                            render={({ field }) => (
                                <FormItem className="w-full flex flex-row justify-start items-center">
                                <FormControl>
                                    <Input
                                        className={cn(
                                            'w-full text-md border-0 bg-transparent px-2 py-1 m-0 required:after:content-["*"]',
                                            focusSettings,
                                            hoverSettings,
                                        )}
                                        {...field}
                                        placeholder={"物品敘述"}
                                        required={true}
                                    />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </DrawerDescription>
                    
                </DrawerHeader>
                <div className="w-full flex flex-row space-x-2 p-4">
                    <InfoBlocks label="物品類別" value={
                        <FormField
                            control={form.control}
                            name={"category"}
                            render={({ field }) => (
                                <FormItem className="w-full">
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                        <SelectTrigger
                                            className={cn(
                                                'w-full text-sm font-normal border-0 bg-transparent px-2 py-1 m-0 shadow-none',
                                                focusSettings,
                                                hoverSettings,
                                            )}
                                            >
                                            <SelectValue
                                                className="w-full"
                                                placeholder="Select a verified email to display"
                                            />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {
                                            CommodityCategory.values.map((category , index) => (
                                                <SelectItem value={category} key={"ca" + index}>
                                                    {commodityCategoryString(category)}
                                                </SelectItem>
                                            ))
                                        }
                                    </SelectContent>
                                    </Select>
                                <FormMessage />
                                </FormItem>
                        )}
                        />
                    }/>
                    <InfoBlocks label="使用情況" value={
                        <FormField
                        control={form.control}
                        name={"condition"}
                        render={({ field }) => (
                            <FormItem className="w-full">
                                <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                >
                                <FormControl>
                                    <SelectTrigger
                                    className={cn(
                                        'w-full text-sm font-normal border-0 bg-transparent px-2 py-1 m-0  shadow-none',
                                        focusSettings,
                                        hoverSettings,
                                    )}
                                    >
                                    <SelectValue
                                        className="w-full"
                                        placeholder="物品使用情況"
                                    />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {
                                    CommodityCondition.values.map((condition, index) => (
                                        <SelectItem value={condition} key={"c" + index}>
                                        {commodityConditionString(condition)}
                                        </SelectItem>
                                    ))
                                    }
                                </SelectContent>
                                </Select>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    }/>
                    </div>
                    <DrawerFooter className="w-full flex flex-row justify-end">
                
                    <Button type="submit" className="rounded-full bg-sky-500 text-white font-bold">
                        <div className="flex flex-row justify-center items-center space-x-2">
                        <LuPlus/> 
                        <span>新增二手商品</span>
                        </div>
                    </Button>
                
                </DrawerFooter>
            </form>
        </Form>
    </DrawerContent>
  </Drawer>
}