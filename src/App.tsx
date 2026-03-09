import { useState, useEffect } from "react";

const destinations = [
  {
    name: "Santorini",
    country: "Grèce",
    tag: "Coup de cœur",
    img: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?w=600&q=80",
  },

  {
    name: "Kyoto",
    country: "Japon",
    tag: "Tendance",
    img: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=600&q=80",
    price: "À partir de 1 240€",
  },
  {
    name: "Marrakech",
    country: "Maroc",
    tag: "Escapade",
    img: "https://images.unsplash.com/photo-1539020140153-e479b8c22e70?w=600&q=80",
    price: "À partir de 420€",
  },
  {
    name: "Patagonie",
    country: "Argentine",
    tag: "Aventure",
    img: "https://images.unsplash.com/photo-1501854140801-50d01698950b?w=600&q=80",
    price: "À partir de 1 680€",
  },
];

const navLinks = ["Destinations", "Voyages sur mesure", "Offres", "Blog"];

const footerCols = [
  {
    title: "Explorer",
    links: ["Destinations", "Offres spéciales", "Voyages en groupe", "Lune de miel"],
  },
  {
    title: "Moov-on",
    links: ["À propos", "Blog voyage", "Presse", "Carrières"],
  },
  {
    title: "Assistance",
    links: ["Contact", "FAQ", "Conditions", "Mentions légales"],
  },
];

