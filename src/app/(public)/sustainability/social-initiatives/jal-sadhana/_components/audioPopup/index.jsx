"use client";

import { useEffect, useRef, useState } from "react";
import { MdAudiotrack, MdPause } from "react-icons/md";

const AudioPopUp = ({ audioSrc = "/audios/waterflow.mpeg" }) => {
  const audioRef = useRef(null);
  const shouldAutoPlayRef = useRef(true);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    const syncPlayingState = () => {
      setIsPlaying(!audioElement.paused);
    };

    const tryAutoPlay = async () => {
      if (!shouldAutoPlayRef.current) return;

      try {
        await audioElement.play();
      } catch (error) {
        setIsPlaying(false);
      }
    };

    const handleFirstInteraction = () => {
      tryAutoPlay();
    };

    audioElement.addEventListener("play", syncPlayingState);
    audioElement.addEventListener("pause", syncPlayingState);
    audioElement.addEventListener("ended", syncPlayingState);
    audioElement.addEventListener("canplaythrough", tryAutoPlay);

    audioElement.load();
    tryAutoPlay();
    document.addEventListener("pointerdown", handleFirstInteraction, {
      once: true,
    });
    document.addEventListener("keydown", handleFirstInteraction, {
      once: true,
    });

    return () => {
      shouldAutoPlayRef.current = false;
      audioElement.pause();
      audioElement.removeEventListener("play", syncPlayingState);
      audioElement.removeEventListener("pause", syncPlayingState);
      audioElement.removeEventListener("ended", syncPlayingState);
      audioElement.removeEventListener("canplaythrough", tryAutoPlay);
      document.removeEventListener("pointerdown", handleFirstInteraction);
      document.removeEventListener("keydown", handleFirstInteraction);
    };
  }, [audioSrc]);

  const handleToggleAudio = async () => {
    const audioElement = audioRef.current;
    if (!audioElement) return;

    if (audioElement.paused) {
      shouldAutoPlayRef.current = true;

      try {
        await audioElement.play();
      } catch (error) {
        setIsPlaying(false);
      }
      return;
    }

    shouldAutoPlayRef.current = false;
    audioElement.pause();
  };

  return (
    <div className="fixed bottom-5 right-5 z-[100]">
      <audio ref={audioRef} preload="auto" autoPlay loop>
        <source src={audioSrc} type="audio/mpeg" />
      </audio>

      <button
        type="button"
        onClick={handleToggleAudio}
        className={`flex h-[60px] w-[60px] items-center justify-center rounded-4xl shadow-2xl transition-colors duration-300 ${
          isPlaying ? "bg-[#004aa1] text-white" : "bg-[#d9e7f7] text-[#004aa1]"
        }`}
        aria-label={isPlaying ? "Pause audio" : "Play audio"}
        title={isPlaying ? "Pause audio" : "Play audio"}
      >
        {isPlaying ? <MdPause size={30} /> : <MdAudiotrack size={30} />}
      </button>
    </div>
  );
};

export default AudioPopUp;
