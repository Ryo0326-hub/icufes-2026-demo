import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import type { FestivalEvent } from "@/types/event";

type EventCardProps = {
  event: FestivalEvent;
};

const categoryLabels: Record<FestivalEvent["category"], string> = {
  Stage: "ステージ",
  Performance: "パフォーマンス",
  Exhibition: "展示",
  Workshop: "ワークショップ",
  Talk: "トーク",
  Other: "その他"
};

export function EventCard({ event }: EventCardProps) {
  return (
    <Card className="flex h-full flex-col border-white/15 bg-white/10 p-4 text-white shadow-[0_0_30px_rgba(148,163,184,0.12)] backdrop-blur">
      <ImageWithFallback src={event.imageUrl} alt={`${event.title}の画像`} className="h-36 w-full rounded-xl object-cover sm:h-40" />
      <div className="mt-4 flex flex-1 flex-col">
        <Badge className="bg-cyan-100/12 text-cyan-50">{categoryLabels[event.category]}</Badge>
        <h3 className="mt-3 text-lg font-black leading-tight text-white sm:text-xl">{event.title}</h3>
        <p className="mt-1 text-sm font-semibold text-slate-300">{event.organization}</p>
        <p className="mt-3 text-sm font-bold text-cyan-100">
          {event.startTime} - {event.endTime} / {event.location}
        </p>
        <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">{event.description}</p>
        <Link href={`/events/${event.id}`} className="mt-auto pt-5 text-sm font-bold text-cyan-50 hover:text-white">
          詳しく見る
        </Link>
      </div>
    </Card>
  );
}
