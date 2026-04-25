"use client";

import { useMemo, useState } from "react";
import { AreaZoomPanel } from "@/components/map/AreaZoomPanel";
import { MapAreaOverlay } from "@/components/map/MapAreaOverlay";
import { ShopPopup } from "@/components/map/ShopPopup";
import { ShopRankingCarousel } from "@/components/shops/ShopRankingCarousel";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { MapArea } from "@/types/map";
import type { Shop } from "@/types/shop";

type CampusMapProps = {
  shops: Shop[];
  mapAreas: MapArea[];
};

export function CampusMap({ shops, mapAreas }: CampusMapProps) {
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const [selectedShopId, setSelectedShopId] = useState<string | null>(null);
  const [shopVotes, setShopVotes] = useState<Record<string, number>>({});

  const selectedArea = mapAreas.find((area) => area.id === selectedAreaId) ?? null;
  const selectedShop = shops.find((shop) => shop.id === selectedShopId) ?? null;
  const visibleShops = useMemo(
    () => shops.filter((shop) => selectedArea && shop.areaId === selectedArea.id),
    [selectedArea, shops]
  );

  function getVotes(shop: Shop) {
    return shop.votes + (shopVotes[shop.id] ?? 0);
  }

  function handleVote(shopId: string) {
    setShopVotes((prev) => ({
      ...prev,
      [shopId]: (prev[shopId] ?? 0) + 1
    }));
  }

  return (
    <div className="grid gap-6 sm:gap-8">
      <section className="rounded-2xl border border-slate-200 bg-white p-3 shadow-soft sm:rounded-3xl sm:p-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <Badge>インタラクティブマップ</Badge>
            <h1 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">キャンパスマップ</h1>
            <p className="mt-2 text-sm leading-7 text-slate-600 sm:text-base">マップのエリアをクリックして、お店を探してみましょう。</p>
          </div>
          {selectedArea ? (
            <Button
              type="button"
              variant="secondary"
              className="w-full md:w-auto"
              onClick={() => {
                setSelectedAreaId(null);
                setSelectedShopId(null);
              }}
            >
              全体マップに戻る
            </Button>
          ) : null}
        </div>

        {selectedArea ? (
          <div className="grid gap-4">
            <div className="rounded-2xl bg-blue-50 p-4">
              <p className="text-sm font-bold text-blue-700">{selectedArea.name}</p>
              <p className="mt-1 text-sm text-slate-600">{selectedArea.description}</p>
            </div>
            <AreaZoomPanel area={selectedArea} shops={visibleShops} onSelectShop={(shop) => setSelectedShopId(shop.id)} />
          </div>
        ) : (
          <div className="relative mx-auto w-full max-w-6xl overflow-hidden rounded-2xl border border-slate-200">
            <img
              src="/images/map/full-campus-map.png"
              alt="ICUキャンパスマップ"
              className="w-full"
            />
            {mapAreas.map((area) => (
              <MapAreaOverlay key={area.id} area={area} onSelect={setSelectedAreaId} />
            ))}
          </div>
        )}
      </section>

      <ShopRankingCarousel shops={shops} getVotes={getVotes} />
      <ShopPopup
        shop={selectedShop}
        displayedVotes={selectedShop ? getVotes(selectedShop) : 0}
        onClose={() => setSelectedShopId(null)}
        onVote={handleVote}
      />
    </div>
  );
}
