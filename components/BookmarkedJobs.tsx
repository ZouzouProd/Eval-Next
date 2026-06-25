"use client";

import { JobCard } from "@/components/JobCard";
import { useJobStore } from "@/stores/job-store";
import type { Job } from "@/types/job";

export function BookmarkedJobs({ jobs }: { jobs: Job[] }) {
  const hasHydrated = useJobStore((state) => state.hasHydrated);
  const bookmarkedJobIds = useJobStore((state) => state.bookmarkedJobIds);

  if (!hasHydrated) {
    return <p className="py-8">Chargement des signets…</p>;
  }

  const bookmarkedJobs = jobs.filter((job) =>
    bookmarkedJobIds.includes(job.id),
  );

  return (
    <>
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-primary font-bold text-xl">
          Offres enregistrées
        </h1>
      </div>

      {bookmarkedJobs.length ? (
        <div className="grid grid-cols-1 gap-6 py-8 md:grid-cols-2 xl:grid-cols-3">
          {bookmarkedJobs.map((job) => (
            <JobCard job={job} key={job.id} />
          ))}
        </div>
      ) : (
        <p className="py-8">
          Vous n’avez encore enregistré aucune offre.
        </p>
      )}
    </>
  );
}
