import React, { useState, useEffect, useRef } from "react";
import Icon from "../../../compartido/Icon/Icon";

const RUBROS = [
  "Contabilidad y Finanzas", "Tecnologia", "Salud", "Educacion",
  "Construccion", "Comercio", "Manufactura", "Servicios", "Otro",
];

const PLANES_CUENTA = [
  "Plan General Empresarial", "Plan MYPE", "Plan Simplificado",
];

const UBIGEOS = [
  "LIMA - LIMA - MIRAFLORES", "LIMA - LIMA - SAN ISIDRO", "LIMA - LIMA - SAN BORJA",
  "LIMA - LIMA - SURCO", "LIMA - LIMA - LA MOLINA", "LIMA - LIMA - ATE",
  "LIMA - LIMA - CERCADO", "LIMA - LIMA - SAN MIGUEL", "LIMA - LIMA - JESUS MARIA",
  "LIMA - LIMA - LINCE", "LIMA - LIMA - PUEBLO LIBRE", "LIMA - LIMA - MAGDALENA",
  "LIMA - LIMA - BARRANCO", "LIMA - LIMA - CHORRILLOS", "LIMA - LIMA - SURQUILLO",
  "LIMA - LIMA - BREÑA", "LIMA - LIMA - RIMAC", "LIMA - LIMA - SAN MARTIN DE PORRES",
  "LIMA - LIMA - LOS OLIVOS", "LIMA - LIMA - INDEPENDENCIA", "LIMA - LIMA - CARABAYLLO",
  "LIMA - LIMA - COMAS", "LIMA - LIMA - SAN JUAN DE LURIGANCHO",
  "LIMA - LIMA - VILLA EL SALVADOR", "LIMA - LIMA - VILLA MARIA DEL TRIUNFO",
  "AREQUIPA - AREQUIPA - AREQUIPA", "AREQUIPA - AREQUIPA - CAYMA",
  "CUSCO - CUSCO - CUSCO", "TRUJILLO - LA LIBERTAD - TRUJILLO",
  "CHICLAYO - LAMBAYEQUE - CHICLAYO", "PIURA - PIURA - PIURA",
  "IQUITOS - LORETO - IQUITOS", "TACNA - TACNA - TACNA",
  "HUANCAYO - JUNIN - HUANCAYO", "PUNO - PUNO - PUNO",
];

const PREFIJOS = [
  { code: "+51", label: "PE" }, { code: "+1",  label: "US" },
  { code: "+54", label: "AR" }, { code: "+55", label: "BR" },
  { code: "+56", label: "CL" }, { code: "+57", label: "CO" },
  { code: "+58", label: "VE" }, { code: "+52", label: "MX" },
  { code: "+34", label: "ES" }, { code: "+44", label: "UK" },
  { code: "+49", label: "DE" }, { code: "+33", label: "FR" },
  { code: "+39", label: "IT" }, { code: "+81", label: "JP" },
  { code: "+86", label: "CN" }, { code: "+61", label: "AU" },
];

const FORM_INICIAL = {
  ruc: "",
  razonSocial: "",
  nombreComercial: "",
  direccion: "",
  ubigeo: "",
  telefonoPrefijo: "+51",
  telefono: "",
  email: "",
  webpage: "",
  rubro: "",
  planCuentas: "",
  activo: true,
  darBaja: false,
  fechaBaja: "",
};

/* ── Clases reutilizables ── */
const inputCls = (error) =>
  `h-[38px] px-3 border-[1.5px] rounded-[9px] text-[13.5px] font-[inherit] transition-all outline-none w-full box-border
   border-[var(--input-border)] bg-[var(--input-bg)] text-[var(--input-text)]
   focus:border-[var(--secondary-color)] focus:bg-[var(--white-color)] focus:shadow-[0_0_0_3px_var(--focus-ring)]
   ${error ? "border-[var(--error-color)] bg-[var(--error-bg)]" : ""}`;

