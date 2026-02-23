import React, { useState } from "react";
import Icon from "../../common/Icon/Icon";

const POST_TABS = [
  { id: "post",     icon: "post",     label: "Post" },
  { id: "videos",   icon: "videos",   label: "Videos" },
  { id: "encuesta", icon: "encuesta", label: "Encuesta" },
];

function PostCreator() {
  const [activeTab, setActiveTab] = useState("post");

  return (
    <div className="post-creator">
      <div className="post-creator-header">
        <img
          src="https://i.pravatar.cc/150?img=12"
          alt="Gabriel"
          className="post-creator-avatar"
        />
        <input
          type="text"
          placeholder="¿Qué estas pensando, Gabriel ?"
          className="post-input"
        />
      </div>
      <div className="post-actions">
        <div className="post-action-buttons">
          {POST_TABS.map(({ id, icon, label }) => (
            <button
              key={id}
              className={`post-action-btn ${activeTab === id ? "active" : ""}`}
              onClick={() => setActiveTab(id)}
            >
              <Icon name={icon} size={18} />
              <span>{label}</span>
            </button>
          ))}
        </div>
        <button className="btn-publicar">Publicar</button>
      </div>
    </div>
  );
}

export default PostCreator;