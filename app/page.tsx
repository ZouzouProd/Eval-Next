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
      />

      <section className="py-12">
        <div className="border-dark mb-8 flex items-center justify-between gap-4 border-b-2">
          <h1 className="border-primary border-b-6 text-3xl">
            Nos dérnières opportunités
          </h1>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
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
