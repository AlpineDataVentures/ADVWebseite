# Grundlagen: Styleguide & SEO/GEO/SEA-Kompendium
*Projekt Blog-Content-Erstellung · Zielgruppe Leitung Controlling / Kaufmännische Leitung · Stand: 22.10.2026*

Dieses Dokument ist die Arbeitsgrundlage für den Redaktionsplan und für jede automatisierte Artikelerstellung (Mo + Do, PR ins Repo `ADVWebseite`, Freigabe durch Kollegen).

---

## Teil 1 – Analyse der bestehenden Blogartikel (`src/content/blog/`)

### 1.1 Was den ADV-Ton ausmacht (beibehalten)
- **Szenischer Einstieg statt Definition.** Fast jeder Artikel startet mit einer Alltagsszene: "Montagmorgen, 9:15 Uhr, Vertriebsmeeting bei der Thalberg Getränke GmbH" – drei Leute, drei Umsatzzahlen, 180.000 € Differenz.
- **Selbstironischer, trockener Humor mit Bodenhaftung.** Running Gags (der Praktikant, der die Excel "aufräumt"; Karl das Lama; der rote Kopf des Vertriebsleiters), Popkultur-Anspielungen (Rosins Restaurants, das Sams, Hunger Games), Alltagsvergleiche ("wie den Schimmel im Bad mit Alpina zu überstreichen").
- **Leichter süddeutscher Einschlag** ("Spezl", "Schmarrn", "Weißwurstäquator") – sympathisch, regional verortbar.
- **Klare Haltung, keine Buzzwords.** "Iteration schlägt Masterplan", "Technologie ersetzt keine Klarheit", "Umsatz ohne Marge ist eine Lüge, die gut aussieht." Tools werden bewusst relativiert: erst Mensch und Prozess, dann Tool.
- **Pragmatische Struktur:** Problem → Ursachen (nummerierte Liste mit fett gesetztem Kern) → Lösung/Prinzipien → "Was bedeutet das für …" → Fazit mit Rückbezug auf die Eingangsszene.
- **Serienlogik** (Thalberg-Serie, Teil 1–11) mit Querverlinkung ("Teil 2 lesen") – stark für Bindung und interne Verlinkung.
- **Fiktives Fallbeispiel transparent gekennzeichnet** ("komplett erfunden … wer bei Google verzweifelt, sei beruhigt").

### 1.2 Technisches Format (Frontmatter, Astro Content Collection)
```yaml
title: "…"            # Leser-Headline, darf verspielt sein
meta_title: "…"       # SEO-Title, keyword-first
description: "…"      # Meta Description
date: 2026-05-27T08:30:00Z
image: "/images/blog/<slug>.png"
categories: ["Business Intelligence"]
author: "Benjamin Diez"   # Autoren: Benjamin Diez, Julian Koller, Carsten Hof, Andreas Klostermann
tags: ["…"]
draft: false
summary: "…"
```
Dateien als `.md` oder `.mdx`; Tabellen, Blockquotes, `mailto:`-CTAs, interne Links im Format `/blog/<slug>/`.

### 1.3 Optimierungspotenziale (für die neue Strecke umsetzen)
| Befund | Empfehlung |
|---|---|
| Überschriften starten bei H3/H4, kein H2 | Saubere Hierarchie: H1 = title (Template), Abschnitte H2, Unterpunkte H3 |
| Ansprache wechselt: "Sie" (2024), "du" (BI in 45 Min.), "ihr/euch" (2026) | Eine Ansprache für control.alpinedata.de festlegen (→ offene Frage) |
| `meta_title` oft identisch mit `title` | Immer getrennt: title = Neugier, meta_title = Suchintention + Keyword vorne, max. ~60 Zeichen |
| Keine Zielgruppen-Zuordnung im Frontmatter | Entschieden (23.10.2026): Zuordnung über `categories: ["Controlling"]`, keine zusätzlichen Felder |
| Kein `lastmod`/Aktualisierungsdatum | Entschieden (23.10.2026): kein eigenes Feld; Aktualität bei Überarbeitungen im Text kenntlich machen |
| Kaum belegte Zahlen/externe Quellen; Kernaussagen nicht "zitierfähig" | Pro Artikel 2–4 belegte Zahlen mit Quelle, 1 Definitionssatz, 1 "Kurz gesagt"-Box am Anfang |
| Keine FAQ, kein TL;DR | Kurzantwort (40–60 Wörter) direkt unter dem Einstieg + 3–5 echte FAQ am Ende |
| Autor nur als Name, keine Autorenseite/Expertise | Autorenboxen mit Rolle, Erfahrung, LinkedIn (E-E-A-T) |
| CTAs als `mailto:` an Einzelpersonen | Einheitliche CTA-Komponente auf Landingpage control.alpinedata.de (messbar, SEA-tauglich) |
| Tippfehler ("Qauasi", "letzen", "Jede Entscheidung zieht kommt mit …") | Lektorats-Check als festen Schritt im PR-Workflow |
| Gedankenstriche/Halbgeviertstriche gemischt, sehr lange Absätze in älteren Posts | Kurze Absätze (max. 3–4 Sätze), scanbar für Mobile und für KI-Extraktion |

