---
title: "Bevor der KI-Agent ins Controlling darf: Das Fundament"
meta_title: "KI im Controlling: Voraussetzungen für KI-Agents"
description: "KI im Controlling braucht Governance, Datenqualität, Zugriff und stabile Wartung. Prüftabelle und Checkliste für den Mittelstand vor dem ersten KI-Agenten."
date: 2026-11-09T07:00:00Z
image: "/images/blog/ki-assistenten-controlling-vergleich.png"
categories: ["Controlling"]
author: "Carsten Hof"
tags: ["Controlling", "KI", "Data Governance", "Datenqualität", "Excel"]
draft: false
summary: "Dieselbe Frage, drei KI-Assistenten, drei Zahlen. Das Tool war nicht schuld. Das Controlling braucht erst ein Fundament: Governance, Datenqualität, Zugriff und stabile Wartung."
---

Dienstag, 16:40 Uhr bei der Thalberg Getränke GmbH, einem fiktiven Mittelständler aus unserer [Thalberg-Serie](/blog/kick-off/). Die Controlling-Leitung soll bis morgen sagen, wie hoch der Rabattanteil im Großhandel zuletzt war. Aus Neugier stellt sie dieselbe Frage samt Excel-Export drei KI-Assistenten. Die Antworten: 4,2, 4,8 und 3,9 Prozent vom Umsatz. Alle drei klingen überzeugend.

Welcher Assistent der beste ist, war hier nicht die Frage. Die Zahlen unterschieden sich, weil der Export Gutschriften, Boni und Skonti in einer Spalte mischte und jedes Modell „Rabatt“ anders las. Dieser Artikel beantwortet deshalb die Frage davor: Was braucht das Controlling, damit **KI im Controlling** überhaupt verlässlich arbeitet?

## Das Wichtigste in Kürze

- **Ein KI-Agent** ist ein Sprachmodell, das mehrstufig arbeitet, auf Daten und Werkzeuge zugreift und Aufgaben selbstständig ausführt. Je mehr Freiheit er hat, desto mehr Fundament braucht er.
- Vier Voraussetzungen entscheiden: Governance (wer darf was), Datenqualität (eine Definition je Kennzahl), Zugänglichkeit (Daten maschinenlesbar, nicht im Dateiordner) und Stabilität in der Wartung (Änderungen ohne Kopfmonopol).
- Die Tool-Wahl kommt danach. Mit einem sauberen Fundament funktionieren Copilot, ChatGPT, Claude und andere ähnlich gut, ohne Fundament keiner.

## Welches Fundament braucht KI im Controlling?

