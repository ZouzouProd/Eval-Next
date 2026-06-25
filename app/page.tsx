import { PrismicNextImage } from "@prismicio/next";
import { ButtonLink } from "@/components/Button";
import { JobCard } from "@/components/JobCard";
import { getPrismicJobs } from "@/lib/get-prismic-jobs";
import { createClient } from "@/prismicio";

export default async function HomePage() {
  const client = createClient();

  const [homePage, jobs] = await Promise.all([
    client.getSingle("home_page"),
    getPrismicJobs(),
  ]);

  const latestJobs = jobs.slice(0, 3);

  return (
    <main>
      <PrismicNextImage
        field={homePage.data.hero_image}
        className="h-[500px] w-full object-cover"
        priority
      />

      <section className="py-12">
        <h1 className="text-dark mb-8 text-3xl font-bold">
          Dernières offres d’emploi
        </h1>

        <div className="grid gap-6">
          {latestJobs.map((job) => (
            <JobCard job={job} key={job.id} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <ButtonLink href="/jobs">
            Voir plus d’offres
          </ButtonLink>
        </div>
      </section>
    </main>
  );
}