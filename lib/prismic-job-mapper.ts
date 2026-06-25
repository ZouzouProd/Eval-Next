import type { Job } from "@/types/job";

type PrismicJobDocument = {
  id: string;
  uid: string | null;
  data: Record<string, unknown>;
  first_publication_date: string;
  last_publication_date: string;
};

function getTechnologies(value: unknown): {
  names: string[];
  uids: string[];
} {
  if (!Array.isArray(value)) {
    return { names: [], uids: [] };
  }

  const technologies = value
    .map((item) => {
      if (typeof item !== "object" || item === null) {
        return null;
      }

      const relation = (item as Record<string, unknown>).technologie;
      if (typeof relation !== "object" || relation === null) {
        return null;
      }

      const relationRecord = relation as Record<string, unknown>;
      const data = relationRecord.data;
      if (typeof data !== "object" || data === null) {
        return null;
      }

      const name = (data as Record<string, unknown>).name;
      const uid = relationRecord.uid;

      if (typeof name !== "string" || typeof uid !== "string") {
        return null;
      }

      return { name, uid };
    })
    .filter(
      (technology): technology is { name: string; uid: string } =>
        Boolean(technology),
    );

  return {
    names: technologies.map((technology) => technology.name),
    uids: technologies.map((technology) => technology.uid),
  };
}

function getAdminEmails(value: unknown): string[] {
  return Array.isArray(value)
    ? value.flatMap((item) => {
        const email = (item as { email?: unknown })?.email;
        return typeof email === "string" && email.trim()
          ? [email.trim()]
          : [];
      })
    : [];
}

export function mapPrismicJob(document: PrismicJobDocument): Job | null {
  if (!document.uid) {
    return null;
  }

  const technologies = getTechnologies(document.data.technologies);

  return {
    id: document.id,
    uid: document.uid,
    title: String(document.data.title || "Offre d’emploi"),
    date:
      typeof document.data.published_at === "string"
        ? document.data.published_at.slice(0, 10)
        : document.first_publication_date.slice(0, 10),
    technologies: technologies.names,
    technologyUids: technologies.uids,
    description: String(document.data.description || ""),
    adminEmails: getAdminEmails(document.data.admin_emails),
    lastPublicationDate: document.last_publication_date,
  };
}
