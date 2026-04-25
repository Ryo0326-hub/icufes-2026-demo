"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { FormEvent } from "react";
import { MapAreaOverlay } from "@/components/map/MapAreaOverlay";
import { ShopMarker } from "@/components/map/ShopMarker";
import { Button } from "@/components/ui/Button";
import { SearchInput } from "@/components/ui/SearchInput";
import type { MapArea } from "@/types/map";
import type { Shop } from "@/types/shop";

type ShopMapExplorerProps = {
  shops: Shop[];
  mapAreas: MapArea[];
};

type ShopFilter = "all" | "food" | "drinks" | "student" | "business";

const shopFilters: Array<{ id: ShopFilter; label: string }> = [
  { id: "all", label: "すべて" },
  { id: "food", label: "フード" },
  { id: "drinks", label: "ドリンク" },
  { id: "student", label: "学生運営" },
  { id: "business", label: "地域・企業" }
];

function matchesShopFilter(shop: Shop, filter: ShopFilter) {
  if (filter === "all") return true;
  if (filter === "food") return shop.category === "Food" || shop.category === "Dessert";
  if (filter === "drinks") return shop.category === "Drink";
  if (filter === "business") return shop.category === "Local Business" || shop.organization.toLowerCase().includes("mitaka");
  return shop.category !== "Local Business" && !shop.organization.toLowerCase().includes("mitaka");
}

