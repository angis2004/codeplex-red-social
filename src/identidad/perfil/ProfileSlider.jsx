import React, { useState, useEffect } from "react";
import Icon from "../../ui/Icon/Icon";

// Dropdown de idioma — vivía como función suelta dentro de Header.jsx
function LanguageSelect() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState("Español");
  const options = ["Español", "English", "Português"];

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest(".custom-select-wrapper")) setOpen(false);
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  return (
    <div className="custom-select-wrapper">
      <button className="custom-select-trigger" onClick={() => setOpen(!open)}>
        <span>{selected}</span>
        <Icon
          name="arrow_about"
          size={10}
          className={open ? "select-icon rotated" : "select-icon"}
        />
      </button>
      {open && (
        <ul className="custom-select-dropdown">
          {options.map((opt) => (
            <li
              key={opt}
              className={`custom-select-option ${opt === selected ? "active" : ""}`}
              onClick={() => { setSelected(opt); setOpen(false); }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// Panel lateral "Mi Cuenta" — vivía dentro del return de Header.jsx
function ProfileSlider({ alCerrar, darkMode, onToggleDarkMode, modoExploracion, alIniciarSesion, alCerrarSesion }) {
  return (
    <>
      <div className="slider-overlay" onClick={alCerrar}></div>
      <div className="slider-cuenta">

        <div className="slider-header">
          <h3 className="slider-title">Mi Cuenta</h3>
          <button className="slider-close" onClick={alCerrar}>×</button>
        </div>

        <div className="slider-body">
          {modoExploracion ? (
            /* ── MODO DEMO ── */
            <>
              <div className="slider-avatar slider-avatar--demo">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </div>
              <h3 className="slider-user-name">Modo Demo</h3>
              <p className="slider-user-role">Visitante</p>

              <div className="slider-demo-card">
                <p className="slider-demo-card-text">
                  Inicia sesión para acceder a tu perfil completo y todas las funciones
                </p>
                <button className="slider-demo-card-btn" onClick={alIniciarSesion}>
                  Iniciar sesión
                </button>
              </div>

              <div className="slider-options">
                <div className="option-row">
                  <span className="option-label">
                    Apariencia {darkMode ? "🌙" : "☀️"}
                  </span>
                  <label className="toggle-switch">
                    <input type="checkbox" checked={darkMode} onChange={onToggleDarkMode} />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </>
          ) : (
            /* ── MODO AUTENTICADO ── */
            <>
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="Gabriel Chumpitazi"
                className="slider-avatar"
              />
              <h3 className="slider-user-name">Gabriel Chumpitazi</h3>
              <p className="slider-user-role">Contador Senior</p>
              <p className="slider-user-email">gabriel@info.com</p>

              <button className="btn-ir-ficha">
                <span>Ir a mi ficha</span>
                <Icon name="exportar" size={18} />
              </button>

              <div className="slider-options">
                <div className="option-row">
                  <span className="option-label">Idioma</span>
                  <LanguageSelect />
                </div>

                <div className="option-link">
                  <span>Cambiar Contraseña</span>
                  <Icon name="arrow_right" size={10} />
                </div>

                <div className="option-row">
                  <span className="option-label">
                    Apariencia {darkMode ? "🌙" : "☀️"}
                  </span>
                  <label className="toggle-switch">
                    <input type="checkbox" checked={darkMode} onChange={onToggleDarkMode} />
                    <span className="toggle-slider"></span>
                  </label>
                </div>
              </div>
            </>
          )}
        </div>

        <div className="slider-actions">
          {!modoExploracion && (
            <>
              <button className="btn-guardar-cambios">Guardar Cambios</button>
              <button className="btn-cerrar-sesion" onClick={alCerrarSesion}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
                <span>Cerrar Sesión</span>
              </button>
            </>
          )}
        </div>

      </div>
    </>
  );
}

export default ProfileSlider;
