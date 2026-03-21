/* ═══════════════════════════════════════════════════════════
   MensajesFlotante — Widget flotante de mensajes (estilo Messenger)
   Bounded Context: Feed > Buzón

   3 estados:
   1. Botón flotante con badge
   2. Popup lista de conversaciones
   3. Chat abierto con mensajes
═══════════════════════════════════════════════════════════ */
import React, { useState, useRef, useEffect } from "react";
import { CONVERSACIONES_MOCK, SUGERIDOS_MOCK } from "./mensajes.data";
import { useSesion } from "../../../identidad/aplicacion/SesionContext";
import "./MensajesFlotante.css";

/* ── Tabs del popup ── */
const TABS = [
  { id: "todos", label: "Todos" },
  { id: "noLeidos", label: "No leídos" },
  { id: "grupos", label: "Grupos" },
];

/* ═══════════════════════════════════════════
   BOTÓN FLOTANTE
═══════════════════════════════════════════ */
function BotonFlotante({ totalSinLeer, onClick }) {
  return (
    <button className="mensajes-fab" onClick={onClick}>
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
      <span>Mensajes</span>
      {totalSinLeer > 0 && (
        <span className="mensajes-fab-badge">{totalSinLeer}</span>
      )}
    </button>
  );
}

/* ═══════════════════════════════════════════
   ITEM DE CONVERSACIÓN
═══════════════════════════════════════════ */
function ConversacionItem({ conversacion, onClick }) {
  const { nombre, avatar, ultimoMensaje, hora, sinLeer } = conversacion;
  return (
    <button className="mensajes-conv-item" onClick={() => onClick(conversacion)}>
      <div className="mensajes-conv-avatar-wrap">
        <img src={avatar} alt={nombre} className="mensajes-conv-avatar" />
      </div>
      <div className="mensajes-conv-info">
        <span className="mensajes-conv-nombre">{nombre}</span>
        <span className="mensajes-conv-preview">{ultimoMensaje}</span>
      </div>
      <div className="mensajes-conv-meta">
        <span className="mensajes-conv-hora">{hora}</span>
        {sinLeer > 0 && <span className="mensajes-conv-badge">{sinLeer}</span>}
      </div>
    </button>
  );
}

/* ═══════════════════════════════════════════
   CONTACTO SUGERIDO
═══════════════════════════════════════════ */
function SugeridoItem({ contacto }) {
  return (
    <div className="mensajes-sugerido-item">
      <div className="mensajes-conv-avatar-wrap">
        <img src={contacto.avatar} alt={contacto.nombre} className="mensajes-conv-avatar" />
        {contacto.enLinea && <span className="mensajes-en-linea" />}
      </div>
      <div className="mensajes-conv-info">
        <span className="mensajes-conv-nombre">{contacto.nombre}</span>
        <span className="mensajes-conv-preview">
          {contacto.enLinea ? "En Línea" : "Desconectado"}
        </span>
      </div>
      <button className="mensajes-btn-mensaje">Mensaje</button>
    </div>
  );
}

