"use client";
import React, { useEffect, useMemo } from "react";
import { AiOutlineClose } from "react-icons/ai";
import styles from "./style.module.css";
import { createVideoSourceURL } from "@/utils";

const DEFAULT_IFRAME_ALLOW =
  "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";

const extractAttribute = (markup, attribute) => {
  const match = markup.match(new RegExp(`${attribute}=["']([^"']+)["']`, "i"));
  return match?.[1] ?? "";
};

const getIframeProps = (videoLink, fallbackTitle = "Video") => {
  if (!videoLink) return null;

  const trimmedVideoLink = String(videoLink).trim();

  if (!trimmedVideoLink) return null;

  if (!/<iframe\b/i.test(trimmedVideoLink)) {
    return {
      src: trimmedVideoLink,
      title: fallbackTitle,
      allow: DEFAULT_IFRAME_ALLOW,
      referrerPolicy: "strict-origin-when-cross-origin",
      allowFullScreen: true,
    };
  }

  const iframeSource = extractAttribute(trimmedVideoLink, "src");

  if (!iframeSource) return null;

  return {
    src: iframeSource,
    title: extractAttribute(trimmedVideoLink, "title") || fallbackTitle,
    allow: extractAttribute(trimmedVideoLink, "allow") || DEFAULT_IFRAME_ALLOW,
    referrerPolicy:
      extractAttribute(trimmedVideoLink, "referrerpolicy") ||
      "strict-origin-when-cross-origin",
    allowFullScreen: /allowfullscreen/i.test(trimmedVideoLink),
  };
};

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

  const iframeProps = useMemo(
    () => (isIframe ? getIframeProps(videoLink, title || "Video") : null),
    [isIframe, title, videoLink]
  );

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
            iframeProps?.src ? (
              <iframe
                src={iframeProps.src}
                title={iframeProps.title}
                allow={iframeProps.allow}
                referrerPolicy={iframeProps.referrerPolicy}
                allowFullScreen={iframeProps.allowFullScreen}
                className={styles.iframe}
              />
            ) : null
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
