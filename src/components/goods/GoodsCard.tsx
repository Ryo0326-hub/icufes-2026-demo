import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { formatYen } from "@/lib/utils";
import type { FestivalGood } from "@/types/goods";

type GoodsCardProps = {
  item: FestivalGood;
};

const statusLabels: Record<FestivalGood["status"], string> = {
  Available: "販売中",
  "Sold Out": "売り切れ",
  "Coming Soon": "近日公開"
};

export function GoodsCard({ item }: GoodsCardProps) {
  return (
    <Card className="border-white/15 bg-white/10 p-4 text-white shadow-[0_0_30px_rgba(148,163,184,0.12)] backdrop-blur">
      <ImageWithFallback src={item.imageUrl} alt={`${item.name}の画像`} className="h-40 w-full rounded-xl object-cover sm:h-48" />
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <Badge className="bg-cyan-100/12 text-cyan-50">{statusLabels[item.status]}</Badge>
        <span className="text-lg font-black text-cyan-100">{formatYen(item.price)}</span>
      </div>
      <h3 className="mt-3 text-lg font-black leading-tight text-white sm:text-xl">{item.name}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-300">{item.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {item.tags.map((tag) => (
          <Badge key={tag} className="bg-cyan-100/12 text-cyan-50">
            {tag}
          </Badge>
        ))}
      </div>
    </Card>
  );
}
