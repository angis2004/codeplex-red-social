import React, { useState, useEffect } from "react";
import Icon from "../../../common/Icon/Icon";

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
function ProfileSlider({ onClose, darkMode, onToggleDarkMode }) {
  return (
    <>
      <div className="slider-overlay" onClick={onClose}></div>
      <div className="slider-cuenta">

        <div className="slider-header">
          <h3 className="slider-title">Mi Cuenta</h3>
          <button className="slider-close" onClick={onClose}>×</button>
        </div>

        <div className="slider-body">
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
                <input
                  type="checkbox"
                  checked={darkMode}
                  onChange={onToggleDarkMode}
                />
                <span className="toggle-slider"></span>
              </label>
            </div>
          </div>
        </div>

        <div className="slider-actions">
          <button className="btn-guardar-cambios">Guardar Cambios</button>
          <button className="btn-cerrar-sesion">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            <span>Cerrar Sesión</span>
          </button>
        </div>

      </div>
    </>
  );
}

export default ProfileSlider;