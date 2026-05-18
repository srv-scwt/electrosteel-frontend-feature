"use client";
import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./style.module.css";
import { createVideoSourceURL } from "@/utils";

const VideoModal = ({
  isModelOpen,
  onClose,
  title,
  videoLink,
  isIframe = true,
}) => {
  if (!isModelOpen) return null;

  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };
  

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div className={styles.modal}>
        {/* Close Button */}
        <button className={styles.closeBtn} onClick={onClose}>
          <AiOutlineClose size={28} color="#fff" />
        </button>

        <div className={styles.videoContainer}>
          {isIframe ? (
            <iframe
              width="100%"
              height="89%"
              src={`https://www.youtube.com/embed/${videoLink}`}
              title="YouTube video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            <video
              src={createVideoSourceURL(videoLink)}
              autoPlay
              controls
              className="w-full h-full object-cover"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default VideoModal;
