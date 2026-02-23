import React, { useState, useEffect, useRef } from "react";
import "./ModalCrearEmpresa.css";
import Icon from "../../../common/Icon/Icon";

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

function ModalCrearEmpresa({ isOpen, onClose, onSuccess }) {
  const [form, setForm] = useState(FORM_INICIAL);
  const [errors, setErrors] = useState({});
  const [alertaVisible, setAlertaVisible] = useState(true);
  const overlayRef = useRef();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setAlertaVisible(true);
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(() => {
        setForm(FORM_INICIAL);
        setErrors({});
      }, 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  if (!isOpen) return null;

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
    onSuccess?.(form);
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div className="mce-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className={`mce-modal ${isOpen ? "mce-modal--open" : ""}`}>

        {/* HEADER */}
        <div className="mce-header">
          <div className="mce-header-bg" />
          <div className="mce-header-content">
          <div className="mce-header-top">
              <div className="mce-title-group">
                <div className="mce-icon-empresa">
                  <Icon name="empresa" size={22} />
                </div>
                <div className="mce-title-text">
                  <h2 className="mce-title">Mis Empresas</h2>
                  <p className="mce-subtitle">Administra todas tus Empresas registradas</p>
                </div>
              </div>
            <button className="mce-close" onClick={onClose} aria-label="Cerrar">
                <Icon name="cerrar" size={10} />
              </button>
            </div>
          </div>
        </div>

        {/* BODY */}
        <div className="mce-body">

          {/* Alerta bienvenida */}
          {alertaVisible && (
            <div className="mce-alerta">
              <span className="mce-alerta-icon"><Icon name="informacion" size={16} /></span>
              <p className="mce-alerta-texto">
                Crea tu primera empresa para empezar a trabajar. Recuerda colocar todos
                tus datos y en caso de que ya termines, se habilitara en el sidebar una
                seccion de empresas donde veras todas las que agregues.
              </p>
              <button className="mce-alerta-close" onClick={() => setAlertaVisible(false)}>
                <Icon name="cerrar" size={10} />
              </button>
            </div>
          )}

          {/* Fila 1: RUC (izq) | Nombre Comercial (der) */}
          <div className="mce-grid-2">
            <Field label="RUC" required error={errors.ruc}>
              <div className="mce-ruc-wrapper">
                <input
                  className={`mce-input ${errors.ruc ? "mce-input--error" : ""}`}
                  placeholder="Ingrese su RUC"
                  maxLength={11}
                  value={form.ruc}
                  onChange={e => { set("ruc", e.target.value.replace(/\D/g, "")); clearErr("ruc"); }}
                />
                <button
                  className="mce-btn-validar"
                  onClick={() => {
                    if (/^\d{11}$/.test(form.ruc)) alert("Validando con SUNAT...");
                  }}
                >
                  Validar
                </button>
              </div>
            </Field>

            <Field label="Nombre Comercial" required error={errors.nombreComercial}>
              <input
                className={`mce-input ${errors.nombreComercial ? "mce-input--error" : ""}`}
                placeholder="Empresa BASE"
                value={form.nombreComercial}
                onChange={e => { set("nombreComercial", e.target.value); clearErr("nombreComercial"); }}
              />
            </Field>
          </div>

          {/* Fila 2: Nombre / Razon Social ancho completo */}
          <div className="mce-field mce-field--full">
            <label className="mce-label">Nombre / Razon Social<span className="mce-requerido">*</span></label>
            <input
              className={`mce-input ${errors.razonSocial ? "mce-input--error" : ""}`}
              placeholder="Firme SAC"
              value={form.razonSocial}
              onChange={e => { set("razonSocial", e.target.value); clearErr("razonSocial"); }}
            />
            {errors.razonSocial && <span className="mce-error">{errors.razonSocial}</span>}
          </div>

          {/* Seccion: Informacion */}
          <SectionTitle>Informacion</SectionTitle>

          {/* Fila: Direccion | Buscar Ubigeo */}
          <div className="mce-grid-2">
            <Field label="Direccion" required error={errors.direccion}>
              <input
                className={`mce-input ${errors.direccion ? "mce-input--error" : ""}`}
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

          {/* Fila 1: Telefono | Email */}
          <div className="mce-grid-2">
            <Field label="Telefono" required error={errors.telefono}>
              <div style={{ display: "flex", gap: 6 }}>
                <CustomSelect
                  options={PREFIJOS.map(p => p.code + " " + p.label)}
                  value={form.telefonoPrefijo}
                  placeholder="+00"
                  onChange={v => set("telefonoPrefijo", v)}
                  compact={true}
                />
                <input
                  className={`mce-input ${errors.telefono ? "mce-input--error" : ""}`}
                  placeholder="N de telefono"
                  value={form.telefono}
                  onChange={e => { set("telefono", e.target.value); clearErr("telefono"); }}
                />
              </div>
            </Field>
            <Field label="Email" required error={errors.email}>
              <input
                className={`mce-input ${errors.email ? "mce-input--error" : ""}`}
                placeholder="empresa@email.com"
                type="email"
                value={form.email}
                onChange={e => { set("email", e.target.value); clearErr("email"); }}
              />
            </Field>
          </div>

          {/* Fila 2: WebPage — ancho completo */}
          <div className="mce-field mce-field--full">
            <label className="mce-label">WebPage</label>
            <input
              className="mce-input"
              placeholder="www.empresa.com"
              value={form.webpage}
              onChange={e => set("webpage", e.target.value)}
            />
          </div>

          {/* Fila: Rubro | Plan de Cuenta */}
          <div className="mce-grid-2">
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

          {/* Fila 1: Solo toggle Activo/Inactivo */}
          <div className="mce-activo-row">
            <button
              className={`mce-toggle-switch ${form.activo && !form.darBaja ? "mce-toggle-switch--on" : ""}`}
              onClick={() => { if (!form.darBaja) set("activo", !form.activo); }}
              disabled={form.darBaja}
            >
              <div className="mce-toggle-thumb" />
            </button>
            <span className={`mce-toggle-label ${form.darBaja ? "mce-toggle-label--muted" : ""}`}>
              {form.activo && !form.darBaja ? "Activo" : "Inactivo"}
            </span>
          </div>

          {/* Fila 2: Toggle Dar de Baja + Fecha */}
          <div className="mce-baja-row">
            <div className="mce-baja-toggle-group">
              <button
                className={`mce-toggle-switch ${form.darBaja ? "mce-toggle-switch--on mce-toggle-switch--baja" : ""}`}
                onClick={() => {
                  const nuevoBaja = !form.darBaja;
                  set("darBaja", nuevoBaja);
                  if (nuevoBaja) set("activo", false);
                  if (!nuevoBaja) set("fechaBaja", "");
                }}
              >
                <div className="mce-toggle-thumb" />
              </button>
              <span className="mce-toggle-label">Dar de Baja</span>
            </div>

            <div className="mce-baja-fecha-group">
              <label className="mce-label">
                Fecha de baja
                {form.darBaja && <span className="mce-requerido">*</span>}
              </label>
              <div className="mce-date-input">
                <input
                  className={`mce-input mce-input--with-icon ${!form.darBaja ? "mce-input--disabled" : ""}`}
                  type="date"
                  disabled={!form.darBaja}
                  value={form.fechaBaja}
                  onChange={e => set("fechaBaja", e.target.value)}
                  style={{ colorScheme: "none", WebkitAppearance: "none" }}
                />
                <span className="mce-date-icon">
                  <Icon name="fecha" size={18} />
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* FOOTER */}
        <div className="mce-footer">
          <button className="mce-btn mce-btn--outline" onClick={onClose}>
            <Icon name="cancelar" size={14} />
            Cancelar
          </button>
          <button className="mce-btn mce-btn--primary" onClick={handleSubmit}>
            <Icon name="guardar" size={14} />
            Guardar
          </button>
        </div>

      </div>
    </div>
  );
}

