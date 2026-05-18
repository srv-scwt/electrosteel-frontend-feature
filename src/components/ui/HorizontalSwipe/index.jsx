"use client";
import React, { useEffect, useRef } from "react";

const HorizontalSwipe = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;

    const handleDown = (e) => {
      isDown = true;
      container.style.cursor = "grabbing";
      container.style.userSelect = "none";
      startX = e.pageX - container.offsetLeft;
      scrollLeft = container.scrollLeft;
      e.preventDefault();
    };

    const handleMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - container.offsetLeft;
      const walk = (x - startX) * 1.5; // Scroll speed multiplier
      container.scrollLeft = scrollLeft - walk;
    };

    const handleUp = () => {
      isDown = false;
      container.style.cursor = "grab";
      container.style.userSelect = "auto";
    };

    container.addEventListener("mousedown", handleDown);
    container.addEventListener("mousemove", handleMove);
    container.addEventListener("mouseup", handleUp);
    container.addEventListener("mouseleave", handleUp);

    return () => {
      container.removeEventListener("mousedown", handleDown);
      container.removeEventListener("mousemove", handleMove);
      container.removeEventListener("mouseup", handleUp);
      container.removeEventListener("mouseleave", handleUp);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="flex w-full gap-6 overflow-x-auto overflow-y-hidden scroll-smooth cursor-grab select-none snap-x snap-mandatory hide-scrollbar [&>*]:snap-start [&>*]:shrink-0 [&_img]:pointer-events-none [&_img]:select-none"
    >
      {children}
    </div>
  );
};

export default HorizontalSwipe;
