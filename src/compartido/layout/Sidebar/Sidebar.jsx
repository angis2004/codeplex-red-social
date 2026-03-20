import React from "react";
import SidebarProfile from "../../../identidad/ui/perfil/SidebarProfile";
import SidebarMenu from "./SidebarMenu";
import "./Sidebar.css";

function Sidebar({ estaAbierto, alCerrar, vistaActiva, alNavegar, appsActivas = [] }) {
  const handleNavegar = (vista) => {
    alNavegar(vista);
    if (window.innerWidth < 768) {
      alCerrar();
    }
  };

  return (
    <>
      {estaAbierto && (
        <div className="sidebar-overlay active" onClick={alCerrar}></div>
      )}
      <aside className={`sidebar ${estaAbierto ? "open" : ""}`}>
        <SidebarProfile />
        <SidebarMenu
          vistaActiva={vistaActiva}
          alNavegar={handleNavegar}
          appsActivas={appsActivas}
        />
      </aside>
    </>
  );
}

export default Sidebar;
