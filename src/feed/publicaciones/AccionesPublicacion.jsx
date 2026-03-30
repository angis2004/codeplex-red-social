import React from "react";
import Icon from "../../ui/Icon/Icon";
import PanelReacciones from "./PanelReacciones";
import { useReacciones } from "./useReacciones";
import { useSesion } from "../../identidad/sesion/SesionContext";

function AccionesPublicacion({ initialLikeCount = 124, onToggleComments, commentCount = 0 }) {
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
      <div className="flex justify-between items-center py-3 px-2 [@media(max-width:768px)]:flex-col [@media(max-width:768px)]:items-start [@media(max-width:768px)]:gap-[6px]">
        <div className="flex items-center gap-[10px]">
          {activeReaction && !modoExploracion ? (
            <div className="flex items-center gap-2 border-none outline-none">
              <Icon name={activeReaction.icon} size={20} color={activeReaction.color} />
              <span className="text-[14px] text-[var(--text-muted)] font-medium" style={{ color: activeReaction.color, fontWeight: 600 }}>
                {likeCount} reacciones
              </span>
            </div>
          ) : (
            <>
              <div className="flex mr-2">
                {[20, 25, 30].map((img, i) => (
                  <img
                    key={img}
                    src={`https://i.pravatar.cc/150?img=${img}`}
                    alt="Usuario"
                    className="w-6 h-6 rounded-full border-2 border-[var(--surface-color)] object-cover cursor-pointer transition-transform duration-200 hover:scale-125 hover:z-10"
                    style={{ marginLeft: i === 0 ? 0 : -8 }}
                  />
                ))}
              </div>
              <span className="text-[14px] text-[var(--text-muted)] font-medium">{likeCount} reacciones</span>
            </>
          )}
        </div>
        <div className="flex gap-4 [@media(max-width:768px)]:gap-[10px]">
          <span className="text-[14px] text-[var(--text-muted)] cursor-pointer transition-colors duration-300 hover:text-[var(--primary-color)]" onClick={onToggleComments} style={{ cursor: "pointer" }}>
            {commentCount > 0 ? `${commentCount} comentarios` : "18 comentarios"}
          </span>
          <span className="text-[14px] text-[var(--text-muted)] cursor-pointer transition-colors duration-300 hover:text-[var(--primary-color)]">5 compartidos</span>
        </div>
      </div>

      <div className="h-px bg-[var(--border-color)] my-1"></div>

      {/* Botones Me gusta / Comentar / Compartir — mantienen clase post-react-btn para ::before shimmer y nth-child colors */}
      <div className="grid grid-cols-3 gap-3 py-3 [@media(max-width:768px)]:gap-1">
        <div className="post-react-btn-wrapper">
          <button
            className={`post-react-btn ${liked && !modoExploracion ? "reacted" : ""}`}
            data-reaction={activeReaction?.label || ""}
            onMouseEnter={modoExploracion ? undefined : handlers.handleMouseEnterButton}
            onMouseLeave={modoExploracion ? undefined : handlers.handleMouseLeaveButton}
            onTouchStart={modoExploracion ? undefined : handlers.handleTouchStart}
            onTouchEnd={modoExploracion ? undefined : handlers.handleTouchEnd}
            onClick={modoExploracion ? comenzarAutenticacion : handlers.handleMainClick}
            style={modoExploracion ? demoStyle : activeReaction ? { color: activeReaction.color } : undefined}
            title={demoTitle}
          >
            <Icon name={activeReaction?.icon || "like"} size={20} color={activeReaction && !modoExploracion ? activeReaction.color : undefined} className="icon" />
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
          onClick={modoExploracion ? comenzarAutenticacion : () => { setShowReactions(false); onToggleComments(); }}
          style={demoStyle}
          title={demoTitle}
        >
          <Icon name="comment" size={20} className="icon" />
          <span>Comentar</span>
        </button>

        <button
          className="post-react-btn"
          onClick={modoExploracion ? comenzarAutenticacion : () => { setShowReactions(false); }}
          style={demoStyle}
          title={demoTitle}
        >
          <Icon name="share" size={20} className="icon" />
          <span>Compartir</span>
        </button>
      </div>
    </>
  );
}

export default AccionesPublicacion;
