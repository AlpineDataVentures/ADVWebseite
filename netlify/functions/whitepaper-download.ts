import { WHITEPAPER_FILE, fileStore, htmlResponse, readToken } from "./lib/whitepaper";

// Liefert die PDF aus dem privaten Blob-Store, nur mit gültigem Download-Token.
export default async (request: Request) => {
  const token = new URL(request.url).searchParams.get("token") ?? "";

  try {
    if (!(await readToken(token, "download"))) {
      return htmlResponse(403, "Link ungültig oder abgelaufen", "<p>Bitte fordern Sie das Whitepaper erneut an.</p>");
    }

    const blob = await fileStore().get(WHITEPAPER_FILE, { type: "stream" });
    if (!blob) return htmlResponse(404, "Datei nicht gefunden", "<p>Bitte kontaktieren Sie uns.</p>");

    return new Response(blob, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="Von-Excel-zu-Power-BI-im-Controlling.pdf"',
        "Cache-Control": "private, no-store",
        "X-Robots-Tag": "noindex",
      },
    });
  } catch (err) {
    console.error("whitepaper-download failed", err);
    return htmlResponse(500, "Fehler", "<p>Der Download ist leider fehlgeschlagen.</p>");
  }
};
