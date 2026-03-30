import React from "react";
import { useSesion } from "../sesion/SesionContext";

function SidebarProfile() {
  const { modoExploracion, usuario, comenzarAutenticacion } = useSesion();

  if (modoExploracion) {
    return (
      <div className="px-4 py-5 flex flex-col items-center gap-[10px]">
        <div className="w-[72px] h-[72px] rounded-full bg-gradient-to-br from-[#7F0DF2] to-[#5B21B6] flex items-center justify-center shadow-[0_4px_16px_rgba(127,13,242,0.3)]">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </div>
        <p className="text-[12px] text-[var(--text-gray)] m-0 tracking-[0.01em]">Sin sesión iniciada</p>
      </div>
    );
  }

  return (
    <div className="text-center px-[15px] pb-5 md:px-5 md:pb-[30px] border-b border-[var(--border-color)]">
      <img
        src={usuario.avatar}
        alt={usuario.nombre}
        className="w-[70px] h-[70px] md:w-20 md:h-20 rounded-full mx-auto mb-4 border-[3px] border-[var(--primary-color)]"
      />
      <h3 className="text-base font-semibold text-[var(--text-dark)] mb-[5px]">{usuario.nombre}</h3>
      <p className="text-[14px] text-[var(--text-muted)]">{usuario.rol}</p>
    </div>
  );
}

export default SidebarProfile;
