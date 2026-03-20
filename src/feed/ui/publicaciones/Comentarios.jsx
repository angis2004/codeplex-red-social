import React, { useState, useRef, useEffect } from "react";
import { MOCK_COMMENTS, REACTIONS } from "./publicaciones.data";
import { useSesion } from "../../../identidad/aplicacion/SesionContext";
import Icon from "../../../compartido/Icon/Icon";

/* ── ID counter for comments ── */
let nextId = 100;
function genId() {
  return nextId++;
}

/* ── Mini Reaction Popup for comments ── */
function MiniReactionPopup({ onSelect, onMouseEnter, onMouseLeave }) {
  return (
    <div
      className="comment-reactions-popup"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {REACTIONS.map((reaction) => (
        <button
          key={reaction.label}
          className="comment-reaction-option"
          onClick={(e) => {
            e.stopPropagation();
            onSelect(reaction);
          }}
          title={reaction.label}
        >
          <Icon name={reaction.icon} size={18} />
        </button>
      ))}
    </div>
  );
}

/* ── Comment Menu (Edit/Delete) ── */
function CommentMenu({ onEdit, onDelete }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    }
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  return (
    <div className="comment-menu-wrapper" ref={ref}>
      <button
        className="comment-menu-btn"
        onClick={(e) => {
          e.stopPropagation();
          setOpen(!open);
        }}
      >
        &middot;&middot;&middot;
      </button>
      {open && (
        <div className="comment-menu-dropdown">
          <button
            className="comment-menu-item"
            onClick={() => {
              onEdit();
              setOpen(false);
            }}
          >
            Editar
          </button>
          <button
            className="comment-menu-item comment-menu-item--danger"
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
          >
            Eliminar
          </button>
        </div>
      )}
    </div>
  );
}

