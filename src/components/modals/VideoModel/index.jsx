"use client";
import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./style.module.css";
import IframeEmbed from "@/components/common/IframeEmbed";
import { createVideoSourceURL } from "@/utils";

const VideoModal = ({
  isModelOpen,
  onClose,
  title,
  videoLink,
  isIframe = true,
}) => {
  useEffect(() => {
    if (!isModelOpen) return undefined;

    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [isModelOpen, onClose]);

  if (!isModelOpen) return null;

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
            <IframeEmbed
              videoLink={videoLink}
              title={title || "Video"}
              className={styles.iframe}
            />
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
