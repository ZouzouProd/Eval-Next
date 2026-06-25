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
      <div className="border-dark flex items-center justify-between gap-4 border-b-2">
        <h1 className="border-primary border-b-6 text-3xl">
          Offres enregistrées
        </h1>
        <span className="text-primary font-semibold">
          {bookmarkedJobs.length} offre
          {bookmarkedJobs.length > 1 ? "s" : ""}
        </span>
      </div>

      {bookmarkedJobs.length ? (
        <div className="grid gap-6 py-8">
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
