import { EventCalendar } from "@/components/events/EventCalendar";
import { events } from "@/data/events";

export default function EventsPage() {
  return (
    <div
      className="min-h-dvh bg-[#020617] bg-cover bg-center px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
      style={{ backgroundImage: "linear-gradient(rgba(2,6,23,0.72), rgba(2,6,23,0.94)), url('/images/backgrounds/background-image1.png')" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-sm font-bold text-cyan-200">企画・スケジュール</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            ICU祭は10月11日・12日の2日間開催。10:00から17:00までの企画を時間帯ごとに確認できます。
          </p>
        </div>
        <EventCalendar events={events} />
      </div>
    </div>
  );
}
