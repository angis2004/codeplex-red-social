import React, { useState } from "react";
import PestanasFeed from "./PestanasFeed";
import Publicacion from "./Publicacion";
import { MOCK_POST } from "./publicaciones.data";

function EmptyState({ icon, title, description }) {
  return (
    <div className="post-card">
      <div className="empty-state" style={{ textAlign: "center", padding: "60px 20px" }}>
        <div style={{ fontSize: "64px", marginBottom: "16px" }}>{icon}</div>
        <h3 style={{ color: "var(--text-dark)", marginBottom: "8px" }}>{title}</h3>
        <p style={{ color: "var(--sidebar-text)", fontSize: "14px" }}>{description}</p>
      </div>
    </div>
  );
}

function PublicacionesFeed() {
  const [activeTab, setActiveTab] = useState("post");

  return (
    <>
      <PestanasFeed activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "post" && <Publicacion post={MOCK_POST} />}

      {activeTab === "videos" && (
        <EmptyState
          icon="🎥"
          title="No hay videos aún"
          description="Los videos compartidos aparecerán aquí"
        />
      )}

      {activeTab === "noticias" && (
        <EmptyState
          icon="📰"
          title="No hay noticias aún"
          description="Las noticias más recientes aparecerán aquí"
        />
      )}
    </>
  );
}

export default PublicacionesFeed;
