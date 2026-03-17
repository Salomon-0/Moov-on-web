// Moov-on — Populaires page
import { useGlobalContext } from "../context/GlobalContext";
import { NavBar, Footer } from "../components";

export const Populaires = PopulairesPage;

export default function PopulairesPage() {
  const { state } = useGlobalContext();

  // Popular items are already sorted by popularity (descending)
  const popularItems = state.popularItems.length > 0 ? state.popularItems : state.items;

  return (
    <div className="min-h-screen bg-stone-50">
      <NavBar />

      <main className="pt-24 pb-16 px-6 max-w-6xl mx-auto">
        {/* Page Header */}
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-stone-900 mb-4" style={{ fontFamily: "'DM Serif Display',serif" }}>
            Activités populaires
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl">
            Les expériences les plus appréciées par notre communauté. Découvrez ce qui plaît aux voyageurs.
          </p>
        </section>

        {/* Popular Items List */}
        <section aria-label="Liste des activités populaires">
          {popularItems.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              Aucune activité populaire pour le moment.
            </div>
          ) : (
            <div className="space-y-4">
              {popularItems.map((item, index) => (
                <article
                  key={item.id}
                  className="bg-white rounded-2xl p-6 border border-stone-100 hover:shadow-lg transition-all duration-300 flex items-center gap-6"
                >
                  {/* Rank Badge */}
                  <div className="flex flex-col items-center justify-center w-12 h-12 rounded-full bg-stone-900 text-white font-bold text-lg shrink-0">
                    {index + 1}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-bold px-2 py-1 rounded-md bg-stone-100 text-stone-600">
                        {item.type}
                      </span>
                      <span className="text-xs text-stone-400">
                        Popularité: {item.popularity}%
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-stone-900">{item.title}</h3>
                    <p className="text-sm text-stone-500 mt-1">
                      Description placeholder pour {item.title}.
                    </p>
                  </div>

                  {/* Arrow indicator */}
                  <svg aria-hidden="true" className="w-5 h-5 text-stone-400 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
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