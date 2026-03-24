import React, { useState, useEffect, useRef } from "react";
import Icon from "../../Icon/Icon";
import ProfileSlider from "../../../identidad/ui/perfil/ProfileSlider";
import { useTheme } from "../useTheme";
import { useSesion } from "../../../identidad/aplicacion/SesionContext";
import "./Header.css";
import RegistroEmpresa from "../../../organizacion/ui/empresas/RegistroEmpresa";
import IconoAplicacion from "../../../planes/aplicaciones/ui/IconoAplicacion";


function Header({ alAlternarMenu, alNavegar, vistaActiva,
  itemsCarrito = [], totalCarrito = 0, alVerCarrito,
  misApps = [], appsActivas = [], alAlternarAppActiva, alSeleccionarTodasApps, alDeseleccionarTodasApps }) {
  const { modoExploracion, comenzarAutenticacion, cerrarSesion } = useSesion();
  const [showSlider, setShowSlider]             = useState(false);
  const [showModalEmpresa, setShowModalEmpresa] = useState(false);
  const [showMisApps, setShowMisApps]           = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const headerWrapperRef = useRef(null);

  /* ── Medir altura real del header y exponerla como CSS var ── */
  useEffect(() => {
    const el = headerWrapperRef.current;
    if (!el) return;
    const observer = new ResizeObserver(() => {
      el.style.setProperty('--header-height', `${el.offsetHeight}px`);
    });
    observer.observe(el);
    // valor inicial inmediato
    el.style.setProperty('--header-height', `${el.offsetHeight}px`);
    return () => observer.disconnect();
  }, []);

  /* ── Cerrar dropdown al hacer clic fuera ── */
  // Usamos "click" (no mousedown) para que React procese primero el onClick
  // del ítem antes de cerrar el dropdown. El dropdown hace stopPropagation
  // para que sus clics internos no lleguen al document.
  useEffect(() => {
    if (!showMisApps) return;
    const handler = () => setShowMisApps(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [showMisApps]);

  return (
    <>
      <div className="header-wrapper" ref={headerWrapperRef}>
        {modoExploracion && (
          <div className="demo-banner">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ verticalAlign: 'middle', marginRight: 6, flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Modo exploración — Inicia sesión para acceder a todo
          </div>
        )}
        <header className="header">

          {/* LEFT: hamburger + logo */}
          <div className="header-left">
            <button className="menu-toggle" onClick={alAlternarMenu}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div className="logo">
              <div className="logo-icon">C</div>
              <span className="logo-text">Codeplex</span>
            </div>
          </div>

          {/* CENTER: Mis Apps/Mis Aplicaciones — visible en todos los breakpoints */}
          <div className="header-center">
            {/* stopPropagation evita que clics internos lleguen al document y cierren el dropdown */}
            <div className="mis-apps-wrap" onClick={(e) => e.stopPropagation()}>
              <button
                className={`btn-mis-apps${showMisApps ? " btn-mis-apps--open" : ""}`}
                onClick={() => setShowMisApps((v) => !v)}
              >
                <span className="mis-apps-icon-wrap">
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <rect x="1" y="1" width="6" height="6" rx="1" fill="url(#misAppsGrad)" />
                    <rect x="9" y="1" width="6" height="6" rx="1" fill="url(#misAppsGrad)" />
                    <rect x="1" y="9" width="6" height="6" rx="1" fill="url(#misAppsGrad)" />
                    <rect x="9" y="9" width="6" height="6" rx="1" fill="url(#misAppsGrad)" />
                    <defs>
                      <linearGradient id="misAppsGrad" x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor="#7F0DF2" />
                        <stop offset="100%" stopColor="#588CE5" />
                      </linearGradient>
                    </defs>
                  </svg>
                </span>
                <span className="mis-apps-text-long">Mis Aplicaciones</span>
                <span className="mis-apps-text-short">Mis Apps</span>
                {misApps.length > 0 && (
                  <span className="mis-apps-badge">{misApps.length}</span>
                )}
                <svg
                  className={`mis-apps-chevron${showMisApps ? " mis-apps-chevron--open" : ""}`}
                  width="12" height="12" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* ── Dropdown ── */}
              {showMisApps && (
                <div className="mis-apps-dropdown">
                  <div className="mis-apps-dropdown-title">
                  Mis Aplicaciones activas
                  <button className="mis-apps-dropdown-cerrar" onClick={() => setShowMisApps(false)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                  </button>
                </div>

                  {misApps.length === 0 ? (
                    <div className="mis-apps-empty">
                      Aún no tienes aplicaciones activas
                    </div>
                  ) : (
                    <div className="mis-apps-list">
                      {misApps.map((app) => {
                        const isActiva = appsActivas.some((a) => a.id === app.id);
                        return (
                          <button
                            key={app.id}
                            className={`mis-apps-item${isActiva ? " mis-apps-item--activa" : ""}`}
                            onClick={() => alAlternarAppActiva(app)}
                          >
                            {/* Ícono real de la app */}
                            <span className="mis-apps-item-icon">
                              <IconoAplicacion tipo={app.icono} colorTema={app.colorTema} />
                            </span>
                            <span className="mis-apps-item-info">
                              <span className="mis-apps-item-nombre">{app.nombre}</span>
                              <span className="mis-apps-item-plan">
                                {app.publisher} · Plan {app.planDisplay || app.planSeleccionado}
                              </span>
                            </span>
                            {/* Checkbox visual */}
                            <span
                              className={`mis-apps-checkbox${isActiva ? " mis-apps-checkbox--checked" : ""}`}
                            >
                              {isActiva && (
                                <svg width="10" height="10" viewBox="0 0 12 12" fill="none"
                                  stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                  <polyline points="2 6 5 9 10 3" />
                                </svg>
                              )}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {/* Acciones */}
                  <div className="mis-apps-dropdown-actions">
                    <button
                      className="mis-apps-action-btn"
                      onClick={alSeleccionarTodasApps}
                    >
                      Seleccionar todas
                    </button>
                    <button
                      className="mis-apps-action-btn"
                      onClick={alDeseleccionarTodasApps}
                    >
                      Deseleccionar
                    </button>
                  </div>

                  {/* Footer links */}
                  <div className="mis-apps-dropdown-footer">
                    <button className="mis-apps-footer-link"
                      onClick={() => { alNavegar("aplicaciones"); setShowMisApps(false); }}>
                      Apps disponibles
                    </button>
                    <span className="mis-apps-footer-sep">·</span>
                    <button className="mis-apps-footer-link"
                      onClick={() => { alNavegar("aplicaciones"); setShowMisApps(false); }}>
                      Todas en demo
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* DESKTOP NAV: oculto en tablet/mobile (se mueve a row2) */}
          <div className="header-nav">
            <button className="btn-add-company" onClick={() => setShowModalEmpresa(true)}>
              <span>+</span>
              <span>Agregar Empresa</span>
            </button>
            <button
              className={`btn-nav-item${vistaActiva === "red-social" ? " btn-nav-item--active" : ""}`}
              onClick={() => alNavegar("red-social")}
            >
              Red Social
            </button>
            <button
              className={`btn-nav-item${vistaActiva === "aplicaciones" ? " btn-nav-item--active" : ""}`}
              onClick={() => alNavegar("aplicaciones")}
            >
              Aplicaciones
            </button>
          </div>

          {/* RIGHT: iconos + usuario */}
          <div className="header-right">
            {/* Botón Carrito — visible solo si hay items */}
            {itemsCarrito.length > 0 && (
              <button className="btn-carrito" onClick={alVerCarrito} title="Ver carrito">
                {/* Estado A+B: pill (desktop y laptop) */}
                <span className="btn-carrito-pill">
                  <span className="carrito-pill-icon">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    <span className="carrito-badge">{itemsCarrito.length}</span>
                  </span>
                  <span className="carrito-label">{itemsCarrito.length} app{itemsCarrito.length > 1 ? 's' : ''}</span>
                  <span className="carrito-separator">·</span>
                  <span className="carrito-total">S/{totalCarrito}/mes</span>
                </span>
                {/* Estado C: ícono circular (tablet) */}
                <span className="btn-carrito-icon">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  <span className="carrito-badge-circle">{itemsCarrito.length}</span>
                </span>
              </button>
            )}
            <button className="icon-btn ayuda-btn" title="Ayuda">
              <Icon name="ayuda" size={22} />
            </button>
            {!modoExploracion && (
              <button className="icon-btn has-notification">
                <Icon name="notificaciones" size={22} />
              </button>
            )}
            {modoExploracion ? (
              <button className="btn-login-header" onClick={comenzarAutenticacion}>
                <svg className="login-icon-mobile" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                  <line x1="2" y1="2" x2="22" y2="22" strokeWidth="2.2" />
                </svg>
                <span className="login-text">Iniciar sesión</span>
              </button>
            ) : (
              <>
                <img
                  src="https://i.pravatar.cc/150?img=12"
                  alt="Gabriel Chumpitazi"
                  className="user-avatar"
                  onClick={() => setShowSlider(true)}
                />
                <span className="user-name" onClick={() => setShowSlider(true)}>
                  Gabriel Chumpitazi
                </span>
              </>
            )}
          </div>
        </header>

        {/* FILA 2 — solo tablet + mobile */}
        <div className="header-row2">
          <button className="header-row2-btn" onClick={() => setShowModalEmpresa(true)}>
            + Agregar Empresa
          </button>
          <button
            className={`header-row2-btn${vistaActiva === "red-social" ? " header-row2-btn--active" : ""}`}
            onClick={() => alNavegar("red-social")}
          >
            Red Social
          </button>
          <button
            className={`header-row2-btn${vistaActiva === "aplicaciones" ? " header-row2-btn--active" : ""}`}
            onClick={() => alNavegar("aplicaciones")}
          >
            Aplicaciones
          </button>
        </div>
      </div>

      <div className="header-spacer" />

      {showSlider && (
        <ProfileSlider
          alCerrar={() => setShowSlider(false)}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          modoExploracion={modoExploracion}
          alIniciarSesion={() => { setShowSlider(false); comenzarAutenticacion(); }}
          alCerrarSesion={() => { setShowSlider(false); cerrarSesion(); }}
        />
      )}

      <RegistroEmpresa
        estaAbierto={showModalEmpresa}
        alCerrar={() => setShowModalEmpresa(false)}
        alExito={(data) => {
          console.log("Empresa creada desde Header:", data);
          setShowModalEmpresa(false);
        }}
      />
    </>
  );
}

export default Header;
