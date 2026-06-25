"use client";

import Image from "next/image";
import Link from "next/link";
import { useJobStore } from "@/stores/job-store";

type MenuProps = {
  logoAlt?: string;
  logoSrc: string;
};

export function Menu({ logoAlt = "Accueil", logoSrc }: MenuProps) {
  const hasHydrated = useJobStore((state) => state.hasHydrated);
  const bookmarkCount = useJobStore(
    (state) => state.bookmarkedJobIds.length,
  );
  const visibleBookmarkCount = hasHydrated ? bookmarkCount : 0;

  return (
    <header className="bg-dark flex w-full items-center justify-between px-25 py-9.5">
      <Link aria-label="Retour à l’accueil" href="/">
        <Image
          alt={logoAlt}
          className="h-6 w-auto object-contain brightness-0 invert"
          height={24}
          priority
          src={logoSrc}
          width={80}
        />
      </Link>

      <nav aria-label="Navigation" className="flex items-center gap-4">
        <Link
          aria-label={`${visibleBookmarkCount} offre${visibleBookmarkCount > 1 ? "s" : ""} enregistrée${visibleBookmarkCount > 1 ? "s" : ""}`}
          className="flex cursor-pointer items-center gap-2 rounded-full px-2 py-1 text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          href="/bookmarks"
        >
          <span className="min-w-4 text-right text-sm font-bold">
            {visibleBookmarkCount}
          </span>
          <span
            aria-hidden="true"
            className="material-symbols-outlined text-[28px] text-white"
          >
            bookmark
          </span>
        </Link>

        <Link
          aria-label="Voir mon profil"
          className="flex size-10 cursor-pointer items-center justify-center rounded-full text-white transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          href="/profile"
        >
          <span
            aria-hidden="true"
            className="material-symbols-outlined text-[28px] text-white"
          >
            person
          </span>
        </Link>
      </nav>
    </header>
  );
}
