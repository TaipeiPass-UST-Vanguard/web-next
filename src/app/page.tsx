import dynamic from "next/dynamic";
import { NavBar } from "./_blocks/NavBar";
import { UserEntity } from "@/module/storage/domain/userEntity";

const Map = dynamic(() => import("@/components/map"), {
  ssr: false
});

export default function Page() {
  const fakeUser = {
    name: "test",
    avatar: "https://www.gravatar.com/avatar"
  } as UserEntity;

  return (
    <div className="w-full h-screen relative">
      {/* NavBar section with higher z-index */}
      <div className="absolute top-10 h-10 w-full z-10">
        <NavBar user={fakeUser} />
      </div>
      {/* Map section */}
      <div className="absolute h-screen top-0 z-0 bg-blue-500">
        <Map posix={[25.021589159405476, 121.53505492217596]} />
      </div>
    </div>
  );
}
