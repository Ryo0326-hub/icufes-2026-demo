import { notFound } from "next/navigation";
import { ShopDetailVote } from "@/components/shops/ShopDetailVote";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { shops } from "@/data/shops";
import type { Shop } from "@/types/shop";

type ShopDetailPageProps = {
  params: {
    id: string;
  };
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

export function generateStaticParams() {
  return shops.map((shop) => ({ id: shop.id }));
}

export default function ShopDetailPage({ params }: ShopDetailPageProps) {
  const shop = shops.find((item) => item.id === params.id);

  if (!shop) {
    notFound();
  }

  return (
    <div
      className="min-h-dvh bg-[#020617] bg-cover bg-center px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
      style={{ backgroundImage: "linear-gradient(rgba(2,6,23,0.72), rgba(2,6,23,0.94)), url('/images/backgrounds/background-image1.png')" }}
    >
      <div className="mx-auto max-w-5xl">
        <Card className="grid gap-6 p-4 sm:p-5 md:grid-cols-[280px_1fr] md:gap-8 md:p-8 lg:grid-cols-[320px_1fr]">
          <ImageWithFallback src={shop.imageUrl} alt={`${shop.name}の画像`} className="h-56 w-full rounded-2xl object-cover sm:h-72" />
          <div>
            <p className="text-sm font-black text-blue-700">#{shop.number}</p>
            <h1 className="mt-2 text-3xl font-black leading-tight text-slate-900 sm:text-4xl">{shop.name}</h1>
            <p className="mt-2 text-base font-semibold text-slate-600 sm:text-lg">{shop.organization}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <Badge>{categoryLabels[shop.category]}</Badge>
              {shop.tags.map((tag) => (
                <Badge key={tag} className="bg-slate-100 text-slate-700">
                  {tag}
                </Badge>
              ))}
            </div>
            <p className="mt-6 leading-8 text-slate-700">{shop.description}</p>
            <dl className="mt-6 grid gap-4 rounded-2xl bg-blue-50 p-4 text-sm sm:grid-cols-3">
              <div>
                <dt className="font-bold text-slate-900">場所</dt>
                <dd className="mt-1 text-slate-600">{shop.locationLabel}</dd>
              </div>
              <div>
                <dt className="font-bold text-slate-900">営業時間</dt>
                <dd className="mt-1 text-slate-600">
                  {shop.openTime} - {shop.closeTime}
                </dd>
              </div>
              <div>
                <dt className="font-bold text-slate-900">投票数</dt>
                <dd className="mt-1 text-slate-600">{shop.votes}票</dd>
              </div>
            </dl>
            <div className="mt-6">
              <ShopDetailVote initialVotes={shop.votes} />
            </div>
            <div className="mt-6 grid gap-3 sm:flex sm:flex-wrap">
              <ButtonLink href="/map" className="w-full sm:w-auto">マップに戻る</ButtonLink>
              <ButtonLink href="/shops" variant="secondary" className="w-full sm:w-auto">
                お店一覧に戻る
              </ButtonLink>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
