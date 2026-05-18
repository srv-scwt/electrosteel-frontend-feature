"use client";

import React, { useEffect, useMemo, useRef, useState, useCallback } from "react";
import Image from "next/image";
import styles from "./style.module.css";
// import styles from "@/app/common.module.css";

/**
 * Helper: positions the popover relative to an anchor while keeping it inside a container.
 */
function placePopover({ container, anchor, popover, gap = 10 }) {
  if (!container || !anchor || !popover) return;

  const cRect = container.getBoundingClientRect();
  const aRect = anchor.getBoundingClientRect();

  // Anchor position relative to container
  const aLeft = aRect.left - cRect.left + container.scrollLeft;
  const aTop = aRect.top - cRect.top + container.scrollTop;

  // Temporarily show to measure
  popover.style.visibility = "hidden";
  popover.style.display = "block";
  const pW = popover.offsetWidth;
  const pH = popover.offsetHeight;
  popover.style.display = "";
  popover.style.visibility = "";

  const mapW = container.clientWidth;
  const mapH = container.clientHeight;

  // Preferred: above-right of the pin
  let x = aLeft + aRect.width / 2 + 12;
  let y = aTop - pH - gap;

  let horiz = "right";
  let vert = "top";

  // Right overflow → left side
  if (x + pW > mapW) {
    x = aLeft - pW - 12;
    horiz = "left";
  }
  // Left overflow → clamp
  if (x < 0) {
    x = Math.max(gap, x);
    horiz = "right";
  }
  // If above overflows, put below
  if (y < 0) {
    y = aTop + aRect.height + gap;
    vert = "bottom";
  }
  // Bottom overflow → clamp inside
  if (y + pH > mapH) {
    y = Math.max(gap, mapH - pH - gap);
    vert = y < aTop ? "top" : "bottom";
  }

  popover.classList.remove(
    styles.dirTopLeft,
    styles.dirTopRight,
    styles.dirBottomLeft,
    styles.dirBottomRight
  );
  const dirClass =
    vert === "top"
      ? horiz === "right"
        ? styles.dirTopRight
        : styles.dirTopLeft
      : horiz === "right"
      ? styles.dirBottomRight
      : styles.dirBottomLeft;

  popover.classList.add(dirClass);
  popover.style.left = `${x}px`;
  popover.style.top = `${y}px`;
}

