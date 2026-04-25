import { GoodsCard } from "@/components/goods/GoodsCard";
import { Card } from "@/components/ui/Card";
import { goods } from "@/data/goods";

export default function GoodsPage() {
  return (
    <div
      className="min-h-dvh bg-[#020617] bg-cover bg-center px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
      style={{ backgroundImage: "linear-gradient(rgba(2,6,23,0.72), rgba(2,6,23,0.94)), url('/images/backgrounds/background-image1.png')" }}
    >
      <div className="mx-auto max-w-7xl">
        <section className="mb-6 rounded-[1.5rem] border border-white/10 bg-white/10 p-5 text-white shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur sm:mb-8 sm:rounded-[2rem] sm:p-8">
          <p className="text-sm font-bold text-cyan-200">公式グッズ</p>
          <h1 className="mt-2 text-3xl font-black sm:text-4xl">ICU祭グッズ</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">Tシャツ、トートバッグ、ステッカーなどの公式グッズを紹介します。</p>
        </section>
        <div className="grid gap-5 md:grid-cols-3">
          {goods.map((item) => (
            <GoodsCard key={item.id} item={item} />
          ))}
        </div>
        <Card className="mt-6 border-white/10 bg-white/10 text-sm font-semibold text-cyan-100 backdrop-blur">
          販売場所・在庫情報は後日公開予定です。
        </Card>
      </div>
    </div>
  );
}
