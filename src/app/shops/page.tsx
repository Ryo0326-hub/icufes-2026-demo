import { ShopMapExplorer } from "@/components/shops/ShopMapExplorer";
import { mapAreas } from "@/data/mapAreas";
import { shops } from "@/data/shops";

export default function ShopsPage() {
  return (
    <div
      className="min-h-screen bg-[#020617] bg-cover bg-center px-4 py-10 sm:px-6 lg:px-8"
      style={{ backgroundImage: "linear-gradient(rgba(2,6,23,0.72), rgba(2,6,23,0.94)), url('/images/backgrounds/background-image1.png')" }}
    >
      <div className="mx-auto max-w-[1680px]">
        <ShopMapExplorer shops={shops} mapAreas={mapAreas} />
      </div>
    </div>
  );
}
