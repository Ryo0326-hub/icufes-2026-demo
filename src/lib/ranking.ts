import type { Shop } from "@/types/shop";

export function getTopShops(shops: Shop[], getVotes: (shop: Shop) => number, limit = 5) {
  return [...shops].sort((a, b) => getVotes(b) - getVotes(a)).slice(0, limit);
}