/* ═══════════════════════════════════════════
   POPUP LISTA DE CONVERSACIONES
═══════════════════════════════════════════ */
function PopupLista({ onCerrar, onAbrirChat, onMinimizar, onExpandir }) {
  const [tabActivo, setTabActivo] = useState("todos");

  const conversacionesFiltradas = CONVERSACIONES_MOCK.filter((c) => {
    if (tabActivo === "noLeidos") return c.sinLeer > 0;
    return true;
  });

  return (
    <div className="mensajes-popup">
      {/* Header */}
      <div className="mensajes-popup-header">
        <div className="mensajes-popup-titulo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span>Mensajes</span>
        </div>
        <div className="mensajes-popup-acciones">
          <button className="mensajes-popup-btn" title="Minimizar" onClick={onMinimizar}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /></svg>
          </button>
          <button className="mensajes-popup-btn" title="Expandir" onClick={onExpandir}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polyline points="15 3 21 3 21 9" /><polyline points="9 21 3 21 3 15" />
              <line x1="21" y1="3" x2="14" y2="10" /><line x1="3" y1="21" x2="10" y2="14" />
            </svg>
          </button>
          <button className="mensajes-popup-btn" title="Cerrar" onClick={onCerrar}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mensajes-popup-tabs">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            className={`mensajes-tab ${tabActivo === tab.id ? "activo" : ""}`}
            onClick={() => setTabActivo(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Lista de conversaciones */}
      <div className="mensajes-popup-lista">
        <div className="mensajes-seccion-titulo">RECIENTES</div>
        {conversacionesFiltradas.map((conv) => (
          <ConversacionItem
            key={conv.id}
            conversacion={conv}
            onClick={onAbrirChat}
          />
        ))}

        {tabActivo === "todos" && (
          <>
            <div className="mensajes-seccion-titulo">SUGERIDOS</div>
            {SUGERIDOS_MOCK.map((contacto) => (
              <SugeridoItem key={contacto.id} contacto={contacto} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   VISTA DE CHAT
═══════════════════════════════════════════ */
function VistaChat({ conversacion, onVolver, onCerrar, onMinimizar }) {
  const [mensaje, setMensaje] = useState("");
  const [mensajes, setMensajes] = useState(conversacion.mensajes);
  const [escribiendo, setEscribiendo] = useState(true);
  const chatRef = useRef(null);

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
    <div className="mensajes-popup mensajes-chat">
      {/* Header del chat */}
      <div className="mensajes-popup-header">
        <div className="mensajes-popup-titulo">
          <button className="mensajes-chat-volver" onClick={onVolver}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <img src={conversacion.avatar} alt={conversacion.nombre} className="mensajes-chat-avatar" />
          <div className="mensajes-chat-user-info">
            <span className="mensajes-chat-nombre">{conversacion.nombre}</span>
            <span className="mensajes-chat-estado">{conversacion.ultimaActividad}</span>
          </div>
        </div>
        <div className="mensajes-popup-acciones">
          <button className="mensajes-popup-btn" title="Minimizar" onClick={onMinimizar}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="5" y1="12" x2="19" y2="12" /></svg>
          </button>
          <button className="mensajes-popup-btn" title="Cerrar" onClick={onCerrar}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>
        </div>
      </div>

      {/* Mensajes */}
      <div className="mensajes-chat-body" ref={chatRef}>
        {mensajes.map((msg) => (
          <div
            key={msg.id}
            className={`mensajes-burbuja ${msg.esPropio ? "propio" : "otro"}`}
          >
            {!msg.esPropio && (
              <img src={conversacion.avatar} alt="" className="mensajes-burbuja-avatar" />
            )}
            <div className="mensajes-burbuja-contenido">
              <p>{msg.texto}</p>
              <span className="mensajes-burbuja-hora">{msg.hora}</span>
            </div>
          </div>
        ))}
        {escribiendo && (
          <div className="mensajes-burbuja otro">
            <img src={conversacion.avatar} alt="" className="mensajes-burbuja-avatar" />
            <div className="mensajes-burbuja-contenido mensajes-escribiendo">
              <span className="dot" /><span className="dot" /><span className="dot" />
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="mensajes-chat-input-wrap">
        <input
          type="text"
          placeholder="Escribe tu mensaje.."
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
          onKeyDown={handleKeyDown}
          className="mensajes-chat-input"
        />
        <button className="mensajes-chat-enviar" onClick={enviarMensaje} disabled={!mensaje.trim()}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════
   ORQUESTADOR — MensajesFlotante
═══════════════════════════════════════════ */
function MensajesFlotante({ alNavegar }) {
  const { modoExploracion, comenzarAutenticacion } = useSesion();
  const [estado, setEstado] = useState("cerrado"); // cerrado | lista | chat
  const [chatActivo, setChatActivo] = useState(null);

  const totalSinLeer = CONVERSACIONES_MOCK.reduce((sum, c) => sum + c.sinLeer, 0);

  const abrirLista = () => setEstado("lista");
  const cerrarTodo = () => { setEstado("cerrado"); setChatActivo(null); };
  const minimizar = () => { setEstado("cerrado"); };

  const expandir = () => {
    cerrarTodo();
    if (alNavegar) alNavegar("mensajes");
  };

  const abrirChat = (conversacion) => {
    setChatActivo(conversacion);
    setEstado("chat");
  };

  const volverALista = () => {
    setChatActivo(null);
    setEstado("lista");
  };

  return (
    <div className="mensajes-flotante-container">
      {/* Popup lista o chat */}
      {estado === "lista" && (
        <PopupLista
          onCerrar={cerrarTodo}
          onAbrirChat={abrirChat}
          onMinimizar={minimizar}
          onExpandir={expandir}
        />
      )}

      {estado === "chat" && chatActivo && (
        <VistaChat
          conversacion={chatActivo}
          onVolver={volverALista}
          onCerrar={cerrarTodo}
          onMinimizar={minimizar}
        />
      )}

      {/* Botón flotante siempre visible */}
      <BotonFlotante
        totalSinLeer={totalSinLeer}
        onClick={modoExploracion ? comenzarAutenticacion : (estado === "cerrado" ? abrirLista : cerrarTodo)}
      />
    </div>
  );
}

export default MensajesFlotante;
