"use client";

import { type ReactNode } from "react";

interface ProgressiveBlurProps {
  children: ReactNode;
  direction?: "top" | "bottom" | "left" | "right";
  blurStart?: number;
  blurEnd?: number;
  className?: string;
  /** Height/width of the fade zone as a CSS value (e.g. "40px", "20%") */
  fadeSize?: string;
}

export function ProgressiveBlur({
  children,
  direction = "bottom",
  blurEnd = 8,
  className,
  fadeSize = "40px",
}: ProgressiveBlurProps) {
  const isHorizontal = direction === "left" || direction === "right";

  const maskImage =
    direction === "bottom"
      ? `linear-gradient(to bottom, black ${fadeSize}, transparent 100%)`
      : direction === "top"
        ? `linear-gradient(to top, black ${fadeSize}, transparent 100%)`
        : direction === "right"
          ? `linear-gradient(to right, black ${fadeSize}, transparent 100%)`
          : `linear-gradient(to left, black ${fadeSize}, transparent 100%)`;

  const maskSize = isHorizontal ? "100% 100%" : "100% 100%";

  return (
    <div
      className={`relative ${className ?? ""}`}
      style={{
        maskImage,
        WebkitMaskImage: maskImage,
        maskSize,
        WebkitMaskSize: maskSize,
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    >
      {children}
      {/* Blur overlay */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backdropFilter: `blur(${blurEnd}px)`,
          WebkitBackdropFilter: `blur(${blurEnd}px)`,
          maskImage,
          WebkitMaskImage: maskImage,
          maskSize,
          WebkitMaskSize: maskSize,
          maskRepeat: "no-repeat",
          WebkitMaskRepeat: "no-repeat",
        }}
        aria-hidden="true"
      />
    </div>
  );
}

export default ProgressiveBlur;