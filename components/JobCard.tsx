import Link from "next/link";
import { BookmarkButton } from "@/components/BookmarkButton";
import { CalendarIcon } from "@/components/Icons";
import { formatDate } from "@/lib/format-date";
import type { Job } from "@/types/job";

export function JobCard({
  job,
  headingLevel = "h2",
}: {
  job: Job;
  headingLevel?: "h1" | "h2";
}) {
  const Heading = headingLevel;

  return (
    <article className="job-card">
      <div className="job-card__header">
        <Heading className="job-card__title">
          {headingLevel === "h1" ? (
            job.title
          ) : (
            <Link href={`/jobs/${job.uid}`}>{job.title}</Link>
          )}
        </Heading>
        <BookmarkButton jobId={job.id} jobTitle={job.title} />
      </div>

      <p className="job-card__date">
        <CalendarIcon />
        <time dateTime={job.date}>{formatDate(job.date)}</time>
      </p>

      <p className="job-card__technologies">
        {job.technologies.join(", ")}
      </p>

      <p className="job-card__description">{job.description}</p>

      {headingLevel !== "h1" ? (
        <Link className="job-card__link" href={`/jobs/${job.uid}`}>
          Voir l’offre
        </Link>
      ) : null}
    </article>
  );
}
