import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar/Sidebar';
import Header from './components/layout/Header/Header';
import Dashboard from './components/dashboard/Dashboard';
import Login from './components/auth/Login/Login';
import ViewEmpresas from './views/ViewEmpresas';
import ViewDatosPersonales from './views/ViewDatosPersonales';
import ViewDatosFacturacion from './views/ViewDatosFacturacion';
import ViewBuzon from './views/ViewBuzon';
import ViewTickets from './views/ViewTickets';
import ViewMantenedores from './views/ViewMantenedores';
import ViewCanjeMonedas from './views/ViewCanjeMonedas';
import ViewMonedero from './views/ViewMonedero';
import ViewColaboradores from './views/ViewColaboradores';
import ViewMonetizacion from './views/ViewMonetizacion';
import ViewAplicaciones from './views/ViewAplicaciones';
import ViewPasarellaPago from './views/ViewPasarellaPago';
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
        <ViewAplicaciones
          onProcederPago={handleProcederPago}
          misApps={misApps}
          tabInicial={tabAppsInicial}
          onTabChange={setTabAppsInicial}
          onDesinstalarApp={handleDesinstalarApp}
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