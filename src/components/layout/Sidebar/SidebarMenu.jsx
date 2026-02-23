import React from "react";
import Icon from "../../common/Icon/Icon";

const MENU_ITEMS = [
  { icon: "home",             label: "Datos Personales",     vista: "datos-personales" },
  { icon: "empresa",          label: "Empresas",             vista: "empresas" },
  { icon: "datosFacturacion", label: "Datos de Facturación", vista: "datos-facturacion" },
  { icon: "buzon",            label: "Buzon",                vista: "buzon" },
  { icon: "tickets",          label: "Tickets",              vista: "tickets" },
  { icon: "mantenedores",     label: "Mantenedores",         vista: "mantenedores" },
];

const COLABORACION_ITEMS = [
  { icon: "canjeMonedas",  label: "Solicitudes de Canje de monedas", vista: "canje-monedas" },
  { icon: "monedero",      label: "Mi Monedero",                     vista: "monedero" },
  { icon: "colaboradores", label: "Invitar Colaboradores",           vista: "colaboradores" },
  { icon: "monetizacion",  label: "Plan de Monetizacion",            vista: "monetizacion" },
];

function MenuItem({ icon, label, vista, vistaActiva, onNavegar }) {
  const isActive = vistaActiva === vista;
  return (
    <a
      href="#"
      className={`menu-item ${isActive ? "active" : ""}`}
      onClick={(e) => {
        e.preventDefault();
        onNavegar(vista);
      }}
    >
      <span className="menu-icon">
        <Icon name={icon} size={20} />
      </span>
      <span>{label}</span>
    </a>
  );
}

function SidebarMenu({ vistaActiva, onNavegar }) {
  return (
    <nav className="sidebar-menu">
      {MENU_ITEMS.map((item) => (
        <MenuItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          vista={item.vista}
          vistaActiva={vistaActiva}
          onNavegar={onNavegar}
        />
      ))}

      <div className="menu-section-title">Colaboración</div>

      {COLABORACION_ITEMS.map((item) => (
        <MenuItem
          key={item.label}
          icon={item.icon}
          label={item.label}
          vista={item.vista}
          vistaActiva={vistaActiva}
          onNavegar={onNavegar}
        />
      ))}
    </nav>
  );
}

export default SidebarMenu;