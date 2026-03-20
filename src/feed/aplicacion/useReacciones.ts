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

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
      if (longPressTimer.current) clearTimeout(longPressTimer.current);
    };
  }, []);

  // Abrir popup INSTANTÁNEO al hover (0 delay, como Facebook)
  const handleMouseEnterButton = (): void => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
    setShowReactions(true);
  };

  // Cerrar con pequeño margen para mover mouse al popup
  const handleMouseLeaveButton = (): void => {
    closeTimeoutRef.current = setTimeout(() => setShowReactions(false), 80);
  };

  const handleMouseEnterPopup = (): void => {
    if (closeTimeoutRef.current) clearTimeout(closeTimeoutRef.current);
  };

  const handleMouseLeavePopup = (): void => {
    closeTimeoutRef.current = setTimeout(() => setShowReactions(false), 80);
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
    // NO cerramos el popup → el usuario puede cambiar de reacción instantáneamente
    // El popup se cierra solo cuando el mouse se va del área
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
