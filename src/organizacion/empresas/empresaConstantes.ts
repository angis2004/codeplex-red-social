/**
 * empresaConstantes.ts
 * Bounded Context: Organización > Empresa
 *
 * Datos estáticos del dominio empresa.
 * TODO: cuando el backend exponga estos catálogos por API,
 *       reemplazar con una llamada al repositorio correspondiente.
 */

export const RUBROS: string[] = [
  "Contabilidad y Finanzas",
  "Tecnologia",
  "Salud",
  "Educacion",
  "Construccion",
  "Comercio",
  "Manufactura",
  "Servicios",
  "Otro",
];

export const PLANES_CUENTA: string[] = [
  "Plan General Empresarial",
  "Plan MYPE",
  "Plan Simplificado",
];

export const UBIGEOS: string[] = [
  "LIMA - LIMA - MIRAFLORES",
  "LIMA - LIMA - SAN ISIDRO",
  "LIMA - LIMA - SAN BORJA",
  "LIMA - LIMA - SURCO",
  "LIMA - LIMA - LA MOLINA",
  "LIMA - LIMA - ATE",
  "LIMA - LIMA - CERCADO",
  "LIMA - LIMA - SAN MIGUEL",
  "LIMA - LIMA - JESUS MARIA",
  "LIMA - LIMA - LINCE",
  "LIMA - LIMA - PUEBLO LIBRE",
  "LIMA - LIMA - MAGDALENA",
  "LIMA - LIMA - BARRANCO",
  "LIMA - LIMA - CHORRILLOS",
  "LIMA - LIMA - SURQUILLO",
  "LIMA - LIMA - BREÑA",
  "LIMA - LIMA - RIMAC",
  "LIMA - LIMA - SAN MARTIN DE PORRES",
  "LIMA - LIMA - LOS OLIVOS",
  "LIMA - LIMA - INDEPENDENCIA",
  "LIMA - LIMA - CARABAYLLO",
  "LIMA - LIMA - COMAS",
  "LIMA - LIMA - SAN JUAN DE LURIGANCHO",
  "LIMA - LIMA - VILLA EL SALVADOR",
  "LIMA - LIMA - VILLA MARIA DEL TRIUNFO",
  "AREQUIPA - AREQUIPA - AREQUIPA",
  "AREQUIPA - AREQUIPA - CAYMA",
  "CUSCO - CUSCO - CUSCO",
  "TRUJILLO - LA LIBERTAD - TRUJILLO",
  "CHICLAYO - LAMBAYEQUE - CHICLAYO",
  "PIURA - PIURA - PIURA",
  "IQUITOS - LORETO - IQUITOS",
  "TACNA - TACNA - TACNA",
  "HUANCAYO - JUNIN - HUANCAYO",
  "PUNO - PUNO - PUNO",
];

export interface PrefijoTelefono {
  code: string;
  label: string;
}

export const PREFIJOS: PrefijoTelefono[] = [
  { code: "+51", label: "PE" },
  { code: "+1",  label: "US" },
  { code: "+54", label: "AR" },
  { code: "+55", label: "BR" },
  { code: "+56", label: "CL" },
  { code: "+57", label: "CO" },
  { code: "+58", label: "VE" },
  { code: "+52", label: "MX" },
  { code: "+34", label: "ES" },
  { code: "+44", label: "UK" },
  { code: "+49", label: "DE" },
  { code: "+33", label: "FR" },
  { code: "+39", label: "IT" },
  { code: "+81", label: "JP" },
  { code: "+86", label: "CN" },
  { code: "+61", label: "AU" },
];
