import React from "react";
import Icon from "../../../../common/Icon/Icon";
import ReactionPopup from "./ReactionPopup";
import { useReactions } from "../../../../../hooks/useReactions";

function PostActions({ initialLikeCount = 124 }) {
  const {
    liked,
    likeCount,
    showReactions,
    activeReaction,
    setShowReactions,
    handlers,
  } = useReactions(initialLikeCount);

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
            className={`post-react-btn ${liked ? "reacted" : ""}`}
            data-reaction={activeReaction?.label || ""}
            onMouseEnter={() => setShowReactions(true)}
            onMouseLeave={handlers.handleMouseLeaveButton}
            onTouchStart={handlers.handleTouchStart}
            onTouchEnd={handlers.handleTouchEnd}
            onClick={handlers.handleMainClick}
            style={{ color: activeReaction?.color || "#475569" }}
          >
            <Icon
              name={activeReaction?.icon || "like"}
              size={20}
              style={{ fill: activeReaction?.color || "#64748b" }}
            />
            <span>{activeReaction?.label || "Me gusta"}</span>
          </button>

          {showReactions && (
            <ReactionPopup
              onSelect={handlers.handleSelectReaction}
              onMouseEnter={handlers.handleMouseEnterPopup}
              onMouseLeave={handlers.handleMouseLeavePopup}
            />
          )}
        </div>

        <button className="post-react-btn">
          <Icon name="comment" size={20} />
          <span>Comentar</span>
        </button>

        <button className="post-react-btn">
          <Icon name="share" size={20} />
          <span>Compartir</span>
        </button>
      </div>
    </>
  );
}

export default PostActions;