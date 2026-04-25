export type EventCategory = "Stage" | "Performance" | "Exhibition" | "Workshop" | "Talk" | "Other";

export type FestivalEvent = {
  id: string;
  title: string;
  organization: string;
  category: EventCategory;
  description: string;
  location: string;
  date: string;
  startTime: string;
  endTime: string;
  imageUrl: string;
  tags: string[];
};
