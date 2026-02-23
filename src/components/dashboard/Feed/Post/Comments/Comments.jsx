import React from "react";

const MOCK_COMMENTS = [
  {
    img: 20,
    name: "María López",
    text: "Excelente tutorial! Muy claro y preciso 🙌",
    time: "Hace 1 hora",
  },
  {
    img: 25,
    name: "Juan Pérez",
    text: "Justo lo que necesitaba para mi declaración mensual 👏",
    time: "Hace 30 min",
  },
];

function Comment({ img, name, text, time }) {
  return (
    <div className="comment-item">
      <img
        src={`https://i.pravatar.cc/150?img=${img}`}
        alt={name}
        className="comment-avatar"
      />
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

function CommentInput() {
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
          placeholder="Escribe un comentario..."
          className="comment-input"
        />
        <button className="comment-send-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}

function Comments() {
  return (
    <div className="comments-section">
      {MOCK_COMMENTS.map((c) => (
        <Comment key={c.name} {...c} />
      ))}
      <CommentInput />
    </div>
  );
}

export default Comments;