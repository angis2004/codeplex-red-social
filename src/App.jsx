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
import PasarelaPago from './planes/pasarella-pago/PasarelaPago';
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

  const handleProcederPago = (data) => {
    setPagoData(data);
    setVistaActiva("pasarela-pago");
  };

  const handleActivar = (appData) => {
    setMisApps((prev) => [...prev, { ...appData, id: Date.now() }]);
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
        />
      );
      case "pasarela-pago":     return (
        <PasarelaPago
          planData={pagoData}
          onVolver={() => setVistaActiva("aplicaciones")}
          onActivar={handleActivar}
        />
      );
      default:                  return <RedSocial isDemo={isDemo} onLoginClick={() => setAppState('login')} />;
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
      />

      {/* ─── CAMBIO: main-content solo tiene el contenido ─── */}
      <div className={`main-content${isDemo ? " main-content--demo" : ""}`}>
        <main className="view-container">
          {renderVista()}
        </main>
      </div>
    </div>
  );
}

export default App;