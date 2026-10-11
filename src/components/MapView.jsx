import { useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MEDAN_CENTER = [3.5952, 98.6722];

// Atur tampilan peta supaya titik asal dan tujuan sama-sama terlihat.
function FitToRoute({ fromLoc, toLoc }) {
  const map = useMap();
  useEffect(() => {
    const points = [fromLoc, toLoc].filter(Boolean).map((loc) => [loc.lat, loc.lng]);
    if (points.length === 2) map.fitBounds(points, { padding: [48, 48], maxZoom: 15 });
    else if (points.length === 1) map.setView(points[0], 15);
  }, [map, fromLoc, toLoc]);
  return null;
}

const fromIcon = L.divIcon({
  className: "",
  html: `<div style="width:24px;height:24px;border-radius:50%;background:#0453cd;border:3.5px solid white;box-shadow:0 4px 12px rgba(4,83,205,0.4);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const toIcon = L.divIcon({
  className: "",
  html: `<div style="width:24px;height:24px;border-radius:50%;background:#fdb813;border:3.5px solid white;box-shadow:0 4px 12px rgba(253,184,19,0.4);"></div>`,
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export default function MapView({ fromLoc, toLoc }) {
  const center = fromLoc ? [fromLoc.lat, fromLoc.lng] : MEDAN_CENTER;

  return (
    <div className="relative h-[40vh] sm:h-[50vh] w-full z-0 rounded-b-[2rem] overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.08)]">
      <MapContainer
        center={center}
        zoom={14}
        className="h-full w-full"
        zoomControl={false}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        />
        <FitToRoute fromLoc={fromLoc} toLoc={toLoc} />
        {fromLoc && (
          <Marker position={[fromLoc.lat, fromLoc.lng]} icon={fromIcon}>
            <Popup>
              <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "12px", fontWeight: 600 }}>
                Asal
              </div>
            </Popup>
          </Marker>
        )}
        {toLoc && (
          <Marker position={[toLoc.lat, toLoc.lng]} icon={toIcon}>
            <Popup>
              <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", fontSize: "12px", fontWeight: 600 }}>
                Tujuan
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      <div className="absolute bottom-3 left-3 z-[999] flex gap-2">
        {fromLoc && (
          <div className="flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[11px] font-semibold text-secondary shadow-sm border border-white/50">
            <div className="h-2 w-2 rounded-full bg-secondary" />
            Asal
          </div>
        )}
        {toLoc && (
          <div className="flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-sm px-3 py-1.5 text-[11px] font-semibold text-primary shadow-sm border border-white/50">
            <div className="h-2 w-2 rounded-full bg-primary-light" />
            Tujuan
          </div>
        )}
      </div>
    </div>
  );
}