"use client";

import dynamic from "next/dynamic";

import type { JourneyStop } from "@/types/journey";

const JourneyLeafletMap = dynamic(() => import("./JourneyLeafletMap"), {
  ssr: false,
  loading: () => (
    <div className="flex h-[420px] items-center justify-center rounded-xl bg-gray-100 text-sm text-gray-500">
      Loading journey map...
    </div>
  ),
});

export default function PublicJourneyMap({ stops }: { stops: JourneyStop[] }) {
  return <JourneyLeafletMap stops={stops} />;
}
