export type MapArea = {
  id: string;
  name: string;
  description: string;
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  zoom: {
    scale: number;
    translateX: number;
    translateY: number;
  };
  color: {
    marker: string;
    markerHover: string;
    ring: string;
    text: string;
    shadow: string;
  };
};
