import React from "react";
import TarjetasEstadisticas from "./TarjetasEstadisticas";
import CreadorPublicacion from "../publicaciones/CreadorPublicacion";
import PublicacionesFeed from "../publicaciones/PublicacionesFeed";
import TarjetaMonedero from "../../planes/monedero/TarjetaMonedero";
import RankingUsuarios from "./RankingUsuarios";
import "./Red-social.css";

// RedSocial es solo un ORQUESTADOR — no tiene lógica propia
function RedSocial({ modoExploracion, alIniciarSesion }) {
  return (
    <div className="dashboard">
      <div className="dashboard-left">
        <TarjetasEstadisticas />
        <CreadorPublicacion modoExploracion={modoExploracion} alIniciarSesion={alIniciarSesion} />
        <PublicacionesFeed modoExploracion={modoExploracion} alIniciarSesion={alIniciarSesion} />
      </div>

      <div className="dashboard-right">
        <TarjetaMonedero />
        <RankingUsuarios />
      </div>
    </div>
  );
}

export default RedSocial;
