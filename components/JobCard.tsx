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
    <article className="w-fit min-w-125 bg-white">
      <div className="flex flex-row items-center justify-between gap-4 mb-2">
        <Heading className="text-xl font-bold text-dark">
          {headingLevel === "h1" ? (
            job.title
          ) : (
            <Link href={`/jobs/${job.uid}`}>{job.title}</Link>
          )}
        </Heading>
        <BookmarkButton jobId={job.id} jobTitle={job.title} />
      </div>

      <p className="flex-row gap-1 flex items-center">
        <CalendarIcon className="text-primary" />
        <time className="text-sm text-primary font-bold" dateTime={job.date}>
          {formatDate(job.date)}
        </time>
      </p>

      <p className="text-primary font-semibold font-sm mb-4">
        {job.technologies.join(", ")}
      </p>

      <p className="job-card__description">{job.description}</p>
    </article>
  );
}
