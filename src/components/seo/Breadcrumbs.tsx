import Link from "next/link";
import type { BreadcrumbItem } from "@/types";
import { JsonLd, breadcrumbSchema } from "@/components/seo/JsonLd";

/**
 * Accessible breadcrumb trail + matching BreadcrumbList JSON-LD.
 */
export function Breadcrumbs({
  items,
  label = "Breadcrumb",
}: {
  items: BreadcrumbItem[];
  label?: string;
}) {
  return (
    <>
      <nav aria-label={label} className="text-sm text-bark-400">
        <ol className="flex flex-wrap items-center gap-2">
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={item.href} className="flex items-center gap-2">
                {isLast ? (
                  <span aria-current="page" className="text-bark-600">
                    {item.name}
                  </span>
                ) : (
                  <>
                    <Link
                      href={item.href}
                      className="transition-colors hover:text-clay-600"
                    >
                      {item.name}
                    </Link>
                    <span aria-hidden="true" className="text-sand-400">
                      /
                    </span>
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(items)} />
    </>
  );
}
