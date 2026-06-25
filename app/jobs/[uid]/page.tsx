import * as prismic from "@prismicio/client";
import { notFound } from "next/navigation";
import { ApplicationForm } from "@/components/ApplicationForm";
import { ButtonLink } from "@/components/Button";
import { CalendarIcon } from "@/components/Icons";
import { Tag } from "@/components/Tag";
import { formatDate } from "@/lib/format-date";
import { mapPrismicJob } from "@/lib/prismic-job-mapper";
import { createClient } from "@/prismicio";

type JobPageProps = {
  params: Promise<{
    uid: string;
  }>;
};

export default async function JobPage({ params }: JobPageProps) {
  const { uid } = await params;
  const client = createClient();
  let document;

  try {
    document = await client.getByUID("job", uid, {
      fetchLinks: ["technologie.name"],
    });
  } catch (error) {
    if (error instanceof prismic.NotFoundError) {
      notFound();
    }

    throw error;
  }

  const job = mapPrismicJob(document);

  if (!job) {
    notFound();
  }

  return (
    <main>
      <ButtonLink className="mb-4" href="/jobs">
        Voir toutes les offres
      </ButtonLink>

      <div className="border-dark mb-8 flex items-center justify-between gap-4 border-b-2">
        <h1 className="border-primary border-b-6 text-3xl">
          {job.title}
        </h1>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        {job.technologies.map((technology, index) => {
          const technologyUid = job.technologyUids?.[index];

          return technologyUid ? (
            <Tag
              href={`/jobs/technologies/${technologyUid}`}
              key={technologyUid}
            >
              {technology}
            </Tag>
          ) : null;
        })}
      </div>

      <p className="mb-4 flex items-center gap-1">
        <CalendarIcon className="text-primary" />
        <time
          className="text-primary text-sm font-bold"
          dateTime={job.date}
        >
          {formatDate(job.date)}
        </time>
      </p>

      <p>{job.description}</p>

      <ApplicationForm job={job} />
    </main>
  );
}
