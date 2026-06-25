"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { JobApplication } from "@/types/job";

type JobStore = {
  hasHydrated: boolean;
  loggedIn: boolean;
  bookmarkedJobIds: string[];
  applications: JobApplication[];
  setHasHydrated: (hasHydrated: boolean) => void;
  login: () => void;
  logout: () => void;
  toggleBookmark: (jobId: string) => void;
  removeUnavailableBookmarks: (availableJobIds: string[]) => void;
  addApplication: (application: JobApplication) => void;
};

export const useJobStore = create<JobStore>()(
  persist(
    (set) => ({
      hasHydrated: false,
      loggedIn: false,
      bookmarkedJobIds: [],
      applications: [],
      setHasHydrated: (hasHydrated) => set({ hasHydrated }),
      login: () => set({ loggedIn: true }),
      logout: () => set({ loggedIn: false }),
      toggleBookmark: (jobId) =>
        set((state) => ({
          bookmarkedJobIds: state.bookmarkedJobIds.includes(jobId)
            ? state.bookmarkedJobIds.filter((id) => id !== jobId)
            : [...state.bookmarkedJobIds, jobId],
        })),
      removeUnavailableBookmarks: (availableJobIds) =>
        set((state) => ({
          bookmarkedJobIds: state.bookmarkedJobIds.filter((id) =>
            availableJobIds.includes(id),
          ),
        })),
      addApplication: (application) =>
        set((state) => ({
          applications: [
            application,
            ...state.applications.filter(
              (item) => item.jobId !== application.jobId,
            ),
          ],
        })),
    }),
    {
      name: "dev-jobs-profile",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        loggedIn: state.loggedIn,
        bookmarkedJobIds: state.bookmarkedJobIds,
        applications: state.applications,
      }),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
    },
  ),
);
