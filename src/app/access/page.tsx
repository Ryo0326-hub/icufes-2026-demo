import { Card } from "@/components/ui/Card";

export default function AccessPage() {
  return (
    <div
      className="min-h-dvh bg-[#020617] bg-cover bg-center px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
      style={{ backgroundImage: "linear-gradient(rgba(2,6,23,0.72), rgba(2,6,23,0.94)), url('/images/backgrounds/background-image1.png')" }}
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-sm font-bold text-cyan-200">アクセス</h1>
          <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
            ICU祭へお越しの際は、公共交通機関のご利用をおすすめします。三鷹駅・武蔵境駅からバスでアクセスできます。
          </p>
        </div>
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
          <div className="grid gap-4">
            <Card className="border-white/10 bg-white/10 text-white backdrop-blur">
              <h2 className="text-lg font-black text-white sm:text-xl">ICUキャンパス</h2>
              <p className="mt-2 text-sm leading-7 text-slate-300 sm:text-base">東京都三鷹市大沢 3-10-2（プレースホルダー）</p>
            </Card>
            <Card className="border-white/10 bg-white/10 text-white backdrop-blur">
              <h2 className="text-lg font-black text-white sm:text-xl">最寄り駅</h2>
              <ul className="mt-3 grid gap-2 text-sm text-slate-300 sm:text-base">
                <li>三鷹駅</li>
                <li>武蔵境駅</li>
              </ul>
            </Card>
            <Card className="border-white/10 bg-white/10 text-white backdrop-blur">
              <h2 className="text-lg font-black text-white sm:text-xl">来場時の注意</h2>
              <p className="mt-2 text-sm leading-7 text-slate-300 sm:text-base">正門・本部テントの案内、バス乗り場、混雑時の注意事項は後日更新予定です。</p>
            </Card>
          </div>
          <Card className="border-white/10 bg-white/10 p-3 backdrop-blur sm:p-4">
            <img src="/images/map/full-campus-map.png" alt="ICUキャンパスマップ" className="w-full rounded-2xl border border-white/10" />
          </Card>
        </div>
      </div>
    </div>
  );
}
