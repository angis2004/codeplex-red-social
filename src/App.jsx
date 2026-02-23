import React, { useState } from 'react';
import Sidebar from './components/layout/Sidebar/Sidebar';
import Header from './components/layout/Header/Header';
import Dashboard from './components/dashboard/Dashboard';
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
import './styles/App.css';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [vistaActiva, setVistaActiva] = useState("red-social");

  const renderVista = () => {
    switch (vistaActiva) {
      case "red-social":        return <Dashboard />;
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
      default:                  return <Dashboard />;
    }
  };

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
      />

      {/* ─── CAMBIO: main-content solo tiene el contenido ─── */}
      <div className="main-content">
        <main className="view-container">
          {renderVista()}
        </main>
      </div>
    </div>
  );
}

export default App;