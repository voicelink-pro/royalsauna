import type { HeaterModel, Locale } from "@/types";
import type { Dictionary } from "@/lib/i18n";

/** Shared formatting helpers for HeaterModel fields, used by the comparison
 * table and the per-heater detail sections on /specyfikacja/piece. */

export function formatHeaterPower(heater: HeaterModel, locale: Locale): string {
  const value = heater.powerKw.toFixed(1).replace(".", locale === "pl" ? "," : ".");
  return `${value} kW`;
}

export function formatHeaterVolume(heater: HeaterModel, dict: Dictionary): string {
  if (!heater.volumeM3) return dict.heatersPage.volumeUnknown;
  return `${heater.volumeM3.min}–${heater.volumeM3.max} m³`;
}

export function formatHeaterWifi(heater: HeaterModel, dict: Dictionary): string {
  return heater.requiresControlLicense
    ? `${heater.wifiApp}, ${dict.heatersPage.controlLicense}`
    : heater.wifiApp;
}

export function formatHeaterDimensions(heater: HeaterModel): string {
  const { height, width, depth } = heater.dimensionsMm;
  return `${height} × ${width} × ${depth} mm`;
}

export function formatHeaterStones(heater: HeaterModel): string {
  return `${heater.stonesKg} kg`;
}