function RegistroEmpresa({ estaAbierto, alCerrar, alExito }) {
  const [form, setForm] = useState(FORM_INICIAL);
  const [errors, setErrors] = useState({});
  const overlayRef = useRef();

  useEffect(() => {
    document.body.style.overflow = estaAbierto ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [estaAbierto]);

  useEffect(() => {
    if (!estaAbierto) {
      const t = setTimeout(() => { setForm(FORM_INICIAL); setErrors({}); }, 300);
      return () => clearTimeout(t);
    }
  }, [estaAbierto]);

  if (!estaAbierto) return null;

  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const clearErr = (key) => setErrors(e => ({ ...e, [key]: "" }));

  const validar = () => {
    const e = {};
    if (!form.ruc.trim()) e.ruc = "Obligatorio";
    else if (!/^\d{11}$/.test(form.ruc)) e.ruc = "11 digitos";
    if (!form.razonSocial.trim()) e.razonSocial = "Obligatorio";
    if (!form.nombreComercial.trim()) e.nombreComercial = "Obligatorio";
    if (!form.direccion.trim()) e.direccion = "Obligatorio";
    if (!form.telefono.trim()) e.telefono = "Obligatorio";
    if (!form.email.trim()) e.email = "Obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email invalido";
    if (!form.rubro) e.rubro = "Obligatorio";
    if (!form.planCuentas) e.planCuentas = "Obligatorio";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validar()) return;
    alExito?.(form);
    alCerrar();
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) alCerrar();
  };

  return (
    <div
      className="fixed inset-0 z-[9999] bg-[rgba(15,10,30,0.65)] backdrop-blur-[8px] flex items-center justify-center p-4 [animation:mce-fade-in_0.2s_ease]"
      ref={overlayRef}
      onClick={handleOverlayClick}
    >
      <div
        className="bg-[var(--white-color)] rounded-[18px] w-full max-w-[600px] max-h-[92vh] flex flex-col overflow-hidden"
        style={{
          boxShadow: "var(--shadow-lg), var(--shadow-md)",
          transform: estaAbierto ? "translateY(0) scale(1)" : "translateY(24px) scale(0.98)",
          opacity: estaAbierto ? 1 : 0,
          transition: "transform 0.28s cubic-bezier(0.34, 1.4, 0.64, 1), opacity 0.22s ease",
        }}
      >

        {/* HEADER */}
        <div
          className="relative overflow-hidden px-6 pt-[22px] shrink-0"
          style={{ background: "linear-gradient(140deg, var(--secondary-color) 0%, #4a2fcf 60%, #3520a0 100%)" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at 90% -10%, rgba(160,130,255,0.3) 0%, transparent 55%), radial-gradient(ellipse at -5% 110%, rgba(103,75,234,0.4) 0%, transparent 50%)" }}
          />
          <div className="relative z-[1]">
            <div className="flex items-start justify-between mb-[18px]">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="w-[42px] h-[42px] rounded-xl bg-white/15 backdrop-blur-[6px] flex items-center justify-center border border-white/20 shrink-0 text-white [&_svg]:brightness-0 [&_svg]:invert [&_img]:brightness-0 [&_img]:invert">
                  <Icon name="empresa" size={22} />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-[17px] font-bold text-white m-0 mb-0.5 whitespace-nowrap overflow-hidden text-ellipsis">Mis Empresas</h2>
                  <p className="text-xs text-white/60 m-0 whitespace-nowrap overflow-hidden text-ellipsis">Administra todas tus Empresas registradas</p>
                </div>
              </div>
              <button
                className="w-8 h-8 rounded-[9px] bg-white/[0.12] border border-white/[0.18] text-white/75 cursor-pointer flex items-center justify-center transition-all shrink-0 hover:bg-white/[0.22] hover:text-white"
                onClick={alCerrar}
                aria-label="Cerrar"
              >
                <Icon name="cerrar" size={10} />
              </button>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="mce-body flex-1 overflow-y-auto px-6 py-[22px]">

          {/* Fila 1: RUC | Nombre Comercial */}
          <div className="grid grid-cols-2 gap-3.5 mb-3.5 max-[560px]:grid-cols-1">
            <Field label="RUC" required error={errors.ruc}>
              <div className="flex gap-[7px]">
                <input
                  className={`${inputCls(errors.ruc)} flex-1`}
                  placeholder="Ingrese su RUC"
                  maxLength={11}
                  value={form.ruc}
                  onChange={e => { set("ruc", e.target.value.replace(/\D/g, "")); clearErr("ruc"); }}
                />
                <button
                  className="h-[38px] px-3.5 rounded-[9px] text-white text-[12.5px] font-semibold border-0 cursor-pointer whitespace-nowrap font-[inherit] transition-all shrink-0 hover:-translate-y-px"
                  style={{ background: "linear-gradient(135deg, var(--secondary-color), #4a2fcf)", boxShadow: "var(--shadow-primary)" }}
                  onClick={() => { if (/^\d{11}$/.test(form.ruc)) alert("Validando con SUNAT..."); }}
                >
                  Validar
                </button>
              </div>
            </Field>

            <Field label="Nombre Comercial" required error={errors.nombreComercial}>
              <input
                className={inputCls(errors.nombreComercial)}
                placeholder="Empresa BASE"
                value={form.nombreComercial}
                onChange={e => { set("nombreComercial", e.target.value); clearErr("nombreComercial"); }}
              />
            </Field>
          </div>

          {/* Fila 2: Razon Social — ancho completo */}
          <div className="flex flex-col gap-[5px] mb-3.5">
            <label className="text-xs font-semibold text-[var(--text-dark)]">
              Nombre / Razon Social<span className="text-[var(--error-color)] ml-0.5">*</span>
            </label>
            <input
              className={inputCls(errors.razonSocial)}
              placeholder="Firme SAC"
              value={form.razonSocial}
              onChange={e => { set("razonSocial", e.target.value); clearErr("razonSocial"); }}
            />
            {errors.razonSocial && <span className="text-[11px] text-[var(--error-color)]">{errors.razonSocial}</span>}
          </div>

          {/* Sección: Informacion */}
          <SectionTitle>Informacion</SectionTitle>

          {/* Fila: Direccion | Ubigeo */}
          <div className="grid grid-cols-2 gap-3.5 mb-3.5 max-[560px]:grid-cols-1">
            <Field label="Direccion" required error={errors.direccion}>
              <input
                className={inputCls(errors.direccion)}
                placeholder="Av. Javier Prado"
                value={form.direccion}
                onChange={e => { set("direccion", e.target.value); clearErr("direccion"); }}
              />
            </Field>
            <Field label="Buscar Ubigeo">
              <CustomSelect
                options={UBIGEOS}
                value={form.ubigeo}
                placeholder="Seleccione ubigeo..."
                onChange={v => set("ubigeo", v)}
              />
            </Field>
          </div>

          {/* Fila: Telefono | Email */}
          <div className="grid grid-cols-2 gap-3.5 mb-3.5 max-[560px]:grid-cols-1">
            <Field label="Telefono" required error={errors.telefono}>
              <div className="flex gap-1.5">
                <CustomSelect
                  options={PREFIJOS.map(p => p.code + " " + p.label)}
                  value={form.telefonoPrefijo}
                  placeholder="+00"
                  onChange={v => set("telefonoPrefijo", v)}
                  compact
                />
                <input
                  className={`${inputCls(errors.telefono)} flex-1`}
                  placeholder="N de telefono"
                  value={form.telefono}
                  onChange={e => { set("telefono", e.target.value); clearErr("telefono"); }}
                />
              </div>
            </Field>
            <Field label="Email" required error={errors.email}>
              <input
                className={inputCls(errors.email)}
                placeholder="empresa@email.com"
                type="email"
                value={form.email}
                onChange={e => { set("email", e.target.value); clearErr("email"); }}
              />
            </Field>
          </div>

          {/* WebPage — ancho completo */}
          <div className="flex flex-col gap-[5px] mb-3.5">
            <label className="text-xs font-semibold text-[var(--text-dark)]">WebPage</label>
            <input
              className={inputCls(false)}
              placeholder="www.empresa.com"
              value={form.webpage}
              onChange={e => set("webpage", e.target.value)}
            />
          </div>

          {/* Fila: Rubro | Plan de Cuenta */}
          <div className="grid grid-cols-2 gap-3.5 mb-3.5 max-[560px]:grid-cols-1">
            <Field label="Seleccionar Rubro" required error={errors.rubro}>
              <CustomSelect
                options={RUBROS}
                value={form.rubro}
                placeholder="Seleccione ..."
                onChange={v => { set("rubro", v); clearErr("rubro"); }}
                error={!!errors.rubro}
              />
            </Field>
            <Field label="Tipo Plan de Cuenta" required error={errors.planCuentas}>
              <CustomSelect
                options={PLANES_CUENTA}
                value={form.planCuentas}
                placeholder="Seleccione ..."
                onChange={v => { set("planCuentas", v); clearErr("planCuentas"); }}
                error={!!errors.planCuentas}
              />
            </Field>
          </div>

          {/* Toggle Activo/Inactivo */}
          <div className="flex items-center gap-2.5 mb-3">
            <ToggleSwitch
              on={form.activo && !form.darBaja}
              disabled={form.darBaja}
              onChange={() => { if (!form.darBaja) set("activo", !form.activo); }}
            />
            <span className={`text-[13px] text-[var(--text-dark)] cursor-pointer min-w-[52px] ${form.darBaja ? "opacity-40" : ""}`}>
              {form.activo && !form.darBaja ? "Activo" : "Inactivo"}
            </span>
          </div>

          {/* Dar de Baja + Fecha */}
          <div className="grid grid-cols-[auto_1fr] gap-4 items-end mb-1.5 max-[560px]:grid-cols-1 max-[560px]:gap-2.5">
            <div className="flex items-center gap-2 pb-2 whitespace-nowrap max-[560px]:pb-0">
              <ToggleSwitch
                on={form.darBaja}
                baja
                onChange={() => {
                  const nuevoBaja = !form.darBaja;
                  set("darBaja", nuevoBaja);
                  if (nuevoBaja) set("activo", false);
                  if (!nuevoBaja) set("fechaBaja", "");
                }}
              />
              <span className="text-[13px] text-[var(--text-dark)] cursor-pointer min-w-[52px]">Dar de Baja</span>
            </div>

            <div className="flex flex-col gap-[5px]">
              <label className="text-xs font-semibold text-[var(--text-dark)]">
                Fecha de baja
                {form.darBaja && <span className="text-[var(--error-color)] ml-0.5">*</span>}
              </label>
              <div className="relative">
                <input
                  className={`${inputCls(false)} pr-[38px] ${!form.darBaja ? "opacity-45 cursor-not-allowed" : ""}`}
                  type="date"
                  disabled={!form.darBaja}
                  value={form.fechaBaja}
                  onChange={e => set("fechaBaja", e.target.value)}
                  style={{ colorScheme: "none", WebkitAppearance: "none" }}
                />
                <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none">
                  <Icon name="fecha" size={18} />
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-end px-6 py-3.5 border-t border-[var(--border-light)] bg-[var(--white-color)] gap-2.5">
          <button
            className="flex items-center gap-1.5 px-[18px] h-[38px] rounded-[9px] text-[13.5px] font-semibold cursor-pointer font-[inherit] transition-all bg-transparent text-[var(--text-muted)] border-[1.5px] border-[var(--input-border)] hover:border-[var(--secondary-color)] hover:text-[var(--secondary-color)]"
            onClick={alCerrar}
          >
            <Icon name="cancelar" size={14} />
            Cancelar
          </button>
          <button
            className="flex items-center gap-1.5 px-[18px] h-[38px] rounded-[9px] text-[13.5px] font-semibold cursor-pointer font-[inherit] transition-all text-white hover:-translate-y-px hover:shadow-[0_6px_18px_rgba(103,75,234,0.4)]"
            style={{ background: "linear-gradient(135deg, var(--secondary-color), #4a2fcf)", boxShadow: "var(--shadow-primary)" }}
            onClick={handleSubmit}
          >
            <Icon name="guardar" size={14} />
            Guardar
          </button>
        </div>

      </div>
    </div>
  );
}

