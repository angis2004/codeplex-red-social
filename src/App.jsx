import React, { useState, useEffect } from 'react';
import { SesionProvider, useSesion } from './identidad/sesion/SesionContext';
import Sidebar from './ui/layout/Sidebar/Sidebar';
import Header from './ui/layout/Header/Header';
import RedSocial from './feed/dashboard/RedSocial';
import Login from './identidad/login/Login';
import GestionEmpresas from './organizacion/empresas/GestionEmpresas';
import DatosPersonales from './identidad/datos-personales/DatosPersonales';
import DatosFacturacion from './organizacion/facturacion/DatosFacturacion';
import Buzon from './feed/buzon/Buzon';
import Mensajes from './feed/buzon/Mensajes';
import Tickets from './organizacion/tickets/Tickets';
import Mantenedores from './organizacion/mantenedores/Mantenedores';
import CanjeMonedas from './planes/monedero/CanjeMonedas';
import Monedero from './planes/monedero/Monedero';
import Colaboradores from './organizacion/colaboradores/Colaboradores';
import Monetizacion from './planes/monetizacion/Monetizacion';
import TiendaAplicaciones from './planes/aplicaciones/TiendaAplicaciones';
import VistaPasarelaPago from './planes/pasarela-pago/VistaPasarelaPago';
import { useCarritoSuscripciones } from './planes/aplicaciones/useCarritoSuscripciones';
import PaginaCarrito from './planes/carrito/PaginaCarrito';
import CarritoMobile from './planes/carrito/CarritoMobile';
import VistaPlaceholder from './ui/placeholders/VistaPlaceholder';
import PerfilPublico from './feed/perfil-publico/PerfilPublico';
import './styles/App.css';

/* ── Apps precargadas en modo exploración ──────────────────────────────────
   El usuario sin login ve todas las apps disponibles en "Mis Aplicaciones"
   para que pueda explorar el sistema completo. Al iniciar sesión este array
   se limpia y queda solo con las apps que el usuario realmente adquiera.
──────────────────────────────────────────────────────────────────────────── */
const APPS_EXPLORACION = [
  { id: 1, suscripcionModal: "contaplex",   nombre: "Conta-Plex",              publisher: "CodePlex",    icono: "contaplex",               colorTema: "color-contaplex",   planDisplay: "Exploración" },
  { id: 2, suscripcionModal: "gestionplex", nombre: "GestiónPlex",             publisher: "Comercial",   icono: "gestionplex-comercial",   colorTema: "color-comercial",   planDisplay: "Exploración" },
  { id: 3, suscripcionModal: "restaurante", nombre: "GestiónPlex",             publisher: "Restaurante", icono: "gestionplex-restaurante", colorTema: "color-restaurante", planDisplay: "Exploración" },
  { id: 4, suscripcionModal: "grifo",       nombre: "Gestión-Plex Grifo",      publisher: "CodePlex",    icono: "contaplex",               colorTema: "color-grifo",       planDisplay: "Exploración" },
  { id: 5, suscripcionModal: "facturacion", nombre: "Facturación Electrónica", publisher: "CodePlex",    icono: "contaplex",               colorTema: "color-facturacion", planDisplay: "Exploración" },
  { id: 6, suscripcionModal: "transporte",  nombre: "Gestión-Plex Transporte", publisher: "CodePlex",    icono: "contaplex",               colorTema: "color-transporte",  planDisplay: "Exploración" },
];

