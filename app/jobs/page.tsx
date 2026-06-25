import { JobExplorer } from "@/components/JobExplorer";
import { getPrismicJobs } from "@/lib/get-prismic-jobs";
import { getPrismicTechnologies } from "@/lib/get-prismic-technologies";

export default async function JobsPage() {
  const [jobs, technologies] = await Promise.all([
    getPrismicJobs(),
    getPrismicTechnologies(),
  ]);

  return (
    <main>
      <div className="border-dark mb-8 flex items-center justify-between gap-4 border-b-2">
        <h1 className="border-primary border-b-6 text-3xl">
          Offres d’emploi
        </h1>
        <span className="text-primary font-semibold">
          {jobs.length} offre{jobs.length > 1 ? "s" : ""} disponible
          {jobs.length > 1 ? "s" : ""}
        </span>
      </div>

      <JobExplorer jobs={jobs} technologies={technologies} />
    </main>
  );
}
