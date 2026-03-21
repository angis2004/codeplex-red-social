import React from "react";
import TarjetasEstadisticas from "./TarjetasEstadisticas";
import CreadorPublicacion from "../publicaciones/CreadorPublicacion";
import PublicacionesFeed from "../publicaciones/PublicacionesFeed";
import TarjetaMonedero from "../../../planes/monedero/ui/TarjetaMonedero";
import RankingUsuarios from "./RankingUsuarios";
import MensajesFlotante from "../buzon/MensajesFlotante";
import "./Red-social.css";

// RedSocial es solo un ORQUESTADOR — no tiene lógica propia
function RedSocial({ alNavegar }) {
  return (
    <div className="dashboard">
      <div className="dashboard-left">
        <TarjetasEstadisticas />
        <CreadorPublicacion />
        <PublicacionesFeed />
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
