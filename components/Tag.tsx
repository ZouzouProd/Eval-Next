"use client";

type TagProps = {
  children: string;
  active?: boolean;
  onClick?: () => void;
};

export function Tag({ children, active = false, onClick }: TagProps) {
  return (
    <button
      aria-pressed={active}
      className={`tag${active ? " tag--active" : ""}`}
      onClick={onClick}
      type="button"
    >
      {children}
    </button>
  );
}
