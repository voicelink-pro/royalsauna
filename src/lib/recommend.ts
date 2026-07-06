import type { ModelId } from "@/types";

/**
 * Answers collected by the configurator wizard. Only `people` and `garden`
 * drive the model recommendation — `frequency` is passed through as extra
 * context for the lead e-mail only.
 */
export interface ConfiguratorAnswers {
  people: "2" | "3" | "5";
  garden: "small" | "medium" | "large";
  frequency: "occasional" | "regular" | "daily";
}

export interface Recommendation {
  model: ModelId;
}

/**
 * Maps configurator answers to a recommended model. Heater selection isn't
 * part of the flow: every offer automatically includes the full heater
 * line-up and pricing, so there is nothing to recommend or ask about here.
 */
export function recommend(answers: Partial<ConfiguratorAnswers>): Recommendation {
  const peopleToModel: Record<string, ModelId> = {
    "2": "compact",
    "3": "comfort",
    "5": "premium",
  };
  let model: ModelId = peopleToModel[answers.people ?? "3"] ?? "comfort";

  // A small garden caps the footprint one size down (but never below compact).
  if (answers.garden === "small" && model === "premium") model = "comfort";

  return { model };
}
