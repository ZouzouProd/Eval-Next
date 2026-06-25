import { NextResponse } from "next/server";
import { getPrismicJobs } from "@/lib/get-prismic-jobs";

export async function GET() {
  try {
    const jobs = await getPrismicJobs();

    const latestJobs = jobs.slice(0, 3).map((job) => ({
      id: job.id,
      uid: job.uid,
      title: job.title,
      publicationDate: job.date,
      technologies: job.technologies,
      description: job.description,
      url: `/jobs/${job.uid}`,
    }));

    return NextResponse.json({
      count: latestJobs.length,
      jobs: latestJobs,
    });
  } catch {
    return NextResponse.json(
      { error: "Impossible de récupérer les dernières offres d’emploi." },
      { status: 500 },
    );
  }
}
