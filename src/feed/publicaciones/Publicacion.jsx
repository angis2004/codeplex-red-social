import React, { useState } from "react";
import AccionesPublicacion from "./AccionesPublicacion";
import Comentarios from "./Comentarios";

function Publicacion({ post, alVerPerfil }) {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = () => setShowComments((prev) => !prev);

  const avatarSrc = `https://i.pravatar.cc/150?img=${post.avatarImg}`;
  const handleVerAutor = () => alVerPerfil?.({ nombre: post.author, avatar: avatarSrc });

  return (
    <div className="bg-[var(--white-color)] px-8 py-7 rounded-[15px] shadow-[0_2px_8px_rgba(0,0,0,0.05)] mb-5 [@media(max-width:480px)]:px-[15px] [@media(max-width:480px)]:py-5">

      {/* Cabecera: avatar + nombre + tiempo */}
      <div className="flex justify-between items-center mb-[18px]">
        <div className="flex items-center gap-[14px]">
          <img
            src={avatarSrc}
            alt={post.author}
            className="w-12 h-12 rounded-full object-cover cursor-pointer"
            onClick={handleVerAutor}
          />
          <div>
            <div
              className="font-semibold text-[15px] text-[var(--text-dark)] mb-1 cursor-pointer"
              onClick={handleVerAutor}
            >{post.author}</div>
            <div className="text-[13px] text-[var(--text-gray)]">{post.time}</div>
          </div>
        </div>
        <button className="bg-transparent border-none cursor-pointer text-[var(--text-muted)] text-[24px] p-1 px-2 transition-colors duration-300 hover:text-[var(--text-dark)]">&#x22EF;</button>
      </div>

      {/* Texto + hashtags */}
      <div className="mb-[18px]">
        <p className="text-[var(--text-dark)] leading-[1.6] text-[15px] mb-3">{post.text}</p>
        {post.hashtags?.length > 0 && (
          <div className="flex gap-[10px] flex-wrap">
            {post.hashtags.map((tag) => (
              <span key={tag} className="text-[var(--primary-color)] font-semibold text-[14px] cursor-pointer transition-opacity duration-300 hover:opacity-80">{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Video (opcional) */}
      {post.videoSrc && (
        <div className="my-[18px] rounded-[14px] overflow-hidden bg-black [@media(max-width:768px)]:mt-3 [@media(max-width:768px)]:mb-0 [@media(max-width:768px)]:rounded-[10px] [@media(max-width:480px)]:mt-[10px] [@media(max-width:480px)]:rounded-[8px]">
          <div className="relative w-full aspect-video bg-[#0f0f0f] rounded-[14px] overflow-hidden [@media(max-width:768px)]:rounded-[10px] [@media(max-width:480px)]:rounded-[8px]">
            <video
              className="w-full h-full object-contain block rounded-[14px] bg-[#0f0f0f] [@media(max-width:768px)]:rounded-[10px] [@media(max-width:480px)]:rounded-[8px]"
              src={post.videoSrc}
              controls
              preload="metadata"
              poster={post.videoPoster}
            />
          </div>
        </div>
      )}

      {/* Footer: reacciones + comentarios */}
      <div className="mt-4 pt-3 border-t border-[var(--border-color)]">
        <AccionesPublicacion
          initialLikeCount={post.likeCount}
          onToggleComments={toggleComments}
        />
        <div className="h-px bg-[var(--border-color)] my-1"></div>
        <Comentarios visible={showComments} alVerPerfil={alVerPerfil} />
      </div>

    </div>
  );
}

export default Publicacion;
