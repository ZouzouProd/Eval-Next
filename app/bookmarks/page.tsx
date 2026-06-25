import { BookmarkedJobs } from "@/components/BookmarkedJobs";
import { getPrismicJobs } from "@/lib/get-prismic-jobs";

export default async function BookmarksPage() {
  const jobs = await getPrismicJobs();

  return (
    <main>
      <BookmarkedJobs jobs={jobs} />
    </main>
  );
}
