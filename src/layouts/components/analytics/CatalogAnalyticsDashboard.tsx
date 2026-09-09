import { useState } from "react";

interface FunnelStep {
  step: string;
  label: string;
  sessions: number;
}

interface Summary {
  funnel: FunnelStep[];
  entryModes: Array<{ entry: string; sessions: number }>;
  checkout: Array<{ method: string; actions: number; sessions: number }>;
  customInquiries: { total: number; sessions: number };
  topProducts: Array<{ productId: string; sessions: number }>;
  kiSearch: {
    total: number;
    byOutcome: Array<{ outcome: string; count: number }>;
    recent: Array<{ query: string; outcome: string; resultCount: number; receivedAt: string }>;
  };
  totalEvents: number;
}

const ENDPOINT = "/.netlify/functions/catalog-analytics-dashboard";

const ENTRY_LABELS: Record<string, string> = {
  ki_search: "KI-Suche",
  browse: "Klassisches Durchsuchen",
  direct_link: "Direktlink / Reload",
};

const CHECKOUT_LABELS: Record<string, string> = {
  pdf_download: "PDF-Download",
  email_inquiry: "Rückfrage per E-Mail",
  calendly_booking: "Besprechung (Calendly)",
};

const OUTCOME_LABELS: Record<string, string> = {
  success: "Erfolgreich",
  error: "Fehler",
  rate_limited: "Rate-Limit",
  daily_limit: "Tageslimit erreicht",
};

function formatDateInput(date: Date): string {
  return date.toISOString().slice(0, 10);
}

function defaultFrom(): string {
  const d = new Date();
  d.setUTCDate(d.getUTCDate() - 30);
  return formatDateInput(d);
}

