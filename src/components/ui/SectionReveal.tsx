"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Subtle scroll-reveal wrapper used by {@link Section}. Fades + lifts content
 * into view when the section enters the viewport, and resets when it leaves so
 * the animation replays on the way down AND back up. Honors reduced-motion.
 */
export function SectionReveal({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) {
      setVisible(true);
      return;
    }

    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setVisible(entry.isIntersecting);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        reduced
          ? ""
          : cn(
              "transition-all duration-700 ease-calm motion-reduce:transition-none",
              visible
                ? "translate-y-0 opacity-100"
                : "translate-y-5 opacity-0",
            ),
        className,
      )}
    >
      {children}
    </div>
  );
}