export default function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="bg-[#0d0d0d] text-[#f5f0e8] min-h-screen overflow-x-hidden">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        .font-cg { font-family: 'Cormorant Garamond', Georgia, serif; }
        .font-dm { font-family: 'DM Sans', sans-serif; }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(28px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .anim { animation: fadeUp 0.8s forwards; opacity: 0; }
        .d1 { animation-delay: 0.2s; }
        .d2 { animation-delay: 0.45s; }
        .d3 { animation-delay: 0.65s; }
        .d4 { animation-delay: 0.85s; }
        .d5 { animation-delay: 1.05s; }
        .card-zoom img { transition: transform 0.7s ease, filter 0.5s ease; }
        .card-zoom:hover img { transform: scale(1.07); filter: brightness(0.9); }
      `}</style>

      {/* ── NAVBAR ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-16 h-[72px] transition-all duration-500 ${
          scrolled
            ? "bg-[#0d0d0d]/90 backdrop-blur-md border-b border-[#d4a853]/10"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center gap-2">
          <span className="font-cg font-semibold text-[1.5rem] tracking-wide">Moov</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#d4a853] mt-0.5 shrink-0" />
          <span className="font-cg font-light italic text-[1.5rem] tracking-wide text-[#d4a853]">on</span>
        </div>

        <div className="hidden md:flex items-center gap-10">
          {navLinks.map((l) => (
            <span
              key={l}
              className="font-dm text-[0.72rem] tracking-widest uppercase text-[#c9bfa8] hover:text-[#f5f0e8] transition-colors cursor-pointer"
            >
              {l}
            </span>
          ))}
          <a
            href="#"
            className="font-dm text-[0.7rem] tracking-widest uppercase bg-[#d4a853] text-[#0d0d0d] px-5 py-2.5 hover:bg-[#e8c27a] transition-colors"
          >
            Réserver
          </a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="relative h-screen min-h-[620px] flex flex-col justify-end pb-20 px-16">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-[0.45]"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=1800&q=85)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/10 to-transparent" />
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-28 bg-gradient-to-b from-transparent via-[#d4a853] to-transparent" />

        <div className="relative z-10 max-w-3xl">
          <p className="font-dm text-[0.68rem] tracking-[0.22em] uppercase text-[#d4a853] mb-5 anim d1">
            ✦ Voyages d'exception
          </p>
          <h1 className="font-cg font-light text-[5.5rem] leading-[1.02] mb-7">
            <span className="anim d2 block">Le monde</span>
            <span className="anim d3 block italic text-[#d4a853] font-normal">vous attend.</span>
          </h1>
          <p className="font-dm font-light text-[1rem] leading-relaxed text-[#a89e8a] max-w-md mb-10 anim d4">
            Des voyages sur mesure conçus pour ceux qui refusent l'ordinaire.
            Partez plus loin, plus vrai, avec Moov‑on.
          </p>
          <div className="flex gap-4 anim d5">
            <a
              href="#"
              className="font-dm text-[0.7rem] tracking-widest uppercase bg-[#d4a853] text-[#0d0d0d] px-9 py-3.5 hover:bg-[#e8c27a] hover:-translate-y-0.5 transition-all"
            >
              Explorer les destinations
            </a>
            <a
              href="#"
              className="font-dm text-[0.7rem] tracking-widest uppercase border border-[#f5f0e8]/30 text-[#f5f0e8] px-9 py-3.5 hover:border-[#d4a853] hover:text-[#d4a853] hover:-translate-y-0.5 transition-all"
            >
              Notre histoire
            </a>
          </div>
        </div>

        <div className="absolute bottom-8 right-16 flex flex-col items-center gap-2">
          <span className="font-dm text-[0.56rem] tracking-[0.2em] uppercase text-[#6b6255] [writing-mode:vertical-rl]">
            Défiler
          </span>
          <div className="w-px h-12 bg-gradient-to-b from-[#d4a853] to-transparent" />
        </div>
      </section>

      {/* ── SEARCH BAR ── */}
      <section className="bg-[#111] border-y border-[#d4a853]/10 py-9 px-16">
        <div className="flex flex-col md:flex-row items-stretch md:items-end max-w-5xl mx-auto gap-4 md:gap-0">
          {[
            { label: "Destination", placeholder: "Où voulez-vous aller ?" },
            { label: "Départ", placeholder: "Date de départ" },
            { label: "Retour", placeholder: "Date de retour" },
            { label: "Voyageurs", placeholder: "2 adultes" },
          ].map((field, i) => (
            <div
              key={i}
              className={`flex-1 px-7 ${i < 3 ? "md:border-r border-white/[0.06]" : ""}`}
            >
              <label className="font-dm text-[0.6rem] tracking-[0.15em] uppercase text-[#d4a853] block mb-1.5">
                {field.label}
              </label>
              <input
                className="w-full bg-transparent border-0 border-b border-[#d4a853]/30 text-[#f5f0e8] font-dm text-[0.82rem] py-2.5 outline-none focus:border-[#d4a853] placeholder-[#c9bfa8]/40 transition-colors"
                placeholder={field.placeholder}
              />
            </div>
          ))}
          <div className="md:pl-7 shrink-0">
            <a
              href="#"
              className="font-dm text-[0.7rem] tracking-widest uppercase bg-[#d4a853] text-[#0d0d0d] px-7 py-3.5 whitespace-nowrap hover:bg-[#e8c27a] transition-colors block text-center"
            >
              Rechercher
            </a>
          </div>
        </div>
      </section>

      {/* ── DESTINATIONS ── */}
      <section className="py-24 px-16">
        <div className="flex justify-between items-end mb-12 max-w-[1200px] mx-auto">
          <div>
            <p className="font-dm text-[0.66rem] tracking-[0.2em] uppercase text-[#d4a853] mb-3">
              ✦ Sélection du moment
            </p>
            <h2 className="font-cg font-light text-5xl leading-tight">
              Destinations{" "}
              <span className="italic text-[#d4a853] font-normal">phares</span>
            </h2>
          </div>
          <a href="#" className="font-dm text-[0.72rem] tracking-widest uppercase text-[#c9bfa8] hover:text-[#f5f0e8] transition-colors mb-1">
            Voir tout →
          </a>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-4 max-w-[1200px] mx-auto h-[440px]">
          {destinations.map((d, i) => (
            <div key={i} className="card-zoom group relative overflow-hidden rounded-sm cursor-pointer">
              <img
                src={d.img}
                alt={d.name}
                className="w-full h-full object-cover brightness-75"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <span className="font-dm text-[0.6rem] tracking-[0.14em] uppercase text-[#d4a853] border border-[#d4a853] px-2.5 py-0.5 rounded-full inline-block mb-2.5">
                  {d.tag}
                </span>
                <h3 className={`font-cg font-normal leading-tight mb-1 ${i === 0 ? "text-[1.85rem]" : "text-[1.35rem]"}`}>
                  {d.name}
                </h3>
                <p className="font-dm text-[0.7rem] tracking-wide text-[#a89e8a]">
                  {d.country} · {d.price}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="bg-[#111] border-y border-[#d4a853]/10 py-16 px-16">
        <div className="flex justify-center gap-16 md:gap-24 max-w-4xl mx-auto flex-wrap">
          {[
            { value: "80+", label: "Pays couverts" },
            { value: "14 000", label: "Voyageurs ravis" },
            { value: "98%", label: "Satisfaction client" },
            { value: "12 ans", label: "D'expérience" },
          ].map((s, i) => (
            <div key={i} className="text-center">
              <div className="w-8 h-px bg-[#d4a853] mx-auto mb-3" />
              <p className="font-cg font-semibold text-5xl text-[#f5f0e8] leading-none mb-2">
                {s.value}
              </p>
              <p className="font-dm text-[0.66rem] tracking-[0.14em] uppercase text-[#6b6255]">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="relative py-28 px-16 text-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center brightness-[0.3]"
          style={{ backgroundImage: "url(https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1600&q=80)" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,168,83,0.07)_0%,rgba(13,13,13,0.5)_70%)]" />
        <div className="relative z-10">
          <p className="font-dm text-[0.66rem] tracking-[0.22em] uppercase text-[#d4a853] mb-5">
            ✦ Voyage personnalisé
          </p>
          <h2 className="font-cg font-light text-[3.4rem] leading-tight max-w-xl mx-auto mb-5">
            Votre voyage{" "}
            <span className="italic text-[#d4a853] font-normal">unique</span>{" "}
            commence ici
          </h2>
          <p className="font-dm font-light text-[0.95rem] text-[#a89e8a] max-w-md mx-auto leading-relaxed mb-10">
            Nos experts conçoivent pour vous un itinéraire sur mesure, de A à Z,
            selon vos envies et votre budget.
          </p>
          <a
            href="#"
            className="font-dm text-[0.7rem] tracking-widest uppercase bg-[#d4a853] text-[#0d0d0d] px-10 py-4 hover:bg-[#e8c27a] hover:-translate-y-0.5 transition-all inline-block"
          >
            Demander un devis gratuit
          </a>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="bg-[#0a0a0a] px-16 pt-14 pb-9 border-t border-[#d4a853]/10">
        <div className="flex justify-between items-start flex-wrap gap-10 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="font-cg font-semibold text-xl text-[#f5f0e8]">Moov</span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#d4a853]" />
              <span className="font-cg font-light italic text-xl text-[#d4a853]">on</span>
            </div>
            <p className="font-dm font-light text-[0.78rem] text-[#6b6255] max-w-[200px] leading-relaxed">
              Des voyages d'exception pour des esprits curieux du monde.
            </p>
          </div>

          {footerCols.map((col) => (
            <div key={col.title}>
              <p className="font-dm text-[0.6rem] tracking-[0.18em] uppercase text-[#d4a853] mb-4">
                {col.title}
              </p>
              {col.links.map((l) => (
                <a
                  key={l}
                  href="#"
                  className="font-dm text-[0.78rem] text-[#6b6255] hover:text-[#c9bfa8] transition-colors block mb-2.5"
                >
                  {l}
                </a>
              ))}
            </div>
          ))}
        </div>

        <div className="border-t border-white/[0.05] pt-6 flex justify-between items-center">
          <p className="font-dm text-[0.66rem] tracking-wide text-[#3d3830]">
            © 2026 Moov-on. Tous droits réservés.
          </p>
          <p className="font-cg italic text-[0.86rem] text-[#3d3830]">
            Move. Discover. Live.
          </p>
        </div>
      </footer>
    </div>
  );
}