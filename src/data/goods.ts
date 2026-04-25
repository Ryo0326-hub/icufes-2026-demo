import type { FestivalGood } from "@/types/goods";

export const goods: FestivalGood[] = [
  {
    id: "tshirt-2026",
    name: "ICU祭 オリジナルTシャツ",
    description: "ICU祭限定デザインのオリジナルTシャツです。",
    price: 2500,
    imageUrl: "/images/placeholders/pencil-goods-1.svg",
    status: "Available",
    tags: ["Tシャツ", "公式"]
  },
  {
    id: "tote-bag-2026",
    name: "ICU祭 トートバッグ",
    description: "普段使いしやすいシンプルなトートバッグです。",
    price: 1800,
    imageUrl: "/images/placeholders/pencil-goods-2.svg",
    status: "Available",
    tags: ["バッグ", "公式"]
  },
  {
    id: "sticker-set-2026",
    name: "ICU祭 ステッカーセット",
    description: "ICU祭ロゴやキャンパスモチーフを使ったステッカーセットです。",
    price: 500,
    imageUrl: "/images/placeholders/pencil-goods-3.svg",
    status: "Coming Soon",
    tags: ["ステッカー", "小物"]
  }
];
