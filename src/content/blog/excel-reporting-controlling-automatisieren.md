---
title: "Schluss mit Copy & Paste: Excel-Reporting in 5 Stufen automatisieren"
meta_title: "Reporting automatisieren im Controlling: 5 Stufen"
description: "Reporting automatisieren im Controlling ohne Großprojekt: fünf Stufen von der Inventur zum Bericht, der sich selbst aktualisiert. Mit Rechenbeispiel."
date: 2026-10-23T06:00:00Z
image: "/images/blog/excel-reporting-controlling-automatisieren.png"
categories: ["Controlling"]
author: "Julian Koller"
tags: ["Controlling", "Reporting", "Excel", "Power BI", "Automatisierung", "How To"]
draft: false
summary: "Viele Controlling-Teams im Mittelstand verbringen den Monatsanfang mit Kopieren statt mit Analysieren. Der Fahrplan zeigt in fünf Stufen, wie Sie Ihr Excel-Reporting automatisieren."
---

Arbeitstag drei nach Monatsende, 21:40 Uhr. Die Leiterin Controlling der Thalberg Getränke GmbH hat sieben Exporte aus dem ERP offen, dazu die Umsatzliste aus dem Vertrieb und eine Datei namens „GuV_Monat_v4_FINAL_korr.xlsx“. Morgen um neun will die Geschäftsführung die Zahlen sehen. Analysiert hat sie bisher nichts, sie hat kopiert, verglichen und SVERWEISe repariert. Thalberg ist ein fiktives Unternehmen aus unserer [Serie über den Aufbau eines datengetriebenen Mittelständlers](/blog/kick-off/). Den Abend kennen trotzdem viele Controller aus eigener Erfahrung.

## Das Wichtigste in Kürze

- **Reporting automatisieren im Controlling** heißt: Die Daten kommen per Abfrage statt per Copy & Paste in den Bericht, und der Bericht aktualisiert sich selbst.
- Die meiste Zeit geht nicht in der Analyse verloren, sondern beim Sammeln und Abgleichen. Genau dort setzt die Automatisierung an.
- Sie brauchen kein Großprojekt. Fünf Stufen, die jeweils für sich Nutzen bringen, führen vom Excel-Monster zum automatisierten Monatsbericht.
- Stufe 1 und 2 schaffen Sie ohne neue Software, oft in zwei bis drei Wochen.

## Warum Reporting automatisieren im Controlling vor allem Zeit für Analyse freilegt

Excel ist nicht das Problem. Es ist ein hervorragendes Werkzeug für Analysen, Szenarien und schnelle Rechnungen. Problematisch wird es, wenn Excel zur Datenbank, zur Schnittstelle und zum Berichtssystem gleichzeitig wird.

