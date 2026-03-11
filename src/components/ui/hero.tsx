import { useState, useEffect } from "react";

interface HeroProps {
  search: string;
  setSearch: (v: string) => void;
}

export default function Hero({ search, setSearch }: HeroProps) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section aria-label="Bienvenue sur Moov.On" className="relative min-h-screen flex items-center overflow-hidden bg-stone-50 pt-[68px]">
      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`, backgroundSize: "180px" }}
      />

      {/* Accent blob */}
      <div
        className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/4 w-[640px] h-[640px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse at 40% 40%, #FDE8DD 0%, #FFF3EE 50%, transparent 75%)", animation: "float 12s ease-in-out infinite" }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-24 w-full">
        <div className="max-w-[700px]">

          {/* Eyebrow */}
          <div
            className={`transition-all duration-600 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "80ms" }}
          >
            <div className="inline-flex items-center gap-2.5 mb-9">
              <span className="w-2 h-2 rounded-full bg-[#E8440A] animate-pulse" aria-hidden="true" />
              <span className="text-[0.8rem] font-bold text-stone-500 tracking-[0.12em] uppercase">
                58 activités ce weekend à Tana
              </span>
            </div>
          </div>

          {/* Headline */}
          <h1
            className={`transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{
              transitionDelay: "160ms",
              fontFamily: "'DM Serif Display',serif",
              fontSize: "clamp(3rem,7vw,5.5rem)",
              lineHeight: "1.03",
              letterSpacing: "-0.02em",
              color: "#1C1917",
            }}
          >
            Fini l'ennui<br />
            à Madagascar.
            <span style={{ color: "#E8440A" }}> Bougeons.</span>
          </h1>

          {/* Subline */}
          <p
            className={`mt-7 text-[1.05rem] text-stone-500 leading-relaxed max-w-[480px] transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "260ms" }}
          >
            Randonnées, concerts, marchés artisanaux, sports nautiques — trouvez l'activité parfaite partout à Madagascar.
          </p>

          {/* Search */}
          <div
            className={`mt-10 transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
            style={{ transitionDelay: "360ms" }}
          >
            <div
              role="search"
              className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3.5 border border-stone-200 focus-within:border-stone-900 focus-within:shadow-[0_0_0_3px_rgba(28,25,23,0.06)] transition-all duration-250"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
            >
              <svg aria-hidden="true" className="w-4 h-4 text-stone-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="search"
                id="hero-search"
                aria-label="Rechercher une activité"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Randonnée, pirogue, marché artisanal…"
                className="flex-1 text-[0.9rem] text-stone-800 placeholder-stone-400 outline-none bg-transparent"
              />
              <button
                type="submit"
                aria-label="Lancer la recherche"
                className="text-[0.82rem] font-bold bg-stone-900 text-white px-5 py-2 rounded-xl hover:bg-[#E8440A] transition-all duration-250 hover:scale-105 active:scale-95 shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
              >
                Chercher
              </button>
            </div>

            <p className="text-[0.78rem] text-stone-400 mt-3 pl-1" aria-live="polite">
              Populaire :&nbsp;
              {["Lémuriens", "Plage Ifaty", "Tsingy de Bemaraha"].map((t, i) => (
                <button
                  key={t}
                  onClick={() => setSearch(t)}
                  className="text-stone-600 font-semibold hover:text-[#E8440A] transition-colors underline underline-offset-2 decoration-stone-300 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 rounded-sm"
                >
                  {t}{i < 2 ? ",\u00A0" : ""}
                </button>
              ))}
            </p>
          </div>

          {/* Stats */}
          <dl
            className={`mt-14 flex gap-10 flex-wrap transition-all duration-700 ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
            style={{ transitionDelay: "500ms" }}
          >
            {[
              { value: "350+", label: "Activités" },
              { value: "4.9★", label: "Note moyenne" },
              { value: "8k+",  label: "Utilisateurs" },
              { value: "22",   label: "Villes" },
            ].map((s) => (
              <div key={s.label} className="flex flex-col">
                <dt className="sr-only">{s.label}</dt>
                <dd className="text-[2rem] font-black leading-none tracking-tight text-stone-900" style={{ fontFamily: "'DM Serif Display',serif" }}>{s.value}</dd>
                <span className="text-[0.78rem] text-stone-400 mt-1 font-medium" aria-hidden="true">{s.label}</span>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}