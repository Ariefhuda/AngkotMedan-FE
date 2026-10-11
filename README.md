# AngkotMedan-FE

> Repo ini sudah digabung ke [AngkotMedan](https://github.com/Ariefhuda/AngkotMedan), yang sekarang berisi halaman web dan API dalam satu server. Pengembangan dilanjutkan di sana; repo ini disimpan sebagai arsip.

Tampilan web pencari rute angkot Kota Medan, dibuat dengan React. Pengguna memilih halte asal dan tujuan, lalu melihat angkot yang harus dinaiki, urutan haltenya, dan tempat pindah kalau perlu.

Data dan pencarian rutenya dikerjakan oleh [AngkotMedan-BE](https://github.com/Ariefhuda/AngkotMedan-BE), jadi backend itu harus berjalan lebih dulu. Versi yang berjalan tanpa backend ada di [AngkotMedan](https://github.com/Ariefhuda/AngkotMedan).

## Fitur

- Saran halte muncul saat mengetik.
- Tombol GPS untuk memakai lokasi sendiri sebagai asal atau tujuan.
- Tombol tukar asal dan tujuan.
- Hasil berupa rute langsung atau rute dengan satu kali pindah, lengkap dengan urutan halte.
- Sampai dua rute alternatif di bawah rute utama.
- Peta yang menampilkan titik asal dan tujuan.

## Teknologi

- React 19 dan Vite
- Tailwind CSS 4
- Leaflet dan react-leaflet, dengan ubin peta OpenStreetMap

## Menjalankan

Butuh Node.js 20 ke atas dan AngkotMedan-BE yang sudah berjalan di port 3001.

```bash
git clone https://github.com/Ariefhuda/AngkotMedan-FE.git
cd AngkotMedan-FE
cp .env.example .env
npm install
npm run dev
```

Buka http://localhost:5173.

`.env` hanya berisi satu variabel:

| Variabel | Isi |
|---|---|
| `VITE_API_URL` | alamat backend, bawaan `http://localhost:3001` |

Perintah lain:

| Perintah | Kegunaan |
|---|---|
| `npm run build` | membuat versi produksi di folder `dist/` |
| `npm run preview` | menjalankan hasil build di komputer sendiri |

## Susunan berkas

```
src/App.jsx                       perpindahan antara beranda, pencarian, dan hasil
src/components/HeroSection.jsx    bagian pembuka beranda
src/components/SearchSection.jsx  kolom asal dan tujuan, saran halte, GPS
src/components/MapView.jsx        peta hasil pencarian
src/components/RouteGuidance.jsx  petunjuk naik, pindah, dan turun
src/components/Navbar.jsx         bilah atas
src/utils/api.js                  pemanggilan API backend
src/index.css                     tema warna dan gaya tambahan
public/                           logo
Assets/DESIGN.md                  catatan sistem desain
```

## Keterbatasan

- Peta hanya menandai titik asal dan tujuan. Garis rute angkotnya belum digambar.
- Asal dan tujuan harus dipilih dari saran halte atau GPS. Alamat bebas belum bisa dicari.
- Belum ada tes otomatis.
