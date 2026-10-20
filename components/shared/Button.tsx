

import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
};

const variants = {
  primary: "bg-forest text-white hover:bg-forest-deep",
  secondary:
    "border border-white/50 text-white hover:bg-white hover:text-forest",
  light: "bg-ivory text-forest hover:bg-white",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center gap-3 rounded-full px-6 py-3 text-sm font-semibold transition-colors duration-300 ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
