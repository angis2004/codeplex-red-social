import { useState, useRef, useEffect } from "react";

export interface Reaction {
  icon: string;
  label: string;
  color: string;
}

export interface UseReaccionesHandlers {
  handleMouseEnterButton: () => void;
  handleMouseLeaveButton: () => void;
  handleMouseEnterPopup: () => void;
  handleMouseLeavePopup: () => void;
  handleTouchStart: () => void;
  handleTouchEnd: () => void;
  handleMainClick: () => void;
  handleSelectReaction: (reaction: Reaction) => void;
}

export interface UseReaccionesReturn {
  liked: boolean;
  likeCount: number;
  showReactions: boolean;
  activeReaction: Reaction | null;
  setShowReactions: React.Dispatch<React.SetStateAction<boolean>>;
  handlers: UseReaccionesHandlers;
}

export function useReacciones(initialCount: number = 0): UseReaccionesReturn {
  const [liked, setLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(initialCount);
  const [showReactions, setShowReactions] = useState<boolean>(false);
  const [activeReaction, setActiveReaction] = useState<Reaction | null>(null);

  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cooldownRef = useRef<boolean>(false);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      if (longPressTimer.current) clearTimeout(longPressTimer.current);
    };
  }, []);

  const handleMouseEnterButton = (): void => {
    if (cooldownRef.current) return; // evita reabrir después de seleccionar
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setShowReactions(true);
  };

  const handleMouseLeaveButton = (): void => {
    closeTimeoutRef.current = setTimeout(() => setShowReactions(false), 150);
  };

  const handleMouseEnterPopup = (): void => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  };

  const handleMouseLeavePopup = (): void => {
    closeTimeoutRef.current = setTimeout(() => setShowReactions(false), 100);
  };

  const handleTouchStart = (): void => {
    longPressTimer.current = setTimeout(() => setShowReactions(true), 500);
  };

  const handleTouchEnd = (): void => {
    if (longPressTimer.current) clearTimeout(longPressTimer.current);
  };

  const handleMainClick = (): void => {
    if (showReactions && window.innerWidth <= 768) return;
    if (liked) {
      setLiked(false);
      setActiveReaction(null);
      setLikeCount((prev: number) => prev - 1);
    } else {
      setLiked(true);
      setActiveReaction({ icon: "like", label: "Me gusta", color: "#7F0DF2" });
      setLikeCount((prev: number) => prev + 1);
    }
  };

  const handleSelectReaction = (reaction: Reaction): void => {
    if (activeReaction?.label === reaction.label) {
      setActiveReaction(null);
      setLiked(false);
      setLikeCount((prev: number) => prev - 1);
    } else {
      if (!liked) setLikeCount((prev: number) => prev + 1);
      setActiveReaction(reaction);
      setLiked(true);
    }
    setShowReactions(false);
    // Cooldown: evita que el popup se reabra inmediatamente
    cooldownRef.current = true;
    setTimeout(() => { cooldownRef.current = false; }, 300);
  };

  return {
    liked,
    likeCount,
    showReactions,
    activeReaction,
    setShowReactions,
    handlers: {
      handleMouseEnterButton,
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
