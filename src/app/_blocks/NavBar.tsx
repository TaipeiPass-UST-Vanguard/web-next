import { UserEntity } from "@/module/storage/domain/userEntity";

export function NavBar({user} : {
    user: UserEntity
}){
    return (
        <div className="w-full h-12 p-4 bg-cyan-500">
           {user.name}
        </div>
    )
}