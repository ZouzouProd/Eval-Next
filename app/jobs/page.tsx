import { JobCard } from "@/components/JobCard";
import { createClient } from "@/prismicio";
import type { Job } from "@/types/job";

export default async function JobsPage() {
  const client = createClient();

  const documents = await client.getAllByType("job", {
    orderings: [
      {
        field: "my.job.published_at",
        direction: "desc",
      },
    ],
  });

  const jobs: Job[] = documents
    .filter((document) => Boolean(document.uid))
    .map((document) => ({
      id: document.id,
      uid: document.uid as string,
      title: String(document.data.title || "Offre d’emploi"),
      date:
        typeof document.data.published_at === "string"
          ? document.data.published_at.slice(0, 10)
          : document.first_publication_date.slice(0, 10),
      technologies:
        typeof document.data.technologies === "string"
          ? [document.data.technologies]
          : [],
      description: String(document.data.description || ""),
      adminEmails: [],
      lastPublicationDate: document.last_publication_date,
    }));

  return (
    <main>
      <div className="border-dark flex items-center justify-between gap-4 border-b-2">
        <h1 className="border-primary border-b-6 text-3xl">
          Offres d’emploi
        </h1>
        <span className="text-primary font-semibold">
          {jobs.length} offre{jobs.length > 1 ? "s" : ""} disponible
          {jobs.length > 1 ? "s" : ""}
        </span>
      </div>

      {jobs.length === 0 ? (
        <p className="py-8">Aucune offre disponible.</p>
      ) : (
        <div className="grid gap-6 py-8">
          {jobs.map((job) => (
            <JobCard job={job} key={job.id} />
          ))}
        </div>
      )}
    </main>
  );
}
