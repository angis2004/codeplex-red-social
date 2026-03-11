import React, { useState } from "react";
import Icon from "../../common/Icon/Icon";
import ProfileSlider from "./ProfileSlider/ProfileSlider";
import { useTheme } from "../../../hooks/useTheme";
import "../../../styles/Header.css";
import ModalCrearEmpresa from "../../dashboard/modals/ModalCrearEmpresa/ModalCrearEmpresa";

function Header({ onMenuToggle, onNavegar, vistaActiva, isDemo, onLoginClick, onLogout }) {
  const [showSlider, setShowSlider] = useState(false);
  const [showModalEmpresa, setShowModalEmpresa] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <>
      <div className="header-wrapper">
        {isDemo && (
          <div className="demo-banner">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ verticalAlign: 'middle', marginRight: 6, flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Estás en modo demo — Inicia sesión para acceder a todo
          </div>
        )}
        <header className="header">

          {/* LEFT: hamburger + logo */}
          <div className="header-left">
            <button className="menu-toggle" onClick={onMenuToggle}>
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
            <button className="btn-mis-apps">
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
              <svg className="mis-apps-chevron" width="12" height="12" viewBox="0 0 24 24"
                fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <polyline points="6 9 12 15 18 9" />
              </svg>
            </button>
          </div>

          {/* DESKTOP NAV: oculto en tablet/mobile (se mueve a row2) */}
          <div className="header-nav">
            <button className="btn-add-company" onClick={() => setShowModalEmpresa(true)}>
              <span>+</span>
              <span>Agregar Empresa</span>
            </button>
            <button
              className={`btn-nav-item${vistaActiva === "red-social" ? " btn-nav-item--active" : ""}`}
              onClick={() => onNavegar("red-social")}
            >
              Red Social
            </button>
            <button
              className={`btn-nav-item${vistaActiva === "aplicaciones" ? " btn-nav-item--active" : ""}`}
              onClick={() => onNavegar("aplicaciones")}
            >
              Aplicaciones
            </button>
          </div>

          {/* RIGHT: iconos + usuario */}
          <div className="header-right">
            <button className="icon-btn ayuda-btn" title="Ayuda">
              <Icon name="ayuda" size={22} />
            </button>
            {!isDemo && (
              <button className="icon-btn has-notification">
                <Icon name="notificaciones" size={22} />
              </button>
            )}
            {isDemo ? (
              <button className="btn-login-header" onClick={onLoginClick}>
                Iniciar sesión
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
            onClick={() => onNavegar("red-social")}
          >
            Red Social
          </button>
          <button
            className={`header-row2-btn${vistaActiva === "aplicaciones" ? " header-row2-btn--active" : ""}`}
            onClick={() => onNavegar("aplicaciones")}
          >
            Aplicaciones
          </button>
        </div>
      </div>

      <div className="header-spacer" />

      {showSlider && (
        <ProfileSlider
          onClose={() => setShowSlider(false)}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          isDemo={isDemo}
          onLoginClick={() => { setShowSlider(false); onLoginClick(); }}
          onLogout={() => { setShowSlider(false); onLogout(); }}
        />
      )}

      <ModalCrearEmpresa
        isOpen={showModalEmpresa}
        onClose={() => setShowModalEmpresa(false)}
        onSuccess={(data) => {
          console.log("Empresa creada desde Header:", data);
          setShowModalEmpresa(false);
        }}
      />
    </>
  );
}

export default Header;
