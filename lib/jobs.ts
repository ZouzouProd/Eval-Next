import { cache } from "react";
import * as prismic from "@prismicio/client";
import { notFound } from "next/navigation";
import { createPrismicClient } from "@/lib/prismic";
import type { HomePageContent, Job, SiteSettings } from "@/types/job";

const fallbackJobs: Job[] = [
  {
    id: "job-frontend",
    uid: "developpeur-front-end",
    title: "Développeur Front-end",
    date: "2026-06-18",
    technologies: ["Next.js", "React", "TypeScript"],
    description:
      "Vous rejoignez une équipe produit pour concevoir des interfaces accessibles, rapides et agréables à utiliser.",
    adminEmails: ["recrutement@example.com"],
    lastPublicationDate: "2026-06-18T08:00:00.000Z",
  },
  {
    id: "job-backend",
    uid: "developpeur-back-end",
    title: "Développeur Back-end",
    date: "2026-06-12",
    technologies: ["Node.js", "PostgreSQL", "Docker"],
    description:
      "Vous développerez les API et les services métier d’une plateforme utilisée quotidiennement par nos clients.",
    adminEmails: ["tech@example.com"],
    lastPublicationDate: "2026-06-12T08:00:00.000Z",
  },
  {
    id: "job-product",
    uid: "product-designer",
    title: "Product Designer",
    date: "2026-06-05",
    technologies: ["Figma", "Design System", "Recherche utilisateur"],
    description:
      "Vous transformerez les besoins utilisateurs en parcours simples, cohérents et testables avec l’équipe produit.",
    adminEmails: ["design@example.com"],
    lastPublicationDate: "2026-06-05T08:00:00.000Z",
  },
  {
    id: "job-fullstack",
    uid: "developpeur-full-stack",
    title: "Développeur Full-stack",
    date: "2026-05-27",
    technologies: ["Next.js", "Node.js", "Prismic"],
    description:
      "Vous interviendrez sur toute la chaîne produit, du contenu administrable aux fonctionnalités côté serveur.",
    adminEmails: ["recrutement@example.com", "tech@example.com"],
    lastPublicationDate: "2026-05-27T08:00:00.000Z",
  },
];

const fallbackHome: HomePageContent = {
  title: "Trouvez l’offre qui vous ressemble",
  introduction:
    "Découvrez les opportunités disponibles et filtrez-les par technologie.",
};

const fallbackSettings: SiteSettings = {
  logoText: "DEV JOBS",
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function readText(value: unknown): string {
  if (typeof value === "string") {
    return value.trim();
  }

  if (Array.isArray(value)) {
    try {
      return prismic.asText(value as prismic.RichTextField)?.trim() ?? "";
    } catch {
      return "";
    }
  }

  return "";
}

function readGroup(
  value: unknown,
  possibleKeys: string[],
): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map((item) => {
      if (!isRecord(item)) {
        return "";
      }

      for (const key of possibleKeys) {
        const text = readText(item[key]);
        if (text) {
          return text;
        }
      }

      return "";
    })
    .filter((item): item is string => Boolean(item));
}

function normalizeJob(
  document: prismic.PrismicDocument<Record<string, prismic.AnyRegularField>>,
): Job | null {
  if (!document.uid) {
    return null;
  }

  const data = document.data as Record<string, unknown>;
  const date =
    typeof data.date === "string"
      ? data.date
      : document.first_publication_date.slice(0, 10);

  return {
    id: document.id,
    uid: document.uid,
    title: readText(data.title) || "Offre d’emploi",
    date,
    technologies: readGroup(data.technologies, [
      "technology",
      "technologie",
      "name",
    ]),
    description: readText(data.description),
    adminEmails: readGroup(data.admin_emails, ["email", "address"]),
    lastPublicationDate: document.last_publication_date,
  };
}

export const getJobs = cache(async (): Promise<Job[]> => {
  const client = createPrismicClient();

  if (!client) {
    return fallbackJobs;
  }

  const documents = await client.getAllByType("job", {
    orderings: [
      { field: "my.job.date", direction: "desc" },
      { field: "document.last_publication_date", direction: "desc" },
    ],
  });

  return documents
    .map((document) => normalizeJob(document))
    .filter((job): job is Job => Boolean(job));
});

export const getJobByUid = cache(
  async (uid: string): Promise<Job | null> => {
    const client = createPrismicClient();

    if (!client) {
      return fallbackJobs.find((job) => job.uid === uid) ?? null;
    }

    try {
      const document = await client.getByUID("job", uid);
      return normalizeJob(document);
    } catch (error) {
      if (error instanceof prismic.NotFoundError) {
        return null;
      }

      throw error;
    }
  },
);

export async function getJobOrThrow(uid: string): Promise<Job> {
  const job = await getJobByUid(uid);

  if (!job) {
    notFound();
  }

  return job;
}

export const getHomePageContent = cache(
  async (): Promise<HomePageContent> => {
    const client = createPrismicClient();

    if (!client) {
      return fallbackHome;
    }

    try {
      const document = await client.getSingle("home_page");
      const data = document.data as Record<string, unknown>;

      return {
        title: readText(data.title) || fallbackHome.title,
        introduction:
          readText(data.introduction) || fallbackHome.introduction,
      };
    } catch (error) {
      if (error instanceof prismic.NotFoundError) {
        return fallbackHome;
      }

      throw error;
    }
  },
);

export const getSiteSettings = cache(async (): Promise<SiteSettings> => {
  const client = createPrismicClient();

  if (!client) {
    return fallbackSettings;
  }

  try {
    const document = await client.getSingle("site_settings");
    const data = document.data as Record<string, unknown>;

    return {
      logoText: readText(data.logo_text) || fallbackSettings.logoText,
    };
  } catch (error) {
    if (error instanceof prismic.NotFoundError) {
      return fallbackSettings;
    }

    throw error;
  }
});
