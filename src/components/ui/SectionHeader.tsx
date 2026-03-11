import { forwardRef } from "react";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  description?: string;
  linkLabel?: string;
  linkHref?: string;
  id?: string;
  visible?: boolean;
}

const SectionHeader = forwardRef<HTMLElement, SectionHeaderProps>(
  (
    {
      eyebrow,
      title,
      description,
      linkLabel,
      linkHref = "#",
      id,
      visible = true,
    },
    ref
  ) => (
    <header
      ref={ref as React.Ref<HTMLElement>}
      className={`flex items-end justify-between mb-8 transition-all duration-500 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
      }`}
    >
      <div>
        <p className="text-[0.75rem] font-bold text-[#E8440A] tracking-[0.14em] uppercase mb-1">
          {eyebrow}
        </p>
        <h2
          id={id}
          style={{ fontFamily: "'DM Serif Display',serif" }}
          className="text-[1.75rem] text-stone-900 leading-tight"
        >
          {title}
        </h2>
        {description && (
          <p className="text-[0.83rem] text-stone-400 mt-1">{description}</p>
        )}
      </div>
      {linkLabel && (
        <a
          href={linkHref}
          className="text-[0.84rem] font-semibold text-[#E8440A] hover:underline underline-offset-2 hidden sm:block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 rounded-sm"
        >
          {linkLabel}
        </a>
      )}
    </header>
  )
);

SectionHeader.displayName = "SectionHeader";

export default SectionHeader;
