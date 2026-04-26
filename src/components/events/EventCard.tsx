import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { cn } from "@/lib/utils";
import type { FestivalEvent } from "@/types/event";

type EventCardProps = {
  event: FestivalEvent;
  /** Matches home ranking ranks 2–5 glass card + horizontal scroll item widths */
  variant?: "default" | "ranking";
};

const categoryLabels: Record<FestivalEvent["category"], string> = {
  Stage: "ステージ",
  Performance: "パフォーマンス",
  Exhibition: "展示",
  Workshop: "ワークショップ",
  Talk: "トーク",
  Other: "その他"
};

export function EventCard({ event, variant = "default" }: EventCardProps) {
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
          <ImageWithFallback
            src={event.imageUrl}
            alt={`${event.title}の画像`}
            className="h-36 w-full rounded-xl object-cover"
          />
        </div>
        <div className="relative mt-4">
          <Badge className="bg-cyan-100/12 text-cyan-50">{categoryLabels[event.category]}</Badge>
          <h3 className="mt-3 break-words text-base font-black leading-tight text-white sm:text-lg">{event.title}</h3>
          <p className="mt-1 truncate text-sm font-semibold text-slate-300">{event.organization}</p>
          <p className="mt-3 break-words text-sm font-bold text-cyan-100">
            {event.startTime} - {event.endTime} / {event.location}
          </p>
          <p className="mt-3 line-clamp-3 text-sm leading-6 text-slate-300">{event.description}</p>
          <Link
            href={`/events/${event.id}`}
            className="mt-4 inline-flex min-h-10 items-center justify-center rounded-full border border-cyan-200/30 px-4 py-2 text-sm font-semibold text-cyan-50 transition hover:bg-cyan-200/12"
          >
            詳しく見る
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <Card className="flex h-full flex-col border-white/15 bg-white/10 p-4 text-white shadow-[0_0_30px_rgba(148,163,184,0.12)] backdrop-blur">
      <ImageWithFallback src={event.imageUrl} alt={`${event.title}の画像`} className="h-36 w-full rounded-xl object-cover sm:h-40" />
      <div className="mt-4 flex flex-1 flex-col">
        <Badge className="bg-cyan-100/12 text-cyan-50">{categoryLabels[event.category]}</Badge>
        <h3 className="mt-3 break-words text-lg font-black leading-tight text-white sm:text-xl">{event.title}</h3>
        <p className="mt-1 break-words text-sm font-semibold text-slate-300">{event.organization}</p>
        <p className="mt-3 break-words text-sm font-bold text-cyan-100">
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
