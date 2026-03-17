import React, { useState } from "react";
import PestanasFeed from "./PestanasFeed";
import Publicacion from "./Publicacion";

// Datos mock — cuando conectes la API, esto vendrá de un hook o context
const MOCK_POST = {
  avatarImg: 12,
  author: "Gabriel Chumpitazi",
  time: "Hace 2 Horas",
  text: "🎉 ¡Nuevo tutorial sobre cómo declarar el IGV correctamente! Espero que les sirva.",
  hashtags: ["#Contabilidad", "#SUNAT"],
  videoSrc: "https://www.pexels.com/es-es/download/video/3692634/",
  videoPoster: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800",
  likeCount: 124,
};

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

function PublicacionesFeed({ isDemo, onLoginClick }) {
  const [activeTab, setActiveTab] = useState("post");

  return (
    <>
      <PestanasFeed activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "post" && <Publicacion post={MOCK_POST} isDemo={isDemo} onLoginClick={onLoginClick} />}

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
