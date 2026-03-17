import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      role="banner"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ${
        scrolled ? "bg-white/96 backdrop-blur-xl border-b border-stone-100" : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-[68px] flex items-center justify-between">
        {/* Logo */}
        <Link to="/" aria-label="Moov.On — Accueil" className="flex items-baseline gap-0.5 select-none">
          <span className="text-[1.35rem] font-black tracking-tight text-stone-900" style={{ fontFamily: "'DM Serif Display',serif" }}>Moov</span>
          <span className="text-[1.35rem] font-black tracking-tight" style={{ color: "#E8440A", fontFamily: "'DM Serif Display',serif" }}>.On</span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Navigation principale" className="hidden md:flex items-center gap-7">
          {[
            { label: "Explorer", path: "/explorer" },
            { label: "Populaires", path: "/populaires" },
            { label: "Agenda", path: "/agenda" },
            { label: "À propos", path: "/about" },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }: { isActive: boolean }) =>
                `text-[0.875rem] font-medium relative group transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 rounded-sm ${
                  isActive
                    ? "text-stone-900"
                    : "text-stone-500 hover:text-stone-900"
                }`
              }
            >
              {({ isActive }: { isActive: boolean }) => (
                <>
                  {item.label}
                  <span
                    className={`absolute -bottom-0.5 left-0 h-[1.5px] bg-stone-900 transition-all duration-250 rounded-full ${
                      isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-2.5">
          <Link to="/login"
            className="text-[0.875rem] font-semibold text-stone-600 hover:text-stone-900 transition-colors px-4 py-2 rounded-lg hover:bg-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          >Connexion</Link>
          <Link to="/register"
            className="text-[0.875rem] font-bold bg-stone-900 text-white px-5 py-2.5 rounded-xl hover:bg-[#E8440A] transition-all duration-250 hover:scale-105 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2"
          >S'inscrire</Link>
        </div>

        {/* Burger */}
        <button
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
          aria-expanded={open}
          className="md:hidden p-2 text-stone-700 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
          onClick={() => setOpen(!open)}
        >
          <svg width="22" height="16" viewBox="0 0 22 16" fill="none" aria-hidden="true">
            <line x1="0" y1="1" x2="22" y2="1" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              style={{ transformOrigin: "11px 1px", transform: open ? "rotate(45deg) translateY(6px)" : "none", transition: "transform .25s" }} />
            <line x1="0" y1="8" x2="22" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              style={{ opacity: open ? 0 : 1, transition: "opacity .2s" }} />
            <line x1="0" y1="15" x2="22" y2="15" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
              style={{ transformOrigin: "11px 15px", transform: open ? "rotate(-45deg) translateY(-6px)" : "none", transition: "transform .25s" }} />
          </svg>
        </button>
      </div>

      {/* Mobile dropdown */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"}`}
        aria-hidden={!open}
      >
        <div className="px-6 pb-6 pt-3 flex flex-col gap-3 bg-white border-t border-stone-100">
          {[
            { label: "Explorer", path: "/explorer" },
            { label: "Populaires", path: "/populaires" },
            { label: "Agenda", path: "/agenda" },
            { label: "À propos", path: "/about" },
          ].map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }: { isActive: boolean }) =>
                `text-[0.9rem] font-medium py-1.5 border-b border-stone-50 ${
                  isActive
                    ? "text-stone-900 border-stone-900"
                    : "text-stone-600"
                }`
              }
              onClick={() => setOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <div className="flex gap-2.5 pt-2">
            <Link to="/login" className="flex-1 text-[0.875rem] font-semibold border border-stone-200 text-stone-700 py-2.5 rounded-xl text-center hover:border-stone-800 transition-colors" onClick={() => setOpen(false)}>Connexion</Link>
            <Link to="/register" className="flex-1 text-[0.875rem] font-bold bg-stone-900 text-white py-2.5 rounded-xl text-center hover:bg-[#E8440A] transition-colors" onClick={() => setOpen(false)}>S'inscrire</Link>
          </div>
        </div>
      </div>
    </header>
  );
}