import React from "react";
import Icon from "../../../compartido/Icon/Icon";
import PanelReacciones from "./PanelReacciones";
import { useReacciones } from "../../aplicacion/useReacciones";
import { useSesion } from "../../../identidad/aplicacion/SesionContext";

function AccionesPublicacion({ initialLikeCount = 124 }) {
  const { modoExploracion, comenzarAutenticacion } = useSesion();
  const {
    liked,
    likeCount,
    showReactions,
    activeReaction,
    setShowReactions,
    handlers,
  } = useReacciones(initialLikeCount);

  const demoStyle = modoExploracion ? { cursor: "not-allowed", opacity: 0.6 } : undefined;
  const demoTitle = modoExploracion ? "Inicia sesión para usar esta función" : undefined;

  return (
    <>
      {/* Avatares + contadores */}
      <div className="post-stats">
        <div className="post-stats-left">
          <div className="reaction-avatars">
            {[20, 25, 30].map((img) => (
              <img
                key={img}
                src={`https://i.pravatar.cc/150?img=${img}`}
                alt="Usuario"
                className="reaction-avatar-img"
              />
            ))}
          </div>
          <span className="reaction-count-text">{likeCount} reacciones</span>
        </div>
        <div className="post-stat-right">
          <span className="stat-link">18 comentarios</span>
          <span className="stat-link">5 compartidos</span>
        </div>
      </div>

      <div className="post-divider"></div>

      {/* Botones Me gusta / Comentar / Compartir */}
      <div className="post-action-row">
        <div className="post-react-btn-wrapper">
          <button
            className={`post-react-btn ${liked && !modoExploracion ? "reacted" : ""}`}
            data-reaction={activeReaction?.label || ""}
            onMouseEnter={modoExploracion ? undefined : () => setShowReactions(true)}
            onMouseLeave={modoExploracion ? undefined : handlers.handleMouseLeaveButton}
            onTouchStart={modoExploracion ? undefined : handlers.handleTouchStart}
            onTouchEnd={modoExploracion ? undefined : handlers.handleTouchEnd}
            onClick={modoExploracion ? comenzarAutenticacion : handlers.handleMainClick}
            style={modoExploracion ? demoStyle : { color: activeReaction?.color || "#475569" }}
            title={demoTitle}
          >
            <Icon
              name={activeReaction?.icon || "like"}
              size={20}
              style={{ fill: modoExploracion ? "#64748b" : (activeReaction?.color || "#64748b") }}
            />
            <span>{activeReaction?.label || "Me gusta"}</span>
          </button>

          {!modoExploracion && showReactions && (
            <PanelReacciones
              onSelect={handlers.handleSelectReaction}
              onMouseEnter={handlers.handleMouseEnterPopup}
              onMouseLeave={handlers.handleMouseLeavePopup}
            />
          )}
        </div>

        <button
          className="post-react-btn"
          onClick={modoExploracion ? comenzarAutenticacion : undefined}
          style={demoStyle}
          title={demoTitle}
        >
          <Icon name="comment" size={20} />
          <span>Comentar</span>
        </button>

        <button
          className="post-react-btn"
          onClick={modoExploracion ? comenzarAutenticacion : undefined}
          style={demoStyle}
          title={demoTitle}
        >
          <Icon name="share" size={20} />
          <span>Compartir</span>
        </button>
      </div>
    </>
  );
}

export default AccionesPublicacion;
