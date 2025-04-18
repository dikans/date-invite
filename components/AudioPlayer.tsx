"use client";

import { useRef, useEffect, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play()
          .then(() => {
            setIsPlaying(true);
            console.log("Audio started playing");
          })
          .catch((e) => {
            console.error("Auto-play prevented:", e);
          });
      }
    };

    // Try to play on first user interaction
    document.addEventListener("click", playAudio, { once: true });

    return () => {
      document.removeEventListener("click", playAudio);
    };
  }, []);

  const toggleAudio = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(e => console.error("Could not play audio:", e));
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/dicunganh.mp3" loop preload="auto" />
      <button 
        onClick={toggleAudio}
        className="fixed bottom-4 right-4 z-50 p-3 rounded-full bg-purple-800/70 border border-pink-400 hover:bg-purple-700 text-pink-300"
        aria-label={isPlaying ? "Pause music" : "Play music"}
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </button>
    </>
  );
}
