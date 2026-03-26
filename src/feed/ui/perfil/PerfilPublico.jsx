/* ═══════════════════════════════════════════════════════════
   PerfilPublico — Vista completa del perfil de otro usuario
   Bounded Context: Feed > Perfil
   Se abre al hacer clic en avatar/nombre en posts o comentarios
═══════════════════════════════════════════════════════════ */
import React, { useState } from "react";
import AccionesPublicacion from "../publicaciones/AccionesPublicacion";
import Comentarios from "../publicaciones/Comentarios";
import "./PerfilPublico.css";

/* ── Mock data de Juan Pérez (no es amigo aún) ── */
const USUARIO_JUAN = {
  nombre:      "Juan Pérez",
  avatar:      "https://i.pravatar.cc/150?img=33",
  especialidad: "Asesor Tributario y Auditor Externo · CPA",
};

const TABS_PERFIL = [
  { id: "red-social",  label: "Red Social"  },
  { id: "resumen",     label: "Resumen"     },
  { id: "experiencia", label: "Experiencia" },
  { id: "documentos",  label: "Documentos"  },
  { id: "metricas",    label: "Métricas"    },
];

/* ── Tab: Red Social ── */
function TabRedSocial() {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="perfil-tab-body">
      <div className="perfil-seccion">
        <h4 className="perfil-seccion-titulo">ACTIVIDAD RECIENTE</h4>
        {[
          { texto: "Respondió en comunidad sobre auditoría NIIF",  extra: "+20 monedas", hora: "Hace 1 h" },
          { texto: 'Publicó "Checklist de cierre de año fiscal 2024"',               hora: "Hace 2 días" },
          { texto: "Obtuvo insignia de Experto Tributario",                           hora: "Viernes"     },
        ].map((item, i) => (
          <div key={i} className="perfil-actividad-item">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" fill="var(--primary-color)"/>
              <polyline points="9 12 11 14 15 10" stroke="white"/>
            </svg>
            <span className="perfil-actividad-texto">
              {item.texto}
              {item.extra && <span className="perfil-actividad-extra"> {item.extra}</span>}
            </span>
            <span className="perfil-actividad-hora">{item.hora}</span>
          </div>
        ))}
      </div>

      <div className="perfil-seccion">
        <h4 className="perfil-seccion-titulo-grande">Publicaciones</h4>
        <div className="perfil-post">
          <div className="perfil-post-header">
            <img src={USUARIO_JUAN.avatar} alt="" className="perfil-post-avatar" />
            <div className="perfil-post-meta">
              <span className="perfil-post-nombre">{USUARIO_JUAN.nombre}</span>
              <span className="perfil-post-sub">Hace 2 días · <span className="perfil-post-nivel">Plata</span></span>
            </div>
            <button className="perfil-post-mas">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/></svg>
            </button>
          </div>
          <p className="perfil-post-texto">
            📊 Checklist de cierre fiscal 2024 para PYMES. Cubre IGV, IR, PDT 621 y conciliación bancaria. Descarga gratuita esta semana.
          </p>
          <div className="perfil-post-tags">
            {["#CierreFiscal","#PDT621","#NIIF"].map(t => (
              <span key={t} className="perfil-post-tag">{t}</span>
            ))}
          </div>
          <AccionesPublicacion initialLikeCount={43} onToggleComments={() => setShowComments(p => !p)} />
          <Comentarios visible={showComments} />
        </div>

        <div className="perfil-respuesta-correcta">
          <div className="perfil-rc-header">
            <span className="perfil-rc-badge">Respuesta correcta</span>
            <span className="perfil-rc-contexto">en Comunidad · Hace 1 hora</span>
          </div>
          <p className="perfil-rc-texto">
            "Para conciliar el libro banco con el estado de cuenta, primero lista las partidas en tránsito y los cheques pendientes. El saldo ajustado debe coincidir con el saldo contable."
          </p>
          <div className="perfil-rc-footer">
            <span>+20 monedas ganadas · 8 votos útil</span>
            <button className="perfil-rc-link">Ver en comunidad →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Tab: Resumen ── */
function TabResumen() {
  const titulos = [
    { titulo: "Maestría en Auditoría y Control Interno",     inst: "Universidad de Lima" },
    { titulo: "Certificación CPA — Contador Público",        inst: "Colegio de Contadores de Lima" },
    { titulo: "Especialización en NIIF — Normas Internacionales", inst: "PUCP — Pontificia Universidad Católica del Perú" },
    { titulo: "Curso Avanzado PDT y SUNAT Online",           inst: "Emitido por SUNAT · Válido hasta 2025" },
  ];
  return (
    <div className="perfil-tab-body">
      <div className="perfil-seccion">
        <h4 className="perfil-seccion-titulo-grande">Sobre mi</h4>
        <p className="perfil-sobre-texto">
          Auditor externo CPA con más de 8 años de experiencia en auditorías financieras para empresas del sector comercial
          e industrial. Especializado en cumplimiento NIIF, declaraciones SUNAT y elaboración de estados financieros para
          medianas empresas peruanas.
        </p>
      </div>
      <div className="perfil-resumen-grid">
        <div className="perfil-seccion perfil-titulos-seccion">
          <h4 className="perfil-seccion-titulo">TITULOS VERIFICADOS</h4>
          {titulos.map((t, i) => (
            <div key={i} className="perfil-titulo-item">
              <div className="perfil-titulo-icono">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <div className="perfil-titulo-info">
                <span className="perfil-titulo-nombre">{t.titulo}</span>
                <span className="perfil-titulo-inst">{t.inst}</span>
              </div>
              <span className="perfil-verificado-badge">Verificado</span>
            </div>
          ))}
          <button className="perfil-link-mas">Ver más información detallada →</button>
        </div>
        <div className="perfil-nivel-card">
          <h4 className="perfil-nivel-titulo">Nivel de Maestría</h4>
          <div className="perfil-nivel-icono">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="1.5"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>
          </div>
          <div className="perfil-nivel-badge-wrap">
            <span className="perfil-nivel-level">LEVEL 5</span>
          </div>
          <p className="perfil-nivel-nombre">Profesional de nivel PLATA</p>
          <p className="perfil-nivel-sub">El 22% superior de la red CODEPLEX</p>
          <p className="perfil-nivel-progreso-txt">Gana 620 puntos más para alcanzar el nivel Oro</p>
        </div>
      </div>
    </div>
  );
}

/* ── Tab: Experiencia ── */
function TabExperiencia() {
  const trabajos = [
    {
      cargo:   "Auditor Externo Senior",
      empresa: "Deloitte Perú S.A.C.",
      periodo: "Período 2019–Actualidad",
      desc:    "Auditorías financieras bajo NIIF para clientes del sector retail e industrial. Revisión de estados financieros, notas explicativas y dictámenes de auditoría para más de 20 empresas anuales.",
    },
    {
      cargo:   "Analista Tributario",
      empresa: "Estudio Carrillo & Asociados SAC",
      periodo: "Período 2016–2019",
      desc:    "Declaraciones mensuales SUNAT (PDT 621, PDT 601), cálculo de IR anual, preparación de libros electrónicos PLE y atención de fiscalizaciones SUNAT. Índice de error 0.8%.",
    },
    {
      cargo:   "Asistente Contable",
      empresa: "Industrias Metálicas del Pacífico S.A.",
      periodo: "Período 2014–2016",
      desc:    "Registro de operaciones contables, conciliaciones bancarias semanales y apoyo en el cierre mensual. Migración del sistema contable a SAP B1.",
    },
  ];
  return (
    <div className="perfil-tab-body">
      <div className="perfil-seccion">
        <h4 className="perfil-seccion-titulo-grande">Experiencia Laboral (Portafolio)</h4>
        {trabajos.map((t, i) => (
          <div key={i} className="perfil-trabajo-item">
            <div className="perfil-trabajo-icono">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
            </div>
            <div className="perfil-trabajo-info">
              <div className="perfil-trabajo-cabecera">
                <span className="perfil-trabajo-cargo">{t.cargo}</span>
                <span className="perfil-trabajo-periodo">{t.periodo}</span>
              </div>
              <span className="perfil-trabajo-empresa">{t.empresa}</span>
              <p className="perfil-trabajo-desc">{t.desc}</p>
            </div>
          </div>
        ))}
        <button className="perfil-link-mas">Ver 3 casos prácticos más →</button>
      </div>
    </div>
  );
}

/* ── Tab: Documentos ── */
const DOCS_MOCK = [
  { titulo: "CV Actualizado 2024",                        sub: "Subido el 15/01/2024 · PDF" },
  { titulo: "Título — Maestría en Impuestos y Finanzas",  sub: "UMSM · Verificado por Codeplex" },
  { titulo: "Licenciatura en Contabilidad",               sub: "Universidad de Lima" },
];

function TabDocumentos({ nombre }) {
  return (
    <div className="perfil-tab-body">
      <div className="perfil-seccion">
        <h4 className="perfil-seccion-titulo-grande">Documentos</h4>
        {DOCS_MOCK.map((doc, i) => (
          <div key={i} className="perfil-doc-item">
            <div className="perfil-doc-icono">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <div className="perfil-doc-info">
              <span className="perfil-doc-titulo">{doc.titulo}</span>
              <span className="perfil-doc-sub">{doc.sub}</span>
            </div>
          </div>
        ))}
        <div className="perfil-doc-alerta">
          🔔 Para acceder a los documentos completos, <strong>{nombre}</strong> debe autorizar tu empresa. Podés solicitarlo a través del botón <strong>Contratar</strong>.
        </div>
      </div>
    </div>
  );
}

/* ── Tab: Métricas ── */
function TabMetricas() {
  const metricasComportamiento = [
    { label: "Participación Profesional", valor: "78.4%", estado: "Estable",  estadoClass: "estable" },
    { label: "Colaboración",              valor: "82.1%", estado: "Óptimo",   estadoClass: "optimo"  },
    { label: "Alcance del Perfil",        valor: "+5%",   estado: "Óptimo",   estadoClass: "optimo"  },
    { label: "Comunicación Efectiva",     valor: "75.3%", estado: "Estable",  estadoClass: "estable" },
  ];
  const metricasProfesionales = [
    { titulo: "Auditoría Financiera",  items: [{ k: "Informes emitidos", v: "32 ✓" }, { k: "Frecuencia", v: "Trimestral" }], precision: "85%" },
    { titulo: "Cumplimiento Tributario", items: [{ k: "Declaraciones", v: "18 ✓" }, { k: "Ciclos", v: "Mensual" }],          precision: "88%" },
    { titulo: "Conciliación Bancaria",  items: [{ k: "Reportes", v: "15 ✓" }, { k: "Verificación", v: "Semanal" }],         precision: "82%" },
  ];
  return (
    <div className="perfil-tab-body">
      <div className="perfil-seccion">
        <div className="perfil-metrica-header">
          <div className="perfil-metrica-icono">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          </div>
          <div>
            <p className="perfil-metrica-titulo">Métricas de comportamiento basadas en la interacción dentro de la plataforma</p>
            <p className="perfil-metrica-subtitulo">Estas métricas reflejan el comportamiento profesional del usuario dentro de la plataforma.</p>
          </div>
        </div>
        <div className="perfil-metricas-grid">
          {metricasComportamiento.map((m, i) => (
            <div key={i} className="perfil-metrica-card">
              <p className="perfil-metrica-card-label">{m.label}</p>
              <p className="perfil-metrica-card-valor">{m.valor}</p>
              <span className={`perfil-metrica-estado ${m.estadoClass}`}>
                {m.estadoClass === "estable" ? "↗" : "●"} {m.estado}
              </span>
              <div className="perfil-metrica-barra"><div className="perfil-metrica-relleno" /></div>
            </div>
          ))}
        </div>
      </div>
      <div className="perfil-seccion">
        <div className="perfil-metrica-header">
          <div className="perfil-metrica-icono">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          </div>
          <div>
            <p className="perfil-metrica-titulo">Métricas profesionales validadas por el sistema</p>
            <p className="perfil-metrica-subtitulo">Calculadas a partir de documentos contables reales cargados y validados por el sistema.</p>
          </div>
        </div>
        <div className="perfil-metricas-pro-grid">
          {metricasProfesionales.map((m, i) => (
            <div key={i} className="perfil-metrica-pro-card">
              <h5 className="perfil-metrica-pro-titulo">{m.titulo}</h5>
              {m.items.map((it, j) => (
                <div key={j} className="perfil-metrica-pro-row">
                  <span>{it.k}</span>
                  <span className="perfil-metrica-pro-val">{it.v}</span>
                </div>
              ))}
              <p className="perfil-metrica-pro-label">Índice de Precisión</p>
              <p className="perfil-metrica-pro-precision">{m.precision}</p>
              <div className="perfil-metrica-barra"><div className="perfil-metrica-relleno" style={{ width: m.precision }} /></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Cabecera de datos compartida entre tabs ── */
function DatosHeader({ nombre, especialidad }) {
  return (
    <>
      <div className="perfil-nombre-wrap" style={{ marginBottom: 4 }}>
        <h2 className="perfil-nombre">{nombre}</h2>
        <span className="perfil-badge-verificado">Verificado</span>
      </div>
      <p className="perfil-especialidad">{especialidad}</p>
      <hr className="perfil-separador" />
    </>
  );
}

/* ── Modal: Contratar ── */
const TIPOS_CONTRATACION = ["Por proyecto", "Por hora", "Mensual", "Freelance"];

function ModalContratar({ nombre, onCerrar }) {
  return (
    <div className="perfil-modal-overlay" onClick={onCerrar}>
      <div className="perfil-modal" onClick={e => e.stopPropagation()}>
        <h3 className="perfil-modal-titulo">Contratar a {nombre}</h3>

        <label className="perfil-modal-campo">
          Título del proyecto
          <input className="perfil-modal-input" placeholder="Nombre del proyecto..." />
        </label>

        <div className="perfil-monto-fila">
          <label className="perfil-modal-campo" style={{ flex: 1 }}>
            Monto
            <div className="perfil-monto-wrap">
              <select className="perfil-modal-moneda"><option>S/.</option><option>$</option></select>
              <input className="perfil-modal-input" type="number" placeholder="0" />
            </div>
          </label>
        </div>

        <label className="perfil-modal-campo">
          Tipo de contratación
          <select className="perfil-modal-input">
            {TIPOS_CONTRATACION.map(t => <option key={t}>{t}</option>)}
          </select>
        </label>

        <label className="perfil-modal-campo">
          Mensaje
          <textarea className="perfil-modal-textarea" rows={4} />
        </label>

        <label className="perfil-modal-check">
          <input type="checkbox" /> Generar pago recurrente
        </label>

        <div className="perfil-modal-acciones">
          <button className="perfil-modal-cancelar" onClick={onCerrar}>Cancelar</button>
          <button className="perfil-modal-enviar">Enviar Solicitud</button>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════
   PerfilPublico — componente principal
══════════════════════════════════════════════════════ */
function PerfilPublico({ usuario, onVolver, alNavegar, onEnviarMensaje, textoAmistad }) {
  const [tab, setTab] = useState("red-social");
  const [modalContratar, setModalContratar] = useState(false);
  const esRedSocial = tab === "red-social";

  /* Usa datos del usuario clickeado o fallback a Juan Pérez */
  const perfil = usuario || USUARIO_JUAN;

  return (
    <>
    {modalContratar && <ModalContratar nombre={perfil.nombre} onCerrar={() => setModalContratar(false)} />}
    <div className="msj-pagina perfil-modo">
      <div className="perfil-panel">
        {/* ── Cabecera ── */}
        <div className="perfil-cabecera">
          <button className="perfil-btn-volver" onClick={onVolver} title="Volver">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          <div className="perfil-hero">
            {/* Foto + badge */}
            <div className="perfil-foto-wrap">
              <img src={perfil.avatar} alt={perfil.nombre} className="perfil-foto" />
              <div className="perfil-golden-badge">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
                GOLDEN BOOK
              </div>
            </div>

            {esRedSocial ? (
              /* ── Red Social: datos (col 2) + botones (col 3) ── */
              <>
                <div className="perfil-datos">
                  <DatosHeader nombre={perfil.nombre} especialidad={perfil.especialidad || USUARIO_JUAN.especialidad} />
                  <div className="perfil-stats" style={{ margin: "10px 0" }}>
                    <span><strong>28</strong> Publicaciones</span>
                    <span><strong>40</strong> Amigos</span>
                    <span><strong>10</strong> amigos en común</span>
                  </div>
                  <div className="perfil-info-row" style={{ margin: "6px 0 8px" }}>
                    <span className="perfil-info-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
                      4.0 · 120 reseñas
                    </span>
                    <span className="perfil-info-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      Lima, Perú
                    </span>
                    <span className="perfil-info-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                      Colegio Angélica Román
                    </span>
                    <span className="perfil-info-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                      +8 años de experiencia
                    </span>
                  </div>
                  <div className="perfil-seguidores-mutuo">
                    <div className="perfil-seg-avatares">
                      {[20, 25, 30].map((img, i) => (
                        <img key={i} src={`https://i.pravatar.cc/150?img=${img}`} alt="" className="perfil-seg-avatar" style={{ marginLeft: i > 0 ? -8 : 0 }} />
                      ))}
                    </div>
                    <span className="perfil-seg-texto">Carlos Valverde y 9 personas más siguen este perfil</span>
                  </div>
                </div>
                <div className="perfil-acciones-red">
                  <button className="perfil-btn-amigos">{textoAmistad || "Añadir amigo"}</button>
                  <button className="perfil-btn-enviar-msj" onClick={() => onEnviarMensaje ? onEnviarMensaje() : alNavegar?.("mensajes")}>Enviar mensaje</button>
                </div>
              </>
            ) : (
              /* ── Otros tabs: Contratar + redes + info ── */
              <>
                <div className="perfil-datos">
                  <DatosHeader nombre={perfil.nombre} especialidad={perfil.especialidad || USUARIO_JUAN.especialidad} />
                  <div className="perfil-info-row">
                    <span className="perfil-info-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
                      3.8 · 64 reseñas
                    </span>
                    <span className="perfil-info-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      Lima, Perú
                    </span>
                    <span className="perfil-info-item">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>
                      +8 años de experiencia
                    </span>
                  </div>
                  <div className="perfil-tags">
                    {["AUDITORIA","NIIF","TRIBUTACIÓN","EXCEL"].map(t => (
                      <span key={t} className="perfil-tag">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="perfil-accion-col">
                  <button className="perfil-btn-contratar" onClick={() => setModalContratar(true)}>Contratar</button>
                  <div className="perfil-redes">
                    <button className="perfil-red-btn" title="Email">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                    </button>
                    <button className="perfil-red-btn" title="LinkedIn">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                    </button>
                    <button className="perfil-red-btn" title="Sitio web">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* ── Tabs ── */}
          <div className="perfil-tabs">
            {TABS_PERFIL.map(t => (
              <button
                key={t.id}
                className={`perfil-tab ${tab === t.id ? "activo" : ""}`}
                onClick={() => setTab(t.id)}
              >{t.label}</button>
            ))}
          </div>
        </div>

        {/* ── Contenido ── */}
        <div className="perfil-contenido">
          {tab === "red-social"  && <TabRedSocial />}
          {tab === "resumen"     && <TabResumen />}
          {tab === "experiencia" && <TabExperiencia />}
          {tab === "documentos"  && <TabDocumentos nombre={perfil.nombre} />}
          {tab === "metricas"    && <TabMetricas />}
        </div>
      </div>
    </div>
    </>
  );
}

export default PerfilPublico;
