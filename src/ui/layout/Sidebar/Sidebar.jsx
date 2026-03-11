import React from "react";
import SidebarProfile from "../../../identidad/perfil/SidebarProfile";
import SidebarMenu from "./SidebarMenu";
import "./Sidebar.css";

function Sidebar({ isOpen, onClose, vistaActiva, onNavegar }) {
  const handleNavegar = (vista) => {
    onNavegar(vista);
    if (window.innerWidth < 768) {
      onClose();
    }
  };

  return (
    <>
      {isOpen && (
        <div className="sidebar-overlay active" onClick={onClose}></div>
      )}
      <aside className={`sidebar ${isOpen ? "open" : ""}`}>
        <SidebarProfile />
        <SidebarMenu
          vistaActiva={vistaActiva}
          onNavegar={handleNavegar}
        />
      </aside>
    </>
  );
}

export default Sidebar;
