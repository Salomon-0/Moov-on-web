# Moov.On — Frontend React

> **L'activité parfaite, partout à Madagascar.**  
> Application web permettant aux utilisateurs de découvrir, rechercher et s'inscrire à des activités (randonnées, concerts, marchés, sports nautiques…) à travers toute l'île.

---

## Aperçu

Moov.On est une interface moderne construite avec **React + TypeScript**, stylée avec **Tailwind CSS** et animée via des transitions CSS natives. Le design suit une direction **éditorial minimaliste** : typographie forte, palette sobre (stone + orange brûlé `#E8440A`), animations subtiles et accessibilité WCAG intégrée.

---

## Stack technique

| Technologie       | Rôle                              |
|-------------------|-----------------------------------|
| React 18          | UI framework                      |
| TypeScript        | Typage statique                   |
| React Router v6   | Routing SPA                       |
| Tailwind CSS      | Styles utilitaires                |
| DM Serif Display  | Police d'affichage (titres)       |
| DM Sans           | Police de corps (texte courant)   |

---

## Structure du projet

```
src/
├── index.tsx                   # Point d'entrée — monte BrowserRouter + App
├── App.tsx                     # Routing : routes publiques, invité, privées
│
├── pages/
│   ├── HomePage.tsx            # Page d'accueil (assemble les composants)
│   └── auth/
│       ├── login.tsx           # Page de connexion
│       └── register.tsx        # Page d'inscription
│
└── components/
    ├── NavBar.tsx              # Barre de navigation fixe avec menu mobile
    ├── Hero.tsx                # Section héro avec barre de recherche et stats
    ├── Categories.tsx          # Filtres par type d'activité
    ├── FeaturedCard.tsx        # Carte d'activité mise en avant
    ├── RecentRow.tsx           # Ligne d'activité récente
    ├── CTABanner.tsx           # Bannière d'appel à l'action (inscription)
    └── Footer.tsx              # Pied de page
```

---

## Installation

### Prérequis

- Node.js ≥ 18
- npm ≥ 9 ou yarn

### Lancer le projet

```bash
# 1. Cloner le dépôt
git clone https://github.com/Salomon-0/Moov-on-web.git
cd moovon-frontend

# 2. Installer les dépendances
npm install

# 3. Démarrer le serveur de développement
npm run dev
```

L'application sera disponible sur [http://localhost:5173](http://localhost:5173) (Vite) ou [http://localhost:3000](http://localhost:3000) (CRA).

### Build de production

```bash
npm run build
```

---

## Routing

Le routing est géré dans `App.tsx` avec **React Router v6**.

| Route        | Composant       | Accès          |
|--------------|-----------------|----------------|
| `/`          | `HomePage`      | Public         |
| `/login`     | `LoginPage`     | Invité seul    |
| `/register`  | `RegisterPage`  | Invité seul    |
| `/*`         | Redirect `/`    | Fallback 404   |

**Guards disponibles :**

- `GuestRoute` — redirige vers `/` si l'utilisateur est déjà connecté.
- `ProtectedRoute` *(commenté, prêt à activer)* — redirige vers `/login` si l'utilisateur n'est pas authentifié.

Pour activer l'authentification, remplacer la fonction `useAuth()` dans `App.tsx` :

```ts
// Avant (placeholder)
function useAuth(): boolean {
  return Boolean(localStorage.getItem("token"));
}

// Après (exemple avec un contexte React)
function useAuth(): boolean {
  const { user } = useContext(AuthContext);
  return Boolean(user);
}
```

---

## Composants

### `NavBar`
Barre de navigation fixe. Devient opaque au scroll. Inclut un menu burger animé pour mobile. Utilise `<Link>` React Router pour la navigation interne.

### `Hero`
Section principale avec animation d'entrée en cascade (stagger). Contient la barre de recherche, les suggestions rapides et une bande de statistiques (`350+ activités`, `4.9★`, `8k+ utilisateurs`, `22 villes`).

### `Categories`
Filtres interactifs par type d'activité (`Tous`, `En famille`, `En couple`, etc.). Les boutons utilisent `aria-pressed` pour l'accessibilité.

### `FeaturedCard`
Carte d'activité mise en avant. Accepte les props typées `FeaturedItem`. Animation d'apparition au scroll via `IntersectionObserver`.

### `RecentRow`
Ligne compacte pour les activités récentes. Animation de glissement depuis la gauche au scroll.

### `CTABanner`
Bannière sombre avec appel à l'action vers `/register`. Inclut un fond avec texture grille et lueur orange.

### `Footer`
Pied de page simple avec logo, liens secondaires et copyright.

---

## Accessibilité

- Tous les éléments interactifs ont des attributs `aria-label`, `aria-pressed`, ou `aria-expanded`
- Les images et éléments décoratifs ont `aria-hidden="true"`
- Les stats sont balisées avec `<dl>` / `<dt>` / `<dd>`
- `prefers-reduced-motion` respecté via media query CSS
- Navigation entièrement utilisable au clavier (`focus-visible` avec ring orange)

---

## Données

Les données (`featured[]`, `recent[]`) sont actuellement définies statiquement dans `pages/HomePage.tsx`. Pour les connecter à une API :

1. Créer un dossier `src/services/` avec les appels HTTP (fetch / axios).
2. Remplacer les tableaux statiques par des appels `useEffect` + `useState` ou un outil comme **React Query**.

---

## Variables de style

Les couleurs principales sont définies en inline styles pour les valeurs custom :

| Variable         | Valeur      | Usage                        |
|------------------|-------------|------------------------------|
| Accent principal | `#E8440A`   | Orange brûlé — CTA, accents  |
| Fond             | `stone-50`  | Arrière-plan général         |
| Texte principal  | `#1C1917`   | Titres                       |
| Texte secondaire | `stone-400` | Descriptions, métadonnées    |

---

## Équipe

Projet réalisé par le **Groupe K**.

---

## Licence

Usage interne — tous droits réservés © 2026 Moov.On.