---
title: "13-Wochen-Liquiditätsplanung: Von Excel zum automatischen Bericht"
meta_title: "Liquiditätsplanung 13 Wochen: Aufbau und Wochenzyklus"
description: "13-Wochen-Liquiditätsplanung im Mittelstand: Aufbau in Excel, Wochenzyklus, Rechenbeispiel und was sich automatisieren lässt. Engpässe früh erkennen."
date: 2026-11-09T07:00:00Z
image: "/images/blog/liquiditaetsplanung-13-wochen.jpeg"
categories: ["Controlling"]
author: "Benjamin Diez"
tags: ["Controlling", "Liquiditätsplanung", "Cashflow", "Automatisierung", "How To"]
draft: false
summary: "Der Kontostand zeigt, wo Sie heute stehen. Die 13-Wochen-Vorschau zeigt Engpässe früh. Mit Aufbau in Excel, Rechenbeispiel und dem Weg zur automatischen Aktualisierung."
---

Bei der Thalberg Getränke GmbH steht die Verlängerung der Kreditlinie an. Der Kontostand sieht gut aus, die Hausbank möchte dafür aber eine wochengenaue Vorschau der nächsten 13 Wochen sehen. Die Leiterin Controlling öffnet die Datei „Cashflow_neu_v7_final_jetz-aber-echt.xlsx“, die zuletzt im Sommer jemand gepflegt hat. Die Zahlen dafür liegen in ERP und Buchhaltung und müssten wie immer von Hand zusammenkopiert werden. 

Thalberg ist zwar das fiktive Unternehmen aus unserer [Serie über den Aufbau eines datengetriebenen Mittelständlers](/blog/kick-off/), diese wenig fiktive Datei sucht jedoch seit Jahrzehnten Generationen von Controllern in ihren Träumen heim.

## Das Wichtigste in Kürze

- Eine **Liquiditätsplanung über 13 Wochen** zeigt auf Wochenbasis, wann Geld ein- und ausgeht und ob der Kontostand einen Mindestpuffer unterschreitet
- Benötigt werden für die Erstellung in der Regel vier Quellen: Kontostände (auch die aus der Schweiz), offene Kundenrechnungen (Forderungen), offene Lieferantenrechnungen (Verbindlichkeiten) und feste Zahlungstermine wie Löhne, Steuern und Miete
- Der erste Aufbau gelingt in Excel in ein bis zwei Tagen, danach kostet das wöchentliche Update rund 2,5 Stunden
- Das Zusammentragen der Zahlen aus ERP und Buchhaltung ist oft händische Fleißarbeit und lässt sich automatisieren. Die Bewertung der Ergebnisse bleibt beim Controller

## Was ist eine Liquiditätsplanung über 13 Wochen und warum genau 13?

Eine 13-Wochen-Liquiditätsplanung ist eine wochengenaue Vorschau aller erwarteten Ein- und Auszahlungen für ein Quartal. Jede Woche wird die abgelaufene Woche gegen den Ist-Stand abgeglichen und eine neue Woche ans Ende angefügt (rollierende Planung). Der Horizont bleibt immer 13 Wochen lang.

13 Wochen sind ein Mittelweg. Ein kürzerer Zeitraum, etwa vier Wochen, übersieht Zahlungen, die nur alle drei Monate anfallen, zum Beispiel eine Quartalsmiete. Bei einem längeren Zeitraum kennen Sie Forderungen und Bestellungen nicht mehr einzeln und müssen schätzen, sodass die Vorschau mit jeder Woche ungenauer wird. Ein Quartal deckt die meisten Zahlungsrhythmen ab: Lohnläufe, Umsatzsteuer-Vorauszahlungen, Quartalsmieten, Kreditraten. Gleichzeitig bleibt es überschaubar genug, um mit einzelnen Zahlungen zu planen.

