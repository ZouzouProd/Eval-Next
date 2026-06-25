import Link from "next/link";

type TagProps = {
  active?: boolean;
  children: string;
  href: string;
};

export function Tag({ active = false, children, href }: TagProps) {
  return (
    <Link
      aria-current={active ? "page" : undefined}
      className={`border-2 px-4 py-2 text-sm font-semibold transition-colors ${
        active
          ? "border-dark text-dark"
          : "border-primary bg-white text-primary hover:border-dark hover:text-dark"
      }`}
      href={href}
    >
      {children}
    </Link>
  );
}
