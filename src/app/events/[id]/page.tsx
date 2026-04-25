import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { ButtonLink } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { events } from "@/data/events";
import type { FestivalEvent } from "@/types/event";

type EventDetailPageProps = {
  params: {
    id: string;
  };
};

const categoryLabels: Record<FestivalEvent["category"], string> = {
  Stage: "ステージ",
  Performance: "パフォーマンス",
  Exhibition: "展示",
  Workshop: "ワークショップ",
  Talk: "トーク",
  Other: "その他"
};

export function generateStaticParams() {
  return events.map((event) => ({ id: event.id }));
}

export default function EventDetailPage({ params }: EventDetailPageProps) {
  const event = events.find((item) => item.id === params.id);

  if (!event) {
    notFound();
  }

  return (
    <div
      className="min-h-screen bg-[#020617] bg-cover bg-center px-4 py-10 sm:px-6 lg:px-8"
      style={{ backgroundImage: "linear-gradient(rgba(2,6,23,0.72), rgba(2,6,23,0.94)), url('/images/backgrounds/background-image1.png')" }}
    >
      <div className="mx-auto max-w-5xl">
      <Card className="grid gap-8 p-5 md:grid-cols-[320px_1fr] md:p-8">
        <ImageWithFallback src={event.imageUrl} alt={`${event.title}の画像`} className="h-72 w-full rounded-2xl object-cover" />
        <div>
          <Badge>{categoryLabels[event.category]}</Badge>
          <h1 className="mt-3 text-4xl font-black text-slate-900">{event.title}</h1>
          <p className="mt-2 text-lg font-semibold text-slate-600">{event.organization}</p>
          <dl className="mt-6 grid gap-4 rounded-2xl bg-blue-50 p-4 text-sm sm:grid-cols-3">
            <div>
              <dt className="font-bold text-slate-900">時間</dt>
              <dd className="mt-1 text-slate-600">
                {event.startTime} - {event.endTime}
              </dd>
            </div>
            <div>
              <dt className="font-bold text-slate-900">場所</dt>
              <dd className="mt-1 text-slate-600">{event.location}</dd>
            </div>
            <div>
              <dt className="font-bold text-slate-900">日付</dt>
              <dd className="mt-1 text-slate-600">{event.date}</dd>
            </div>
          </dl>
          <p className="mt-6 leading-8 text-slate-700">{event.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {event.tags.map((tag) => (
              <Badge key={tag} className="bg-slate-100 text-slate-700">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="mt-6">
            <ButtonLink href="/events" variant="secondary">
              企画一覧に戻る
            </ButtonLink>
          </div>
        </div>
      </Card>
      </div>
    </div>
  );
}
