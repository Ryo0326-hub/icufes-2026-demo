import { Card } from "@/components/ui/Card";

export default function AboutPage() {
  return (
    <div
      className="min-h-screen bg-[#020617] bg-cover bg-center px-4 py-10 sm:px-6 lg:px-8"
      style={{ backgroundImage: "linear-gradient(rgba(2,6,23,0.72), rgba(2,6,23,0.94)), url('/images/backgrounds/background-image1.png')" }}
    >
      <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <p className="text-sm font-bold text-cyan-200">概要</p>
        <h1 className="mt-2 text-4xl font-black text-white">ICU祭について</h1>
      </div>
      <Card className="border-white/10 bg-white/10 leading-8 text-slate-200 backdrop-blur">
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
