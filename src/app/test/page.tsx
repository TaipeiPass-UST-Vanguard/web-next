"use client";

import Timer from "@/components/timer";
import { Duration } from "luxon";

export default function TestPage() {
  return (
    <Timer
      initialDuration={Duration.fromMillis(5678).rescale()}
      onExpire={() => console.debug("expired")}
    />
  )
}
