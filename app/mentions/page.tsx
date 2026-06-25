import { PrismicRichText } from "@prismicio/react";
import { createClient } from "@/prismicio";

export default async function MentionsPage() {
  const client = createClient();
  const page = await client.getSingle("mentions");

  return (
    <main className="mx-auto w-full max-w-4xl">
      <PrismicRichText
        components={{
          heading1: ({ children }) => (
            <h1 className="border-primary border-b-6 text-dark mb-8 border-dark pb-2 text-3xl font-bold">
              {children}
            </h1>
          ),
          heading2: ({ children }) => (
            <h2 className="text-dark mb-4 mt-10 text-2xl font-bold">
              {children}
            </h2>
          ),
          heading3: ({ children }) => (
            <h3 className="text-dark mb-3 mt-8 text-xl font-bold">
              {children}
            </h3>
          ),
          paragraph: ({ children }) => (
            <p className="text-dark mb-4 leading-7">{children}</p>
          ),
          strong: ({ children }) => (
            <strong className="font-bold">{children}</strong>
          ),
          hyperlink: ({ node, children }) => (
            <a
              className="text-primary font-semibold underline underline-offset-2"
              href={node.data.url}
            >
              {children}
            </a>
          )
        }}
        field={page.data.mentions}
      />
    </main>
  );
}