/* ── Single Comment ── */
function Comment({
  comment,
  currentUser,
  modoExploracion,
  comenzarAutenticacion,
  onReply,
  onEdit,
  onDelete,
  onReaction,
}) {
  const {
    id,
    img,
    name,
    text,
    time,
    avatarUrl,
    replies = [],
    reaction: activeReaction,
    reactionCount = 0,
    mentionedUser,
  } = comment;

  const [showReactions, setShowReactions] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(text);
  const [hovering, setHovering] = useState(false);

  const closeTimeoutRef = useRef(null);

  const isOwner =
    !modoExploracion && currentUser && currentUser.nombre === name;

  const handleMouseEnterLike = () => {
    if (modoExploracion) return;
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setShowReactions(true);
  };

  const handleMouseLeaveLike = () => {
    closeTimeoutRef.current = setTimeout(() => setShowReactions(false), 200);
  };

  const handleMouseEnterPopup = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  };

  const handleMouseLeavePopup = () => {
    closeTimeoutRef.current = setTimeout(() => setShowReactions(false), 150);
  };

  const handleSelectReaction = (reaction) => {
    onReaction(id, reaction);
    setShowReactions(false);
  };

  const handleLikeClick = () => {
    if (modoExploracion) {
      comenzarAutenticacion();
      return;
    }
    if (activeReaction) {
      onReaction(id, null); // toggle off
    } else {
      onReaction(id, REACTIONS[0]); // default "Me gusta"
    }
  };

  const handleReplySubmit = () => {
    const trimmed = replyText.trim();
    if (!trimmed) return;
    onReply(id, trimmed);
    setReplyText("");
    setShowReplyInput(false);
  };

  const handleReplyKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleReplySubmit();
    }
    if (e.key === "Escape") {
      setShowReplyInput(false);
      setReplyText("");
    }
  };

  const handleEditSave = () => {
    const trimmed = editText.trim();
    if (!trimmed) return;
    onEdit(id, trimmed);
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setEditText(text);
    setIsEditing(false);
  };

  const handleEditKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleEditSave();
    }
    if (e.key === "Escape") {
      handleEditCancel();
    }
  };

  const avatarSrc = avatarUrl || `https://i.pravatar.cc/150?img=${img}`;

  return (
    <div className="comment-thread">
      <div
        className="comment-item"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <img src={avatarSrc} alt={name} className="comment-avatar" />
        <div className="comment-bubble">
          <div className="comment-bubble-header">
            <div className="comment-user-name">{name}</div>
            {isOwner && hovering && (
              <CommentMenu
                onEdit={() => {
                  setEditText(text);
                  setIsEditing(true);
                }}
                onDelete={() => onDelete(id)}
              />
            )}
          </div>
          {isEditing ? (
            <div className="comment-edit-form">
              <input
                type="text"
                className="comment-edit-input"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleEditKeyDown}
                autoFocus
              />
              <div className="comment-edit-actions">
                <button
                  className="comment-edit-btn comment-edit-btn--save"
                  onClick={handleEditSave}
                >
                  Guardar
                </button>
                <button
                  className="comment-edit-btn comment-edit-btn--cancel"
                  onClick={handleEditCancel}
                >
                  Cancelar
                </button>
              </div>
            </div>
          ) : (
            <div className="comment-text">
              {mentionedUser && (
                <span className="comment-mention">{mentionedUser}</span>
              )}{" "}
              {text}
            </div>
          )}
          <div className="comment-actions">
            <span className="comment-time">{time}</span>
            <div
              className="comment-like-wrapper"
              onMouseEnter={handleMouseEnterLike}
              onMouseLeave={handleMouseLeaveLike}
            >
              <button
                className="comment-like-btn"
                onClick={handleLikeClick}
                style={
                  activeReaction ? { color: activeReaction.color } : undefined
                }
              >
                {activeReaction ? activeReaction.label : "Me gusta"}
              </button>
              {reactionCount > 0 && (
                <span
                  className="comment-reaction-count"
                  style={{ color: activeReaction?.color || "#7F0DF2" }}
                >
                  {reactionCount}
                </span>
              )}
              {!modoExploracion && showReactions && (
                <MiniReactionPopup
                  onSelect={handleSelectReaction}
                  onMouseEnter={handleMouseEnterPopup}
                  onMouseLeave={handleMouseLeavePopup}
                />
              )}
            </div>
            <button
              className="comment-like-btn"
              onClick={() => {
                if (modoExploracion) {
                  comenzarAutenticacion();
                  return;
                }
                setShowReplyInput(!showReplyInput);
                setReplyText("");
              }}
            >
              Responder
            </button>
          </div>
        </div>
      </div>

      {/* Nested replies */}
      {replies.length > 0 && (
        <div className="comment-replies">
          {replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              currentUser={currentUser}
              modoExploracion={modoExploracion}
              comenzarAutenticacion={comenzarAutenticacion}
              onReply={onReply}
              onEdit={onEdit}
              onDelete={onDelete}
              onReaction={onReaction}
            />
          ))}
        </div>
      )}

      {/* Reply input */}
      {showReplyInput && !modoExploracion && (
        <div className="comment-reply-input-row">
          <img
            src={currentUser?.avatar || "https://i.pravatar.cc/150?img=12"}
            alt={currentUser?.nombre || "Tu"}
            className="comment-avatar comment-avatar--reply"
          />
          <div className="comment-input-wrapper">
            <input
              type="text"
              className="comment-input"
              placeholder={`Responder a ${name}...`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={handleReplyKeyDown}
              autoFocus
            />
            <button className="comment-send-btn" onClick={handleReplySubmit}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function CommentInput({ onSend, modoExploracion, comenzarAutenticacion, currentUser }) {
  const [texto, setTexto] = useState("");

  const handleSend = () => {
    if (modoExploracion) {
      comenzarAutenticacion();
      return;
    }
    const trimmed = texto.trim();
    if (!trimmed) return;
    onSend(trimmed);
    setTexto("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="comment-input-row">
      <img
        src={currentUser?.avatar || "https://i.pravatar.cc/150?img=12"}
        alt={currentUser?.nombre || "Gabriel"}
        className="comment-avatar"
      />
      <div className="comment-input-wrapper">
        <input
          type="text"
          placeholder={
            modoExploracion
              ? "Inicia sesion para comentar..."
              : "Escribe un comentario..."
          }
          className="comment-input"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          onKeyDown={handleKeyDown}
          readOnly={modoExploracion}
          onClick={modoExploracion ? comenzarAutenticacion : undefined}
          style={modoExploracion ? { cursor: "not-allowed" } : undefined}
        />
        <button
          className="comment-send-btn"
          onClick={handleSend}
          style={
            modoExploracion
              ? { cursor: "not-allowed", opacity: 0.6 }
              : undefined
          }
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ── Helper: recursively find and update a comment by id ── */
function updateCommentById(comments, id, updater) {
  return comments.map((c) => {
    if (c.id === id) return updater(c);
    if (c.replies && c.replies.length > 0) {
      return { ...c, replies: updateCommentById(c.replies, id, updater) };
    }
    return c;
  });
}

function removeCommentById(comments, id) {
  return comments
    .filter((c) => c.id !== id)
    .map((c) => {
      if (c.replies && c.replies.length > 0) {
        return { ...c, replies: removeCommentById(c.replies, id) };
      }
      return c;
    });
}

function Comentarios({ visible }) {
  const { modoExploracion, comenzarAutenticacion, usuario } = useSesion();

  // Initialize mock comments with IDs and structure
  const [comentarios, setComentarios] = useState(() =>
    MOCK_COMMENTS.map((c) => ({
      ...c,
      id: genId(),
      replies: [],
      reaction: null,
      reactionCount: 0,
    }))
  );

  const handleSend = (texto) => {
    const nuevo = {
      id: genId(),
      img: 12,
      name: usuario?.nombre || "Gabriel Chumpitazi",
      text: texto,
      time: "Ahora",
      avatarUrl: usuario?.avatar || "https://i.pravatar.cc/150?img=12",
      replies: [],
      reaction: null,
      reactionCount: 0,
    };
    setComentarios((prev) => [...prev, nuevo]);
  };

  const handleReply = (parentId, texto) => {
    if (!texto.trim()) return;

    // Buscar el nombre del usuario al que se responde
    const findCommentName = (comments, id) => {
      for (const c of comments) {
        if (c.id === id) return c.name;
        if (c.replies?.length) {
          const found = findCommentName(c.replies, id);
          if (found) return found;
        }
      }
      return null;
    };

    const mentionedUser = findCommentName(comentarios, parentId);

    const reply = {
      id: genId(),
      img: 12,
      name: usuario?.nombre || "Gabriel Chumpitazi",
      text: texto.trim(),
      time: "Ahora",
      avatarUrl: usuario?.avatar || "https://i.pravatar.cc/150?img=12",
      replies: [],
      reaction: null,
      reactionCount: 0,
      mentionedUser,
    };

    setComentarios((prev) =>
      updateCommentById(prev, parentId, (c) => ({
        ...c,
        replies: [...(c.replies || []), reply],
      }))
    );
  };

  const handleEdit = (commentId, newText) => {
    setComentarios((prev) =>
      updateCommentById(prev, commentId, (c) => ({ ...c, text: newText }))
    );
  };

  const handleDelete = (commentId) => {
    setComentarios((prev) => removeCommentById(prev, commentId));
  };

  const handleReaction = (commentId, reaction) => {
    setComentarios((prev) =>
      updateCommentById(prev, commentId, (c) => {
        if (reaction === null) {
          // Toggle off
          return {
            ...c,
            reaction: null,
            reactionCount: Math.max(0, c.reactionCount - 1),
          };
        }
        if (c.reaction && c.reaction.label === reaction.label) {
          // Same reaction - toggle off
          return {
            ...c,
            reaction: null,
            reactionCount: Math.max(0, c.reactionCount - 1),
          };
        }
        // New reaction (or changing reaction)
        return {
          ...c,
          reaction,
          reactionCount: c.reaction ? c.reactionCount : c.reactionCount + 1,
        };
      })
    );
  };

  if (!visible) return null;

  return (
    <div className="comments-section">
      {comentarios.map((c) => (
        <Comment
          key={c.id}
          comment={c}
          currentUser={usuario}
          modoExploracion={modoExploracion}
          comenzarAutenticacion={comenzarAutenticacion}
          onReply={handleReply}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onReaction={handleReaction}
        />
      ))}
      <CommentInput
        onSend={handleSend}
        modoExploracion={modoExploracion}
        comenzarAutenticacion={comenzarAutenticacion}
        currentUser={usuario}
      />
    </div>
  );
}

export default Comentarios;
