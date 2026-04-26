import Link from "next/link";
import { EventCard } from "@/components/events/EventCard";
import { GoodsCard } from "@/components/goods/GoodsCard";
import { WelcomeBubble } from "@/components/home/WelcomeBubble";
import { ShopRankingPreview } from "@/components/shops/ShopRankingPreview";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { events } from "@/data/events";
import { goods } from "@/data/goods";
import { news } from "@/data/news";
import { shops } from "@/data/shops";

export default function HomePage() {
  return (
    <div className="bg-[linear-gradient(180deg,#020617_0%,#030712_48%,#000_100%)] text-white">
      <section
        className="relative min-h-[calc(100dvh_-_4.25rem)] overflow-hidden bg-cover bg-center text-white lg:min-h-[92vh]"
        style={{ backgroundImage: "url('/images/backgrounds/background-image1.png')" }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.1),rgba(2,6,23,0.35)_34%,rgba(0,0,0,0.82)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#020617] to-transparent" />
        <div className="relative mx-auto grid min-h-[calc(100dvh_-_4.25rem)] max-w-7xl items-start gap-10 px-4 pb-14 pt-5 sm:px-6 sm:pb-20 sm:pt-8 lg:min-h-[92vh] lg:grid-cols-[minmax(0,1fr)_420px] lg:items-center lg:px-8 lg:py-20">
          <div className="max-w-4xl">
            <div className="mx-auto mb-5 grid w-fit justify-items-center lg:hidden">
              <WelcomeBubble
                className="min-w-28 rounded-2xl border-[3px] px-4 py-2"
                textClassName="text-lg sm:text-xl"
                tailClassName="-bottom-8 left-auto right-2 h-10 w-7 rotate-[24deg] rounded-b-full rounded-t-sm [clip-path:none]"
                tailInnerClassName="-bottom-[27px] left-auto right-[13px] h-9 w-5 rotate-[24deg] rounded-b-full rounded-t-sm [clip-path:none]"
              />
              <img
                src="/images/stickers/mascot-neutral.png"
                alt="ICU祭マスコット"
                className="mt-1 w-28 drop-shadow-[0_18px_34px_rgba(0,0,0,0.55)] sm:w-32"
              />
            </div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-100 sm:translate-x-10 sm:text-sm sm:tracking-[0.35em]">国際基督教大学祭</p>
            <h1 className="mt-5 text-5xl font-black leading-none tracking-tight text-white drop-shadow-2xl sm:mt-6 sm:translate-x-10 sm:text-7xl lg:text-8xl">
              ICU祭 2026
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-8 text-slate-200 sm:translate-x-10 sm:text-lg">
              星降るキャンパスで、まだ知らない物語に出会おう。
            </p>
            <div className="mt-8 grid gap-3 sm:mt-10 sm:flex sm:translate-x-10 sm:flex-wrap sm:gap-4">
              <ButtonLink href="/shops" className="w-full bg-cyan-300 px-7 py-3 text-slate-950 shadow-[0_0_36px_rgba(103,232,249,0.45)] hover:bg-cyan-200 sm:w-auto">
                お店を探す
              </ButtonLink>
              <ButtonLink href="/events" variant="secondary" className="w-full border-white/30 bg-white/10 px-7 py-3 text-white backdrop-blur hover:bg-white/20 sm:w-auto">
                企画を見る
              </ButtonLink>
            </div>
          </div>
          <div className="relative hidden min-h-[520px] lg:block">
            <div className="absolute right-8 top-20 z-20 w-64">
              <WelcomeBubble />
            </div>
            <div className="group absolute -bottom-0 right-60 z-10 w-[300px]">
              <img
                src="/images/stickers/mascot-neutral.png"
                alt="ICU祭マスコット"
                className="w-full drop-shadow-[0_28px_55px_rgba(0,0,0,0.62)] transition-opacity duration-200 group-hover:opacity-0"
              />
              <img
                src="/images/stickers/mascot-joy2.png"
                alt=""
                aria-hidden="true"
                className="absolute inset-0 w-full opacity-0 drop-shadow-[0_28px_55px_rgba(0,0,0,0.62)] transition-opacity duration-200 group-hover:opacity-100"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 sm:py-12 lg:gap-10 lg:px-8">
        <div className="relative min-w-0 max-w-full">
          <img
            src="/images/stickers/mascot-hanging.png"
            alt="ICU祭のぶら下がりマスコット"
            className="pointer-events-none absolute -left-8 -top-16 z-10 hidden w-32 rotate-[-8deg] drop-shadow-[0_18px_30px_rgba(0,0,0,0.55)] md:block lg:-left-12 lg:-top-8 lg:w-44"
          />
          <img
            src="/images/stickers/mascot-skydiving.png"
            alt="ICU祭のスカイダイビングマスコット"
            className="pointer-events-none absolute -right-8 top-10 z-10 hidden w-36 rotate-[10deg] drop-shadow-[0_18px_30px_rgba(0,0,0,0.55)] md:block lg:-right-16 lg:w-48"
          />
          <ShopRankingPreview shops={shops} />
        </div>

        <section className="mx-auto w-full min-w-0 max-w-full justify-self-center rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur sm:max-w-5xl sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-cyan-200">注目企画</h2>
            </div>
            <Link href="/events" className="shrink-0 text-sm font-bold text-cyan-200">
              すべて見る
            </Link>
          </div>
          <div className="flex min-w-0 snap-x gap-3 overflow-x-auto pb-2 sm:gap-4">
            {events.slice(0, 3).map((event) => (
              <EventCard key={event.id} event={event} variant="ranking" />
            ))}
          </div>
        </section>

        <section className="mx-auto w-full min-w-0 max-w-full justify-self-center rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur sm:max-w-5xl sm:p-6">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-cyan-200">公式グッズ</h2>
            </div>
            <Link href="/goods" className="shrink-0 text-sm font-bold text-cyan-200">
              グッズを見る
            </Link>
          </div>
          <div className="flex min-w-0 snap-x gap-3 overflow-x-auto pb-2 sm:gap-4">
            {goods.map((item) => (
              <GoodsCard key={item.id} item={item} variant="ranking" />
            ))}
          </div>
        </section>

        <section className="grid min-w-0 grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <Card className="border-white/15 bg-white/10 text-white shadow-[0_0_30px_rgba(148,163,184,0.12)] backdrop-blur">
            <Badge className="bg-cyan-100/12 text-cyan-50">アクセス</Badge>
            <h2 className="mt-3 break-words text-xl font-black text-white sm:text-2xl">ICUへのアクセス</h2>
            <p className="mt-3 break-words leading-7 text-slate-300">三鷹駅・武蔵境駅からバスでアクセスできます。公共交通機関の利用をおすすめします。</p>
            <Link href="/access" className="mt-4 inline-block text-sm font-bold text-cyan-50">
              アクセス情報へ
            </Link>
          </Card>
          <Card className="border-white/15 bg-white/10 text-white shadow-[0_0_30px_rgba(148,163,184,0.12)] backdrop-blur">
            <Badge className="bg-cyan-100/12 text-cyan-50">お知らせ</Badge>
            <h2 className="mt-3 break-words text-xl font-black text-white sm:text-2xl">最新のお知らせ</h2>
            <div className="mt-4 grid gap-3">
              {news.slice(0, 3).map((item) => (
                <Link key={item.id} href="/news" className="min-w-0 rounded-xl bg-slate-950/50 p-3 hover:bg-cyan-300/10">
                  <p className="text-xs font-bold text-cyan-200">{item.date}</p>
                  <p className="mt-1 break-words text-sm font-bold text-white">{item.title}</p>
                </Link>
              ))}
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
