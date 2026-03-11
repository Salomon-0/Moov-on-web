import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ── Icons ── */
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

const UserIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
    <circle cx="12" cy="7" r="4"/>
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

const PhoneIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.72 12 19.79 19.79 0 0 1 1.69 3.4 2 2 0 0 1 3.65 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l.97-.97a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
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
        {rightEl && (
          <span className="shrink-0 text-zinc-400 cursor-pointer hover:text-zinc-700 transition-colors">
            {rightEl}
          </span>
        )}
      </div>
      {error && <p className="text-xs text-red-500 pl-1 font-medium">{error}</p>}
    </div>
  );
}

/* ── Password strength ── */
function PasswordStrength({ password }: { password: string }) {
  const checks = [
    { label: "8 caractères min.", ok: password.length >= 8 },
    { label: "Majuscule",         ok: /[A-Z]/.test(password) },
    { label: "Chiffre",           ok: /\d/.test(password) },
    { label: "Caractère spécial", ok: /[!@#$%^&*(),.?":{}|<>]/.test(password) },
  ];
  const score = checks.filter((c) => c.ok).length;
  const colors = ["bg-zinc-200", "bg-red-400", "bg-orange-400", "bg-yellow-400", "bg-emerald-500"];
  const labels = ["", "Faible", "Correct", "Bon", "Fort"];

  if (!password) return null;

  return (
    <div className="mt-2 space-y-2">
      <div className="flex gap-1 h-1.5">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`flex-1 rounded-full transition-all duration-500 ${i < score ? colors[score] : "bg-zinc-100"}`} />
        ))}
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-3 flex-wrap">
          {checks.map((c) => (
            <span key={c.label} className={`text-[0.65rem] font-semibold flex items-center gap-1 transition-colors duration-300 ${c.ok ? "text-emerald-600" : "text-zinc-400"}`}>
              <span>{c.ok ? "✓" : "○"}</span> {c.label}
            </span>
          ))}
        </div>
        {score > 0 && (
          <span className={`text-[0.65rem] font-bold ${colors[score].replace("bg-", "text-").replace("-400", "-600").replace("-500", "-600")}`}>
            {labels[score]}
          </span>
        )}
      </div>
    </div>
  );
}

/* ── Preference toggle ── */
const PREFS = [
  { icon: "🏔️", label: "Nature" },
  { icon: "🎨", label: "Culture" },
  { icon: "🎉", label: "Sorties" },
  { icon: "🏄", label: "Sports" },
  { icon: "🍽️", label: "Gastronomie" },
  { icon: "🐒", label: "Faune" },
];

/* ── Steps ── */
const STEPS = ["Compte", "Profil", "Préférences"];

