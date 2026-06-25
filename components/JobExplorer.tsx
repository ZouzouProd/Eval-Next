import { JobCard } from "@/components/JobCard";
import { Tag } from "@/components/Tag";
import type { Job, Technology } from "@/types/job";

type JobExplorerProps = {
  activeTechnologyUid?: string;
  jobs: Job[];
  technologies: Technology[];
  showAllTechnologies?: boolean;
};

export function JobExplorer({
  activeTechnologyUid,
  jobs,
  technologies,
  showAllTechnologies = true,
}: JobExplorerProps) {
  return (
    <>
      {showAllTechnologies && (
      <section aria-label="Filtrer par technologie" className="mb-8">
        <div className="flex flex-wrap gap-3">
          {technologies.map((technology) => (
            <Tag
              active={activeTechnologyUid === technology.uid}
              href={`/jobs/technologies/${technology.uid}`}
              key={technology.uid}
            >
              {technology.name}
            </Tag>
          ))}
        </div>
      </section>
      )}

      <section aria-label="Liste des offres">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {jobs.length ? (
            jobs.map((job) => <JobCard job={job} key={job.id} />)
          ) : (
            <p className="py-8">
              Aucune offre ne correspond à cette technologie.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
