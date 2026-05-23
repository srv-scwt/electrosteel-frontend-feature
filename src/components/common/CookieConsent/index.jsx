"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AiOutlineClose } from "react-icons/ai";

import commonStyles from "@/app/common.module.css";
import CookieModalContainer from "@/components/modals/CookieModalContainer";

import {
  bannerDescription,
  COOKIE_SESSION_DISMISS_KEY,
  COOKIE_STORAGE_KEY,
  cookieTabs,
  customConsentIntro,
  defaultCookiePreferences,
  necessaryCookieContent,
  optionalCookieCategories,
  privacyCookieContent,
} from "./cookieConsent.data";
import styles from "./style.module.css";

const mergePreferences = (value = {}) => ({
  ...defaultCookiePreferences,
  ...(typeof value === "object" && value ? value : {}),
  necessary: true,
});

const optionalPreferenceKeys = optionalCookieCategories.map(
  (category) => category.key
);

const readStoredConsent = () => {
  try {
    const storedValue = window.localStorage.getItem(COOKIE_STORAGE_KEY);

    if (!storedValue) {
      return null;
    }

    const parsedValue = JSON.parse(storedValue);

    if (!parsedValue || typeof parsedValue !== "object") {
      return null;
    }

    return {
      ...parsedValue,
      preferences: mergePreferences(parsedValue.preferences),
    };
  } catch {
    return null;
  }
};

