import { BookmarkedJobs } from "@/components/BookmarkedJobs";
import { ApplicationsList } from "@/components/ApplicationsList";
import { getPrismicJobs } from "@/lib/get-prismic-jobs";

export default async function ProfilePage() {
  const jobs = await getPrismicJobs();

  return (
    <main>
      <div className="border-dark mb-8 flex items-center justify-between gap-4 border-b-2">
        <h1 className="border-primary border-b-6 text-3xl">
          Bienvenue
        </h1>
      </div>

      <BookmarkedJobs jobs={jobs} />
      <ApplicationsList />
    </main>
  );
}
