import React, { useState } from "react";
import Icon from "../../common/Icon/Icon";
import ProfileSlider from "./ProfileSlider/ProfileSlider";
import { useTheme } from "../../../hooks/useTheme";
import "../../../styles/Header.css";
import ModalCrearEmpresa from "../../dashboard/modals/ModalCrearEmpresa/ModalCrearEmpresa";

function Header({ onMenuToggle, onNavegar }) {
  const [showSlider, setShowSlider] = useState(false);
  const [showModalEmpresa, setShowModalEmpresa] = useState(false);
  const { darkMode, toggleDarkMode } = useTheme();

  return (
    <>
      {/* ── WRAPPER FIJO ── */}
      <div className="header-wrapper">
        <header className="header">
          <div className="header-left">
            <button className="menu-toggle" onClick={onMenuToggle}>☰</button>

            <div className="logo">
              <div className="logo-icon">C</div>
              <span>Codeplex</span>
            </div>

            <button
              className="btn-add-company"
              onClick={() => setShowModalEmpresa(true)}
            >
              <span>+</span>
              <span>Add Empresa</span>
            </button>

            <button
              className="btn-red-social"
              onClick={() => onNavegar("red-social")}
            >
              Red Social
            </button>
          </div>

          <div className="header-right">
            <button className="btn-aplicaciones">Aplicaciones</button>

            <button className="icon-btn" title="Ayuda">
              <Icon name="ayuda" size={25} />
            </button>

            <button className="icon-btn has-notification">
              <Icon name="notificaciones" size={25} />
            </button>

            <img
              src="https://i.pravatar.cc/150?img=12"
              alt="Gabriel Chumpitazi"
              className="user-avatar"
              onClick={() => setShowSlider(true)}
            />
            <span className="user-name" onClick={() => setShowSlider(true)}>
              Gabriel Chumpitazi
            </span>
          </div>
        </header>

        {/* ── FILA 2: SOLO MOBILE ── */}
        <div className="header-row2">
          <button
            className="header-row2-btn"
            onClick={() => setShowModalEmpresa(true)}
          >
            Agregar Empresa
          </button>
          <button
            className="header-row2-btn header-row2-btn--primary"
            onClick={() => onNavegar("red-social")}
          >
            Red Social
          </button>
          <button
            className="header-row2-btn"
            onClick={() => onNavegar("aplicaciones")}
          >
            Aplicaciones
          </button>
        </div>
      </div>

      {/* ✅ SPACER — empuja el dashboard hacia abajo según altura del header */}
      <div className="header-spacer" />

      {showSlider && (
        <ProfileSlider
          onClose={() => setShowSlider(false)}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
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