import { createClient } from "@/prismicio";

export default async function JobPage({ params }) {
  const { uid } = await params;
  const client = createClient();

  const job = await client.getByUID("job", uid);

  return (
    <main>
      <h1>{job.data.title}</h1>
      <p>{job.data.description}</p>
    </main>
  );
}