export function ShopMapExplorer({ shops, mapAreas }: ShopMapExplorerProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<ShopFilter>("all");
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const [highlightedShopId, setHighlightedShopId] = useState<string | null>(null);
  const [popupShopId, setPopupShopId] = useState<string | null>(null);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [showAreaOverlays, setShowAreaOverlays] = useState(true);
  const [shopVotes, setShopVotes] = useState<Record<string, number>>({});

  const suggestions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return [];

    return shops
      .filter((shop) => matchesShopFilter(shop, activeFilter))
      .filter((shop) => {
        return (
          shop.name.toLowerCase().includes(normalizedQuery) ||
          shop.organization.toLowerCase().includes(normalizedQuery) ||
          `${shop.number}` === normalizedQuery.replace("#", "")
        );
      })
      .slice(0, 6);
  }, [activeFilter, query, shops]);

  const selectedArea = selectedAreaId ? mapAreas.find((area) => area.id === selectedAreaId) ?? null : null;
  const visibleShops = useMemo(() => {
    if (!selectedArea) return [];

    return shops
      .filter((shop) => shop.areaId === selectedArea.id)
      .filter((shop) => matchesShopFilter(shop, activeFilter))
      .sort((a, b) => a.number - b.number);
  }, [activeFilter, selectedArea, shops]);
  const popupShop = shops.find((shop) => shop.id === popupShopId) ?? null;

  useEffect(() => {
    if (!isZooming) return;
    const timer = window.setTimeout(() => setIsZooming(false), 700);
    return () => window.clearTimeout(timer);
  }, [isZooming]);

  function getVotes(shop: Shop) {
    return shop.votes + (shopVotes[shop.id] ?? 0);
  }

  function handleVote(shopId: string) {
    setShopVotes((prev) => ({
      ...prev,
      [shopId]: (prev[shopId] ?? 0) + 1
    }));
  }

  function handleSelectArea(areaId: string) {
    setQuery("");
    setIsSuggesting(false);
    setShowAreaOverlays(false);
    setIsZooming(true);
    setSelectedAreaId(areaId);
    setHighlightedShopId(null);
    setPopupShopId(null);
  }

  function focusShop(shop: Shop) {
    setShowAreaOverlays(false);
    setIsZooming(true);
    setSelectedAreaId(shop.areaId);
    setHighlightedShopId(shop.id);
  }

  function handleSelectShop(shop: Shop) {
    focusShop(shop);
    setPopupShopId(shop.id);
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const match = suggestions[0];
    if (match) {
      focusShop(match);
      setPopupShopId(match.id);
      setIsSuggesting(false);
    }
  }

  const mapTransform = selectedArea
    ? `scale(${selectedArea.zoom.scale}) translate(${selectedArea.zoom.translateX}%, ${selectedArea.zoom.translateY}%)`
    : "scale(1) translate(0%, 0%)";

  return (
    <div className="grid gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-black text-white sm:text-4xl">ショップマップ</h1>
        {selectedArea ? (
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setShowAreaOverlays(false);
              setIsZooming(true);
              setSelectedAreaId(null);
              setHighlightedShopId(null);
              setPopupShopId(null);
              setQuery("");
              window.setTimeout(() => setShowAreaOverlays(true), 700);
            }}
          >
            全体マップに戻る
          </Button>
        ) : null}
      </div>

      <section className="grid gap-8 rounded-[2.5rem] border border-white/10 bg-white/10 p-5 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur xl:grid-cols-[minmax(0,1fr)_480px] 2xl:grid-cols-[minmax(0,1fr)_540px]">
        <div>
          <div className="relative h-[420px] w-full overflow-hidden border border-white/10 bg-white sm:h-[520px] lg:h-[560px] xl:h-[610px]">
            <div className="absolute left-0 top-0 w-full origin-top-left transition-transform duration-700 ease-out" style={{ transform: mapTransform }}>
              <img src="/images/map/full-campus-map.png" alt="ICUキャンパスマップ" className="w-full" />
              {selectedArea
                ? visibleShops.map((shop) => (
                    <ShopMarker
                      key={shop.id}
                      shop={shop}
                      onClick={handleSelectShop}
                      isActive={shop.id === highlightedShopId}
                      color={selectedArea.color}
                    />
                  ))
                : null}
              {popupShop && selectedArea ? (
                <div
                  className="absolute z-30 w-64 rounded-3xl border border-white/25 bg-slate-950/95 p-4 text-white shadow-[0_18px_45px_rgba(0,0,0,0.4)] backdrop-blur"
                  style={{
                    left: `${popupShop.marker.x}%`,
                    top: `${popupShop.marker.y}%`,
                    transform: `translate(-50%, 18px) scale(${1 / selectedArea.zoom.scale})`,
                    transformOrigin: "top center"
                  }}
                >
                  <div
                    className="absolute -top-2 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 border-l border-t border-white/25 bg-slate-950/95"
                    style={{ boxShadow: `-8px -8px 18px ${selectedArea.color.shadow}` }}
                  />
                  <div className="relative">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-black" style={{ color: selectedArea.color.markerHover }}>
                          #{popupShop.number}
                        </p>
                        <h3 className="mt-1 text-base font-black leading-tight">{popupShop.name}</h3>
                        <p className="mt-1 text-xs font-semibold text-slate-400">{popupShop.organization}</p>
                      </div>
                      <button
                        type="button"
                        className="rounded-full border border-white/15 px-2 py-1 text-xs font-bold text-slate-300 hover:bg-white/10"
                        onClick={() => setPopupShopId(null)}
                        aria-label="店舗詳細を閉じる"
                      >
                        ×
                      </button>
                    </div>
                    <p className="mt-3 line-clamp-3 text-xs leading-5 text-slate-300">{popupShop.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-slate-100">
                        {getVotes(popupShop)}票
                      </span>
                      <button
                        type="button"
                        className="rounded-full px-3 py-1 text-xs font-black"
                        style={{ backgroundColor: selectedArea.color.marker, color: selectedArea.color.text }}
                        onClick={() => handleVote(popupShop.id)}
                      >
                        投票
                      </button>
                      <Link
                        href={`/shops/${popupShop.id}`}
                        className="rounded-full border border-white/15 px-3 py-1 text-xs font-bold text-slate-100 hover:bg-white/10"
                      >
                        詳細
                      </Link>
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
            {!selectedArea && showAreaOverlays
              ? mapAreas.map((area) => <MapAreaOverlay key={area.id} area={area} onSelect={handleSelectArea} />)
              : null}
            <div
              className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
                isZooming ? "opacity-100" : "opacity-0"
              }`}
              style={{
                background:
                  "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.72), transparent 22%), radial-gradient(circle at 74% 25%, rgba(125,211,252,0.45), transparent 24%), radial-gradient(circle at 52% 70%, rgba(255,255,255,0.55), transparent 28%)",
                filter: "blur(14px)"
              }}
            />
          </div>
        </div>

        <aside className="p-1 sm:p-2">
          <form className="relative mb-7 grid gap-4" onSubmit={handleSearchSubmit}>
            <div className="relative">
              <SearchInput
                placeholder="お店名を検索"
                value={query}
                onChange={(event) => {
                  setQuery(event.target.value);
                  setIsSuggesting(true);
                }}
                onFocus={() => setIsSuggesting(true)}
                className="h-14 border-cyan-200/40 bg-slate-950/85 px-5 text-base text-cyan-50 caret-cyan-300 placeholder:text-slate-400 selection:bg-cyan-300 selection:text-slate-950 focus:border-cyan-300 focus:ring-cyan-300/20"
              />
              {isSuggesting && suggestions.length > 0 ? (
                <div className="absolute left-0 right-0 top-12 z-30 overflow-hidden rounded-2xl border border-cyan-200/25 bg-slate-950/95 shadow-2xl backdrop-blur">
                  {suggestions.map((shop) => (
                    <button
                      key={shop.id}
                      type="button"
                      className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left text-sm text-slate-100 transition hover:bg-cyan-300/10 hover:text-cyan-100"
                      onClick={() => {
                        setQuery(shop.name);
                        focusShop(shop);
                        setPopupShopId(shop.id);
                        setIsSuggesting(false);
                      }}
                    >
                      <span>
                        <span className="font-black text-cyan-200">#{shop.number}</span> {shop.name}
                      </span>
                      <span className="text-xs text-slate-400">{shop.organization}</span>
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <Button type="submit" className="h-14 w-full bg-cyan-300 text-base text-slate-950 hover:bg-cyan-200">
              検索
            </Button>
          </form>
          <div className="mb-7 flex flex-wrap gap-2">
            {shopFilters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                className={`rounded-full border px-4 py-2 text-sm font-bold transition ${
                  activeFilter === filter.id
                    ? "border-cyan-200 bg-cyan-300 text-slate-950"
                    : "border-white/15 bg-slate-950/45 text-slate-200 hover:border-cyan-200/70 hover:text-cyan-100"
                }`}
                onClick={() => {
                  setActiveFilter(filter.id);
                  setHighlightedShopId(null);
                  setPopupShopId(null);
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <p className="text-sm font-bold text-cyan-200">{selectedArea ? `このエリアに${visibleShops.length}店舗` : "エリアを選択"}</p>
          <h3 className="mt-2 text-2xl font-black text-white">{selectedArea ? "このエリアのお店" : "エリアを選択してください"}</h3>
          <div className="mt-5 grid max-h-[820px] gap-4 overflow-y-auto px-1 py-2">
            {visibleShops.map((shop) => (
              <button
                key={shop.id}
                type="button"
                className={`rounded-3xl border p-5 text-left transition hover:scale-[1.01] ${
                  shop.id === highlightedShopId
                    ? "border-cyan-200 bg-cyan-300/20 shadow-[0_0_30px_rgba(34,211,238,0.25)]"
                    : "border-white/10 bg-slate-950/45 hover:border-cyan-200/60"
                }`}
                onClick={() => handleSelectShop(shop)}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-xs font-black text-cyan-200">#{shop.number}</p>
                    <p className="mt-1 font-black text-white">{shop.name}</p>
                    <p className="mt-1 text-xs font-semibold text-slate-400">{shop.organization}</p>
                  </div>
                  <span className="rounded-full bg-blue-500/20 px-3 py-1 text-xs font-bold text-blue-100">{shop.locationLabel}</span>
                </div>
                <p className="mt-3 line-clamp-2 text-sm leading-6 text-slate-300">{shop.description}</p>
                <p className="mt-3 text-xs font-bold text-cyan-200">{getVotes(shop)}票</p>
              </button>
            ))}
            {!selectedArea ? (
              <div className="rounded-2xl border border-dashed border-white/15 p-4 text-sm leading-6 text-slate-400">
                まずマップ上の光る円を選ぶか、検索バーでお店名を入力してください。
              </div>
            ) : null}
          </div>
        </aside>
      </section>
    </div>
  );
}
