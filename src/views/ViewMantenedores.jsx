import React from "react";

function ViewMantenedores() {
  return (
    <div className="view-page">
      <div className="view-header-banner">
        <div>
          <h1 className="view-title">Mantenedores</h1>
          <p className="view-subtitle">Configura tablas y parametros del sistema</p>
        </div>
      </div>
      <div className="view-empty-state">
        <div className="view-empty-icon">&#9881;</div>
        <h3 className="view-empty-title">Sin configuraciones aun</h3>
        <p className="view-empty-desc">Los mantenedores del sistema apareceran aqui.</p>
      </div>
    </div>
  );
}

export default ViewMantenedores;