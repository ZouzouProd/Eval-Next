"use client";

import Image from "next/image";
import Link from "next/link";
import { useJobStore } from "@/stores/job-store";

type MenuProps = {
  logoAlt?: string;
  logoSrc: string;
};

const iconButtonClass =
  "text-white relative flex size-10 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-white/15 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

export function Menu({ logoAlt = "Accueil", logoSrc }: MenuProps) {
  const hasHydrated = useJobStore((state) => state.hasHydrated);
  const loggedIn = useJobStore((state) => state.loggedIn);
  const bookmarkCount = useJobStore(
    (state) => state.bookmarkedJobIds.length,
  );
  const logout = useJobStore((state) => state.logout);
  const showLoggedInMenu = hasHydrated && loggedIn;

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

      <nav
        aria-label="Navigation du profil"
        className="flex items-center gap-4"
      >
        {showLoggedInMenu ? (
          <>
            <Link
              aria-label={`${bookmarkCount} offre${bookmarkCount > 1 ? "s" : ""} en signet`}
              className={iconButtonClass}
              href="/bookmarks"
            >
              <span
                aria-hidden="true"
                className="material-symbols-outlined text-[28px] text-white"
              >
                bookmark
              </span>
              <span className="absolute -right-1 -top-1 flex min-h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[11px] font-bold leading-none text-white">
                {bookmarkCount}
              </span>
            </Link>

            <button
              aria-label="Se déconnecter"
              className={iconButtonClass}
              onClick={logout}
              type="button"
            >
              <span
                aria-hidden="true"
                className="material-symbols-outlined text-[28px] text-white"
              >
                logout
              </span>
            </button>
          </>
        ) : (
          <Link
            aria-label="Se connecter"
            className={iconButtonClass}
            href="/login"
          >
            <span
              aria-hidden="true"
              className="material-symbols-outlined text-[28px] text-white"
            >
              login
            </span>
          </Link>
        )}
      </nav>
    </header>
  );
}
