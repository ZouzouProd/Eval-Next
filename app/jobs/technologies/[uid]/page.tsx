import { notFound } from "next/navigation";
import { JobExplorer } from "@/components/JobExplorer";
import { getPrismicJobs } from "@/lib/get-prismic-jobs";
import { getPrismicTechnologies } from "@/lib/get-prismic-technologies";
import { ButtonLink } from "@/components/Button";

type TechnologyJobsPageProps = {
  params: Promise<{
    uid: string;
  }>;
};

export default async function TechnologyJobsPage({
  params,
}: TechnologyJobsPageProps) {
  const { uid } = await params;
  const [jobs, technologies] = await Promise.all([
    getPrismicJobs(),
    getPrismicTechnologies(),
  ]);
  const filteredJobs = jobs.filter((job) =>
    job.technologyUids?.includes(uid),
  );

  const technologyName = technologies.find(
    (technology) => technology.uid === uid,
  )?.name;

  if (!technologyName) {
    notFound();
  }

  return (
    <main>
      <ButtonLink href="/jobs" className="mb-4">
        Voir toutes les offres
      </ButtonLink>
      <div className="border-dark mb-8 flex items-center justify-between gap-4 border-b-2">
        <h1 className="border-primary border-b-6 text-3xl">
          {technologyName}
        </h1>
        <span className="text-primary font-semibold">
          {filteredJobs.length} offre
          {filteredJobs.length > 1 ? "s" : ""} disponible
          {filteredJobs.length > 1 ? "s" : ""}
        </span>
      </div>

      <JobExplorer
        activeTechnologyUid={uid}
        jobs={filteredJobs}
        technologies={technologies}
        showAllTechnologies = {false}
      />
    </main>
  );
}
