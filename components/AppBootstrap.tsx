"use client";

import { useEffect } from "react";
import { useJobStore } from "@/stores/job-store";

export function AppBootstrap({
  availableJobIds,
}: {
  availableJobIds: string[];
}) {
  const hasHydrated = useJobStore((state) => state.hasHydrated);
  const removeUnavailableBookmarks = useJobStore(
    (state) => state.removeUnavailableBookmarks,
  );

  useEffect(() => {
    if (hasHydrated) {
      removeUnavailableBookmarks(availableJobIds);
    }
  }, [availableJobIds, hasHydrated, removeUnavailableBookmarks]);

  return null;
}