// Subcomponentes

function SectionTitle({ children }) {
  return (
    <div style={{
      fontSize: 13,
      fontWeight: 700,
      color: "#374151",
      borderBottom: "1.5px solid #e5e7eb",
      paddingBottom: 6,
      marginBottom: 14,
      marginTop: 4,
    }}>
      {children}
    </div>
  );
}

function Field({ label, required, error, children }) {
  return (
    <div className="mce-field">
      <label className="mce-label">
        {label}
        {required && <span className="mce-requerido">*</span>}
      </label>
      {children}
      {error && <span className="mce-error">{error}</span>}
    </div>
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

  // En modo compact mostramos solo el codigo (ej: "+51")
  const displayValue = compact && value ? value.split(" ")[0] : value;

  return (
    <div className={`mce-select ${error ? "mce-select--error" : ""} ${compact ? "mce-select--compact" : ""}`} ref={ref}>
      <button className="mce-select-trigger" onClick={() => setOpen(o => !o)}>
        <span className={value ? "" : "mce-select-placeholder"}>
          {displayValue || placeholder}
        </span>
        <svg
          className={`mce-select-arrow ${open ? "mce-select-arrow--open" : ""}`}
          width="13" height="13" viewBox="0 0 24 24"
          fill="none" stroke="currentColor" strokeWidth="2.5"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>
      {open && (
        <ul className="mce-select-dropdown">
          {options.map(opt => (
            <li
              key={opt}
              className={`mce-select-option ${value === opt ? "mce-select-option--active" : ""}`}
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

export default ModalCrearEmpresa;