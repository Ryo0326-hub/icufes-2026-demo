"use client";

import Link from "next/link";
import { useState } from "react";

export type NavItem = {
  href: string;
  label: string;
};

type MobileMenuProps = {
  items: NavItem[];
};

export function MobileMenu({ items }: MobileMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="shrink-0 md:hidden">
      <button
        type="button"
        className="min-h-11 rounded-full border border-cyan-200/30 bg-white/10 px-4 py-2 text-sm font-semibold text-cyan-100"
        aria-expanded={isOpen}
        aria-controls="mobile-navigation"
        onClick={() => setIsOpen((value) => !value)}
      >
        メニュー
      </button>
      {isOpen ? (
        <div id="mobile-navigation" className="absolute left-4 right-4 top-[calc(100%_+_0.5rem)] rounded-2xl border border-cyan-200/20 bg-slate-950/95 p-3 shadow-xl backdrop-blur">
          <nav className="grid gap-1" aria-label="モバイルナビゲーション">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl px-4 py-3 text-base font-semibold text-slate-200 hover:bg-cyan-300/10 hover:text-cyan-100"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      ) : null}
    </div>
  );
}
