export default function Navbar({ view, onBack }) {
  const isHome = view === "home";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 h-14 sm:h-16 transition-colors duration-300 ${
      isHome
        ? "bg-navy/70 backdrop-blur-md border-b border-white/5"
        : "bg-white/90 backdrop-blur-lg border-b border-surface-container-high/50"
    }`}>
      <div className="mx-auto flex h-full max-w-6xl page-gutter items-center justify-between">
        <div className="flex items-center gap-2.5 sm:gap-3">
          {view !== "home" && (
            <button
              onClick={onBack}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant hover:bg-surface-container transition-colors"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
              </svg>
            </button>
          )}

          <a href="/" className="flex items-center gap-2" onClick={(e) => { e.preventDefault(); onBack(); }}>
            <div className="flex h-9 w-36 items-center justify-center overflow-hidden rounded-xl bg-white shadow-[0_4px_14px_rgba(253,184,19,0.22)] sm:h-10 sm:w-40">
              <img src="/angkotmedan-logo.svg" alt="Logo AngkotMedan" className="h-full w-full object-contain" />
            </div>
          </a>
        </div>

        {isHome && (
          <div className="flex items-center gap-1.5 rounded-full bg-white/10 border border-white/10 px-2.5 py-1 sm:px-3 sm:py-1.5 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse-dot" />
            <span className="text-[10px] sm:text-[11px] font-medium text-white/80">118 Rute</span>
          </div>
        )}
      </div>
    </nav>
  );
}