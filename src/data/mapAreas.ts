import type { MapArea } from "@/types/map";

export const mapAreas: MapArea[] = [
  {
    id: "area-a",
    name: "中央エリア A",
    description: "飲食店や人気出店が集まる中心エリアです。",
    bounds: {
      x: 48,
      y: 43,
      width: 11,
      height: 11
    },
    zoom: {
      scale: 2.35,
      translateX: -27,
      translateY: -24
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
    id: "area-b",
    name: "中央エリア B",
    description: "ステージや大型企画に近いエリアです。",
    bounds: {
      x: 58,
      y: 41,
      width: 11,
      height: 11
    },
    zoom: {
      scale: 2.3,
      translateX: -36,
      translateY: -23
    },
    color: {
      marker: "#a78bfa",
      markerHover: "#c4b5fd",
      ring: "rgba(196, 181, 253, 0.5)",
      text: "#2e1065",
      shadow: "rgba(167, 139, 250, 0.5)"
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
      scale: 2.35,
      translateX: -18,
      translateY: -25
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
      x: 66,
      y: 44,
      width: 11,
      height: 11
    },
    zoom: {
      scale: 2.25,
      translateX: -45,
      translateY: -24
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
