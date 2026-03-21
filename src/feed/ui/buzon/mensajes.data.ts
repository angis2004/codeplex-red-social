/* ═══════════════════════════════════════════════════════════
   DATOS MOCK — Widget flotante de Mensajes
   Bounded Context: Feed > Buzón
═══════════════════════════════════════════════════════════ */

export interface Mensaje {
  id: string;
  texto: string;
  hora: string;
  esPropio: boolean;
}

export interface Conversacion {
  id: string;
  nombre: string;
  avatar: string;
  ultimoMensaje: string;
  hora: string;
  sinLeer: number;
  enLinea: boolean;
  ultimaActividad: string;
  mensajes: Mensaje[];
}

export interface ContactoSugerido {
  id: string;
  nombre: string;
  avatar: string;
  enLinea: boolean;
}

export const CONVERSACIONES_MOCK: Conversacion[] = [
  {
    id: "conv-1",
    nombre: "María Gonzales",
    avatar: "https://i.pravatar.cc/150?img=5",
    ultimoMensaje: "¿Podrías explicarme el proceso...?",
    hora: "09:30",
    sinLeer: 2,
    enLinea: true,
    ultimaActividad: "Última actividad hace 30 minutos",
    mensajes: [
      { id: "m1", texto: "¿Podrías explicarme el proceso?", hora: "09:30", esPropio: false },
      { id: "m2", texto: "¡Claro! Te explico paso a paso 😊", hora: "09:30", esPropio: true },
      { id: "m3", texto: "Entra a Contabilidad → Reportes → Declaraciones", hora: "09:30", esPropio: true },
    ],
  },
  {
    id: "conv-2",
    nombre: "Carlos Valverde",
    avatar: "https://i.pravatar.cc/150?img=8",
    ultimoMensaje: "Gracias por la ayuda!",
    hora: "Ayer",
    sinLeer: 0,
    enLinea: false,
    ultimaActividad: "Última actividad hace 2 horas",
    mensajes: [
      { id: "m4", texto: "Hola, necesito ayuda con la facturación", hora: "14:00", esPropio: false },
      { id: "m5", texto: "Claro, dime qué necesitas", hora: "14:05", esPropio: true },
      { id: "m6", texto: "Gracias por la ayuda!", hora: "14:30", esPropio: false },
    ],
  },
  {
    id: "conv-3",
    nombre: "Ana Torres",
    avatar: "https://i.pravatar.cc/150?img=9",
    ultimoMensaje: "¿Ya revisaste el reporte?",
    hora: "Ayer",
    sinLeer: 0,
    enLinea: true,
    ultimaActividad: "En línea",
    mensajes: [
      { id: "m7", texto: "¿Ya revisaste el reporte?", hora: "10:00", esPropio: false },
    ],
  },
  {
    id: "conv-4",
    nombre: "Juan Pérez",
    avatar: "https://i.pravatar.cc/150?img=11",
    ultimoMensaje: "Perfecto, lo reviso mañana",
    hora: "Ayer",
    sinLeer: 0,
    enLinea: false,
    ultimaActividad: "Última actividad hace 5 horas",
    mensajes: [
      { id: "m8", texto: "Perfecto, lo reviso mañana", hora: "18:00", esPropio: false },
    ],
  },
];

export const SUGERIDOS_MOCK: ContactoSugerido[] = [
  { id: "sug-1", nombre: "Ana Torres", avatar: "https://i.pravatar.cc/150?img=9", enLinea: true },
  { id: "sug-2", nombre: "Pedro García", avatar: "https://i.pravatar.cc/150?img=15", enLinea: false },
];
