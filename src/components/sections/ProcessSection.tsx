import type { Dictionary } from "@/lib/i18n";
import { Reveal } from "@/components/ui/Reveal";

/** Heroicons-style outline icons, one per ordering-process step. */
const ICONS = [
  // Inquiry / form
  "M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z",
  // Heater / flame (quote based on heater choice)
  "M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.047 8.287 8.287 0 009 9.601a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z",
  // Production / tools
  "M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26",
  // Delivery / truck
  "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12",
];

/** Premium ordering-process pipeline with a connecting line and icons. */
export function ProcessSection({ dict }: { dict: Dictionary }) {
  const steps = dict.home.process.steps;

  return (
    <div className="relative">
      {/* Connecting line (desktop) running through the icon tiles. */}
      <div
        aria-hidden="true"
        className="absolute left-8 right-[calc(25%-3.5rem)] top-8 hidden h-px bg-gradient-to-r from-transparent via-clay-400/80 to-transparent lg:block"
      />

      <ol className="relative grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, index) => (
          <Reveal
            as="li"
            key={step.title}
            delay={index * 110}
            className="group relative flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            {/* Icon tile + step number */}
            <div className="relative">
              <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-sand-300 bg-sand-100 text-bark-700 shadow-card transition-all duration-500 ease-calm group-hover:-translate-y-1 group-hover:border-clay-400/60 group-hover:text-clay-600 group-hover:shadow-soft">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-7 w-7"
                  aria-hidden="true"
                >
                  <path d={ICONS[index]} />
                </svg>
              </span>
              <span className="absolute -right-1.5 -top-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-bark-700 font-serif text-sm text-ivory ring-4 ring-sand-100 transition-colors duration-500 group-hover:bg-brass group-hover:text-bark-800">
                {index + 1}
              </span>
            </div>

            <h3 className="mt-6 font-serif text-xl text-bark-700">
              {step.title}
            </h3>
            <p className="mt-2 max-w-xs leading-relaxed text-bark-500">
              {step.description}
            </p>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
