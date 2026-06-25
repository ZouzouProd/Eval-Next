import { ButtonLink } from "@/components/Button";

export default function NotFound() {
  return (
    <main className="flex min-h-80 flex-col items-center justify-center text-center">
      <p className="text-primary mb-2 text-xl font-bold">Erreur 404</p>
      <h1 className="text-dark mb-6 text-3xl font-bold">
        Cette page n’existe pas
      </h1>
      <ButtonLink href="/jobs">Voir toutes les offres</ButtonLink>
    </main>
  );
}
