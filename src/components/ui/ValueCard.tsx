import type { Value } from "../../types/about-types";
import { useInView } from "../../hooks/useInView";

type Props = {
  value: Value;
  delay?: number;
};

export function ValueCard({ value, delay = 0 }: Props) {
  const { ref, visible } = useInView(0.08);

  return (
    <article
      ref={ref}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
      className={`group bg-white rounded-2xl p-7 border border-stone-100 
      hover:shadow-lg hover:-translate-y-1 transition-all duration-300
      ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
    >
      <div className="flex items-start justify-between mb-5">
        <span className="text-xs font-black tracking-widest text-stone-300">
          {value.number}
        </span>

        <span className="text-2xl">{value.emoji}</span>
      </div>

      <h3 className="text-lg font-bold text-stone-900 group-hover:text-orange-500 transition-colors">
        {value.title}
      </h3>

      <p className="text-sm text-stone-500 mt-2 leading-relaxed">
        {value.description}
      </p>
    </article>
  );
}
