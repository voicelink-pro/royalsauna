"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface FrameSequenceCanvasProps {
  /** Total number of frames in the sequence. */
  frameCount: number;
  /** Resolves a 1-based frame index to its image URL. */
  framePath: (index: number) => string;
  /** Target scroll progress in the range 0..1. */
  progress: number;
  className?: string;
  /** Lerp factor (0..1) used to smooth between the current and target frame. */
  smoothing?: number;
  /** Called once a frame near the current progress has decoded and painted. */
  onFirstFrame?: () => void;
}

const LOOKAHEAD = 8;
const CONCURRENCY = 4;

/** Draws an image onto the canvas using a "cover" fit (CSS-pixel space). */
function drawCover(
  ctx: CanvasRenderingContext2D,
  img: HTMLImageElement,
  cw: number,
  ch: number,
) {
  const imgRatio = img.naturalWidth / img.naturalHeight;
  const boxRatio = cw / ch;
  let dw: number;
  let dh: number;
  if (boxRatio > imgRatio) {
    dw = cw;
    dh = cw / imgRatio;
  } else {
    dh = ch;
    dw = ch * imgRatio;
  }
  const dx = (cw - dw) / 2;
  const dy = (ch - dh) / 2;
  ctx.drawImage(img, dx, dy, dw, dh);
}

/**
 * Apple-style scroll-scrubbed hero: a pre-rendered image sequence painted to a
 * canvas. This avoids the jank of seeking a <video> element's currentTime
 * (asynchronous decode, sparse keyframes) and stays buttery across browsers.
 *
 * Only the first frame (and, once the visitor scrolls, a small lookahead
 * window) is fetched — so Lighthouse / first paint never download the full
 * sequence. A self-stopping rAF loop lerps toward the scroll target. Honors
 * prefers-reduced-motion (snaps instantly).
 */
export function FrameSequenceCanvas({
  frameCount,
  framePath,
  progress,
  className,
  smoothing = 0.18,
  onFirstFrame,
}: FrameSequenceCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<(HTMLImageElement | undefined)[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const displayRef = useRef(0);
  const targetRef = useRef(0);
  const drawnRef = useRef(-1);
  const rafRef = useRef(0);
  const reducedRef = useRef(false);
  const sizeRef = useRef({ w: 0, h: 0 });
  const framePathRef = useRef(framePath);
  const progressRef = useRef(progress);
  const onFirstFrameRef = useRef(onFirstFrame);
  const requestRangeRef = useRef<() => void>(() => {});
  framePathRef.current = framePath;
  progressRef.current = progress;
  onFirstFrameRef.current = onFirstFrame;

  const nearestLoaded = (index: number) => {
    const loaded = loadedRef.current;
    if (loaded[index]) return index;
    for (let d = 1; d < frameCount; d++) {
      if (loaded[index - d]) return index - d;
      if (loaded[index + d]) return index + d;
    }
    return -1;
  };

  const paint = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const target = targetRef.current;
    if (reducedRef.current) {
      displayRef.current = target;
    } else {
      displayRef.current += (target - displayRef.current) * smoothing;
      if (Math.abs(target - displayRef.current) < 0.01) {
        displayRef.current = target;
      }
    }

    const wanted = Math.max(
      0,
      Math.min(frameCount - 1, Math.round(displayRef.current)),
    );
    const frame = nearestLoaded(wanted);
    if (frame !== -1 && frame !== drawnRef.current) {
      const img = imagesRef.current[frame];
      if (img?.complete && img.naturalWidth) {
        const { w, h } = sizeRef.current;
        ctx.clearRect(0, 0, w, h);
        drawCover(ctx, img, w, h);
        drawnRef.current = frame;
      }
    }

    if (Math.abs(target - displayRef.current) > 0.001) {
      rafRef.current = requestAnimationFrame(paint);
    } else {
      rafRef.current = 0;
    }
  };

  const requestPaint = () => {
    if (!rafRef.current) rafRef.current = requestAnimationFrame(paint);
  };

  // Demand-load frames: first frame on mount, the rest as the user scrubs.
  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    imagesRef.current = new Array(frameCount);
    loadedRef.current = new Array<boolean>(frameCount).fill(false);
    drawnRef.current = -1;

    const wanted = new Set<number>();
    const started = new Set<number>();
    let inflight = 0;
    let cancelled = false;
    let firstDone = false;

    const currentIndex = () =>
      Math.max(
        0,
        Math.min(
          frameCount - 1,
          Math.round(Math.max(0, Math.min(1, progressRef.current)) * (frameCount - 1)),
        ),
      );

    const markFirstIfReady = () => {
      if (firstDone) return;
      const current = currentIndex();
      if (loadedRef.current[current] || nearestLoaded(current) !== -1) {
        firstDone = true;
        onFirstFrameRef.current?.();
      }
    };

    const startLoad = (index: number) => {
      if (cancelled || started.has(index) || index < 0 || index >= frameCount) {
        return;
      }
      started.add(index);
      inflight += 1;

      const img = new Image();
      img.decoding = "async";
      img.fetchPriority = index === currentIndex() ? "high" : "low";
      img.onload = () => {
        inflight -= 1;
        if (cancelled) return;
        loadedRef.current[index] = true;
        markFirstIfReady();
        requestPaint();
        pump();
      };
      img.onerror = () => {
        inflight -= 1;
        if (!cancelled) pump();
      };
      img.src = framePathRef.current(index + 1);
      imagesRef.current[index] = img;
    };

    const pump = () => {
      if (cancelled) return;
      const order = [...wanted].sort((a, b) => {
        const c = currentIndex();
        return Math.abs(a - c) - Math.abs(b - c);
      });
      for (const index of order) {
        if (inflight >= CONCURRENCY) break;
        if (!started.has(index)) startLoad(index);
      }
    };

    const requestRange = () => {
      const progress = progressRef.current;
      const current = currentIndex();
      wanted.add(current);
      wanted.add(0);
      if (progress <= 0.008) {
        if (frameCount > 1) wanted.add(1);
      } else {
        const from = Math.max(0, current - 2);
        const to = Math.min(frameCount - 1, current + LOOKAHEAD);
        for (let i = from; i <= to; i++) wanted.add(i);
      }
      pump();
    };

    requestRangeRef.current = requestRange;
    requestRange();

    return () => {
      cancelled = true;
      requestRangeRef.current = () => {};
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      imagesRef.current.forEach((im) => {
        if (!im) return;
        im.onload = null;
        im.onerror = null;
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [frameCount]);

  // Size the canvas backing store to its parent with DPR for crisp output.
  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;

    const setup = () => {
      const w = parent.clientWidth;
      const h = parent.clientHeight;
      if (!w || !h) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      const ctx = canvas.getContext("2d");
      ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };
      drawnRef.current = -1;
      requestPaint();
    };

    setup();
    const ro = new ResizeObserver(setup);
    ro.observe(parent);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // React to scroll progress changes — paint and fetch the next slice of frames.
  useEffect(() => {
    targetRef.current =
      Math.max(0, Math.min(1, progress)) * (frameCount - 1);
    requestPaint();
    requestRangeRef.current();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, frameCount]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn("block h-full w-full", className)}
    />
  );
}
