import React, { useState, useEffect, useRef, useCallback } from "react";
import "../../../styles/Login.css";

import carrusel1 from "../../../assets/images/carrusel1.jpg";
import carrusel2 from "../../../assets/images/carrusel2.jpg";
import carrusel3 from "../../../assets/images/carrusel3.jpg";

const SLIDES = [carrusel1, carrusel2, carrusel3];

const DURATION = 5000;

function Carousel() {
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const progressRef = useRef(null);
  const startRef = useRef(null);
  const pausedRef = useRef(false);
  const pausedAtRef = useRef(0);

  const goTo = useCallback((idx) => {
    const next = ((idx % SLIDES.length) + SLIDES.length) % SLIDES.length;
    setCurrent(next);
    resetProgress();
  }, []);

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  function resetProgress() {
    cancelAnimationFrame(progressRef.current);
    setProgress(0);
    startRef.current = null;
    pausedRef.current = false;
    pausedAtRef.current = 0;
    clearTimeout(timerRef.current);
  }

  // Animate progress bar
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

  // Keyboard
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const handleMouseEnter = () => {
    pausedRef.current = true;
    pausedAtRef.current = progress;
    cancelAnimationFrame(progressRef.current);
  };

  const handleMouseLeave = () => {
    pausedRef.current = false;
    // Recalculate start so progress continues from where it paused
    startRef.current =
      performance.now() - (pausedAtRef.current / 100) * DURATION;
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

  // Touch swipe
  const touchStartX = useRef(0);
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e) => {
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
  };

  return (
    <div
      className="carousel-panel"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background images — all rendered, only active visible */}
      {SLIDES.map((img, i) => (
        <div
          key={i}
          className={`carousel-slide ${i === current ? "active" : ""}`}
        >
          <img src={img} alt={`Codeplex slide ${i + 1}`} />
        </div>
      ))}

      {/* Dark overlay */}
      <div className="carousel-overlay" />

      {/* Content */}
      <div className="carousel-content">
        {/* Controls */}
        <div className="carousel-controls">
          <div className="carousel-left-controls">
            <div className="carousel-dots">
              {SLIDES.map((_, i) => (
                <div
                  key={i}
                  className={`carousel-dot ${i === current ? "active" : ""}`}
                  onClick={() => goTo(i)}
                />
              ))}
            </div>
            <span className="carousel-counter">
              <strong>{current + 1}</strong> / {SLIDES.length}
            </span>
          </div>
          <div className="carousel-arrows">
            <button
              className="carousel-arrow"
              onClick={prev}
              aria-label="Anterior"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <polyline points="15,18 9,12 15,6" />
              </svg>
            </button>
            <button
              className="carousel-arrow"
              onClick={next}
              aria-label="Siguiente"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
              >
                <polyline points="9,18 15,12 9,6" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="carousel-progress">
        <div
          className="carousel-progress-fill"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

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
    <div className="login-page">
      <div className="login-card">
        {/* ── PANEL IZQUIERDO ── */}
        <div className="login-left">
          {/* Logo */}
          <div className="login-logo">
            <div className="login-logo-icon">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                <rect
                  x="2"
                  y="2"
                  width="6"
                  height="6"
                  rx="1.5"
                  fill="white"
                  fillOpacity="0.9"
                />
                <rect
                  x="10"
                  y="2"
                  width="6"
                  height="6"
                  rx="1.5"
                  fill="white"
                  fillOpacity="0.55"
                />
                <rect
                  x="2"
                  y="10"
                  width="6"
                  height="6"
                  rx="1.5"
                  fill="white"
                  fillOpacity="0.55"
                />
                <rect
                  x="10"
                  y="10"
                  width="6"
                  height="6"
                  rx="1.5"
                  fill="#93c5fd"
                  fillOpacity="0.9"
                />
              </svg>
            </div>
            <span className="login-logo-text">
              Code<strong>plex</strong>
            </span>
          </div>

          {/* Heading */}
          <h1 className="login-title">Iniciar sesión</h1>
          <p className="login-subtitle">Accede a tu cuenta para continuar</p>

          {/* Google */}
          <button className="btn-google" type="button">
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continuar con Google
          </button>

          {/* Social row */}
          <div className="social-row">
            <a
              className="btn-social btn-facebook"
              href="https://www.facebook.com/codeplexsoftware/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="#1877F2">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </a>
            <a
              className="btn-social btn-instagram"
              href="https://www.instagram.com/codeplexsoft/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="14" height="14" viewBox="0 0 24 24">
                <defs>
                  <linearGradient id="ig2" x1="0%" y1="100%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#f09433"/>
                    <stop offset="50%" stopColor="#dc2743"/>
                    <stop offset="100%" stopColor="#bc1888"/>
                  </linearGradient>
                </defs>
                <path fill="url(#ig2)" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
              </svg>
              Instagram
            </a>
            <a
              className="btn-social btn-tiktok"
              href="https://www.tiktok.com/@codeplexsac"
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="#000">
                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.18 8.18 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z"/>
              </svg>
              TikTok
            </a>
          </div>

          {/* Demo */}
          <button className="btn-demo" type="button" onClick={handleDemo}>
            <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor">
              <polygon points="4,2 14,8 4,14" />
            </svg>
            Ver Demo sin registro
          </button>

          {/* Divider */}
          <div className="login-divider">
            <span>o con correo</span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Correo electrónico</label>
              <input
                type="email"
                placeholder="gabriel@codeplex.pe"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label>Contraseña</label>
              <div className="input-password-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#aaa"
                      strokeWidth="2"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94" />
                      <path d="M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#aaa"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="login-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                <span className="checkmark"></span>
                Recordar sesión
              </label>
              <a href="#" className="forgot-link">
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className={`btn-login ${loading ? "loading" : ""} ${success ? "success" : ""}`}
              disabled={loading || success}
            >
              {loading ? (
                <span className="btn-spinner" />
              ) : success ? (
                "✓  Acceso concedido"
              ) : (
                "Iniciar sesión"
              )}
            </button>
          </form>

          {onBackToDemo && (
            <p className="back-to-demo">
              <button type="button" className="back-to-demo-link" onClick={onBackToDemo}>
                ← Volver al modo demo
              </button>
            </p>
          )}
        </div>

        {/* ── PANEL DERECHO: CAROUSEL ── */}
        <Carousel />
      </div>
    </div>
  );
}

export default Login;
