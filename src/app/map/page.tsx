import { CampusMap } from "@/components/map/CampusMap";
import { mapAreas } from "@/data/mapAreas";
import { shops } from "@/data/shops";

export default function MapPage() {
  return (
    <div
      className="min-h-dvh bg-[#020617] bg-cover bg-center px-3 py-6 sm:px-6 sm:py-10 lg:px-8"
      style={{ backgroundImage: "linear-gradient(rgba(2,6,23,0.72), rgba(2,6,23,0.94)), url('/images/backgrounds/background-image1.png')" }}
    >
      <div className="mx-auto max-w-7xl">
        <CampusMap shops={shops} mapAreas={mapAreas} />
      </div>
    </div>
  );
}
