"use client";

import { FormEvent, useState } from "react";
import { Button } from "@/components/Button";
import { useJobStore } from "@/stores/job-store";
import type { Job } from "@/types/job";

export function ApplicationForm({ job }: { job: Job }) {
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const addApplication = useJobStore((state) => state.addApplication);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedMessage = message.trim();
    if (!trimmedMessage) {
      setError("Écrivez un message avant d’envoyer votre candidature.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/applications", {
        body: JSON.stringify({ jobUid: job.uid, message: trimmedMessage }),
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("La candidature n’a pas pu être préparée.");
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
      setSubmitted(true);
    } catch {
      setError("Une erreur est survenue. Réessayez dans un instant.");
    } finally {
      setIsSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <p className="application-form__success">
        merci d&apos;avoir postulé à cette offre
      </p>
    );
  }

  return (
    <form className="application-form" onSubmit={handleSubmit}>
      <label htmlFor="application-message">Votre candidature</label>
      <textarea
        id="application-message"
        name="message"
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Présentez votre motivation..."
        required
        rows={8}
        value={message}
      />
      <div className="application-form__footer">
        {error ? <p className="form-error">{error}</p> : <span />}
        <Button disabled={isSubmitting} type="submit">
          {isSubmitting ? "Envoi…" : "Envoyer"}
        </Button>
      </div>
    </form>
  );
}
