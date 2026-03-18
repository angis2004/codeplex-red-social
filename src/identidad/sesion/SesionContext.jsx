import React, { createContext, useContext, useState } from 'react';

/* ═══════════════════════════════════════════════════════════════
   BOUNDED CONTEXT: Sesión
   Ubiquitous Language: estadoSesion, modoExploracion, usuario
   Valores posibles de estadoSesion:
     'exploracion'  → visitante sin cuenta
     'autenticando' → pantalla de login activa
     'autenticado'  → sesión iniciada
═══════════════════════════════════════════════════════════════ */

const SesionContext = createContext(null);

/* ── Usuario autenticado (mock — reemplazar con API real) ── */
const USUARIO_AUTENTICADO = {
  nombre: 'Gabriel Chumpitazi',
  rol:    'Contador Senior',
  avatar: 'https://i.pravatar.cc/150?img=12',
};

export function SesionProvider({ children }) {
  const [estadoSesion, setEstadoSesion] = useState('exploracion');

  const modoExploracion = estadoSesion === 'exploracion';
  const usuario         = modoExploracion ? null : USUARIO_AUTENTICADO;

  /* ── Acciones del dominio ── */
  const comenzarAutenticacion = () => setEstadoSesion('autenticando');
  const confirmarSesion       = () => setEstadoSesion('autenticado');
  const cerrarSesion          = () => setEstadoSesion('autenticando');
  const irAExploracion        = () => setEstadoSesion('exploracion');

  return (
    <SesionContext.Provider value={{
      estadoSesion,
      modoExploracion,
      usuario,
      comenzarAutenticacion,
      confirmarSesion,
      cerrarSesion,
      irAExploracion,
    }}>
      {children}
    </SesionContext.Provider>
  );
}

/* ── Hook de consumo ── */
export function useSesion() {
  const ctx = useContext(SesionContext);
  if (!ctx) throw new Error('useSesion debe usarse dentro de <SesionProvider>');
  return ctx;
}
