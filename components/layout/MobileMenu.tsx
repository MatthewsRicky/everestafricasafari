"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, X } from "lucide-react";
import { useEffect } from "react";
import Button from "@/components/shared/Button";
import { navigation } from "@/lib/navigation";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 bg-forest-deep text-white lg:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex h-full flex-col overflow-y-auto p-6 sm:p-10">
            <div className="flex items-center justify-between">
              <Link
                href="/"
                onClick={onClose}
                className="heading-display text-2xl"
              >
                EVEREST
              </Link>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close navigation menu"
                className="flex size-11 items-center justify-center rounded-full border border-white/20"
              >
                <X size={22} />
              </button>
            </div>

            <nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              className="my-auto py-12"
            >
              {navigation.map((item, index) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.06 }}
                >
                  <Link
                    href={item.href}
                    onClick={onClose}
                    className="flex items-center justify-between border-b border-white/15 py-5 heading-display text-3xl sm:text-4xl"
                  >
                    {item.label}
                    <ArrowUpRight size={21} className="text-safari-gold" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <Button href="/request-a-quote" variant="light" className="w-full">
              Plan Your Safari
              <ArrowUpRight size={16} />
            </Button>

            <p className="mt-6 text-center text-xs tracking-widest text-white/50">
              YOUR AFRICAN ADVENTURE STARTS HERE
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
