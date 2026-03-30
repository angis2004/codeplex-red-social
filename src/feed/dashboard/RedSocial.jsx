import React from "react";
import TarjetasEstadisticas from "./TarjetasEstadisticas";
import CreadorPublicacion from "../publicaciones/CreadorPublicacion";
import PublicacionesFeed from "../publicaciones/PublicacionesFeed";
import TarjetaMonedero from "../../planes/monedero/TarjetaMonedero";
import RankingUsuarios from "./RankingUsuarios";
import MensajesFlotante from "../buzon/MensajesFlotante";
import usePublicaciones from "../publicaciones/usePublicaciones";
import "./Red-social.css";

// RedSocial es el ORQUESTADOR — conecta creador ↔ feed via usePublicaciones
function RedSocial({ alNavegar, alVerPerfil }) {
  const { publicaciones, crearPublicacion, obtenerPorTipo } = usePublicaciones();

  return (
    <div className="grid grid-cols-[1fr_350px] gap-5 [@media(max-width:1400px)]:grid-cols-1">
      <div className="flex flex-col gap-5 min-w-0">
        <TarjetasEstadisticas />
        <CreadorPublicacion onPublicar={crearPublicacion} />
        <PublicacionesFeed publicaciones={publicaciones} obtenerPorTipo={obtenerPorTipo} alVerPerfil={alVerPerfil} />
      </div>

      <div className="flex flex-col gap-5 [@media(max-width:1400px)]:grid [@media(max-width:1400px)]:grid-cols-2 [@media(max-width:1400px)]:gap-5 [@media(max-width:768px)]:grid-cols-1">
        <TarjetaMonedero />
        <RankingUsuarios />
      </div>

      <MensajesFlotante alNavegar={alNavegar} />
    </div>
  );
}

export default RedSocial;
