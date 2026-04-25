"use client";

import { ShopRankingCarousel } from "@/components/shops/ShopRankingCarousel";
import type { Shop } from "@/types/shop";

type ShopRankingPreviewProps = {
  shops: Shop[];
};

export function ShopRankingPreview({ shops }: ShopRankingPreviewProps) {
  return <ShopRankingCarousel shops={shops} getVotes={(shop) => shop.votes} />;
}
