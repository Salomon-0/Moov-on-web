import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ── Icon helpers ── */
const EyeIcon = ({ open }: { open: boolean }) =>
  open ? (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
      <circle cx="12" cy="12" r="3"/>
    </svg>
  ) : (
    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24M1 1l22 22"/>
    </svg>
  );

const MailIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
    <polyline points="22,6 12,13 2,6"/>
  </svg>
);

const LockIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M7 11V7a5 5 0 0 1 10 0v4"/>
  </svg>
);

/* ── Floating label input ── */
function FloatingInput({
  id, label, type = "text", value, onChange, icon, rightEl, error,
}: {
  id: string; label: string; type?: string; value: string;
  onChange: (v: string) => void; icon: React.ReactNode;
  rightEl?: React.ReactNode; error?: string;
}) {
  const [focused, setFocused] = useState(false);
  const lifted = focused || value.length > 0;

  return (
    <div className="space-y-1">
      <div
        className={`relative flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-all duration-300 bg-white ${
          error
            ? "border-red-300 shadow-[0_0_0_3px_rgba(239,68,68,0.08)]"
            : focused
            ? "border-[#f97316] shadow-[0_0_0_4px_rgba(249,115,22,0.08)]"
            : "border-zinc-200 hover:border-zinc-300"
        }`}
      >
        <span className={`shrink-0 transition-colors duration-300 ${focused ? "text-[#f97316]" : "text-zinc-400"}`}>
          {icon}
        </span>
        <div className="relative flex-1">
          <label
            htmlFor={id}
            className={`absolute left-0 transition-all duration-200 pointer-events-none ${
              lifted
                ? "text-[0.65rem] font-semibold -top-3.5 text-[#f97316]"
                : "text-sm text-zinc-400 top-0"
            }`}
          >
            {label}
          </label>
          <input
            id={id}
            type={type}
            value={value}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-transparent text-sm text-zinc-900 outline-none pt-3 font-medium"
          />
        </div>
        {rightEl && <span className="shrink-0 text-zinc-400 cursor-pointer hover:text-zinc-700 transition-colors">{rightEl}</span>}
      </div>
      {error && <p className="text-xs text-red-500 pl-1 font-medium">{error}</p>}
    </div>
  );
}

