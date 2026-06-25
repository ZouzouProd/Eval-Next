import { JobExplorer } from "@/components/JobExplorer";
import { getPrismicJobs } from "@/lib/get-prismic-jobs";
import { getPrismicTechnologies } from "@/lib/get-prismic-technologies";

const jobsPerPage = 6;

type JobsPageProps = {
  searchParams: Promise<{
    page?: string;
  }>;
};

export default async function JobsPage({ searchParams }: JobsPageProps) {
  const { page: pageParam } = await searchParams;
  const [jobs, technologies] = await Promise.all([
    getPrismicJobs(),
    getPrismicTechnologies(),
  ]);
  const pageCount = Math.max(1, Math.ceil(jobs.length / jobsPerPage));
  const requestedPage = Number.parseInt(pageParam ?? "1", 10);
  const currentPage = Number.isNaN(requestedPage)
    ? 1
    : Math.min(Math.max(requestedPage, 1), pageCount);
  const visibleJobs = jobs.slice(
    (currentPage - 1) * jobsPerPage,
    currentPage * jobsPerPage,
  );

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

      <JobExplorer
        currentPage={currentPage}
        jobs={visibleJobs}
        pageCount={pageCount}
        paginationPath="/jobs"
        technologies={technologies}
      />
    </main>
  );
}
