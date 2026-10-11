export default function RouteGuidance({ result, onBack }) {
  if (!result || !result.routes || result.routes.length === 0) {
    return (
      <div className="flex-1 bg-white rounded-t-[2rem] shadow-[0_-8px_40px_rgba(0,0,0,0.06)] px-6 py-10">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-surface-container">
            <svg className="h-10 w-10 text-on-surface-variant/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
          </div>
          <h3 className="font-heading text-xl font-bold text-on-surface mb-2">Yah, rute nggak ketemu, lek!</h3>
          <p className="text-sm text-on-surface-variant leading-relaxed max-w-sm mx-auto">Coba cari lokasi yang lebih deket sama halte angkot, bah. Atau coba lokasi lain.</p>
          <button onClick={onBack} className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3 font-heading text-sm font-bold text-on-primary shadow-[0_4px_16px_rgba(124,88,0,0.2)] hover:shadow-[0_8px_24px_rgba(124,88,0,0.3)] transition-all">
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
            </svg>
            Cari Lagi
          </button>
        </div>
      </div>
    );
  }

  const mainRoute = result.routes[0];

  return (
    <div className="flex-1 bg-white rounded-t-[2rem] shadow-[0_-8px_40px_rgba(0,0,0,0.06)] animate-slide-up">
      <div className="mx-auto max-w-xl px-5 sm:px-6 py-6 sm:py-8">
        <div className="mb-6 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors group">
            <svg className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            Cari Rute Lain
          </button>
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
            <span className="text-[11px] font-semibold text-emerald-700">Rute ditemukan</span>
          </div>
        </div>

        {mainRoute.type === "direct" ? (
          <DirectRoute route={mainRoute} />
        ) : (
          <TransferRoute route={mainRoute} />
        )}

        {result.routes.length > 1 && (
          <div className="mt-8 pt-6 border-t border-surface-container-high">
            <p className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider mb-3">Rute Alternatif</p>
            <div className="space-y-2">
              {result.routes.slice(1).map((alt, i) => (
                <div key={i} className="flex items-center gap-3 rounded-xl bg-surface-container-low p-4 border border-surface-container-high/50">
                  {alt.type === "direct" ? (
                    <>
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold text-on-primary" style={{ backgroundColor: COLOR_HEX[alt.route.color] || "#9ca3af" }}>
                        {alt.route.number}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-on-surface">Naik langsung angkot {alt.route.number}</span>
                        <span className="text-on-surface-variant"> - {alt.totalStops} halte</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-center gap-1.5 shrink-0">
                        <div className="flex h-7 w-7 items-center justify-center rounded-md text-[9px] font-bold text-on-primary" style={{ backgroundColor: COLOR_HEX[alt.leg1.route.color] || "#9ca3af" }}>
                          {alt.leg1.route.number}
                        </div>
                        <svg className="h-3 w-3 text-on-surface-variant/50" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                        <div className="flex h-7 w-7 items-center justify-center rounded-md text-[9px] font-bold text-on-primary" style={{ backgroundColor: COLOR_HEX[alt.leg2.route.color] || "#9ca3af" }}>
                          {alt.leg2.route.number}
                        </div>
                      </div>
                      <div className="text-sm">
                        <span className="font-medium text-on-surface">Transit angkot {alt.leg1.route.number} + {alt.leg2.route.number}</span>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const COLOR_HEX = {
  Kuning: "#fdb813", Biru: "#0453cd", Hijau: "#22c55e",
  "Merah Hijau": "#f43f5e", "Merah Kuning": "#f97316",
};

function DirectRoute({ route }) {
  const color = COLOR_HEX[route.route.color] || "#9ca3af";

  return (
    <div>
      <div className="flex items-center gap-4 mb-5">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl text-on-primary font-heading text-base font-bold shadow-md" style={{ backgroundColor: color }}>
          {route.route.number}
        </div>
        <div>
          <p className="font-heading text-base font-bold text-on-surface">Naik langsung, lek!</p>
          <p className="text-xs text-on-surface-variant mt-0.5">{route.route.operator} &middot; {route.route.origin} &rarr; {route.route.destination}</p>
        </div>
      </div>

      <div className="rounded-2xl bg-surface p-5 mb-6 border border-surface-container-high/40">
        <p className="text-sm text-on-surface leading-relaxed">
          Naik{" "}
          <span className="inline-flex items-center gap-1 rounded-lg px-2 py-0.5 font-bold text-on-primary text-xs" style={{ backgroundColor: color }}>
            angkot {route.route.number}
          </span>{" "}
          lek di{" "}
          <span className="font-semibold text-on-surface">{route.boardStop.name}</span>, terus{" "}
          {route.totalStops > 1 ? (
            <>
              jalan <span className="font-semibold">{route.totalStops} halte</span>, turun di{" "}
              <span className="font-semibold text-on-surface">{route.alightStop.name}</span>.
            </>
          ) : (
            <>
              langsung turun di{" "}
              <span className="font-semibold text-on-surface">{route.alightStop.name}</span>.
            </>
          )}
          <span className="text-on-surface-variant"> Mantap!</span>
        </p>
      </div>

      <TimelineLeg
        number={1}
        color={color}
        label={`Angkot ${route.route.number}`}
        boardStop={route.boardStop}
        alightStop={route.alightStop}
        intermediateStops={route.intermediateStops}
      />
    </div>
  );
}

function TransferRoute({ route }) {
  const c1 = COLOR_HEX[route.leg1.route.color] || "#9ca3af";
  const c2 = COLOR_HEX[route.leg2.route.color] || "#9ca3af";

  return (
    <div>
      <div className="flex items-center gap-4 mb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-on-primary font-heading text-sm font-bold shadow-md" style={{ backgroundColor: c1 }}>
            {route.leg1.route.number}
          </div>
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container border border-surface-container-high">
            <svg className="h-4 w-4 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </div>
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl text-on-primary font-heading text-sm font-bold shadow-md" style={{ backgroundColor: c2 }}>
            {route.leg2.route.number}
          </div>
        </div>
        <div>
          <p className="font-heading text-base font-bold text-on-surface">Transit sekali, lek!</p>
          <p className="text-xs text-on-surface-variant mt-0.5">Ganti angkot di perjalanan</p>
        </div>
      </div>

      <div className="rounded-2xl bg-surface p-5 mb-6 border border-surface-container-high/40">
        <div className="space-y-3">
          <p className="text-sm text-on-surface leading-relaxed">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-bold text-on-primary" style={{ backgroundColor: c1 }}>1</span>{" "}
            Naik{" "}
            <span className="inline-flex items-center gap-0.5 rounded-lg px-2 py-0.5 font-bold text-on-primary text-xs" style={{ backgroundColor: c1 }}>
              angkot {route.leg1.route.number}
            </span>{" "}
            lek di{" "}
            <span className="font-semibold text-on-surface">{route.leg1.boardStop.name}</span>, jalan{" "}
            <span className="font-semibold">{route.leg1.totalStops} halte</span>, turun di{" "}
            <span className="font-semibold text-on-surface">{route.leg1.alightStop.name}</span>.
          </p>

          <div className="flex items-center gap-2.5 pl-1">
            <div className="flex flex-col items-center">
              <div className="h-2 w-2 rounded-full bg-surface-container-high" />
              <div className="h-3 w-px bg-surface-container-high" />
              <div className="h-2 w-2 rounded-full bg-surface-container-high" />
            </div>
            <span className="text-xs font-medium text-on-surface-variant italic">Pindah ke angkot {route.leg2.route.number} di sini, lek</span>
          </div>

          <p className="text-sm text-on-surface leading-relaxed">
            <span className="inline-flex h-5 w-5 items-center justify-center rounded-md text-[10px] font-bold text-on-primary" style={{ backgroundColor: c2 }}>2</span>{" "}
            Sambung{" "}
            <span className="inline-flex items-center gap-0.5 rounded-lg px-2 py-0.5 font-bold text-on-primary text-xs" style={{ backgroundColor: c2 }}>
              angkot {route.leg2.route.number}
            </span>{" "}
            lek di{" "}
            <span className="font-semibold text-on-surface">{route.leg2.boardStop.name}</span>, jalan{" "}
            <span className="font-semibold">{route.leg2.totalStops} halte</span>, turun di{" "}
            <span className="font-semibold text-on-surface">{route.leg2.alightStop.name}</span>.{" "}
            <span className="text-on-surface-variant">Sampai, bah!</span>
          </p>
        </div>
      </div>

      <div className="space-y-0">
        <TimelineLeg
          number={1}
          color={c1}
          label={`Angkot ${route.leg1.route.number}`}
          boardStop={route.leg1.boardStop}
          alightStop={route.leg1.alightStop}
          intermediateStops={route.leg1.intermediateStops}
        />

        <div className="flex items-center gap-3 py-3 pl-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container border border-surface-container-high">
            <svg className="h-4 w-4 text-on-surface-variant" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
            </svg>
          </div>
          <span className="text-xs font-medium text-on-surface-variant">Pindah angkot di sini, lek</span>
        </div>

        <TimelineLeg
          number={2}
          color={c2}
          label={`Angkot ${route.leg2.route.number}`}
          boardStop={route.leg2.boardStop}
          alightStop={route.leg2.alightStop}
          intermediateStops={route.leg2.intermediateStops}
        />
      </div>
    </div>
  );
}

function TimelineLeg({ number, color, label, boardStop, alightStop, intermediateStops }) {
  return (
    <div>
      <div className="flex items-center gap-2.5 mb-2.5">
        <div className="flex h-6 w-6 items-center justify-center rounded-full text-[10px] font-bold text-on-primary" style={{ backgroundColor: color }}>
          {number}
        </div>
        <span className="text-xs font-bold text-on-surface">{label}</span>
      </div>
      <div className="ml-3 pl-6 border-l-2" style={{ borderColor: color + "30" }}>
        <StopDot name={boardStop.name} tag="Naik" color={color} primary />
        {intermediateStops && intermediateStops.map((stop, i) => (
          <StopDot key={stop.id || i} name={stop.name} color={color} />
        ))}
        <StopDot name={alightStop.name} tag="Turun" color={color} primary />
      </div>
    </div>
  );
}

function StopDot({ name, tag, color, primary }) {
  return (
    <div className="relative flex items-center gap-3" style={{ padding: primary ? "6px 0" : "4px 0" }}>
      <div
        className={`absolute ${primary ? "-left-[30px] h-3 w-3" : "-left-[26px] h-2 w-2"}`}
        style={{
          borderRadius: "50%",
          backgroundColor: primary ? color : color + "50",
          border: primary ? "2.5px solid white" : "1.5px solid white",
          boxShadow: primary ? `0 0 0 2px ${color}20` : "none",
        }}
      />
      <div className="flex items-center gap-2">
        <span className={`text-on-surface ${primary ? "text-xs font-semibold" : "text-[11px] text-on-surface-variant"}`}>
          {name}
        </span>
        {tag && (
          <span className="text-[10px] font-medium text-on-surface-variant/60">({tag})</span>
        )}
      </div>
    </div>
  );
}