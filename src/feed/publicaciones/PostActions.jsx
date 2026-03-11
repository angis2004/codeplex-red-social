import React from "react";
import Icon from "../../ui/Icon/Icon";
import ReactionPopup from "./ReactionPopup";
import { useReactions } from "../reacciones/useReactions";

function PostActions({ initialLikeCount = 124, isDemo, onLoginClick }) {
  const {
    liked,
    likeCount,
    showReactions,
    activeReaction,
    setShowReactions,
    handlers,
  } = useReactions(initialLikeCount);

  const demoStyle = isDemo ? { cursor: "not-allowed", opacity: 0.6 } : undefined;
  const demoTitle = isDemo ? "Inicia sesión para usar esta función" : undefined;

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
            className={`post-react-btn ${liked && !isDemo ? "reacted" : ""}`}
            data-reaction={activeReaction?.label || ""}
            onMouseEnter={isDemo ? undefined : () => setShowReactions(true)}
            onMouseLeave={isDemo ? undefined : handlers.handleMouseLeaveButton}
            onTouchStart={isDemo ? undefined : handlers.handleTouchStart}
            onTouchEnd={isDemo ? undefined : handlers.handleTouchEnd}
            onClick={isDemo ? onLoginClick : handlers.handleMainClick}
            style={isDemo ? demoStyle : { color: activeReaction?.color || "#475569" }}
            title={demoTitle}
          >
            <Icon
              name={activeReaction?.icon || "like"}
              size={20}
              style={{ fill: isDemo ? "#64748b" : (activeReaction?.color || "#64748b") }}
            />
            <span>{activeReaction?.label || "Me gusta"}</span>
          </button>

          {!isDemo && showReactions && (
            <ReactionPopup
              onSelect={handlers.handleSelectReaction}
              onMouseEnter={handlers.handleMouseEnterPopup}
              onMouseLeave={handlers.handleMouseLeavePopup}
            />
          )}
        </div>

        <button
          className="post-react-btn"
          onClick={isDemo ? onLoginClick : undefined}
          style={demoStyle}
          title={demoTitle}
        >
          <Icon name="comment" size={20} />
          <span>Comentar</span>
        </button>

        <button
          className="post-react-btn"
          onClick={isDemo ? onLoginClick : undefined}
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

export default PostActions;
