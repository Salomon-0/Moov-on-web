// Moov-on — About page
import { NavBar, Footer } from "../components";

export const About = AboutPage;

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      <NavBar />

      <main className="pt-24 pb-16 px-6 max-w-6xl mx-auto">
        {/* Hero Section */}
        <section className="mb-20 text-center">
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-stone-900 mb-6" style={{ fontFamily: "'DM Serif Display',serif" }}>
            À propos de Moov.On
          </h1>
          <p className="text-lg md:text-xl text-stone-600 max-w-3xl mx-auto leading-relaxed">
            Moov.On est la plateforme qui connecte les voyageurs aux expériences authentiques à Madagascar.
            Notre mission est de rendre chaque activité accessible, simple et mémorable.
          </p>
        </section>

        {/* Mission Section */}
        <section className="mb-20">
          <div className="bg-white rounded-3xl p-8 md:p-12 border border-stone-100 shadow-sm">
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-6" style={{ fontFamily: "'DM Serif Display',serif" }}>
              Notre mission
            </h2>
            <p className="text-stone-600 leading-relaxed mb-6">
              Nous croyons que chaque coin de Madagascar recèle des trésors à découvrir. Que vous soyez local ou visiteur,
              Moov.On vous guide vers les meilleures activités : randonnées, marchés artisanaux, festivals culturels,
              sports nautiques et bien plus encore.
            </p>
            <p className="text-stone-600 leading-relaxed">
              Notre équipe travaille chaque jour pour enrichir notre catalogue et garantir une expérience fluide,
              du premier clic à la réalisation de votre activité favorite.
            </p>
          </div>
        </section>

        {/* Team placeholder */}
        <section className="mb-20">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-8 text-center" style={{ fontFamily: "'DM Serif Display',serif" }}>
            Notre équipe
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Salomon LARY", role: "Équipe fondatrice", initials: "GK", color: "#E8440A" },
              { name: "Yass Kenny", role: "UI / UX", initials: "DS", color: "#0A7BE8" },
              { name: "Lapasoa ", role: "Frontend & Backend", initials: "IG", color: "#059669" },
              { name: "Barris", role: "Activités & Éditorial", initials: "CN", color: "#6B21A8" },
            ].map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-2xl p-6 border border-stone-100 text-center hover:shadow-md transition-shadow"
              >
                <div
                  className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white font-bold text-lg"
                  style={{ backgroundColor: member.color }}
                >
                  {member.initials}
                </div>
                <h3 className="font-bold text-stone-900">{member.name}</h3>
                <p className="text-sm text-stone-500">{member.role}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section className="text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-stone-900 mb-4" style={{ fontFamily: "'DM Serif Display',serif" }}>
            Contactez-nous
          </h2>
          <p className="text-stone-600 mb-6 max-w-xl mx-auto">
            Une question, une suggestion ? N'hésitez pas à nous écrire.
          </p>
          <a
            href="mailto:contact@moov.on"
            className="inline-flex items-center gap-2 bg-stone-900 text-white font-bold px-6 py-3 rounded-xl hover:bg-[#E8440A] transition-colors"
          >
            <svg aria-hidden="true" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
            contact@moov.on
          </a>
        </section>
      </main>

      <Footer />
    </div>
  );
}