Dazu kommt, dass Geld im Moment langsamer fließt. Laut [Creditreform Debitorenregister, H1 2026, berichtet im Handwerksblatt,](https://www.handwerksblatt.de/betriebsfuehrung/zahlungsziele-steigen-aber-nur-fuer-grosskunden) lag das durchschnittliche Zahlungsziel im B2B-Geschäft im ersten Halbjahr 2026 bei 32,21 Tagen, dem höchsten Stand seit 2019. Mit Verzug dauert es im Schnitt 40,35 Tage, bis eine Rechnung bezahlt ist. Wer so lange auf Geld wartet, aber Löhne und Lieferanten pünktlich zahlen muss, braucht einen Blick nach vorn.

## Wie bauen Sie die 13-Wochen-Vorschau in Excel auf?

Für den Einsteig ist Excel völlig ausreichend. Spalten sind Kalenderwochen, Zeilen sind Zahlungsarten. Sie planen ausschließlich Zahlungen: Eine Rechnung zählt erst in der Woche, in der das Geld tatsächlich fließt und das mit dem **Bruttowert**.

### Schritt 1: Anfangsbestand festlegen (ca. 30 Minuten)

Tragen Sie den Kontostand aller Konten zum Wochenanfang ein, inklusive Tagesgeld und Co. Eine vereinbarte, aber ungenutzte Kreditlinie führen Sie in einer eigenen Zeile. Von diesem Stand aus rechnet die Vorschau Woche für Woche weiter.

### Schritt 2: Einzahlungen eintragen (ca. 2 Stunden)

Exportieren Sie aus der Buchhaltung die Liste der offenen Kundenrechnungen (Debitoren-OP-Liste, OP steht für offene Posten) und tragen Sie jede Rechnung in der Woche ein, in der Sie die Zahlung erwarten. Maßgeblich ist das tatsächliche Zahlungsverhalten des Kunden. Wer erfahrungsgemäß zehn Tage nach Fälligkeit zahlt, landet zehn Tage später in der Planung. Für Umsätze, die noch nicht in Rechnung gestellt sind, reicht eine grobe Zeile „Erwartete Neuaufträge“ auf Basis der Umsatzprognose Ihres Vertriebs.

### Schritt 3: Auszahlungen eintragen (ca. 3,5 Stunden)

Aus der Liste der offenen Lieferantenrechnungen (Kreditoren-OP-Liste) kommen die Lieferantenzahlungen, ebenfalls nach tatsächlichem Zahlungslauf. Dazu die festen Termine: Löhne, Sozialabgaben, Umsatzsteuer-Vorauszahlung, Miete, Leasing, Kreditraten und Versicherungen. Termine, die nicht jede Woche anfallen, etwa Quartalsmiete oder Jahresversicherung, gehen am leichtesten unter. Ein Gespräch mit der Buchhaltung lohnt sich, denn sie kennt die Zahlungsläufe - und oft den besten firmeninternen Tratsch.

### Schritt 4: Mindestpuffer festlegen (ca. 30 Minuten)

Legen Sie fest, welcher Kontostand nie unterschritten werden soll. Die Höhe entscheidet die Geschäftsführung. Wichtige Anhaltspunkte sind die größten anstehenden Zahlungen, etwa der monatliche Lohnlauf, sowie die Vorgaben Ihrer Hausbank, Ihrer Kreditvereinbarungen und Ihres Steuerberaters.

Zusammen sind das etwa 6,5 Stunden reine Arbeitszeit. Weil Sie Zahlungsziele und Verträge nachschlagen und Rückfragen mit der Buchhaltung klären müssen, verteilt sich der Aufbau meist auf ein bis zwei Arbeitstage.

## Wie sieht das Ergebnis aus?

Die Auswertung braucht eine Grafik und vier Kennzahlen: Kontostand heute, tiefster Stand, Mindestpuffer und Anzahl der Wochen unter Puffer. Die Abbildung zeigt Beispieldaten der Thalberg GmbH.

![Säulendiagramm des Kontostands über 13 Wochen mit gestrichelter Pufferlinie bei 100 Tausend Euro; in den Wochen 7, 9, 10, 12 & 13 liegt der Stand darunter](/images/blog/liquiditaetsplanung-13-wochen/02-wireframe-13-wochen-bericht.svg)

*Abbildung 1: Der 13-Wochen-Bericht mit Beispieldaten. Fünf von 13 Wochen liegen unter dem Mindestpuffer von 100 Tsd. €, in Woche 12 sogar knapp unter null.*

Der Anfangsbestand beträgt 380k€. Bis Woche 6 sieht alles komfortabel aus. In Woche 7 fällt der Kontostand auf 80k€, weil Lohnlauf und eine große Lieferantenzahlung zusammenfallen. In Woche 9 sind es nur noch 10k€, in Woche 12 sogar minus 5k€, Peter Zwegat scharrt bereits mit den Hufen. Ohne Vorschau fiele das wahrscheinlich erst am Tag der Überweisung auf. Mit 13-Wochen-Vorschau bleiben mindestens sechs Wochen Reaktionszeit bis zum ersten Engpass.

In dieser Zeit lässt sich einiges klären: Ein Kunde zahlt früher, eine Investition rutscht um zwei Wochen nach hinten oder ein Lieferant gewährt ein längeres Zahlungsziel. In einer sauberen Vorschau kostet das Durchspielen solcher Szenarien Minuten.

## Wie läuft die Vorschau jede Woche, ohne zum Dauerjob zu werden?

Eine Vorschau hilft nur, solange sie aktuell ist. Wird sie bloß vor Bankgesprächen überarbeitet, stimmen die Zahlen beim nächsten Termin nicht mehr. Deshalb bekommt sie einen festen Wochentermin und einen Verantwortlichen, der sie pflegt - Freiwillige vor.

![Fünf Kästen von Montag bis Freitag: Ist abgleichen, Quellen holen, Abweichungen klären, Woche 14 planen, entscheiden, mit insgesamt 2,5 Stunden Wochenaufwand](/images/blog/liquiditaetsplanung-13-wochen/01-wochenzyklus.svg)

*Abbildung 2: Der Wochenzyklus mit rund 2,5 Stunden Aufwand. Die Zeitangaben sind ADV-Erfahrungswerte.*

Der Zyklus verteilt sich auf fünf Wochentage. Montags gleichen Sie Kontostand und Zahlungseingänge der Vorwoche mit dem Plan ab. Dienstags liefert die Buchhaltung die aktuellen Listen der offenen Rechnungen und die Termine. Mittwochs klären Sie Abweichungen: welche Zahlung später kam, welche früher und warum. Donnerstags rollen Sie den Plan um eine Woche nach vorn. Freitags prüfen Sie den Puffer und entscheiden, ob Maßnahmen nötig sind. Ob am Samstag das Sams kommt, konnten wir bisher nicht feststellen.

Der Zyklus steht und fällt mit zwei Terminen. Liefert die Buchhaltung am Dienstag zu spät oder bleiben die Rückfragen am Mittwoch liegen, ist die Vorschau am Donnerstag schon wieder veraltet. Legen Sie beide Termine deshalb fest in den Kalender.

Der Mittwoch zahlt sich besonders aus. Wer jede Woche festhält, welcher Kunde wie viele Tage später gezahlt hat als geplant, kann diesen Verzug bei der nächsten Planung für denselben Kunden berücksichtigen.

## Was lässt sich automatisieren, und wann lohnt es sich?

Die Wochenroutine besteht aus zwei Teilen. Montag und Dienstag sind Fleißarbeit: Listen exportieren, in die Datei kopieren, Formeln prüfen, Zahlen abgleichen. Mittwoch bis Freitag ist Denkarbeit: Abweichungen bewerten, Hebel abwägen, entscheiden.

Die Fleißarbeit kann ein automatisierter Bericht übernehmen. Er liest die offenen Posten direkt aus ERP und Buchhaltung ein und schreibt die Vorschau jede Woche selbst fort. Dem Controller bleibt die Denkarbeit, und für die hat er dann mehr Zeit. Eine Liquiditätsvorschau ist dafür ein guter Kandidat, weil sie jede Woche in derselben Form entsteht.

Spätestens wenn mehrere Gesellschaften, Währungen oder Bankkonten zusammenkommen, wenn Plan und Ist in verschiedenen Systemen liegen oder wenn die Exporte nicht mehr von Hand laufen sollen, lohnt sich dieser Schritt.
 Dann dauert die Datenbeschaffung deutlich länger, und mit jedem manuellen Schritt wächst das Fehlerrisiko. Wie der Weg von der Excel-Datei zum automatischen Bericht aussieht, zeigt unser Fahrplan zum [Excel-Reporting in fünf Stufen](/blog/excel-reporting-controlling-automatisieren/).

## Fazit: Das Bankgespräch wird zum Routinetermin

Die Thalberg-Controllerin hat mit vier Quellen, einem Wochenrhythmus von rund 2,5 Stunden und einem definierten Puffer alles, was sie für das Bankgespräch braucht. Zum Termin legt sie der Bank eine Vorschau vor, die jede Woche gegen die Realität geprüft wurde, und die Geschäftsführung kennt in Woche 1 den drohenden Engpass in Woche 7. Den nächsten Schritt kennt sie auch: die Arbeit vom Montag und Dienstag dem Rechner überlassen.

*Disclaimer: Dieser Beitrag ist eine betriebswirtschaftliche Anleitung. Bei drohender Zahlungsunfähigkeit sind Steuerberater, Rechtsanwälte und Ihre Bank die richtigen Ansprechpartner.*

---

Ob sich Ihre Liquiditätsvorschau als erster automatisierter Bericht eignet, klären wir im kostenlosen Erstgespräch anhand Ihrer Berichte und Quellen. Auf unserer [Controlling-Seite](/controlling/) sehen Sie, wie wir einen Bericht zum Fixpreis automatisieren.

<div class="col-12 flex justify-center">
  <a class="btn btn-adv" href="https://calendly.com/andreas-klostermann-alpinedata/besprechung-controlling-finance">Erstgespräch vereinbaren →</a>
</div>