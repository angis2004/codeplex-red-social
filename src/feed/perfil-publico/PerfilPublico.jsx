/* ═══════════════════════════════════════════════════════════
   PerfilPublico — Vista completa del perfil de otro usuario
   Bounded Context: Feed > Perfil
   Se abre al hacer clic en avatar/nombre en posts o comentarios
═══════════════════════════════════════════════════════════ */
import React, { useState } from "react";
import AccionesPublicacion from "../publicaciones/AccionesPublicacion";
import Comentarios from "../publicaciones/Comentarios";

/* ── Mock data de Juan Pérez (no es amigo aún) ── */
const USUARIO_JUAN = {
  nombre:       "Juan Pérez",
  avatar:       "https://i.pravatar.cc/150?img=33",
  especialidad: "Asesor Tributario y Auditor Externo · CPA",
};

const TABS_PERFIL = [
  { id: "red-social",  label: "Red Social"  },
  { id: "resumen",     label: "Resumen"     },
  { id: "experiencia", label: "Experiencia" },
  { id: "documentos",  label: "Documentos"  },
  { id: "metricas",    label: "Métricas"    },
];

/* ── helpers ── */
const tabClass = (activo) =>
  `shrink-0 px-4 py-3 border-none bg-transparent text-[13px] cursor-pointer border-b-2 whitespace-nowrap transition-all duration-200 ${
    activo
      ? "text-[var(--primary-color)] border-b-[var(--primary-color)] font-semibold"
      : "font-medium text-[var(--text-muted)] border-b-transparent hover:text-[var(--text-dark)]"
  }`;

const estadoBadgeClass = (tipo) =>
  `text-[11px] font-semibold px-2 py-[2px] rounded-[12px] w-fit ${
    tipo === "optimo"
      ? "bg-[var(--success-bg)] text-[var(--success-color)]"
      : "bg-[var(--info-bg)] text-[var(--info-color)]"
  }`;

const seccion = "bg-[var(--white-color)] rounded-[12px] p-5 border border-[var(--border-color)]";
const tituloSm = "text-[11px] font-bold text-[var(--text-muted)] tracking-[0.5px] m-0 mb-4";
const tituloLg = "text-[16px] font-bold text-[var(--text-dark)] m-0 mb-4";
const iconoBtn = "w-9 h-9 bg-[var(--primary-color)] rounded-[8px] flex items-center justify-center shrink-0";
const barraWrap = "h-1 bg-[var(--border-color)] rounded-[2px] overflow-hidden mt-[6px]";
const barraRelleno = "h-full bg-[var(--primary-color)] rounded-[2px]";

