import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-cyan-200/10 bg-slate-950 text-slate-300">
      <div className="mx-auto grid max-w-7xl gap-6 px-4 py-10 text-sm sm:px-6 md:grid-cols-[1fr_auto] lg:px-8">
        <div>
          <p className="text-base font-bold text-cyan-100">ICU祭 2026</p>
          <p className="mt-2 max-w-2xl">
            キャンパスを歩きながら、お店・企画・グッズを見つけるためのデモWebサイトです。
          </p>
        </div>
        <div className="flex flex-wrap gap-3 font-semibold text-cyan-200">
          <Link href="/about">ICU祭について</Link>
          <Link href="/access">アクセス</Link>
          <Link href="/news">お知らせ</Link>
        </div>
      </div>
    </footer>
  );
}
