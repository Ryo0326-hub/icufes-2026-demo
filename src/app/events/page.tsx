import { EventCalendar } from "@/components/events/EventCalendar";
import { events } from "@/data/events";

export default function EventsPage() {
  return (
    <div
      className="min-h-screen bg-[#020617] bg-cover bg-center px-4 py-10 sm:px-6 lg:px-8"
      style={{ backgroundImage: "linear-gradient(rgba(2,6,23,0.72), rgba(2,6,23,0.94)), url('/images/backgrounds/background-image1.png')" }}
    >
      <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <p className="text-sm font-bold text-cyan-200">企画カレンダー</p>
        <h1 className="mt-2 text-4xl font-black text-white">企画・スケジュール</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          ICU祭は10月11日・12日の2日間開催。10:00から17:00までの企画を時間帯ごとに確認できます。
        </p>
      </div>
      <EventCalendar events={events} />
      </div>
    </div>
  );
}
