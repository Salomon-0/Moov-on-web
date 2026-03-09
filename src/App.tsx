import { useState, useEffect, useRef } from "react";
import LoginPage from "./pages/auth/login";
import RegisterPage from "./pages/auth/register";
import { Link, Routes, Route } from "react-router-dom";

/* ─────────────────────────────────────────────────────
   TYPES & DATA
───────────────────────────────────────────────────── */
const categories = [
  { icon: "👨‍👩‍👧", label: "En famille" },
  { icon: "💑",    label: "En couple"  },
  { icon: "🎉",    label: "Entre amis" },
  { icon: "🧘",    label: "Solo"       },
  { icon: "🏕️",   label: "Nature"     },
  { icon: "🎨",    label: "Culture"    },
];

const featured = [
  {
    id: 1,
    title: "Randonnée au Tsaranoro",
    type: "Nature",
    date: "Sam 15 Mars",
    time: "06h00",
    location: "Ambalavao, Fianarantsoa",
    tag: "Tendance",
    accent: "#f97316",
    bg: "from-orange-400 to-rose-500",
    emoji: "🏔️",
  },
  {
    id: 2,
    title: "Balade en pirogue sur le Canal des Pangalanes",
    type: "En famille",
    date: "Dim 16 Mars",
    time: "08h30",
    location: "Toamasina",
    tag: "Populaire",
    accent: "#0ea5e9",
    bg: "from-sky-400 to-cyan-500",
    emoji: "🚣",
  },
  {
    id: 3,
    title: "Soirée culture Merina — musique & danse",
    type: "Culture",
    date: "Ven 14 Mars",
    time: "19h00",
    location: "Antananarivo, Haute-Ville",
    tag: "Nouveau",
    accent: "#8b5cf6",
    bg: "from-violet-500 to-purple-600",
    emoji: "🎶",
  },
];

const recent = [
  { id: 4, title: "Surf à Anakao",              type: "Solo",      date: "Mar 11 Mars", time: "07h00", location: "Toliara",              emoji: "🏄" },
  { id: 5, title: "Marché artisanal Zoma",       type: "En couple", date: "Jeu 13 Mars", time: "09h00", location: "Antananarivo",          emoji: "🛍️" },
  { id: 6, title: "Observation des lémuriens",   type: "En famille",date: "Sam 15 Mars", time: "07h30", location: "Parc Andasibe",         emoji: "🐒" },
  { id: 7, title: "Concert sous les étoiles",    type: "Entre amis",date: "Ven 14 Mars", time: "20h00", location: "Mahajanga, front mer",  emoji: "🎸" },
];

const stats = [
  { value: "350+", label: "Activités",       emoji: "🗺️", dark: true  },
  { value: "4.9",  label: "Note moyenne",    emoji: "⭐", accent: true },
  { value: "8k+",  label: "Utilisateurs",    emoji: "👥", dark: false  },
  { value: "22",   label: "Villes couvertes",emoji: "📍", dark: false  },
];

/* ─────────────────────────────────────────────────────
   HOOK — intersection observer for scroll animations
───────────────────────────────────────────────────── */
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

