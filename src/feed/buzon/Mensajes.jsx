/* ═══════════════════════════════════════════════════════════
   Mensajes — Vista completa de mensajería (página del sidebar)
   Bounded Context: Feed > Buzón

   Layout: Lista de conversaciones (izq) + Panel de chat (der)
═══════════════════════════════════════════════════════════ */
import React, { useState, useRef, useEffect } from "react";
import { CONVERSACIONES_MOCK } from "./mensajes.data";
import { useSesion } from "../../identidad/sesion/SesionContext";
import PerfilPublico from "../perfil-publico/PerfilPublico";
import "./Mensajes.css";

/* ── Tabs ── */
const TABS = [
  { id: "todos", label: "Todos" },
  { id: "grupos", label: "Grupos" },
  { id: "solicitudes", label: "Solicitudes" },
];

/* ═══════════════════════════════════════════
   ITEM DE CONVERSACIÓN (sidebar izquierdo)
═══════════════════════════════════════════ */
function ConversacionItem({ conversacion, activa, onClick }) {
  const { nombre, avatar, ultimoMensaje, hora, sinLeer } = conversacion;
  return (
    <button
      className={`msj-conv-item ${activa ? "activa" : ""}`}
      onClick={() => onClick(conversacion)}
    >
      <div className="msj-conv-avatar-wrap">
        <img src={avatar} alt={nombre} className="msj-conv-avatar" />
      </div>
      <div className="msj-conv-info">
        <span className="msj-conv-nombre">{nombre}</span>
        <span className="msj-conv-preview">{ultimoMensaje}</span>
      </div>
      <div className="msj-conv-meta">
        <span className="msj-conv-hora">{hora}</span>
        {sinLeer > 0 && <span className="msj-conv-badge">{sinLeer}</span>}
      </div>
    </button>
  );
}

