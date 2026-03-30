import React from "react";
import Icon from "../../Icon/Icon";

/* ── Menú general de Codeplex (siempre visible) ── */
const MENU_ITEMS = [
  { icon: "home",             label: "Datos Personales",     vista: "datos-personales" },
  { icon: "empresa",          label: "Empresas",             vista: "empresas" },
  { icon: "datosFacturacion", label: "Datos de Facturación", vista: "datos-facturacion" },
  { icon: "buzon",            label: "Buzón",                vista: "buzon" },
  { icon: "buzon",            label: "Mensajes",             vista: "mensajes" },
  { icon: "tickets",          label: "Tickets",              vista: "tickets" },
  { icon: "mantenedores",     label: "Mantenedores",         vista: "mantenedores" },
];

const COLABORACION_ITEMS = [
  { icon: "canjeMonedas",  label: "Solicitudes de Canje de monedas", vista: "canje-monedas" },
  { icon: "monedero",      label: "Mi Monedero",                     vista: "monedero" },
  { icon: "colaboradores", label: "Invitar Colaboradores",           vista: "colaboradores" },
  { icon: "monetizacion",  label: "Plan de Monetización",            vista: "monetizacion" },
];

/* ══════════════════════════════════════════════
   MENÚS POR APLICACIÓN
   Clave = suscripcionModal del catálogo
══════════════════════════════════════════════ */
const MENUS_POR_APP = {

  /* 1. ContaPlex ─ Contabilidad */
  contaplex: {
    titulo: "CONTAPLEX",
    items: [
      { icon: "home",             label: "Home",            vista: "cp-home" },
      { icon: "mantenedores",     label: "Mantenedores",    vista: "cp-mantenedores" },
      { icon: "tickets",          label: "Procesos",        vista: "cp-procesos" },
      { icon: "empresa",          label: "Libros",          vista: "cp-libros" },
      { icon: "tickets",          label: "Reportes",        vista: "cp-reportes" },
      { icon: "mantenedores",     label: "Configuraciones", vista: "cp-configuraciones" },
      { icon: "datosFacturacion", label: "Mis Facturas",    vista: "cp-mis-facturas" },
      { icon: "monetizacion",     label: "Planes",          vista: "cp-planes" },
    ],
  },

  /* 2. Gestión-Plex Comercial ─ Gestión empresarial general */
  gestionplex: {
    titulo: "GESTIÓN-PLEX",
    items: [
      { icon: "home",             label: "Home",            vista: "gc-home" },
      { icon: "mantenedores",     label: "Mantenedores",    vista: "gc-mantenedores" },
      { icon: "monedero",         label: "Compras",         vista: "gc-compras" },
      { icon: "monedero",         label: "Ventas",          vista: "gc-ventas" },
      { icon: "canjeMonedas",     label: "Tesorería",       vista: "gc-tesoreria" },
      { icon: "tickets",          label: "Reportes",        vista: "gc-reportes" },
      { icon: "mantenedores",     label: "Configuraciones", vista: "gc-configuraciones" },
      { icon: "mantenedores",     label: "Producción",      vista: "gc-produccion" },
      { icon: "empresa",          label: "Transportes",     vista: "gc-transportes" },
      { icon: "tickets",          label: "Otros Reportes",  vista: "gc-otros-reportes" },
      { icon: "canjeMonedas",     label: "Transferencias",  vista: "gc-transferencias" },
      { icon: "datosFacturacion", label: "Mis Facturas",    vista: "gc-mis-facturas" },
      { icon: "monetizacion",     label: "Planes",          vista: "gc-planes" },
    ],
  },

  /* 3. Gestión-Plex Grifo ─ Estaciones de combustible */
  grifo: {
    titulo: "GESTIÓN-PLEX GRIFO",
    items: [
      { icon: "home",             label: "Home",            vista: "gr-home" },
      { icon: "mantenedores",     label: "Configuraciones", vista: "gr-configuraciones" },
      { icon: "tickets",          label: "Procesos",        vista: "gr-procesos" },
      { icon: "tickets",          label: "Reportes",        vista: "gr-reportes" },
      { icon: "datosFacturacion", label: "Mis Facturas",    vista: "gr-mis-facturas" },
      { icon: "monetizacion",     label: "Planes",          vista: "gr-planes" },
    ],
  },

  /* 4. Gestión-Plex Restaurante ─ Restaurantes */
  restaurante: {
    titulo: "GESTIÓN-PLEX RESTAURANTE",
    items: [
      { icon: "home",             label: "Home",                 vista: "res-home" },
      { icon: "empresa",          label: "Productos",            vista: "res-productos" },
      { icon: "datosFacturacion", label: "Lista Precios",        vista: "res-lista-precios" },
      { icon: "buzon",            label: "Pedidos",              vista: "res-pedidos" },
      { icon: "tickets",          label: "Lista De Pedidos",     vista: "res-lista-pedidos" },
      { icon: "monedero",         label: "Ventas",               vista: "res-ventas" },
      { icon: "buzon",            label: "Envío Facturas",       vista: "res-envio-facturas" },
      { icon: "colaboradores",    label: "Clientes",             vista: "res-clientes" },
      { icon: "mantenedores",     label: "Correlativos",         vista: "res-correlativos" },
      { icon: "empresa",          label: "Empresas",             vista: "res-empresas" },
      { icon: "mantenedores",     label: "Parámetros",           vista: "res-parametros" },
      { icon: "empresa",          label: "Salones",              vista: "res-salones" },
      { icon: "colaboradores",    label: "Control de Usuarios",  vista: "res-control-usuarios" },
      { icon: "canjeMonedas",     label: "Caja Chica",           vista: "res-caja-chica" },
      { icon: "monedero",         label: "Creación Cajas",       vista: "res-creacion-cajas" },
      { icon: "mantenedores",     label: "Cocina",               vista: "res-cocina" },
      { icon: "datosFacturacion", label: "Mis Facturas",         vista: "res-mis-facturas" },
      { icon: "monetizacion",     label: "Planes",               vista: "res-planes" },
    ],
  },

  /* 5. Facturación Electrónica ─ Comprobantes electrónicos */
  facturacion: {
    titulo: "FACTURACIÓN ELECTRÓNICA",
    items: [
      { icon: "home",             label: "Home",                vista: "fe-home" },
      { icon: "empresa",          label: "Productos",           vista: "fe-productos" },
      { icon: "datosFacturacion", label: "Lista Precios",       vista: "fe-lista-precios" },
      { icon: "monedero",         label: "Pos",                 vista: "fe-pos" },
      { icon: "monedero",         label: "Ventas",              vista: "fe-ventas" },
      { icon: "buzon",            label: "Envío Facturas",      vista: "fe-envio-facturas" },
      { icon: "colaboradores",    label: "Clientes",            vista: "fe-clientes" },
      { icon: "mantenedores",     label: "Correlativos",        vista: "fe-correlativos" },
      { icon: "datosFacturacion", label: "Guías",               vista: "fe-guias" },
      { icon: "empresa",          label: "Empresas",            vista: "fe-empresas" },
      { icon: "mantenedores",     label: "Parámetros",          vista: "fe-parametros" },
      { icon: "colaboradores",    label: "Control de Usuarios", vista: "fe-control-usuarios" },
      { icon: "datosFacturacion", label: "Mis Facturas",        vista: "fe-mis-facturas" },
      { icon: "monetizacion",     label: "Planes",              vista: "fe-planes" },
    ],
  },

  /* 6. Gestión-Plex Transporte ─ Empresas de transporte */
  transporte: {
    titulo: "GESTIÓN-PLEX TRANSPORTE",
    items: [
      { icon: "home",             label: "Home",         vista: "tr-home" },
      { icon: "datosFacturacion", label: "Mis Facturas", vista: "tr-mis-facturas" },
      { icon: "mantenedores",     label: "Mantenedores", vista: "tr-mantenedores" },
      { icon: "tickets",          label: "Procesos",     vista: "tr-procesos" },
      { icon: "tickets",          label: "Reportes",     vista: "tr-reportes" },
      { icon: "monetizacion",     label: "Planes",       vista: "tr-planes" },
    ],
  },
};

