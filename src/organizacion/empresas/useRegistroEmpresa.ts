/**
 * useFormEmpresa.ts
 * Bounded Context: Organización > Empresa
 *
 * Caso de uso: crear / registrar una empresa.
 * Contiene el estado del formulario, validaciones y submit.
 *
 * TODO: cuando el backend esté listo, reemplazar alExito()
 *       con una llamada al repositorio (POST /api/empresas).
 */

import { useState, useEffect } from "react";

/* ── Tipo de la entidad Empresa (formulario) ── */
export interface FormEmpresa {
  ruc:             string;
  razonSocial:     string;
  nombreComercial: string;
  direccion:       string;
  ubigeo:          string;
  telefonoPrefijo: string;
  telefono:        string;
  email:           string;
  webpage:         string;
  rubro:           string;
  planCuentas:     string;
  activo:          boolean;
  darBaja:         boolean;
  fechaBaja:       string;
}

export type ErroresEmpresa = Partial<Record<keyof FormEmpresa, string>>;

/* ── Estado inicial ── */
const FORM_INICIAL: FormEmpresa = {
  ruc:             "",
  razonSocial:     "",
  nombreComercial: "",
  direccion:       "",
  ubigeo:          "",
  telefonoPrefijo: "+51",
  telefono:        "",
  email:           "",
  webpage:         "",
  rubro:           "",
  planCuentas:     "",
  activo:          true,
  darBaja:         false,
  fechaBaja:       "",
};

/* ── Hook ── */
export function useRegistroEmpresa({
  estaAbierto,
  alExito,
  alCerrar,
}: {
  estaAbierto: boolean;
  alExito?: (empresa: FormEmpresa) => void;
  alCerrar: () => void;
}) {
  const [form, setForm]     = useState<FormEmpresa>(FORM_INICIAL);
  const [errors, setErrors] = useState<ErroresEmpresa>({});

  /* Resetear formulario al cerrar */
  useEffect(() => {
    if (!estaAbierto) {
      const t = setTimeout(() => {
        setForm(FORM_INICIAL);
        setErrors({});
      }, 300);
      return () => clearTimeout(t);
    }
  }, [estaAbierto]);

  /* Helpers */
  const set = (key: keyof FormEmpresa, val: FormEmpresa[keyof FormEmpresa]) =>
    setForm(f => ({ ...f, [key]: val }));

  const clearErr = (key: keyof FormEmpresa) =>
    setErrors(e => ({ ...e, [key]: "" }));

  /* Validación */
  const validar = (): boolean => {
    const e: ErroresEmpresa = {};

    if (!form.ruc.trim())                              e.ruc            = "Obligatorio";
    else if (!/^\d{11}$/.test(form.ruc))               e.ruc            = "11 digitos";
    if (!form.razonSocial.trim())                      e.razonSocial    = "Obligatorio";
    if (!form.nombreComercial.trim())                  e.nombreComercial = "Obligatorio";
    if (!form.direccion.trim())                        e.direccion      = "Obligatorio";
    if (!form.telefono.trim())                         e.telefono       = "Obligatorio";
    if (!form.email.trim())                            e.email          = "Obligatorio";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email   = "Email invalido";
    if (!form.rubro)                                   e.rubro          = "Obligatorio";
    if (!form.planCuentas)                             e.planCuentas    = "Obligatorio";

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* Submit — TODO: reemplazar con POST al backend */
  const handleSubmit = () => {
    if (!validar()) return;
    alExito?.(form);
    alCerrar();
  };

  return { form, errors, set, clearErr, handleSubmit };
}
