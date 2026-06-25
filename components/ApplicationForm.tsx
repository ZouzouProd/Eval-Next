"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/Button";
import { useJobStore } from "@/stores/job-store";
import type { Job } from "@/types/job";

export function ApplicationForm({ job }: { job: Job }) {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const addApplication = useJobStore((state) => state.addApplication);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      setError("Écrivez un message avant d’envoyer votre candidature.");
      setSubmitted(false);
      return;
    }

    addApplication({
      id: crypto.randomUUID(),
      jobId: job.id,
      jobUid: job.uid,
      jobTitle: job.title,
      date: new Date().toISOString().slice(0, 10),
      technologies: job.technologies,
      message: trimmedMessage,
    });

    setError("");
    setSubmitted(true);
  }

  return (
    <form className="mt-12" onSubmit={handleSubmit}>

      <textarea
        className="border-primary min-h-64 w-full resize-y border-2 bg-white p-4 text-base outline-none focus:border-dark"
        id="application-message"
        name="message"
        onChange={(event) => {
          setMessage(event.target.value);
          setSubmitted(false);
        }}
        placeholder="Présentez votre motivation…"
        required
        value={message}
      />

      <div className="mt-4 flex justify-end">
        <Button type="submit">Envoyer ma candidature</Button>
      </div>

      {error ? (
        <p className="mt-3 text-right text-red-600">{error}</p>
      ) : null}

      {submitted ? (
        <p className="text-primary mt-4 text-xl font-semibold">
          Merci d&apos;avoir postulé, on revient vers vous.
        </p>
      ) : null}
    </form>
  );
}
