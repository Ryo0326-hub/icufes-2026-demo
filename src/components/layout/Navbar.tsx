import Link from "next/link";
import { MobileMenu, type NavItem } from "@/components/layout/MobileMenu";

const navItems: NavItem[] = [
  { href: "/", label: "ホーム" },
  { href: "/shops", label: "ショップマップ" },
  { href: "/events", label: "企画スケジュール" },
  { href: "/goods", label: "グッズ" },
  { href: "/access", label: "アクセス" },
  { href: "/news", label: "お知らせ" }
];

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-cyan-200/10 bg-slate-950/85 text-white shadow-[0_10px_50px_rgba(0,0,0,0.35)] backdrop-blur-xl">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex flex-col">
          <span className="text-lg font-black text-cyan-100">ICU祭 Webサイト</span>
          <span className="text-xs font-semibold text-slate-400">キャンパスフェスティバルガイド</span>
        </Link>
        <nav className="hidden items-center gap-1 md:flex" aria-label="メインナビゲーション">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-semibold text-slate-300 transition hover:bg-cyan-300/10 hover:text-cyan-100"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <MobileMenu items={navItems} />
      </div>
    </header>
  );
}
