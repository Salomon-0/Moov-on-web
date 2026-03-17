// Moov-on — Explorer page
import { useState } from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { NavBar, Footer } from "../components";

// Named export for lazy loading
export const Explorer = ExplorerPage;

export default function ExplorerPage() {
  const { state } = useGlobalContext();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("Tous");

  // Filter items based on search and type
  const filteredItems = state.items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "Tous" || item.type === filterType;
    return matchesSearch && matchesType;
  });

  // Get unique types for filter dropdown
  const types = ["Tous", ...new Set(state.items.map(item => item.type))];

  return (
    <div className="min-h-screen bg-stone-50">
      <NavBar />

      <main className="pt-24 pb-16 px-6 max-w-6xl mx-auto">
        {/* Page Header */}
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-stone-900 mb-4" style={{ fontFamily: "'DM Serif Display',serif" }}>
            Explorer les activités
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl">
            Découvrez toutes les expériences disponibles à Madagascar. Utilisez les filtres pour affiner votre recherche.
          </p>
        </section>

        {/* Search and Filters */}
        <section className="mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
            {/* Search Input */}
            <div className="flex-1 relative">
              <input
                type="search"
                placeholder="Rechercher une activité..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full px-5 py-3.5 rounded-2xl border border-stone-200 focus:border-stone-900 focus:shadow-[0_0_0_3px_rgba(28,25,23,0.06)] transition-all duration-250 bg-white"
              />
              <svg aria-hidden="true" className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z" />
              </svg>
            </div>
            {/* Type Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {types.map(type => (
                <button
                  key={type}
                  onClick={() => setFilterType(type)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
                    filterType === type
                      ? "bg-stone-900 text-white"
                      : "bg-white text-stone-600 border border-stone-200 hover:border-stone-400"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Results Grid */}
        <section aria-label="Liste des activités">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              Aucune activité trouvée. Essayez une autre recherche.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredItems.map(item => (
                <article
                  key={item.id}
                  className="bg-white rounded-2xl p-6 border border-stone-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-bold px-2 py-1 rounded-md bg-stone-100 text-stone-600">
                      {item.type}
                    </span>
                    <span className="text-xs text-stone-400">
                      Popularité: {item.popularity}%
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 mb-2">{item.title}</h3>
                  <p className="text-sm text-stone-500 line-clamp-2">
                    Description placeholder pour {item.title}. Une activité à découvrir à Madagascar.
                  </p>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}