import React, { useState } from "react";
import Icon from "../../../compartido/Icon/Icon";
import { useSesion } from "../../../identidad/aplicacion/SesionContext";

const POST_TABS = [
  { id: "post",     icon: "post",     label: "Post" },
  { id: "videos",   icon: "videos",   label: "Videos" },
  { id: "encuesta", icon: "encuesta", label: "Encuesta" },
];

function CreadorPublicacion({ onPublicar }) {
  const { modoExploracion, comenzarAutenticacion, usuario } = useSesion();
  const [activeTab, setActiveTab] = useState("post");
  const [texto, setTexto] = useState("");
  const [publicando, setPublicando] = useState(false);

  const demoBlock = modoExploracion
    ? { onClick: comenzarAutenticacion, title: "Inicia sesión para usar esta función", style: { cursor: "not-allowed", opacity: 0.6 } }
    : {};

  const handlePublicar = () => {
    if (!texto.trim() || publicando) return;

    setPublicando(true);

    // Simula un pequeño delay como si fuera una llamada al backend
    setTimeout(() => {
      onPublicar(texto, usuario?.nombre, 12, activeTab);
      setTexto("");
      setPublicando(false);
    }, 400);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handlePublicar();
    }
  };

  return (
    <div className={`post-creator${modoExploracion ? " post-creator--demo" : ""}`}>
      <div className="post-creator-header">
        {modoExploracion ? (
          <div className="post-creator-avatar post-creator-avatar--demo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
        ) : (
          <img
            src={usuario?.avatar || "https://i.pravatar.cc/150?img=12"}
            alt={usuario?.nombre || "Usuario"}
            className="post-creator-avatar"
          />
        )}
        <input
          type="text"
          placeholder={modoExploracion ? "Inicia sesión para publicar..." : `¿Qué estas pensando, ${usuario?.nombre?.split(" ")[0] || ""}?`}
          className="post-input"
          value={modoExploracion ? "" : texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={!modoExploracion ? handleKeyDown : undefined}
          readOnly={modoExploracion}
          {...(modoExploracion ? { onClick: comenzarAutenticacion, style: { cursor: "not-allowed" } } : {})}
        />
      </div>
      <div className="post-actions">
        <div className="post-action-buttons">
          {POST_TABS.map(({ id, icon, label }) => (
            <button
              key={id}
              className={`post-action-btn ${activeTab === id ? "active" : ""}`}
              onClick={modoExploracion ? comenzarAutenticacion : () => setActiveTab(id)}
              title={modoExploracion ? "Inicia sesión para usar esta función" : undefined}
              style={modoExploracion ? { cursor: "not-allowed", opacity: 0.6 } : undefined}
            >
              <Icon name={icon} size={18} />
              <span>{label}</span>
            </button>
          ))}
        </div>
        <button
          className="btn-publicar"
          onClick={modoExploracion ? comenzarAutenticacion : handlePublicar}
          disabled={!modoExploracion && (!texto.trim() || publicando)}
          {...(modoExploracion ? demoBlock : {})}
        >
          {publicando ? "Publicando..." : "Publicar"}
        </button>
      </div>
    </div>
  );
}

export default CreadorPublicacion;
