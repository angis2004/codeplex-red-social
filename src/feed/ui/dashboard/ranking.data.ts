/**
 * DOMINIO: Feed > Dashboard
 * Contexto Acotado: Ranking y gamificación de usuarios en la red social.
 *
 * Lenguaje Ubicuo:
 *  - UsuarioRanking  : usuario con su posición y porcentaje de habilidades en el ranking semanal
 *  - NivelRango      : categoría de prestigio del usuario (Bronce, Plata, Oro, Diamante)
 *  - PorcentajeSkill : métrica de 0–100 que determina el NivelRango del usuario
 *  - IconoRango      : identificador del ícono visual del rango (referencia al sistema de íconos)
 */

export interface UsuarioRanking {
  avatarId: number;
  nombre: string;
  porcentajeSkill: number;
}

export interface NivelRango {
  icono: string;
  color: string;
  nombre: string;
}

export const USUARIOS_RANKING: UsuarioRanking[] = [
  { avatarId: 33, nombre: "Carlos Valverde", porcentajeSkill: 98 },
  { avatarId: 34, nombre: "María González",  porcentajeSkill: 85 },
  { avatarId: 35, nombre: "Juan Pérez",      porcentajeSkill: 55 },
  { avatarId: 36, nombre: "Ana Torres",      porcentajeSkill: 8  },
];

/**
 * Devuelve el NivelRango correspondiente al porcentajeSkill del usuario.
 * Regla de negocio: los umbrales son 90 (Diamante), 70 (Oro), 40 (Plata), resto (Bronce).
 */
export function resolverNivelRango(porcentajeSkill: number): NivelRango {
  if (porcentajeSkill >= 90) return { icono: "libro_diamante", color: "#00E5FF", nombre: "Diamante" };
  if (porcentajeSkill >= 70) return { icono: "libro_oro",      color: "#FFD700", nombre: "Oro"      };
  if (porcentajeSkill >= 40) return { icono: "libro_plata",    color: "#C0C0C0", nombre: "Plata"    };
  return                            { icono: "libro_bronce",   color: "#CD7F32", nombre: "Bronce"   };
}
