import { Link } from "react-router-dom";

import { useInView } from "../../hooks/useInView";

export default function CTABanner() {
  const { ref, visible } = useInView(0.12);
  return (
    <section ref={ref as React.RefObject<HTMLElement>} aria-label="Créer un compte" className="max-w-6xl mx-auto px-6 py-10">
      <div
        className={`relative rounded-3xl overflow-hidden transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
        style={{ background: "linear-gradient(135deg, #1C1917 0%, #292524 100%)", padding: "3.5rem" }}
      >
        {/* Glow */}
        <div aria-hidden="true" className="absolute -top-16 right-0 w-96 h-96 rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, #E8440A22 0%, transparent 70%)" }} />
        {/* Grid */}
        <div aria-hidden="true" className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.5) 1px,transparent 1px)", backgroundSize: "40px 40px" }} />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-10">
          <div>
            <p className="text-[0.75rem] font-bold tracking-[0.14em] uppercase mb-3" style={{ color: "#E8440A" }}>✦ Expérience personnalisée</p>
            <h3 style={{ fontFamily: "'DM Serif Display',serif", fontSize: "clamp(1.6rem,4vw,2.4rem)", lineHeight: 1.1, color: "#FAFAF8" }}>
              Dites-nous ce que<br />vous aimez.
              <span style={{ color: "#E8440A" }}> On s'occupe<br />du reste.</span>
            </h3>
            <p className="mt-4 text-[0.88rem] text-stone-400 max-w-sm leading-relaxed">
              Créez votre compte gratuitement pour recevoir des suggestions 100% adaptées à vos goûts et votre région.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/register"
              className="text-[0.875rem] font-bold px-8 py-3.5 rounded-xl text-white hover:scale-105 active:scale-95 transition-all duration-250 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 focus-visible:ring-offset-stone-900"
              style={{ background: "#E8440A", boxShadow: "0 0 32px rgba(232,68,10,0.25)" }}
            >Créer mon compte</Link>
            <a href="#"
              className="text-[0.875rem] font-medium text-stone-400 border border-stone-700 px-8 py-3.5 rounded-xl hover:border-stone-400 hover:text-white transition-all duration-250 text-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400"
            >En savoir plus</a>
          </div>
        </div>
      </div>
    </section>
  );
}