/* ─────────────────────────────────────────────────────
   NAV
───────────────────────────────────────────────────── */
function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-[0_1px_0_0_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-1 select-none cursor-pointer">
          <span className="text-xl font-black tracking-tight text-zinc-900">Moov</span>
          <span className="text-xl font-black tracking-tight text-[#f97316]">.On</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {["Explorer", "Populaires", "Agenda", "À propos"].map((l) => (
            <a key={l} href="#"
              className="text-sm font-medium text-zinc-500 hover:text-zinc-900 relative group transition-colors">
              {l}
              <span className="absolute -bottom-0.5 left-0 w-0 h-0.5 bg-[#f97316] group-hover:w-full transition-all duration-300 rounded-full" />
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium text-zinc-600 hover:text-zinc-900 transition-colors px-4 py-2 rounded-full hover:bg-zinc-100"
          >
            Connexion
          </Link>
          <Link
            to="/register"
            className="text-sm font-bold bg-zinc-900 text-white px-5 py-2.5 rounded-full hover:bg-[#f97316] transition-all duration-300 hover:scale-105 active:scale-95 shadow-sm"
          >
            S'inscrire
          </Link>
        </div>

        {/* Burger */}
        <button className="md:hidden p-2 text-zinc-700" onClick={() => setOpen(!open)}>
          <div className={`w-5 h-0.5 bg-current mb-1.5 transition-all duration-300 origin-center ${open ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-5 h-0.5 bg-current mb-1.5 transition-all duration-300 ${open ? "opacity-0 scale-x-0" : ""}`} />
          <div className={`w-5 h-0.5 bg-current transition-all duration-300 origin-center ${open ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile dropdown */}
      <div className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}`}>
        <div className="px-6 pb-5 pt-3 flex flex-col gap-3 bg-white border-t border-zinc-100">
          {["Explorer", "Populaires", "Agenda", "À propos"].map((l) => (
            <a key={l} href="#" className="text-sm font-medium text-zinc-600 py-1">{l}</a>
          ))}
          <div className="flex gap-3 pt-2">
            <Link
              to="/login"
              className="flex-1 text-sm font-medium border border-zinc-200 text-zinc-700 py-2.5 rounded-full hover:border-zinc-900 transition-colors text-center block"
            >
              Connexion
            </Link>
            <Link
              to="/register"
              className="flex-1 text-sm font-bold bg-zinc-900 text-white py-2.5 rounded-full hover:bg-[#f97316] transition-colors text-center block"
            >
              S'inscrire
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

/* ─────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────── */
function Hero({ search, setSearch }: { search: string; setSearch: (v: string) => void }) {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { const t = setTimeout(() => setLoaded(true), 80); return () => clearTimeout(t); }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#fafaf8] pt-16">
      {/* Decorative blobs */}
      <div className="absolute top-24 right-0 w-[520px] h-[520px] bg-gradient-to-br from-orange-100 to-rose-100 rounded-full blur-3xl opacity-60 pointer-events-none -translate-x-1/4 animate-[pulse_8s_ease-in-out_infinite]" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-sky-100 to-cyan-50 rounded-full blur-3xl opacity-50 pointer-events-none animate-[pulse_10s_ease-in-out_infinite_2s]" />

      <div className="relative max-w-6xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-16 items-center w-full">
        {/* Left */}
        <div>
          <div className={`transition-all duration-700 delay-[100ms] ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <span className="inline-flex items-center gap-2 bg-orange-50 border border-orange-100 text-[#f97316] text-xs font-bold px-3.5 py-1.5 rounded-full mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f97316] animate-ping" />
              58 activités disponibles à Tana ce weekend
            </span>
          </div>

          <h1 className={`text-5xl md:text-[3.8rem] font-black text-zinc-900 leading-[1.04] tracking-tight mb-6 transition-all duration-700 delay-[220ms] ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Fini l'ennui à<br />
            <span className="relative whitespace-nowrap">
              <span className="relative z-10">Madagascar.</span>
              <span className="absolute bottom-2 left-0 w-full h-4 bg-[#f97316]/15 -z-0 rounded-sm" />
            </span>
            <br />
            <span className="text-[#f97316]">Bougeons !</span>
          </h1>

          <p className={`text-zinc-500 text-lg leading-relaxed mb-9 max-w-[420px] transition-all duration-700 delay-[340ms] ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Randonnées, concerts, marchés artisanaux, sports nautiques… Trouvez l'activité parfaite partout à Madagascar — Antananarivo, Toamasina, Mahajanga et bien plus.
          </p>

          {/* Search */}
          <div className={`transition-all duration-700 delay-[460ms] ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="flex items-center gap-3 bg-white border border-zinc-200 rounded-2xl px-5 py-3.5 shadow-sm focus-within:border-[#f97316] focus-within:shadow-[0_0_0_4px_rgba(249,115,22,0.08)] transition-all duration-300">
              <svg className="w-4 h-4 text-zinc-400 shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Randonnée, pirogue, marché artisanal..."
                className="flex-1 text-sm text-zinc-800 placeholder-zinc-400 outline-none bg-transparent"
              />
              <button className="text-xs font-bold bg-zinc-900 text-white px-5 py-2 rounded-xl hover:bg-[#f97316] transition-all duration-300 hover:scale-105 active:scale-95 shrink-0">
                Chercher
              </button>
            </div>
            <p className="text-xs text-zinc-400 mt-2.5 pl-1">
              Populaire : <span className="text-zinc-600 font-medium cursor-pointer hover:text-[#f97316] transition-colors">Lémuriens</span>, <span className="text-zinc-600 font-medium cursor-pointer hover:text-[#f97316] transition-colors">Plage Ifaty</span>, <span className="text-zinc-600 font-medium cursor-pointer hover:text-[#f97316] transition-colors">Tsingy de Bemaraha</span>
            </p>
          </div>
        </div>

        {/* Right — stat cards */}
        <div className={`hidden md:grid grid-cols-2 gap-4 transition-all duration-700 delay-[500ms] ${loaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          {stats.map((s, i) => (
            <div
              key={i}
              style={{ transitionDelay: `${500 + i * 80}ms` }}
              className={`rounded-3xl p-6 flex flex-col justify-between min-h-[156px] transition-all duration-500 hover:-translate-y-1 hover:shadow-xl cursor-default ${
                s.dark ? "bg-zinc-900 text-white" :
                s.accent ? "bg-[#f97316] text-white" :
                i === 2 ? "bg-emerald-50" : "bg-zinc-100"
              } ${i === 1 ? "mt-6" : i === 3 ? "mt-0" : ""}`}
            >
              <span className="text-4xl">{s.emoji}</span>
              <div>
                <p className={`text-3xl font-black leading-none ${s.dark || s.accent ? "text-white" : "text-zinc-900"}`}>
                  {s.value}
                </p>
                <p className={`text-sm mt-1 ${s.dark ? "text-zinc-400" : s.accent ? "text-white/80" : "text-zinc-500"}`}>
                  {s.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
   CATEGORIES
───────────────────────────────────────────────────── */
function Categories({ active, setActive }: { active: string; setActive: (v: string) => void }) {
  const { ref, visible } = useInView();
  return (
    <section ref={ref} className="max-w-6xl mx-auto px-6 py-10">
      <div className={`flex items-center justify-between mb-6 transition-all duration-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
        <h2 className="text-xl font-bold text-zinc-900">Filtrer par type</h2>
        <button className="text-sm text-[#f97316] font-semibold hover:underline underline-offset-2">Voir tout</button>
      </div>
      <div className="flex gap-2.5 flex-wrap">
        {["Tous", ...categories.map((c) => c.label)].map((label, i) => {
          const cat = categories.find((c) => c.label === label);
          return (
            <button
              key={label}
              onClick={() => setActive(label)}
              style={{ transitionDelay: visible ? `${i * 50}ms` : "0ms" }}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-300 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              } ${
                active === label
                  ? "bg-zinc-900 text-white border-zinc-900 shadow-md scale-105"
                  : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-800 hover:text-zinc-900 hover:scale-105"
              }`}
            >
              {cat && <span>{cat.icon}</span>}
              {label}
            </button>
          );
        })}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
   FEATURED CARD
───────────────────────────────────────────────────── */
function FeaturedCard({ item, delay = 0 }: { item: typeof featured[0]; delay?: number }) {
  const { ref, visible } = useInView(0.1);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`group bg-white rounded-3xl overflow-hidden border border-zinc-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 cursor-pointer ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      }`}
    >
      {/* Visual */}
      <div className={`bg-gradient-to-br ${item.bg} h-48 flex items-center justify-center relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_25%_25%,white,transparent_60%)]" />
        <span className="text-7xl drop-shadow-lg group-hover:scale-110 transition-transform duration-500 relative z-10">
          {item.emoji}
        </span>
        <span className="absolute top-4 right-4 bg-white/25 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full border border-white/20">
          {item.tag}
        </span>
        {/* Subtle bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/10 to-transparent" />
      </div>

      <div className="p-5">
        <span className="text-xs font-bold text-[#f97316] uppercase tracking-widest">{item.type}</span>
        <h3 className="text-base font-bold text-zinc-900 mt-1.5 mb-3.5 leading-snug group-hover:text-[#f97316] transition-colors duration-300">
          {item.title}
        </h3>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <div className="w-6 h-6 rounded-lg bg-zinc-50 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/>
              </svg>
            </div>
            {item.date} · {item.time}
          </div>
          <div className="flex items-center gap-2 text-xs text-zinc-500">
            <div className="w-6 h-6 rounded-lg bg-zinc-50 flex items-center justify-center shrink-0">
              <svg className="w-3.5 h-3.5 text-zinc-400" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/>
              </svg>
            </div>
            {item.location}
          </div>
        </div>

        <button className="mt-5 w-full text-sm font-bold text-zinc-900 border border-zinc-200 py-2.5 rounded-2xl hover:bg-zinc-900 hover:text-white hover:border-zinc-900 active:scale-[0.98] transition-all duration-300">
          Voir les détails →
        </button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   RECENT ROW
───────────────────────────────────────────────────── */
function RecentRow({ item, delay = 0 }: { item: typeof recent[0]; delay?: number }) {
  const { ref, visible } = useInView(0.05);
  return (
    <div
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`group flex items-center gap-4 p-4 rounded-2xl hover:bg-white hover:shadow-md transition-all duration-300 cursor-pointer border border-transparent hover:border-zinc-100 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
      }`}
    >
      <div className="w-12 h-12 rounded-2xl bg-zinc-100 group-hover:bg-orange-50 flex items-center justify-center text-2xl shrink-0 transition-all duration-300 group-hover:scale-110">
        {item.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-bold text-zinc-900 truncate group-hover:text-[#f97316] transition-colors duration-300">
          {item.title}
        </p>
        <p className="text-xs text-zinc-400 mt-0.5 flex items-center gap-1">
          <span className="text-[0.6rem]">📍</span> {item.location}
        </p>
      </div>
      <div className="text-right shrink-0 hidden sm:block">
        <p className="text-xs font-semibold text-zinc-700">{item.date}</p>
        <p className="text-xs text-zinc-400 mt-0.5">{item.time}</p>
      </div>
      <div className="w-8 h-8 rounded-xl bg-zinc-50 group-hover:bg-[#f97316] flex items-center justify-center shrink-0 transition-all duration-300">
        <svg className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors duration-300" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6"/>
        </svg>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   CTA BANNER
───────────────────────────────────────────────────── */
function CTABanner() {
  const { ref, visible } = useInView();
  return (
    <section ref={ref} className="max-w-6xl mx-auto px-6 py-10">
      <div
        className={`relative bg-zinc-900 rounded-3xl px-8 md:px-14 py-12 overflow-hidden transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}
      >
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-[#f97316] rounded-full opacity-10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-48 h-48 bg-rose-500 rounded-full opacity-5 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div>
            <span className="inline-block text-xs font-bold text-[#f97316] uppercase tracking-widest mb-3">
              ✦ Expérience personnalisée
            </span>
            <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">
              Dites-nous ce que vous aimez.<br />
              <span className="text-[#f97316]">On s'occupe du reste. 🎯</span>
            </h3>
            <p className="text-zinc-400 text-sm mt-3 max-w-sm leading-relaxed">
              Créez votre compte gratuitement pour recevoir des suggestions d'activités 100% adaptées à vos goûts et votre région à Madagascar.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <button className="text-sm font-bold bg-[#f97316] text-white px-8 py-3.5 rounded-2xl hover:bg-[#ea6e10] hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-orange-900/20 whitespace-nowrap">
              Créer mon compte
            </button>
            <button className="text-sm font-medium text-zinc-400 border border-zinc-700 px-8 py-3.5 rounded-2xl hover:border-zinc-400 hover:text-white transition-all duration-300 whitespace-nowrap">
              En savoir plus
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="border-t border-zinc-100 bg-white mt-4">
      <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-1.5">
          <span className="text-base font-black text-zinc-900">Moov</span>
          <span className="text-base font-black text-[#f97316]">.On</span>
          <span className="text-zinc-400 text-sm ml-2">— L'activité parfaite, partout à Madagascar</span>
        </div>
        <div className="flex gap-6 text-sm text-zinc-500">
          {["À propos", "Contact", "CGU", "Confidentialité"].map((l) => (
            <a key={l} href="#" className="hover:text-zinc-900 hover:text-[#f97316] transition-colors">{l}</a>
          ))}
        </div>
        <p className="text-xs text-zinc-400">© 2026 Moov.On · Groupe K</p>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────
   HOME PAGE
───────────────────────────────────────────────────── */
function HomePage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");
  const featuredSection = useInView();
  const recentSection = useInView();

  return (
    <div className="min-h-screen bg-[#fafaf8]">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        * { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
        html { scroll-behavior: smooth; }
      `}</style>

      <NavBar />
      <Hero search={search} setSearch={setSearch} />

      {/* Subtle divider */}
      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      </div>

      <Categories active={activeCategory} setActive={setActiveCategory} />

      <div className="max-w-6xl mx-auto px-6">
        <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
      </div>

      {/* Featured activities */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div
          ref={featuredSection.ref}
          className={`flex items-end justify-between mb-8 transition-all duration-600 ${
            featuredSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div>
            <p className="text-xs font-bold text-[#f97316] uppercase tracking-widest mb-1">✦ Sélection du weekend</p>
            <h2 className="text-2xl font-black text-zinc-900">Activités phares</h2>
            <p className="text-sm text-zinc-400 mt-1">Les meilleures expériences à vivre maintenant</p>
          </div>
          <button className="text-sm font-semibold text-[#f97316] hover:underline underline-offset-2 hidden sm:block">
            Tout voir →
          </button>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((item, i) => (
            <FeaturedCard key={item.id} item={item} delay={i * 120} />
          ))}
        </div>
      </section>

      <CTABanner />

      {/* Recent activities */}
      <section className="max-w-6xl mx-auto px-6 pb-16 pt-4">
        <div
          ref={recentSection.ref}
          className={`flex items-end justify-between mb-6 transition-all duration-600 ${
            recentSection.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          <div>
            <p className="text-xs font-bold text-[#f97316] uppercase tracking-widest mb-1">✦ Fraîchement ajoutées</p>
            <h2 className="text-2xl font-black text-zinc-900">Activités récentes</h2>
            <p className="text-sm text-zinc-400 mt-1">Découvrez les dernières nouveautés sur Moov.On</p>
          </div>
          <button className="text-sm font-semibold text-[#f97316] hover:underline underline-offset-2 hidden sm:block">
            Tout voir →
          </button>
        </div>

        <div className="bg-zinc-50 rounded-3xl p-3 space-y-1">
          {recent.map((item, i) => (
            <RecentRow key={item.id} item={item} delay={i * 80} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

/* ─────────────────────────────────────────────────────
   APP
───────────────────────────────────────────────────── */
export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
}