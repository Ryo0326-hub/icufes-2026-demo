"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Modal } from "@/components/ui/Modal";
import type { FestivalEvent } from "@/types/event";

type EventCalendarProps = {
  events: FestivalEvent[];
};

const festivalDays = [
  { date: "2026-10-11", label: "10月11日", subtitle: "1日目" },
  { date: "2026-10-12", label: "10月12日", subtitle: "2日目" }
];

const hours = ["10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00"];

const categoryLabels: Record<FestivalEvent["category"], string> = {
  Stage: "ステージ",
  Performance: "パフォーマンス",
  Exhibition: "展示",
  Workshop: "ワークショップ",
  Talk: "トーク",
  Other: "その他"
};

function getHour(time: string) {
  return Number(time.split(":")[0]);
}

export function EventCalendar({ events }: EventCalendarProps) {
  const [selectedDay, setSelectedDay] = useState(festivalDays[0].date);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const selectedEvent = events.find((event) => event.id === selectedEventId) ?? null;
  const eventsByHour = useMemo(() => {
    return hours.map((hour) => {
      const hourNumber = getHour(hour);
      return {
        hour,
        events: events
          .filter((event) => event.date === selectedDay && getHour(event.startTime) === hourNumber)
          .sort((a, b) => a.startTime.localeCompare(b.startTime))
      };
    });
  }, [events, selectedDay]);

  return (
    <div className="grid gap-6">
      <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap">
        {festivalDays.map((day) => (
          <button
            key={day.date}
            type="button"
            className={`min-h-14 rounded-full border px-5 py-3 text-left transition ${
              selectedDay === day.date
                ? "border-cyan-200 bg-cyan-300 text-slate-950 shadow-[0_0_34px_rgba(103,232,249,0.35)]"
                : "border-white/15 bg-white/10 text-white hover:border-cyan-200/70"
            }`}
            onClick={() => setSelectedDay(day.date)}
          >
            <span className="block text-xs font-black">{day.subtitle}</span>
            <span className="block text-sm font-black">{day.label}</span>
          </button>
        ))}
      </div>

      <Card className="overflow-hidden border-white/10 bg-white/10 p-0 text-white backdrop-blur">
        <div className="grid border-b border-white/10 bg-slate-950/60 px-4 py-3 sm:px-5 sm:py-4 md:grid-cols-[110px_1fr]">
          <p className="text-sm font-black text-cyan-200">時間</p>
          <p className="hidden text-sm font-black text-cyan-200 md:block">企画</p>
        </div>
        <div className="divide-y divide-white/10">
          {eventsByHour.map((slot) => (
            <div key={slot.hour} className="grid gap-3 p-3 sm:p-4 md:grid-cols-[110px_1fr] md:p-5">
              <div className="text-lg font-black text-cyan-100 sm:text-xl">{slot.hour}</div>
              <div className="grid gap-3 md:grid-cols-2">
                {slot.events.length > 0 ? (
                  slot.events.map((event) => (
                    <button
                      key={event.id}
                      type="button"
                      className="group rounded-2xl border border-white/10 bg-slate-950/55 p-3 text-left transition hover:-translate-y-0.5 hover:border-cyan-200/70 hover:bg-cyan-300/10 sm:p-4"
                      onClick={() => setSelectedEventId(event.id)}
                    >
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge className="bg-cyan-300/15 text-cyan-100">{categoryLabels[event.category]}</Badge>
                        <span className="text-xs font-bold text-slate-400">
                          {event.startTime} - {event.endTime}
                        </span>
                      </div>
                      <h3 className="mt-3 text-base font-black text-white group-hover:text-cyan-100 sm:text-lg">{event.title}</h3>
                      <p className="mt-1 text-sm font-semibold text-slate-400">{event.location}</p>
                    </button>
                  ))
                ) : (
                  <div className="rounded-2xl border border-dashed border-white/10 p-4 text-sm text-slate-500">イベント準備中</div>
                )}
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Modal isOpen={selectedEvent !== null} title={selectedEvent?.title ?? "イベント詳細"} onClose={() => setSelectedEventId(null)}>
        {selectedEvent ? (
          <div>
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <Badge>{categoryLabels[selectedEvent.category]}</Badge>
                <h2 className="mt-3 text-2xl font-black leading-tight text-slate-900 sm:text-3xl">{selectedEvent.title}</h2>
                <p className="mt-2 font-semibold text-slate-600">{selectedEvent.organization}</p>
              </div>
              <button
                type="button"
                className="shrink-0 rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-500 hover:bg-slate-50"
                onClick={() => setSelectedEventId(null)}
              >
                閉じる
              </button>
            </div>
            <dl className="mt-6 grid gap-4 rounded-2xl bg-blue-50 p-4 text-sm sm:grid-cols-3">
              <div>
                <dt className="font-bold text-slate-900">日付</dt>
                <dd className="mt-1 text-slate-600">{selectedEvent.date}</dd>
              </div>
              <div>
                <dt className="font-bold text-slate-900">時間</dt>
                <dd className="mt-1 text-slate-600">
                  {selectedEvent.startTime} - {selectedEvent.endTime}
                </dd>
              </div>
              <div>
                <dt className="font-bold text-slate-900">場所</dt>
                <dd className="mt-1 text-slate-600">{selectedEvent.location}</dd>
              </div>
            </dl>
            <p className="mt-6 leading-8 text-slate-700">{selectedEvent.description}</p>
          </div>
        ) : null}
      </Modal>
    </div>
  );
}
