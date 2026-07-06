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
  /** Called once the first frame has decoded and painted. */
  onFirstFrame?: () => void;
}

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
 * Frames are preloaded into memory; a self-stopping rAF loop lerps the
 * displayed frame toward the scroll target so motion feels fluid even with a
 * modest frame count. Honors prefers-reduced-motion (snaps instantly).
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
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const loadedRef = useRef<boolean[]>([]);
  const displayRef = useRef(0);
  const targetRef = useRef(0);
  const drawnRef = useRef(-1);
  const rafRef = useRef(0);
  const reducedRef = useRef(false);
  const sizeRef = useRef({ w: 0, h: 0 });

  // Find the nearest already-decoded frame so we never paint a blank canvas.
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

  // Preload all frames.
  useEffect(() => {
    reducedRef.current = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const images: HTMLImageElement[] = [];
    const loaded = new Array<boolean>(frameCount).fill(false);
    let firstDone = false;

    for (let i = 0; i < frameCount; i++) {
      const img = new Image();
      img.decoding = "async";
      const idx = i;
      img.onload = () => {
        loaded[idx] = true;
        if (!firstDone && idx === 0) {
          firstDone = true;
          onFirstFrame?.();
        }
        requestPaint();
      };
      img.src = framePath(i + 1);
      images.push(img);
    }

    imagesRef.current = images;
    loadedRef.current = loaded;

    return () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = 0;
      images.forEach((im) => {
        im.onload = null;
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
      drawnRef.current = -1; // force redraw at new size
      requestPaint();
    };

    setup();
    const ro = new ResizeObserver(setup);
    ro.observe(parent);
    return () => ro.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // React to scroll progress changes.
  useEffect(() => {
    targetRef.current =
      Math.max(0, Math.min(1, progress)) * (frameCount - 1);
    requestPaint();
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
