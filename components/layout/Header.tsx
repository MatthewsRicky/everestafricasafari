"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, Menu } from "lucide-react";
import Container from "@/components/shared/Container";
import Button from "@/components/shared/Button";
import MobileMenu from "@/components/layout/MobileMenu";
import { navigation } from "@/lib/navigation";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-border/70 bg-ivory/95 backdrop-blur-md">
        <Container>
          <div className="flex h-[76px] items-center justify-between gap-5">
            <Link
              href="/"
              className="flex shrink-0 flex-col"
              aria-label="Everest Africa Safari home"
            >
              <span className="heading-display text-xl font-bold tracking-tight text-forest sm:text-2xl">
                EVEREST
              </span>
              <span className="text-[9px] font-bold uppercase tracking-[0.27em] text-muted">
                Africa Safari
              </span>
            </Link>

            <nav
              aria-label="Main navigation"
              className="hidden items-center gap-6 lg:flex xl:gap-8"
            >
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm font-medium text-ink/80 transition-colors hover:text-forest"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:block">
              <Button href="/request-a-quote" className="min-h-11">
                Plan Your Safari
                <ArrowUpRight size={16} />
              </Button>
            </div>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="Open navigation menu"
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              className="flex size-11 items-center justify-center rounded-full border border-border text-forest lg:hidden"
            >
              <Menu size={22} />
            </button>
          </div>
        </Container>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  );
}
