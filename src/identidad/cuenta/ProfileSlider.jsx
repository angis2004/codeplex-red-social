import React, { useState, useEffect } from "react";
import Icon from "../../ui/Icon/Icon";
import { useSesion } from "../sesion/SesionContext";

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
    <div className="custom-select-wrapper relative min-w-[110px]">
      <button
        className="w-full flex items-center justify-between gap-2 px-[10px] py-[6px] border border-[var(--border-color)] rounded-[6px] text-[13px] text-[var(--text-dark)] bg-[var(--white-color)] cursor-pointer outline-none focus:border-[var(--primary-color)]"
        onClick={() => setOpen(!open)}
      >
        <span>{selected}</span>
        <Icon
          name="arrow_about"
          size={10}
          className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>
      {open && (
        <ul className="absolute top-[calc(100%+4px)] left-0 right-0 bg-[var(--white-color)] border border-[var(--border-color)] rounded-[6px] overflow-hidden z-[200] list-none m-0 p-0 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
          {options.map((opt) => (
            <li
              key={opt}
              className={`px-[10px] py-2 text-[13px] cursor-pointer transition-[background] duration-150 ${opt === selected ? "bg-[var(--primary-color)] text-white" : "text-[var(--text-dark)] hover:bg-[var(--primary-color)] hover:text-white"}`}
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

function ProfileSlider({ alCerrar, darkMode, onToggleDarkMode, alIniciarSesion, alCerrarSesion }) {
  const { modoExploracion, comenzarAutenticacion, cerrarSesion: cerrarSesionCtx } = useSesion();
  const handleIniciarSesion = alIniciarSesion ?? comenzarAutenticacion;
  const handleCerrarSesion  = alCerrarSesion  ?? cerrarSesionCtx;

  return (
    <>
      <div className="slider-overlay fixed inset-0 bg-[rgba(0,0,0,0.5)] z-[1000]" onClick={alCerrar} />
      <div className="slider-cuenta fixed top-0 right-0 w-full [@media(min-width:481px)]:w-[300px] h-screen bg-[var(--white-color)] shadow-[-2px_0_20px_rgba(0,0,0,0.15)] flex flex-col z-[1001] overflow-y-auto">

        {/* Header */}
        <div className="px-5 py-[18px] text-white flex items-center justify-between shrink-0" style={{ background: 'var(--gradient-primary)' }}>
          <h3 className="text-[18px] font-semibold m-0">Mi Cuenta</h3>
          <button
            className="bg-transparent border-none text-white text-[22px] cursor-pointer w-7 h-7 flex items-center justify-center rounded-[5px] transition-[background] duration-300 leading-none hover:bg-[rgba(255,255,255,0.2)]"
            onClick={alCerrar}
          >
            ×
          </button>
        </div>

        {/* Body */}
        <div className="px-5 pt-6 pb-4 text-center shrink-0 bg-[var(--white-color)]">
          {modoExploracion ? (
            <>
              <div className="w-20 h-20 rounded-full bg-[var(--background-color)] border-2 border-[var(--border-color)] flex items-center justify-center mx-auto mb-[10px]">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
                  <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
              </div>
              <h3 className="text-[17px] font-bold text-[var(--text-dark)] mb-1">Modo Demo</h3>
              <p className="text-[14px] text-[var(--primary-color)] mb-1 font-medium">Visitante</p>

              <div className="bg-gradient-to-br from-[#7F0DF2] to-[#588CE5] rounded-[12px] p-4 mt-[14px] mb-2 text-center">
                <p className="text-[rgba(255,255,255,0.9)] text-[13px] leading-[1.5] m-0 mb-3">
                  Inicia sesión para acceder a tu perfil completo y todas las funciones
                </p>
                <button
                  className="bg-[var(--surface-color)] text-[#7F0DF2] border-none px-5 py-2 rounded-[20px] text-[13px] font-bold cursor-pointer transition-opacity duration-150 hover:opacity-[0.85]"
                  onClick={handleIniciarSesion}
                >
                  Iniciar sesión
                </button>
              </div>

              <div className="flex flex-col gap-0 border-t border-[var(--border-color)] mt-2">
                <div className="flex justify-between items-center py-[14px] border-b border-[var(--border-color)]">
                  <span className="text-[14px] text-[var(--text-dark)] font-medium">
                    Apariencia {darkMode ? "🌙" : "☀️"}
                  </span>
                  <label className="toggle-switch">
                    <input type="checkbox" checked={darkMode} onChange={onToggleDarkMode} />
                    <span className="toggle-slider" />
                  </label>
                </div>
              </div>
            </>
          ) : (
            <>
              <img
                src="https://i.pravatar.cc/150?img=12"
                alt="Gabriel Chumpitazi"
                className="w-[90px] h-[90px] rounded-full mx-auto mb-[14px] border-[3px] border-[var(--primary-color)] block"
              />
              <h3 className="text-[17px] font-bold text-[var(--text-dark)] mb-1">Gabriel Chumpitazi</h3>
              <p className="text-[14px] text-[var(--primary-color)] mb-1 font-medium">Contador Senior</p>
              <p className="text-[13px] text-[var(--text-muted)] mb-4">gabriel@info.com</p>

              <button className="bg-transparent border border-[var(--border-color)] py-[9px] px-5 rounded-[8px] text-[var(--text-dark)] text-[14px] cursor-pointer inline-flex items-center justify-center gap-2 mb-5 transition-all duration-300 w-full hover:bg-[var(--background-color)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]">
                <span>Ir a mi ficha</span>
                <Icon name="exportar" size={18} />
              </button>

              <div className="flex flex-col gap-0 border-t border-[var(--border-color)]">
                <div className="flex justify-between items-center py-[14px] border-b border-[var(--border-color)]">
                  <span className="text-[14px] text-[var(--text-dark)] font-medium">Idioma</span>
                  <LanguageSelect />
                </div>

                <div className="flex justify-between items-center py-[14px] text-[var(--text-dark)] text-[14px] font-medium cursor-pointer transition-[color] duration-300 border-b border-[var(--border-color)] hover:text-[var(--primary-color)]">
                  <span>Cambiar Contraseña</span>
                  <Icon name="arrow_right" size={10} />
                </div>

                <div className="flex justify-between items-center py-[14px] border-b border-[var(--border-color)]">
                  <span className="text-[14px] text-[var(--text-dark)] font-medium">
                    Apariencia {darkMode ? "🌙" : "☀️"}
                  </span>
                  <label className="toggle-switch">
                    <input type="checkbox" checked={darkMode} onChange={onToggleDarkMode} />
                    <span className="toggle-slider" />
                  </label>
                </div>
              </div>
            </>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-[10px] p-5 shrink-0 bg-[var(--white-color)]">
          {!modoExploracion && (
            <>
              <button
                className="border-none p-[13px] rounded-[10px] text-white font-semibold text-[15px] cursor-pointer transition-all duration-300 w-full hover:-translate-y-[2px] hover:shadow-[0_4px_15px_rgba(127,13,242,0.35)]"
                style={{ background: 'var(--gradient-primary)' }}
              >
                Guardar Cambios
              </button>
              <button
                className="bg-transparent border-[1.5px] border-[var(--error-color)] p-[13px] rounded-[10px] text-[var(--error-color)] font-semibold text-[15px] cursor-pointer flex items-center justify-center gap-2 transition-all duration-300 w-full hover:bg-[var(--error-color)] hover:text-white"
                onClick={handleCerrarSesion}
              >
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
