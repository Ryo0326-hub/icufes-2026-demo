import type { Shop } from "@/types/shop";

type ShopMarkerProps = {
  shop: Shop;
  onClick: (shop: Shop) => void;
  isActive?: boolean;
  color?: {
    marker: string;
    markerHover: string;
    ring: string;
    text: string;
    shadow: string;
  };
};

const defaultColor = {
  marker: "#2563eb",
  markerHover: "#1d4ed8",
  ring: "rgba(147, 197, 253, 0.5)",
  text: "#ffffff",
  shadow: "rgba(37, 99, 235, 0.45)"
};

export function ShopMarker({ shop, onClick, isActive = false, color = defaultColor }: ShopMarkerProps) {
  return (
    <button
      type="button"
      className="absolute z-20 flex h-5 w-5 items-center justify-center rounded-full text-[8px] font-black shadow-md transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 sm:h-6 sm:w-6 sm:text-[10px]"
      style={{
        left: `${shop.marker.x}%`,
        top: `${shop.marker.y}%`,
        transform: "translate(-50%, -50%)",
        backgroundColor: isActive ? color.markerHover : color.marker,
        color: color.text,
        boxShadow: isActive ? `0 0 0 4px ${color.ring}, 0 0 18px ${color.shadow}` : `0 0 12px ${color.shadow}`
      }}
      onClick={() => onClick(shop)}
      aria-label={`店舗番号${shop.number}: ${shop.name}を表示`}
    >
      {shop.number}
    </button>
  );
}
