import React, { useState } from "react";
import { MOCK_COMMENTS } from "./publicaciones.data";
import { useSesion } from "../../../identidad/aplicacion/SesionContext";

function Comment({ img, name, text, time, avatarUrl }) {
  return (
    <div className="comment-item">
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className="comment-avatar" />
      ) : (
        <img
          src={`https://i.pravatar.cc/150?img=${img}`}
          alt={name}
          className="comment-avatar"
        />
      )}
      <div className="comment-bubble">
        <div className="comment-user-name">{name}</div>
        <div className="comment-text">{text}</div>
        <div className="comment-actions">
          <span className="comment-time">{time}</span>
          <button className="comment-like-btn">Me gusta</button>
          <button className="comment-like-btn">Responder</button>
        </div>
      </div>
    </div>
  );
}

function CommentInput({ onSend, modoExploracion, comenzarAutenticacion }) {
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
        src="https://i.pravatar.cc/150?img=12"
        alt="Gabriel"
        className="comment-avatar"
      />
      <div className="comment-input-wrapper">
        <input
          type="text"
          placeholder={modoExploracion ? "Inicia sesión para comentar..." : "Escribe un comentario..."}
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
          style={modoExploracion ? { cursor: "not-allowed", opacity: 0.6 } : undefined}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Comentarios({ visible }) {
  const { modoExploracion, comenzarAutenticacion, usuario } = useSesion();
  const [comentarios, setComentarios] = useState(MOCK_COMMENTS);

  const handleSend = (texto) => {
    const nuevo = {
      img: 12,
      name: usuario?.nombre || "Gabriel Chumpitazi",
      text: texto,
      time: "Ahora",
      avatarUrl: usuario?.avatar || "https://i.pravatar.cc/150?img=12",
    };
    setComentarios((prev) => [...prev, nuevo]);
  };

  if (!visible) return null;

  return (
    <div className="comments-section">
      {comentarios.map((c, idx) => (
        <Comment key={`${c.name}-${idx}`} {...c} />
      ))}
      <CommentInput
        onSend={handleSend}
        modoExploracion={modoExploracion}
        comenzarAutenticacion={comenzarAutenticacion}
      />
    </div>
  );
}

export default Comentarios;
