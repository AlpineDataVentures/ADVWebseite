/**
 * Lädt ein Bild und gibt es als (bei Bedarf verkleinerte) Data-URL zurück.
 * Wird für den PDF-Export genutzt, damit Fotos/Logos nicht in voller
 * Kameraauflösung ins PDF eingebettet werden (Dateigröße, Ladezeit).
 */
export async function loadImageAsDataUrl(
  url: string,
  options: { maxWidth: number; maxHeight?: number; format?: "image/png" | "image/jpeg"; quality?: number }
): Promise<string> {
  const { maxWidth, maxHeight = maxWidth, format = "image/jpeg", quality = 0.85 } = options;

  const img = await new Promise<HTMLImageElement>((resolve, reject) => {
    const el = new Image();
    el.onload = () => resolve(el);
    el.onerror = () => reject(new Error(`Bild konnte nicht geladen werden: ${url}`));
    el.src = url;
  });

  const ratio = Math.min(maxWidth / img.width, maxHeight / img.height, 1);
  const width = Math.max(1, Math.round(img.width * ratio));
  const height = Math.max(1, Math.round(img.height * ratio));

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("Canvas 2D-Kontext nicht verfügbar");
  ctx.drawImage(img, 0, 0, width, height);

  return canvas.toDataURL(format, quality);
}
