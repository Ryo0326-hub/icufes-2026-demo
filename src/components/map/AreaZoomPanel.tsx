import { ShopMarker } from "@/components/map/ShopMarker";
import type { MapArea } from "@/types/map";
import type { Shop } from "@/types/shop";

type AreaZoomPanelProps = {
  area: MapArea;
  shops: Shop[];
  onSelectShop: (shop: Shop) => void;
  activeShopId?: string | null;
};

export function AreaZoomPanel({ area, shops, onSelectShop, activeShopId = null }: AreaZoomPanelProps) {
  return (
    <div className="relative aspect-[1477/1065] w-full overflow-hidden rounded-2xl border border-cyan-200/20 bg-white">
      <img
        src="/images/map/full-campus-map.png"
        alt="Zoomed ICU campus map"
        className="absolute inset-0 h-full w-full origin-top-left object-contain"
        style={{
          transform: `scale(${area.zoom.scale}) translate(${area.zoom.translateX}%, ${area.zoom.translateY}%)`
        }}
      />
      <div
        className="absolute left-0 top-0 h-full w-full origin-top-left"
        style={{
          transform: `scale(${area.zoom.scale}) translate(${area.zoom.translateX}%, ${area.zoom.translateY}%)`
        }}
      >
        {shops.map((shop) => (
          <ShopMarker key={shop.id} shop={shop} onClick={onSelectShop} isActive={shop.id === activeShopId} zoomScale={area.zoom.scale} color={area.color} />
        ))}
      </div>
    </div>
  );
}
