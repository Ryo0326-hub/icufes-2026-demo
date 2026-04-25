import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { Modal } from "@/components/ui/Modal";
import type { Shop } from "@/types/shop";

type ShopPopupProps = {
  shop: Shop | null;
  displayedVotes: number;
  onClose: () => void;
  onVote: (shopId: string) => void;
};

const categoryLabels: Record<Shop["category"], string> = {
  Food: "フード",
  Drink: "ドリンク",
  Dessert: "スイーツ",
  Goods: "グッズ",
  Experience: "体験",
  "Local Business": "地域出店",
  Other: "その他"
};

export function ShopPopup({ shop, displayedVotes, onClose, onVote }: ShopPopupProps) {
  return (
    <Modal isOpen={shop !== null} title={shop?.name ?? "店舗情報"} onClose={onClose}>
      {shop ? (
        <div className="grid gap-5 md:grid-cols-[220px_1fr]">
          <ImageWithFallback
            src={shop.imageUrl}
            alt={`${shop.name}の画像`}
            className="h-48 w-full rounded-2xl object-cover md:h-full"
          />
          <div>
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-blue-700">#{shop.number}</p>
                <h2 className="mt-1 text-2xl font-black text-slate-900">{shop.name}</h2>
                <p className="mt-1 text-sm font-semibold text-slate-600">{shop.organization}</p>
              </div>
              <button
                type="button"
                className="rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-500 hover:bg-slate-50"
                onClick={onClose}
                aria-label="店舗情報を閉じる"
              >
                閉じる
              </button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              <Badge>{categoryLabels[shop.category]}</Badge>
              {shop.tags.map((tag) => (
                <Badge key={tag} className="bg-slate-100 text-slate-700">
                  {tag}
                </Badge>
              ))}
            </div>
            <dl className="mt-4 grid gap-2 text-sm text-slate-600 sm:grid-cols-2">
              <div>
                <dt className="font-bold text-slate-900">場所</dt>
                <dd>{shop.locationLabel}</dd>
              </div>
              <div>
                <dt className="font-bold text-slate-900">営業時間</dt>
                <dd>
                  {shop.openTime} - {shop.closeTime}
                </dd>
              </div>
            </dl>
            <p className="mt-4 leading-7 text-slate-700">{shop.description}</p>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <p className="rounded-full bg-blue-50 px-4 py-2 text-sm font-bold text-blue-800">{displayedVotes}票</p>
              <Button type="button" onClick={() => onVote(shop.id)}>
                投票する
              </Button>
              <Link
                href={`/shops/${shop.id}`}
                className="rounded-full border border-blue-200 px-5 py-2.5 text-sm font-semibold text-blue-700 hover:bg-blue-50"
              >
                詳しく見る
              </Link>
            </div>
          </div>
        </div>
      ) : null}
    </Modal>
  );
}
