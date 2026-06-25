"use client";

import { Application } from "@/components/Application";
import { ButtonLink } from "@/components/Button";
import { useJobStore } from "@/stores/job-store";

export function ApplicationsList() {
  const hasHydrated = useJobStore((state) => state.hasHydrated);
  const applications = useJobStore((state) => state.applications);

  if (!hasHydrated) {
    return <p className="empty-state">Chargement des candidatures…</p>;
  }

  if (!applications.length) {
    return (
      <div className="empty-state empty-state--action">
        <p>Vous n’avez encore envoyé aucune candidature.</p>
        <ButtonLink href="/">Découvrir les offres</ButtonLink>
      </div>
    );
  }

  return (
    <div className="applications-list">
      {applications.map((application) => (
        <Application application={application} key={application.id} />
      ))}
    </div>
  );
}
