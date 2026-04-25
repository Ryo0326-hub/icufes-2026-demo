import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { news } from "@/data/news";
import type { NewsItem } from "@/types/news";

const categoryLabels: Record<NewsItem["category"], string> = {
  General: "全般",
  Important: "重要",
  Schedule: "スケジュール",
  Goods: "グッズ",
  "Lost and Found": "落とし物"
};

export default function NewsPage() {
  return (
    <div
      className="min-h-dvh bg-[#020617] bg-cover bg-center px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
      style={{ backgroundImage: "linear-gradient(rgba(2,6,23,0.72), rgba(2,6,23,0.94)), url('/images/backgrounds/background-image1.png')" }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 sm:mb-8">
          <p className="text-sm font-bold text-cyan-200">お知らせ</p>
          <h1 className="mt-2 text-3xl font-black text-white sm:text-4xl">お知らせ</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">開催情報、雨天時対応、落とし物情報、グッズ販売情報などを掲載します。</p>
        </div>
        <div className="grid gap-4">
          {news.map((item) => (
            <Card key={item.id} className="border-white/10 bg-white/10 text-white backdrop-blur">
              <div className="flex flex-wrap items-center gap-3">
                <Badge className="bg-cyan-300/15 text-cyan-100">{categoryLabels[item.category]}</Badge>
                <time className="text-sm font-semibold text-slate-400">{item.date}</time>
              </div>
              <h2 className="mt-3 text-xl font-black text-white sm:text-2xl">{item.title}</h2>
              <p className="mt-3 text-sm leading-7 text-slate-300 sm:text-base">{item.body}</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
