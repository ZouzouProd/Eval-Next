import Link from "next/link";

type PaginationProps = {
  currentPage: number;
  pageCount: number;
  pathname: string;
};

export function Pagination({
  currentPage,
  pageCount,
  pathname,
}: PaginationProps) {
  if (pageCount <= 1) {
    return null;
  }

  return (
    <nav
      className="mt-10 flex items-center justify-center gap-2"
    >
      {currentPage > 1 ? (
        <Link
          className="border-primary text-primary px-3 py-2 font-semibold hover:bg-primary hover:text-white"
          href={`${pathname}?page=${currentPage - 1}`}
        >
          Précédent
        </Link>
      ) : null}

      {Array.from({ length: pageCount }, (_, index) => index + 1).map(
        (page) => (
          <Link
            className={`flex size-10 items-center justify-center border font-semibold ${
              page === currentPage
                ? "border-primary bg-primary text-white"
                : "border-dark text-dark hover:border-primary hover:text-primary"
            }`}
            href={`${pathname}?page=${page}`}
            key={page}
          >
            {page}
          </Link>
        ),
      )}

      {currentPage < pageCount ? (
        <Link
          className="border-primary text-primary px-3 py-2 font-semibold hover:bg-primary hover:text-white"
          href={`${pathname}?page=${currentPage + 1}`}
        >
          Suivant
        </Link>
      ) : null}
    </nav>
  );
}
