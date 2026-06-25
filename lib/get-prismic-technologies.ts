import { cache } from "react";
import { createClient } from "@/prismicio";
import type { Technology } from "@/types/job";

export const getPrismicTechnologies = cache(
  async (): Promise<Technology[]> => {
    const client = createClient();
    const documents = await client.getAllByType("technologie", {
      orderings: [
        {
          field: "my.technologie.name",
          direction: "asc",
        },
      ],
    });

    return documents
      .filter((document) => Boolean(document.uid && document.data.name))
      .map((document) => ({
        name: document.data.name as string,
        uid: document.uid,
      }));
  },
);
