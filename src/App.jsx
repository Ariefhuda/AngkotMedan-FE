import { useState } from "react";
import Navbar from "./components/Navbar.jsx";
import HeroSection from "./components/HeroSection.jsx";
import SearchSection from "./components/SearchSection.jsx";
import MapView from "./components/MapView.jsx";
import RouteGuidance from "./components/RouteGuidance.jsx";

export default function App() {
  const [view, setView] = useState("home");
  const [routeResult, setRouteResult] = useState(null);
  const [fromLoc, setFromLoc] = useState(null);
  const [toLoc, setToLoc] = useState(null);

  function handleSearchResult(result, from, to) {
    setRouteResult(result);
    setFromLoc(from);
    setToLoc(to);
    setView("result");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function handleBack() {
    setView("home");
    setRouteResult(null);
    setFromLoc(null);
    setToLoc(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <div className="min-h-full flex flex-col">
      <Navbar view={view} onBack={handleBack} />

      {view === "home" && (
        <main className="flex-1">
          <HeroSection onExplore={() => { setView("search"); window.scrollTo({ top: 0 }); }} />
          <SearchSection onSearchResult={handleSearchResult} />
        </main>
      )}

      {view === "search" && (
        <main className="flex-1 pt-20">
          <SearchSection fullscreen onBack={handleBack} onSearchResult={handleSearchResult} />
        </main>
      )}

      {view === "result" && (
        <main className="flex-1 flex flex-col pt-16">
          <MapView fromLoc={fromLoc} toLoc={toLoc} />
          <RouteGuidance result={routeResult} onBack={handleBack} />
        </main>
      )}

      <footer className="border-t border-white/10 bg-navy py-8 text-white sm:py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 page-gutter sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="h-12 w-40 overflow-hidden rounded-xl bg-white p-1.5 shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
              <img src="/angkotmedan-logo.svg" alt="Logo AngkotMedan" className="h-full w-full object-contain" />
            </div>
            <div>
              <p className="font-heading text-sm font-bold">AngkotMedan</p>
              <p className="mt-1 text-xs text-white/55">Sistem informasi angkutan kota Medan</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/55">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span>Layanan rute aktif</span>
            <span className="mx-1 text-white/20">|</span>
            <span>Medan, Sumatera Utara</span>
          </div>
        </div>
      </footer>
    </div>
  );
}