/* ── Tab: Red Social ── */
function TabRedSocial() {
  const [showComments, setShowComments] = useState(false);

  return (
    <div className="flex flex-col gap-5">
      <div className={seccion}>
        <h4 className={tituloSm}>ACTIVIDAD RECIENTE</h4>
        {[
          { texto: "Respondió en comunidad sobre auditoría NIIF", extra: "+20 monedas", hora: "Hace 1 h" },
          { texto: 'Publicó "Checklist de cierre de año fiscal 2024"', hora: "Hace 2 días" },
          { texto: "Obtuvo insignia de Experto Tributario", hora: "Viernes" },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-[10px] py-[10px] border-b border-[var(--border-color)] last:border-b-0">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--primary-color)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10" fill="var(--primary-color)"/>
              <polyline points="9 12 11 14 15 10" stroke="white"/>
            </svg>
            <span className="flex-1 text-[13px] text-[var(--text-dark)]">
              {item.texto}
              {item.extra && <span className="text-[var(--primary-color)] font-semibold"> {item.extra}</span>}
            </span>
            <span className="text-[12px] text-[var(--text-muted)] whitespace-nowrap">{item.hora}</span>
          </div>
        ))}
      </div>

      <div className={seccion}>
        <h4 className={tituloLg}>Publicaciones</h4>
        <div className="border border-[var(--border-color)] rounded-[12px] p-4 mb-3 last:mb-0">
          <div className="flex items-center gap-[10px] mb-[10px]">
            <img src={USUARIO_JUAN.avatar} alt="" className="w-9 h-9 rounded-full object-cover" />
            <div className="flex-1 flex flex-col gap-[2px]">
              <span className="text-[14px] font-semibold text-[var(--text-dark)]">{USUARIO_JUAN.nombre}</span>
              <span className="text-[12px] text-[var(--text-muted)]">
                Hace 2 días · <span className="text-[var(--warning-color)] font-semibold">Plata</span>
              </span>
            </div>
            <button className="bg-transparent border-none text-[var(--text-muted)] cursor-pointer p-1 flex">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <circle cx="12" cy="5" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="12" cy="19" r="1.5"/>
              </svg>
            </button>
          </div>
          <p className="text-[13px] text-[var(--text-dark)] leading-[1.5] m-0 mb-[10px]">
            📊 Checklist de cierre fiscal 2024 para PYMES. Cubre IGV, IR, PDT 621 y conciliación bancaria. Descarga gratuita esta semana.
          </p>
          <div className="flex gap-[6px] mb-[10px] flex-wrap">
            {["#CierreFiscal","#PDT621","#NIIF"].map(t => (
              <span key={t} className="text-[12px] text-[var(--primary-color)] font-medium">{t}</span>
            ))}
          </div>
          <AccionesPublicacion initialLikeCount={43} onToggleComments={() => setShowComments(p => !p)} />
          <Comentarios visible={showComments} />
        </div>

        <div className="border border-[var(--border-color)] rounded-[12px] p-4">
          <div className="flex items-center gap-[10px] mb-[10px]">
            <span className="bg-[var(--success-bg)] text-[var(--success-color)] text-[11px] font-bold px-[10px] py-[3px] rounded-[12px]">Respuesta correcta</span>
            <span className="text-[12px] text-[var(--text-muted)]">en Comunidad · Hace 1 hora</span>
          </div>
          <p className="text-[13px] text-[var(--text-dark)] leading-[1.5] m-0 mb-[10px] italic">
            "Para conciliar el libro banco con el estado de cuenta, primero lista las partidas en tránsito y los cheques pendientes. El saldo ajustado debe coincidir con el saldo contable."
          </p>
          <div className="flex justify-between items-center text-[12px] text-[var(--text-muted)]">
            <span>+20 monedas ganadas · 8 votos útil</span>
            <button className="bg-transparent border-none text-[var(--primary-color)] text-[12px] font-semibold cursor-pointer">Ver en comunidad →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Tab: Resumen ── */
function TabResumen() {
  const titulos = [
    { titulo: "Maestría en Auditoría y Control Interno",          inst: "Universidad de Lima" },
    { titulo: "Certificación CPA — Contador Público",             inst: "Colegio de Contadores de Lima" },
    { titulo: "Especialización en NIIF — Normas Internacionales", inst: "PUCP — Pontificia Universidad Católica del Perú" },
    { titulo: "Curso Avanzado PDT y SUNAT Online",                inst: "Emitido por SUNAT · Válido hasta 2025" },
  ];
  return (
    <div className="flex flex-col gap-5">
      <div className={seccion}>
        <h4 className={tituloLg}>Sobre mi</h4>
        <p className="text-[13px] text-[var(--text-dark)] leading-[1.6] m-0">
          Auditor externo CPA con más de 8 años de experiencia en auditorías financieras para empresas del sector comercial
          e industrial. Especializado en cumplimiento NIIF, declaraciones SUNAT y elaboración de estados financieros para
          medianas empresas peruanas.
        </p>
      </div>
      <div className="grid grid-cols-[1fr_200px] gap-5 items-start [@media(max-width:900px)]:grid-cols-1">
        <div className={seccion}>
          <h4 className={tituloSm}>TITULOS VERIFICADOS</h4>
          {titulos.map((t, i) => (
            <div key={i} className="flex items-center gap-3 py-3 border-b border-[var(--border-color)] last:border-b-0">
              <div className={iconoBtn}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
              </div>
              <div className="flex-1 flex flex-col gap-[2px]">
                <span className="text-[13px] font-semibold text-[var(--text-dark)]">{t.titulo}</span>
                <span className="text-[12px] text-[var(--text-muted)]">{t.inst}</span>
              </div>
              <span className="bg-[var(--success-bg)] text-[var(--success-color)] text-[11px] font-semibold px-2 py-[2px] rounded-[12px] whitespace-nowrap shrink-0">Verificado</span>
            </div>
          ))}
          <button className="bg-transparent border-none text-[var(--primary-color)] text-[13px] font-semibold cursor-pointer pt-[10px] flex items-center gap-[6px]">
            Ver más información detallada →
          </button>
        </div>
        <div className="bg-[var(--white-color)] border border-[var(--border-color)] rounded-[12px] p-5 flex flex-col items-center text-center gap-2 [@media(max-width:900px)]:max-w-[320px]">
          <h4 className="text-[14px] font-bold text-[var(--text-dark)] m-0">Nivel de Maestría</h4>
          <div className="w-16 h-16 bg-gradient-to-br from-[#fef3c7] to-[#fde68a] rounded-full flex items-center justify-center border-[3px] border-[#f59e0b]">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#b45309" strokeWidth="1.5">
              <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
            </svg>
          </div>
          <div className="bg-gradient-to-br from-[#b45309] to-[#f59e0b] text-white text-[10px] font-bold px-[10px] py-[3px] rounded-[6px] tracking-[0.5px]">
            LEVEL 5
          </div>
          <p className="text-[13px] font-bold text-[var(--text-dark)] m-0">Profesional de nivel PLATA</p>
          <p className="text-[12px] text-[var(--text-muted)] m-0">El 22% superior de la red CODEPLEX</p>
          <p className="text-[11px] text-[var(--text-muted)] m-0 leading-[1.4]">Gana 620 puntos más para alcanzar el nivel Oro</p>
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
    <div className="flex flex-col gap-5">
      <div className={seccion}>
        <h4 className={tituloLg}>Experiencia Laboral (Portafolio)</h4>
        {trabajos.map((t, i) => (
          <div key={i} className="flex gap-[14px] py-[14px] border-b border-[var(--border-color)] last:border-b-0">
            <div className="w-10 h-10 bg-[var(--primary-color)] rounded-[8px] flex items-center justify-center shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
              </svg>
            </div>
            <div className="flex-1 flex flex-col gap-[3px]">
              <div className="flex justify-between items-start gap-2">
                <span className="text-[14px] font-bold text-[var(--text-dark)]">{t.cargo}</span>
                <span className="text-[12px] text-[var(--text-muted)] whitespace-nowrap shrink-0">{t.periodo}</span>
              </div>
              <span className="text-[12px] text-[var(--primary-color)] font-semibold">{t.empresa}</span>
              <p className="text-[13px] text-[var(--text-muted)] leading-[1.5] mt-1 m-0">{t.desc}</p>
            </div>
          </div>
        ))}
        <button className="bg-transparent border-none text-[var(--primary-color)] text-[13px] font-semibold cursor-pointer pt-[10px] flex items-center gap-[6px]">
          Ver 3 casos prácticos más →
        </button>
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
    <div className="flex flex-col gap-5">
      <div className={seccion}>
        <h4 className={tituloLg}>Documentos</h4>
        {DOCS_MOCK.map((doc, i) => (
          <div key={i} className="flex items-center gap-[14px] py-3 border-b border-[var(--border-color)] last:border-b-0">
            <div className="w-11 h-11 rounded-[10px] bg-gradient-to-br from-[var(--primary-color)] to-[#7c3aed] flex items-center justify-center shrink-0">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>
              </svg>
            </div>
            <div className="flex flex-col gap-[3px]">
              <span className="text-[14px] font-semibold text-[var(--text-dark)]">{doc.titulo}</span>
              <span className="text-[12px] text-[var(--text-muted)]">{doc.sub}</span>
            </div>
          </div>
        ))}
        <div className="mt-4 px-4 py-3 border border-[var(--warning-border)] rounded-[10px] bg-[var(--warning-bg)] text-[13px] text-[var(--warning-color)] leading-[1.5]">
          🔔 Para acceder a los documentos completos, <strong>{nombre}</strong> debe autorizar tu empresa. Podés solicitarlo a través del botón <strong>Contratar</strong>.
        </div>
      </div>
    </div>
  );
}

/* ── Tab: Métricas ── */
function TabMetricas() {
  const metricasComportamiento = [
    { label: "Participación Profesional", valor: "78.4%", estado: "Estable", estadoClass: "estable" },
    { label: "Colaboración",              valor: "82.1%", estado: "Óptimo",  estadoClass: "optimo"  },
    { label: "Alcance del Perfil",        valor: "+5%",   estado: "Óptimo",  estadoClass: "optimo"  },
    { label: "Comunicación Efectiva",     valor: "75.3%", estado: "Estable", estadoClass: "estable" },
  ];
  const metricasProfesionales = [
    { titulo: "Auditoría Financiera",    items: [{ k: "Informes emitidos", v: "32 ✓" }, { k: "Frecuencia", v: "Trimestral" }], precision: "85%" },
    { titulo: "Cumplimiento Tributario", items: [{ k: "Declaraciones", v: "18 ✓" }, { k: "Ciclos", v: "Mensual" }],           precision: "88%" },
    { titulo: "Conciliación Bancaria",   items: [{ k: "Reportes", v: "15 ✓" }, { k: "Verificación", v: "Semanal" }],          precision: "82%" },
  ];

  const MetricaIcono = () => (
    <div className={iconoBtn}>
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
        <line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>
      </svg>
    </div>
  );

  return (
    <div className="flex flex-col gap-5">
      <div className={seccion}>
        <div className="flex gap-3 items-start mb-4">
          <MetricaIcono />
          <div>
            <p className="text-[13px] font-bold text-[var(--text-dark)] m-0 mb-1 leading-[1.4]">Métricas de comportamiento basadas en la interacción dentro de la plataforma</p>
            <p className="text-[11px] text-[var(--text-muted)] m-0 leading-[1.4]">Estas métricas reflejan el comportamiento profesional del usuario dentro de la plataforma.</p>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3 [@media(max-width:900px)]:grid-cols-2">
          {metricasComportamiento.map((m, i) => (
            <div key={i} className="bg-[var(--background-color)] border border-[var(--border-color)] rounded-[10px] p-[14px] flex flex-col gap-1">
              <p className="text-[11px] text-[var(--text-muted)] m-0 leading-[1.3]">{m.label}</p>
              <p className="text-[22px] font-bold text-[var(--text-dark)] my-1">{m.valor}</p>
              <span className={estadoBadgeClass(m.estadoClass)}>
                {m.estadoClass === "estable" ? "↗" : "●"} {m.estado}
              </span>
              <div className={barraWrap}><div className={`${barraRelleno} w-[90%]`} /></div>
            </div>
          ))}
        </div>
      </div>

      <div className={seccion}>
        <div className="flex gap-3 items-start mb-4">
          <MetricaIcono />
          <div>
            <p className="text-[13px] font-bold text-[var(--text-dark)] m-0 mb-1 leading-[1.4]">Métricas profesionales validadas por el sistema</p>
            <p className="text-[11px] text-[var(--text-muted)] m-0 leading-[1.4]">Calculadas a partir de documentos contables reales cargados y validados por el sistema.</p>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {metricasProfesionales.map((m, i) => (
            <div key={i} className="bg-[var(--background-color)] border border-[var(--border-color)] rounded-[10px] p-4">
              <h5 className="text-[13px] font-bold text-[var(--text-dark)] m-0 mb-3">{m.titulo}</h5>
              {m.items.map((it, j) => (
                <div key={j} className="flex justify-between text-[12px] text-[var(--text-muted)] py-1 border-b border-[var(--border-color)] mb-1">
                  <span>{it.k}</span>
                  <span className="font-bold text-[var(--text-dark)]">{it.v}</span>
                </div>
              ))}
              <p className="text-[11px] text-[var(--text-muted)] mt-2 mb-[2px]">Índice de Precisión</p>
              <p className="text-[18px] font-bold text-[var(--primary-color)] m-0 mb-[6px]">{m.precision}</p>
              <div className={barraWrap}>
                <div className={barraRelleno} style={{ width: m.precision }} />
              </div>
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
      <div className="flex items-center gap-2 flex-wrap [@media(max-width:520px)]:justify-center" style={{ marginBottom: 4 }}>
        <h2 className="text-[20px] font-bold text-[var(--text-dark)] m-0">{nombre}</h2>
        <span className="bg-[var(--success-bg)] text-[var(--success-color)] text-[11px] font-semibold px-2 py-[2px] rounded-[12px] border border-[var(--success-border)]">Verificado</span>
      </div>
      <p className="text-[13px] text-[var(--text-muted)] mt-1 mb-3">{especialidad}</p>
      <hr className="border-none border-t border-[var(--border-color)] my-[10px] mb-3" />
    </>
  );
}

/* ── Modal: Contratar ── */
const TIPOS_CONTRATACION = ["Por proyecto", "Por hora", "Mensual", "Freelance"];

function ModalContratar({ nombre, onCerrar }) {
  const inputCls = "px-[14px] py-[10px] border border-[var(--border-color)] rounded-[8px] text-[14px] bg-[var(--white-color)] text-[var(--text-dark)] outline-none focus:border-[var(--primary-color)]";
  return (
    <div className="fixed inset-0 bg-[rgba(0,0,0,0.45)] flex items-center justify-center z-[2000]" onClick={onCerrar}>
      <div className="bg-[var(--white-color)] rounded-[16px] p-7 w-full max-w-[480px] flex flex-col gap-[14px] shadow-[0_8px_32px_rgba(0,0,0,0.18)]" onClick={e => e.stopPropagation()}>
        <h3 className="text-[17px] font-bold text-[var(--text-dark)] m-0">Contratar a {nombre}</h3>

        <label className="flex flex-col gap-[6px] text-[13px] font-semibold text-[var(--text-dark)]">
          Título del proyecto
          <input className={inputCls} placeholder="Nombre del proyecto..." />
        </label>

        <div className="flex gap-3">
          <label className="flex flex-col gap-[6px] text-[13px] font-semibold text-[var(--text-dark)] flex-1">
            Monto
            <div className="flex">
              <select className="px-2 py-[10px] border border-[var(--border-color)] border-r-0 rounded-[8px_0_0_8px] text-[13px] bg-[var(--white-color)] text-[var(--text-dark)] outline-none cursor-pointer">
                <option>S/.</option><option>$</option>
              </select>
              <input className="px-[14px] py-[10px] border border-[var(--border-color)] rounded-[0_8px_8px_0] text-[14px] bg-[var(--white-color)] text-[var(--text-dark)] outline-none focus:border-[var(--primary-color)] flex-1 min-w-0" type="number" placeholder="0" />
            </div>
          </label>
        </div>

        <label className="flex flex-col gap-[6px] text-[13px] font-semibold text-[var(--text-dark)]">
          Tipo de contratación
          <select className={inputCls}>
            {TIPOS_CONTRATACION.map(t => <option key={t}>{t}</option>)}
          </select>
        </label>

        <label className="flex flex-col gap-[6px] text-[13px] font-semibold text-[var(--text-dark)]">
          Mensaje
          <textarea className="px-[14px] py-[10px] border border-[var(--border-color)] rounded-[8px] text-[14px] bg-[var(--white-color)] text-[var(--text-dark)] outline-none resize-y font-[inherit] focus:border-[var(--primary-color)]" rows={4} />
        </label>

        <label className="flex items-center gap-2 text-[13px] text-[var(--text-dark)] cursor-pointer">
          <input type="checkbox" /> Generar pago recurrente
        </label>

        <div className="flex justify-end gap-[10px] mt-1">
          <button className="px-[22px] py-[10px] border border-[var(--border-color)] rounded-[8px] bg-transparent text-[14px] font-semibold text-[var(--text-dark)] cursor-pointer hover:bg-[var(--background-color)]" onClick={onCerrar}>Cancelar</button>
          <button className="px-[22px] py-[10px] border-none rounded-[8px] bg-[var(--primary-color)] text-white text-[14px] font-semibold cursor-pointer hover:bg-[var(--secondary-color)]">Enviar Solicitud</button>
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

  const perfil = usuario || USUARIO_JUAN;

  const btnAmigoCls = "py-[9px] px-[22px] bg-transparent text-[var(--primary-color)] border-[1.5px] border-[var(--primary-color)] rounded-[8px] text-[14px] font-semibold cursor-pointer whitespace-nowrap transition-colors duration-200 hover:bg-[var(--primary-color)] hover:text-white [@media(max-width:680px)]:px-4 [@media(max-width:680px)]:text-[13px] [@media(max-width:680px)]:flex-1 [@media(max-width:520px)]:px-2 [@media(max-width:520px)]:py-[10px]";
  const btnMsjCls   = "py-[9px] px-[22px] bg-[var(--primary-color)] text-white border-none rounded-[8px] text-[14px] font-semibold cursor-pointer whitespace-nowrap transition-colors duration-200 hover:bg-[var(--secondary-color)] [@media(max-width:680px)]:px-4 [@media(max-width:680px)]:text-[13px] [@media(max-width:680px)]:flex-1 [@media(max-width:520px)]:px-2 [@media(max-width:520px)]:py-[10px]";
  const redBtnCls   = "w-8 h-8 flex items-center justify-center border-[1.5px] border-[var(--border-color)] bg-[var(--white-color)] rounded-[8px] text-[var(--text-muted)] cursor-pointer transition-all duration-200 hover:border-[var(--color-red-social)] hover:text-[var(--color-red-social)] hover:bg-[rgba(53,5,99,0.05)]";

  return (
    <>
      {modalContratar && <ModalContratar nombre={perfil.nombre} onCerrar={() => setModalContratar(false)} />}
      <div className="w-full">
        <div className="flex flex-col bg-[var(--background-color)] w-full">

          {/* ── Cabecera ── */}
          <div className="bg-[var(--white-color)] rounded-[12px] border border-[var(--border-color)] shadow-[var(--shadow-sm)] shrink-0 min-w-0 overflow-hidden">
            <button
              className="flex items-center gap-[6px] bg-transparent border-none text-[var(--text-dark)] cursor-pointer text-[13px] font-medium px-5 pt-3 pb-2 opacity-70 hover:opacity-100 transition-opacity duration-200"
              onClick={onVolver} title="Volver"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>

            {/* ── Hero grid ── */}
            <div className="grid grid-cols-[auto_1fr_auto] gap-6 px-7 pb-5 pt-1 items-start [@media(max-width:900px)]:gap-4 [@media(max-width:900px)]:px-5 [@media(max-width:680px)]:grid-cols-[auto_1fr] [@media(max-width:680px)]:gap-3 [@media(max-width:680px)]:px-4 [@media(max-width:680px)]:pb-4 [@media(max-width:520px)]:grid-cols-1 [@media(max-width:520px)]:gap-2 [@media(max-width:520px)]:px-2 [@media(max-width:520px)]:justify-items-center">

              {/* Foto + golden badge */}
              <div className="flex flex-col items-center shrink-0 gap-2">
                <img src={perfil.avatar} alt={perfil.nombre} className="w-[90px] h-[90px] rounded-full object-cover border-[3px] border-[var(--border-color)]" />
                <div className="flex items-center gap-1 bg-gradient-to-br from-[#b45309] to-[#f59e0b] text-white text-[9px] font-bold tracking-[0.3px] px-2 py-1 rounded-[6px] whitespace-nowrap">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>
                  GOLDEN BOOK
                </div>
              </div>

              {esRedSocial ? (
                <>
                  {/* Datos — Red Social */}
                  <div className="flex-1 min-w-0 flex flex-col [@media(max-width:520px)]:w-full [@media(max-width:520px)]:text-center">
                    <DatosHeader nombre={perfil.nombre} especialidad={perfil.especialidad || USUARIO_JUAN.especialidad} />
                    <div className="flex flex-wrap gap-x-5 gap-y-[6px] text-[13px] text-[var(--text-muted)] [@media(max-width:520px)]:justify-center" style={{ margin: "10px 0" }}>
                      <span><strong className="text-[var(--text-dark)] font-bold">28</strong> Publicaciones</span>
                      <span><strong className="text-[var(--text-dark)] font-bold">40</strong> Amigos</span>
                      <span><strong className="text-[var(--text-dark)] font-bold">10</strong> amigos en común</span>
                    </div>
                    <div className="flex flex-wrap gap-x-[10px] gap-y-1 [@media(max-width:520px)]:justify-center" style={{ margin: "6px 0 8px" }}>
                      {[
                        { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>, label: "4.0 · 120 reseñas" },
                        { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, label: "Lima, Perú" },
                        { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>, label: "Colegio Angélica Román" },
                        { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>, label: "+8 años de experiencia" },
                      ].map((item, i) => (
                        <span key={i} className="flex items-center gap-1 text-[12px] text-[var(--text-muted)]">{item.icon}{item.label}</span>
                      ))}
                    </div>
                    <div className="flex items-center gap-2 mt-2 [@media(max-width:520px)]:justify-center">
                      <div className="flex items-center">
                        {[20, 25, 30].map((img, i) => (
                          <img key={i} src={`https://i.pravatar.cc/150?img=${img}`} alt="" className="w-6 h-6 rounded-full border-2 border-[var(--white-color)] object-cover" style={{ marginLeft: i > 0 ? -8 : 0 }} />
                        ))}
                      </div>
                      <span className="text-[12px] text-[var(--text-muted)]">Carlos Valverde y 9 personas más siguen este perfil</span>
                    </div>
                  </div>
                  {/* Botones amistad */}
                  <div className="flex flex-row gap-[10px] shrink-0 items-start [@media(max-width:680px)]:col-span-full [@media(max-width:680px)]:items-center [@media(max-width:680px)]:justify-start [@media(max-width:520px)]:col-auto [@media(max-width:520px)]:w-full">
                    <button className={btnAmigoCls}>{textoAmistad || "Añadir amigo"}</button>
                    <button className={btnMsjCls} onClick={() => onEnviarMensaje ? onEnviarMensaje() : alNavegar?.("mensajes")}>Enviar mensaje</button>
                  </div>
                </>
              ) : (
                <>
                  {/* Datos — otros tabs */}
                  <div className="flex-1 min-w-0 flex flex-col [@media(max-width:520px)]:w-full [@media(max-width:520px)]:text-center">
                    <DatosHeader nombre={perfil.nombre} especialidad={perfil.especialidad || USUARIO_JUAN.especialidad} />
                    <div className="flex flex-wrap gap-x-[10px] gap-y-1 mb-3 [@media(max-width:520px)]:justify-center">
                      {[
                        { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="#f59e0b"><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/></svg>, label: "3.8 · 64 reseñas" },
                        { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>, label: "Lima, Perú" },
                        { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/></svg>, label: "+8 años de experiencia" },
                      ].map((item, i) => (
                        <span key={i} className="flex items-center gap-1 text-[12px] text-[var(--text-muted)]">{item.icon}{item.label}</span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-[6px] mt-[2px] [@media(max-width:520px)]:justify-center">
                      {["AUDITORIA","NIIF","TRIBUTACIÓN","EXCEL"].map(t => (
                        <span key={t} className="bg-[var(--primary-color)] text-white text-[11px] font-semibold px-[10px] py-[3px] rounded-[4px] tracking-[0.3px]">{t}</span>
                      ))}
                    </div>
                  </div>
                  {/* Botón contratar + redes */}
                  <div className="flex flex-col items-end gap-[14px] shrink-0 [@media(max-width:680px)]:col-span-full [@media(max-width:680px)]:flex-row [@media(max-width:680px)]:items-center [@media(max-width:680px)]:justify-between [@media(max-width:520px)]:col-auto [@media(max-width:520px)]:items-center [@media(max-width:520px)]:justify-center">
                    <button className="py-[9px] px-5 bg-[var(--primary-color)] text-white border-none rounded-[8px] text-[13px] font-semibold cursor-pointer whitespace-nowrap shrink-0 transition-colors duration-200 hover:bg-[var(--secondary-color)]" onClick={() => setModalContratar(true)}>
                      Contratar
                    </button>
                    <div className="flex gap-2">
                      <button className={redBtnCls} title="Email">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                      </button>
                      <button className={redBtnCls} title="LinkedIn">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg>
                      </button>
                      <button className={redBtnCls} title="Sitio web">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* ── Tabs ── */}
            <div className="flex px-6 border-t border-[var(--border-color)] overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {TABS_PERFIL.map(t => (
                <button key={t.id} className={tabClass(tab === t.id)} onClick={() => setTab(t.id)}>
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          {/* ── Contenido ── */}
          <div className="overflow-y-auto p-5 px-6 pt-5 [@media(max-width:520px)]:px-0 [@media(max-width:520px)]:pb-0 [@media(max-width:520px)]:pt-3">
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
