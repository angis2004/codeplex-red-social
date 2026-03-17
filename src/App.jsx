import React, { useState } from 'react';
import Sidebar from './ui/layout/Sidebar/Sidebar';
import Header from './ui/layout/Header/Header';
import Dashboard from './feed/dashboard/Dashboard';
import Login from './identidad/login/Login';
import ViewEmpresas from './organizacion/empresas/ViewEmpresas';
import ViewDatosPersonales from './identidad/datos-personales/ViewDatosPersonales';
import ViewDatosFacturacion from './organizacion/facturacion/ViewDatosFacturacion';
import ViewBuzon from './feed/buzon/ViewBuzon';
import ViewTickets from './organizacion/tickets/ViewTickets';
import ViewMantenedores from './organizacion/mantenedores/ViewMantenedores';
import ViewCanjeMonedas from './planes/monedero/ViewCanjeMonedas';
import ViewMonedero from './planes/monedero/ViewMonedero';
import ViewColaboradores from './organizacion/colaboradores/ViewColaboradores';
import ViewMonetizacion from './planes/monetizacion/ViewMonetizacion';
import CatalogoAplicaciones from './planes/aplicaciones/ui/CatalogoAplicaciones';
import ViewPasarellaPago from './planes/pasarella-pago/ViewPasarellaPago';
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
      case "red-social":        return <Dashboard isDemo={isDemo} onLoginClick={() => setAppState('login')} />;
      case "datos-personales":  return <ViewDatosPersonales />;
      case "empresas":          return <ViewEmpresas />;
      case "datos-facturacion": return <ViewDatosFacturacion />;
      case "buzon":             return <ViewBuzon />;
      case "tickets":           return <ViewTickets />;
      case "mantenedores":      return <ViewMantenedores />;
      case "canje-monedas":     return <ViewCanjeMonedas />;
      case "monedero":          return <ViewMonedero />;
      case "colaboradores":     return <ViewColaboradores />;
      case "monetizacion":      return <ViewMonetizacion />;
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