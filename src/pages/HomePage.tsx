import { useState } from "react";

import {
  NavBar,
  Hero,
  Categories,
  FeaturedCard,
  RecentRow,
  CTABanner,
  Footer,
  SectionHeader,
  SectionDivider,
} from "../components";
import type { FeaturedItem, RecentItem } from "../components";
import { useInView } from "../hooks/useInView";

/* ─────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────── */
const featured: FeaturedItem[] = [
  { id: 1, title: "Randonnée au Tsaranoro",                        type: "Nature",     date: "Sam 15 Mars", time: "06h00", location: "Ambalavao, Fianarantsoa",    tag: "Tendance",  color: "#E8440A", emoji: "🏔️" },
  { id: 2, title: "Balade en pirogue sur le Canal des Pangalanes", type: "En famille", date: "Dim 16 Mars", time: "08h30", location: "Toamasina",                  tag: "Populaire", color: "#0A7BE8", emoji: "🚣" },
  { id: 3, title: "Soirée culture Merina — musique & danse",       type: "Culture",    date: "Ven 14 Mars", time: "19h00", location: "Antananarivo, Haute-Ville",  tag: "Nouveau",   color: "#6B21A8", emoji: "🎶" },
];

const recent: RecentItem[] = [
  { id: 4, title: "Surf à Anakao",             type: "Solo",       date: "Mar 11 Mars", time: "07h00", location: "Toliara",             emoji: "🏄"  },
  { id: 5, title: "Marché artisanal Zoma",      type: "En couple",  date: "Jeu 13 Mars", time: "09h00", location: "Antananarivo",         emoji: "🛍️" },
  { id: 6, title: "Observation des lémuriens",  type: "En famille", date: "Sam 15 Mars", time: "07h30", location: "Parc Andasibe",        emoji: "🐒"  },
  { id: 7, title: "Concert sous les étoiles",   type: "Entre amis", date: "Ven 14 Mars", time: "20h00", location: "Mahajanga, front mer", emoji: "🎸"  },
];

/* ─────────────────────────────────────────────────────
   PAGE
───────────────────────────────────────────────────── */
export default function HomePage() {
  const [search, setSearch]               = useState("");
  const [activeCategory, setActiveCategory] = useState("Tous");
  const featuredSection = useInView();
  const recentSection   = useInView();

  return (
    <div className="min-h-screen bg-stone-50">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { font-family: 'DM Sans', system-ui, sans-serif; box-sizing: border-box; }
        html { scroll-behavior: smooth; }
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
        @keyframes float {
          0%,100% { transform: translateX(25%) translateY(-2%); }
          50%      { transform: translateX(25%) translateY(2%);  }
        }
        ::selection { background: #E8440A22; }
        :focus-visible { outline: 2px solid #E8440A; outline-offset: 2px; border-radius: 4px; }
      `}</style>

      <NavBar />

      <Hero search={search} setSearch={setSearch} />

      <SectionDivider />

      <Categories active={activeCategory} setActive={setActiveCategory} />

      <SectionDivider />

      {/* Featured activities */}
      <section aria-labelledby="featured-heading" className="max-w-6xl mx-auto px-6 py-12">
        <SectionHeader
          ref={featuredSection.ref as React.RefObject<HTMLElement>}
          eyebrow="✦ Sélection du weekend"
          title="Activités phares"
          description="Les meilleures expériences à vivre maintenant"
          linkLabel="Tout voir →"
          id="featured-heading"
          // eslint-disable-next-line react-hooks/refs
          visible={featuredSection.visible}
        />
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {featured.map((item, i) => (
            <FeaturedCard key={item.id} item={item} delay={i * 100} />
          ))}
        </div>
      </section>

      <CTABanner />

      {/* Recent activities */}
      <section aria-labelledby="recent-heading" className="max-w-6xl mx-auto px-6 pb-16 pt-4">
        <SectionHeader
          ref={recentSection.ref as React.RefObject<HTMLElement>}
          eyebrow="✦ Fraîchement ajoutées"
          title="Activités récentes"
          description="Découvrez les dernières nouveautés sur Moov.On"
          linkLabel="Tout voir →"
          id="recent-heading"
          // eslint-disable-next-line react-hooks/refs
          visible={recentSection.visible}
        />
        <div className="rounded-2xl p-2.5 space-y-0.5" style={{ background: "#F5F4F2" }}>
          {recent.map((item, i) => (
            <RecentRow key={item.id} item={item} delay={i * 60} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}