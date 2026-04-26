import type { Shop, ShopCategory } from "@/types/shop";

const imageByCategory: Record<ShopCategory, string> = {
  Food: "/images/placeholders/pencil-food-1.svg",
  Drink: "/images/placeholders/pencil-drink-1.svg",
  Dessert: "/images/placeholders/pencil-food-2.svg",
  Goods: "/images/placeholders/pencil-goods-3.svg",
  Experience: "/images/placeholders/pencil-experience-1.svg",
  "Local Business": "/images/placeholders/pencil-market-1.svg",
  Other: "/images/placeholders/pencil-food-1.svg"
};

const shopImageUrls = [
  "/images/placeholders/pencil-food-1.svg",
  "/images/placeholders/pencil-food-2.svg",
  "/images/placeholders/pencil-drink-1.svg",
  "/images/placeholders/pencil-market-1.svg",
  "/images/placeholders/pencil-experience-1.svg",
  "/images/placeholders/pencil-goods-3.svg"
];

const demoShops: Array<{
  name: string;
  organization: string;
  category: ShopCategory;
  tags: string[];
}> = [
  { name: "ICUパンケーキスタンド", organization: "ICUクッキングクラブ", category: "Food", tags: ["甘い", "スイーツ", "人気"] },
  { name: "三鷹コーヒーブース", organization: "三鷹ローカルコーヒー", category: "Drink", tags: ["コーヒー", "地域", "ドリンク"] },
  { name: "ワッフルガーデン", organization: "デザートラボ", category: "Dessert", tags: ["ワッフル", "甘い"] },
  { name: "ブルーカレーハウス", organization: "グローバルフードサークル", category: "Food", tags: ["カレー", "スパイシー"] },
  { name: "ICUレモネード", organization: "フレッシュドリンククラブ", category: "Drink", tags: ["レモネード", "冷たい"] },
  { name: "三鷹ベジーマーケット", organization: "三鷹ローカルファーマーズ", category: "Local Business", tags: ["地域", "野菜"] },
  { name: "フェスティバルステッカーバー", organization: "デザインソサエティ", category: "Goods", tags: ["ステッカー", "公式"] },
  { name: "フォトメモリースタジオ", organization: "写真部", category: "Experience", tags: ["写真", "体験"] },
  { name: "やきとりブルー", organization: "アウトドア調理チーム", category: "Food", tags: ["焼き鳥", "グリル"] },
  { name: "ソーダフロートラボ", organization: "サイエンスカフェ", category: "Drink", tags: ["ソーダ", "フロート"] },
  { name: "キャンパスチュロス", organization: "スペイン文化クラブ", category: "Dessert", tags: ["チュロス", "甘い"] },
  { name: "ハンドメイドキャンドルショップ", organization: "クラフトサークル", category: "Goods", tags: ["クラフト", "ギフト"] },
  { name: "輪投げチャレンジ", organization: "フェスゲームチーム", category: "Experience", tags: ["ゲーム", "ファミリー"] },
  { name: "三鷹ベーカリーポップアップ", organization: "三鷹ベーカリー", category: "Local Business", tags: ["パン", "地域"] },
  { name: "タコススタンド・アスール", organization: "ラテンアメリカクラブ", category: "Food", tags: ["タコス", "スパイシー"] },
  { name: "グリーンティーラウンジ", organization: "茶道部", category: "Drink", tags: ["お茶", "和風"] },
  { name: "クレープコーナー", organization: "スイートメーカーズ", category: "Dessert", tags: ["クレープ", "フルーツ"] },
  { name: "ICUトートワークショップ", organization: "アートスタジオ", category: "Goods", tags: ["バッグ", "アート"] },
  { name: "キャンパスクイズブース", organization: "クイズ研究会", category: "Experience", tags: ["クイズ", "景品"] },
  { name: "三鷹はちみつテーブル", organization: "地域はちみつプロジェクト", category: "Local Business", tags: ["はちみつ", "地域"] },
  { name: "お好み焼きスクエア", organization: "関西学生会", category: "Food", tags: ["お好み焼き", "あつあつ"] },
  { name: "フルーツティースタンド", organization: "台湾文化クラブ", category: "Drink", tags: ["フルーツティー", "冷たい"] },
  { name: "ドーナツファクトリー", organization: "ベーキングサークル", category: "Dessert", tags: ["ドーナツ", "人気"] },
  { name: "フェスキーホルダーショップ", organization: "メイカークラブ", category: "Goods", tags: ["キーホルダー", "おみやげ"] },
  { name: "ミニゴルフガーデン", organization: "スポーツボランティアチーム", category: "Experience", tags: ["ゲーム", "屋外"] },
  { name: "ローカルジャムスタンド", organization: "三鷹ジャムキッチン", category: "Local Business", tags: ["ジャム", "地域"] },
  { name: "ぎょうざベース", organization: "アジアンフードクラブ", category: "Food", tags: ["ぎょうざ", "あつあつ"] },
  { name: "アイスココアブース", organization: "チョコレート研究会", category: "Drink", tags: ["ココア", "甘い"] },
  { name: "パフェステーション", organization: "デザートボランティア", category: "Dessert", tags: ["パフェ", "フルーツ"] },
  { name: "ポスターマーケット", organization: "グラフィックデザインチーム", category: "Goods", tags: ["ポスター", "アート"] },
  { name: "バルーンアートスポット", organization: "子ども支援クラブ", category: "Experience", tags: ["ファミリー", "アート"] },
  { name: "三鷹クラフトビールゼロ", organization: "三鷹ビバレッジ", category: "Local Business", tags: ["地域", "ドリンク"] },
  { name: "からあげキッチン", organization: "フードボランティア", category: "Food", tags: ["からあげ", "人気"] },
  { name: "ハーブティールーム", organization: "ウェルネスサークル", category: "Drink", tags: ["お茶", "リラックス"] },
  { name: "たい焼きテラス", organization: "和菓子クラブ", category: "Dessert", tags: ["たい焼き", "甘い"] },
  { name: "オリジナルTシャツブース", organization: "ICU祭実行委員会", category: "Goods", tags: ["Tシャツ", "公式"] },
  { name: "スタンプラリーデスク", organization: "来場者ガイドチーム", category: "Experience", tags: ["ラリー", "景品"] },
  { name: "三鷹フラワーカート", organization: "三鷹フラワースタジオ", category: "Local Business", tags: ["花", "地域"] },
  { name: "ファラフェルフレンズ", organization: "国際フードクラブ", category: "Food", tags: ["ファラフェル", "ヴィーガン"] },
  { name: "タピオカティーラボ", organization: "学生カフェチーム", category: "Drink", tags: ["タピオカ", "人気"] },
  { name: "アイスクリームステップス", organization: "サマーデザートクラブ", category: "Dessert", tags: ["アイス", "冷たい"] },
  { name: "ジンブックストア", organization: "文学会", category: "Goods", tags: ["本", "ジン"] },
  { name: "VRキャンパスツアー", organization: "デジタルメディアクラブ", category: "Experience", tags: ["VR", "テック"] },
  { name: "三鷹ソープアトリエ", organization: "地域ソープスタジオ", category: "Local Business", tags: ["石けん", "地域"] },
  { name: "ホットドッグアベニュー", organization: "野球部", category: "Food", tags: ["ホットドッグ", "手軽"] },
  { name: "ブルースムージーバー", organization: "ヘルスプロジェクト", category: "Drink", tags: ["スムージー", "フルーツ"] },
  { name: "ブラウニーボックス", organization: "ベーキングボランティア", category: "Dessert", tags: ["ブラウニー", "チョコ"] },
  { name: "フェス缶バッジショップ", organization: "広報チーム", category: "Goods", tags: ["缶バッジ", "公式"] },
  { name: "屋外脱出ゲーム", organization: "ミステリーサークル", category: "Experience", tags: ["謎解き", "屋外"] },
  { name: "三鷹ローカルデリ", organization: "三鷹デリパートナーズ", category: "Local Business", tags: ["デリ", "地域"] }
];

