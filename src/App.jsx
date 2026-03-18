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
import './styles/App.css';

// appState: 'demo' | 'login' | 'authenticated'
function App() {
  const [appState, setAppState] = useState('demo');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [vistaActiva, setVistaActiva] = useState("red-social");
  const [pagoData, setPagoData]   = useState(null);
  const [misApps, setMisApps]     = useState([]);
  const [tabAppsInicial, setTabAppsInicial] = useState("adquirir");

  const isDemo = appState === 'demo';

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
    setTabAppsInicial("mis");
    setVistaActiva("aplicaciones");
  };

  const handleDesinstalarApp = (id) => {
    setMisApps((prev) => prev.filter((a) => a.id !== id));
  };

  const renderVista = () => {
    switch (vistaActiva) {
      case "red-social":        return <RedSocial isDemo={isDemo} onLoginClick={() => setAppState('login')} />;
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
          onProcederPago={handleProcederPago}
          suscripcionesActivas={misApps}
          pestanaInicial={tabAppsInicial}
          onCambiarPestana={setTabAppsInicial}
          onDesinstalar={handleDesinstalarApp}
          itemsCarrito={itemsCarrito}
          totalCarrito={totalCarrito}
          agregarAlCarrito={agregarAlCarrito}
          quitarDelCarrito={quitarDelCarrito}
          verificarEnCarrito={verificarEnCarrito}
          onVerCarrito={handleVerCarrito}
        />
      );
      case "carrito":           return (
        <PaginaCarrito
          itemsCarrito={itemsCarrito}
          totalCarrito={totalCarrito}
          onQuitarItem={quitarDelCarrito}
          onProcederPago={() => {
            handleProcederPago({ itemsCarrito, totalCarrito, billing: "mensual" });
            limpiarCarrito();
          }}
          onExplorar={() => setVistaActiva("aplicaciones")}
          onVolver={() => setVistaActiva("aplicaciones")}
        />
      );
      case "pasarela-pago":     return (
        <ViewPasarellaPago
          planData={pagoData}
          onVolver={() => setVistaActiva("aplicaciones")}
          onActivar={handleActivar}
        />
      );
      default:                  return <Dashboard isDemo={isDemo} onLoginClick={() => setAppState('login')} />;
    }
  };

  if (appState === 'login') {
    return (
      <Login
        onLogin={() => setAppState('authenticated')}
        onBackToDemo={() => setAppState('demo')}
      />
    );
  }

  return (
    <div className="app">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        vistaActiva={vistaActiva}
        onNavegar={setVistaActiva}
      />

      {/* ─── CAMBIO: Header fuera del main-content ─── */}
      <Header
        onMenuToggle={() => setSidebarOpen(!sidebarOpen)}
        onNavegar={setVistaActiva}
        vistaActiva={vistaActiva}
        isDemo={isDemo}
        onLoginClick={() => setAppState('login')}
        onLogout={() => setAppState('login')}
        itemsCarrito={itemsCarrito}
        totalCarrito={totalCarrito}
        onVerCarrito={handleVerCarrito}
      />

      {/* ─── CAMBIO: main-content solo tiene el contenido ─── */}
      <div className={`main-content${isDemo ? " main-content--demo" : ""}`}>
        <main className="view-container">
          {renderVista()}
        </main>
      </div>

      <CarritoMobile
        itemsCarrito={itemsCarrito}
        totalCarrito={totalCarrito}
        onQuitarItem={quitarDelCarrito}
        onVerCarrito={handleVerCarrito}
      />
    </div>
  );
}

export default App;