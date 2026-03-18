import React, { useState } from 'react';
import Sidebar from './ui/layout/Sidebar/Sidebar';
import Header from './ui/layout/Header/Header';
import RedSocial from './feed/dashboard/RedSocial';
import Login from './identidad/login/Login';
import GestionEmpresas from './organizacion/empresas/GestionEmpresas';
import DatosPersonales from './identidad/datos-personales/DatosPersonales';
import DatosFacturacion from './organizacion/facturacion/DatosFacturacion';
import Buzon from './feed/buzon/Buzon';
import Tickets from './organizacion/tickets/Tickets';
import Mantenedores from './organizacion/mantenedores/Mantenedores';
import CanjeMonedas from './planes/monedero/CanjeMonedas';
import Monedero from './planes/monedero/Monedero';
import Colaboradores from './organizacion/colaboradores/Colaboradores';
import Monetizacion from './planes/monetizacion/Monetizacion';
import CatalogoAplicaciones from './planes/aplicaciones/ui/CatalogoAplicaciones';
import ViewPasarellaPago from './planes/pasarella-pago/ViewPasarellaPago';
import { useCarritoSuscripciones } from './planes/aplicaciones/aplicacion/useCarritoSuscripciones';
import PaginaCarrito from './planes/carrito/ui/PaginaCarrito';
import CarritoMobile from './planes/carrito/ui/CarritoMobile';
import VistaPlaceholder from './ui/placeholders/VistaPlaceholder';
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

// estadoSesion: 'exploracion' | 'autenticando' | 'autenticado'
function App() {
  const [estadoSesion, setEstadoSesion] = useState('exploracion');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [vistaActiva, setVistaActiva] = useState("red-social");
  const [pagoData, setPagoData]   = useState(null);
  // En modo exploración arranca con las 6 apps precargadas; al iniciar sesión se vacía
  const [misApps, setMisApps]           = useState(APPS_EXPLORACION);
  const [appsActivas, setAppsActivas]   = useState([]);   // apps seleccionadas en sidebar (multi)
  const [pestanaAppsInicial, setPestanaAppsInicial] = useState("adquirir");

  const modoExploracion = estadoSesion === 'exploracion';

  const {
    itemsCarrito,
    totalCarrito,
    agregarAlCarrito,
    quitarDelCarrito,
    limpiarCarrito,
    verificarEnCarrito,
  } = useCarritoSuscripciones();

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

  /* Toggle individual: agrega o quita del array de activas */
  const handleToggleAppActiva = (app) => {
    setAppsActivas((prev) =>
      prev.some((a) => a.id === app.id)
        ? prev.filter((a) => a.id !== app.id)
        : [...prev, app]
    );
  };

  const handleSelectAllApps  = () => setAppsActivas([...misApps]);
  const handleDeselectAllApps = () => setAppsActivas([]);

  const renderVista = () => {
    switch (vistaActiva) {
      case "red-social":        return <RedSocial modoExploracion={modoExploracion} alIniciarSesion={() => setEstadoSesion('autenticando')} />;
      case "datos-personales":  return <DatosPersonales />;
      case "empresas":          return <GestionEmpresas />;
      case "datos-facturacion": return <DatosFacturacion />;
      case "buzon":             return <Buzon />;
      case "tickets":           return <Tickets />;
      case "mantenedores":      return <Mantenedores />;
      case "canje-monedas":     return <CanjeMonedas />;
      case "monedero":          return <Monedero />;
      case "colaboradores":     return <Colaboradores />;
      case "monetizacion":      return <Monetizacion />;
      case "aplicaciones":      return (
        <CatalogoAplicaciones
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
          modoExploracion={modoExploracion}
          alIniciarSesion={() => setEstadoSesion('autenticando')}
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
        <ViewPasarellaPago
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
        onLogin={() => {
          // Al autenticarse limpiamos las apps de exploración — el usuario
          // empieza con sus apps reales (las que adquiera).
          setMisApps([]);
          setAppsActivas([]);
          setEstadoSesion('autenticado');
        }}
        onBackToDemo={() => setEstadoSesion('exploracion')}
      />
    );
  }

  return (
    <div className="app">
      <Sidebar
        estaAbierto={sidebarOpen}
        alCerrar={() => setSidebarOpen(false)}
        vistaActiva={vistaActiva}
        alNavegar={setVistaActiva}
        appsActivas={appsActivas}
      />

      {/* ─── CAMBIO: Header fuera del main-content ─── */}
      <Header
        alAlternarMenu={() => setSidebarOpen(!sidebarOpen)}
        alNavegar={setVistaActiva}
        vistaActiva={vistaActiva}
        modoExploracion={modoExploracion}
        alIniciarSesion={() => setEstadoSesion('autenticando')}
        alCerrarSesion={() => setEstadoSesion('autenticando')}
        itemsCarrito={itemsCarrito}
        totalCarrito={totalCarrito}
        alVerCarrito={handleVerCarrito}
        misApps={misApps}
        appsActivas={appsActivas}
        alAlternarAppActiva={handleToggleAppActiva}
        alSeleccionarTodasApps={handleSelectAllApps}
        alDeseleccionarTodasApps={handleDeselectAllApps}
      />

      {/* ─── CAMBIO: main-content solo tiene el contenido ─── */}
      <div className={`main-content${modoExploracion ? " main-content--demo" : ""}`}>
        <main className="view-container">
          {renderVista()}
        </main>
      </div>

      <CarritoMobile
        itemsCarrito={itemsCarrito}
        totalCarrito={totalCarrito}
        alQuitarItem={quitarDelCarrito}
        alVerCarrito={handleVerCarrito}
      />
    </div>
  );
}

export default App;
