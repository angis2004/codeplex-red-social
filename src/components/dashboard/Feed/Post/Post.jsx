import React from "react";
import PostActions from "./PostActions/PostActions";
import Comments from "./Comments/Comments";

function Post({ post }) {
  return (
    <div className="post-card">

      {/* Cabecera: avatar + nombre + tiempo */}
      <div className="post-header">
        <div className="post-user-info">
          <img
            src={`https://i.pravatar.cc/150?img=${post.avatarImg}`}
            alt={post.author}
            className="post-avatar"
          />
          <div>
            <div className="post-user-name">{post.author}</div>
            <div className="post-time">{post.time}</div>
          </div>
        </div>
        <button className="post-menu-btn">⋯</button>
      </div>

      {/* Texto + hashtags */}
      <div className="post-content">
        <p className="post-text">{post.text}</p>
        {post.hashtags?.length > 0 && (
          <div className="post-hashtags">
            {post.hashtags.map((tag) => (
              <span key={tag} className="hashtag">{tag}</span>
            ))}
          </div>
        )}
      </div>

      {/* Video (opcional) */}
      {post.videoSrc && (
        <div className="post-media">
          <div className="video-wrapper">
            <video
              className="post-video-player"
              src={post.videoSrc}
              controls
              preload="metadata"
              poster={post.videoPoster}
            />
          </div>
        </div>
      )}

      {/* Footer: reacciones + comentarios */}
      <div className="post-footer">
        <PostActions initialLikeCount={post.likeCount} />
        <div className="post-divider"></div>
        <Comments />
      </div>

    </div>
  );
}

export default Post;