const offices = [
  {
    id: "usa",
    title: "USA",
    leftPct: 20.3,
    topPct: 62.0,
    html: `
      <h3><strong>USA</strong></h3>
      <p>Electrosteel USA LLC<br>
         1101, Louisville Road<br>
         Savannah, Georgia 31415, USA</p>
      <p><strong>Phone:</strong> +1 912 387 0613<br>
         <strong>Fax:</strong> +1 912 385 0315</p>
      <p><strong>Email:</strong> <a href="mailto:support@electrosteelusa.com">support@electrosteelusa.com</a></p>
      <p><strong>Website:</strong> <a href="http://www.electrosteelusa.com" target="_blank" rel="noopener noreferrer">www.electrosteelusa.com</a></p>
      <p><strong>Contact:</strong> Danny Swalley</p>
    `,
  },
  {
    id: "uk",
    title: "United Kingdom",
    leftPct: 49.7,
    topPct: 39.5,
    html: `
      <h3><strong>UNITED KINGDOM</strong></h3>
      <p>Electrosteel Castings (UK) Limited<br>
         Ambrose House, Broombank Road Trading Estate<br>
         Broombank Road Off Carrwood Road<br>
         Chesterfield, Derbyshire S41 9QJ, United Kingdom</p>
      <p><strong>Phone:</strong> +44 (0) 1246 264 222<br>
         <strong>Fax:</strong> +44 (0) 1246 264 224</p>
      <p><strong>Email:</strong> <a href="mailto:sales@electrosteel.co.uk">sales@electrosteel.co.uk</a></p>
      <p><strong>Website:</strong> <a href="http://www.electrosteel.co.uk" target="_blank" rel="noopener noreferrer">www.electrosteel.co.uk</a></p>
      <p><strong>Contact:</strong> Stew Bailie</p>
    `,
  },
  {
    id: "france",
    title: "France",
    leftPct: 51.0,
    topPct: 42.0,
    html: `
      <h3><strong>FRANCE</strong></h3>
      <p>Electrosteel Europe S.A.<br>
         Zone Industrielle Nord<br>
         9, Rue Galilée<br>
         13200 Arles, France</p>
      <p><strong>Phone:</strong> +33 4 90 96 81 30<br>
         <strong>Fax:</strong> +33 4 90 96 81 31</p>
      <p><strong>Email:</strong> <a href="mailto:cjf.hahang@electrosteel.fr">cjf.hahang@electrosteel.fr</a></p>
      <p><strong>Website:</strong> <a href="http://www.electrosteel.fr" target="_blank" rel="noopener noreferrer">www.electrosteel.fr</a></p>
      <p><strong>Contact:</strong> Cyrille Hahang</p>
    `,
  },
  {
    id: "spain",
    title: "Spain",
    leftPct: 48.8,
    topPct: 43.0,
    html: `
      <h3><strong>SPAIN</strong></h3>
      <p>Electrosteel Europe, S.A Sucursal en España<br>
         Calle Velázquez, 19 3º Derecha<br>
         28001 Madrid, Spain</p>
      <p><strong>Phone:</strong> +34 91 564 73 29<br>
         <strong>Fax:</strong> +34 91 563 34 09</p>
      <p><strong>Email:</strong> <a href="mailto:jlyu@electrosteel.es">jlyu@electrosteel.es</a></p>
      <p><strong>Website:</strong> <a href="https://www.electrosteel.com/" target="_blank" rel="noopener noreferrer">www.electrosteel.com</a></p>
      <p><strong>Contact:</strong> Jesús L. Yu</p>
    `,
  },
  {
    id: "algeria",
    title: "Algeria",
    leftPct: 51.4,
    topPct: 49.5,
    html: `
      <h3><strong>ALGERIA</strong></h3>
      <p>Electrosteel Algérie SPA<br>
         Hai Alioua Fodil Villa Nº 130<br>
         Chéraga 16002, Algiers, Algeria</p>
      <p><strong>Phone:</strong> +213 23 361868<br>
         <strong>Fax:</strong> +213 23 361867</p>
      <p><strong>Email:</strong> <a href="mailto:a.chadly@electrosteel-dz.com">a.chadly@electrosteel-dz.com</a></p>
      <p><strong>Website:</strong> <a href="http://www.electrosteel-dz.com/" target="_blank" rel="noopener noreferrer">www.electrosteel-dz.com</a></p>
      <p><strong>Contact:</strong> Aziz Chadly</p>
    `,
  },
  {
    id: "italy",
    title: "Italy",
    leftPct: 54.5,
    topPct: 34.5,
    html: `
      <h3><strong>ITALY</strong></h3>
      <p>Electrosteel Europe S.A. — Succursale Italia<br>
         Via Mecenate, 76/22, 20138 Milano (MI), Italy</p>
      <p><strong>Phone:</strong> +39 02 55199357<br>
         <strong>Fax:</strong> +39 02 5517915</p>
      <p><strong>Email:</strong> <a href="mailto:a.firpo@electrosteel.it">a.firpo@electrosteel.it</a></p>
      <p><strong>Website:</strong> <a href="http://www.electrosteel.it/" target="_blank" rel="noopener noreferrer">www.electrosteel.it</a></p>
      <p><strong>Contact:</strong> Alfio Firpo</p>
    `,
  },
  {
    id: "bahrain",
    title: "Bahrain",
    leftPct: 65.4,
    topPct: 41.5,
    html: `
      <h3><strong>BAHRAIN</strong></h3>
      <p>Electrosteel Bahrain Trading WLL<br>
         Flat No 1, Building No 966, Road 5218, Block 952 Ras Zuwayed<br>
         Kingdom of Bahrain</p>
      <p><strong>Phone:</strong> +973 77322288</p>
      <p><strong>Email:</strong> <a href="mailto:ecl.bahrain@electrosteel.com">ecl.bahrain@electrosteel.com</a>, <a href="mailto:apshukla@electrosteel.com">apshukla@electrosteel.com</a></p>
      <p><strong>Contact:</strong> Awadh Prakash Shukla</p>
    `,
  },
  {
    id: "qatar",
    title: "Qatar",
    leftPct: 66.0,
    topPct: 38.8,
    html: `
      <h3><strong>QATAR</strong></h3>
      <p>Electrosteel Doha for Trading LLC<br>
         P.O. Box 80368, Office 502, 5th Floor<br>
         Al Mansour Business Park, Umm Ghuwailina</p>
      <p><strong>Phone:</strong> +974 44151735<br>
         <strong>Fax:</strong> +974 44151726</p>
      <p><strong>Email:</strong> <a href="mailto:vrungta@electrosteel.com">vrungta@electrosteel.com</a>, <a href="mailto:ecldoha@electrosteel.com">ecldoha@electrosteel.com</a></p>
      <p><strong>Contact:</strong> Vineet Rungta</p>
    `,
  },
  {
    id: "dubai",
    title: "Dubai, UAE",
    leftPct: 66.7,
    topPct: 33.2,
    html: `
      <h3><strong>Dubai, UAE</strong></h3>
      <p>Electrosteel Castings Gulf FZE<br>
         Office LB09021, Lob 9, P.O. Box 261462<br>
         Jebel Ali Free Zone, Dubai, U.A.E.</p>
      <p><strong>Phone:</strong> +971 50 592 8405<br>
         <strong>Fax:</strong> +971 4 889 4902</p>
      <p><strong>Email:</strong> <a href="mailto:sn.agarwal@electrosteel.com">sn.agarwal@electrosteel.com</a></p>
      <p><strong>Contact:</strong> Mr. Shivendra Agarwal</p>
    `,
  },
  {
    id: "germany",
    title: "Germany",
    leftPct: 53.3,
    topPct: 11.0,
    html: `
      <h3><strong>GERMANY</strong></h3>
      <p>Electrosteel Europe S.A. — Niederlassung Deutschland<br>
         Bruder-Kremer-Str. 6, 65549 Limburg a.d. Lahn, Germany</p>
      <p><strong>Phone:</strong> +49 6442 9559 340<br>
         <strong>Fax:</strong> +49 6442 9559 341</p>
      <p><strong>Email:</strong> <a href="mailto:cjf.hahang@electrosteel.fr">cjf.hahang@electrosteel.fr</a></p>
      <p><strong>Website:</strong> <a href="https://www.electrosteel.de/" target="_blank" rel="noopener noreferrer">www.electrosteel.de</a></p>
      <p><strong>Contact:</strong> Cyrille Hahang</p>
    `,
  },
];

