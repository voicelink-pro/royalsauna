import type {
  ClimateAnswer,
  ConfiguratorAnswers,
  HeaterModelId,
  ModelId,
  PeopleAnswer,
  SiteCheck,
  SpaceAnswer,
} from "@/types";
import { products } from "@/content/products";
import { foundationDimensions } from "@/content/foundationDimensions";
import { heaterModelsByProduct } from "@/content/heaterModels";

export type { ConfiguratorAnswers };

/** Seats a model must offer for a regular session with the given group. */
export const PEOPLE_REQUIRED: Record<PeopleAnswer, number> = {
  "1-2": 2,
  "3-4": 4,
  "5-6": 6,
};

/** Model ids ordered from the smallest to the largest cabin. */
export const MODELS_BY_SIZE: ModelId[] = [...products]
  .sort((a, b) => a.capacity - b.capacity)
  .map((p) => p.id);

/**
 * `fits` – recommended foundation fits as entered, `rotated` – only when the
 * sauna is turned sideways, `unknown` – the client doesn't know the dimensions.
 */
export type FitStatus = "fits" | "rotated" | "tooSmall" | "unknown";

export interface ModelEvaluation {
  model: ModelId;
  capacity: number;
  capacityOk: boolean;
  fit: FitStatus;
  /** Passes every hard condition (seats and physical space). */
  eligible: boolean;
}

export interface Conflict {
  /** Smallest model with enough seats – doesn't fit the given space. */
  needed: ModelId;
  /** Largest model that does fit the space, if any. */
  fallback: ModelId | null;
}

/** How the comfort preference influenced the choice among eligible models. */
export type ComfortOutcome =
  | "smallest"
  | "upgraded"
  | "upgradeBlocked"
  | "alreadyLargest";

export interface Recommendation {
  /** Null only when the hard conditions contradict each other. */
  model: ModelId | null;
  conflict: Conflict | null;
  comfortOutcome: ComfortOutcome;
  evaluations: ModelEvaluation[];
}

const EPSILON = 1e-6;

export function getFootprint(model: ModelId) {
  return foundationDimensions.find((d) => d.modelId === model)!;
}

export function hasKnownSpace(
  space: SpaceAnswer | undefined,
): space is SpaceAnswer & { width: number; depth: number } {
  return !!space && !space.unknown && !!space.width && !!space.depth;
}

export function spaceFit(space: SpaceAnswer | undefined, model: ModelId): FitStatus {
  if (!hasKnownSpace(space)) return "unknown";
  const { width, depth } = getFootprint(model).recommendedM;
  if (space.width + EPSILON >= width && space.depth + EPSILON >= depth) return "fits";
  if (space.width + EPSILON >= depth && space.depth + EPSILON >= width) return "rotated";
  return "tooSmall";
}

export function evaluateModels(
  answers: Partial<ConfiguratorAnswers>,
): ModelEvaluation[] {
  const required = answers.people ? PEOPLE_REQUIRED[answers.people] : 0;
  return MODELS_BY_SIZE.map((model) => {
    const capacity = products.find((p) => p.id === model)!.capacity;
    const capacityOk = capacity >= required;
    const fit = spaceFit(answers.space, model);
    return {
      model,
      capacity,
      capacityOk,
      fit,
      eligible: capacityOk && fit !== "tooSmall",
    };
  });
}

/**
 * Hard conditions (seats, physical space) filter the catalogue first; the
 * comfort preference then picks among the models that passed. Contradictory
 * conditions produce a conflict instead of a seemingly perfect result.
 */
export function recommend(answers: Partial<ConfiguratorAnswers>): Recommendation {
  const evaluations = evaluateModels(answers);
  const eligible = evaluations.filter((e) => e.eligible).map((e) => e.model);

  if (eligible.length === 0) {
    const needed =
      evaluations.find((e) => e.capacityOk)?.model ??
      MODELS_BY_SIZE[MODELS_BY_SIZE.length - 1];
    const fitting = evaluations.filter((e) => e.fit !== "tooSmall");
    return {
      model: null,
      conflict: { needed, fallback: fitting[fitting.length - 1]?.model ?? null },
      comfortOutcome: "smallest",
      evaluations,
    };
  }

  const base = eligible[0];
  let model = base;
  let comfortOutcome: ComfortOutcome = "smallest";

  if (answers.comfort && answers.comfort !== "smallest") {
    const next = MODELS_BY_SIZE[MODELS_BY_SIZE.indexOf(base) + 1];
    if (!next) comfortOutcome = "alreadyLargest";
    else if (eligible.includes(next)) {
      model = next;
      comfortOutcome = "upgraded";
    } else comfortOutcome = "upgradeBlocked";
  }

  return { model, conflict: null, comfortOutcome, evaluations };
}

const HEATER_PREFERENCE: Record<ClimateAnswer, HeaterModelId[]> = {
  soft: ["cilindro", "legend", "spirit"],
  strong: ["legend", "cilindro", "spirit"],
  design: ["spirit", "legend", "cilindro"],
  advise: ["cilindro", "legend", "spirit"],
};

/** Suggests a heater among those offered for the model – final choice is confirmed before the offer. */
export function recommendHeater(
  model: ModelId,
  climate: ClimateAnswer | undefined,
): HeaterModelId {
  const available = heaterModelsByProduct[model];
  const order = HEATER_PREFERENCE[climate ?? "advise"];
  return order.find((id) => available.includes(id)) ?? available[0];
}

/** Items to verify before installation. "Don't know" never blocks the result. */
export function siteChecks(answers: Partial<ConfiguratorAnswers>): SiteCheck[] {
  const checks: SiteCheck[] = [];
  if (!hasKnownSpace(answers.space)) checks.push("space");
  if (answers.foundation !== "ready") checks.push("foundation");
  if (answers.power !== "ready") checks.push("power");
  checks.push("access");
  return checks;
}

export function projectStatus(checks: SiteCheck[]): "ready" | "toConfirm" {
  return checks.some((c) => c !== "access") ? "toConfirm" : "ready";
}
