"use client";

import { useMemo, useState } from "react";
import { mapAreas } from "@/data/mapAreas";
import { SearchInput } from "@/components/ui/SearchInput";
import { ShopCard } from "@/components/shops/ShopCard";
import type { Shop, ShopCategory } from "@/types/shop";

type SortKey = "number" | "votes" | "name";

type ShopListProps = {
  shops: Shop[];
};

const categories: Array<ShopCategory | "All"> = ["All", "Food", "Drink", "Dessert", "Goods", "Experience", "Local Business", "Other"];

const categoryLabels: Record<ShopCategory | "All", string> = {
  All: "すべてのカテゴリ",
  Food: "フード",
  Drink: "ドリンク",
  Dessert: "スイーツ",
  Goods: "グッズ",
  Experience: "体験",
  "Local Business": "地域出店",
  Other: "その他"
};

export function ShopList({ shops }: ShopListProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<ShopCategory | "All">("All");
  const [areaId, setAreaId] = useState("All");
  const [sortKey, setSortKey] = useState<SortKey>("number");

  const filteredShops = useMemo(() => {
    return shops
      .filter((shop) => {
        const matchesQuery = `${shop.name} ${shop.organization} ${shop.tags.join(" ")}`
          .toLowerCase()
          .includes(query.toLowerCase());
        const matchesCategory = category === "All" || shop.category === category;
        const matchesArea = areaId === "All" || shop.areaId === areaId;
        return matchesQuery && matchesCategory && matchesArea;
      })
      .sort((a, b) => {
        if (sortKey === "votes") return b.votes - a.votes;
        if (sortKey === "name") return a.name.localeCompare(b.name);
        return a.number - b.number;
      });
  }, [areaId, category, query, shops, sortKey]);

  return (
    <div className="grid gap-6">
      <div className="grid gap-3 rounded-2xl border border-slate-200 bg-white p-4 md:grid-cols-[1fr_auto_auto_auto]">
        <SearchInput placeholder="お店名・団体名で検索" value={query} onChange={(event) => setQuery(event.target.value)} />
        <select
          className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700"
          value={category}
          onChange={(event) => setCategory(event.target.value as ShopCategory | "All")}
          aria-label="カテゴリで絞り込み"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {categoryLabels[item]}
            </option>
          ))}
        </select>
        <select
          className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700"
          value={areaId}
          onChange={(event) => setAreaId(event.target.value)}
          aria-label="エリアで絞り込み"
        >
          <option value="All">すべてのエリア</option>
          {mapAreas.map((area) => (
            <option key={area.id} value={area.id}>
              {area.name}
            </option>
          ))}
        </select>
        <select
          className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700"
          value={sortKey}
          onChange={(event) => setSortKey(event.target.value as SortKey)}
          aria-label="並び替え"
        >
          <option value="number">番号順</option>
          <option value="votes">投票順</option>
          <option value="name">名前順</option>
        </select>
      </div>
      <p className="text-sm font-semibold text-slate-500">{filteredShops.length}件のお店が見つかりました</p>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {filteredShops.map((shop) => (
          <ShopCard key={shop.id} shop={shop} />
        ))}
      </div>
    </div>
  );
}
