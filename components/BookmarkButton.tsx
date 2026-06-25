"use client";

import { BookmarkIcon } from "@/components/Icons";
import { useJobStore } from "@/stores/job-store";

type BookmarkButtonProps = {
  jobId: string;
  jobTitle: string;
};

export function BookmarkButton({
  jobId,
  jobTitle,
}: BookmarkButtonProps) {
  const bookmarked = useJobStore((state) =>
    state.bookmarkedJobIds.includes(jobId),
  );
  const toggleBookmark = useJobStore((state) => state.toggleBookmark);

  return (
    <button
      aria-label={`${bookmarked ? "Retirer" : "Ajouter"} ${jobTitle} ${bookmarked ? "des" : "aux"} signets`}
      aria-pressed={bookmarked}
      className="icon-button job-card__bookmark"
      onClick={() => toggleBookmark(jobId)}
      type="button"
    >
      <BookmarkIcon filled={bookmarked} />
    </button>
  );
}
