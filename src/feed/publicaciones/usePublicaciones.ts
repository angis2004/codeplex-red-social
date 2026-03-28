import { useState, useCallback } from "react";
import { MOCK_POST, PublicacionMock } from "./publicaciones.data";

/**
 * DOMINIO: Feed > Publicaciones
 * Hook que gestiona el estado local de publicaciones (mock).
 * Cuando exista backend, solo se reemplaza la fuente de datos.
 */

type TipoPublicacion = "post" | "video" | "encuesta";

interface Publicacion extends PublicacionMock {
  id: string;
  tipo: TipoPublicacion;
}

const AVATARES_ALEATORIOS: number[] = [12, 15, 18, 20, 22, 25, 30, 33, 35, 40];

function crearIdUnico(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function obtenerTiempoRelativo(): string {
  return "Justo ahora";
}

function extraerHashtags(texto: string): string[] {
  return texto.match(/#\w+/g) ?? [];
}

const POST_INICIAL: Publicacion = {
  id: "mock-1",
  ...MOCK_POST,
  tipo: "post",
};

export default function usePublicaciones() {
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([POST_INICIAL]);

  const crearPublicacion = useCallback(
    (texto: string, autor?: string, avatar?: number, tipo: TipoPublicacion = "post"): boolean => {
      if (!texto.trim()) return false;

      const nueva: Publicacion = {
        id: crearIdUnico(),
        avatarImg: avatar ?? AVATARES_ALEATORIOS[Math.floor(Math.random() * AVATARES_ALEATORIOS.length)],
        author: autor ?? "Usuario",
        time: obtenerTiempoRelativo(),
        text: texto.trim(),
        hashtags: extraerHashtags(texto),
        videoSrc: "",
        videoPoster: "",
        likeCount: 0,
        tipo,
      };

      setPublicaciones((prev) => [nueva, ...prev]);
      return true;
    },
    []
  );

  const obtenerPorTipo = useCallback(
    (tipo: TipoPublicacion): Publicacion[] => {
      if (tipo === "post") return publicaciones;
      return publicaciones.filter((p) => p.tipo === tipo);
    },
    [publicaciones]
  );

  return { publicaciones, crearPublicacion, obtenerPorTipo };
}
