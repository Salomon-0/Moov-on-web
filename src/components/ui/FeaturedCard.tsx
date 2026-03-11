import { memo } from "react";

import { useInView } from "../../hooks/useInView";

export interface FeaturedItem {
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  tag: string;
  color: string;
  emoji: string;
}

interface FeaturedCardProps {
  item: FeaturedItem;
  delay?: number;
}

function FeaturedCard({ item, delay = 0 }: FeaturedCardProps) {
  const { ref, visible } = useInView(0.08);
  return (
    <article
      ref={ref as React.RefObject<HTMLElement>}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms", boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
      className={`group bg-white rounded-2xl overflow-hidden border border-stone-150 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-400 cursor-pointer focus-within:ring-2 focus-within:ring-orange-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      {/* Visual band */}
      <div
        className="h-44 flex items-center justify-center relative overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${item.color}18 0%, ${item.color}30 100%)`, borderBottom: `1px solid ${item.color}20` }}
        aria-hidden="true"
      >
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: `radial-gradient(circle at 30% 30%, ${item.color} 1px, transparent 1px), radial-gradient(circle at 70% 70%, ${item.color} 1px, transparent 1px)`, backgroundSize: "28px 28px" }}
        />
        <span className="text-6xl relative z-10 group-hover:scale-110 transition-transform duration-400 drop-shadow">{item.emoji}</span>
        <span
          className="absolute top-3.5 right-3.5 text-[0.72rem] font-bold px-2.5 py-1 rounded-lg"
          style={{ background: `${item.color}15`, color: item.color, border: `1px solid ${item.color}25` }}
        >{item.tag}</span>
      </div>

      <div className="p-5">
        <p className="text-[0.72rem] font-bold tracking-[0.12em] uppercase mb-1.5" style={{ color: item.color }}>{item.type}</p>
        <h3 className="text-[0.98rem] font-bold text-stone-900 leading-snug mb-4 group-hover:text-[#E8440A] transition-colors duration-250">
          {item.title}
        </h3>

        <div className="space-y-1.5 text-[0.8rem] text-stone-500">
          <p className="flex items-center gap-2">
            <span aria-hidden="true" className="text-[0.7rem]">📅</span>
            <time>{item.date}</time>
            <span aria-hidden="true">·</span>
            <span>{item.time}</span>
          </p>
          <p className="flex items-center gap-2">
            <span aria-hidden="true" className="text-[0.7rem]">📍</span>
            <span>{item.location}</span>
          </p>
        </div>

        <a
          href="#"
          aria-label={`Voir les détails de ${item.title}`}
          className="mt-5 block text-center text-[0.84rem] font-bold text-stone-800 border border-stone-200 py-2.5 rounded-xl hover:bg-stone-900 hover:text-white hover:border-stone-900 active:scale-[0.98] transition-all duration-250 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
        >
          Voir les détails
        </a>
      </div>
    </article>
  );
}

export default memo(FeaturedCard);