/* ── Main ── */
export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [remember, setRemember] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!email) e.email = "L'adresse email est requise.";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Email invalide.";
    if (!password) e.password = "Le mot de passe est requis.";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    setSubmitting(true);
    setTimeout(() => { setSubmitting(false); setSuccess(true); }, 1600);
  };

  return (
    <div className="min-h-screen bg-[#fafaf8] flex">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        * { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
        @keyframes slideUp { from { opacity:0; transform:translateY(24px);} to { opacity:1; transform:translateY(0);} }
        @keyframes spinOnce { from { transform: rotate(0deg);} to { transform: rotate(360deg);} }
        .anim { animation: slideUp 0.6s forwards; opacity: 0; }
        .spin { animation: spinOnce 0.8s linear infinite; }
        @keyframes checkPop { 0%{transform:scale(0) rotate(-10deg);opacity:0} 70%{transform:scale(1.2);} 100%{transform:scale(1);opacity:1;} }
        .check-pop { animation: checkPop 0.5s ease forwards; }
      `}</style>

      {/* ── Left panel — brand ── */}
      <div className="hidden lg:flex lg:w-[46%] relative bg-zinc-900 overflow-hidden flex-col justify-between p-14">
        {/* Decorative blobs */}
        <div className="absolute -top-32 -left-20 w-[420px] h-[420px] bg-[#f97316] rounded-full opacity-[0.12] blur-3xl" />
        <div className="absolute bottom-10 right-0 w-80 h-80 bg-rose-500 rounded-full opacity-[0.08] blur-3xl" />
        <div className="absolute top-1/2 left-1/4 w-64 h-64 bg-sky-400 rounded-full opacity-[0.06] blur-3xl" />

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-1.5">
          <span className="text-2xl font-black text-white">Moov</span>
          <span className="text-2xl font-black text-[#f97316]">.On</span>
        </div>

        {/* Centre content */}
        <div className="relative z-10">
          <div className="text-6xl mb-8">🌴</div>
          <h2 className="text-4xl font-black text-white leading-tight mb-4">
            Bienvenue<br />sur Moov<span className="text-[#f97316]">.On</span>
          </h2>
          <p className="text-zinc-400 text-base leading-relaxed max-w-xs">
            Des centaines d'activités vous attendent partout à Madagascar. Connectez-vous et explorez !
          </p>

          {/* Mini activity pills */}
          <div className="flex flex-wrap gap-2 mt-8">
            {["🏔️ Tsaranoro", "🚣 Pangalanes", "🐒 Lémuriens", "🏄 Anakao", "🎶 Tana by night"].map((t) => (
              <span key={t} className="text-xs font-semibold bg-white/10 text-white/80 px-3 py-1.5 rounded-full border border-white/10">
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom stats */}
        <div className="relative z-10 flex gap-8">
          {[["350+", "Activités"], ["22", "Villes"], ["8k+", "Membres"]].map(([v, l]) => (
            <div key={l}>
              <p className="text-2xl font-black text-white">{v}</p>
              <p className="text-xs text-zinc-500 mt-0.5">{l}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-[400px]">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-1 mb-10">
            <span className="text-xl font-black text-zinc-900">Moov</span>
            <span className="text-xl font-black text-[#f97316]">.On</span>
          </div>

          {success ? (
            /* ── Success state ── */
            <div className="text-center py-8">
              <div className="w-20 h-20 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5 check-pop">
                <svg className="w-10 h-10 text-emerald-500" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                </svg>
              </div>
              <h3 className="text-2xl font-black text-zinc-900 mb-2">Connexion réussie !</h3>
              <p className="text-zinc-500 text-sm">Bon retour sur Moov.On. Prêt pour de nouvelles aventures à Madagascar ? 🌴</p>
              <button className="mt-8 w-full bg-zinc-900 text-white text-sm font-bold py-3.5 rounded-2xl hover:bg-[#f97316] transition-all duration-300">
                Accéder à mon compte →
              </button>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className={`mb-8 anim`} style={{ animationDelay: "0.05s" }}>
                <h1 className="text-3xl font-black text-zinc-900 mb-1.5">Connexion</h1>
                <p className="text-zinc-500 text-sm">Pas encore de compte ?{" "}
                  <button
                    onClick={() => navigate("/register")}
                    className="text-[#f97316] font-bold hover:underline underline-offset-2 transition-colors"
                  >
                    S'inscrire gratuitement
                  </button>
                </p>
              </div>

              {/* Social login */}
              <div className={`anim mb-6`} style={{ animationDelay: "0.12s" }}>
                <button className="w-full flex items-center justify-center gap-3 border border-zinc-200 bg-white text-sm font-semibold text-zinc-700 py-3 rounded-2xl hover:border-zinc-400 hover:shadow-sm active:scale-[0.98] transition-all duration-300">
                  <svg className="w-5 h-5" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continuer avec Google
                </button>
              </div>

              {/* Divider */}
              <div className={`flex items-center gap-3 mb-6 anim`} style={{ animationDelay: "0.18s" }}>
                <div className="flex-1 h-px bg-zinc-100" />
                <span className="text-xs text-zinc-400 font-medium">ou avec votre email</span>
                <div className="flex-1 h-px bg-zinc-100" />
              </div>

              {/* Form fields */}
              <div className={`space-y-4 mb-5 anim`} style={{ animationDelay: "0.24s" }}>
                <FloatingInput
                  id="email" label="Adresse email" type="email"
                  value={email} onChange={setEmail}
                  icon={<MailIcon />} error={errors.email}
                />
                <FloatingInput
                  id="password" label="Mot de passe"
                  type={showPwd ? "text" : "password"}
                  value={password} onChange={setPassword}
                  icon={<LockIcon />} error={errors.password}
                  rightEl={
                    <span onClick={() => setShowPwd(!showPwd)}>
                      <EyeIcon open={showPwd} />
                    </span>
                  }
                />
              </div>

              {/* Remember + forgot */}
              <div className={`flex items-center justify-between mb-7 anim`} style={{ animationDelay: "0.3s" }}>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <div
                    onClick={() => setRemember(!remember)}
                    className={`w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all duration-200 ${
                      remember ? "bg-zinc-900 border-zinc-900" : "border-zinc-300 hover:border-zinc-500"
                    }`}
                  >
                    {remember && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                      </svg>
                    )}
                  </div>
                  <span className="text-sm text-zinc-600">Se souvenir de moi</span>
                </label>
                <button className="text-sm font-semibold text-[#f97316] hover:underline underline-offset-2">
                  Mot de passe oublié ?
                </button>
              </div>

              {/* Submit */}
              <div className={`anim`} style={{ animationDelay: "0.36s" }}>
                <button
                  onClick={handleSubmit}
                  disabled={submitting}
                  className="w-full bg-zinc-900 text-white text-sm font-bold py-3.5 rounded-2xl hover:bg-[#f97316] disabled:opacity-70 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                >
                  {submitting ? (
                    <>
                      <svg className="w-4 h-4 spin" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" d="M12 2a10 10 0 0 1 10 10" />
                      </svg>
                      Connexion en cours…
                    </>
                  ) : "Se connecter →"}
                </button>
              </div>

              {/* Register link (mobile) */}
              <p className={`text-center text-xs text-zinc-400 mt-6 anim`} style={{ animationDelay: "0.42s" }}>
                En vous connectant, vous acceptez nos{" "}
                <a href="#" className="underline underline-offset-2 hover:text-zinc-700">CGU</a>
                {" "}et notre{" "}
                <a href="#" className="underline underline-offset-2 hover:text-zinc-700">politique de confidentialité</a>.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}