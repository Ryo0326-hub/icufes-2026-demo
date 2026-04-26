import type { MapArea } from "@/types/map";

type MapAreaOverlayProps = {
  area: MapArea;
  onSelect: (areaId: string) => void;
};

export function MapAreaOverlay({ area, onSelect }: MapAreaOverlayProps) {
  return (
    <button
      type="button"
      className="absolute flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border backdrop-blur transition hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-950 sm:h-14 sm:w-14"
      style={{
        left: `${area.bounds.x}%`,
        top: `${area.bounds.y}%`,
        backgroundColor: `${area.color.marker}cc`,
        borderColor: area.color.markerHover,
        color: area.color.text,
        boxShadow: `0 0 22px ${area.color.shadow}`
      }}
      onClick={() => onSelect(area.id)}
      aria-label={`${area.name}を表示`}
    >
      <span className="px-0.5 text-center text-[6px] font-black leading-tight sm:px-1 sm:text-[9px]">{area.name}</span>
    </button>
  );
}
