"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef, useState } from "react";

import styles from "./style.module.css";

export const ROUTE_PROGRESS_START_EVENT = "route-progress:start";

/**
 * Kicks the top progress bar off for navigations that don't come from a link
 * click (router.push / router.replace).
 */
export function startRouteProgress() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new Event(ROUTE_PROGRESS_START_EVENT));
}

// Wait a beat before painting anything — prefetched routes land almost
// instantly and a flash of the bar is worse than no bar at all.
const START_DELAY = 120;
const TRICKLE_INTERVAL = 300;
const HOLD_AT_FULL = 200;
const FADE_OUT = 300;
const SAFETY_TIMEOUT = 15000;

function RouteProgressBarInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(false);

  const timers = useRef({});
  const runningRef = useRef(false);
  const shownRef = useRef(false);
  const urlRef = useRef(null);

  const clearTimers = useCallback(() => {
    clearTimeout(timers.current.start);
    clearTimeout(timers.current.hold);
    clearTimeout(timers.current.reset);
    clearTimeout(timers.current.safety);
    clearInterval(timers.current.trickle);
    timers.current = {};
  }, []);

  const finish = useCallback(() => {
    if (!runningRef.current) return;
    runningRef.current = false;
    clearTimers();

    // Navigation resolved before the bar ever appeared — nothing to wind down.
    if (!shownRef.current) {
      setProgress(0);
      setActive(false);
      return;
    }

    setProgress(100);
    timers.current.hold = setTimeout(() => {
      setActive(false);
      shownRef.current = false;
      timers.current.reset = setTimeout(() => setProgress(0), FADE_OUT);
    }, HOLD_AT_FULL);
  }, [clearTimers]);

  const start = useCallback(() => {
    if (runningRef.current) return;
    runningRef.current = true;
    clearTimers();

    timers.current.start = setTimeout(() => {
      shownRef.current = true;
      setActive(true);
      setProgress(15);
      // Ease towards 90% and park there until the route actually commits.
      timers.current.trickle = setInterval(() => {
        setProgress((current) =>
          current >= 90 ? current : current + Math.max(1, (90 - current) * 0.15)
        );
      }, TRICKLE_INTERVAL);
    }, START_DELAY);

    timers.current.safety = setTimeout(finish, SAFETY_TIMEOUT);
  }, [clearTimers, finish]);

  useEffect(() => {
    const handleClick = (event) => {
      if (event.defaultPrevented || event.button !== 0) return;
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target;
      const anchor =
        target instanceof Element ? target.closest("a[href]") : null;
      if (!anchor || anchor.hasAttribute("download")) return;
      if (anchor.target && anchor.target !== "_self") return;

      const href = anchor.getAttribute("href");
      if (!href || href.startsWith("#")) return;
      if (/^(mailto:|tel:|javascript:)/i.test(href)) return;

      let url;
      try {
        url = new URL(anchor.href, window.location.href);
      } catch {
        return;
      }
      if (url.origin !== window.location.origin) return;
      // Same URL (or a pure hash jump) never triggers a route change.
      if (
        url.pathname === window.location.pathname &&
        url.search === window.location.search
      ) {
        return;
      }

      start();
    };

    document.addEventListener("click", handleClick, true);
    window.addEventListener("popstate", start);
    window.addEventListener(ROUTE_PROGRESS_START_EVENT, start);

    return () => {
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("popstate", start);
      window.removeEventListener(ROUTE_PROGRESS_START_EVENT, start);
    };
  }, [start]);

  // The URL only changes once the new route is ready to render, so this is our
  // "navigation complete" signal.
  useEffect(() => {
    const key = `${pathname}?${searchParams?.toString() ?? ""}`;
    if (urlRef.current === null) {
      urlRef.current = key;
      return;
    }
    if (urlRef.current === key) return;
    urlRef.current = key;
    finish();
  }, [pathname, searchParams, finish]);

  useEffect(() => clearTimers, [clearTimers]);

  return (
    <div className={styles.track} role="presentation" aria-hidden="true">
      <div
        className={`${styles.bar} ${active ? styles.active : ""}`}
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}

export default function RouteProgressBar() {
  return (
    <Suspense fallback={null}>
      <RouteProgressBarInner />
    </Suspense>
  );
}