/* ══════════════════════════════════════════════════════════════
   AppContent — consume SesionContext, maneja estado de UI/apps
══════════════════════════════════════════════════════════════ */
function AppContent() {
  const { estadoSesion, modoExploracion, comenzarAutenticacion, confirmarSesion, irAExploracion } = useSesion();

  const [sidebarOpen, setSidebarOpen]           = useState(false);
  const [vistaActiva, setVistaActiva]           = useState("red-social");
  const [pagoData, setPagoData]                 = useState(null);
  const [perfilUsuario, setPerfilUsuario]       = useState(null);

  const alVerPerfil = (usuario) => {
    setPerfilUsuario(usuario);
    setVistaActiva("perfil-usuario");
  };
  const [misApps, setMisApps]                   = useState(APPS_EXPLORACION);
  const [appsActivas, setAppsActivas]           = useState([]);
  const [pestanaAppsInicial, setPestanaAppsInicial] = useState("mis");

  const {
    itemsCarrito,
    totalCarrito,
    agregarAlCarrito,
    quitarDelCarrito,
    limpiarCarrito,
    verificarEnCarrito,
  } = useCarritoSuscripciones();

  /* Scroll al top en cada cambio de vista (SPA: el navegador no lo hace solo) */
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [vistaActiva]);

  /* Al confirmar sesión: limpiar apps de exploración */
  useEffect(() => {
    if (estadoSesion === 'autenticado') {
      setMisApps([]);
      setAppsActivas([]);
      setPestanaAppsInicial("adquirir");
    }
    if (estadoSesion === 'exploracion') {
      setMisApps(APPS_EXPLORACION);
      setPestanaAppsInicial("mis");
    }
  }, [estadoSesion]);

  const handleVerCarrito = () => setVistaActiva("carrito");

  const handleProcederPago = (data) => {
    setPagoData(data);
    setVistaActiva("pasarela-pago");
  };

  const handleActivar = (appData) => {
    const items = Array.isArray(appData) ? appData : [appData];
    setMisApps((prev) => [
      ...prev,
      ...items.map((a, i) => ({ ...a, id: Date.now() + i })),
    ]);
    setPestanaAppsInicial("mis");
    setVistaActiva("aplicaciones");
  };

  const handleDesinstalarApp = (id) => {
    setMisApps((prev) => prev.filter((a) => a.id !== id));
    setAppsActivas((prev) => prev.filter((a) => a.id !== id));
  };

  const handleToggleAppActiva = (app) => {
    setAppsActivas((prev) =>
      prev.some((a) => a.id === app.id)
        ? prev.filter((a) => a.id !== app.id)
        : [...prev, app]
    );
  };

  const handleSelectAllApps   = () => setAppsActivas([...misApps]);
  const handleDeselectAllApps = () => setAppsActivas([]);

  const renderVista = () => {
    switch (vistaActiva) {
      case "red-social":        return <RedSocial alNavegar={setVistaActiva} alVerPerfil={alVerPerfil} />;
      case "perfil-usuario":    return <PerfilPublico usuario={perfilUsuario} onVolver={() => setVistaActiva("red-social")} alNavegar={setVistaActiva} />;
      case "datos-personales":  return <DatosPersonales />;
      case "empresas":          return <GestionEmpresas />;
      case "datos-facturacion": return <DatosFacturacion />;
      case "buzon":             return <Buzon />;
      case "mensajes":          return <Mensajes />;
      case "tickets":           return <Tickets />;
      case "mantenedores":      return <Mantenedores />;
      case "canje-monedas":     return <CanjeMonedas />;
      case "monedero":          return <Monedero />;
      case "colaboradores":     return <Colaboradores />;
      case "monetizacion":      return <Monetizacion />;
      case "aplicaciones":      return (
        <TiendaAplicaciones
          alProcederPago={handleProcederPago}
          suscripcionesActivas={misApps}
          pestanaInicial={pestanaAppsInicial}
          alCambiarPestana={setPestanaAppsInicial}
          alDesinstalar={handleDesinstalarApp}
          itemsCarrito={itemsCarrito}
          totalCarrito={totalCarrito}
          agregarAlCarrito={agregarAlCarrito}
          quitarDelCarrito={quitarDelCarrito}
          verificarEnCarrito={verificarEnCarrito}
          alVerCarrito={handleVerCarrito}
        />
      );
      case "carrito":           return (
        <PaginaCarrito
          itemsCarrito={itemsCarrito}
          totalCarrito={totalCarrito}
          alQuitarItem={quitarDelCarrito}
          alProcederPago={() => {
            handleProcederPago({ itemsCarrito, totalCarrito, periodoFacturacion: "mensual" });
            limpiarCarrito();
          }}
          alExplorar={() => setVistaActiva("aplicaciones")}
          alVolver={() => setVistaActiva("aplicaciones")}
        />
      );
      case "pasarela-pago":     return (
        <VistaPasarelaPago
          planData={pagoData}
          alVolver={() => setVistaActiva("aplicaciones")}
          alActivar={handleActivar}
        />
      );
      default:                  return <VistaPlaceholder vista={vistaActiva} />;
    }
  };

  if (estadoSesion === 'autenticando') {
    return (
      <Login
        onLogin={confirmarSesion}
        onBackToDemo={irAExploracion}
      />
    );
  }

  return (
    <div className="flex min-h-screen bg-[var(--background-color)]">
      <Sidebar
        estaAbierto={sidebarOpen}
        alCerrar={() => setSidebarOpen(false)}
        vistaActiva={vistaActiva}
        alNavegar={setVistaActiva}
        appsActivas={appsActivas}
      />

      <Header
        alAlternarMenu={() => setSidebarOpen(!sidebarOpen)}
        alNavegar={setVistaActiva}
        vistaActiva={vistaActiva}
        itemsCarrito={itemsCarrito}
        totalCarrito={totalCarrito}
        alVerCarrito={handleVerCarrito}
        misApps={misApps}
        appsActivas={appsActivas}
        alAlternarAppActiva={handleToggleAppActiva}
        alSeleccionarTodasApps={handleSelectAllApps}
        alDeseleccionarTodasApps={handleDeselectAllApps}
      />

      <div className="flex-1 min-w-0 ml-[280px] p-6 pt-[calc(var(--header-height,96px)_+_30px)] transition-[margin-left] duration-300 ease-in-out min-h-screen [@media(max-width:1024px)]:ml-0 [@media(max-width:1024px)]:px-8 [@media(max-width:768px)]:p-4 [@media(max-width:768px)]:pt-[calc(var(--header-height,120px)_+_30px)]">
        <main className="max-w-[1400px] mx-auto w-full">
          {renderVista()}
        </main>
      </div>

      {vistaActiva !== "carrito" && (
        <CarritoMobile
          itemsCarrito={itemsCarrito}
          totalCarrito={totalCarrito}
          alVerCarrito={handleVerCarrito}
        />
      )}
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   App — solo envuelve con el provider de sesión
══════════════════════════════════════════════════════════════ */
function App() {
  return (
    <SesionProvider>
      <AppContent />
    </SesionProvider>
  );
}

export default App;
