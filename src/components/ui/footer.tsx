export default function Footer() {
  return (
    <footer role="contentinfo" className="border-t border-stone-100 bg-white mt-4">
      <div className="max-w-6xl mx-auto px-6 py-9 flex flex-col md:flex-row items-center justify-between gap-5">
        {/* Brand */}
        <div className="flex items-baseline gap-0.5">
          <span className="font-black text-stone-900" style={{ fontFamily: "'DM Serif Display',serif" }}>Moov</span>
          <span className="font-black" style={{ color: "#E8440A", fontFamily: "'DM Serif Display',serif" }}>.On</span>
          <span className="text-stone-400 text-[0.82rem] ml-2.5">— L'activité parfaite, partout à Madagascar</span>
        </div>

        {/* Links */}
        <nav aria-label="Liens secondaires" className="flex gap-6 text-[0.82rem] text-stone-400">
          {["À propos", "Contact", "CGU", "Confidentialité"].map((l) => (
            <a
              key={l}
              href="#"
              className="hover:text-stone-900 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-sm"
            >
              {l}
            </a>
          ))}
        </nav>

        <p className="text-[0.76rem] text-stone-400">© 2026 Moov.On · Groupe K</p>
      </div>
    </footer>
  );
}