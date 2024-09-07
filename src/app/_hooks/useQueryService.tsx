"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

export function useDataQueryRoute() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  function refresh(): void {
    router.refresh();
  }
  function moveBack(): void {
    console.log("moveBack");
    router.back();
    router.refresh();
  }

  return {
    pathName,
    searchParams,
    router,
    moveBack,
    refresh,
  };
}
