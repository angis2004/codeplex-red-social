import React from "react";

function ViewColaboradores() {
  return (
    <div className="view-page">
      <div className="view-header-banner">
        <div>
          <h1 className="view-title">Invitar Colaboradores</h1>
          <p className="view-subtitle">Invita y gestiona a tus colaboradores</p>
        </div>
      </div>
      <div className="view-empty-state">
        <div className="view-empty-icon">&#129309;</div>
        <h3 className="view-empty-title">No tienes colaboradores aun</h3>
        <p className="view-empty-desc">Invita a tu equipo para trabajar juntos en el sistema.</p>
      </div>
    </div>
  );
}

export default ViewColaboradores;