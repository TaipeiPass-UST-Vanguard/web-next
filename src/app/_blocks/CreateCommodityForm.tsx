import commodityViewModel from "@/module/commodity/presenter/commodityViewModel";
import { usePathname, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../_context/userContext";
import { Drawer, DrawerContent, DrawerDescription, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
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
            category: "",
            condition: "",
        }
    })


    return <Drawer open={open} onOpenChange={(value) => {
        setOpen(value)
        if(value === false) {
            route.push(pathName)
        }
    }}>
    <DrawerContent className="backdrop-blur-md bg-white/50 max-h-[600px] h-fit w-full flex flex-col justify-start items-start">
        <Form {...form}>
            <form className="w-full h-[500px]">
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
                        <InfoBlocks label="放置地點" value={
                            <FormItem className="w-full">
                            <FormControl>
                              <Select
                                disabled={isDisabled}
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger
                                    className={cn(
                                      'w-full text-sm font-normal border-0 bg-transparent px-2 py-1 m-0 required:after:content-["*"]',
                                      focusSettings,
                                      hoverSettings,
                                      textCss
                                    )}
                                  >
                                    <SelectValue
                                      className="w-full"
                                      placeholder="Select a verified email to display"
                                    />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  {...options.map((option, index) => (
                                    <SelectItem key={index} value={option.value} className="py-2">
                                      {option.component ?? option.value}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            </FormControl>
                            {isDisabled ? <LuLock /> : null}
                            <FormMessage />
                          </FormItem>
                        }/>
                </DrawerHeader>
            </form>
        </Form>
    </DrawerContent>
  </Drawer>
}