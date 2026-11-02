---
title: "Umsatz ist nicht Gewinn: Welche Kunden wirklich Geld verdienen"
meta_title: "Deckungsbeitragsrechnung: Kunden und Produkte in Excel"
description: "Deckungsbeitragsrechnung für Kunden und Produkte: in drei Stufen mit Excel aufsetzen, am Rechenbeispiel prüfen und Grenzen der Excel-Lösung erkennen."
date: 2026-11-05T07:00:00Z
image: "/images/blog/deckungsbeitragsrechnung-produkte-kunden.png"
categories: ["Controlling"]
author: "Benjamin Diez"
tags: ["Controlling", "Deckungsbeitrag", "Kundenprofitabilität", "Excel", "KPI", "How To"]
draft: false
summary: "Der größte Kunde ist selten der profitabelste. Mit einer dreistufigen Deckungsbeitragsrechnung in Excel sehen Sie, welche Kunden Geld verdienen, und erkennen, wann Excel allein nicht mehr reicht."
---

Donnerstag, 16:40 Uhr, Vertriebsmeeting bei der Thalberg Getränke GmbH. Der Vertriebsleiter zeigt stolz die Umsatzliste: Platz eins ist der Handelskonzern, Platz drei der Gastro-Großhändler. „Die brauchen wir“, sagt er über den Handelskonzern. Die Controlling-Leiterin sagt nichts, aber sie denkt an die Rabattstaffel, die Sonderlieferungen am Samstag und die 90 Tage Zahlungsziel. Thalberg ist ein fiktives Unternehmen aus unserer [Serie über den Aufbau eines datengetriebenen Mittelständlers](/blog/kick-off/). Die Szene dürfte vielen Controllern trotzdem bekannt vorkommen.

## Das Wichtigste in Kürze

- **Die Deckungsbeitragsrechnung** zeigt, was nach Abzug der Kosten übrig bleibt, die ein Kunde oder Produkt verursacht. Sie beantwortet die Frage, wer zum Gewinn beiträgt, und nicht nur, wer Umsatz bringt.
- Drei Stufen reichen für den Einstieg: Deckungsbeitrag I (nach variablen Kosten), II (nach kundenfixen Kosten) und III (nach bereichsfixen Kosten).
- Im Rechenbeispiel unten liegt der größere Kunde nach Stufe II bei 17,5 % statt bei 26,7 % Marge. Das sehen Sie erst, wenn Sie über Stufe I hinausrechnen.
- Die erste Version bauen Sie in einem Tag in Excel. Für den monatlichen Betrieb brauchen Sie ein sauberes Datenmodell.

## Was ist eine Deckungsbeitragsrechnung und warum reicht der Umsatz nicht?

Eine Deckungsbeitragsrechnung ist eine Teilkostenrechnung, die vom Erlös zunächst nur die Kosten abzieht, die einem Produkt oder Kunden direkt zugerechnet werden können. Was übrig bleibt, „deckt“ die restlichen Fixkosten und liefert im Idealfall einen Gewinn. Bei der mehrstufigen Variante werden die Fixkosten schrittweise abgezogen: zuerst die, die ein einzelner Kunde verursacht, dann die einer Kundengruppe oder eines Bereichs.

Der Umsatz ist dafür ein schlechter Ersatz. Er enthält weder Rabatte und Boni noch Sonderlogistik, Außendienstzeit oder Kapitalbindung durch lange Zahlungsziele. Genau diese Posten unterscheiden einen guten von einem teuren Kunden.

