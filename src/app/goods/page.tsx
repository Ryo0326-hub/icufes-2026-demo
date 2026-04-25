import { GoodsCard } from "@/components/goods/GoodsCard";
import { Card } from "@/components/ui/Card";
import { goods } from "@/data/goods";

export default function GoodsPage() {
  return (
    <div
      className="min-h-screen bg-[#020617] bg-cover bg-center px-4 py-10 sm:px-6 lg:px-8"
      style={{ backgroundImage: "linear-gradient(rgba(2,6,23,0.72), rgba(2,6,23,0.94)), url('/images/backgrounds/background-image1.png')" }}
    >
      <div className="mx-auto max-w-7xl">
      <section className="mb-8 rounded-[2rem] border border-white/10 bg-white/10 p-8 text-white shadow-[0_24px_90px_rgba(0,0,0,0.35)] backdrop-blur">
        <p className="text-sm font-bold text-cyan-200">公式グッズ</p>
        <h1 className="mt-2 text-4xl font-black">ICU祭グッズ</h1>
        <p className="mt-3 max-w-2xl text-slate-300">Tシャツ、トートバッグ、ステッカーなどの公式グッズを紹介します。</p>
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
