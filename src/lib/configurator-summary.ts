import type {
  ConfiguratorAnswers,
  ConfiguratorLeadData,
  Locale,
  SiteCheck,
  SpaceAnswer,
} from "@/types";
import type { Dictionary } from "@/lib/i18n";
import { getProduct, LINE_NAME } from "@/content/products";
import { getHeaterModel } from "@/content/heaterModels";
import { formatFootprint } from "@/content/foundationDimensions";
import { hasKnownSpace } from "@/lib/recommend";

type Wizard = Dictionary["configurator"]["wizard"];

/** Replaces `{key}` placeholders in a dictionary template. */
export function fill(template: string, vars: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in vars ? String(vars[key]) : match,
  );
}

export function optionLabel(
  options: readonly { value: string; label: string }[],
  value: string | undefined,
): string | undefined {
  return options.find((o) => o.value === value)?.label;
}

export function formatSpace(
  space: SpaceAnswer | undefined,
  locale: Locale,
  W: Wizard,
): string {
  if (!hasKnownSpace(space)) return W.summary.spaceUnknown;
  return formatFootprint({ width: space.width, depth: space.depth }, locale);
}

/** "a, b i c" / "a, b and c". */
export function joinList(items: string[], and: string): string {
  if (items.length <= 1) return items.join("");
  return `${items.slice(0, -1).join(", ")} ${and} ${items[items.length - 1]}`;
}

export function formatChecks(checks: SiteCheck[], W: Wizard): string {
  if (!Array.isArray(checks)) return "";
  return joinList(
    checks.map((c) => W.result.checks[c]).filter(Boolean),
    W.result.and,
  );
}

export function seatsWord(n: number, locale: Locale, W: Wizard): string {
  if (locale === "pl" && n >= 2 && n <= 4) return W.seatsFew;
  return W.seatsMany;
}

export type SummaryStep =
  | "usage"
  | "people"
  | "comfort"
  | "space"
  | "preparation"
  | "climate"
  | "timing";

export interface SummaryRow {
  key: string;
  label: string;
  value: string;
  /** Wizard step to jump to when the client wants to edit this answer. */
  step?: SummaryStep | "result";
}

/** Answers + chosen model/heater as label/value rows for the contact form. */
export function buildAnswerRows(
  answers: Partial<ConfiguratorAnswers>,
  model: ConfiguratorLeadData["selectedModel"],
  heater: ConfiguratorLeadData["heater"],
  locale: Locale,
  W: Wizard,
): SummaryRow[] {
  const S = W.summary;
  const steps = W.steps;
  const empty = S.empty;
  const product = getProduct(model);
  const prep = steps.preparation;

  return [
    { key: "model", label: S.model, value: product ? `${LINE_NAME} ${product.name}` : empty, step: "result" },
    { key: "heater", label: S.heater, value: getHeaterModel(heater)?.name ?? empty, step: "result" },
    { key: "usage", label: S.usage, value: optionLabel(steps.usage.options, answers.usage) ?? empty, step: "usage" },
    { key: "people", label: S.people, value: optionLabel(steps.people.options, answers.people) ?? empty, step: "people" },
    { key: "comfort", label: S.comfort, value: optionLabel(steps.comfort.options, answers.comfort) ?? empty, step: "comfort" },
    { key: "space", label: S.space, value: formatSpace(answers.space, locale, W), step: "space" },
    { key: "foundation", label: S.foundation, value: optionLabel(prep.foundation.options, answers.foundation) ?? empty, step: "preparation" },
    { key: "power", label: S.power, value: optionLabel(prep.power.options, answers.power) ?? empty, step: "preparation" },
    { key: "climate", label: S.climate, value: optionLabel(steps.climate.options, answers.climate) ?? empty, step: "climate" },
    { key: "timing", label: S.timing, value: optionLabel(steps.timing.options, answers.timing) ?? empty, step: "timing" },
  ];
}

/** Full project as rows for the sales team, including status and open checks. */
export function buildLeadRows(
  data: ConfiguratorLeadData,
  locale: Locale,
  W: Wizard,
): SummaryRow[] {
  const S = W.summary;
  const recommended = data.recommendedModel ? getProduct(data.recommendedModel) : undefined;
  return [
    {
      key: "intent",
      label: S.intent,
      value: data.intent === "installation" ? S.intentInstallation : S.intentProject,
    },
    ...buildAnswerRows(data.answers, data.selectedModel, data.heater, locale, W),
    {
      key: "recommended",
      label: S.recommended,
      value: recommended ? `${LINE_NAME} ${recommended.name}` : S.conflict,
    },
    {
      key: "status",
      label: S.status,
      value: data.status === "ready" ? W.result.statusReady : W.result.statusToConfirm,
    },
    { key: "checks", label: S.checks, value: formatChecks(data.checks, W) || S.empty },
  ];
}
