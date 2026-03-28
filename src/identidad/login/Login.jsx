import React, { useState, useEffect, useRef, useCallback } from "react";

import carrusel1 from "../../assets/images/carrusel1.jpg";
import carrusel2 from "../../assets/images/carrusel2.jpg";
import carrusel3 from "../../assets/images/carrusel3.jpg";

const SLIDES = [carrusel1, carrusel2, carrusel3];
const DURATION = 5000;

/* ── Carrusel ──────────────────────────────────────────────── */
function Carousel() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(null);
  const startRef = useRef(null);
  const pausedRef = useRef(false);
  const pausedAtRef = useRef(0);

  const goTo = useCallback((idx) => {
    const next = ((idx % SLIDES.length) + SLIDES.length) % SLIDES.length;
    setCurrent(next);
    cancelAnimationFrame(progressRef.current);
    setProgress(0);
    startRef.current = null;
    pausedRef.current = false;
    pausedAtRef.current = 0;
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  useEffect(() => {
    startRef.current = performance.now();
    function tick(now) {
      if (pausedRef.current) return;
      const elapsed = now - startRef.current;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        progressRef.current = requestAnimationFrame(tick);
      } else {
        setCurrent((c) => (c + 1) % SLIDES.length);
        startRef.current = performance.now();
        setProgress(0);
        progressRef.current = requestAnimationFrame(tick);
      }
    }
    progressRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(progressRef.current);
  }, [current]);

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const touchStartX = useRef(0);

  const handleMouseEnter = () => {
    pausedRef.current = true;
    pausedAtRef.current = progress;
    cancelAnimationFrame(progressRef.current);
  };

  const handleMouseLeave = () => {
    pausedRef.current = false;
    startRef.current = performance.now() - (pausedAtRef.current / 100) * DURATION;
    function tick(now) {
      if (pausedRef.current) return;
      const elapsed = now - startRef.current;
      const pct = Math.min((elapsed / DURATION) * 100, 100);
      setProgress(pct);
      if (pct < 100) {
        progressRef.current = requestAnimationFrame(tick);
      } else {
        setCurrent((c) => (c + 1) % SLIDES.length);
        startRef.current = performance.now();
        setProgress(0);
        progressRef.current = requestAnimationFrame(tick);
      }
    }
    progressRef.current = requestAnimationFrame(tick);
  };

  return (
    <div
      className="relative overflow-hidden bg-[#0f1e3c] max-[860px]:hidden [animation:slideR_0.8s_0.1s_cubic-bezier(0.16,1,0.3,1)_both]"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - touchStartX.current;
        if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
      }}
    >
      {/* Imágenes */}
      {SLIDES.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-[900ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] ${i === current ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={img}
            alt={`Codeplex slide ${i + 1}`}
            className={`w-full h-full object-cover block transition-transform duration-[6000ms] [transition-timing-function:cubic-bezier(0.25,0.46,0.45,0.94)] ${i === current ? "scale-100" : "scale-[1.06]"}`}
          />
        </div>
      ))}

      {/* Overlay oscuro */}
      <div
        className="absolute inset-0 z-[2]"
        style={{ background: "linear-gradient(to top, rgba(8,12,28,0.92) 0%, rgba(8,12,28,0.35) 45%, rgba(8,12,28,0.15) 100%), linear-gradient(to right, rgba(8,12,28,0.2) 0%, transparent 50%)" }}
      />

      {/* Contenido */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end px-9 pt-9 pb-[30px]">
        <div className="flex items-center justify-between">
          {/* Dots + contador */}
          <div className="flex items-center gap-3.5">
            <div className="flex items-center gap-1.5">
              {SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`h-[3px] rounded-full cursor-pointer transition-all duration-[400ms] [transition-timing-function:cubic-bezier(0.4,0,0.2,1)] ${i === current ? "w-6 bg-surface" : "w-2 bg-white/25"}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <span className="text-[11px] font-semibold text-white/35 tracking-[0.5px]">
              <strong className="text-white/75 font-bold">{current + 1}</strong> / {SLIDES.length}
            </span>
          </div>

          {/* Flechas */}
          <div className="flex gap-2">
            {[prev, next].map((fn, i) => (
              <button
                key={i}
                className="w-[34px] h-[34px] rounded-full bg-white/10 border border-white/15 flex items-center justify-center cursor-pointer text-white/70 transition-all backdrop-blur-[6px] hover:bg-white/20 hover:border-white/30 hover:text-white hover:scale-[1.08]"
                onClick={fn}
                aria-label={i === 0 ? "Anterior" : "Siguiente"}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  {i === 0
                    ? <polyline points="15,18 9,12 15,6" />
                    : <polyline points="9,18 15,12 9,6" />
                  }
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Barra de progreso */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/[0.08] z-[11]">
        <div
          className="h-full rounded-[0_2px_2px_0] transition-[width] duration-[100ms] linear"
          style={{
            width: `${progress}%`,
            background: "linear-gradient(90deg, #60a5fa, #a78bfa)",
          }}
        />
      </div>
    </div>
  );
}

/* ── Login ─────────────────────────────────────────────────── */
function Login({ onLogin, onBackToDemo }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
      setTimeout(() => onLogin(), 600);
    }, 1800);
  };

  const handleDemo = () => onBackToDemo ? onBackToDemo() : onLogin();

  return (
    <div
      className="login-page min-h-screen w-full flex items-center justify-center p-5 box-border font-[Manrope,system-ui,-apple-system,sans-serif]"
      style={{
        background: "radial-gradient(ellipse 55% 60% at 0% 100%, rgba(26,86,219,0.07) 0%, transparent 55%), radial-gradient(ellipse 40% 40% at 100% 0%, rgba(79,70,229,0.06) 0%, transparent 50%), var(--background-color)",
      }}
    >
      <div
        className="relative z-[1] grid grid-cols-[420px_1fr] max-[860px]:grid-cols-1 w-[1000px] max-w-full h-[620px] max-[860px]:h-auto bg-surface rounded-[20px] overflow-hidden border border-line [animation:cardIn_0.8s_cubic-bezier(0.16,1,0.3,1)_both]"
        style={{ boxShadow: "0 4px 6px rgba(15,30,60,0.04), 0 20px 60px rgba(15,30,60,0.10), 0 0 0 1px rgba(255,255,255,0.8)" }}
      >

        {/* ── PANEL IZQUIERDO ── */}
        <div className="login-left-panel px-[38px] py-[40px] max-[860px]:px-[28px] max-[860px]:py-[32px] max-[520px]:px-5 max-[520px]:py-6 flex flex-col bg-surface border-r border-line overflow-y-auto [animation:slideL_0.8s_0.08s_cubic-bezier(0.16,1,0.3,1)_both]">

          {/* Logo */}
          <div className="flex items-center gap-2.5 mb-8 [animation:fadeUp_0.6s_0.2s_both]">
            <div className="w-9 h-9 rounded-[9px] bg-[#0f1e3c] flex items-center justify-center shrink-0 shadow-[0_2px_8px_rgba(15,30,60,0.25)]">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect x="2" y="2" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.9" />
                <rect x="10" y="2" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.55" />
                <rect x="2" y="10" width="6" height="6" rx="1.5" fill="white" fillOpacity="0.55" />
                <rect x="10" y="10" width="6" height="6" rx="1.5" fill="#93c5fd" fillOpacity="0.9" />
              </svg>
            </div>
            <span className="text-[17px] font-medium text-fg tracking-[-0.3px]">
              Code<strong className="font-extrabold text-brand">plex</strong>
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-[22px] font-extrabold text-fg m-0 mb-1 tracking-[-0.5px] [animation:fadeUp_0.6s_0.28s_both]">
            Iniciar sesión
          </h1>
          <p className="text-[13px] text-muted font-medium m-0 mb-[22px] [animation:fadeUp_0.6s_0.32s_both]">
            Accede a tu cuenta para continuar
          </p>

          {/* Google */}
          <button
            className="flex items-center justify-center gap-[9px] w-full py-[10px] px-4 border-[1.5px] border-line rounded-[9px] bg-surface text-fg font-[Manrope,sans-serif] text-[13px] font-semibold cursor-pointer mb-2 transition-all outline-none [animation:fadeUp_0.5s_0.36s_both] hover:bg-field hover:border-brand hover:shadow-[0_2px_12px_rgba(127,13,242,0.15)] hover:-translate-y-px"
            type="button"
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
            </svg>
            Continuar con Google
          </button>

          {/* Social row */}
          <div className="grid grid-cols-3 max-[520px]:grid-cols-1 gap-[7px] mb-2 [animation:fadeUp_0.5s_0.42s_both]">
            {[
              {
                href: "https://www.facebook.com/codeplexsoftware/",
                label: "Facebook",
                icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="#1877F2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>,
              },
              {
                href: "https://www.instagram.com/codeplexsoft/",
                label: "Instagram",
                icon: <svg width="14" height="14" viewBox="0 0 24 24"><defs><linearGradient id="ig2" x1="0%" y1="100%" x2="100%" y2="0%"><stop offset="0%" stopColor="#f09433"/><stop offset="50%" stopColor="#dc2743"/><stop offset="100%" stopColor="#bc1888"/></linearGradient></defs><path fill="url(#ig2)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
              },
              {
                href: "https://www.tiktok.com/@codeplexsac",
                label: "TikTok",
                icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="#000"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z"/></svg>,
              },
            ].map(({ href, label, icon }) => (
              <a
                key={label}
                className="flex items-center justify-center gap-1.5 py-[9px] px-1.5 border-[1.5px] border-line rounded-[9px] bg-surface font-[Manrope,sans-serif] text-xs font-semibold cursor-pointer text-fg no-underline whitespace-nowrap transition-all outline-none hover:-translate-y-px hover:shadow-[0_2px_10px_rgba(0,0,0,0.08)] hover:bg-field hover:border-brand"
                href={href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {icon}
                {label}
              </a>
            ))}
          </div>

          {/* Demo */}
          <button
            className="btn-demo-login flex items-center justify-center gap-2 w-full py-[10px] px-4 border-[1.5px] border-line rounded-[9px] bg-field text-brand font-[Manrope,sans-serif] text-[13px] font-bold cursor-pointer mb-1 transition-all [animation:fadeUp_0.5s_0.50s_both] hover:border-brand hover:-translate-y-px"
            type="button"
            onClick={handleDemo}
          >
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <polygon points="4,2 14,8 4,14" />
            </svg>
            Volver al Demo
          </button>

          {/* Divider */}
          <div className="flex items-center gap-2.5 my-3 text-subtle [animation:fadeUp_0.5s_0.56s_both]">
            <div className="flex-1 h-px bg-line" />
            <span className="text-[11px] font-bold tracking-[0.5px] uppercase">o con correo</span>
            <div className="flex-1 h-px bg-line" />
          </div>

          {/* Formulario */}
          <form onSubmit={handleSubmit}>
            {/* Email */}
            <div className="mb-3 [animation:fadeUp_0.5s_0.60s_both]">
              <label className="block text-xs font-bold text-fg mb-[5px] tracking-[0.1px]">
                Correo electrónico
              </label>
              <input
                className="w-full py-[10px] px-3.5 bg-field border-[1.5px] border-line rounded-[9px] text-fg font-[Manrope,sans-serif] text-[13.5px] font-medium outline-none transition-all box-border placeholder:text-subtle placeholder:font-normal focus:border-brand focus:bg-surface focus:shadow-[0_0_0_3px_var(--focus-ring)]"
                type="email"
                placeholder="@codeplex.pe"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Contraseña */}
            <div className="mb-3 [animation:fadeUp_0.5s_0.66s_both]">
              <label className="block text-xs font-bold text-fg mb-[5px] tracking-[0.1px]">
                Contraseña
              </label>
              <div className="relative">
                <input
                  className="w-full py-[10px] px-3.5 pr-[42px] bg-field border-[1.5px] border-line rounded-[9px] text-fg font-[Manrope,sans-serif] text-[13.5px] font-medium outline-none transition-all box-border placeholder:text-subtle placeholder:font-normal focus:border-brand focus:bg-surface focus:shadow-[0_0_0_3px_var(--focus-ring)]"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-0 cursor-pointer p-0.5 flex items-center text-subtle transition-colors hover:text-brand"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#aaa" strokeWidth="2">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Opciones */}
            <div className="flex items-center justify-between my-2.5 mb-4 [animation:fadeUp_0.5s_0.72s_both]">
              <label
                className="flex items-center gap-[7px] cursor-pointer text-[12.5px] font-medium text-fg select-none"
                onClick={() => setRemember(!remember)}
              >
                <span
                  className={`w-4 h-4 rounded-[4px] border-[1.5px] inline-block shrink-0 transition-all ${remember ? "bg-brand border-brand" : "border-line bg-surface"}`}
                  style={remember ? {
                    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 10'%3E%3Cpath d='M1 5l3.5 3.5L11 1' stroke='white' stroke-width='2' fill='none' stroke-linecap='round'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    backgroundSize: "10px",
                  } : undefined}
                />
                Recordar sesión
              </label>
              <a href="#" className="text-[12.5px] font-semibold text-brand no-underline transition-opacity hover:opacity-70">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            {/* Botón submit */}
            <button
              type="submit"
              className={`btn-login-shimmer w-full py-3 border-0 rounded-[10px] text-white font-[Manrope,sans-serif] text-sm font-bold tracking-[0.1px] cursor-pointer flex items-center justify-center gap-2 transition-all min-h-[44px] [animation:fadeUp_0.6s_0.78s_cubic-bezier(0.34,1.56,0.64,1)_both] disabled:cursor-not-allowed not-disabled:hover:-translate-y-0.5 not-disabled:hover:shadow-[0_8px_24px_rgba(127,13,242,0.4)] active:not-disabled:translate-y-0
                ${success ? "!bg-[#065f46] !shadow-[0_4px_16px_rgba(5,150,105,0.4)]" : ""}`}
              style={{
                background: success ? undefined : "var(--gradient-primary)",
                boxShadow: success ? undefined : "var(--shadow-primary)",
              }}
              disabled={loading || success}
            >
              {loading ? (
                <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full [animation:spin_0.65s_linear_infinite]" />
              ) : success ? (
                "✓  Acceso concedido"
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </form>

        </div>

        {/* ── PANEL DERECHO ── */}
        <Carousel />

      </div>
    </div>
  );
}

export default Login;
