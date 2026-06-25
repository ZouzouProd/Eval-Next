import { CalendarIcon } from "@/components/Icons";
import { formatDate } from "@/lib/format-date";
import type { JobApplication } from "@/types/job";

export function Application({
  application,
}: {
  application: JobApplication;
}) {
  return (
    <article className="application">
      <p className="application__date">
        <CalendarIcon />
        <time dateTime={application.date}>
          {formatDate(application.date)}
        </time>
      </p>
      <h2>{application.jobTitle}</h2>
      <p className="application__technologies">
        {application.technologies.join(", ")}
      </p>
      <p className="application__message">{application.message}</p>
      <div aria-hidden="true" className="application__separator" />
    </article>
  );
}
