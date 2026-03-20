/**
 * DOMINIO: Feed > Publicaciones
 * Contexto Acotado: Datos mock del feed de publicaciones.
 *
 * Lenguaje Ubicuo:
 *  - Publicacion    : contenido compartido por un usuario en el feed
 *  - Comentario     : respuesta de un usuario a una publicación
 *  - Reaccion       : expresión emocional del usuario hacia una publicación
 */

export interface PublicacionMock {
  avatarImg: number;
  author: string;
  time: string;
  text: string;
  hashtags: string[];
  videoSrc: string;
  videoPoster: string;
  likeCount: number;
}

export interface ComentarioMock {
  img: number;
  name: string;
  text: string;
  time: string;
}

export interface Reaccion {
  icon: string;
  label: string;
  color: string;
}

export const MOCK_POST: PublicacionMock = {
  avatarImg: 12,
  author: "Gabriel Chumpitazi",
  time: "Hace 2 Horas",
  text: "🎉 ¡Nuevo tutorial sobre cómo declarar el IGV correctamente! Espero que les sirva.",
  hashtags: ["#Contabilidad", "#SUNAT"],
  videoSrc: "https://www.pexels.com/es-es/download/video/3692634/",
  videoPoster: "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800",
  likeCount: 124,
};

export const MOCK_COMMENTS: ComentarioMock[] = [
  {
    img: 20,
    name: "María López",
    text: "Excelente tutorial! Muy claro y preciso 🙌",
    time: "Hace 1 hora",
  },
  {
    img: 25,
    name: "Juan Pérez",
    text: "Justo lo que necesitaba para mi declaración mensual 👏",
    time: "Hace 30 min",
  },
];

export const REACTIONS: Reaccion[] = [
  { icon: "like",       label: "Me gusta",  color: "#7F0DF2" },
  { icon: "me_encanta", label: "Me encanta", color: "#ef4444" },
  { icon: "asombro",    label: "Asombro",    color: "#f59e0b" },
];
