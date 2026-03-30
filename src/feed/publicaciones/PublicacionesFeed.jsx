import React, { useState } from "react";
import PestanasFeed from "./PestanasFeed";
import Publicacion from "./Publicacion";

function EmptyState({ icon, title, description }) {
  return (
    <div className="bg-[var(--white-color)] px-8 py-7 rounded-[15px] shadow-[0_2px_8px_rgba(0,0,0,0.05)] mb-5">
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <div style={{ fontSize: "64px", marginBottom: "16px" }}>{icon}</div>
        <h3 style={{ color: "var(--text-dark)", marginBottom: "8px" }}>{title}</h3>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>{description}</p>
      </div>
    </div>
  );
}

function PublicacionesFeed({ publicaciones, obtenerPorTipo, alVerPerfil }) {
  const [activeTab, setActiveTab] = useState("post");

  const postsFiltrados = obtenerPorTipo(activeTab);

  return (
    <>
      <PestanasFeed activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "post" && (
        postsFiltrados.length > 0
          ? postsFiltrados.map((post) => <Publicacion key={post.id} post={post} alVerPerfil={alVerPerfil} />)
          : <EmptyState icon="📝" title="No hay publicaciones aún" description="¡Sé el primero en publicar algo!" />
      )}

      {activeTab === "videos" && (
        <EmptyState icon="🎥" title="No hay videos aún" description="Los videos compartidos aparecerán aquí" />
      )}

      {activeTab === "noticias" && (
        <EmptyState icon="📰" title="No hay noticias aún" description="Las noticias más recientes aparecerán aquí" />
      )}
    </>
  );
}

export default PublicacionesFeed;
