

import Link from "next/link";
import type { ReactNode } from "react";

type ButtonProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "light";
  className?: string;
};


const variants = {
  primary: "bg-maroon text-white hover:bg-maroon-deep",
  secondary:
    "border border-white/60 text-white hover:bg-white hover:text-maroon-deep",
  light: "bg-ivory text-maroon-deep hover:bg-white",
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
