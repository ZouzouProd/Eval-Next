import { cache } from "react";
import { mapPrismicJob } from "@/lib/prismic-job-mapper";
import { createClient } from "@/prismicio";
import type { Job } from "@/types/job";

export const getPrismicJobs = cache(async (): Promise<Job[]> => {
  const client = createClient();
  const documents = await client.getAllByType("job", {
    fetchLinks: ["technologie.name"],
    orderings: [
      {
        field: "my.job.published_at",
        direction: "desc",
      },
    ],
  });

  return documents
    .map((document) => mapPrismicJob(document))
    .filter((job): job is Job => Boolean(job));
});
