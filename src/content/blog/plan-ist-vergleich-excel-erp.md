---
title: "Plan in Excel, Ist im ERP: Der Plan-Ist-Vergleich ohne Copy & Paste"
meta_title: "Plan-Ist-Vergleich automatisieren: Excel und ERP"
description: "Plan-Ist-Vergleich ohne Handarbeit: So führen Sie Plan aus Excel und Ist aus dem ERP in fünf Schritten zusammen. Mit Zeitplan und Rechenbeispiel."
date: 2026-11-02T07:00:00Z
image: "/images/blog/plan-ist-vergleich-excel-erp.png"
categories: ["Controlling"]
author: "Julian Koller"
tags: ["Controlling", "Plan-Ist-Vergleich", "Excel", "Power BI", "Planung", "How To"]
draft: false
summary: "Der Plan liegt in Excel, das Ist im ERP, und am Monatsende wird von Hand abgeglichen. Fünf Schritte zeigen, wie Sie den Plan-Ist-Vergleich automatisieren, ohne Ihre Planung umzubauen."
---

Dienstag, 17:30 Uhr, Monatsmitte. Die Controlling-Leiterin der Thalberg Getränke GmbH (fiktiv, wie immer) hat links die Plandatei mit 31 Tabellenblättern offen und rechts den Kontenexport aus dem ERP. Die Geschäftsführung will wissen, warum der Deckungsbeitrag im Vertrieb Süd sinkt. Die Antwort steckt irgendwo zwischen zwei Fenstern, und der Weg dorthin heißt SVERWEIS. Wer in dieser Lage schon einmal eine Kostenstelle gefunden hat, die im Plan „4120“ und im ERP „04120“ heißt, weiß, warum dieser Artikel existiert.

## Das Wichtigste in Kürze

- Ein **Plan-Ist-Vergleich automatisieren** heißt: Plan und Ist werden einmal sauber zusammengeführt und danach per Aktualisierung neu berechnet, statt jeden Monat von Hand kopiert.
- Sie müssen die Planung dafür nicht aus Excel ablösen. Der Plan bleibt in Excel, sofern er als saubere Tabelle vorliegt.
- Der Schlüssel ist eine Mapping-Tabelle, die Konten und Kostenstellen aus Plan und ERP einander zuordnet. Sie entscheidet darüber, ob der Vergleich stimmt.
- Für einen ersten automatisierten Abweichungsbericht rechnen wir im Mittelstand mit etwa vier bis acht Wochen.

## Was ist ein Plan-Ist-Vergleich, und warum hakt er so oft?

Ein Plan-Ist-Vergleich stellt geplante Werte den tatsächlich gebuchten Werten gegenüber und macht die Abweichung nach Konto, Kostenstelle und Zeitraum sichtbar. Er ist die Grundlage der Abweichungsanalyse und damit der Frage, welche Maßnahme das Management jetzt braucht.

Dass er hakt, hat meist drei Gründe:

1. **Zwei Welten, zwei Strukturen.** Der Plan ist nach Geschäftslogik gegliedert (Produktgruppen, Regionen), das ERP nach Kontenplan und Kostenstellen.
2. **Kein gemeinsamer Schlüssel.** Namen, Schreibweisen und Zuordnungen weichen ab, und das Wissen darüber steckt im Kopf einer Person.
3. **Der Plan ist eine Datei, kein Datensatz.** Formatierte Blätter mit Zwischensummen lassen sich nicht abfragen.

