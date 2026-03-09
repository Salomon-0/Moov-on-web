
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

function footer() {
  return (
    <footer className="bg-[#0d0d0d] text-[#f5f0e8] min-h-screen overflow-x-hidden">
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
  )
}

export default footer   