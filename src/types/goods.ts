export type FestivalGood = {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  status: "Available" | "Sold Out" | "Coming Soon";
  tags: string[];
};
