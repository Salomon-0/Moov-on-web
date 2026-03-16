import type { Value, TeamMember, Stat } from "../types/about-types";

export const values: Value[] = [
  {
    number: "01",
    title: "Accessibilité",
    description:
      "Chaque activité mérite d'être découverte partout à Madagascar.",
    emoji: "🗺️",
  },
  {
    number: "02",
    title: "Authenticité",
    description:
      "Des expériences locales pour découvrir la vraie culture malgache.",
    emoji: "🌿",
  },
  {
    number: "03",
    title: "Communauté",
    description:
      "Moov.On est bâti par et pour les Malgaches.",
    emoji: "🤝",
  },
  {
    number: "04",
    title: "Simplicité",
    description:
      "Trouver quoi faire ne doit jamais être compliqué.",
    emoji: "⚡",
  },
];

export const team: TeamMember[] = [
  { name: "Groupe K", role: "Équipe fondatrice", initials: "GK", color: "#E8440A" },
  { name: "Design", role: "UI / UX", initials: "DS", color: "#0A7BE8" },
  { name: "Ingénierie", role: "Frontend & Backend", initials: "IG", color: "#059669" },
  { name: "Contenu", role: "Activités & Éditorial", initials: "CN", color: "#6B21A8" },
];

export const stats: Stat[] = [
  { value: "2026", label: "Année de création", suffix: "" },
  { value: "350", label: "Activités listées", suffix: "+" },
  { value: "22", label: "Villes couvertes", suffix: "" },
  { value: "8", label: "Utilisateurs", suffix: "k+" },
];
