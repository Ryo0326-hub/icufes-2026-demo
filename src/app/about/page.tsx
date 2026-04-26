import { Card } from "@/components/ui/Card";

export default function AboutPage() {
  return (
    <div
      className="min-h-dvh bg-[#020617] bg-cover bg-center px-4 py-8 sm:px-6 sm:py-10 lg:px-8"
      style={{ backgroundImage: "linear-gradient(rgba(2,6,23,0.72), rgba(2,6,23,0.94)), url('/images/backgrounds/background-image1.png')" }}
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-sm font-bold text-cyan-200">ICU祭について</h1>
        </div>
        <Card className="border-white/10 bg-white/10 text-sm leading-8 text-slate-200 backdrop-blur sm:text-base">
          <p>
            ICU祭は、学生団体、サークル、地域の方々が参加するキャンパスフェスティバルです。このMVPサイトでは、
            来場者がスマホやPCからキャンパスマップ、出店、企画、タイムテーブル、アクセス情報を確認できます。
          </p>
          <p className="mt-4">
            現在はデモデータで構成されており、後から本番データやSupabase連携へ差し替えやすい静的データ構造にしています。
          </p>
        </Card>
      </div>
    </div>
  );
}
