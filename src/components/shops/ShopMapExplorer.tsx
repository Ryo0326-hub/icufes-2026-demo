"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

type ShopFilter = "all" | "food" | "drinks";

const shopFilters: Array<{ id: ShopFilter; label: string }> = [
  { id: "all", label: "すべて" },
  { id: "food", label: "フード" },
  { id: "drinks", label: "ドリンク" }
];

const maxShopsPerArea = 10;

function matchesShopFilter(shop: Shop, filter: ShopFilter) {
  if (filter === "all") return true;
  if (filter === "food") return shop.category === "Food" || shop.category === "Dessert";
  if (filter === "drinks") return shop.category === "Drink";
  return true;
}

export function ShopMapExplorer({ shops, mapAreas }: ShopMapExplorerProps) {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<ShopFilter>("all");
  const [selectedAreaId, setSelectedAreaId] = useState<string | null>(null);
  const [highlightedShopId, setHighlightedShopId] = useState<string | null>(null);
  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isZooming, setIsZooming] = useState(false);
  const [showAreaOverlays, setShowAreaOverlays] = useState(true);
  const shopCardRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const displayableShops = useMemo(() => {
    return mapAreas.flatMap((area) =>
      shops
        .filter((shop) => shop.areaId === area.id)
        .sort((a, b) => a.number - b.number)
        .slice(0, maxShopsPerArea)
    );
  }, [mapAreas, shops]);

  const suggestions = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    if (!normalizedQuery) return [];

    return displayableShops
      .filter((shop) => matchesShopFilter(shop, activeFilter))
      .filter((shop) => {
        return (
          shop.name.toLowerCase().includes(normalizedQuery) ||
          shop.organization.toLowerCase().includes(normalizedQuery) ||
          `${shop.number}` === normalizedQuery.replace("#", "")
        );
      })
      .slice(0, 6);
  }, [activeFilter, displayableShops, query]);

  const selectedArea = selectedAreaId ? mapAreas.find((area) => area.id === selectedAreaId) ?? null : null;
  const visibleShops = useMemo(() => {
    if (!selectedArea) return [];

    return displayableShops
      .filter((shop) => shop.areaId === selectedArea.id)
      .filter((shop) => matchesShopFilter(shop, activeFilter))
      .sort((a, b) => a.number - b.number);
  }, [activeFilter, displayableShops, selectedArea]);

  useEffect(() => {
    if (!isZooming) return;
    const timer = window.setTimeout(() => setIsZooming(false), 700);
    return () => window.clearTimeout(timer);
  }, [isZooming]);

  useEffect(() => {
    if (!highlightedShopId) return;
    shopCardRefs.current[highlightedShopId]?.scrollIntoView({
      behavior: "smooth",
      block: "nearest"
    });
  }, [highlightedShopId]);

  function getVotes(shop: Shop) {
    return shop.votes;
  }

  function handleSelectArea(areaId: string) {
    setQuery("");
    setIsSuggesting(false);
    setShowAreaOverlays(false);
    setIsZooming(true);
    setSelectedAreaId(areaId);
    setHighlightedShopId(null);
  }

  function handleResetMap() {
    setShowAreaOverlays(false);
    setIsZooming(true);
    setSelectedAreaId(null);
    setHighlightedShopId(null);
    setQuery("");
    window.setTimeout(() => setShowAreaOverlays(true), 700);
  }

  function focusShop(shop: Shop) {
    setShowAreaOverlays(false);
    setIsZooming(true);
    setSelectedAreaId(shop.areaId);
    setHighlightedShopId(shop.id);
  }

  function handleSelectShop(shop: Shop) {
    focusShop(shop);
  }

  function handleSearchSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const match = suggestions[0];
    if (match) {
      focusShop(match);
      setIsSuggesting(false);
    }
  }

  const mapTransform = selectedArea
    ? `scale(${selectedArea.zoom.scale}) translate(${selectedArea.zoom.translateX}%, ${selectedArea.zoom.translateY}%)`
    : "scale(1) translate(0%, 0%)";

  const areaShopPanel = selectedArea ? (
    <div className="self-start rounded-2xl border border-white/20 bg-slate-950/55 p-2 text-white shadow-[0_18px_45px_rgba(0,0,0,0.28)] backdrop-blur-sm sm:p-3">
      <h3 className="text-base font-black text-white sm:text-lg">
        このエリアのお店 <span style={{ color: selectedArea.color.markerHover }}>({visibleShops.length}件)</span>
      </h3>
      <div className="mt-2 grid max-h-[14rem] auto-rows-[12.5rem] gap-2 overflow-y-auto px-1 py-1">
        {visibleShops.map((shop) => (
          <button
            key={shop.id}
            ref={(node) => {
              shopCardRefs.current[shop.id] = node;
            }}
            type="button"
            className={`h-full rounded-2xl border p-3 text-left transition hover:scale-[1.01] ${
              shop.id === highlightedShopId
                ? "bg-white/10"
                : "border-white/10 bg-slate-950/45 hover:border-white/30"
            }`}
            style={
              selectedArea && shop.id === highlightedShopId
                ? {
                    borderColor: selectedArea.color.markerHover,
                    backgroundColor: `color-mix(in srgb, ${selectedArea.color.marker} 22%, transparent)`,
                    boxShadow: `0 0 28px ${selectedArea.color.shadow}`
                  }
                : undefined
            }
            onClick={() => handleSelectShop(shop)}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-xs font-black" style={selectedArea ? { color: selectedArea.color.markerHover } : undefined}>
                  #{shop.number}
                </p>
                <p className="mt-1 line-clamp-2 font-black text-white">{shop.name}</p>
                <p className="mt-1 truncate text-xs font-semibold text-slate-400">{shop.organization}</p>
              </div>
              <span
                className="shrink-0 rounded-full px-3 py-1 text-xs font-bold"
                style={
                  selectedArea
                    ? {
                        backgroundColor: `color-mix(in srgb, ${selectedArea.color.marker} 18%, transparent)`,
                        color: selectedArea.color.markerHover
                      }
                    : undefined
                }
              >
                {shop.locationLabel}
              </span>
            </div>
            <p className="mt-2 line-clamp-2 text-sm leading-5 text-slate-300">{shop.description}</p>
            <p className="mt-2 text-xs font-bold" style={selectedArea ? { color: selectedArea.color.markerHover } : undefined}>
              {getVotes(shop)}票
            </p>
          </button>
        ))}
      </div>
    </div>
  ) : null;

  return (
    <div className="grid gap-6">
      <div>
        <h1 className="text-sm font-bold text-cyan-200">ショップマップ</h1>
      </div>

      <section className="grid items-start gap-6 rounded-[1.5rem] border border-white/10 bg-white/10 p-3 shadow-[0_24px_90px_rgba(0,0,0,0.28)] backdrop-blur sm:rounded-[2rem] sm:p-5 xl:grid-cols-[minmax(0,1fr)_480px] xl:gap-8 2xl:grid-cols-[minmax(0,1fr)_540px]">
        <div className="grid w-full items-start gap-4">
          {areaShopPanel}
          <div className="relative aspect-[1477/1065] w-full overflow-hidden rounded-2xl border border-white/10 bg-white">
            <div className="absolute inset-0 origin-top-left transition-transform duration-700 ease-out" style={{ transform: mapTransform }}>
              <img src="/images/map/full-campus-map.png" alt="ICUキャンパスマップ" className="h-full w-full object-contain" />
              {selectedArea
                ? visibleShops.map((shop) => (
                    <ShopMarker
                      key={shop.id}
                      shop={shop}
                      onClick={handleSelectShop}
                      isActive={shop.id === highlightedShopId}
                      zoomScale={selectedArea.zoom.scale}
                      color={selectedArea.color}
                    />
                  ))
                : null}
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
          {selectedArea ? (
            <Button type="button" variant="secondary" className="w-full" onClick={handleResetMap}>
              全体マップに戻る
            </Button>
          ) : null}
        </div>

        <aside className="min-w-0 p-1 sm:p-2">
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
                        setIsSuggesting(false);
                      }}
                    >
                      <span className="min-w-0 truncate">
                        <span className="font-black text-cyan-200">#{shop.number}</span> {shop.name}
                      </span>
                      <span className="max-w-[38%] shrink-0 truncate text-xs text-slate-400">{shop.organization}</span>
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
                className={`min-h-10 rounded-full border px-4 py-2 text-sm font-bold transition ${
                  activeFilter === filter.id
                    ? "border-cyan-200 bg-cyan-300 text-slate-950"
                    : "border-white/15 bg-slate-950/45 text-slate-200 hover:border-cyan-200/70 hover:text-cyan-100"
                }`}
                onClick={() => {
                  setActiveFilter(filter.id);
                  setHighlightedShopId(null);
                }}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}
