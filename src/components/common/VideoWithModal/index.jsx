"use client";
import VideoModal from "@/components/modals/VideoModel";
import Image from "next/image";
import React, { useState } from "react";

const VideoWithModal = ({ thumbnail, title , videoLink , isIFrame }) => {
  const [openVideo, setOpenVideo] = useState(false);

  const handleVideoModalOpen = () => {
    setOpenVideo((prev) => !prev);
  };

  return (
    <>
      <div
        className="relative w-full h-full overflow-hidden cursor-pointer group"
        onClick={handleVideoModalOpen}
      >
        {/* Background Thumbnail */}
        <Image
          src={thumbnail}
          alt={title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105 pointer-events-none"
        />

        {/* Centered Icon */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Image
            src="/images/icons/video-icon.png"
            alt="Play Icon"
            width={51}
            height={37}
            className="object-contain group-hover:scale-110 transition-transform duration-300"
          />
        </div>

        {/* Dark hover overlay */}
        <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition duration-300 pointer-events-none"></div>
      </div>

      {openVideo && (
        <VideoModal
          isModelOpen={openVideo}
          onClose={handleVideoModalOpen}
          title={title}
          videoLink={videoLink}
          isIframe={isIFrame}
        />
      )}
    </>
  );
};

export default VideoWithModal;
