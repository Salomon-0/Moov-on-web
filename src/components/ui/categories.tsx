import { useInView } from "../../hooks/useInView";

const categories = [
  { icon: "👨‍👩‍👧", label: "En famille" },
  { icon: "💑",    label: "En couple"  },
  { icon: "🎉",    label: "Entre amis" },
  { icon: "🧘",    label: "Solo"       },
  { icon: "🏕️",   label: "Nature"     },
  { icon: "🎨",    label: "Culture"    },
];

interface CategoriesProps {
  active: string;
  setActive: (v: string) => void;
}

export default function Categories({ active, setActive }: CategoriesProps) {
  const { ref, visible } = useInView(0.12);
  return (
    <section ref={ref as React.RefObject<HTMLElement>} aria-label="Filtres par catégorie" className="max-w-6xl mx-auto px-6 py-10">
      <div className={`flex items-center justify-between mb-5 transition-all duration-500 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
        <h2 className="text-[0.8rem] font-bold text-stone-400 tracking-[0.14em] uppercase">Filtrer par type</h2>
        <button className="text-[0.82rem] font-semibold text-[#E8440A] hover:underline underline-offset-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-sm">
          Voir tout
        </button>
      </div>
      <div role="group" aria-label="Catégories" className="flex gap-2 flex-wrap">
        {["Tous", ...categories.map((c) => c.label)].map((label, i) => {
          const cat = categories.find((c) => c.label === label);
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => setActive(label)}
              aria-pressed={isActive}
              style={{ transitionDelay: visible ? `${i * 40}ms` : "0ms" }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[0.84rem] font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 ${
                visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
              } ${isActive
                ? "bg-stone-900 text-white shadow-sm"
                : "bg-white text-stone-600 border border-stone-200 hover:border-stone-800 hover:text-stone-900"
              }`}
            >
              {cat && <span aria-hidden="true">{cat.icon}</span>}
              {label}
            </button>
          );
        })}
      </div>
    </section>
  );
}