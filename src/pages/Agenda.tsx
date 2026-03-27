// Moov-on — Agenda page
import { useGlobalContext } from "../context/GlobalContext";
import { NavBar, Footer } from "../components";

export const Agenda = AgendaPage;

export default function AgendaPage() {
  const { state } = useGlobalContext();
  const events = state.events;

  // Helper to format date (simple)
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("fr-FR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <NavBar />

      <main className="pt-24 pb-16 px-6 max-w-6xl mx-auto">
        {/* Page Header */}
        <section className="mb-12">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-stone-900 mb-4" style={{ fontFamily: "'DM Serif Display',serif" }}>
            Agenda des événements
          </h1>
          <p className="text-lg text-stone-600 max-w-2xl">
            Les événements à venir près de vous. Planifiez vos sorties et ne manquez rien de ce qui se passe.
          </p>
        </section>

        {/* Events List */}
        <section aria-label="Liste des événements">
          {events.length === 0 ? (
            <div className="text-center py-12 text-stone-500">
              <p className="mb-2">Aucun événement prévu pour le moment.</p>
              <p className="text-sm">Revenez plus tard pour découvrir les nouvelles activités.</p>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-6">
              {events.map(event => (
                <article
                  key={event.id}
                  className="bg-white rounded-2xl p-6 border border-stone-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    {/* Date Badge */}
                    <div className="flex flex-col items-center justify-center w-16 h-16 rounded-xl bg-stone-900 text-white shrink-0">
                      <span className="text-xs font-bold uppercase">{new Date(event.date).toLocaleDateString("fr-FR", { month: "short" })}</span>
                      <span className="text-2xl font-black leading-none">{new Date(event.date).getDate()}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-stone-900 mb-1">{event.title}</h3>
                      <p className="text-sm text-stone-500 mb-2">{formatDate(event.date)}</p>
                      <p className="text-sm text-stone-600 flex items-center gap-1">
                        <svg aria-hidden="true" className="w-4 h-4 text-stone-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </p>
                      <p className="text-sm text-stone-500 mt-3">{event.description}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>

        {/* Call to action */}
        <section className="mt-12 text-center">
          <a
            href="#"
            className="inline-flex items-center gap-2 text-stone-600 hover:text-stone-900 font-medium"
          >
            Voir tous les événements
            <svg aria-hidden="true" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}