/* ── Main ── */
export default function RegisterPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [success, setSuccess] = useState(false);

  // Step 0 — account
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName]   = useState("");
  const [email, setEmail]         = useState("");
  const [phone, setPhone]         = useState("");

  // Step 1 — password
  const [password, setPassword]     = useState("");
  const [confirm, setConfirm]       = useState("");
  const [showPwd, setShowPwd]       = useState(false);
  const [showConf, setShowConf]     = useState(false);

  // Step 2 — prefs
  const [prefs, setPrefs]     = useState<string[]>([]);
  const [city, setCity]       = useState("");
  const [terms, setTerms]     = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const togglePref = (label: string) =>
    setPrefs((p) => p.includes(label) ? p.filter((x) => x !== label) : [...p, label]);

  const validateStep = () => {
    const e: Record<string, string> = {};
    if (step === 0) {
      if (!firstName.trim()) e.firstName = "Prénom requis.";
      if (!lastName.trim())  e.lastName  = "Nom requis.";
      if (!email.trim())     e.email     = "Email requis.";
      else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Email invalide.";
    }
    if (step === 1) {
      if (!password)              e.password = "Mot de passe requis.";
      else if (password.length < 8) e.password = "8 caractères minimum.";
      if (password !== confirm)   e.confirm  = "Les mots de passe ne correspondent pas.";
    }
    if (step === 2) {
      if (!terms) e.terms = "Vous devez accepter les CGU.";
    }
    return e;
  };

  const next = () => {
    const e = validateStep();
    setErrors(e);
    if (Object.keys(e).length > 0) return;
    if (step < 2) { setStep(step + 1); setErrors({}); }
    else {
      setSubmitting(true);
      setTimeout(() => { setSubmitting(false); setSuccess(true); }, 1800);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf8] flex">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800;900&display=swap');
        * { font-family: 'Plus Jakarta Sans', system-ui, sans-serif; }
        @keyframes slideUp { from { opacity:0; transform:translateY(20px);} to { opacity:1; transform:translateY(0);} }
        @keyframes slideRight { from { opacity:0; transform:translateX(24px);} to { opacity:1; transform:translateX(0);} }
        .anim-up { animation: slideUp 0.55s forwards; opacity:0; }
        .anim-right { animation: slideRight 0.45s forwards; opacity:0; }
        @keyframes spinOnce { to { transform: rotate(360deg);} }
        .spin { animation: spinOnce 0.8s linear infinite; }
        @keyframes checkPop { 0%{transform:scale(0);opacity:0} 70%{transform:scale(1.2);} 100%{transform:scale(1);opacity:1;} }
        .check-pop { animation: checkPop 0.5s ease forwards; }
      `}</style>

      {/* ── Left panel ── */}
      <div className="hidden lg:flex lg:w-[44%] relative bg-zinc-900 overflow-hidden flex-col justify-between p-14">
        <div className="absolute -top-40 -right-20 w-[480px] h-[480px] bg-[#f97316] rounded-full opacity-[0.10] blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 -left-10 w-72 h-72 bg-sky-400 rounded-full opacity-[0.07] blur-3xl pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.05]"
          style={{ backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }} />

        {/* Logo */}
        <div className="relative z-10 flex items-center gap-1.5">
          <span className="text-2xl font-black text-white">Moov</span>
          <span className="text-2xl font-black text-[#f97316]">.On</span>
        </div>

        {/* Illustration */}
        <div className="relative z-10">
          <div className="text-6xl mb-8 animate-[bounce_3s_ease-in-out_infinite]">🌿</div>
          <h2 className="text-4xl font-black text-white leading-[1.15] mb-4">
            Rejoignez la<br />communauté<br />
            <span className="text-[#f97316]">Moov.On</span>
          </h2>
          <p className="text-zinc-400 text-[0.9rem] leading-relaxed max-w-xs">
            Créez votre compte en quelques secondes et accédez à des centaines d'activités à travers toute Madagascar.
          </p>

          {/* Fake testimonial */}
          <div className="mt-10 bg-white/[0.06] border border-white/[0.08] rounded-2xl p-5">
            <p className="text-zinc-300 text-sm leading-relaxed italic mb-3">
              "Grâce à Moov.On j'ai découvert des activités incroyables à Tana que je ne connaissais pas du tout !"
            </p>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#f97316]/30 flex items-center justify-center text-sm">🧑</div>
              <div>
                <p className="text-xs font-bold text-white">Njaka R.</p>
                <p className="text-xs text-zinc-500">Antananarivo</p>
              </div>
              <div className="ml-auto flex gap-0.5">
                {"★★★★★".split("").map((s, i) => (
                  <span key={i} className="text-[#f97316] text-xs">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Progress hint */}
        <div className="relative z-10">
          <p className="text-xs text-zinc-500 mb-3">Inscription en {STEPS.length} étapes rapides</p>
          <div className="flex gap-2">
            {STEPS.map((_, i) => (
              <div key={i} className={`h-1 flex-1 rounded-full transition-all duration-500 ${i <= step ? "bg-[#f97316]" : "bg-zinc-700"}`} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Right panel — form ── */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 overflow-y-auto">
        <div className="w-full max-w-[420px]">

          {/* Mobile logo */}
          <div className="lg:hidden flex items-center gap-1 mb-8">
            <span className="text-xl font-black text-zinc-900">Moov</span>
            <span className="text-xl font-black text-[#f97316]">.On</span>
          </div>

          {success ? (
            /* ── Success ── */
            <div className="text-center py-6">
              <div className="w-24 h-24 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-5 check-pop">
                <span className="text-5xl">🎉</span>
              </div>
              <h3 className="text-2xl font-black text-zinc-900 mb-2">Bienvenue sur Moov.On !</h3>
              <p className="text-zinc-500 text-sm leading-relaxed max-w-xs mx-auto">
                Votre compte est créé. Prêt à explorer les meilleures activités de Madagascar ?
              </p>
              <div className="flex flex-wrap gap-2 justify-center mt-6">
                {prefs.map((p) => {
                  const pref = PREFS.find((x) => x.label === p);
                  return (
                    <span key={p} className="text-xs font-semibold bg-orange-50 text-[#f97316] border border-orange-100 px-3 py-1.5 rounded-full">
                      {pref?.icon} {p}
                    </span>
                  );
                })}
              </div>
              <button className="mt-8 w-full bg-zinc-900 text-white text-sm font-bold py-3.5 rounded-2xl hover:bg-[#f97316] transition-all duration-300">
                Découvrir les activités →
              </button>
            </div>
          ) : (
            <>
              {/* Step indicator */}
              <div className="mb-8 anim-up" style={{ animationDelay: "0.04s" }}>
                <div className="flex items-center gap-3 mb-5">
                  {STEPS.map((label, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-black transition-all duration-400 ${
                          i < step
                            ? "bg-emerald-500 text-white scale-90"
                            : i === step
                            ? "bg-zinc-900 text-white"
                            : "bg-zinc-100 text-zinc-400"
                        }`}
                      >
                        {i < step ? (
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                          </svg>
                        ) : i + 1}
                      </div>
                      <span className={`text-xs font-semibold hidden sm:block transition-colors ${i === step ? "text-zinc-900" : "text-zinc-400"}`}>
                        {label}
                      </span>
                      {i < STEPS.length - 1 && <div className={`w-6 h-px mx-1 transition-colors duration-500 ${i < step ? "bg-emerald-400" : "bg-zinc-200"}`} />}
                    </div>
                  ))}
                </div>

                <h1 className="text-3xl font-black text-zinc-900 mb-1">
                  {step === 0 && "Créez votre compte"}
                  {step === 1 && "Sécurisez votre accès"}
                  {step === 2 && "Vos préférences"}
                </h1>
                <p className="text-sm text-zinc-500">
                  {step === 0 && <>Déjà un compte ?{" "}
                    <button onClick={() => navigate("/login")} className="text-[#f97316] font-bold hover:underline underline-offset-2">
                      Se connecter
                    </button></>}
                  {step === 1 && "Choisissez un mot de passe sécurisé."}
                  {step === 2 && "Aidez-nous à personnaliser votre expérience."}
                </p>
              </div>

              {/* ── Step 0 — Account info ── */}
              {step === 0 && (
                <div key="step0" className="space-y-4">
                  {/* Google */}
                  <div className="anim-up" style={{ animationDelay: "0.1s" }}>
                    <button className="w-full flex items-center justify-center gap-3 border border-zinc-200 bg-white text-sm font-semibold text-zinc-700 py-3 rounded-2xl hover:border-zinc-400 hover:shadow-sm active:scale-[0.98] transition-all duration-300">
                      <svg className="w-5 h-5" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      S'inscrire avec Google
                    </button>
                  </div>

                  <div className="flex items-center gap-3 anim-up" style={{ animationDelay: "0.16s" }}>
                    <div className="flex-1 h-px bg-zinc-100" />
                    <span className="text-xs text-zinc-400 font-medium">ou remplissez le formulaire</span>
                    <div className="flex-1 h-px bg-zinc-100" />
                  </div>

                  <div className="grid grid-cols-2 gap-3 anim-up" style={{ animationDelay: "0.2s" }}>
                    <FloatingInput id="firstName" label="Prénom" value={firstName} onChange={setFirstName} icon={<UserIcon />} error={errors.firstName} />
                    <FloatingInput id="lastName"  label="Nom"    value={lastName}  onChange={setLastName}  icon={<UserIcon />} error={errors.lastName} />
                  </div>

                  <div className="anim-up" style={{ animationDelay: "0.26s" }}>
                    <FloatingInput id="email" label="Adresse email" type="email" value={email} onChange={setEmail} icon={<MailIcon />} error={errors.email} />
                  </div>

                  <div className="anim-up" style={{ animationDelay: "0.32s" }}>
                    <FloatingInput id="phone" label="Téléphone (optionnel)" type="tel" value={phone} onChange={setPhone} icon={<PhoneIcon />} />
                  </div>
                </div>
              )}

              {/* ── Step 1 — Password ── */}
              {step === 1 && (
                <div key="step1" className="space-y-4">
                  <div className="anim-right" style={{ animationDelay: "0.06s" }}>
                    <FloatingInput
                      id="password" label="Mot de passe"
                      type={showPwd ? "text" : "password"}
                      value={password} onChange={setPassword}
                      icon={<LockIcon />} error={errors.password}
                      rightEl={<span onClick={() => setShowPwd(!showPwd)}><EyeIcon open={showPwd} /></span>}
                    />
                    <PasswordStrength password={password} />
                  </div>

                  <div className="anim-right" style={{ animationDelay: "0.14s" }}>
                    <FloatingInput
                      id="confirm" label="Confirmer le mot de passe"
                      type={showConf ? "text" : "password"}
                      value={confirm} onChange={setConfirm}
                      icon={<LockIcon />} error={errors.confirm}
                      rightEl={<span onClick={() => setShowConf(!showConf)}><EyeIcon open={showConf} /></span>}
                    />
                    {confirm && password === confirm && (
                      <p className="text-xs text-emerald-600 font-semibold pl-1 mt-1 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                        </svg>
                        Les mots de passe correspondent
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* ── Step 2 — Preferences ── */}
              {step === 2 && (
                <div key="step2" className="space-y-5">
                  {/* City */}
                  <div className="anim-right" style={{ animationDelay: "0.06s" }}>
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">
                      Votre ville
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {["Antananarivo", "Toamasina", "Mahajanga", "Toliara", "Fianarantsoa", "Autre"].map((c) => (
                        <button
                          key={c}
                          onClick={() => setCity(c)}
                          className={`text-xs font-semibold px-4 py-2 rounded-full border transition-all duration-200 ${
                            city === c
                              ? "bg-zinc-900 text-white border-zinc-900 scale-105"
                              : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-800"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Preferences */}
                  <div className="anim-right" style={{ animationDelay: "0.14s" }}>
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-widest block mb-2">
                      Centres d'intérêt <span className="text-zinc-400 font-normal normal-case">(choisissez au moins 1)</span>
                    </label>
                    <div className="grid grid-cols-3 gap-2.5">
                      {PREFS.map((p, i) => {
                        const active = prefs.includes(p.label);
                        return (
                          <button
                            key={p.label}
                            onClick={() => togglePref(p.label)}
                            style={{ animationDelay: `${0.14 + i * 0.05}s` }}
                            className={`anim-right flex flex-col items-center gap-1.5 py-4 rounded-2xl border text-xs font-bold transition-all duration-300 ${
                              active
                                ? "bg-zinc-900 text-white border-zinc-900 scale-105 shadow-md"
                                : "bg-white text-zinc-600 border-zinc-200 hover:border-zinc-800 hover:scale-105"
                            }`}
                          >
                            <span className="text-2xl">{p.icon}</span>
                            {p.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Terms */}
                  <div className="anim-right" style={{ animationDelay: "0.44s" }}>
                    <label className="flex items-start gap-3 cursor-pointer select-none">
                      <div
                        onClick={() => setTerms(!terms)}
                        className={`w-5 h-5 rounded-md border-2 flex items-center justify-center mt-0.5 shrink-0 transition-all duration-200 ${
                          terms ? "bg-zinc-900 border-zinc-900" : "border-zinc-300 hover:border-zinc-500"
                        }`}
                      >
                        {terms && (
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-zinc-600 leading-relaxed">
                        J'accepte les{" "}
                        <a href="#" className="text-[#f97316] font-semibold hover:underline underline-offset-2">conditions d'utilisation</a>{" "}
                        et la{" "}
                        <a href="#" className="text-[#f97316] font-semibold hover:underline underline-offset-2">politique de confidentialité</a>{" "}
                        de Moov.On.
                      </span>
                    </label>
                    {errors.terms && <p className="text-xs text-red-500 pl-8 mt-1 font-medium">{errors.terms}</p>}
                  </div>
                </div>
              )}

              {/* Navigation buttons */}
              <div className={`flex gap-3 mt-7 anim-up`} style={{ animationDelay: "0.38s" }}>
                {step > 0 && (
                  <button
                    onClick={() => { setStep(step - 1); setErrors({}); }}
                    className="flex-1 text-sm font-bold border border-zinc-200 text-zinc-700 py-3.5 rounded-2xl hover:border-zinc-800 hover:text-zinc-900 active:scale-[0.98] transition-all duration-300"
                  >
                    ← Retour
                  </button>
                )}
                <button
                  onClick={next}
                  disabled={submitting}
                  className="flex-1 bg-zinc-900 text-white text-sm font-bold py-3.5 rounded-2xl hover:bg-[#f97316] disabled:opacity-70 active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                >
                  {submitting ? (
                    <>
                      <svg className="w-4 h-4 spin" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                        <path strokeLinecap="round" d="M12 2a10 10 0 0 1 10 10"/>
                      </svg>
                      Création en cours…
                    </>
                  ) : step < 2 ? "Continuer →" : "Créer mon compte 🎉"}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}