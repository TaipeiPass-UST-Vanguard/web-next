"use client";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
interface QueryParams {
  selected?: string;
  mode?: string;
  page?: string;
}
export function useDataQueryRoute() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  function createQueryString({ selected, mode, page }: QueryParams): string {
    const params = new URLSearchParams();
    if (selected) {
      params.set("data", selected);
    }
    if (mode) {
      params.set("mode", mode);
    }
    if (page) {
      params.set("page", page);
    }
    return params.toString();
  }

  function getPath(queryPath: string) {
    return pathName + "?" + queryPath;
  }

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