Die Erwartung ist größer als die Praxis. Laut BARC Planning Survey 26 nutzen erst 27 Prozent der Unternehmen KI für Predictive Planning, 75 Prozent erhoffen sich davon Entlastung von manueller Planungsarbeit ([BARC, 2026](https://barc.com/de/news/barc-planning-survey-26-ki-in-planning/)). Laut Horváth CFO-Studie 2026 halten 63 Prozent der CFOs Digitalisierung und Prozessautomatisierung für hoch wirksam ([Horváth, 2026](https://www.horvath-partners.com/en/media-center/studies/cfo-study-2026-control-meets-complexity)).

Dazwischen liegt das Fundament. Die folgende Tabelle fasst die vier Voraussetzungen mit Prüffrage und Mindeststandard zusammen. Die Mindeststandards sind ADV-Erfahrungswerte aus Projekten, keine Normen.

| Voraussetzung | Prüffrage | Mindeststandard vor dem ersten Agenten | Typischer Aufwand |
|---|---|---|---|
| Governance | Wer darf welche Daten in welches Tool geben? | Datenklassen, Rollen, freigegebene Tools, Vertragsprüfung | 2–3 Tage |
| Datenqualität | Hat jede Kennzahl genau eine Definition? | Kennzahlenkatalog mit Formel, Quelle, Verantwortlichem | 3–5 Tage für 10–15 Kennzahlen |
| Zugänglichkeit | Kommt ein Agent an die Zahlen, ohne dass jemand exportiert? | Zentrales Datenmodell mit Lesezugriff statt Dateiablage | 1–2 Wochen je Quelle |
| Stabilität in der Wartung | Was passiert, wenn sich ein Konto, ein Export oder eine Formel ändert? | Versionierung, Änderungsprozess, feste Testfragen | 2–3 Tage, danach laufend |

*Tabelle 1: Die vier Voraussetzungen für KI-Agents im Controlling (Aufwände sind ADV-Schätzungen für ein Controlling mit 3–6 Personen).*

![Vier Säulen Governance, Datenqualität, Zugänglichkeit und Wartungsstabilität tragen die Ebene KI-Agent, darunter liegen die Quellsysteme ERP, DATEV und Excel](/images/blog/ki-assistenten-controlling-vergleich/01-fundament-ki-agent.svg)

*Abbildung 1: Das Fundament für KI-Agents im Controlling. Der Agent steht oben, getragen von vier Säulen über den Quellsystemen.*

Die Aussage der Grafik in einem Satz: Der Agent ist die oberste Ebene, nicht die erste. Wer oben anfängt, baut auf Sand.

## Governance: Wer darf was in welches Tool geben?

Governance klingt nach Konzern, ist im Mittelstand aber eine halbe Seite Papier. Ohne sie landen Kostenstellenauswertungen und Kundenlisten in privaten Accounts, weil niemand gesagt hat, dass es ein Problem ist.

Drei Dinge regeln Sie vorab:

1. **Datenklassen:** Was ist öffentlich, intern, vertraulich (Personal, Kundenpreise, Konditionen)? Vertrauliche Daten bleiben draußen, bis Vertrag und Schutzmaßnahmen geklärt sind.
2. **Freigegebene Tools und Konten:** Firmenkonten mit Vertrag statt privater Tarife. Prüfen Sie, ob Eingaben für Modelltraining genutzt werden.
3. **Verantwortung:** Wer gibt Berichte frei, die mit KI-Unterstützung entstanden sind? Der Controller bleibt verantwortlich, nicht der Agent.

Beziehen Sie Datenschutz früh ein, wie in unserem Beitrag zum [Datenschutzbeauftragten](/blog/datenschutzbeauftragter/) beschrieben. Rechtliche Details klären Sie mit Fachberatung, das ersetzt dieser Artikel nicht. Zur Datenklassifizierung im größeren Rahmen passt unser Beitrag zu [Data Governance](/blog/data-governance/).

## Datenqualität: Warum liefern drei Assistenten drei Zahlen?

Weil die Daten es erlauben. Ein Agent liest, was er bekommt, und füllt Lücken mit plausiblen Annahmen. Liegen Rabatte, Boni und Skonti in einer Spalte, liefert jedes Modell eine stimmige, aber andere Antwort.

Ein **Kennzahlenkatalog** ist der günstigste Hebel. Er enthält je Kennzahl Name, Formel, Quelle, Zeitbezug und Verantwortlichen. Für „Rabattanteil“ steht dort zum Beispiel: Summe aus Gutschriften und Rabatten laut Konto X, geteilt durch Nettoumsatz, ohne Skonti. Das dauert für 10 bis 15 Kennzahlen drei bis fünf Tage und beendet nebenbei so manches Meeting über Zahlenabgleich.

Ergänzen Sie fünf **Kontrollwerte**, die jeder kennt und die der Agent reproduzieren muss, etwa Umsatz Vormonat oder Deckungsbeitrag eines Produkts. Stimmt ein Kontrollwert nicht, braucht niemand die Antwort auf die eigentliche Frage zu lesen.

### Wie sieht ein Test mit Kontrollwerten aus?

Stellen Sie dem Agenten die Kontrollfrage zuerst. „Wie hoch war der Nettoumsatz im Oktober im Segment Großhandel?“ Weicht die Antwort vom Bericht ab, liegt es an Definition oder Daten, nicht am Modell. Erst wenn alle fünf Kontrollwerte passen, lohnt sich die offene Analyse.

## Zugänglichkeit: Kommt der Agent überhaupt an die Daten?

Die meisten Controlling-Daten liegen verteilt: ERP, DATEV, Excel auf einem Laufwerk, dazu Exporte per Mail. Ein Agent kann nur lesen, was erreichbar und eindeutig beschrieben ist. Wenn jemand vor jeder Frage manuell exportieren muss, ist das keine Automatisierung, sondern ein Zusatzjob.

Das Ziel ist ein zentrales Datenmodell mit Lesezugriff: Quellen laufen automatisch zusammen, Definitionen aus dem Kennzahlenkatalog sind dort hinterlegt, und Rechte regeln, wer was sieht. Der Agent greift dann auf das Modell zu und nicht auf Dateien. Wie dieser Weg aus Excel heraus Stufe für Stufe aussieht, beschreibt unser Fahrplan zum [Excel-Reporting in fünf Stufen](/blog/excel-reporting-controlling-automatisieren/).

Genau hier stoßen Teams allein oft an Grenzen: mehrere Quellsysteme, Berechtigungen, tägliche Aktualisierung. Eine [Bestandsaufnahme Ihrer Berichte und Quellen mit priorisiertem Fahrplan](/controlling/) zeigt, welche Daten zuerst ins Modell gehören.

![Datenfluss: Quellen ERP, DATEV und Excel laufen in ein zentrales Datenmodell mit Kennzahlenkatalog, darauf greift der KI-Agent lesend zu, Ergebnisse gehen durch eine Prüfung mit Kontrollwerten](/images/blog/ki-assistenten-controlling-vergleich/02-datenfluss-agent.svg)

*Abbildung 2: Datenfluss für KI-Agents. Der Agent liest aus dem Datenmodell, nicht aus Dateien, und seine Ergebnisse laufen durch eine Prüfung.*

## Stabilität in der Wartung: Was passiert beim nächsten Kontenrahmen-Update?

Ein Agent, der im Oktober funktioniert, kann im Januar falsche Zahlen liefern. Ein Konto wird umgezogen, ein Export bekommt eine neue Spalte, jemand baut die Formel um. Ohne Wartungsprozess merken Sie es erst, wenn die Geschäftsführung nachfragt.

Fünf Regeln halten das stabil:

1. **Versionierung:** Datenmodell, Kennzahlenkatalog und Anweisungen an den Agenten liegen versioniert und nachvollziehbar vor.
2. **Änderungsprozess:** Jede Änderung an Definitionen hat einen Verantwortlichen und ein Datum.
3. **Feste Testfragen:** 5 bis 10 Fragen mit bekannter Antwort laufen nach jeder Änderung und monatlich.
4. **Zwei Personen:** Mindestens zwei Personen verstehen das Setup. Das Kopfmonopol gilt auch für KI-Konfigurationen.
5. **Monitoring:** Fehlgeschlagene Datenaktualisierungen werden gemeldet, nicht erst bemerkt.

Der Aufwand liegt nach der Einrichtung bei etwa einem halben Tag im Monat (ADV-Schätzung). Das ist weniger als eine einzige Nachtschicht vor dem Beiratstermin.

## Wie prüfen Sie Ihr Controlling auf Agent-Reife?

Beantworten Sie diese acht Fragen mit Ja oder Nein. Jedes Nein ist eine Aufgabe vor dem Agenten.

1. Gibt es eine schriftliche Regel, welche Daten in KI-Tools dürfen?
2. Nutzt das Team nur freigegebene Firmenkonten?
3. Hat jede Kernkennzahl genau eine dokumentierte Definition?
4. Gibt es fünf Kontrollwerte, die jeder kennt?
5. Laufen die Quellen automatisch in ein gemeinsames Datenmodell?
6. Hat der Agent Lesezugriff auf das Modell statt auf Dateien?
7. Gibt es feste Testfragen nach jeder Änderung?
8. Verstehen mindestens zwei Personen das Setup?

Bei null bis drei Ja gehört das Fundament zuerst. Bei vier bis sechs lohnt ein Pilot mit einem klar begrenzten Bericht. Bei sieben bis acht können Sie Agenten gezielt einsetzen und dabei die Tool-Wahl mit zwei Kandidaten und denselben Testaufgaben entscheiden.

## Fazit: Erst das Fundament, dann der Agent

Zurück zu Thalberg: Die Controllerin hat keinen Gewinner gekürt. Sie hat „Rabatt“ definiert, die Spalten getrennt und dieselbe Frage erneut gestellt. Diesmal kamen drei gleiche Zahlen.

Das Muster ist übertragbar. Ein Agent verstärkt, was da ist: saubere Definitionen genauso wie Unschärfen. Wer zuerst Governance, Datenqualität, Zugriff und Wartung klärt, kann danach jedes Tool nutzen und wechseln, ohne die Grundlagen neu zu bauen.

## Wie bekommt Ihr Controlling die Datenbasis für KI-Agents?

Drei Zahlen auf dieselbe Frage sind ein Hinweis auf fehlende Definitionen, nicht auf das falsche Tool. Den Kennzahlenkatalog und die Kontrollwerte schaffen Sie selbst. Schwieriger wird es, wenn mehrere Quellsysteme, Rechte und die tägliche Aktualisierung dazukommen. Auf unserer Controlling-Seite steht, [wie Mittelständler ihr Reporting auf eine gemeinsame Datenbasis stellen](/controlling/), mit festen Stufen und Fixpreisen.

## Häufige Fragen

**Was braucht ein KI-Agent im Controlling mindestens?**
Klare Regeln, welche Daten er nutzen darf, eine eindeutige Definition je Kennzahl, Lesezugriff auf ein zentrales Datenmodell und einen Wartungsprozess mit festen Testfragen. Ohne diese vier Punkte sind seine Antworten nicht reproduzierbar.

**Kann ich einen KI-Agenten direkt auf meine Excel-Dateien loslassen?**
Für Experimente mit bereinigten Beispieldaten ja. Für Berichte, auf die sich die Geschäftsführung verlässt, nicht, denn Dateien haben keine einheitlichen Definitionen, Rechte und Versionen. Dafür ist ein zentrales Datenmodell nötig.

**Welches KI-Tool sollen wir im Controlling nehmen?**
Das entscheiden Sie am besten nach dem Fundament, mit zwei Kandidaten, denselben Testaufgaben und bereinigten Daten. Passt der Agent in Ihre Arbeitsumgebung, etwa Microsoft 365, spricht das für den entsprechenden Anbieter. Preise und Funktionen ändern sich häufig, prüfen Sie sie beim Anbieter.

**Wie lange dauert es, bis das Fundament steht?**
Governance-Regeln und Kennzahlenkatalog schaffen Teams mit 3 bis 6 Personen in etwa zwei Wochen nebenher. Das zentrale Datenmodell dauert je nach Quellen 6 bis 10 Wochen (ADV-Erfahrungswert).

---

Sie wollen wissen, ob Ihr Controlling bereit für KI-Agents ist und welche Voraussetzung zuerst fehlt? In einem Erstgespräch gehen wir die acht Fragen gemeinsam durch und priorisieren die nächsten Schritte.

<div class="col-12 flex justify-center">
  <a class="btn btn-adv" href="mailto:info@alpinedata.de?subject=Erstgespr%C3%A4ch%20KI-Fundament%20Controlling">Erstgespräch vereinbaren →</a>
</div>
