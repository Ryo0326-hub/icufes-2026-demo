"use client";

import { useMemo, useState } from "react";
import { EventCard } from "@/components/events/EventCard";
import { SearchInput } from "@/components/ui/SearchInput";
import type { EventCategory, FestivalEvent } from "@/types/event";

type EventFiltersProps = {
  events: FestivalEvent[];
};

const categories: Array<EventCategory | "All"> = ["All", "Stage", "Performance", "Exhibition", "Workshop", "Talk", "Other"];

const categoryLabels: Record<EventCategory | "All", string> = {
  All: "すべてのカテゴリ",
  Stage: "ステージ",
  Performance: "パフォーマンス",
  Exhibition: "展示",
  Workshop: "ワークショップ",
  Talk: "トーク",
  Other: "その他"
};

export function EventFilters({ events }: EventFiltersProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<EventCategory | "All">("All");
  const [time, setTime] = useState("All");

  const filteredEvents = useMemo(() => {
    return events.filter((event) => {
      const matchesQuery = `${event.title} ${event.organization} ${event.tags.join(" ")}`
        .toLowerCase()
        .includes(query.toLowerCase());
      const matchesCategory = category === "All" || event.category === category;
      const hour = Number(event.startTime.split(":")[0]);
      const matchesTime = time === "All" || (time === "morning" ? hour < 12 : hour >= 12);
      return matchesQuery && matchesCategory && matchesTime;
    });
  }, [category, events, query, time]);

  return (
    <div className="grid gap-6">
      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-[1fr_auto_auto]">
        <SearchInput placeholder="企画名・団体名で検索" value={query} onChange={(event) => setQuery(event.target.value)} />
        <select
          className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700"
          value={category}
          onChange={(event) => setCategory(event.target.value as EventCategory | "All")}
          aria-label="カテゴリで絞り込み"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {categoryLabels[item]}
            </option>
          ))}
        </select>
        <select
          className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700"
          value={time}
          onChange={(event) => setTime(event.target.value)}
          aria-label="時間帯で絞り込み"
        >
          <option value="All">すべての時間</option>
          <option value="morning">午前</option>
          <option value="afternoon">午後</option>
        </select>
      </div>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