const SubsidiariesMapSection = () => {
  const containerRef = useRef(null); // the visible map box (positioned)
  const [openId, setOpenId] = useState(null);

  // Store refs for pins and popovers to measure/position
  const pinRefs = useMemo(() => new Map(), []);
  const popRefs = useMemo(() => new Map(), []);

  const closeAll = useCallback(() => {
    setOpenId(null);
  }, []);

  // Close on outside click
  useEffect(() => {
    function onDocClick(e) {
      const c = containerRef.current;
      if (!c) return;
      const clickedInside =
        c.contains(e.target) &&
        (e.target.closest(`.${styles.pin}`) || e.target.closest(`.${styles.popover}`));
      if (!clickedInside) closeAll();
    }
    document.addEventListener("click", onDocClick);
    return () => document.removeEventListener("click", onDocClick);
  }, [closeAll]);

  // Close on Esc
  useEffect(() => {
    function onKey(e) {
      if (e.key === "Escape") closeAll();
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [closeAll]);

  // Reposition when openId changes or on resize
  useEffect(() => {
    const c = containerRef.current;
    if (!c || !openId) return;

    const pin = pinRefs.get(openId);
    const pop = popRefs.get(openId);
    if (pin && pop) placePopover({ container: c, anchor: pin, popover: pop, gap: 10 });

    function onResize() {
      const pinEl = pinRefs.get(openId);
      const popEl = popRefs.get(openId);
      if (pinEl && popEl) placePopover({ container: c, anchor: pinEl, popover: popEl, gap: 10 });
    }

    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [openId, pinRefs, popRefs]);

  const handlePinClick = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <section>
      <div className={`${styles.containerLg} !pt-0`}>
          {/* Left Content */}
          <div className={styles.sectionContent}>
            <div className={styles.mapMainHolder}>
                <div className={styles.mapWrapper} data-text="Map">
                    <div className={styles.mapBox} ref={containerRef} aria-label="World map with office locations">
                        {/* Background Map */}
                        <div className={styles.mapImage}>
                        <Image
                            src="/images/maps/map_img2.jpg"
                            alt="World map"
                            fill
                            priority
                            sizes="100vw"
                        />
                        </div>

                        {/* Pins + Popovers */}
                        {offices.map((o) => (
                        <React.Fragment key={o.id}>
                            {/* Pin */}
                            <button
                            ref={(el) => {
                                if (el) pinRefs.set(o.id, el);
                                else pinRefs.delete(o.id);
                            }}
                            type="button"
                            aria-haspopup="dialog"
                            aria-expanded={openId === o.id}
                            aria-controls={`popover-${o.id}`}
                            className={styles.pin}
                            style={{ left: `${o.leftPct}%`, top: `${o.topPct}%` }}
                            onClick={() => handlePinClick(o.id)}
                            >
                            <span className={styles.sr}>{o.title} — open contact card</span>
                            <span className={styles.pinLabel} aria-hidden>{o.title}</span>
                            </button>

                            {/* Popover */}
                            <div
                            id={`popover-${o.id}`}
                            ref={(el) => {
                                if (el) popRefs.set(o.id, el);
                                else popRefs.delete(o.id);
                            }}
                            role="dialog"
                            aria-label={`${o.title} contact card`}
                            className={`${styles.popover} ${openId === o.id ? styles.open : ""}`}
                            // Position absolutely; JS will set left/top when open
                            dangerouslySetInnerHTML={{
                                __html:
                                `<button class="${styles.closeBtn}" aria-label="Close" title="Close">×</button>` +
                                `<div class="${styles.popContent}">${o.html}</div>`,
                            }}
                            onClick={(e) => {
                                if (e.target.closest(`.${styles.closeBtn}`)) {
                                e.preventDefault();
                                setOpenId(null);
                                }
                            }}
                            />
                        </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>
            <p className={styles.legend}>Click a Yellow Map marker pin to see contact details.</p>
          </div>

          {/* Right column free for your additional content */}
          <div className="hidden lg:block">
            {/* Add any supporting copy, images, or CTAs here */}
          </div>
      </div>
    </section>
  );
};

export default SubsidiariesMapSection;