Wie groß der Anteil ist, zeigt ein Praxisbeispiel von PwC in der Haufe Controllerpraxis: In einem Handelsunternehmen protokollierte jedes Teammitglied zwei Wochen lang, welche Excel-Dateien es öffnet und was es von Hand rechnet. Ergebnis: **Mehr als 65 Prozent der operativen Controlling-Arbeit fanden außerhalb der offiziellen Systeme statt** ([Haufe, 04/2026](https://www.haufe.de/controlling/rechnungslegung/reporting-optimieren-so-gelingt-es-controllern_110_682524.html)). Das ist ein einzelnes Team und keine repräsentative Studie, aber die Größenordnung deckt sich mit dem, was wir in Gesprächen mit Controlling-Leitungen hören.

Eine Begriffsklärung vorab: **Automatisiertes Reporting** bedeutet, dass ein Bericht seine Daten über feste, dokumentierte Abfragen direkt aus den Quellsystemen bezieht und sich ohne manuelle Zwischenschritte aktualisiert. Ein schön formatiertes Excel mit Makro, das jemand jeden Monat von Hand anstößt, zählt nicht dazu.

## Der Fahrplan: in fünf Stufen vom Excel-Reporting zum automatisierten Bericht

Die Reihenfolge ist der eigentliche Trick. Wer bei Stufe 4 anfängt und sofort ein Data Warehouse baut, automatisiert im Zweifel Berichte, die niemand braucht, mit Kennzahlen, die jede Abteilung anders rechnet.

![Treppe mit fünf Stufen: Inventur, Definitionen, Datenzugriff, Datenmodell und automatisierter Bericht, mit typischem Zeitbedarf von einer Woche bis acht Wochen je Stufe](/images/blog/excel-reporting-controlling-automatisieren/01-fahrplan-5-stufen.svg)

*Abbildung 1: Der Fahrplan in fünf Stufen. Die ersten beiden Stufen brauchen keine neue Software.*

### Stufe 1: Berichtsinventur – welche Berichte steuern wirklich?

Listen Sie alle Berichte auf, die Ihr Team regelmäßig erstellt: Empfänger, Rhythmus, Aufwand in Stunden, Datenquellen. Stellen Sie zu jedem Bericht eine Frage: **Welche Entscheidung trifft jemand auf Basis dieses Berichts?**

Das Ergebnis ist oft ernüchternd. Im selben Haufe-Beitrag beschreibt PwC ein Chemieunternehmen, das nach einem ERP-Go-live 140 aktive Berichte hatte. Für Managemententscheidungen genutzt wurden 14. Nur diese 14 zu automatisieren, sparte rund 55 Stunden manuelle Controlling-Arbeit pro Monat, die übrigen 126 wurden abgeschaltet ([Haufe, 04/2026](https://www.haufe.de/controlling/rechnungslegung/reporting-optimieren-so-gelingt-es-controllern_110_682524.html)).

Ein einfacher Selbsttest für diese Woche: Führen Sie zwei Wochen lang eine Strichliste, wie viele Stunden in Sammeln, Abgleichen und Formatieren gehen und wie viele in echte Analyse.

### Stufe 2: Definitionen festziehen – eine Kennzahl, eine Formel

Bevor irgendetwas automatisiert wird, braucht jede Kennzahl im Bericht eine schriftliche Definition. Was ist „Umsatz“: brutto oder netto, mit oder ohne Retouren, nach Rechnungs- oder Lieferdatum? Was gehört in den Rohertrag? Das Ergebnis ist ein schlichtes Kennzahlen-Glossar, eine Seite pro Bericht reicht.

Diese Stufe ist unbequem, weil sie Abstimmung mit Vertrieb und Buchhaltung erfordert. Sie verhindert aber das bekannte Szenario mit drei Umsatzzahlen im Montagsmeeting. Warum unterschiedliche Wahrheiten so hartnäckig sind, haben wir in [7 Zeichen, dass eure Datenbasis noch nicht bereit ist](/blog/7-zeichen-datenbasis/) beschrieben.

### Stufe 3: Datenzugriff automatisieren – Abfragen statt Copy & Paste

Jetzt kommen die Daten per Abfrage in den Bericht. Der Einstieg gelingt oft noch in Excel selbst: **Power Query** liest ERP-Exporte, DATEV-Auswertungen oder CSV-Dateien aus einem festen Ordner ein, bereinigt sie nach festen Regeln und lädt sie mit einem Klick neu. Der Monatswechsel heißt dann: neue Exportdatei in den Ordner legen, „Alle aktualisieren“ drücken, fertig.

Der nächste Schritt ist der direkte Zugriff auf die Quellsysteme, etwa über ODBC, Datenbank-Views oder die Schnittstellen von ERP und DATEV. Das spart den Export ganz und ist die Voraussetzung für Stufe 4.

### Stufe 4: Ein zentrales Datenmodell – eine Quelle für alle Berichte

Solange jeder Bericht seine eigenen Abfragen hat, entstehen wieder kleine Datensilos. Ein zentrales Datenmodell bündelt Konten, Kostenstellen, Kunden und Artikel einmal sauber und mit Beziehungen. Für viele Mittelständler reicht dafür ein semantisches Modell in Power BI. Bei mehreren Quellsystemen oder größeren Datenmengen kommt ein Data Warehouse dazu. Wann sich dieser Schritt lohnt, zeigt unser Beitrag [Von Excel zum Data Warehouse](/blog/von-tabellenkalkulation-zum-data-warehouse/).

### Stufe 5: Der automatisierte Bericht – mit Verantwortlichem

Der Bericht greift auf das Datenmodell zu, aktualisiert sich nach Plan, zum Beispiel jeden Morgen um sechs, und wird per App oder Abo verteilt. Kommentare zur Abweichung schreibt weiterhin das Controlling, denn das ist der Teil, der Wert schafft.

Entscheidend ist ein Detail, das gern vergessen wird: Jeder Bericht hat **einen namentlich benannten Owner**, der für Definitionen, Datenqualität und Änderungswünsche zuständig ist. Ohne diese Rolle wachsen in einem Jahr wieder drei Versionen desselben Berichts. Mehr dazu in unserem Beitrag zur [Data Governance](/blog/data-governance/).

| Stufe | Was passiert | Typisches Werkzeug | Ergebnis |
|---|---|---|---|
| 1 Inventur | Berichte, Aufwand, Entscheidungen erfassen | Liste, Zeitprotokoll | Weniger Berichte, klare Prioritäten |
| 2 Definitionen | Kennzahlen schriftlich festlegen | Glossar | Eine Wahrheit pro Kennzahl |
| 3 Datenzugriff | Abfragen statt Copy & Paste | Power Query, ODBC, Schnittstellen | Aktualisieren per Klick |
| 4 Datenmodell | Daten zentral und verknüpft ablegen | Power BI, Data Warehouse | Eine Quelle für alle Berichte |
| 5 Bericht | Automatisch aktualisieren und verteilen | Power BI App, Abos | Mehr Zeit für Analyse |

## Was bringt das in Tagen und Euro?

Ein Rechenbeispiel aus unserer Projekterfahrung, mit klar benannten Annahmen: Ein Controlling-Team mit drei Personen verbringt heute je Person drei Tage pro Monat mit dem Monatsreporting. Das sind neun Personentage, davon sieben für Sammeln, Kopieren und Abgleichen und zwei für Analyse.

![Balkendiagramm: Heute 9 Personentage pro Monat, davon 7 für Sammeln und Abgleichen und 2 für Analyse; nach Stufe 5 nur 4 Personentage, davon 1 für Datenprüfung und 3 für Analyse](/images/blog/excel-reporting-controlling-automatisieren/02-rechenbeispiel-monatsreporting.svg)

*Abbildung 2: Rechenbeispiel mit ADV-Annahmen. Der Analyseanteil steigt von 22 auf 75 Prozent.*

Nach Stufe 5 bleibt ein Tag für die Datenprüfung, die Analyse wächst auf drei Tage. Das Team spart also fünf Personentage pro Monat oder **60 Personentage im Jahr**. Bei einem angenommenen internen Tagessatz von 600 Euro entspricht das rund 36.000 Euro jährlich, ohne den schwerer messbaren Effekt besserer Entscheidungen. Rechnen Sie das Beispiel mit Ihren eigenen Zahlen aus Stufe 1 nach. Genau diese Rechnung überzeugt in der Regel auch die Geschäftsführung.

## Wo der Selbstbau endet

Stufe 1 bis 3 schaffen viele Teams aus eigener Kraft, vor allem mit Power Query. Schwieriger wird es bei Stufe 4: direkter Zugriff auf ERP-Tabellen, saubere Stammdaten, Berechtigungen und ein Modell, das auch in zwei Jahren noch wartbar ist. Laut einer Interviewstudie des Centre for Performance Management & Controlling der Frankfurt School nutzen inzwischen rund zwei Drittel der befragten Unternehmen BI-Tools, nach etwa der Hälfte in der ersten Befragungswelle. Eine echte „Single Point of Truth“ hat aber nur gut die Hälfte ([CPMC, 2024](https://icv-controlling.com/wp-content/uploads/2025/04/205226_CPMC-Studienbericht_Digitalisierung-im-Controlling_Auszug.pdf)). Das Tool allein löst das Problem also nicht.

Und noch ein Grund, jetzt anzufangen: KI-Assistenten in Excel und Power BI werden schnell besser. Laut BARC Planning Survey 26 nutzen bereits 27 Prozent der Unternehmen KI für Planung und Forecasting, ein Jahr zuvor waren es 11 Prozent ([BARC, 06/2026](https://barc.com/de/news/barc-planning-survey-26-ki-in-planning/)). Diese Werkzeuge liefern aber nur auf einer sauberen, definierten Datenbasis brauchbare Ergebnisse. Wer Stufe 2 bis 4 erledigt hat, ist auch für KI vorbereitet.

## Fazit: Der Abend um 21:40 Uhr ist kein Naturgesetz

Die Thalberg-Controllerin braucht kein neues Tool als Erstes. Sie braucht eine ehrliche Inventur, eine Seite mit Definitionen und ein paar Abfragen, die ihr das Kopieren abnehmen. Danach wird der Monatsabschluss nicht spektakulär, aber er endet zur normalen Zeit. Und am nächsten Morgen spricht die Geschäftsführung über Maßnahmen statt über die Frage, welche Zahl stimmt.

## Häufige Fragen

**Muss ich Excel komplett ablösen, um mein Reporting zu automatisieren?**
Nein. Excel bleibt für Analysen, Planungsszenarien und Ad-hoc-Fragen sinnvoll. Abgelöst wird Excel nur als Datensammelstelle und als manuelles Berichtssystem.

**Wie lange dauert es, das Monatsreporting zu automatisieren?**
Für einen ersten automatisierten Managementbericht rechnen wir im Mittelstand mit sechs bis zwölf Wochen, abhängig von der Zahl der Quellsysteme und der Datenqualität. Stufe 1 und 2 sind oft schon nach zwei bis drei Wochen erledigt.

**Brauche ich dafür ein Data Warehouse?**
Nicht zwingend. Bei ein bis zwei Quellsystemen reicht häufig ein Datenmodell in Power BI. Ein Data Warehouse lohnt sich, wenn mehrere Systeme zusammengeführt, Historien aufbewahrt oder viele Berichte aus einer Quelle bedient werden sollen.

**Welche Berichte sollte ich zuerst automatisieren?**
Die Berichte mit dem höchsten monatlichen Aufwand, die gleichzeitig eine echte Entscheidung unterstützen. In der Regel sind das Management-GuV, Plan-Ist-Vergleich und Liquiditätsübersicht.

---

Sie möchten wissen, wie viel Zeit in Ihrem Monatsreporting steckt und welche Stufe bei Ihnen als Nächstes dran ist? In einem kostenlosen Erstgespräch gehen wir Ihre Berichtslandschaft gemeinsam durch.

<div class="col-12 flex justify-center">
  <a class="btn btn-adv" href="https://calendly.com/andreas-klostermann-alpinedata/ersttermin">Erstgespräch vereinbaren →</a>
</div>
