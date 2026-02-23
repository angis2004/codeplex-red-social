import IconFlecha from '../../../assets/icons/flecha.svg?react'
import IconHome from '../../../assets/icons/home.svg?react'
import IconBuzon from '../../../assets/icons/icon-buzon.svg?react'
import IconCanjeMonedas from '../../../assets/icons/icon-canje-monedas.svg?react'
import IconColaboradores from '../../../assets/icons/icon-colaboradores.svg?react'
import IconCompartidos from '../../../assets/icons/icon-compartidos.svg?react'
import IconDatosFacturacion from '../../../assets/icons/icon-datos-facturacion.svg?react'
import IconEmpresa from '../../../assets/icons/icon-empresa.svg?react'
import IconEncuesta from '../../../assets/icons/icon-encuesta.svg?react'
import IconMantenedores from '../../../assets/icons/icon-mantenedores.svg?react'
import IconMonedero from '../../../assets/icons/icon-monedero.svg?react'
import IconMonetizacion from '../../../assets/icons/icon-monetizacion.svg?react'
import IconPost from '../../../assets/icons/icon-post.svg?react'
import IconTickets from '../../../assets/icons/icon-tickets.svg?react'
import IconTusPost from '../../../assets/icons/icon-tus-post.svg?react'
import IconVideos from '../../../assets/icons/icon-videos.svg?react'
import IconInformacion from '../../../assets/icons/informacion.svg?react'
import IconLike from '../../../assets/icons/like.svg?react'
import IconMeEncanta from '../../../assets/icons/me-encanta.svg?react'
import IconAsombro from '../../../assets/icons/asombro.svg?react'
import IconComment from '../../../assets/icons/comment.svg?react'
import IconShare from '../../../assets/icons/share.svg?react'
import IconExportar from '../../../assets/icons/exportar.svg?react'
import IconLibroRanking from '../../../assets/icons/libro-ranking.svg?react'
import IconLibroDiamante from '../../../assets/icons/libro-diamante.svg?react'
import IconLibroOro from '../../../assets/icons/libro-oro.svg?react'
import IconLibroPlata from '../../../assets/icons/libro-plata.svg?react'
import IconLibroBronce from '../../../assets/icons/libro-bronce.svg?react'
import IconAyuda from '../../../assets/icons/ayuda.svg?react'
import IconNotificaciones from '../../../assets/icons/notificaciones.svg?react'
import IconArrowRigth from '../../../assets/icons/arrow-rigth.svg?react'
import IconFecha from '../../../assets/icons/fecha.svg?react'
import IconGuardar from '../../../assets/icons/guardar.svg?react'
import IconCerrar from '../../../assets/icons/cerrar.svg?react'

const ICONS = {
  flecha: IconFlecha,
  home: IconHome,
  buzon: IconBuzon,
  canjeMonedas: IconCanjeMonedas,
  colaboradores: IconColaboradores,
  compartidos: IconCompartidos,
  datosFacturacion: IconDatosFacturacion,
  empresa: IconEmpresa,
  encuesta: IconEncuesta,
  mantenedores: IconMantenedores,
  monedero: IconMonedero,
  monetizacion: IconMonetizacion,
  post: IconPost,
  tickets: IconTickets,
  tusPost: IconTusPost,
  videos: IconVideos,
  informacion: IconInformacion,
  like: IconLike,
  me_encanta: IconMeEncanta,
  asombro: IconAsombro,
  comment: IconComment,
  share: IconShare,
  exportar: IconExportar,
  libro_ranking: IconLibroRanking,
  libro_oro: IconLibroOro,
  libro_plata: IconLibroPlata,
  libro_bronce: IconLibroBronce,
  libro_diamante: IconLibroDiamante,
  ayuda: IconAyuda,
  notificaciones: IconNotificaciones,
  arrow_right: IconArrowRigth,
  fecha: IconFecha,
  guardar: IconGuardar,
  cerrar: IconCerrar,

}

function Icon({ name, size = 20, className = '', color }) {
  const SvgIcon = ICONS[name]

  if (!SvgIcon) {
    console.warn(`Icon "${name}" no existe`)
    return null
  }

  return (
    <SvgIcon
      width={size}
      height={size}
      className={`icon ${className}`}
      style={{
        display: 'block',
        flexShrink: 0,
        ...(color && { color }),
      }}
    />
  )
}

export default Icon
