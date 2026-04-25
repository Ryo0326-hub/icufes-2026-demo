export type ShopCategory = "Food" | "Drink" | "Dessert" | "Goods" | "Experience" | "Local Business" | "Other";

export type Shop = {
  id: string;
  number: number;
  name: string;
  organization: string;
  category: ShopCategory;
  areaId: string;
  description: string;
  locationLabel: string;
  openTime: string;
  closeTime: string;
  imageUrl: string;
  marker: {
    x: number;
    y: number;
  };
  votes: number;
  tags: string[];
};
