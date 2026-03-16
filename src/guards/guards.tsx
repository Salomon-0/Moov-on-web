import { Navigate, Outlet } from "react-router-dom";

/**
 * Vérifie si l'utilisateur est authentifié.
 * À remplacer par ton vrai système (contexte, Zustand, token…) quand tu ajouteras l'auth.
 */
function useAuth(): boolean {
  return Boolean(localStorage.getItem("token"));
}

/**
 * GuestRoute — redirige vers "/" si l'utilisateur est déjà connecté.
 * Utilisé pour les pages login/register.
 */
export function GuestRoute() {
  const isAuthenticated = useAuth();
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
}

/**
 * ProtectedRoute — redirige vers "/login" si l'utilisateur n'est pas connecté.
 * Décommenter et utiliser pour les routes privées (dashboard, etc.).
 */
export function ProtectedRoute() {
  const isAuthenticated = useAuth();
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
}
