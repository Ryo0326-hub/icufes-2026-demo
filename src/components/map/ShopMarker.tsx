import type { Shop } from "@/types/shop";

type ShopMarkerProps = {
  shop: Shop;
  onClick: (shop: Shop) => void;
  isActive?: boolean;
  zoomScale?: number;
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

const pawImageByMarkerColor: Record<string, string> = {
  "#22d3ee": "/images/map/blue-paw.png",
  "#34d399": "/images/map/green-paw.png",
  "#fb7185": "/images/map/red-paw.png"
};

export function ShopMarker({ shop, onClick, isActive = false, zoomScale = 1, color = defaultColor }: ShopMarkerProps) {
  const pawImage = pawImageByMarkerColor[color.marker];
  const markerScale = 1 / zoomScale;

  return (
    <button
      type="button"
      className={`group absolute z-20 flex h-6 w-6 items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-1 sm:h-7 sm:w-7 lg:h-8 lg:w-8 ${
        pawImage ? "bg-transparent p-0" : "rounded-full text-[6px] font-black shadow-sm sm:text-[8px] lg:text-[10px]"
      }`}
      style={{
        left: `${shop.marker.x}%`,
        top: `${shop.marker.y}%`,
        transform: `translate(-50%, -50%) scale(${markerScale})`,
        transformOrigin: "center",
        backgroundColor: pawImage ? "transparent" : isActive ? color.markerHover : color.marker,
        color: color.text,
        boxShadow: pawImage ? "none" : isActive ? `0 0 0 2px ${color.ring}, 0 0 10px ${color.shadow}` : `0 0 8px ${color.shadow}`
      }}
      onClick={() => onClick(shop)}
      aria-label={`店舗番号${shop.number}: ${shop.name}を表示`}
      title={shop.name}
    >
      {pawImage ? (
        <img
          src={pawImage}
          alt=""
          aria-hidden="true"
          className={`pointer-events-none h-full w-full rounded-full object-cover object-center transition-transform duration-150 ${
            isActive ? "scale-125" : "group-hover:scale-110"
          }`}
        />
      ) : null}
      <span className="sr-only">{shop.number}</span>
    </button>
  );
}
