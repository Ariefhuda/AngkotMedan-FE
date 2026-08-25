import { useState, useRef, useEffect } from "react";
import { searchLocations, navigate } from "../utils/api.js";

export default function SearchSection({ fullscreen, onBack, onSearchResult }) {
  const [fromQuery, setFromQuery] = useState("");
  const [toQuery, setToQuery] = useState("");
  const [fromSuggestions, setFromSuggestions] = useState([]);
  const [toSuggestions, setToSuggestions] = useState([]);
  const [fromLoc, setFromLoc] = useState(null);
  const [toLoc, setToLoc] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeField, setActiveField] = useState(null);
  const debounceRef = useRef(null);
  const fromRef = useRef(null);

  useEffect(() => {
    if (fullscreen && fromRef.current) {
      setTimeout(() => fromRef.current.focus(), 300);
    }
  }, [fullscreen]);

  useEffect(() => {
    const q = activeField === "from" ? fromQuery : toQuery;
    if (q.length < 2) {
      if (activeField === "from") setFromSuggestions([]);
      else setToSuggestions([]);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const results = await searchLocations(q);
        if (activeField === "from") setFromSuggestions(results);
        else setToSuggestions(results);
      } catch {
        if (activeField === "from") setFromSuggestions([]);
        else setToSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [fromQuery, toQuery, activeField]);

  function handleSelect(loc, field) {
    setErrorMessage("");
    if (field === "from") {
      setFromQuery(loc.name);
      setFromLoc({ lat: loc.latitude, lng: loc.longitude });
      setFromSuggestions([]);
    } else {
      setToQuery(loc.name);
      setToLoc({ lat: loc.latitude, lng: loc.longitude });
      setToSuggestions([]);
    }
  }

  function handleUseMyLocation(field) {
    setErrorMessage("");
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude: lat, longitude: lng } = pos.coords;
        if (field === "from") {
          setFromLoc({ lat, lng });
          setFromQuery("Lokasi Saya");
          setFromSuggestions([]);
        } else {
          setToLoc({ lat, lng });
          setToQuery("Lokasi Saya");
          setToSuggestions([]);
        }
      },
      () => setErrorMessage("Lokasi kamu belum bisa diakses. Pastikan izin GPS sudah aktif.")
    );
  }

  async function handleNavigate() {
    if (!fromLoc || !toLoc) {
      setErrorMessage("Lengkapi lokasi asal dan tujuan untuk melanjutkan.");
      return;
    }
    setErrorMessage("");
    setLoading(true);
    try {
      const result = await navigate(fromLoc.lat, fromLoc.lng, toLoc.lat, toLoc.lng);
      onSearchResult(result, fromLoc, toLoc);
    } catch {
      setErrorMessage("Rute belum bisa dimuat. Periksa koneksi lalu coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  function swapLocations() {
    setFromQuery(toQuery);
    setToQuery(fromQuery);
    setFromLoc(toLoc);
    setToLoc(fromLoc);
  }

  const bothFilled = fromLoc && toLoc;

  return (
    <section className={`${fullscreen ? "min-h-[calc(100vh-4rem)] flex flex-col justify-center" : "py-16 sm:py-24"} bg-[#f4f6f8]`}>
      <div className={`mx-auto w-full max-w-6xl page-gutter ${fullscreen ? "content-width" : ""}`}>
        {!fullscreen && (
          <div className="search-heading mb-10 sm:mb-12">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.18em] text-secondary">Perjalanan kamu</p>
            <h2 className="font-heading text-3xl sm:text-4xl font-bold text-on-surface tracking-tight">Cari rute angkot</h2>
            <p className="mt-3 text-sm text-on-surface-variant">Masukkan titik berangkat dan tujuan untuk melihat pilihan perjalanan.</p>
          </div>
        )}

        <div className={`relative route-panel p-4 sm:p-6 ${fullscreen ? "pt-4" : ""}`}>
          <div className="absolute left-[26px] top-[52px] bottom-[62px] w-px bg-surface-container-high z-0" />

          <div className="relative z-10 space-y-3">
            <div className="relative">
              <div className={`flex items-center rounded-2xl border-2 bg-white pl-12 pr-3 transition-all duration-200 ${activeField === "from" ? "border-secondary shadow-[0_0_0_4px_rgba(4,83,205,0.08)]" : "border-surface-container-high hover:border-surface-dim"}`}>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center">
                  <div className="h-2.5 w-2.5 rounded-full border-2 border-secondary bg-white" />
                </div>
                <input
                  ref={fromRef}
                  type="text"
                  value={fromQuery}
                  onChange={(e) => { setFromQuery(e.target.value); setActiveField("from"); }}
                  onFocus={() => setActiveField("from")}
                  placeholder="Dari mana, lek?"
                  className="flex-1 bg-transparent py-4 text-sm text-on-surface outline-none placeholder:text-on-surface-variant/40 font-body"
                />
                <button
                  onClick={() => handleUseMyLocation("from")}
                  className="shrink-0 p-2 rounded-xl text-secondary hover:bg-secondary/5 transition-colors"
                  title="Pakai lokasi saya"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 3.75A6.75 6.75 0 0013.5 10.5v3.75m-3.75 0h3.75m-3.75 0L9 17.25m1.5-1.5l-1.5 1.5m0 0a3 3 0 105.25 1.5M12 15l1.5-1.5" />
                  </svg>
                </button>
              </div>

              {activeField === "from" && fromSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-40 mt-2 max-h-52 overflow-y-auto rounded-2xl bg-white shadow-[0_12px_40px_rgba(4,27,60,0.12)] border border-surface-container-high">
                  {fromSuggestions.map((loc, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(loc, "from")}
                      className="flex w-full items-center gap-3 px-5 py-3.5 text-left hover:bg-surface-container-low text-sm transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-secondary/10">
                        <svg className="h-3.5 w-3.5 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                      </div>
                      <span className="text-on-surface">{loc.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="relative">
              <div className={`flex items-center rounded-2xl border-2 bg-white pl-12 pr-3 transition-all duration-200 ${activeField === "to" ? "border-primary shadow-[0_0_0_4px_rgba(124,88,0,0.08)]" : "border-surface-container-high hover:border-surface-dim"}`}>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 flex h-5 w-5 items-center justify-center">
                  <div className="h-2.5 w-2.5 rounded-full border-2 border-primary bg-primary-light" />
                </div>
                <input
                  type="text"
                  value={toQuery}
                  onChange={(e) => { setToQuery(e.target.value); setActiveField("to"); }}
                  onFocus={() => setActiveField("to")}
                  placeholder="Ke mana, lek?"
                  className="flex-1 bg-transparent py-4 text-sm text-on-surface outline-none placeholder:text-on-surface-variant/40 font-body"
                />
                <button
                  onClick={() => handleUseMyLocation("to")}
                  className="shrink-0 p-2 rounded-xl text-primary hover:bg-primary/5 transition-colors"
                  title="Pakai lokasi saya"
                >
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </button>
              </div>

              {activeField === "to" && toSuggestions.length > 0 && (
                <div className="absolute top-full left-0 right-0 z-40 mt-2 max-h-52 overflow-y-auto rounded-2xl bg-white shadow-[0_12px_40px_rgba(4,27,60,0.12)] border border-surface-container-high">
                  {toSuggestions.map((loc, i) => (
                    <button
                      key={i}
                      onClick={() => handleSelect(loc, "to")}
                      className="flex w-full items-center gap-3 px-5 py-3.5 text-left hover:bg-surface-container-low text-sm transition-colors first:rounded-t-2xl last:rounded-b-2xl"
                    >
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <svg className="h-3.5 w-3.5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                        </svg>
                      </div>
                      <span className="text-on-surface">{loc.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <button
            onClick={swapLocations}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 h-9 w-9 flex items-center justify-center rounded-full bg-surface-container border border-surface-container-high shadow-sm hover:shadow-md hover:bg-white hover:border-secondary/30 transition-all active:scale-90"
          >
            <svg className="h-4 w-4 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13-6L16.5 19m0 0L12 14.5m4.5 4.5V6" />
            </svg>
          </button>
        </div>

        <button
          onClick={handleNavigate}
          disabled={!bothFilled || loading}
          className={`mt-6 w-full rounded-2xl py-4.5 font-heading text-sm font-bold text-on-primary transition-all duration-300 flex items-center justify-center gap-2.5 ${
            bothFilled && !loading
              ? "bg-primary shadow-[0_8px_24px_rgba(124,88,0,0.25)] hover:shadow-[0_12px_32px_rgba(124,88,0,0.35)] hover:scale-[1.01] active:scale-[0.99]"
              : "bg-surface-container-high text-on-surface-variant/40 cursor-not-allowed"
          }`}
        >
          {loading ? (
            <>
              <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              <span>Cari rute, lek...</span>
            </>
          ) : (
            <>
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 6.75V15m6-6v8.25m.503-11.903a24.204 24.204 0 01-4.003 0 1.54 1.54 0 01-1.292-1.486c-.043-.572.197-1.147.644-1.522a1.54 1.54 0 011.486-1.292z" />
              </svg>
              <span>{bothFilled ? "Cari Rute, Lek!" : "Isi dulu asal & tujuannya"}</span>
            </>
          )}
        </button>

        {errorMessage && (
          <div role="alert" className="mt-3 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium leading-relaxed text-red-700">
            <svg className="mt-0.5 h-4 w-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m0 3h.008M10.29 3.86l-7.1 12a2 2 0 001.72 3h14.18a2 2 0 001.72-3l-7.1-12a2 2 0 00-3.44 0z" />
            </svg>
            {errorMessage}
          </div>
        )}

        {!fullscreen && (
          <div className="mt-14 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { icon: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z", title: "Share Lokasi", desc: "Klik icon GPS di input", color: "secondary" },
              { icon: "M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z", title: "Ketik Nama", desc: "Jalan, halte, atau area", color: "primary" },
              { icon: "M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349", title: "Temukan Rute", desc: "118 rute angkot", color: "emerald" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-4 rounded-2xl bg-white p-5 border border-surface-container-high/60 shadow-[0_2px_8px_rgba(0,0,0,0.04)]">
                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                  item.color === "secondary" ? "bg-secondary/8 text-secondary" :
                  item.color === "primary" ? "bg-primary/8 text-primary" :
                  "bg-emerald-500/8 text-emerald-600"
                }`}>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
                  </svg>
                </div>
                <div>
                  <p className="font-heading text-sm font-bold text-on-surface">{item.title}</p>
                  <p className="mt-0.5 text-xs text-on-surface-variant leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}