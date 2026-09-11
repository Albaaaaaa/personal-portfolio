"use client";

import { useRef, useEffect, useState, type ReactNode } from "react";

interface InfiniteSliderProps {
  children: ReactNode;
  gap?: number;
  duration?: number;
  durationOnHover?: number;
  direction?: "horizontal" | "vertical";
  reverse?: boolean;
  className?: string;
}

export function InfiniteSlider({
  children,
  gap = 24,
  duration = 50,
  durationOnHover,
  direction = "horizontal",
  reverse = false,
  className,
}: InfiniteSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [speed, setSpeed] = useState(duration);

  useEffect(() => {
    setSpeed(isHovering && durationOnHover ? durationOnHover : duration);
  }, [isHovering, duration, durationOnHover]);

  const isHorizontal = direction === "horizontal";

  return (
    <div
      ref={containerRef}
      className={`overflow-hidden ${className ?? ""}`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className="flex"
        style={{
          gap: `${gap}px`,
          flexDirection: isHorizontal ? "row" : "column",
          width: isHorizontal ? "max-content" : undefined,
          height: !isHorizontal ? "max-content" : undefined,
          animation: `infinite-scroll-${direction} ${speed}s linear infinite${reverse ? " reverse" : ""}`,
        }}
      >
        {children}
        {children}
      </div>
      <style>{`
        @keyframes infinite-scroll-horizontal {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes infinite-scroll-vertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-50%); }
        }
      `}</style>
    </div>
  );
}

export default InfiniteSlider;