### 1.4 Ton-Leitplanken für die Controlling-Zielgruppe
- Humor bleibt, aber **eine Spur nüchterner und zahlenaffiner**: Controller lieben Präzision; Pointen dürfen über Prozesse, Excel-Monster und Monatsabschluss-Nächte gehen, nie über Fachlichkeit.
- Fachbegriffe korrekt verwenden (Deckungsbeitrag, Forecast-Genauigkeit, Rolling Forecast, Abweichungsanalyse, Konsolidierung, Liquiditätsplanung, HGB/IFRS-Kontext).
- Jeder Artikel beantwortet die CFO-Frage: **Was kostet es, was spart/bringt es, wie schnell?**
- Ein wiederkehrendes fiktives Unternehmen kann gut funktionieren (z. B. Thalberg weiterführen – deren Controlling-Leitung als neue Hauptfigur).

---

## Teil 2 – Recherche SEO, GEO, SEA (Stand Oktober 2026)

### 2.1 SEO – was Google 2026 belohnt
- **Core Update März 2026** (Rollout bis Mitte April): Gewichtung verschoben zu *Information Gain* (Inhalte, die es woanders nicht gibt: eigene Daten, Praxisfälle, Tests), **benannten Autoren mit nachweisbarer Expertise** und **thematischer Kohärenz der Domain**. KI-gestützte Inhalte werden nicht pauschal abgewertet, wenn ein Experte substanziell redigiert und eigene Perspektive ergänzt. [Evertune]
- **Konsequenz:** Weniger, dafür substanzielle Artikel; Themencluster (Pillar-Page + verlinkte Unterartikel) statt Einzelposts; Case Studies (Typ 3) sind unser stärkster Ranking-Hebel.
- **Strukturierte Daten** (Stand 2026): Organization (sitewide), BreadcrumbList, Article mit verschachteltem Person-Autor und `datePublished`/`dateModified`. FAQ-Rich-Results gibt es seit 08/2023 nur noch für Behörden-/Gesundheitsseiten, HowTo-Rich-Results sind eingestellt – FAQ-Blöcke lohnen sich trotzdem für Leser und KI-Extraktion, nur nicht wegen eines SERP-Features. Markup muss sichtbarem Inhalt entsprechen. [SEOJuice]

### 2.2 GEO – Sichtbarkeit in KI-Antworten (Google AI Overviews/AI Mode, ChatGPT, Perplexity, Copilot, Gemini, Claude)
**Offizielle Google-Position:** Für AI Overviews/AI Mode gibt es *keine* zusätzlichen Anforderungen, kein spezielles Markup, keine "AI-Textdateien". Voraussetzung: indexiert und snippet-fähig. Empfohlen: Crawling erlauben, interne Verlinkung, gute Page Experience, Inhalte als Text. AI-Traffic erscheint in der Search Console unter "Web". Google sagt, Klicks aus AI Overviews seien qualitativ hochwertiger (längere Verweildauer). [Google Search Central]

**Warum GEO wichtig ist – Klickverluste:**
- Seer Interactive (06/2024–09/2025, 3.119 Queries): organische CTR bei Suchen mit AI Overview −61 % (1,76 % → 0,61 %), bezahlte CTR −68 %. **Aber:** In der AI Overview zitierte Marken erhalten 35 % mehr organische und 91 % mehr bezahlte Klicks als nicht zitierte.
- Ahrefs (12/2025, 300.000 Keywords): CTR Position 1 −58 %. Pew (03/2025): 8 % Klicks auf klassische Ergebnisse mit KI-Zusammenfassung vs. 15 % ohne. [Ideava-Übersicht]
- → Ziel ist nicht mehr nur "Platz 1", sondern **"Quelle in der KI-Antwort"**.

