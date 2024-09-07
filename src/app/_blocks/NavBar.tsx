"use client"
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { UserEntity } from "@/module/storage/domain/userEntity";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { LuAlignJustify, LuSearch } from "react-icons/lu";
function Avatar({name}: {name: string}){
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

export function NavBar({user} : {
    user: UserEntity
}){
    const form = useForm<SearchFormSchema>({
        defaultValues: {
            name: ''
        }

    })

    const router = useRouter()

    function onSubmit(values: SearchFormSchema){
        console.log(values)
        // router.push('/search?item=' + values.name)
        form.reset(
            {
                name: ''
            }
        )
    }

    return (
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
                    <LuAlignJustify/>
                </Button>
           </form>
        </Form >   
    )
}