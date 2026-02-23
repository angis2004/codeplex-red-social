import React, { useState } from "react";
import ModalCrearEmpresa from "../components/dashboard/modals/ModalCrearEmpresa/ModalCrearEmpresa";

function ViewEmpresas() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="view-page">
      <div className="view-header-banner">
        <div>
          <h1 className="view-title">Mis Empresas</h1>
          <p className="view-subtitle">Administra todas tus empresas registradas</p>
        </div>
        <button className="view-btn-primary" onClick={() => setShowModal(true)}>
          + Nueva Empresa
        </button>
      </div>

      {/* Estado vacío — cuando no hay empresas */}
      <div className="view-empty-state">
        <div className="view-empty-icon">🏢</div>
        <h3 className="view-empty-title">No tienes empresas registradas</h3>
        <p className="view-empty-desc">
          Crea tu primera empresa para comenzar a trabajar. Podrás gestionar
          todos sus datos, facturación y configuración desde aquí.
        </p>
        <button className="view-btn-primary" onClick={() => setShowModal(true)}>
          + Crear primera empresa
        </button>
      </div>

      <ModalCrearEmpresa
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSuccess={(data) => {
          console.log("Empresa creada desde Vista Empresas:", data);
          setShowModal(false);
        }}
      />
    </div>
  );
}

export default ViewEmpresas;