import Link from "next/link";
import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

type ButtonLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  href: string;
};

const buttonClass =
  "inline-flex cursor-pointer items-center justify-center bg-primary px-3 py-2 text-lg text-white transition-colors hover:bg-dark hover:text-primary";

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button className={`${buttonClass} ${className}`.trim()} {...props}>
      {children}
    </button>
  );
}

export function ButtonLink({
  children,
  className = "",
  href,
  ...props
}: ButtonLinkProps) {
  return (
    <Link
      className={`${buttonClass} ${className}`.trim()}
      href={href}
      {...props}
    >
      {children}
    </Link>
  );
}
