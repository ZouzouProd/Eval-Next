"use client";

import { Application } from "@/components/Application";
import { ButtonLink } from "@/components/Button";
import { useJobStore } from "@/stores/job-store";

export function ApplicationsList() {
  const hasHydrated = useJobStore((state) => state.hasHydrated);
  const applications = useJobStore((state) => state.applications);

  return (
    <section className="mt-12">
      <h2 className="text-primary text-xl font-bold">
        Mes candidatures
      </h2>

      {!hasHydrated ? (
        <p className="py-8">Chargement des candidatures…</p>
      ) : applications.length ? (
        <div className="py-4">
          {applications.map((application) => (
            <Application application={application} key={application.id} />
          ))}
        </div>
      ) : (
        <div className="py-8">
          <p className="mb-4">
            Vous n’avez encore envoyé aucune candidature.
          </p>
          <ButtonLink href="/jobs">Découvrir les offres</ButtonLink>
        </div>
      )}
    </section>
  );
}
