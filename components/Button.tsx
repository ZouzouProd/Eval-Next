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

export function Button({ children, className = "", ...props }: ButtonProps) {
  return (
    <button className={`button ${className}`.trim()} {...props}>
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
    <Link className={`button ${className}`.trim()} href={href} {...props}>
      {children}
    </Link>
  );
}
