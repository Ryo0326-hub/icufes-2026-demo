import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { cn, formatYen } from "@/lib/utils";
import type { FestivalGood } from "@/types/goods";

type GoodsCardProps = {
  item: FestivalGood;
  /** Matches home ranking ranks 2–5 glass card + horizontal scroll item widths */
  variant?: "default" | "ranking";
};

const statusLabels: Record<FestivalGood["status"], string> = {
  Available: "販売中",
  "Sold Out": "売り切れ",
  "Coming Soon": "近日公開"
};

export function GoodsCard({ item, variant = "default" }: GoodsCardProps) {
  if (variant === "ranking") {
    return (
      <Card
        className={cn(
          "relative min-w-full snap-start overflow-hidden p-4 text-white sm:min-w-[45%] lg:min-w-[30%] xl:min-w-[24%]",
          "border-white/15 bg-white/10 shadow-[0_0_30px_rgba(148,163,184,0.12)] backdrop-blur"
        )}
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-cyan-200/5" />
        <div className="relative">
          <ImageWithFallback src={item.imageUrl} alt={`${item.name}の画像`} className="h-36 w-full rounded-xl object-cover" />
        </div>
        <div className="relative mt-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <Badge className="bg-cyan-100/12 text-cyan-50">{statusLabels[item.status]}</Badge>
            <span className="text-sm font-black text-cyan-100 sm:text-base">{formatYen(item.price)}</span>
          </div>
          <h3 className="mt-3 break-words text-base font-black leading-tight text-white sm:text-lg">{item.name}</h3>
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-slate-300">{item.description}</p>
          <div className="mt-3 flex flex-wrap gap-1.5">
            {item.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} className="bg-cyan-100/12 text-cyan-50 text-xs">
                {tag}
              </Badge>
            ))}
          </div>
          <Link
            href="/goods"
            className="mt-4 inline-flex min-h-10 items-center justify-center rounded-full border border-cyan-200/30 px-4 py-2 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-200/12"
          >
            詳しく見る
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card className="border-white/15 bg-white/10 p-4 text-white shadow-[0_0_30px_rgba(148,163,184,0.12)] backdrop-blur">
      <ImageWithFallback src={item.imageUrl} alt={`${item.name}の画像`} className="h-40 w-full rounded-xl object-cover sm:h-48" />
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
        <Badge className="bg-cyan-100/12 text-cyan-50">{statusLabels[item.status]}</Badge>
        <span className="text-lg font-black text-cyan-100">{formatYen(item.price)}</span>
      </div>
      <h3 className="mt-3 break-words text-lg font-black leading-tight text-white sm:text-xl">{item.name}</h3>
      <p className="mt-2 break-words text-sm leading-6 text-slate-300">{item.description}</p>
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