const markersByArea = {
  "area-a": [
    { x: 46.4, y: 39.8 },
    { x: 49.1, y: 41.7 },
    { x: 52.2, y: 43.4 },
    { x: 45.1, y: 45.6 },
    { x: 48.6, y: 47.8 },
    { x: 52.8, y: 49.5 },
    { x: 44.2, y: 51.1 },
    { x: 50.4, y: 52.4 },
    { x: 54.1, y: 45.9 },
    { x: 47.2, y: 43.6 },
    { x: 50.8, y: 39.7 },
    { x: 53.6, y: 41.4 },
    { x: 44.7, y: 42.7 },
    { x: 55.0, y: 48.2 },
    { x: 46.3, y: 49.6 },
    { x: 49.0, y: 50.9 },
    { x: 52.0, y: 51.8 }
  ],
  "area-c": [
    { x: 33.8, y: 39.6 },
    { x: 36.7, y: 41.4 },
    { x: 39.8, y: 43.2 },
    { x: 42.1, y: 45.6 },
    { x: 34.9, y: 47.7 },
    { x: 38.2, y: 49.3 },
    { x: 41.2, y: 51.4 },
    { x: 35.4, y: 53.2 },
    { x: 43.5, y: 48.1 },
    { x: 37.4, y: 45.0 },
    { x: 32.8, y: 44.2 },
    { x: 36.0, y: 48.9 },
    { x: 39.0, y: 51.0 },
    { x: 42.8, y: 42.7 },
    { x: 34.0, y: 50.5 },
    { x: 40.8, y: 46.9 },
    { x: 37.2, y: 52.4 }
  ],
  "area-e": [
    { x: 62.7, y: 38.8 },
    { x: 65.8, y: 40.9 },
    { x: 68.9, y: 42.6 },
    { x: 71.2, y: 44.8 },
    { x: 63.9, y: 47.1 },
    { x: 67.4, y: 49.2 },
    { x: 70.3, y: 51.0 },
    { x: 64.8, y: 52.8 },
    { x: 72.1, y: 48.2 },
    { x: 66.2, y: 45.6 },
    { x: 63.5, y: 42.5 },
    { x: 69.8, y: 39.9 },
    { x: 71.8, y: 42.1 },
    { x: 65.2, y: 47.6 },
    { x: 68.0, y: 52.2 },
    { x: 72.8, y: 45.7 },
    { x: 66.8, y: 43.8 }
  ]
} as const;

const areaIds = ["area-a", "area-c", "area-e"] as const;
const locationByArea: Record<(typeof areaIds)[number], string> = {
  "area-a": "中央広場・ステージ前",
  "area-c": "西側クラブ棟前",
  "area-e": "東側ゲート付近"
};

export const shops: Shop[] = demoShops.map((shop, index) => {
  const areaId = areaIds[index % areaIds.length];
  const number = index + 1;

  return {
    id: `shop-${String(number).padStart(2, "0")}`,
    number,
    name: shop.name,
    organization: shop.organization,
    category: shop.category,
    areaId,
    description: `${shop.name}はICU祭のデモ店舗です。来場者が気軽に楽しめるメニューや体験を用意しています。`,
    locationLabel: locationByArea[areaId],
    openTime: index % 3 === 0 ? "10:00" : "10:30",
    closeTime: index % 4 === 0 ? "16:00" : "17:00",
    imageUrl: shopImageUrls[index % shopImageUrls.length] ?? imageByCategory[shop.category],
    marker: markersByArea[areaId][Math.floor(index / areaIds.length) % markersByArea[areaId].length],
    votes: 70 + ((50 - index) * 7) + ((index % 6) * 9),
    tags: shop.tags
  };
});