**Taktiken mit Evidenz:**
- **Statistiken, Quellenangaben, Expertenzitate** erhöhen die Sichtbarkeit in generativen Antworten (Princeton-GEO-Studie, KDD 2024: bis zu +40 %; Quellenangaben besonders wirksam für schwächer rankende Seiten). Keyword-Stuffing wirkt null bis negativ. [LLM Pulse, Studienbezug]
- **Vergleichsinhalte** ("X vs. Y", "beste Tools für …", "Alternativen zu …") gehören zu den meistzitierten Formaten → unser Typ 2 (Tool-Vergleiche) ist GEO-Gold. Bing-Daten bestätigen: Der meistzitierte Copilot-Inhalt einer Analyse war ein detaillierter Tool-Vergleich mit Preisen und Features; vage Übersichten wurden nicht zitiert. [Search Influence]
- **Aktualität:** KI-Suchen zitieren tendenziell frischere Quellen → Top-Artikel quartalsweise aktualisieren.
- **Query Fan-out:** AI Mode zerlegt Fragen in Teilfragen; viele zitierte Seiten stehen außerhalb der organischen Top 10 → Artikel sollten Teilfragen explizit mit eigenen H2/H3 beantworten.
- **Antwortarchitektur:** Kurze Direktantwort am Anfang, Definitionssätze, Tabellen, nummerierte Schritte, klare Zahlen mit Einheit und Quelle.
- **Fremdquellen/Erwähnungen:** KI-Systeme stützen sich stark auf Drittquellen (Wikipedia, Reddit, YouTube, Bewertungsportale). Für uns relevant: LinkedIn-Posts der Autoren, Gastbeiträge (z. B. Fachportale für Controller), Konferenzpräsenz, Partner-Listings (Microsoft-Partnerverzeichnis o. ä.).
- **Crawler zulassen** (robots.txt / CDN prüfen): Googlebot, Bingbot, OAI-SearchBot (ChatGPT-Suche), PerplexityBot, Claude-SearchBot/Claude-User. Trainings-Crawler (GPTBot, ClaudeBot, Google-Extended) sind eine separate Entscheidung.
- **llms.txt:** optional/experimentell, kein bestätigter Effekt – niedrige Priorität.

**Messung:** Search Console (Web-Bericht), **Bing Webmaster Tools "AI Performance"** (seit 02/2026 Public Preview: Copilot-Zitationen pro Seite und auslösende Grounding-Queries – sehr wertvoll für Themenlücken), plus ein fester Satz von 20–30 Prompts aus Controller-Sicht, monatlich in ChatGPT/Perplexity/Gemini/AI Mode prüfen (Erwähnungsrate, zitierte URLs). In GA4 Referral-Traffic von chatgpt.com, perplexity.ai, copilot etc. als eigenen Kanal gruppieren.

### 2.3 SEA – bezahlte Reichweite
**Google Ads (B2B, 2026):**
- **Datenbasis zuerst:** Enhanced Conversions for Leads + Offline-Conversion-Import aus HubSpot (MQL → SQL → Angebot → Auftrag mit Werten). Smart Bidding ist nur so gut wie diese Daten.
- **AI Max / Broad Match erst aktivieren, wenn Conversion-Werte sauber fließen**; per Experiment testen, Asset-Optimierung für präzise B2B-Botschaften ggf. deaktivieren.
- **Kampagnen nach Intention trennen:** Recherche-Keywords → How-To/Vergleichsartikel; kommerzielle Keywords ("Controlling Beratung", "Power BI Controlling Einführung") → Landingpage mit Angebot/Erstgespräch. Keine High-Intent-Klicks auf die Startseite.
- **Negative Keywords** von Anfang an: Jobs, Gehalt, Ausbildung, Weiterbildung, Studium, kostenlos, Vorlage/PDF (prüfen – Vorlagen können Lead-Magnet sein), Stellenangebote.
- Budgets/Ziele wöchentlich, nicht täglich anpassen; 30–100 Conversions pro Testarm einplanen. [Directive]
- **Realismus:** Suchvolumen in der Nische "Controlling + Tool/Beratung" im DACH-Raum ist begrenzt; Google Ads eignet sich vor allem für High-Intent-Begriffe und Retargeting der Blog-Leser.

