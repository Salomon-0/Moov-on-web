// Moov-on — GlobalContext
import { createContext, useContext, useReducer, type ReactNode } from "react";

// Define types for our state
interface Event {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
}

interface Item {
  id: number;
  title: string;
  type: string;
  popularity: number;
}

interface AppState {
  user: { name: string; isLoggedIn: boolean } | null;
  theme: "light" | "dark";
  language: string;
  events: Event[];
  items: Item[];
  popularItems: Item[];
}

type Action =
  | { type: "SET_USER"; payload: { name: string; isLoggedIn: boolean } | null }
  | { type: "TOGGLE_THEME" }
  | { type: "SET_LANGUAGE"; payload: string }
  | { type: "ADD_EVENT"; payload: Event }
  | { type: "SET_EVENTS"; payload: Event[] }
  | { type: "SET_ITEMS"; payload: Item[] };

const initialState: AppState = {
  user: null,
  theme: "light",
  language: "fr",
  events: [
    { id: 1, title: "Festival des arts traditionnels", date: "2026-04-15", location: "Antananarivo", description: "Célébration de la culture malgache" },
    { id: 2, title: "Marché aux poissons de Mahajanga", date: "2026-04-20", location: "Mahajanga", description: "Découvrez les spécialités locales" },
  ],
  items: [
    { id: 1, title: "Randonnée au Tsaranoro", type: "Nature", popularity: 95 },
    { id: 2, title: "Balade en pirogue", type: "En famille", popularity: 88 },
    { id: 3, title: "Soirée culture Merina", type: "Culture", popularity: 76 },
  ],
  popularItems: [
    { id: 1, title: "Randonnée au Tsaranoro", type: "Nature", popularity: 95 },
    { id: 2, title: "Balade en pirogue", type: "En famille", popularity: 88 },
    { id: 3, title: "Soirée culture Merina", type: "Culture", popularity: 76 },
  ].sort((a, b) => b.popularity - a.popularity),
};

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "SET_USER":
      return { ...state, user: action.payload };
    case "TOGGLE_THEME":
      return { ...state, theme: state.theme === "light" ? "dark" : "light" };
    case "SET_LANGUAGE":
      return { ...state, language: action.payload };
    case "ADD_EVENT":
      return { ...state, events: [...state.events, action.payload] };
    case "SET_EVENTS":
      return { ...state, events: action.payload };
    case "SET_ITEMS": {
      const items = action.payload;
      const popular = [...items].sort((a, b) => b.popularity - a.popularity);
      return { ...state, items, popularItems: popular };
    }
    default:
      return state;
  }
}

interface GlobalContextType {
  state: AppState;
  dispatch: React.Dispatch<Action>;
}

const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

export function GlobalProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  // Compute popular items on mount (if not already)
  // This is a simple demo; in real app, you'd compute based on some metric
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }
  return context;
}