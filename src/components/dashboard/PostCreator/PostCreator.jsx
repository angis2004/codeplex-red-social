import React, { useState } from "react";
import Icon from "../../common/Icon/Icon";

const POST_TABS = [
  { id: "post",     icon: "post",     label: "Post" },
  { id: "videos",   icon: "videos",   label: "Videos" },
  { id: "encuesta", icon: "encuesta", label: "Encuesta" },
];

function PostCreator({ isDemo, onLoginClick }) {
  const [activeTab, setActiveTab] = useState("post");

  const demoBlock = isDemo
    ? { onClick: onLoginClick, title: "Inicia sesión para usar esta función", style: { cursor: "not-allowed", opacity: 0.6 } }
    : {};

  return (
    <div className={`post-creator${isDemo ? " post-creator--demo" : ""}`}>
      <div className="post-creator-header">
        {isDemo ? (
          <div className="post-creator-avatar post-creator-avatar--demo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
              <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
          </div>
        ) : (
          <img
            src="https://i.pravatar.cc/150?img=12"
            alt="Gabriel"
            className="post-creator-avatar"
          />
        )}
        <input
          type="text"
          placeholder={isDemo ? "Inicia sesión para publicar..." : "¿Qué estas pensando, Gabriel ?"}
          className="post-input"
          readOnly={isDemo}
          {...(isDemo ? { onClick: onLoginClick, style: { cursor: "not-allowed" } } : {})}
        />
      </div>
      <div className="post-actions">
        <div className="post-action-buttons">
          {POST_TABS.map(({ id, icon, label }) => (
            <button
              key={id}
              className={`post-action-btn ${activeTab === id ? "active" : ""}`}
              onClick={isDemo ? onLoginClick : () => setActiveTab(id)}
              title={isDemo ? "Inicia sesión para usar esta función" : undefined}
              style={isDemo ? { cursor: "not-allowed", opacity: 0.6 } : undefined}
            >
              <Icon name={icon} size={18} />
              <span>{label}</span>
            </button>
          ))}
        </div>
        <button
          className="btn-publicar"
          {...(isDemo ? demoBlock : {})}
        >
          Publicar
        </button>
      </div>
    </div>
  );
}

export default PostCreator;