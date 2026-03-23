/** Build a tel: href from a human-readable UK-style number (demo). */
export function phoneToTelHref(display: string): string {
  const digits = display.replace(/\D/g, "");
  return digits.length > 0 ? `tel:${digits}` : "tel:";
}
