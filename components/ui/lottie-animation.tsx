"use client";

import { useRef, useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Dynamically import the Player component with SSR disabled
const Player = dynamic(
  () => import("@lottiefiles/react-lottie-player").then((mod) => mod.Player),
  { ssr: false }
);

interface LottieAnimationProps {
  src: string;
  autoplay?: boolean;
  loop?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export const LottieAnimation = ({
  src,
  autoplay = true,
  loop = true,
  className = "",
  style = {},
}: LottieAnimationProps) => {
  const playerRef = useRef<any>(null);
  const [isMounted, setIsMounted] = useState(false);
  
  // Only render on client-side
  useEffect(() => {
    setIsMounted(true);
  }, []);
  
  if (!isMounted) {
    return (
      <div 
        className={`bg-purple-800/30 rounded-full animate-pulse ${className}`}
        style={style}
      />
    );
  }
  
  return (
    <div className={className}>
      <Player 
        autoplay={autoplay}
        loop={loop}
        ref={playerRef}
        src={src}
        style={style}
        onError={() => console.error(`Error loading Lottie animation: ${src}`)}
        rendererSettings={{
          preserveAspectRatio: 'xMidYMid slice',
          clearCanvas: false,
        }}
      />
    </div>
  );
};
