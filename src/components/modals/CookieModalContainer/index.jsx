"use client";

import React, { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";

import styles from "./style.module.css";

const CookieModalContainer = ({ title, onClose, children, footer }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [onClose]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleOverlayClick} role="presentation">
      <div
        className={styles.modalContainer}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-preference-title"
      >
        <div className={styles.modalHeader}>
          <div id="cookie-preference-title" className={styles.titleWrap}>
            {title}
          </div>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeButton}
            aria-label="Close cookie settings"
          >
            <AiOutlineClose />
          </button>
        </div>

        <div className={styles.modalBody}>{children}</div>

        {footer ? <div className={styles.modalFooter}>{footer}</div> : null}
      </div>
    </div>
  );
};

export default CookieModalContainer;
