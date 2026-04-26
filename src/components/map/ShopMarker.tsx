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
  const hitAreaClasses = "h-12 w-12 sm:h-14 sm:w-14 lg:h-28 lg:w-28";
  const pawSizeClasses = "h-full w-full";
  const markerScale = 1 / zoomScale;

  return (
    <button
      type="button"
      className={`absolute z-20 flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-1 ${hitAreaClasses} ${
        pawImage ? "bg-transparent p-0" : "rounded-full text-[6px] font-black shadow-sm transition hover:scale-125 sm:text-[8px] lg:text-[10px]"
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
          className={`pointer-events-none object-contain transition-transform hover:scale-125 ${pawSizeClasses} ${isActive ? "scale-125" : ""}`}
        />
      ) : null}
      <span className="sr-only">{shop.number}</span>
    </button>
  );
}
