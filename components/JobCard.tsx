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
    <article className="min-w-0 w-full overflow-hidden bg-white px-5 py-8">
      <div className="mb-2 flex min-w-0 items-center justify-between gap-4">
        <Heading className="text-dark min-w-0 break-words text-xl font-bold">
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

      <p className="text-primary mb-4 break-words text-sm font-semibold">
        {job.technologies.join(", ")}
      </p>

      <p className="line-clamp-3 break-words">{job.description}</p>
    </article>
  );
}
