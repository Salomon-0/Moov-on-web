import { memo } from "react";

import { useInView } from "../../hooks/useInView";

export interface RecentItem {
  id: number;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  emoji: string;
}

interface RecentRowProps {
  item: RecentItem;
  delay?: number;
}

function RecentRow({ item, delay = 0 }: RecentRowProps) {
  const { ref, visible } = useInView(0.04);
  return (
    <a
      href="#"
      ref={ref as React.RefObject<HTMLAnchorElement>}
      aria-label={`${item.title} — ${item.location}, ${item.date} à ${item.time}`}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`group flex items-center gap-4 p-4 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-250 border border-transparent hover:border-stone-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 ${
        visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-3"
      }`}
    >
      <div aria-hidden="true" className="w-11 h-11 rounded-xl bg-stone-100 group-hover:bg-orange-50 flex items-center justify-center text-xl shrink-0 transition-all duration-250 group-hover:scale-110">
        {item.emoji}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[0.9rem] font-semibold text-stone-900 truncate group-hover:text-[#E8440A] transition-colors duration-250">{item.title}</p>
        <p className="text-[0.78rem] text-stone-400 mt-0.5">{item.location}</p>
      </div>
      <div className="text-right shrink-0 hidden sm:block">
        <p className="text-[0.8rem] font-semibold text-stone-700">{item.date}</p>
        <p className="text-[0.76rem] text-stone-400 mt-0.5">{item.time}</p>
      </div>
      <div aria-hidden="true" className="w-8 h-8 rounded-lg bg-stone-100 group-hover:bg-[#E8440A] flex items-center justify-center shrink-0 transition-all duration-250">
        <svg className="w-3.5 h-3.5 text-stone-400 group-hover:text-white transition-colors duration-250" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 18l6-6-6-6" />
        </svg>
      </div>
    </a>
  );
}

export default memo(RecentRow);