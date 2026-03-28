import React from "react";
import { useSesion } from "../sesion/SesionContext";

function SidebarProfile() {
  const { modoExploracion, usuario, comenzarAutenticacion } = useSesion();

  if (modoExploracion) {
    return (
      <div className="sidebar-profile sidebar-profile--guest">
        <div className="profile-avatar-guest">
          <svg width="30" height="30" viewBox="0 0 24 24" fill="none"
            stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="8" r="4" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
        </div>
        <p className="profile-guest-label">Sin sesión iniciada</p>
      </div>
    );
  }

  return (
    <div className="sidebar-profile">
      <img
        src={usuario.avatar}
        alt={usuario.nombre}
        className="profile-avatar"
      />
      <h3 className="profile-name">{usuario.nombre}</h3>
      <p className="profile-role">{usuario.rol}</p>
    </div>
  );
}

export default SidebarProfile;