const CookieConsent = () => {
  const [isReady, setIsReady] = useState(false);
  const [isBannerVisible, setIsBannerVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("customise");
  const [preferences, setPreferences] = useState(defaultCookiePreferences);
  const [hasSavedConsent, setHasSavedConsent] = useState(false);
  const isPrivacyEnabled = optionalPreferenceKeys.every(
    (key) => preferences[key]
  );

  useEffect(() => {
    const storedConsent = readStoredConsent();

    if (storedConsent) {
      setPreferences(storedConsent.preferences);
      setHasSavedConsent(true);
      setIsBannerVisible(false);
      setIsReady(true);
      return;
    }

    const isDismissed =
      window.sessionStorage.getItem(COOKIE_SESSION_DISMISS_KEY) === "true";

    setIsBannerVisible(!isDismissed);
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!isModalOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isModalOpen]);

  const persistConsent = (nextPreferences, status) => {
    const mergedPreferences = mergePreferences(nextPreferences);

    window.localStorage.setItem(
      COOKIE_STORAGE_KEY,
      JSON.stringify({
        preferences: mergedPreferences,
        status,
        updatedAt: new Date().toISOString(),
      })
    );

    window.sessionStorage.removeItem(COOKIE_SESSION_DISMISS_KEY);
    setPreferences(mergedPreferences);
    setHasSavedConsent(true);
    setIsBannerVisible(false);
    setIsModalOpen(false);
  };

  const handleAcceptAll = () => {
    persistConsent(
      {
        necessary: true,
        functional: true,
        analytics: true,
        performance: true,
        advertisement: true,
        other: true,
      },
      "accepted_all"
    );
  };

  const handleRejectAll = () => {
    persistConsent(
      {
        necessary: true,
        functional: false,
        analytics: false,
        performance: false,
        advertisement: false,
        other: false,
      },
      "rejected_all"
    );
  };

  const handleSavePreferences = () => {
    persistConsent(preferences, "customised");
  };

  const handleDismissBanner = () => {
    window.sessionStorage.setItem(COOKIE_SESSION_DISMISS_KEY, "true");
    setIsBannerVisible(false);
  };

  const handleOpenSettings = () => {
    setActiveTab("customise");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);

    if (!hasSavedConsent) {
      const isDismissed =
        window.sessionStorage.getItem(COOKIE_SESSION_DISMISS_KEY) === "true";

      setIsBannerVisible(!isDismissed);
    }
  };

  const handlePreferenceChange = (key) => {
    setPreferences((currentPreferences) => ({
      ...currentPreferences,
      [key]: !currentPreferences[key],
    }));
  };

  const handlePrivacyToggle = (isChecked) => {
    setPreferences((currentPreferences) => {
      const nextPreferences = { ...currentPreferences };

      optionalPreferenceKeys.forEach((key) => {
        nextPreferences[key] = isChecked;
      });

      return nextPreferences;
    });
  };

  const renderTabContent = () => {
    if (activeTab === "necessary") {
      return (
        <div className={`${commonStyles.sectionContent} ${styles.contentBlock}`}>
          <div className={styles.preferenceGroup}>
            <div className={styles.preferenceHeading}>
            <input
                id="cookie-necessary"
              type="checkbox"
              checked
              disabled
              readOnly
              className={styles.checkboxInput}
              aria-label="Necessary cookies are always active"
            />
              <label
                htmlFor="cookie-necessary"
                className={styles.preferenceHeadingLabel}
              >
                {necessaryCookieContent.title}
              </label>
              <span className={styles.alwaysActive}>Always Active</span>
            </div>
            <p>{necessaryCookieContent.description}</p>
          </div>
        </div>
      );
    }

    if (activeTab === "privacy") {
      return (
        <div className={`${commonStyles.sectionContent} ${styles.contentBlock}`}>
          <div className={styles.preferenceGroup}>
            <h4 className={styles.preferenceHeading}>
              <input
                id="cookie-privacy-toggle"
                type="checkbox"
                name="cookie_privacy"
                checked={isPrivacyEnabled}
                onChange={(event) => handlePrivacyToggle(event.target.checked)}
                className={styles.checkboxInput}
              />
              <label
                htmlFor="cookie-privacy-toggle"
                className={styles.preferenceHeadingLabel}
              >
                {privacyCookieContent.title}
              </label>
            </h4>
            {privacyCookieContent.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>
      );
    }

    return (
      <div className={`${commonStyles.sectionContent} ${styles.contentBlock}`}>
        <div className={styles.introSection}>
          {customConsentIntro.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>

        {optionalCookieCategories.map((category) => (
          <div key={category.key} className={styles.preferenceGroup}>
            <h4 className={styles.preferenceHeading}>
              <input
                id={`cookie-preference-${category.key}`}
                type="checkbox"
                name={`cookie_${category.key}`}
                checked={Boolean(preferences[category.key])}
                onChange={() => handlePreferenceChange(category.key)}
                className={styles.checkboxInput}
              />
              <label
                htmlFor={`cookie-preference-${category.key}`}
                className={styles.preferenceHeadingLabel}
              >
                {category.title}
              </label>
            </h4>
            <p>{category.description}</p>
          </div>
        ))}
      </div>
    );
  };

  if (!isReady) {
    return null;
  }

  return (
    <>
      {isBannerVisible ? (
        <div className={styles.banner}>
          <div className={styles.bannerInner}>
            <div className={`${commonStyles.sectionContent} ${styles.bannerText}`}>
              <p>
                {bannerDescription}{" "}
                <Link href="/privacy-policy">Privacy Statement.</Link>
              </p>
            </div>

            <div className={styles.bannerActions}>
              <button
                type="button"
                onClick={handleOpenSettings}
                className={styles.saveButton}
              >
                Cookies Settings
              </button>
              <button
                type="button"
                onClick={handleRejectAll}
                className={styles.secondaryButton}
              >
                Reject All
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className={styles.primaryButton}
              >
                Accept All
              </button>
              <button
                type="button"
                onClick={handleDismissBanner}
                className={styles.bannerClose}
                aria-label="Dismiss cookie banner"
              >
                <AiOutlineClose />
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {isModalOpen ? (
        <CookieModalContainer
          onClose={handleCloseModal}
          title={
            <div className={commonStyles.sectionContent}>
              <h2 className={styles.modalTitle}>Privacy Preference Centre</h2>
            </div>
          }
          footer={
            <div className={styles.footerActions}>
              <button
                type="button"
                onClick={handleSavePreferences}
                className={styles.saveButton}
              >
                Save Preferences
              </button>
              <button
                type="button"
                onClick={handleRejectAll}
                className={styles.secondaryButton}
              >
                Reject All
              </button>
              <button
                type="button"
                onClick={handleAcceptAll}
                className={styles.primaryButton}
              >
                Accept All
              </button>
            </div>
          }
        >
          <div className={styles.modalLayout}>
            <div className={styles.sidebar}>
              {cookieTabs.map((tab) => (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={`${styles.sidebarButton} ${
                    activeTab === tab.key ? styles.sidebarButtonActive : ""
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className={styles.contentPanel}>{renderTabContent()}</div>
          </div>
        </CookieModalContainer>
      ) : null}
    </>
  );
};

export default CookieConsent;
