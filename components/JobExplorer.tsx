"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/Button";
import { JobCard } from "@/components/JobCard";
import { Tag } from "@/components/Tag";
import type { Job } from "@/types/job";

const jobsPerPage = 3;

export function JobExplorer({ jobs }: { jobs: Job[] }) {
  const [technology, setTechnology] = useState<string | null>(null);
  const [page, setPage] = useState(1);

  const technologies = useMemo(
    () =>
      [...new Set(jobs.flatMap((job) => job.technologies))].sort((a, b) =>
        a.localeCompare(b, "fr"),
      ),
    [jobs],
  );

  const filteredJobs = useMemo(
    () =>
      technology
        ? jobs.filter((job) => job.technologies.includes(technology))
        : jobs,
    [jobs, technology],
  );

  const pageCount = Math.max(
    1,
    Math.ceil(filteredJobs.length / jobsPerPage),
  );
  const visibleJobs = filteredJobs.slice(
    (page - 1) * jobsPerPage,
    page * jobsPerPage,
  );

  function selectTechnology(nextTechnology: string | null) {
    setTechnology(nextTechnology);
    setPage(1);
  }

  return (
    <>
      <section aria-labelledby="technologies-title" className="tag-cloud">
        <div className="section-heading">
          <h2 id="technologies-title">Technologies</h2>
          {technology ? (
            <button
              className="text-button"
              onClick={() => selectTechnology(null)}
              type="button"
            >
              Tout afficher
            </button>
          ) : null}
        </div>

        <div className="tag-cloud__list">
          {technologies.map((item) => (
            <Tag
              active={technology === item}
              key={item}
              onClick={() =>
                selectTechnology(technology === item ? null : item)
              }
            >
              {item}
            </Tag>
          ))}
        </div>
      </section>

      <section aria-labelledby="jobs-title" className="jobs-section">
        <div className="section-heading">
          <h2 id="jobs-title">
            {technology ? `Offres — ${technology}` : "Toutes les offres"}
          </h2>
          <span>
            {filteredJobs.length} offre
            {filteredJobs.length > 1 ? "s" : ""}
          </span>
        </div>

        <div className="jobs-list">
          {visibleJobs.length ? (
            visibleJobs.map((job) => <JobCard job={job} key={job.id} />)
          ) : (
            <p className="empty-state">
              Aucune offre ne correspond à cette technologie.
            </p>
          )}
        </div>

        {pageCount > 1 ? (
          <nav aria-label="Pagination des offres" className="pagination">
            <Button
              disabled={page === 1}
              onClick={() => setPage((current) => current - 1)}
              type="button"
            >
              Précédent
            </Button>
            <span>
              Page {page} sur {pageCount}
            </span>
            <Button
              disabled={page === pageCount}
              onClick={() => setPage((current) => current + 1)}
              type="button"
            >
              Suivant
            </Button>
          </nav>
        ) : null}
      </section>
    </>
  );
}
