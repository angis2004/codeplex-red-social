import { useState, useCallback } from "react";
import { MOCK_POST } from "../ui/publicaciones/publicaciones.data";

/**
 * DOMINIO: Feed > Publicaciones
 * Hook que gestiona el estado local de publicaciones (mock).
 * Cuando exista backend, solo se reemplaza la fuente de datos.
 */

const AVATARES_ALEATORIOS = [12, 15, 18, 20, 22, 25, 30, 33, 35, 40];

function crearIdUnico() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function obtenerTiempoRelativo() {
  return "Justo ahora";
}

// Post inicial del mock para que el feed no arranque vacío
const POST_INICIAL = {
  id: "mock-1",
  ...MOCK_POST,
  tipo: "post",
};

export default function usePublicaciones() {
  const [publicaciones, setPublicaciones] = useState([POST_INICIAL]);

  const crearPublicacion = useCallback((texto, autor, avatar, tipo = "post") => {
    if (!texto.trim()) return false;

    const nueva = {
      id: crearIdUnico(),
      avatarImg: avatar || AVATARES_ALEATORIOS[Math.floor(Math.random() * AVATARES_ALEATORIOS.length)],
      author: autor || "Usuario",
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
  }, []);

  const obtenerPorTipo = useCallback(
    (tipo) => {
      if (tipo === "post") return publicaciones;
      return publicaciones.filter((p) => p.tipo === tipo);
    },
    [publicaciones]
  );

  return { publicaciones, crearPublicacion, obtenerPorTipo };
}

/** Extrae hashtags del texto (ej: "#Contabilidad" → ["#Contabilidad"]) */
function extraerHashtags(texto) {
  const matches = texto.match(/#\w+/g);
  return matches || [];
}
