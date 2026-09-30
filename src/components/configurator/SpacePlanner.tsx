"use client";

import type { Locale, ModelId, SpaceAnswer } from "@/types";
import type { Dictionary } from "@/lib/i18n";
import { getProduct } from "@/content/products";
import { formatFootprint } from "@/content/foundationDimensions";
import {
  MODELS_BY_SIZE,
  getFootprint,
  hasKnownSpace,
  spaceFit,
  type FitStatus,
} from "@/lib/recommend";
import { cn } from "@/lib/utils";

const MODEL_COLORS: Record<ModelId, string> = {
  compact: "#C9A24B",
  comfort: "#977542",
  premium: "#33281A",
};

const VIEW_W = 600;
const PAD = 48;
const MAX_INNER_H = 340;

type SpaceCopy = Dictionary["configurator"]["wizard"]["steps"]["space"];

export function SpacePlanner({
  space,
  locale,
  copy,
}: {
  space: SpaceAnswer;
  locale: Locale;
  copy: SpaceCopy;
}) {
  const known = hasKnownSpace(space);

  const outlines = MODELS_BY_SIZE.map((model) => {
    const fit: FitStatus = spaceFit(space, model);
    const { width, depth } = getFootprint(model).recommendedM;
    const rotated = fit === "rotated";
    return {
      model,
      fit,
      w: rotated ? depth : width,
      d: rotated ? width : depth,
      label: formatFootprint({ width, depth }, locale),
    };
  });

  const extentW = Math.max(known ? space.width! : 0, ...outlines.map((o) => o.w));
  const extentD = Math.max(known ? space.depth! : 0, ...outlines.map((o) => o.d));
  const scale = Math.min((VIEW_W - PAD * 2) / extentW, MAX_INNER_H / extentD);
  const viewH = extentD * scale + PAD * 2;
  const px = (m: number) => m * scale;
  const fmt = (m: number) =>
    locale === "pl" ? String(m).replace(".", ",") : String(m);

  const statusLabel: Record<FitStatus, string> = {
    fits: copy.fits,
    rotated: copy.rotated,
    tooSmall: copy.tooSmall,
    unknown: "",
  };

  return (
    <figure className="rounded-2xl border border-sand-200 bg-white/60 p-4 sm:p-5">
      <figcaption className="mb-3 text-xs font-medium uppercase tracking-widest text-clay-500">
        {known ? copy.planTitle : copy.planTitleUnknown}
      </figcaption>

      <svg
        viewBox={`0 0 ${VIEW_W} ${viewH}`}
        className="h-auto w-full"
        role="img"
        aria-label={known ? copy.planTitle : copy.planTitleUnknown}
      >
        <defs>
          <pattern id="sp-grid" width={px(0.5)} height={px(0.5)} patternUnits="userSpaceOnUse" x={PAD} y={PAD}>
            <path d={`M ${px(0.5)} 0 L 0 0 0 ${px(0.5)}`} fill="none" stroke="#E7DBC6" strokeWidth="1" />
          </pattern>
        </defs>

        <rect x={PAD} y={PAD} width={px(extentW)} height={px(extentD)} fill="url(#sp-grid)" />

        {known && (
          <g>
            <rect
              x={PAD}
              y={PAD}
              width={px(space.width!)}
              height={px(space.depth!)}
              fill="#F1E9D9"
              stroke="#B08D57"
              strokeWidth="2"
              strokeDasharray="8 6"
              rx="4"
              className="transition-all duration-500 ease-calm"
            />
            <text x={PAD + px(space.width!) / 2} y={PAD - 16} textAnchor="middle" fontSize="18" fill="#5A4632">
              {fmt(space.width!)} m
            </text>
            <text
              x={PAD - 18}
              y={PAD + px(space.depth!) / 2}
              textAnchor="middle"
              fontSize="18"
              fill="#5A4632"
              transform={`rotate(-90 ${PAD - 18} ${PAD + px(space.depth!) / 2})`}
            >
              {fmt(space.depth!)} m
            </text>
          </g>
        )}

        {[...outlines].reverse().map((o) => {
          const color = MODEL_COLORS[o.model];
          const out = o.fit === "tooSmall";
          return (
            <g key={o.model} opacity={out ? 0.55 : 1} className="transition-opacity duration-500">
              <rect
                x={PAD}
                y={PAD}
                width={px(o.w)}
                height={px(o.d)}
                fill={out ? "none" : color}
                fillOpacity={out ? 0 : 0.08}
                stroke={color}
                strokeWidth={out ? 1.5 : 2.5}
                strokeDasharray={out ? "4 4" : undefined}
                rx="3"
                className="transition-all duration-500 ease-calm"
              />
              <text
                x={PAD + px(o.w) - 8}
                y={PAD + px(o.d) - 8}
                textAnchor="end"
                fontSize="17"
                fontWeight="600"
                fill={color}
              >
                {getProduct(o.model)?.name}
              </text>
            </g>
          );
        })}
      </svg>

      <ul className="mt-4 grid gap-2 sm:grid-cols-3">
        {outlines.map((o) => (
          <li
            key={o.model}
            className="flex items-center gap-2.5 rounded-xl bg-sand-100/70 px-3 py-2 text-sm"
          >
            <span
              className="h-3 w-3 shrink-0 rounded-sm"
              style={{ backgroundColor: MODEL_COLORS[o.model] }}
              aria-hidden="true"
            />
            <span className="min-w-0">
              <span className="block font-medium text-bark-700">
                {getProduct(o.model)?.name}{" "}
                <span className="font-normal text-bark-500">{o.label}</span>
              </span>
              {o.fit !== "unknown" && (
                <span
                  className={cn(
                    "text-xs",
                    o.fit === "tooSmall" ? "text-red-700" : "text-emerald-700",
                  )}
                >
                  {statusLabel[o.fit]}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>

      <p className="mt-3 text-xs leading-relaxed text-bark-500">{copy.foundationNote}</p>
    </figure>
  );
}
