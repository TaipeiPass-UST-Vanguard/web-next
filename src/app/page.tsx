import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false
});

export default function Page() {
  return (
    <>
      <div className="h-screen">
        <Map posix={[25.021589159405476, 121.53505492217596]}/>
      </div>
    </>
  );
}
