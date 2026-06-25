import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

function IconBase({ children, ...props }: IconProps) {
  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      height="24"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      {children}
    </svg>
  );
}

export function LoginIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M10 17v-3H3v-4h7V7l5 5-5 5Zm4-12V3h7v18h-7v-2h5V5h-5Z" />
    </IconBase>
  );
}

export function LogoutIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M14 17v-3H7v-4h7V7l5 5-5 5ZM3 3h9v2H5v14h7v2H3V3Z" />
    </IconBase>
  );
}

export function BookmarkIcon({
  filled = false,
  ...props
}: IconProps & { filled?: boolean }) {
  return (
    <IconBase {...props}>
      {filled ? (
        <path d="M5 21V5c0-.55.2-1.02.59-1.41C5.98 3.2 6.45 3 7 3h10c.55 0 1.02.2 1.41.59.39.39.59.86.59 1.41v16l-7-3-7 3Z" />
      ) : (
        <path d="M5 21V5c0-.55.2-1.02.59-1.41C5.98 3.2 6.45 3 7 3h10c.55 0 1.02.2 1.41.59.39.39.59.86.59 1.41v16l-7-3-7 3Zm2-3.05 5-2.15 5 2.15V5H7v12.95Z" />
      )}
    </IconBase>
  );
}

export function CalendarIcon(props: IconProps) {
  return (
    <IconBase {...props}>
      <path d="M7 11h2v2H7v-2Zm0 4h2v2H7v-2Zm4-4h2v2h-2v-2Zm0 4h2v2h-2v-2Zm4-4h2v2h-2v-2Zm0 4h2v2h-2v-2ZM5 22c-.55 0-1.02-.2-1.41-.59C3.2 21.02 3 20.55 3 20V6c0-.55.2-1.02.59-1.41C3.98 4.2 4.45 4 5 4h1V2h2v2h8V2h2v2h1c.55 0 1.02.2 1.41.59.39.39.59.86.59 1.41v14c0 .55-.2 1.02-.59 1.41-.39.39-.86.59-1.41.59H5Zm0-2h14V10H5v10Zm0-12h14V6H5v2Z" />
    </IconBase>
  );
}
