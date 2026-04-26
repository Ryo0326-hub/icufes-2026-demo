import type { MapArea } from "@/types/map";

export const mapAreas: MapArea[] = [
  {
    id: "area-a",
    name: "中央エリア",
    description: "飲食店や人気出店、ステージ近くの企画が集まる中心エリアです。",
    bounds: {
      x: 52,
      y: 44,
      width: 11,
      height: 11
    },
    zoom: {
      scale: 5.0,
      translateX: -39.2,
      translateY: -36.1
    },
    color: {
      marker: "#22d3ee",
      markerHover: "#67e8f9",
      ring: "rgba(103, 232, 249, 0.5)",
      text: "#082f49",
      shadow: "rgba(34, 211, 238, 0.5)"
    }
  },
  {
    id: "area-c",
    name: "西側エリア",
    description: "クラブ・サークル出店が並ぶエリアです。",
    bounds: {
      x: 38,
      y: 45,
      width: 11,
      height: 11
    },
    zoom: {
      scale: 5.0,
      translateX: -28.7,
      translateY: -36.4
    },
    color: {
      marker: "#34d399",
      markerHover: "#6ee7b7",
      ring: "rgba(110, 231, 183, 0.5)",
      text: "#052e16",
      shadow: "rgba(52, 211, 153, 0.5)"
    }
  },
  {
    id: "area-e",
    name: "東側エリア",
    description: "北門・高校方面に近いエリアです。",
    bounds: {
      x: 67,
      y: 45,
      width: 11,
      height: 11
    },
    zoom: {
      scale: 5.0,
      translateX: -57.4,
      translateY: -35.8
    },
    color: {
      marker: "#fb7185",
      markerHover: "#fda4af",
      ring: "rgba(253, 164, 175, 0.5)",
      text: "#4c0519",
      shadow: "rgba(251, 113, 133, 0.5)"
    }
  }
];