/* ── Subcomponentes ── */

function SectionTitle({ children }) {
  return (
    <div className="text-[13px] font-bold text-gray-700 border-b-[1.5px] border-gray-200 pb-1.5 mb-3.5 mt-1">
      {children}
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div className="flex flex-col gap-[5px]">
      <label className="text-xs font-semibold text-[var(--text-dark)]">
        {label}
        {required && <span className="text-[var(--error-color)] ml-0.5">*</span>}
      </label>
      {children}
      {error && <span className="text-[11px] text-[var(--error-color)]">{error}</span>}
    </div>
  );
}

function ToggleSwitch({ on, baja, disabled, onChange }) {
  return (
    <button
      className={`w-10 h-[22px] rounded-[11px] relative transition-colors duration-[250ms] shrink-0 cursor-pointer border-0 p-0
        ${on && baja ? "bg-[var(--error-color)]" : on ? "bg-[var(--secondary-color)]" : "bg-[var(--border-color)]"}`}
      onClick={onChange}
      disabled={disabled}
    >
      <div
        className="absolute top-0.5 left-0.5 w-[18px] h-[18px] rounded-full bg-[var(--surface-color)] shadow-[0_1px_4px_rgba(0,0,0,0.15)] transition-transform duration-[250ms] [transition-timing-function:cubic-bezier(0.34,1.4,0.64,1)]"
        style={{ transform: on ? "translateX(18px)" : "translateX(0)" }}
      />
    </button>
  );
}

