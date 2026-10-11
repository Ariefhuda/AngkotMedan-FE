export default function HeroSection({ onExplore }) {
  return (
    <section className="relative overflow-hidden bg-navy min-h-[86vh] sm:min-h-[88vh] flex items-center">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-navy via-navy-light to-navy opacity-80" />
        <svg className="absolute inset-0 h-full w-full opacity-[0.06]" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
          <path d="M-100,600 C200,500 400,700 600,550 C800,400 1000,600 1300,500" fill="none" stroke="#fdb813" strokeWidth="1.5"/>
          <path d="M-100,650 C200,550 400,750 600,600 C800,450 1000,650 1300,550" fill="none" stroke="#fdb813" strokeWidth="1"/>
          <path d="M-100,700 C200,600 400,800 600,650 C800,500 1000,700 1300,600" fill="none" stroke="#fdb813" strokeWidth="0.5"/>
          <circle cx="200" cy="300" r="80" fill="none" stroke="#fdb813" strokeWidth="0.5" opacity="0.5"/>
          <circle cx="200" cy="300" r="120" fill="none" stroke="#fdb813" strokeWidth="0.3" opacity="0.3"/>
          <circle cx="900" cy="250" r="60" fill="none" stroke="#0453cd" strokeWidth="0.5" opacity="0.4"/>
          <circle cx="900" cy="250" r="100" fill="none" stroke="#0453cd" strokeWidth="0.3" opacity="0.2"/>
        </svg>
      </div>

      <div className="relative w-full mx-auto max-w-6xl page-gutter pt-24 pb-20 sm:pt-32 sm:pb-24 text-left">
        <div className="animate-fade-in-up" style={{ animationDelay: "0.1s" }}>
          <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full border border-primary-light/25 bg-primary-light/10 px-3 sm:px-4 py-1.5 sm:py-2 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-primary-light animate-pulse-dot" />
            <span className="text-[10px] sm:text-xs font-medium text-white/70 tracking-wide uppercase">Medan Transit System</span>
          </div>
        </div>

        <h1 className="hero-title animate-fade-in-up max-w-3xl font-heading font-bold leading-[0.98] text-white tracking-tight" style={{ animationDelay: "0.2s" }}>
          Jelajahi Medan, {""}
          <span className="text-primary-light">lebih mudah.</span>
        </h1>

        <p className="animate-fade-in-up mt-5 sm:mt-6 max-w-xl text-base sm:text-lg text-white/55 leading-relaxed" style={{ animationDelay: "0.35s" }}>
          Temukan rute angkot yang paling praktis dari lokasi kamu ke seluruh penjuru kota Medan.
        </p>

        <div className="animate-fade-in-up mt-8 sm:mt-10" style={{ animationDelay: "0.5s" }}>
          <button
            onClick={onExplore}
            className="group relative inline-flex items-center gap-2.5 rounded-2xl bg-primary-light px-7 sm:px-8 py-3.5 sm:py-4 font-heading text-sm sm:text-base font-bold text-navy shadow-[0_8px_32px_rgba(253,184,19,0.25)] transition-all duration-300 hover:shadow-[0_12px_40px_rgba(253,184,19,0.35)] hover:scale-[1.03] active:scale-[0.98]"
          >
            <svg className="h-5 w-5 transition-transform group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            Cari Rute Sekarang
          </button>
        </div>

        <div className="animate-fade-in-up mt-14 sm:mt-20 grid grid-cols-3 gap-6 sm:gap-12 max-w-md" style={{ animationDelay: "0.65s" }}>
          {[
            { icon: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z", label: "118", sublabel: "Rute" },
            { icon: "M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016A3.001 3.001 0 0021 9.349", label: "190", sublabel: "Halte" },
            { icon: "M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z", label: "1x pindah", sublabel: "Paling banyak" },
          ].map((stat, i) => (
            <div key={i} className="text-left">
              <div className="mb-1.5 sm:mb-2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-white/5 border border-white/5">
                <svg className="h-4 w-4 sm:h-5 sm:w-5 text-primary-light" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d={stat.icon} />
                </svg>
              </div>
              <p className="font-heading text-sm sm:text-lg font-bold text-white">{stat.label}</p>
              <p className="text-[9px] sm:text-[11px] text-white/35 font-medium">{stat.sublabel}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-surface to-transparent" />
    </section>
  );
}