**LinkedIn Ads (präzises Targeting auf Funktion "Finanzen" + Seniorität Leitung/Director/C-Level):**
- Benchmarks (überwiegend US-SaaS, als Orientierung): CPC typ. 5,50–10 $, CPL Financial Services ca. 90–115 $; Senior-/C-Level-Targeting 2–3× teurer; Funktion+Seniorität statt Jobtitel spart 20–30 % CPC. [TripleDart]
- Formate: **Thought Leader Ads** (Autoren-Posts der vier Gründer bewerben – passt perfekt zur Blogstrecke), **Document Ads** (z. B. Checkliste/Template aus dem How-To als Lead-Magnet), Lead-Gen-Forms (10–13 % Conversion, Qualität prüfen).
- Testbudget: ca. 50–100 $/Tag für mind. 7 Tage; typischer B2B-Monat 1.000–5.000 $.

### 2.4 Architektur www.alpinedata.de ↔ control.alpinedata.de (wichtig!)
- Google rät seit 05/2023 bei **domainübergreifender Duplizierung von `rel=canonical` ab** und empfiehlt für Zweitkopien `noindex`; Canonical ist nur ein Hinweis, kein Befehl. [SEJ]
- **Zielkonflikt:** Wenn der volle Artikel auf www liegt und auf control nur gespiegelt wird (mit canonical/noindex), wandert die gesamte Autorität zu **www** – control.alpinedata.de gewinnt dadurch kaum eigene Relevanz. Subdomains werden von Google oft wie eigenständige Websites bewertet.
- **Optionen für die IT:**
  - **A (empfohlen, wenn control eigenständig ranken soll):** Controlling-Artikel liegen kanonisch auf control.alpinedata.de; www zeigt nur Teaser + Link. Schemadaten/Autor bleiben gleich.
  - **B:** Artikel kanonisch auf www, control.alpinedata.de zeigt Teaser-Kacheln (Titel, Summary, Link) und eigene, einzigartige Landing-/Pillar-Seiten zu Controlling-Themen. control lebt dann von Pillar-Pages + SEA-Landingpages.
  - **C:** Statt Subdomain ein Verzeichnis www.alpinedata.de/controlling/ – bündelt Autorität, control.alpinedata.de leitet per 301 dorthin. SEO-technisch am stärksten, verliert aber die "eigene Marke".
- In jedem Fall: **niemals zwei indexierbare Volltext-Kopien** ohne Steuerung.

---

## Quellen
- Google Search Central – AI features and your website: https://developers.google.com/search/docs/appearance/ai-features
- Evertune – March 2026 Core Update: https://www.evertune.ai/resources/insights-on-ai/googles-march-2026-core-update-a-content-best-practices-guide-for-seo-and-ai-search
- LLM Pulse – GEO Guide 2026: https://llmpulse.ai/blog/geo-guide/
- Ideava – AI Overviews CTR, Übersicht 12 Studien: https://ideava.com/insights/ai-overviews-ctr-decline/
- Search Influence – Bing AI Performance Report: https://www.searchinfluence.com/blog/bing-ai-performance-report-copilot-citations/
- SEOJuice – Schema.org 2026: https://seojuice.com/blog/schema-org-2026-what-google-reads/
- Search Engine Journal – Canonicalization: https://www.searchenginejournal.com/ranking-factors/canonicalization/
- Directive – B2B Google Ads 2026: https://directiveconsulting.com/blog/the-b2b-marketers-guide-to-google-ads-best-practices-2026/
- TripleDart – LinkedIn Advertising Cost: https://www.tripledart.com/blog/linkedin-advertising-cost
- BARC Planning Survey 26 (Themenimpulse Zielgruppe): https://barc.com/de/news/barc-planning-survey-26-ki-in-planning/
- Horváth CFO-Studie 2026 (Themenimpulse Zielgruppe): https://www.horvath-partners.com/en/media-center/studies/cfo-study-2026-control-meets-complexity

*Hinweis: Mehrere GEO-/SEA-Quellen sind Anbieter-Publikationen; Zahlen als Orientierung, nicht als Garantie nutzen.*

### Anhang: Themenimpulse aus Zielgruppen-Studien (für den Redaktionsplan)
- BARC Planning Survey 26 (06/2026, n=804): KI-Nutzung für Predictive Planning/Forecasting von 11 % auf 27 % in 12 Monaten; 66 % wollen KI in die Planung integrieren; erwarteter Nutzen: Entlastung von manueller Planung (75 %), Plausibilisierung (52 %), höhere Forecast-Genauigkeit (51 %).
- Horváth CFO-Studie 2026 (>240 Finanzvorstände): wirksamste Maßnahmen laut CFOs: Digitalisierung (63 %), Prozessautomatisierung (63 %), Szenarioanalysen (60 %); Risikomanagement zentral auf der CFO-Agenda; Bremsen: Silodenken, fehlendes Change Management, Fachkräftemangel.