function CustomSelect({ options, value, placeholder, onChange, error, compact }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const displayValue = compact && value ? value.split(" ")[0] : value;

  return (
    <div
      className={`relative ${compact ? "shrink-0 w-20" : ""}`}
      ref={ref}
    >
      <button
        className={`w-full h-[38px] border-[1.5px] rounded-[9px] text-[13.5px] font-[inherit] cursor-pointer flex items-center justify-between transition-all text-left
          bg-[var(--input-bg)] text-[var(--input-text)]
          hover:border-[var(--secondary-color)] hover:bg-[var(--white-color)]
          focus:border-[var(--secondary-color)] focus:bg-[var(--white-color)] focus:outline-none focus:shadow-[0_0_0_3px_var(--focus-ring)]
          ${error ? "border-[var(--error-color)]" : "border-[var(--input-border)]"}
          ${compact ? "px-2 gap-1" : "px-3"}`}
        onClick={() => setOpen(o => !o)}
      >
        <span className={value ? "" : "text-[var(--text-muted)]"}>
          {displayValue || placeholder}
        </span>
        <svg
          className={`transition-transform duration-200 text-[var(--text-muted)] shrink-0 ${open ? "rotate-180" : ""}`}
          width="13" height="13" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {open && (
        <ul
          className={`absolute top-[calc(100%+4px)] left-0 right-0 z-[200] bg-[var(--white-color)] border-[1.5px] border-violet-700/15 rounded-[11px] list-none p-[5px] m-0 max-h-[180px] overflow-y-auto [animation:mce-slide-in-kf_0.14s_ease]
            ${compact ? "w-40" : ""}
          `}
          style={{ boxShadow: "var(--shadow-lg), var(--shadow-md)" }}
        >
          {options.map(opt => (
            <li
              key={opt}
              className={`px-[11px] py-2 rounded-[7px] text-[13px] text-[var(--text-dark)] cursor-pointer flex items-center justify-between transition-colors hover:bg-[var(--hover-color)]
                ${value === opt ? "bg-[var(--hover-color)] text-[var(--secondary-color)] font-semibold" : ""}`}
              onClick={() => { onChange(opt); setOpen(false); }}
            >
              {opt}
              {value === opt && (
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default RegistroEmpresa;
