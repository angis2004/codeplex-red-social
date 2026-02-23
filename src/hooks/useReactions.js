import { useState, useRef, useEffect } from "react";

export function useReactions(initialCount = 0) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(initialCount);
  const [showReactions, setShowReactions] = useState(false);
  const [activeReaction, setActiveReaction] = useState(null);

  const closeTimeoutRef = useRef(null);
  const longPressTimer = useRef(null);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      if (longPressTimer.current) clearTimeout(longPressTimer.current);
    };
  }, []);

  const handleMouseLeaveButton = () => {
    closeTimeoutRef.current = setTimeout(() => setShowReactions(false), 500);
  };

  const handleMouseEnterPopup = () => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  };

  const handleMouseLeavePopup = () => {
    closeTimeoutRef.current = setTimeout(() => setShowReactions(false), 300);
  };

  const handleTouchStart = () => {
    longPressTimer.current = setTimeout(() => setShowReactions(true), 500);
  };

  const handleTouchEnd = () => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
  };

  const handleMainClick = () => {
    if (showReactions && window.innerWidth <= 768) return;
    if (liked) {
      setLiked(false);
      setActiveReaction(null);
      setLikeCount((prev) => prev - 1);
    } else {
      setLiked(true);
      setActiveReaction({ icon: "like", label: "Me gusta", color: "#7F0DF2" });
      setLikeCount((prev) => prev + 1);
    }
  };

  const handleSelectReaction = (reaction) => {
    if (activeReaction?.label === reaction.label) {
      setActiveReaction(null);
      setLiked(false);
      setLikeCount((prev) => prev - 1);
    } else {
      if (!liked) setLikeCount((prev) => prev + 1);
      setActiveReaction(reaction);
      setLiked(true);
    }
    setShowReactions(false);
  };

  return {
    liked,
    likeCount,
    showReactions,
    activeReaction,
    setShowReactions,
    handlers: {
      handleMouseLeaveButton,
      handleMouseEnterPopup,
      handleMouseLeavePopup,
      handleTouchStart,
      handleTouchEnd,
      handleMainClick,
      handleSelectReaction,
    },
  };
}