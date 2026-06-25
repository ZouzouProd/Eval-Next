import { CalendarIcon } from "@/components/Icons";
import { formatDate } from "@/lib/format-date";
import type { JobApplication } from "@/types/job";

export function Application({
  application,
}: {
  application: JobApplication;
}) {
  return (
    <article className="border-primary w-full border-b-2 py-6">
      <p className="text-primary mb-2 flex items-center gap-1">
        <CalendarIcon className="text-primary" />
        <time className="text-sm font-bold" dateTime={application.date}>
          {formatDate(application.date)}
        </time>
      </p>

      <h2 className="text-dark mb-2 text-xl font-bold">
        {application.jobTitle}
      </h2>

      <p className="text-dark mb-4 text-sm font-semibold">
        {application.technologies.join(", ")}
      </p>

      <p className="text-primary">{application.message}</p>
    </article>
  );
}
