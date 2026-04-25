export type NewsItem = {
  id: string;
  title: string;
  date: string;
  category: "General" | "Important" | "Schedule" | "Goods" | "Lost and Found";
  body: string;
};
