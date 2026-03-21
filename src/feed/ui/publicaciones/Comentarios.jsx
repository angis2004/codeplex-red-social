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
          <Icon name={reaction.icon} size={18} color={reaction.color} />
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
        title="Editar o eliminar"
      >
        {/* Meatball menu icon (⋯) */}
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="5" cy="12" r="2.5" />
          <circle cx="12" cy="12" r="2.5" />
          <circle cx="19" cy="12" r="2.5" />
        </svg>
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
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
            </svg>
            Editar
          </button>
          <button
            className="comment-menu-item comment-menu-item--danger"
            onClick={() => {
              onDelete();
              setOpen(false);
            }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="3 6 5 6 21 6" />
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
            </svg>
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
        <div className="comment-content">
          <div className="comment-bubble-row">
            <div className="comment-bubble">
              <div className="comment-bubble-header">
                <div className="comment-user-name">{name}</div>
              </div>
              {isEditing ? (
                <div className="comment-edit-form">
                  <div className="comment-edit-container">
                    <textarea
                      className="comment-edit-textarea"
                      value={editText}
                      onChange={(e) => {
                        setEditText(e.target.value);
                        e.target.style.height = "auto";
                        e.target.style.height = e.target.scrollHeight + "px";
                      }}
                      onKeyDown={handleEditKeyDown}
                      autoFocus
                      ref={(el) => {
                        if (el) {
                          el.style.height = "auto";
                          el.style.height = el.scrollHeight + "px";
                          el.selectionStart = el.value.length;
                          el.selectionEnd = el.value.length;
                        }
                      }}
                      rows={1}
                    />
                    <div className="comment-edit-bottom">
                      <CommentMediaIcons />
                      <button className="comment-edit-send" onClick={handleEditSave}>
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="22" y1="2" x2="11" y2="13" />
                          <polygon points="22 2 15 22 11 13 2 9 22 2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <span className="comment-edit-hint">
                    Pulsa "Esc" para{" "}
                    <button className="comment-edit-cancel" onClick={handleEditCancel}>
                      cancelar
                    </button>.
                  </span>
                </div>
              ) : (
                <div className="comment-text-row">
                  <div className="comment-text">
                    {mentionedUser && (
                      <span className="comment-mention">{mentionedUser}</span>
                    )}{" "}
                    {text}
                  </div>
                </div>
              )}
            </div>
            {isOwner && (
              <CommentMenu
                onEdit={() => {
                  setEditText(text);
                  setIsEditing(true);
                }}
                onDelete={() => onDelete(id)}
              />
            )}
          </div>
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
          <div className="comment-input-container">
            <input
              type="text"
              className="comment-input"
              placeholder={`Responder a ${name}...`}
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              onKeyDown={handleReplyKeyDown}
              autoFocus
            />
            <div className="comment-input-bottom">
              <CommentMediaIcons />
              <button className="comment-send-btn" onClick={handleReplySubmit}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Íconos de acción (emoji, foto, cámara, gif, sticker) ── */
function CommentMediaIcons() {
  return (
    <div className="comment-media-icons">
      <button className="comment-media-btn" title="Emoji" disabled>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="12" cy="12" r="10" />
          <path d="M8 14s1.5 2 4 2 4-2 4-2" />
          <line x1="9" y1="9" x2="9.01" y2="9" strokeWidth="3" strokeLinecap="round" />
          <line x1="15" y1="9" x2="15.01" y2="9" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </button>
      <button className="comment-media-btn" title="Foto" disabled>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
          <circle cx="8.5" cy="8.5" r="1.5" />
          <polyline points="21 15 16 10 5 21" />
        </svg>
      </button>
      <button className="comment-media-btn" title="GIF" disabled>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="2" y="4" width="20" height="16" rx="3" />
          <text x="12" y="15" textAnchor="middle" fill="currentColor" stroke="none" fontSize="8" fontWeight="700">GIF</text>
        </svg>
      </button>
      <button className="comment-media-btn" title="Sticker" disabled>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2a10 10 0 1 0 10 10h-10V2z" />
          <path d="M12 2v10h10" />
        </svg>
      </button>
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
      <div className="comment-input-container">
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
        <div className="comment-input-bottom">
          <CommentMediaIcons />
          <button
            className="comment-send-btn"
            onClick={handleSend}
            style={
              modoExploracion
                ? { cursor: "not-allowed", opacity: 0.6 }
                : undefined
            }
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
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
