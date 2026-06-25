import { notFound } from "next/navigation";
import { JobExplorer } from "@/components/JobExplorer";
import { getPrismicJobs } from "@/lib/get-prismic-jobs";
import { getPrismicTechnologies } from "@/lib/get-prismic-technologies";
import { ButtonLink } from "@/components/Button";

type TechnologyJobsPageProps = {
  params: Promise<{
    uid: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function TechnologyJobsPage({
  params,
  searchParams,
}: TechnologyJobsPageProps) {
  const { uid } = await params;
  const { page: pageParam } = await searchParams;
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

  const jobsPerPage = 6;
  const pageCount = Math.max(
    1,
    Math.ceil(filteredJobs.length / jobsPerPage),
  );
  const requestedPage = Number.parseInt(pageParam ?? "1", 10);
  const currentPage = Number.isNaN(requestedPage)
    ? 1
    : Math.min(Math.max(requestedPage, 1), pageCount);
  const visibleJobs = filteredJobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage,
  );

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
        currentPage={currentPage}
        jobs={visibleJobs}
        pageCount={pageCount}
        paginationPath={`/jobs/technologies/${uid}`}
        technologies={technologies}
        showAllTechnologies={false}
      />
    </main>
  );
}