/* ═══════════════════════════════════════════
   PANEL VACÍO (sin conversación seleccionada)
═══════════════════════════════════════════ */
function PanelVacio({ bloquearDemo }) {
  return (
    <div className="msj-panel-vacio">
      <div className="msj-panel-vacio-icono">
        <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="22" y1="2" x2="11" y2="13" />
          <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
      </div>
      <h2 className="msj-panel-vacio-titulo">Tus Mensajes</h2>
      <p className="msj-panel-vacio-texto">
        Conecta con otros profesionales de tu red. Haz preguntas, comparte conocimiento y colabora.
      </p>
      <button className="msj-btn-iniciar" {...bloquearDemo}>Iniciar Conversación</button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   PANEL DE CHAT (conversación seleccionada)
═══════════════════════════════════════════ */
function PanelChat({ conversacion, onVolver, onVerPerfil }) {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState(conversacion.mensajes);
  const [escribiendo, setEscribiendo] = useState(true);
  const chatRef = useRef(null);

  useEffect(() => {
    setMensajes(conversacion.mensajes);
    setEscribiendo(true);
  }, [conversacion]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [mensajes]);

  const enviarMensaje = () => {
    if (!mensaje.trim()) return;
    const nuevo = {
      id: `m-${Date.now()}`,
      texto: mensaje,
      hora: new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit" }),
      esPropio: true,
    };
    setMensajes([...mensajes, nuevo]);
    setMensaje("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      enviarMensaje();
    }
  };

  return (
    <div className="msj-panel-chat">
      {/* Header del contacto */}
      <div className="msj-chat-header">
        <div className="msj-chat-header-left">
          <button className="msj-chat-volver" onClick={onVolver}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <img src={conversacion.avatar} alt={conversacion.nombre} className="msj-chat-header-avatar" />
          <div className="msj-chat-header-info">
            <span className="msj-chat-header-nombre">{conversacion.nombre}</span>
            <span className="msj-chat-header-estado">{conversacion.ultimaActividad}</span>
          </div>
        </div>
      </div>

      {/* Mensajes + perfil resumido como primer elemento scrolleable */}
      <div className="msj-chat-body" ref={chatRef}>
        {/* Perfil resumido — scrollea con los mensajes, se oculta al bajar */}
        <div className="msj-chat-perfil">
          <img src={conversacion.avatar} alt={conversacion.nombre} className="msj-chat-perfil-avatar" />
          <h3 className="msj-chat-perfil-nombre">{conversacion.nombre}</h3>
          <span className="msj-chat-perfil-estado">{conversacion.especialidad}</span>
          <button className="msj-btn-ver-perfil" onClick={onVerPerfil}>Ver Perfil</button>
        </div>

        {mensajes.map((msg) => (
          <div
            key={msg.id}
            className={`msj-burbuja ${msg.esPropio ? "propio" : "otro"}`}
          >
            {!msg.esPropio && (
              <img src={conversacion.avatar} alt="" className="msj-burbuja-avatar" />
            )}
            <div className="msj-burbuja-contenido">
              <p>{msg.texto}</p>
            </div>
          </div>
        ))}
        <span className="msj-burbuja-hora-global">
          {mensajes[mensajes.length - 1]?.hora}
        </span>
        {escribiendo && (
          <div className="msj-burbuja otro">
            <img src={conversacion.avatar} alt="" className="msj-burbuja-avatar" />
            <div className="msj-burbuja-contenido msj-escribiendo">
              <span className="dot" /><span className="dot" /><span className="dot" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="msj-chat-input-wrap">
        <input
          type="text"
          placeholder="Escribe tu mensaje.."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          onKeyDown={handleKeyDown}
          className="msj-chat-input"
        />
        <button className="msj-chat-enviar" onClick={enviarMensaje} disabled={!mensaje.trim()}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ORQUESTADOR — Mensajes (vista completa)
═══════════════════════════════════════════ */
function Mensajes() {
  const { modoExploracion, comenzarAutenticacion } = useSesion();
  const [tabActivo, setTabActivo] = useState("todos");
  const [busqueda, setBusqueda] = useState("");
  const [chatActivo, setChatActivo] = useState(null);
  const [perfilContacto, setPerfilContacto] = useState(null);

  const bloquearDemo = modoExploracion
    ? { onClick: comenzarAutenticacion, title: "Inicia sesión para usar esta función", style: { cursor: "not-allowed", opacity: 0.6 } }
    : {};

  const conversacionesFiltradas = CONVERSACIONES_MOCK.filter((c) =>
    c.nombre.toLowerCase().includes(busqueda.toLowerCase())
  );

  /* ── Vista completa del perfil (reemplaza toda la página) ── */
  if (perfilContacto) {
    return (
      <PerfilPublico
        usuario={perfilContacto}
        onVolver={() => setPerfilContacto(null)}
        onEnviarMensaje={() => {
          setChatActivo(perfilContacto);
          setPerfilContacto(null);
        }}
        textoAmistad="Amigos"
      />
    );
  }

  return (
    <div className={`msj-pagina ${chatActivo ? "chat-abierto" : ""}`}>
      {/* ── Panel izquierdo: lista ── */}
      <div className="msj-sidebar">
        {/* Header */}
        <div className="msj-sidebar-header">
          <div className="msj-sidebar-titulo">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
            </svg>
            <span>Mensajes</span>
          </div>
          <div className="msj-sidebar-acciones">
            <button className="msj-sidebar-btn" title="Nueva conversación" {...bloquearDemo}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
            </button>
            <button className="msj-sidebar-btn" title="Cerrar">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
        </div>

        {/* Búsqueda */}
        <div className="msj-sidebar-busqueda">
          <input
            type="text"
            placeholder={modoExploracion ? "Inicia sesión para buscar..." : "Buscar conversación .."}
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            readOnly={modoExploracion}
            className="msj-search-input"
            {...(modoExploracion ? { onClick: comenzarAutenticacion, style: { cursor: "not-allowed" } } : {})}
          />
        </div>

        {/* Tabs */}
        <div className="msj-sidebar-tabs">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              className={`msj-tab ${tabActivo === tab.id ? "activo" : ""}`}
              onClick={() => setTabActivo(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Lista */}
        <div className="msj-sidebar-lista">
          <div className="msj-seccion-titulo">RECIENTES</div>
          {conversacionesFiltradas.map((conv) => (
            <ConversacionItem
              key={conv.id}
              conversacion={conv}
              activa={chatActivo?.id === conv.id}
              onClick={modoExploracion ? comenzarAutenticacion : setChatActivo}
            />
          ))}
        </div>
      </div>

      {/* ── Panel derecho: chat o vacío ── */}
      <div className="msj-contenido">
        {chatActivo ? (
          <PanelChat
            conversacion={chatActivo}
            onVolver={() => setChatActivo(null)}
            onVerPerfil={() => setPerfilContacto(chatActivo)}
          />
        ) : (
          <PanelVacio bloquearDemo={bloquearDemo} />
        )}
      </div>
    </div>
  );
}

export default Mensajes;