/* ── Componente de ítem de menú ── */
function MenuItem({ icon, label, vista, vistaActiva, alNavegar }) {
  const isActive = vistaActiva === vista;
  return (
    <a
      href="#"
      className={`flex items-center gap-[15px] px-5 py-[10px] md:px-[30px] md:py-3 no-underline text-[13px] md:text-[14px] transition-all duration-300 cursor-pointer border-l-[3px] ${
        isActive
          ? "bg-[rgba(127,13,242,0.1)] text-[var(--primary-color)] border-l-[var(--primary-color)] font-semibold"
          : "text-[var(--text-muted)] border-l-transparent hover:bg-[var(--background-color)] hover:text-[var(--primary-color)] hover:border-l-[var(--primary-color)]"
      }`}
      onClick={(e) => {
        e.preventDefault();
        alNavegar(vista);
      }}
    >
      <span className="w-5 h-5 flex items-center justify-center shrink-0">
        <Icon name={icon} size={20} />
      </span>
      <span>{label}</span>
    </a>
  );
}

function SidebarMenu({ vistaActiva, alNavegar, appsActivas = [] }) {
  return (
    <nav className="py-5">

      {appsActivas.length > 0 ? (
        /* ── Apps activas: una sección por cada app seleccionada ── */
        appsActivas.map((app, idx) => {
          const appMenu = MENUS_POR_APP[app.suscripcionModal];
          if (!appMenu) return null;
          return (
            <React.Fragment key={app.id}>
              <div className="px-[30px] pt-5 pb-[10px] text-[12px] font-semibold text-[var(--text-gray)] uppercase tracking-[0.5px]">
                {appMenu.titulo}
              </div>
              {appMenu.items.map((item) => (
                <MenuItem
                  key={item.vista}
                  icon={item.icon}
                  label={item.label}
                  vista={item.vista}
                  vistaActiva={vistaActiva}
                  alNavegar={alNavegar}
                />
              ))}
              {/* Divisor entre apps (no después de la última) */}
              {idx < appsActivas.length - 1 && (
                <div className="h-px bg-[var(--border-color)] mx-5 my-2" />
              )}
            </React.Fragment>
          );
        })
      ) : (
        /* ── Sin app seleccionada: menú general de Codeplex ── */
        <>
          {MENU_ITEMS.map((item) => (
            <MenuItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              vista={item.vista}
              vistaActiva={vistaActiva}
              alNavegar={alNavegar}
            />
          ))}

          <div className="px-[30px] pt-5 pb-[10px] text-[12px] font-semibold text-[var(--text-gray)] uppercase tracking-[0.5px]">
            Colaboración
          </div>

          {COLABORACION_ITEMS.map((item) => (
            <MenuItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              vista={item.vista}
              vistaActiva={vistaActiva}
              alNavegar={alNavegar}
            />
          ))}
        </>
      )}
    </nav>
  );
}

export default SidebarMenu;
