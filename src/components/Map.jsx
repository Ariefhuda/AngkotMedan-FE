import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MEDAN_CENTER = [3.5952, 98.6722];

function FlyToLocation({ position }) {
  const map = useMap();
  if (position) {
    map.flyTo(position, 15, { duration: 1.5 });
  }
  return null;
}

const routeMarkerIcon = (color) =>
  L.divIcon({
    className: "",
    html: `<div style="width:12px;height:12px;border-radius:50%;background:${color};border:2px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.3);"></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  });

const userIcon = L.divIcon({
  className: "",
  html: `<div style="width:16px;height:16px;border-radius:50%;background:#0453cd;border:3px solid white;box-shadow:0 2px 8px rgba(4,83,205,0.5);"></div>`,
  iconSize: [16, 16],
  iconAnchor: [8, 8],
});

const COLOR_HEX = {
  Kuning: "#fdb813",
  Biru: "#0453cd",
  Hijau: "#22c55e",
  "Merah Hijau": "#f43f5e",
  "Merah Kuning": "#f97316",
  Putih: "#9ca3af",
  "Putih Hijau": "#4ade80",
};

export default function Map({ selectedLocation, routes }) {
  return (
    <MapContainer
      center={MEDAN_CENTER}
      zoom={12}
      className="absolute inset-0 z-0"
      zoomControl={false}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {selectedLocation && (
        <>
          <FlyToLocation position={[selectedLocation.lat, selectedLocation.lng]} />
          <Marker
            position={[selectedLocation.lat, selectedLocation.lng]}
            icon={userIcon}
          >
            <Popup>Lokasi Anda</Popup>
          </Marker>
        </>
      )}

      {routes.map((route) =>
        (route.stops || [])
          .filter((s) => s.latitude && s.longitude)
          .map((stop) => (
            <Marker
              key={`${route.id}-${stop.id}`}
              position={[stop.latitude, stop.longitude]}
              icon={routeMarkerIcon(COLOR_HEX[route.color] || "#9ca3af")}
            >
              <Popup>
                <div style={{ fontFamily: "Plus Jakarta Sans, sans-serif", padding: "2px" }}>
                  <strong style={{ fontFamily: "Montserrat, sans-serif", color: COLOR_HEX[route.color] || "#333" }}>
                    {route.number}
                  </strong>
                  <span> - {stop.name}</span>
                </div>
              </Popup>
            </Marker>
          ))
      )}
    </MapContainer>
  );
}