export default function CatalogAnalyticsDashboard() {
  const [password, setPassword] = useState("");
  const [authedPassword, setAuthedPassword] = useState<string | null>(null);
  const [from, setFrom] = useState(defaultFrom());
  const [to, setTo] = useState(formatDateInput(new Date()));
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadData = async (pw: string, fromValue: string, toValue: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: pw, from: fromValue, to: toValue }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error ?? "Unbekannter Fehler.");
        if (res.status === 401) setAuthedPassword(null);
        return;
      }
      setSummary(data.summary as Summary);
      setAuthedPassword(pw);
    } catch {
      setError("Verbindung fehlgeschlagen. Bitte erneut versuchen.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    void loadData(password, from, to);
  };

  const handleRefresh = () => {
    if (authedPassword) void loadData(authedPassword, from, to);
  };

  if (!authedPassword || !summary) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <form
          onSubmit={handleLogin}
          className="w-full max-w-sm space-y-4 rounded-2xl border border-border bg-light dark:bg-darkmode-light p-6"
        >
          <h1 className="text-lg font-semibold text-text dark:text-darkmode-text">
            Produktkatalog-Analytics
          </h1>
          <p className="text-sm text-text-light dark:text-darkmode-text-light">
            Internes Dashboard – bitte Passwort eingeben.
          </p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Passwort"
            autoFocus
            className="w-full rounded-md border border-border bg-body dark:bg-darkmode-body px-3 py-2 text-sm text-text dark:text-darkmode-text focus:outline-none focus:ring-2 focus:ring-green-600/40"
          />
          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading || !password}
            className="w-full rounded-md bg-green-600 text-white py-2 text-sm font-medium disabled:opacity-50"
          >
            {loading ? "Prüfe…" : "Anmelden"}
          </button>
        </form>
      </div>
    );
  }

  const maxFunnelSessions = Math.max(1, ...summary.funnel.map((s) => s.sessions));

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 text-text dark:text-darkmode-text">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold">Produktkatalog-Analytics</h1>
          <p className="text-sm text-text-light dark:text-darkmode-text-light">
            Anonyme, aggregierte Nutzungsdaten – keine Namen, IPs oder E-Mails.
          </p>
        </div>
        <div className="flex flex-wrap items-end gap-3">
          <label className="text-sm">
            Von
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="block rounded-md border border-border bg-light dark:bg-darkmode-light px-2 py-1 text-sm"
            />
          </label>
          <label className="text-sm">
            Bis
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="block rounded-md border border-border bg-light dark:bg-darkmode-light px-2 py-1 text-sm"
            />
          </label>
          <button
            onClick={handleRefresh}
            disabled={loading}
            className="rounded-md bg-green-600 text-white px-4 py-2 text-sm font-medium disabled:opacity-50"
          >
            {loading ? "Lädt…" : "Aktualisieren"}
          </button>
        </div>
      </div>

      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}

      {/* Funnel */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Funnel: KI-Suche bis Checkout</h2>
        <div className="rounded-xl border border-border bg-light dark:bg-darkmode-light p-5 space-y-3">
          {summary.funnel.map((step, idx) => {
            const previous = idx > 0 ? summary.funnel[idx - 1].sessions : null;
            const dropOffPct =
              previous && previous > 0 ? Math.round(((previous - step.sessions) / previous) * 100) : null;
            const widthPct = Math.round((step.sessions / maxFunnelSessions) * 100);
            return (
              <div key={step.step} className="space-y-1">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">{step.label}</span>
                  <span className="text-text-light dark:text-darkmode-text-light">
                    {step.sessions} Sitzungen
                    {dropOffPct !== null && dropOffPct > 0 && (
                      <span className="text-red-500 dark:text-red-400"> · −{dropOffPct}%</span>
                    )}
                  </span>
                </div>
                <div className="h-3 rounded-full bg-border/50 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-green-600"
                    style={{ width: `${Math.max(widthPct, step.sessions > 0 ? 2 : 0)}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Einstiegswege */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Einstieg in die Produktbeschreibung</h2>
          <div className="rounded-xl border border-border bg-light dark:bg-darkmode-light p-5 space-y-2">
            {summary.entryModes.length === 0 && (
              <p className="text-sm text-text-light dark:text-darkmode-text-light">Keine Daten im Zeitraum.</p>
            )}
            {summary.entryModes.map((entry) => (
              <div key={entry.entry} className="flex justify-between text-sm">
                <span>{ENTRY_LABELS[entry.entry] ?? entry.entry}</span>
                <span className="font-medium">{entry.sessions}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Checkout */}
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Checkout-Wahl</h2>
          <div className="rounded-xl border border-border bg-light dark:bg-darkmode-light p-5 space-y-2">
            {summary.checkout.length === 0 && (
              <p className="text-sm text-text-light dark:text-darkmode-text-light">Keine Daten im Zeitraum.</p>
            )}
            {summary.checkout.map((c) => (
              <div key={c.method} className="flex justify-between text-sm">
                <span>{CHECKOUT_LABELS[c.method] ?? c.method}</span>
                <span className="font-medium">
                  {c.actions} Aktionen · {c.sessions} Sitzungen
                </span>
              </div>
            ))}
            <div className="flex justify-between text-sm pt-2 border-t border-border/60">
              <span>Individuelle Anfrage (statt Standard-Flow)</span>
              <span className="font-medium">
                {summary.customInquiries.total} Anfragen · {summary.customInquiries.sessions} Sitzungen
              </span>
            </div>
          </div>
        </section>
      </div>

      {/* Top Produkte */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Meistgesehene Produkte</h2>
        <div className="rounded-xl border border-border bg-light dark:bg-darkmode-light p-5">
          {summary.topProducts.length === 0 ? (
            <p className="text-sm text-text-light dark:text-darkmode-text-light">Keine Daten im Zeitraum.</p>
          ) : (
            <ul className="divide-y divide-border">
              {summary.topProducts.map((p) => (
                <li key={p.productId} className="flex justify-between py-1.5 text-sm">
                  <span>{p.productId}</span>
                  <span className="font-medium">{p.sessions} Sitzungen</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      {/* KI-Suchanfragen */}
      <section className="space-y-3">
        <h2 className="text-lg font-semibold">
          KI-Suchanfragen ({summary.kiSearch.total} gesamt)
        </h2>
        <div className="rounded-xl border border-border bg-light dark:bg-darkmode-light p-5 space-y-4">
          <div className="flex flex-wrap gap-4 text-sm">
            {summary.kiSearch.byOutcome.map((o) => (
              <span key={o.outcome}>
                {OUTCOME_LABELS[o.outcome] ?? o.outcome}: <strong>{o.count}</strong>
              </span>
            ))}
          </div>
          <div className="max-h-96 overflow-y-auto">
            <table className="w-full text-sm">
              <thead className="text-left text-xs uppercase text-text-light dark:text-darkmode-text-light sticky top-0 bg-light dark:bg-darkmode-light">
                <tr>
                  <th className="py-1.5 pr-2">Suchanfrage</th>
                  <th className="py-1.5 px-2">Ergebnisse</th>
                  <th className="py-1.5 px-2">Status</th>
                  <th className="py-1.5 pl-2">Zeitpunkt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {summary.kiSearch.recent.length === 0 && (
                  <tr>
                    <td colSpan={4} className="py-3 text-text-light dark:text-darkmode-text-light">
                      Keine Suchanfragen im Zeitraum.
                    </td>
                  </tr>
                )}
                {summary.kiSearch.recent.map((q, idx) => (
                  <tr key={idx}>
                    <td className="py-1.5 pr-2 max-w-xs truncate" title={q.query}>
                      {q.query}
                    </td>
                    <td className="py-1.5 px-2">{q.resultCount}</td>
                    <td className="py-1.5 px-2">{OUTCOME_LABELS[q.outcome] ?? q.outcome}</td>
                    <td className="py-1.5 pl-2 whitespace-nowrap text-text-light dark:text-darkmode-text-light">
                      {new Date(q.receivedAt).toLocaleString("de-DE")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <p className="text-xs text-text-light dark:text-darkmode-text-light">
        Insgesamt {summary.totalEvents} Events im gewählten Zeitraum.
      </p>
    </div>
  );
}
