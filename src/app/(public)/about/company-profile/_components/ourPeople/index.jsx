"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import { FiMaximize, FiMinimize, FiPause, FiPlay } from "react-icons/fi";
import styles from "./style.module.css";
import HTMLRender from "@/components/ui/HTMLRender";
import { createVideoSourceURL } from "../../../../../../utils";

export default function OurPeople({ data }) {
  const videoRef = useRef(null);
  const videoWrapperRef = useRef(null);
  const controlsTimeoutRef = useRef(null);
  const previewTimeoutRef = useRef(null);
  const previewStartTimeRef = useRef(0);
  const isPreviewingRef = useRef(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isControlsVisible, setIsControlsVisible] = useState(false);

  // Only touches refs and state setters, so it is safe to keep referentially
  // stable — the mount effect below depends on it.
  const clearControlsTimeout = useCallback(() => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
      controlsTimeoutRef.current = null;
    }
  }, []);

  const clearPreviewTimeout = () => {
    if (previewTimeoutRef.current) {
      clearTimeout(previewTimeoutRef.current);
      previewTimeoutRef.current = null;
    }
  };

  const showControls = useCallback(
    (fullscreenMode) => {
      setIsControlsVisible(true);
      clearControlsTimeout();

      if (!fullscreenMode) {
        return;
      }

      controlsTimeoutRef.current = setTimeout(() => {
        setIsControlsVisible(false);
      }, 1500);
    },
    [clearControlsTimeout]
  );

  const stopHoverPreview = ({ restorePosition = true } = {}) => {
    const videoElement = videoRef.current;

    clearPreviewTimeout();

    if (!videoElement || !isPreviewingRef.current) {
      isPreviewingRef.current = false;
      return;
    }

    isPreviewingRef.current = false;
    videoElement.pause();

    if (restorePosition) {
      videoElement.currentTime = previewStartTimeRef.current;
    }
  };

  const startHoverPreview = async () => {
    const videoElement = videoRef.current;

    if (!videoElement || isPlaying || isPreviewingRef.current) {
      return;
    }

    previewStartTimeRef.current = videoElement.currentTime;
    isPreviewingRef.current = true;

    try {
      await videoElement.play();
      previewTimeoutRef.current = setTimeout(() => {
        stopHoverPreview();
      }, 15000);
    } catch (error) {
      isPreviewingRef.current = false;
      clearPreviewTimeout();
    }
  };

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    const syncFullscreenState = () => {
      const fullscreenElement =
        document.fullscreenElement || document.webkitFullscreenElement;

      const isVideoFullscreen = fullscreenElement === videoWrapperRef.current;
      setIsFullscreen(isVideoFullscreen);

      if (isVideoFullscreen) {
        showControls(true);
        return;
      }

      clearControlsTimeout();
      setIsControlsVisible(false);
    };

    videoElement.pause();
    document.addEventListener("fullscreenchange", syncFullscreenState);
    document.addEventListener("webkitfullscreenchange", syncFullscreenState);

    return () => {
      document.removeEventListener("fullscreenchange", syncFullscreenState);
      document.removeEventListener("webkitfullscreenchange", syncFullscreenState);
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
        controlsTimeoutRef.current = null;
      }
      if (previewTimeoutRef.current) {
        clearTimeout(previewTimeoutRef.current);
        previewTimeoutRef.current = null;
      }
      isPreviewingRef.current = false;
      videoElement.pause();
    };
  }, [showControls, clearControlsTimeout]);

  const handlePointerEnter = () => {
    showControls(isFullscreen);
    startHoverPreview();
  };

  const handlePointerMove = () => {
    showControls(isFullscreen);
  };

  const handlePointerLeave = () => {
    if (!isFullscreen) {
      setIsControlsVisible(false);
    }

    if (!isPlaying) {
      stopHoverPreview();
    }
  };

  const handlePlayPause = async () => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    if (isPlaying) {
      videoElement.pause();
      setIsPlaying(false);
      return;
    }

    clearPreviewTimeout();
    isPreviewingRef.current = false;

    try {
      await videoElement.play();
      setIsPlaying(true);
    } catch (error) {
      setIsPlaying(false);
    }
  };

  const handleFullscreenToggle = async () => {
    const videoWrapperElement = videoWrapperRef.current;
    const videoElement = videoRef.current;

    if (!videoWrapperElement || !videoElement) return;

    const fullscreenElement =
      document.fullscreenElement || document.webkitFullscreenElement;

    if (fullscreenElement) {
      if (document.exitFullscreen) {
        await document.exitFullscreen();
        return;
      }

      if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }

      return;
    }

    try {
      if (videoWrapperElement.requestFullscreen) {
        await videoWrapperElement.requestFullscreen();
        return;
      }

      if (videoWrapperElement.webkitRequestFullscreen) {
        videoWrapperElement.webkitRequestFullscreen();
        return;
      }

      if (videoElement.webkitEnterFullscreen) {
        videoElement.webkitEnterFullscreen();
      }
    } catch (error) {
      setIsFullscreen(false);
    }
  };

  return (
    <section className=" bg-white">
      <div className={styles.containerLg}>
        <div className={`${styles.sectionOurPeople} space-y-8`}>
          <div className={styles.sectionContent}>
            <HTMLRender htmlString={`<h2>${data?.title}</h2>`} />
            <p>{data?.description}</p>
          </div>
        </div>
      </div>
      <div
        ref={videoWrapperRef}
        className={`relative w-full ${styles.videoWrapper} ${
          isControlsVisible ? styles.controlsVisible : ""
        }`}
        onMouseEnter={handlePointerEnter}
        onMouseMove={handlePointerMove}
        onMouseLeave={handlePointerLeave}
      >
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          className={styles.videoPlayer}
        >
          <source 
          // src="/videos/our_peopleVideo.mp4"
          src={createVideoSourceURL(data?.video)}
          type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className={styles.videoOverlay} aria-hidden="true" />

        <div className={styles.playControlWrap}>
          <button
            type="button"
            onClick={handlePlayPause}
            className={`${styles.controlButton} ${styles.playControlButton}`}
            aria-label={isPlaying ? "Pause video" : "Play video"}
            aria-pressed={isPlaying}
            title={isPlaying ? "Pause video" : "Play video"}
          >
            {isPlaying ? <FiPause /> : <FiPlay />}
          </button>
        </div>

        <div className={styles.controlDock}>
          <button
            type="button"
            onClick={handleFullscreenToggle}
            className={`${styles.controlButton} ${styles.fullscreenControlButton}`}
            aria-label={isFullscreen ? "Minimize video" : "Fullscreen video"}
            title={isFullscreen ? "Minimize video" : "Fullscreen video"}
          >
            {isFullscreen ? <FiMinimize /> : <FiMaximize />}
          </button>
        </div>
      </div>
    </section>
  );
}
