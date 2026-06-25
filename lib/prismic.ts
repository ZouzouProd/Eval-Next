import * as prismic from "@prismicio/client";

const repositoryName =
  process.env.NEXT_PUBLIC_PRISMIC_REPOSITORY_NAME?.trim() ?? "";

const routes: prismic.Route[] = [
  { type: "home_page", path: "/" },
  { type: "job", path: "/jobs/:uid" },
];

export const isPrismicConfigured = Boolean(repositoryName);

export function createPrismicClient() {
  if (!repositoryName) {
    return null;
  }

  return prismic.createClient(repositoryName, {
    routes,
    fetchOptions: {
      next: { revalidate: 60 },
    },
  });
}
