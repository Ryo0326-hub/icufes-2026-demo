import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import type { Shop } from "@/types/shop";

type ShopCardProps = {
  shop: Shop;
  votes?: number;
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

export function ShopCard({ shop, votes = shop.votes }: ShopCardProps) {
  return (
    <Card className="flex h-full flex-col p-4">
      <ImageWithFallback src={shop.imageUrl} alt={`${shop.name}の画像`} className="h-40 w-full rounded-xl object-cover" />
      <div className="mt-4 flex flex-1 flex-col">
        <div className="flex items-center justify-between gap-2">
          <Badge>{categoryLabels[shop.category]}</Badge>
          <span className="text-sm font-black text-blue-700">#{shop.number}</span>
        </div>
        <h3 className="mt-3 text-xl font-black text-slate-900">{shop.name}</h3>
        <p className="mt-1 text-sm font-semibold text-slate-500">{shop.organization}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-600">{shop.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {shop.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} className="bg-slate-100 text-slate-700">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-5">
          <span className="text-sm font-bold text-blue-700">{votes}票</span>
          <Link href={`/shops/${shop.id}`} className="text-sm font-bold text-blue-700 hover:text-blue-900">
            詳しく見る
          </Link>
        </div>
      </div>
    </Card>
  );
}
