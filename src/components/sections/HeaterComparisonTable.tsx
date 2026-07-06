import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/types";
import type { Dictionary } from "@/lib/i18n";
import { routeMap } from "@/lib/site";
import { heaterModels } from "@/content/heaterModels";
import {
  formatHeaterDimensions,
  formatHeaterPower,
  formatHeaterStones,
  formatHeaterVolume,
  formatHeaterWifi,
} from "@/lib/heaterFormat";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

/** Side-by-side spec comparison for every heater on /specyfikacja/piece. */
export function HeaterComparisonTable({
  locale,
  dict,
}: {
  locale: Locale;
  dict: Dictionary;
}) {
  const h = dict.heatersPage;
  const cols = h.compareSection.columns;

  return (
    <div className="overflow-hidden rounded-3xl border border-sand-200 bg-ivory shadow-card">
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            <TableHead>{cols.model}</TableHead>
            <TableHead>{cols.power}</TableHead>
            <TableHead>{cols.volume}</TableHead>
            <TableHead>{cols.mounting}</TableHead>
            <TableHead>{cols.controller}</TableHead>
            <TableHead>{cols.wifi}</TableHead>
            <TableHead>{cols.stones}</TableHead>
            <TableHead>{cols.dimensions}</TableHead>
            <TableHead>{cols.color}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {heaterModels.map((heater) => (
            <TableRow key={heater.id}>
              <TableCell>
                <Link
                  href={`${routeMap.heaters[locale]}#${heater.id}`}
                  className="group flex items-center gap-3"
                >
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={heater.image.src}
                      alt={heater.image.alt}
                      fill
                      sizes="48px"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <span className="font-serif text-sm leading-snug text-bark-700 transition-colors group-hover:text-clay-600">
                    {heater.name}
                  </span>
                </Link>
              </TableCell>
              <TableCell className="whitespace-nowrap font-medium text-bark-700">
                {formatHeaterPower(heater, locale)}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {formatHeaterVolume(heater, dict)}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {h.mounting[heater.mounting]}
              </TableCell>
              <TableCell className="whitespace-nowrap">{heater.controller}</TableCell>
              <TableCell className="whitespace-nowrap">
                {formatHeaterWifi(heater, dict)}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {formatHeaterStones(heater)}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {formatHeaterDimensions(heater)}
              </TableCell>
              <TableCell className="whitespace-nowrap">
                {h.color[heater.color]}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
