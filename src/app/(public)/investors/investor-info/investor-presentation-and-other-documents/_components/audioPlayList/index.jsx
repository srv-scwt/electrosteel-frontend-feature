"use client";
import React from "react";

const AudioPlayer = ({ src }) => {
  if (!src) return <p className="!text-red-500 !sm:text-right !w-auto">Audio not available</p>;

  return (
    <audio controls>
      <source src={src} type="audio/mp3" />
    </audio>
  );
};

export default AudioPlayer;
