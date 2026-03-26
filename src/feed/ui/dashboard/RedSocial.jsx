import React from "react";
import TarjetasEstadisticas from "./TarjetasEstadisticas";
import CreadorPublicacion from "../publicaciones/CreadorPublicacion";
import PublicacionesFeed from "../publicaciones/PublicacionesFeed";
import TarjetaMonedero from "../../../planes/monedero/ui/TarjetaMonedero";
import RankingUsuarios from "./RankingUsuarios";
import MensajesFlotante from "../buzon/MensajesFlotante";
import usePublicaciones from "../../aplicacion/usePublicaciones";
import "./Red-social.css";

// RedSocial es el ORQUESTADOR — conecta creador ↔ feed via usePublicaciones
function RedSocial({ alNavegar, alVerPerfil }) {
  const { publicaciones, crearPublicacion, obtenerPorTipo } = usePublicaciones();

  return (
    <div className="dashboard">
      <div className="dashboard-left">
        <TarjetasEstadisticas />
        <CreadorPublicacion onPublicar={crearPublicacion} />
        <PublicacionesFeed publicaciones={publicaciones} obtenerPorTipo={obtenerPorTipo} alVerPerfil={alVerPerfil} />
      </div>

      <div className="dashboard-right">
        <TarjetaMonedero />
        <RankingUsuarios />
      </div>

      <MensajesFlotante alNavegar={alNavegar} />
    </div>
  );
}

export default RedSocial;