Die Verbreitung ist hoch: In der BARC-Studie The Planning Survey 14 nutzten 86 Prozent der Befragten Excel als Planungswerkzeug, allein oder kombiniert, und 83 Prozent der reinen Excel-Nutzer berichteten von Problemen im Planungsprozess ([BARC, 2014](https://public.dhe.ibm.com/software/de/pdf/BARC_Planning_Survey_14.pdf)). Die Zahlen sind älter, die Lage in vielen Mittelständlern erleben wir aber als unverändert. Passend dazu: Laut BARC Planning Survey 26 nutzen erst 27 Prozent der Unternehmen KI für Planung und Forecasting ([BARC, 2026](https://barc.com/de/news/barc-planning-survey-26-ki-in-planning/)). Auch dafür braucht es zuerst eine saubere Datenbasis.

## Wie bringen Sie Plan und Ist in fünf Schritten zusammen?

Der Weg funktioniert mit Excel, Power Query und Power BI und braucht kein Großprojekt. Die Zeitangaben sind ADV-Erfahrungswerte für ein Team mit einem Quellsystem und einem Plan.

![Architektur: Plan-Excel und ERP-Ist fließen über Power Query und eine Mapping-Tabelle in ein Datenmodell und von dort in den Abweichungsbericht](/images/blog/plan-ist-vergleich-excel-erp/01-architektur-plan-ist.svg)

*Abbildung 1: Zwei Quellen, ein Mapping, ein Datenmodell, ein Bericht. Der Plan bleibt in Excel, das Ist kommt aus dem ERP.*

Die Grafik zeigt die Kernaussage: Nicht die Planung wird ersetzt, sondern der manuelle Weg dazwischen.

| Schritt | Was passiert | Zeitbedarf |
|---|---|---|
| 1 Vergleichsebene festlegen | Auf welcher Ebene wird verglichen (Konto, Kostenstelle, Produktgruppe, Monat)? | 0,5 Tage |
| 2 Plan als Tabelle ablegen | Ein Blatt im Langformat: Konto, Kostenstelle, Monat, Betrag, Version | 1–2 Tage |
| 3 Ist-Daten automatisch holen | ODBC, Schnittstelle oder geplanter Export statt Handexport | 1–3 Tage |
| 4 Mapping-Tabelle bauen | Konten und Kostenstellen zu Planpositionen zuordnen | 2–3 Tage |
| 5 Datenmodell und Bericht | Beide Tabellen verknüpfen, Abweichung berechnen, Bericht aufbauen | 3–5 Tage |

### Schritt 1 und 2: Ebene festlegen, Plan als Tabelle ablegen

Die wichtigste Entscheidung ist die Vergleichsebene. Je feiner sie ist, desto aufwendiger wird das Mapping. Für den Anfang genügt meist die Ebene, auf der Ihre Geschäftsführung heute Entscheidungen trifft, etwa Kostenart je Kostenstelle und Monat.

Danach bekommt der Plan ein neues Zuhause: eine einzige Tabelle im Langformat, eine Zeile pro Konto, Kostenstelle und Monat. Keine Zwischensummen, keine verbundenen Zellen, keine Monate als Spalten. Das ist die einzige Umstellung, die Ihr Planungsteam spürt, und sie ist in der Regel an einem Nachmittag erledigt. Ergänzen Sie eine Spalte „Version“ (Budget, Forecast 1, Forecast 2), dann vergleichen Sie später auch gegen mehrere Planstände.

### Schritt 3: Ist-Daten automatisch holen

Das Ist stammt aus dem ERP, bei Thalberg aus NetSuite. Die Wege sind je nach System ähnlich: eine Datenbankschnittstelle per ODBC, eine Schnittstelle des Herstellers oder ein zeitgesteuerter Export in einen Ordner. Prüfen Sie vorab, ob die Schnittstelle in Ihrer Lizenz enthalten ist, denn manche sind kostenpflichtig. Wichtig ist, dass der Abruf ohne Menschen funktioniert. Ein Export, den jemand am Monatsende anstoßen muss, ist nur Copy & Paste mit zusätzlichem Schritt.

### Schritt 4: Die Mapping-Tabelle – das Herzstück

Die Mapping-Tabelle ordnet jedes Konto und jede Kostenstelle aus dem ERP einer Planposition zu. Sie ist unscheinbar, aber sie ist der Ort, an dem das Wissen aus dem Kopf der Fachperson in eine Tabelle wandert. Drei Regeln haben sich bewährt:

- Jede ERP-Buchung muss genau einer Planposition zugeordnet sein, sonst fehlt Geld im Vergleich oder es wird doppelt gezählt.
- Schreibweisen vereinheitlichen, etwa führende Nullen und Leerzeichen, direkt in Power Query.
- Eine Prüfzeile im Bericht zeigt „nicht zugeordnet“. Sie sollte immer null sein.

### Schritt 5: Datenmodell und Bericht

Plan und Ist liegen als zwei Faktentabellen vor, verbunden über gemeinsame Dimensionen wie Konto, Kostenstelle und Zeit. Die Abweichung ist dann eine einfache Kennzahl: Ist minus Plan, absolut und in Prozent. Achten Sie in NetSuite und anderen Systemen auf abweichende Geschäftsjahre, dafür brauchen Sie eine eigene Datumstabelle.

![Wireframe eines Abweichungsberichts mit drei Kacheln für Umsatz, Personalkosten und EBIT sowie einem Balkendiagramm der Abweichung je Kostenart](/images/blog/plan-ist-vergleich-excel-erp/02-wireframe-abweichungsbericht.svg)

*Abbildung 2: Aufbau eines Abweichungsberichts (Beispieldaten). Kacheln oben, Treiber darunter, Kommentar des Controllings als Ergänzung.*

Der Bericht beantwortet in dieser Reihenfolge drei Fragen: Wo stehen wir, was weicht ab, und woran liegt es. Die Kacheln zeigen YTD-Werte mit Plan und Abweichung, das Balkendiagramm die Treiber nach Kostenart. Den Kommentar schreibt weiterhin das Controlling, denn Einordnung ist keine Rechenaufgabe.

## Was bringt das in Tagen und Euro?

Ein Rechenbeispiel mit ADV-Annahmen: Ein Team aus drei Personen braucht heute für den Plan-Ist-Abgleich pro Monat zwei Tage je Person, also sechs Personentage. Nach der Automatisierung bleiben ein Personentag für Mapping-Pflege und Plausibilisierung.

Das ergibt fünf gesparte Personentage pro Monat und 60 im Jahr. Bei einem angenommenen internen Tagessatz von 600 Euro sind das rund 36.000 Euro jährlich. Ein einmaliger Aufbau von etwa 15 Personentagen amortisiert sich damit nach wenigen Monaten. Rechnen Sie mit Ihren eigenen Zahlen nach: Ein Zeitprotokoll über einen Monatsabschluss genügt.

## Wo endet der Selbstbau?

Die Schritte 1 bis 4 schaffen viele Teams selbst, vor allem mit Power Query. Anspruchsvoller wird es in drei Fällen:

- **Mehrere Planstände und Rückschreibung:** Wer Planwerte direkt im Bericht erfassen oder freigeben will, kommt an ein Planungstool. Eine Übersicht finden Sie in unserem [Vergleich von Excel, Jedox, Board und Power BI](/blog/planungssoftware-mittelstand-vergleich/).
- **Mehrere Quellsysteme:** Sobald mehrere ERPs, DATEV und CRM zusammenkommen, lohnt sich ein [Data Warehouse](/blog/von-tabellenkalkulation-zum-data-warehouse/).
- **Governance:** Wer pflegt das Mapping, wer gibt Planstände frei? Dafür braucht es klare Rollen, wie in unserem Beitrag zur [Data Governance](/blog/data-governance/) beschrieben.

Wie der Plan-Ist-Vergleich in ein automatisiertes Gesamtreporting passt, zeigt der Fahrplan [Excel-Reporting in 5 Stufen automatisieren](/blog/excel-reporting-controlling-automatisieren/). Und wer vom Vergleich zur Vorausschau will, findet bei [Forecast oder Guesswork](/blog/forecast-chaos/) den nächsten Schritt.

## Fazit: Der Dienstag um 17:30 Uhr muss nicht so enden

Die Thalberg-Controllerin muss ihre Planung nicht neu erfinden. Sie braucht den Plan als saubere Tabelle, eine Mapping-Tabelle und eine Abfrage, die das Ist holt. Danach öffnet sie am Monatsende einen Bericht und fragt nicht mehr, welche Zahl stimmt, sondern was zu tun ist. Das ist weniger spektakulär als ein neues Tool, dafür aber in wenigen Wochen erreichbar.

## Häufige Fragen

**Kann ich den Plan in Excel lassen und trotzdem automatisch vergleichen?**
Ja. Entscheidend ist das Format: Der Plan muss als Tabelle im Langformat vorliegen. Dann liest ihn Power Query bei jeder Aktualisierung neu ein, und Ihr Planungsteam arbeitet weiter in Excel.

**Wie lange dauert es, einen automatisierten Plan-Ist-Vergleich aufzubauen?**
Für ein Quellsystem und einen Plan rechnen wir mit etwa vier bis acht Wochen bis zum ersten produktiven Bericht. Den größten Anteil macht das Mapping aus, weil dabei fachliche Fragen geklärt werden müssen.

**Brauche ich dafür Power BI?**
Nicht zwingend. Für kleine Datenmengen genügt Excel mit Power Query und Pivot. Power BI lohnt sich, wenn mehrere Personen den Bericht nutzen, die Daten wachsen oder Sie Berechtigungen und automatische Aktualisierung brauchen.

**Was ist die häufigste Fehlerquelle?**
Nicht zugeordnete Konten und Kostenstellen im Mapping. Bauen Sie deshalb von Anfang an eine Prüfzeile ein, die Buchungen ohne Planposition ausweist.

---

Sie möchten Ihren Plan-Ist-Vergleich automatisieren und wissen, wie viel Zeit Sie dabei sparen? In einem kostenlosen Erstgespräch schauen wir gemeinsam auf Ihre Plandatei und Ihr ERP.

<div class="col-12 flex justify-center">
  <a class="btn btn-adv" href="https://calendly.com/andreas-klostermann-alpinedata/ersttermin">Erstgespräch vereinbaren →</a>
</div>
