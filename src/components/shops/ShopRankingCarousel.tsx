"use client";

import { useRef } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { getTopShops } from "@/lib/ranking";
import type { Shop } from "@/types/shop";

type ShopRankingCarouselProps = {
  shops: Shop[];
  getVotes: (shop: Shop) => number;
};

const categoryLabels: Record<Shop["category"], string> = {
  Food: "フード",
  Drink: "ドリンク",
  Dessert: "スイーツ",
  Goods: "グッズ",
  Experience: "体験",
  "Local Business": "地域出店",
  Other: "その他"
};

export function ShopRankingCarousel({ shops, getVotes }: ShopRankingCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const topShops = getTopShops(shops, getVotes, 5);
  const firstPlaceStyle = {
    card: "border-amber-200/45 bg-[linear-gradient(135deg,rgba(251,191,36,0.24),rgba(15,23,42,0.72),rgba(255,255,255,0.08))] shadow-[0_0_44px_rgba(251,191,36,0.22)]",
    badge: "bg-amber-200 text-slate-950",
    category: "bg-amber-100/18 text-amber-50",
    votes: "text-amber-100",
    link: "border-amber-200/40 text-amber-50 hover:bg-amber-200/15"
  };
  const glassStyle = {
    card: "border-white/15 bg-white/10 shadow-[0_0_30px_rgba(148,163,184,0.12)] backdrop-blur",
    badge: "bg-cyan-200 text-slate-950",
    category: "bg-cyan-100/12 text-cyan-50",
    votes: "text-cyan-100",
    link: "border-cyan-200/30 text-cyan-50 hover:bg-cyan-200/12"
  };

  function scrollByCard(direction: "left" | "right") {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -320 : 320,
      behavior: "smooth"
    });
  }

  return (
    <section className="mx-auto w-full max-w-5xl justify-self-center rounded-3xl border border-white/10 bg-slate-950/70 p-4 shadow-[0_24px_80px_rgba(0,0,0,0.28)] backdrop-blur sm:p-6">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-cyan-200">ランキング</p>
          <h2 className="text-2xl font-black text-white">人気のお店ランキング トップ5</h2>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="secondary" className="px-3" onClick={() => scrollByCard("left")} aria-label="ランキングを左に移動">
            ←
          </Button>
          <Button type="button" variant="secondary" className="px-3" onClick={() => scrollByCard("right")} aria-label="ランキングを右に移動">
            →
          </Button>
        </div>
      </div>
      <div ref={scrollRef} className="flex snap-x gap-4 overflow-x-auto pb-2">
        {topShops.map((shop, index) => {
          const style = index === 0 ? firstPlaceStyle : glassStyle;

          return (
          <Card
            key={shop.id}
            className={`relative min-w-[82%] snap-start overflow-hidden p-4 sm:min-w-[45%] lg:min-w-[30%] xl:min-w-[24%] ${style.card}`}
          >
            {index === 0 ? (
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-amber-200/20 blur-2xl" />
            ) : (
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-cyan-200/5" />
            )}
            <div className="relative">
              <ImageWithFallback src={shop.imageUrl} alt={`${shop.name}の画像`} className="h-36 w-full rounded-xl object-cover" />
              <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-sm font-black shadow-lg ${style.badge}`}>
                #{index + 1}
              </span>
            </div>
            <div className="relative mt-4">
              <Badge className={style.category}>{categoryLabels[shop.category]}</Badge>
              <h3 className="mt-3 text-lg font-black text-white">{shop.name}</h3>
              <p className="mt-1 text-sm font-semibold text-slate-300">{shop.organization}</p>
              <p className={`mt-3 text-sm font-bold ${style.votes}`}>{getVotes(shop)}票</p>
              <Link
                href={`/shops/${shop.id}`}
                className={`mt-4 inline-flex rounded-full border px-4 py-2 text-sm font-semibold transition ${style.link}`}
              >
                詳しく見る
              </Link>
            </div>
          </Card>
          );
        })}
      </div>
    </section>
  );
}
