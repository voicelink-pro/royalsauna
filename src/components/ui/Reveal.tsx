"use client";

import { createElement, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type RevealTag = "div" | "li" | "article" | "section" | "span";

/**
 * Calm fade-up reveal on scroll. Respects `prefers-reduced-motion`: when the
 * user opts out of motion, content is shown immediately with no transition.
 */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  as?: RevealTag;
}) {
  const ref = useRef<HTMLElement | null>(null);
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
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return createElement(
    as,
    {
      ref,
      style: !reduced ? { transitionDelay: `${delay}ms` } : undefined,
      className: cn(
        reduced
          ? ""
          : cn(
              "transition-all duration-700 ease-calm",
              visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0",
            ),
        className,
      ),
    },
    children,
  );
}
