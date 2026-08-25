const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3001";

export async function searchLocations(query) {
  const res = await fetch(`${API_URL}/api/search?q=${encodeURIComponent(query)}`);
  if (!res.ok) throw new Error("Gagal mencari lokasi");
  return res.json();
}

export async function navigate(fromLat, fromLng, toLat, toLng) {
  const res = await fetch(
    `${API_URL}/api/navigate?from_lat=${fromLat}&from_lng=${fromLng}&to_lat=${toLat}&to_lng=${toLng}`
  );
  if (!res.ok) throw new Error("Gagal mencari rute");
  return res.json();
}

export async function getRouteDetail(code) {
  const res = await fetch(`${API_URL}/api/routes/${code}`);
  if (!res.ok) throw new Error("Rute tidak ditemukan");
  return res.json();
}