Ein Grund, warum das in vielen Mittelständlern nicht gerechnet wird: Die Daten liegen verstreut. Eine Praxisbeobachtung von PwC in der Haufe Controllerpraxis ergab, dass in einem Handelsunternehmen [mehr als 65 Prozent der operativen Controlling-Arbeit außerhalb der offiziellen Systeme](https://www.haufe.de/controlling/rechnungslegung/reporting-optimieren-so-gelingt-es-controllern_110_682524.html) stattfanden (Haufe, 04/2026, Einzelfall). Und die Horváth CFO-Studie 2026 nennt Digitalisierung und Prozessautomatisierung für 63 % der befragten CFOs als [hoch wirksamen Hebel](https://www.horvath-partners.com/en/media-center/studies/cfo-study-2026-control-meets-complexity). Beides spricht dafür, die Rechnung nicht jedes Mal neu zusammenzukopieren.

## Wie bauen Sie die dreistufige Deckungsbeitragsrechnung in Excel auf?

Sie brauchen keine neue Software für den ersten Wurf. Planen Sie einen Arbeitstag ein und starten Sie mit den letzten zwölf Monaten.

![Treppe mit drei Stufen: Nettoumsatz minus variable Kosten ergibt Deckungsbeitrag I, minus kundenfixe Kosten ergibt Deckungsbeitrag II, minus bereichsfixe Kosten ergibt Deckungsbeitrag III](/images/blog/deckungsbeitragsrechnung-produkte-kunden/01-db-stufen.svg)

*Abbildung 1: Die drei Deckungsbeitragsstufen. Jede Stufe zieht eine weitere Kostenart ab und zeigt, wer sie verursacht.*

Die Grafik zeigt die Logik: Vom Bruttoumsatz gehen zuerst Erlösschmälerungen ab, dann die variablen Kosten. Das Ergebnis ist der Deckungsbeitrag I. Danach folgen die Fixkosten, die Sie einem Kunden eindeutig zuordnen können (Deckungsbeitrag II), und schließlich jene, die nur einer Kundengruppe oder einem Vertriebsbereich zugeordnet werden (Deckungsbeitrag III). Nicht zugeordnete Gemeinkosten bleiben bewusst außen vor.

### Schritt 1: Daten holen (ca. 2 Stunden)

Exportieren Sie aus dem ERP die Rechnungspositionen der letzten zwölf Monate mit Kunde, Artikel, Menge, Bruttoerlös, Rabatt und Bonus. Ergänzen Sie die variablen Kosten je Artikel: Material, Fremdleistung, Fracht, Provision. Wenn Sie keine Artikelkalkulation haben, nehmen Sie für den Start die Standardkosten und markieren Sie das als Annahme.

### Schritt 2: Deckungsbeitrag I je Kunde und Produkt (ca. 1 Stunde)

Legen Sie eine Pivot-Tabelle an: Zeilen Kunde, Spalten Produktgruppe, Werte Nettoumsatz und variable Kosten. Die Differenz ist der Deckungsbeitrag I, die Marge ist der Deckungsbeitrag I geteilt durch den Nettoumsatz. Sortieren Sie nach der Marge, nicht nach dem Umsatz. Schon hier verschiebt sich die Rangliste.

### Schritt 3: Kundenfixe Kosten zuordnen (ca. 3 Stunden)

Das ist der Teil, der Arbeit macht und Erkenntnis bringt. Sammeln Sie Kosten, die ohne den Kunden entfallen würden: Sonderlieferungen, eigene Verpackung, Außendienst- und Servicezeit, Kosten des Zahlungsziels. Wo keine Buchung existiert, nutzen Sie einen Schlüssel (z. B. Besuchstage, Lieferungen, Zahlungsziel in Tagen) und schreiben ihn in ein eigenes Tabellenblatt. So bleibt die Annahme für den Prüfer sichtbar.

### Schritt 4: Ergebnis prüfen und Rangliste bauen (ca. 2 Stunden)

Stimmt die Summe der Deckungsbeiträge mit der GuV überein? Wenn die Abweichung unter einem Prozent liegt, ist die Basis tragfähig. Danach bauen Sie die Rangliste: Kunden nach Deckungsbeitrag II sortiert, daneben der Umsatzrang.

| Schritt | Ergebnis | Zeitbedarf (ADV-Schätzung) |
|---|---|---|
| 1. Daten holen | Rohdaten ERP, 12 Monate | ca. 2 Stunden |
| 2. Deckungsbeitrag I | Pivot Kunde × Produktgruppe | ca. 1 Stunde |
| 3. Kundenfixe Kosten | Deckungsbeitrag II mit Schlüsseln | ca. 3 Stunden |
| 4. Abgleich und Rangliste | Plausibilisierte Kundenliste | ca. 2 Stunden |

## Welche Kunden verdienen wirklich Geld? Ein Rechenbeispiel

Nehmen wir zwei fiktive Thalberg-Kunden: Kunde A, ein Gastro-Großhändler, und Kunde B, der Handelskonzern. Alle Zahlen sind ein Rechenbeispiel von ADV und keine Messwerte aus einem Projekt.

![Balkenvergleich zweier Kunden: Kunde B hat mit 1,5 Mio. Euro den höheren Umsatz, aber nach kundenfixen Kosten nur 210.000 Euro Deckungsbeitrag II, Kunde A mit 1,2 Mio. Euro Umsatz erreicht 288.000 Euro](/images/blog/deckungsbeitragsrechnung-produkte-kunden/02-kunde-a-vs-b.svg)

*Abbildung 2: Kunde B hat mehr Umsatz und mehr Deckungsbeitrag I, nach den kundenfixen Kosten liegt er aber hinter Kunde A. Beispieldaten.*

| Position | Kunde A (Gastro-Großhändler) | Kunde B (Handelskonzern) |
|---|---|---|
| Bruttoumsatz | 1.200.000 € | 1.500.000 € |
| Erlösschmälerungen (Rabatte, Boni) | 120.000 € | 300.000 € |
| Nettoumsatz | 1.080.000 € | 1.200.000 € |
| Variable Kosten (70 % vom Nettoumsatz) | 756.000 € | 840.000 € |
| **Deckungsbeitrag I** | **324.000 € (30,0 %)** | **360.000 € (30,0 %)** |
| Kundenfixe Kosten | 36.000 € | 150.000 € |
| **Deckungsbeitrag II** | **288.000 € (26,7 %)** | **210.000 € (17,5 %)** |

Nach Stufe I liegt Kunde B vorn: Er bringt 36.000 € mehr Deckungsbeitrag. Nach Stufe II dreht sich das Bild. Die Sonderlieferungen, der Außendienst und das lange Zahlungsziel kosten 150.000 € gegenüber 36.000 € bei Kunde A. Unterm Strich verdient Kunde A 78.000 € mehr, bei 300.000 € weniger Bruttoumsatz.

Für die Steuerung folgt daraus kein Rauswurf. Es folgt eine Verhandlungsgrundlage: Wenn Kunde B die Lieferung am Samstag streicht oder das Zahlungsziel halbiert, steigt der Deckungsbeitrag II ohne einen Cent mehr Umsatz. Und wenn der Vertrieb das nächste Mal Rabatt gibt, sehen Sie, was der Rabatt in der Marge kostet.

Wie sich solche Zahlen im Berichtswesen sinnvoll aufhängen, haben wir in [Die 7 KPIs, die jede Geschäftsführung wirklich braucht](/blog/7-kpi-für-geschaeftsfuehrung/) beschrieben. Der Deckungsbeitrag II je Kunde gehört für uns in jedes Management-Reporting.

## Wo endet die Excel-Lösung?

Die Excel-Version funktioniert für einen Stichtag und einen Prüfer. Danach beginnen die Grenzen, und die sind weniger eine Frage von Excel als von Datenqualität.

Typische Stolpersteine, die wir in Gesprächen mit Controlling-Leitungen im Mittelstand sehen:

- **Mehrere Quellen:** Erlöse kommen aus dem ERP, Fixkosten aus DATEV oder der Kostenstellenrechnung, Außendienstzeiten aus dem CRM. Jede Quelle hat eigene Kundennummern.
- **Schlüssel ohne Pflege:** Die Verteilschlüssel aus Schritt 3 ändern sich, die Datei wird nicht mehr nachgezogen, und nach drei Monaten stimmt sie nicht mehr.
- **Kopfmonopol:** Nur eine Person versteht die Datei. Das kennen Sie von [anderen Reportings](/blog/excel-reporting-controlling-automatisieren/) auch.
- **Keine Historie:** Sie sehen nur den Stand heute, nicht, wie sich die Marge eines Kunden über zwölf Monate entwickelt hat.

Hier beginnt der Weg vom Einzelergebnis zum laufenden Prozess. Wie Sie dafür ein Datenmodell aufbauen, beschreibt der Beitrag [Von der Tabellenkalkulation zum Data Warehouse](/blog/von-tabellenkalkulation-zum-data-warehouse/). Und wenn die Sache an der Grenze zwischen Excel und Berichtssystem hängt, zeigen wir auf unserer Controlling-Seite, [wie Mittelständler ihr Reporting aus Excel herausbekommen](/controlling/).

## Fazit: Die Rangliste nach Marge ist unbequem und nützlich

Zurück zum Donnerstagnachmittag bei Thalberg: Die Controlling-Leiterin legt am Freitag eine zweite Rangliste neben die Umsatzliste. Platz eins im Umsatz ist Platz drei beim Deckungsbeitrag II. Der Vertriebsleiter schluckt, dann stellt er die erste sinnvolle Frage des Quartals: „Was müsste sich bei B ändern?“

Das ist der Zweck der Rechnung. Sie ersetzt keine Kundenbeziehung, aber sie gibt dem Gespräch Zahlen. Und sie beginnt klein: ein Tag Excel, eine Rangliste, eine Annahmenliste.

## Wie wird aus Ihrer Excel-Rangliste ein Bericht, der jeden Monat von selbst aktualisiert wird?

Die erste Rangliste steht, der Vertrieb diskutiert plötzlich über Marge statt über Umsatz. Schwierig wird es im zweiten Monat, wenn Kundenstamm, Kosten und Schlüssel neu eingelesen werden müssen. Auf unserer Controlling-Seite zeigen wir, [wie Sie Ihr Monatsreporting in Power BI automatisieren](/controlling/): vom Reporting-Check zum Fixpreis bis zum Prototyp mit Ihren eigenen Zahlen.

## FAQ

### Was ist der Unterschied zwischen Deckungsbeitrag und Gewinn?

Der Deckungsbeitrag ist der Erlös abzüglich der Kosten, die einer Bezugsgröße (Produkt, Kunde, Bereich) zugerechnet werden. Der Gewinn berücksichtigt zusätzlich alle nicht zugeordneten Fixkosten. Ein positiver Deckungsbeitrag heißt also nur, dass der Kunde zur Deckung der Fixkosten beiträgt, nicht, dass er das Unternehmen allein trägt.

### Ab wann lohnt sich eine mehrstufige Deckungsbeitragsrechnung?

Sobald Rabatte, Sonderleistungen oder Zahlungsziele zwischen Ihren Kunden spürbar variieren. Im Mittelstand ist das meistens schon ab einem Dutzend nennenswerter Kunden der Fall. Eine einstufige Rechnung genügt, wenn Ihre Kunden nahezu identische Konditionen haben.

### Wie ordne ich Fixkosten Kunden zu, wenn es keine Buchung gibt?

Mit einem dokumentierten Verteilschlüssel, etwa nach Lieferungen, Besuchstagen oder Zahlungsziel. Wichtig ist, dass der Schlüssel schriftlich festgehalten und mit dem Vertrieb abgestimmt ist. Ein einfacher, nachvollziehbarer Schlüssel ist besser als ein genauer, den niemand versteht.

### Darf ich unrentable Kunden einfach kündigen?

Nicht ohne Weiteres. Prüfen Sie zuerst, ob sich Konditionen, Lieferfrequenz oder Zahlungsziel ändern lassen, und ob der Kunde Fixkosten deckt, die sonst bei anderen Kunden hängen bleiben. Rechtliche Fragen zu Vertragsbeendigungen gehören zu Ihrer Rechtsberatung.

## Nächster Schritt

Sie möchten wissen, welche Ihrer Kunden wirklich Geld verdienen? Im [Erstgespräch auf unserer Controlling-Seite](/controlling/) schauen wir gemeinsam auf Ihre Datenlage und zeigen, wie ein Deckungsbeitragsbericht mit Ihren Zahlen aussehen kann. Alternativ schreiben Sie uns an [info@alpinedata.de](mailto:info@alpinedata.de?subject=Deckungsbeitragsrechnung%20Erstgespr%C3%A4ch).
