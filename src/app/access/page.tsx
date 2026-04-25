import { Card } from "@/components/ui/Card";

export default function AccessPage() {
  return (
    <div
      className="min-h-screen bg-[#020617] bg-cover bg-center px-4 py-10 sm:px-6 lg:px-8"
      style={{ backgroundImage: "linear-gradient(rgba(2,6,23,0.72), rgba(2,6,23,0.94)), url('/images/backgrounds/background-image1.png')" }}
    >
      <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <p className="text-sm font-bold text-cyan-200">アクセス</p>
        <h1 className="mt-2 text-4xl font-black text-white">アクセス</h1>
        <p className="mt-3 max-w-2xl text-slate-300">
          ICU祭へお越しの際は、公共交通機関のご利用をおすすめします。三鷹駅・武蔵境駅からバスでアクセスできます。
        </p>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <div className="grid gap-4">
          <Card className="border-white/10 bg-white/10 text-white backdrop-blur">
            <h2 className="text-xl font-black text-white">ICUキャンパス</h2>
            <p className="mt-2 text-slate-300">東京都三鷹市大沢 3-10-2（プレースホルダー）</p>
          </Card>
          <Card className="border-white/10 bg-white/10 text-white backdrop-blur">
            <h2 className="text-xl font-black text-white">最寄り駅</h2>
            <ul className="mt-3 grid gap-2 text-slate-300">
              <li>三鷹駅</li>
              <li>武蔵境駅</li>
            </ul>
          </Card>
          <Card className="border-white/10 bg-white/10 text-white backdrop-blur">
            <h2 className="text-xl font-black text-white">来場時の注意</h2>
            <p className="mt-2 leading-7 text-slate-300">正門・本部テントの案内、バス乗り場、混雑時の注意事項は後日更新予定です。</p>
          </Card>
        </div>
        <Card className="border-white/10 bg-white/10 p-4 backdrop-blur">
          <img src="/images/map/full-campus-map.png" alt="ICUキャンパスマップ" className="w-full rounded-2xl border border-white/10" />
        </Card>
      </div>
      </div>
    </div>
  );
}
