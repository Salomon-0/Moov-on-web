import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import HomePage from "./pages/HomePage";
import { GuestRoute } from "./guards/guards";

const LoginPage = lazy(() => import("./pages/auth/login"));
const RegisterPage = lazy(() => import("./pages/auth/register"));

function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-50" aria-label="Chargement">
      <div className="w-8 h-8 border-2 border-[#E8440A] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
}