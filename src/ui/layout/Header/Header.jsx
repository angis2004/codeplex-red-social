import React, { useState, useEffect, useRef } from "react";
import Icon from "../../Icon/Icon";
import ProfileSlider from "../../../identidad/cuenta/ProfileSlider";
import { useTheme } from "../useTheme";
import { useSesion } from "../../../identidad/sesion/SesionContext";
import "./Header.css";
import RegistroEmpresa from "../../../organizacion/empresas/RegistroEmpresa";
import IconoAplicacion from "../../../planes/aplicaciones/IconoAplicacion";


function Header({ alAlternarMenu, alNavegar, vistaActiva,
  itemsCarrito = [], totalCarrito = 0, alVerCarrito,
  misApps = [], appsActivas = [], alAlternarAppActiva, alSeleccionarTodasApps, alDeseleccionarTodasApps }) {
  const { modoExploracion, comenzarAutenticacion, cerrarSesion } = useSesion();
  const [showSlider, setShowSlider]             = useState(false);
  const [showModalEmpresa, setShowModalEmpresa] = useState(false);
  const [showMisApps, setShowMisApps]           = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();
  const headerWrapperRef = useRef(null);

  /* ── Cerrar dropdown al hacer clic fuera ── */
  useEffect(() => {
    if (!showMisApps) return;
    const handler = () => setShowMisApps(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [showMisApps]);

  const navBtnClass = (vista) =>
    `border px-[18px] py-2 rounded-[8px] cursor-pointer text-[14px] font-medium font-[inherit] transition-all duration-200 whitespace-nowrap ${
      vistaActiva === vista
        ? "bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] border-transparent text-white shadow-[0_2px_8px_rgba(127,13,242,0.3)] hover:border-transparent hover:text-white hover:-translate-y-px hover:shadow-[0_4px_12px_rgba(127,13,242,0.4)]"
        : "bg-transparent border-[var(--border-color)] text-[var(--text-dark)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]"
    }`;

  const row2BtnClass = (vista) =>
    `flex-1 h-9 px-[10px] rounded-[8px] text-[13px] font-medium cursor-pointer font-[inherit] flex items-center justify-center gap-[5px] transition-all duration-200 whitespace-nowrap ${
      vistaActiva === vista
        ? "bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] text-white border-transparent shadow-[0_2px_8px_rgba(127,13,242,0.25)] hover:text-white hover:border-transparent hover:shadow-[0_4px_12px_rgba(127,13,242,0.38)]"
        : "border border-[var(--border-color)] text-[var(--text-dark)] bg-transparent hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]"
    }`;

  return (
    <>
      <div className="fixed top-0 left-0 lg:left-[280px] right-0 z-[500] bg-[var(--white-color)]" ref={headerWrapperRef}>

        {/* ── Demo banner ── */}
        {modoExploracion && (
          <div className="flex items-center justify-center gap-[6px] bg-gradient-to-r from-[#f59e0b] to-[#f97316] text-white text-[11px] md:text-[13px] font-semibold py-[6px] px-3 md:py-[7px] md:px-6 tracking-[0.01em] text-center whitespace-nowrap overflow-hidden">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" style={{ verticalAlign: 'middle', flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Modo exploración — Inicia sesión para acceder a todo
          </div>
        )}

        {/* ── Fila 1 ── */}
        <header className="bg-[var(--white-color)] px-4 py-[10px] lg:px-6 lg:py-3 flex items-center gap-2 lg:gap-[10px] shadow-[0_1px_3px_rgba(0,0,0,0.08)] border-b border-[var(--border-color)]">

          {/* LEFT: hamburger + logo */}
          <div className="flex items-center gap-[10px] shrink-0">
            <button
              className="flex lg:hidden items-center justify-center bg-transparent border-none cursor-pointer p-[6px] rounded-[6px] text-[var(--text-dark)] transition-[background] duration-200 hover:bg-[var(--background-color)]"
              onClick={alAlternarMenu}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
            <div className="flex items-center gap-2 text-[20px] font-bold text-[var(--text-dark)] shrink-0">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--primary-color)] to-[var(--secondary-color)] flex items-center justify-center text-white font-bold text-[17px] shrink-0">
                C
              </div>
              <span className="[@media(max-width:600px)]:hidden">Codeplex</span>
            </div>
          </div>

          {/* CENTER: Mis Apps */}
          <div className="flex items-center flex-1 justify-center lg:flex-none lg:justify-start">
            <div className="relative" onClick={(e) => e.stopPropagation()}>
              <button
                className={`flex items-center gap-[7px] bg-transparent border border-[var(--border-color)] cursor-pointer px-[10px] lg:px-4 py-2 rounded-[8px] text-[14px] font-medium text-[var(--text-dark)] font-[inherit] transition-all duration-200 whitespace-nowrap hover:bg-[var(--hover-color)] hover:border-[var(--primary-color)] ${showMisApps ? "bg-[var(--background-color)]" : ""}`}
                onClick={() => setShowMisApps((v) => !v)}
              >
                <span className="flex items-center shrink-0">
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
                <span className="hidden lg:inline">Mis Aplicaciones</span>
                <span className="inline lg:hidden">Mis Apps</span>
                {misApps.length > 0 && (
                  <span className="inline-flex items-center justify-center min-w-[18px] h-[18px] px-[5px] bg-gradient-to-br from-[#7F0DF2] to-[#588CE5] text-white text-[10px] font-bold rounded-[9px] shrink-0">
                    {misApps.length}
                  </span>
                )}
                <svg
                  className={`text-[var(--text-dark)] opacity-55 shrink-0 transition-transform duration-200 ${showMisApps ? "rotate-180" : ""}`}
                  width="12" height="12" viewBox="0 0 24 24"
                  fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {/* ── Dropdown ── */}
              {showMisApps && (
                <div className="mis-apps-dropdown absolute top-[calc(100%+8px)] left-0 w-[290px] lg:w-[290px] bg-[var(--white-color)] border border-[var(--border-color)] rounded-[12px] shadow-[0_8px_24px_rgba(0,0,0,0.12)] z-[600] overflow-hidden">

                  <div className="px-4 pt-[14px] pb-[10px] text-[12px] font-bold text-[var(--text-gray)] uppercase tracking-[0.5px] border-b border-[var(--border-color)] flex items-center justify-between">
                    Mis Aplicaciones activas
                    <button
                      className="bg-transparent border-none cursor-pointer p-[2px] flex items-center justify-center text-[var(--text-gray)] rounded-[4px] transition-[background,color] duration-150 shrink-0 hover:bg-[var(--background-color)] hover:text-[var(--text-dark)]"
                      onClick={() => setShowMisApps(false)}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                      </svg>
                    </button>
                  </div>

                  {misApps.length === 0 ? (
                    <div className="px-4 py-5 text-[13px] text-[var(--text-gray)] text-center">
                      Aún no tienes aplicaciones activas
                    </div>
                  ) : (
                    <div className="py-[6px] max-h-[280px] overflow-y-auto [scrollbar-width:thin] [&::-webkit-scrollbar]:w-[4px] [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-[var(--border-color)] [&::-webkit-scrollbar-thumb]:rounded-[4px]">
                      {misApps.map((app) => {
                        const isActiva = appsActivas.some((a) => a.id === app.id);
                        return (
                          <button
                            key={app.id}
                            className={`w-full flex items-center gap-[10px] px-4 py-[10px] bg-transparent border-none cursor-pointer font-[inherit] text-left transition-[background] duration-150 hover:bg-[var(--background-color)] ${isActiva ? "bg-[rgba(127,13,242,0.04)]" : ""}`}
                            onClick={() => alAlternarAppActiva(app)}
                          >
                            <span className="w-9 h-9 rounded-[9px] overflow-hidden shrink-0 flex items-center justify-center [&_svg]:!w-9 [&_svg]:!h-9">
                              <IconoAplicacion tipo={app.icono} colorTema={app.colorTema} />
                            </span>
                            <span className="flex-1 flex flex-col gap-[2px] min-w-0">
                              <span className="text-[13px] font-semibold text-[var(--text-dark)] truncate">{app.nombre}</span>
                              <span className="text-[11px] text-[var(--text-gray)] truncate">
                                {app.publisher} · Plan {app.planDisplay || app.planSeleccionado}
                              </span>
                            </span>
                            <span className={`w-[18px] h-[18px] rounded-[5px] border-2 shrink-0 flex items-center justify-center transition-all duration-150 ${isActiva ? "bg-[#7F0DF2] border-[#7F0DF2]" : "border-[var(--border-color)] bg-transparent"}`}>
                              {isActiva && (
                                <svg width="10" height="10" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
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
                  <div className="flex gap-2 px-4 py-[10px] border-t border-[var(--border-color)]">
                    <button className="flex-1 py-[7px] px-[10px] rounded-[7px] text-[12px] font-semibold cursor-pointer font-[inherit] transition-all duration-150 bg-[var(--background-color)] border border-[var(--border-color)] text-[var(--text-dark)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]" onClick={alSeleccionarTodasApps}>
                      Seleccionar todas
                    </button>
                    <button className="flex-1 py-[7px] px-[10px] rounded-[7px] text-[12px] font-semibold cursor-pointer font-[inherit] transition-all duration-150 bg-[var(--background-color)] border border-[var(--border-color)] text-[var(--text-dark)] hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]" onClick={alDeseleccionarTodasApps}>
                      Deseleccionar
                    </button>
                  </div>

                  {/* Footer links */}
                  <div className="flex items-center gap-[6px] px-4 pt-[10px] pb-3 border-t border-[var(--border-color)]">
                    <button className="bg-transparent border-none cursor-pointer text-[12px] font-medium text-[var(--primary-color)] font-[inherit] p-0 transition-opacity duration-150 hover:opacity-75"
                      onClick={() => { alNavegar("aplicaciones"); setShowMisApps(false); }}>
                      Apps disponibles
                    </button>
                    <span className="text-[12px] text-[var(--text-gray)]">·</span>
                    <button className="bg-transparent border-none cursor-pointer text-[12px] font-medium text-[var(--primary-color)] font-[inherit] p-0 transition-opacity duration-150 hover:opacity-75"
                      onClick={() => { alNavegar("aplicaciones"); setShowMisApps(false); }}>
                      Todas en demo
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* DESKTOP NAV */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <button className="bg-transparent border border-[var(--border-color)] px-4 py-2 rounded-[8px] cursor-pointer flex items-center gap-[6px] text-[14px] text-[var(--text-dark)] font-[inherit] transition-all duration-200 whitespace-nowrap hover:border-[var(--primary-color)] hover:text-[var(--primary-color)]" onClick={() => setShowModalEmpresa(true)}>
              <span>+</span>
              <span>Agregar Empresa</span>
            </button>
            <button className={navBtnClass("red-social")} onClick={() => alNavegar("red-social")}>
              Red Social
            </button>
            <button className={navBtnClass("aplicaciones")} onClick={() => alNavegar("aplicaciones")}>
              Aplicaciones
            </button>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-[10px] lg:gap-[14px] ml-auto shrink-0">

            {/* Carrito — hidden on mobile, 4 responsive states */}
            {itemsCarrito.length > 0 && (
              <button className="hidden md:flex relative items-center shrink-0 bg-transparent border-none cursor-pointer p-0" onClick={alVerCarrito} title="Ver carrito">
                {/* Pill — desktop lg+ */}
                <span className="hidden lg:flex items-center gap-[7px] bg-[var(--primary-color)] text-white py-[7px] pl-[10px] pr-[14px] rounded-[20px] text-[13px] font-semibold whitespace-nowrap transition-opacity duration-200 hover:opacity-[0.88]">
                  <span className="relative flex items-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                      <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                      <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                    </svg>
                    <span className="absolute -top-[7px] -right-[8px] bg-[#534AB7] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border-[1.5px] border-white">
                      {itemsCarrito.length}
                    </span>
                  </span>
                  <span>{itemsCarrito.length} app{itemsCarrito.length > 1 ? 's' : ''}</span>
                  <span className="hidden xl:inline opacity-50">·</span>
                  <span className="hidden xl:inline opacity-90">S/{totalCarrito}/mes</span>
                </span>
                {/* Círculo — tablet md-lg */}
                <span className="flex lg:hidden relative w-9 h-9 rounded-full bg-[var(--primary-color)] items-center justify-center">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
                    <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                  </svg>
                  <span className="absolute -top-[3px] -right-[3px] bg-[#534AB7] text-white text-[9px] font-bold w-[17px] h-[17px] rounded-full flex items-center justify-center border-[1.5px] border-white">
                    {itemsCarrito.length}
                  </span>
                </span>
              </button>
            )}

            <button className="icon-btn hidden lg:flex w-[38px] h-[38px] rounded-full bg-[var(--background-color)] border-none cursor-pointer items-center justify-center text-[var(--text-dark)] transition-all duration-300 relative shrink-0 hover:bg-[var(--primary-color)] hover:text-white" title="Ayuda">
              <Icon name="ayuda" size={22} />
            </button>

            {!modoExploracion && (
              <button className="icon-btn has-notification w-[34px] h-[34px] lg:w-[38px] lg:h-[38px] rounded-full bg-[var(--background-color)] border-none cursor-pointer flex items-center justify-center text-[var(--text-dark)] transition-all duration-300 relative shrink-0 hover:bg-[var(--primary-color)] hover:text-white">
                <Icon name="notificaciones" size={22} />
              </button>
            )}

            {modoExploracion ? (
              <button
                className="bg-gradient-to-br from-[#7F0DF2] to-[#588CE5] text-white border-none px-[18px] py-[7px] rounded-[20px] text-[13px] font-bold cursor-pointer tracking-[0.02em] transition-[opacity,background] duration-150 hover:opacity-[0.88] [@media(max-width:767px)]:p-0 [@media(max-width:767px)]:rounded-full [@media(max-width:767px)]:w-[34px] [@media(max-width:767px)]:h-[34px] [@media(max-width:767px)]:bg-transparent [@media(max-width:767px)]:border-2 [@media(max-width:767px)]:border-[#7F0DF2] [@media(max-width:767px)]:text-[#7F0DF2] [@media(max-width:767px)]:flex [@media(max-width:767px)]:items-center [@media(max-width:767px)]:justify-center [@media(max-width:767px)]:hover:bg-[rgba(127,13,242,0.1)] [@media(max-width:767px)]:hover:opacity-100"
                onClick={comenzarAutenticacion}
              >
                <svg className="inline-block md:hidden" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
                </svg>
                <span className="hidden md:inline">Iniciar sesión</span>
              </button>
            ) : (
              <>
                <img
                  src="https://i.pravatar.cc/150?img=12"
                  alt="Gabriel Chumpitazi"
                  className="w-[34px] h-[34px] lg:w-[38px] lg:h-[38px] rounded-full cursor-pointer border-2 border-[var(--primary-color)] shrink-0 object-cover"
                  onClick={() => setShowSlider(true)}
                />
                <span
                  className="hidden lg:block text-[14px] font-semibold text-[var(--text-dark)] cursor-pointer whitespace-nowrap"
                  onClick={() => setShowSlider(true)}
                >
                  Gabriel Chumpitazi
                </span>
              </>
            )}
          </div>
        </header>

        {/* ── Fila 2: solo tablet + mobile ── */}
        <div className="flex lg:hidden bg-[var(--white-color)] border-b border-[var(--border-color)] px-4 py-[10px] gap-[10px] justify-between">
          <button className={row2BtnClass("__never__")} onClick={() => setShowModalEmpresa(true)}>
            + Agregar Empresa
          </button>
          <button className={row2BtnClass("red-social")} onClick={() => alNavegar("red-social")}>
            Red Social
          </button>
          <button className={row2BtnClass("aplicaciones")} onClick={() => alNavegar("aplicaciones")}>
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
