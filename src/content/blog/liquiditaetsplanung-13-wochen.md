---
title: "Liquiditätsplanung: Die 13-Wochen-Vorschau ohne Excel-Chaos"
meta_title: "Liquiditätsplanung 13 Wochen: Aufbau und Wochenzyklus"
description: "Liquiditätsplanung 13 Wochen im Mittelstand: Aufbau, Wochenzyklus und Rechenbeispiel. So erkennen Sie Engpässe früh, ohne Excel-Chaos und ohne Großprojekt."
date: 2026-11-12T07:00:00Z
image: "/images/blog/liquiditaetsplanung-13-wochen.png"
categories: ["Controlling"]
author: "Benjamin Diez"
tags: ["Controlling", "Liquiditätsplanung", "Cashflow", "Excel", "Planung", "How To"]
draft: false
summary: "Der Kontostand sagt, wo Sie stehen, nicht wo Sie in acht Wochen stehen. Die 13-Wochen-Vorschau zeigt Engpässe früh: mit Aufbau, Wochenzyklus und Rechenbeispiel für den Mittelstand."
---

Freitag, 16:40 Uhr bei der Thalberg Getränke GmbH. Der Kontostand sieht gut aus, die Leiterin Controlling will ins Wochenende. Dann ruft die Hausbank an: Ob man für die Liquiditätsplanung der nächsten 13 Wochen eine wochengenaue Vorschau bekommen könne. Sie öffnet die Datei „Cashflow_neu_v7.xlsx“, die zuletzt im Sommer jemand gepflegt hat. Thalberg ist ein fiktives Unternehmen aus unserer [Serie über den Aufbau eines datengetriebenen Mittelständlers](/blog/kick-off/). Die Datei kennen trotzdem viele Controller aus eigener Erfahrung.

## Das Wichtigste in Kürze

- Eine **Liquiditätsplanung über 13 Wochen** zeigt wochengenau, wann Geld ein- und ausgeht und ob der Kontostand einen Mindestpuffer unterschreitet.
- Sie brauchen dafür nur vier Quellen: Kontostand, offene Forderungen, offene Verbindlichkeiten und die festen Zahlungstermine wie Löhne, Steuern und Miete.
- Der Wochenzyklus kostet nach dem Aufsetzen rund 2,5 Stunden. Der erste Aufbau gelingt in Excel in ein bis zwei Tagen.
- Der Engpass in Woche 12 ist heute sichtbar und lässt sich mit Vorlauf lösen, statt im Notfall mit der Bank zu verhandeln.

## Was ist eine Liquiditätsplanung über 13 Wochen und warum genau 13?

Eine 13-Wochen-Liquiditätsplanung ist eine rollierende, wochengenaue Vorschau aller erwarteten Ein- und Auszahlungen für ein Quartal. Jede Woche wird die abgelaufene Woche gegen den Ist-Stand abgeglichen und eine neue Woche ans Ende angefügt. Der Horizont bleibt also immer 13 Wochen lang.

Der Zeitraum ist ein Kompromiss. Ein Quartal deckt die meisten Zahlungsrhythmen ab: Lohnläufe, Umsatzsteuer-Vorauszahlungen, Quartalsmieten, Tilgungen. Gleichzeitig ist es kurz genug, dass Sie Forderungen und Bestellungen noch einzeln kennen und nicht auf Hochrechnungen angewiesen sind. Die Jahresplanung beantwortet dagegen die Frage, was am Ende übrig bleibt, nicht ob in Woche 9 der Lohn bezahlt werden kann.

Warum das gerade jetzt Gewicht hat, zeigen zwei Zahlen. Laut Creditreform lag das durchschnittliche Zahlungsziel im B2B-Geschäft in Deutschland im ersten Halbjahr 2026 bei 32,21 Tagen, dem höchsten Stand seit 2019. Rechnet man den tatsächlichen Verzug dazu, wartet man im Schnitt rund 40 Tage auf sein Geld ([Creditreform Debitorenregister, H1 2026, zitiert bei retail-news.de](https://retail-news.de/creditreform-zahlungsziele-kmu-hj-2026/)). Und das Statistische Bundesamt meldet für Juni 2026 15,8 Prozent mehr beantragte Unternehmensinsolvenzen als im Vorjahresmonat ([Destatis, Pressemitteilung vom September 2026](https://www.destatis.de/DE/Presse/Pressemitteilungen/2026/09/PD26_325_52411.html)). Wer 40 Tage auf Zahlungen wartet, aber Löhne und Lieferanten pünktlich zahlt, braucht eine Vorschau, die weiter reicht als der Kontoauszug.

## Wie bauen Sie die 13-Wochen-Vorschau in Excel auf?

Excel ist für den Einstieg völlig in Ordnung. Wichtig ist die Struktur: Spalten sind Kalenderwochen, Zeilen sind Zahlungsarten. Sie planen ausschließlich Zahlungen, keine Erträge und Aufwände. Eine Rechnung zählt erst in der Woche, in der das Geld tatsächlich fließt.

### Schritt 1: Anfangsbestand festlegen (ca. 30 Minuten)

Nehmen Sie den Kontostand aller Konten zum Wochenanfang, inklusive Tagesgeld und nutzbarer Kreditlinien in einer getrennten Zeile. Der Anfangsbestand ist die einzige Zahl, die Sie nicht schätzen müssen.

### Schritt 2: Einzahlungen aus den offenen Posten ableiten (ca. 2 Stunden)

Exportieren Sie die Debitoren-OP-Liste und verteilen Sie jede offene Rechnung auf die Woche, in der Sie die Zahlung erwarten. Orientieren Sie sich nicht am Fälligkeitsdatum, sondern am tatsächlichen Zahlungsverhalten des Kunden. Wer erfahrungsgemäß zehn Tage nach Fälligkeit zahlt, landet zehn Tage später in der Planung. Für noch nicht fakturierte Umsätze reicht eine grobe Zeile „Erwartete Neuaufträge“ aus dem Vertriebsforecast.

### Schritt 3: Auszahlungen aus Verbindlichkeiten und Fixterminen füllen (ca. 3 Stunden)

Aus der Kreditoren-OP-Liste kommen die Lieferantenzahlungen, ebenfalls nach tatsächlichem Zahlungslauf. Dazu die festen Termine: Löhne und Gehälter, Sozialabgaben, Umsatzsteuer-Vorauszahlung, Miete, Leasing, Tilgung, Versicherungen. Genau hier lohnt sich ein Gespräch mit der Buchhaltung, denn sie kennt die Zahlungsläufe.

### Schritt 4: Mindestpuffer definieren (ca. 30 Minuten)

Legen Sie fest, welcher Kontostand nie unterschritten werden soll. Eine gängige Faustregel ist ein Puffer in Höhe eines Wochen-Personalaufwands zuzüglich der größten anstehenden Einzelzahlung. Das ist eine ADV-Erfahrung und keine Norm. Ihre Hausbank, Ihre Kreditvereinbarungen und Ihr Steuerberater können hier andere Vorgaben machen.

| Zeile | Quelle | Aufwand beim Aufsetzen |
|---|---|---|
| Anfangsbestand | Kontoauszüge, Onlinebanking | 30 Min |
| Einzahlungen Kunden | Debitoren-OP-Liste, Vertriebsforecast | 2 Std |
| Auszahlungen Lieferanten | Kreditoren-OP-Liste, Bestellobligo | 2 Std |
| Personal, Steuern, Fixkosten | Lohnlauf, Steuerkalender, Verträge | 1 Std |
| Kredite, Investitionen | Kreditverträge, Investitionsplan | 30 Min |
| Mindestpuffer | Abstimmung mit Geschäftsführung | 30 Min |

Zusammen sind das etwa 6,5 Stunden. Rechnen Sie mit ein bis zwei Arbeitstagen, weil Sie dabei vermutlich Zahlungsziele und Verträge nachschlagen müssen.

## Wie sieht das Ergebnis aus, und was zeigt es?

Die Auswertung braucht nur eine Grafik und vier Kennzahlen: Kontostand heute, tiefster Stand, Mindestpuffer und Anzahl der Wochen unter Puffer. Die Abbildung zeigt einen Bericht mit Beispieldaten der fiktiven Thalberg Getränke GmbH.

![Säulendiagramm des Kontostands über 13 Wochen mit gestrichelter Pufferlinie bei 100 Tausend Euro; in den Wochen 7, 9, 10 und 12 liegt der Stand darunter](/images/blog/liquiditaetsplanung-13-wochen/02-wireframe-13-wochen-bericht.svg)

*Abbildung 1: Der 13-Wochen-Bericht mit Beispieldaten. Vier von 13 Wochen liegen unter dem Mindestpuffer von 100 Tsd. €, in Woche 12 sogar knapp unter null.*

Der Anfangsbestand beträgt 420 Tsd. Euro. Bis Woche 6 sieht alles komfortabel aus. Dann fällt in Woche 7 der Kontostand auf 80 Tsd. Euro, weil Lohnlauf und eine große Lieferantenzahlung zusammenfallen. In Woche 9 sind es nur noch 10 Tsd. Euro, in Woche 12 minus 5 Tsd. Euro. Ohne Vorschau fiele das am Tag der Überweisung auf. Mit Vorschau haben die Controllerin und die Geschäftsführung zwölf Wochen Zeit.

Welche Hebel dann bleiben, lässt sich konkret durchspielen: Ein Kunde soll früher zahlen, eine Investition rutscht um zwei Wochen, ein Lieferant gewährt ein längeres Ziel oder die Kreditlinie wird rechtzeitig mit der Bank besprochen. Diese Szenarien kosten in einer sauberen Vorschau Minuten, sonst Nerven.

Der Kontostand ist ein Rückspiegel. Die Vorschau ist der Blick durch die Windschutzscheibe.

## Wie läuft die Vorschau jede Woche, ohne zum Dauerjob zu werden?

Der Aufbau ist einmalig, der Nutzen entsteht durch den Rhythmus. Wird die Vorschau nur bei Bankgesprächen aktualisiert, ist sie bei jedem Gespräch veraltet.

![Fünf Kästen von Montag bis Freitag: Ist abgleichen, Quellen holen, Abweichungen klären, Woche 14 planen, entscheiden, mit insgesamt 2,5 Stunden Wochenaufwand](/images/blog/liquiditaetsplanung-13-wochen/01-wochenzyklus.svg)

*Abbildung 2: Der Wochenzyklus mit rund 2,5 Stunden Aufwand. Die Zeitangaben sind ADV-Erfahrungswerte.*

Der Zyklus besteht aus fünf kurzen Schritten. Montags gleichen Sie Kontostand und Zahlungseingänge der Vorwoche mit dem Plan ab. Dienstags holt die Buchhaltung aktuelle OP-Listen und Termine. Mittwochs klären Sie Abweichungen: Welche Zahlung kam später, welche früher, und warum? Donnerstags rollen Sie den Plan um eine Woche nach vorn. Freitags prüfen Sie den Puffer und entscheiden, ob Maßnahmen nötig sind.

Der wichtigste Lerneffekt steckt im Mittwoch. Wer jede Woche notiert, welcher Kunde wie viele Tage später zahlt als geplant, verbessert die Prognose von allein. Nach drei bis vier Wochen kennen Sie die tatsächlichen Zahlungsgewohnheiten Ihrer zehn größten Kunden besser als das Vertriebssystem.

### Welche Fehler treten in der Praxis am häufigsten auf?

1. **Erträge statt Zahlungen planen.** Der Umsatz einer Woche ist nicht ihr Zahlungseingang.
2. **Fälligkeit statt Zahlungsverhalten.** Wer jeden Kunden pünktlich einplant, plant zu optimistisch.
3. **Fixtermine vergessen.** Umsatzsteuer, Quartalsmiete oder Jahresversicherung fehlen gern, weil sie nur einmal im Quartal anfallen.
4. **Kein Owner.** Wenn niemand namentlich zuständig ist, ist die Datei nach drei Monaten veraltet. Dazu mehr in unserem Beitrag zur [Data Governance](/blog/data-governance/).
5. **Nur eine Version der Wahrheit im Kopf.** Die Liquiditätsplanung muss mit dem Rest des Reportings übereinstimmen, sonst gibt es wieder [mehrere Zahlen für dieselbe Frage](/blog/7-zeichen-datenbasis/).

## Wo stößt die Excel-Lösung an Grenzen?

Für ein Unternehmen mit einem Hauptkonto, ein bis zwei Banken und überschaubarem Zahlungsvolumen trägt Excel lange. Schwierig wird es, wenn mehrere Gesellschaften, Währungen oder Bankkonten zusammenkommen, wenn die OP-Listen nicht mehr von Hand exportiert werden sollen oder wenn Plan und Ist in verschiedenen Systemen liegen. Dann kostet der Dienstag keine 45 Minuten mehr, sondern einen halben Tag, und die Fehlerquote steigt.

Dieselbe Mechanik kennen Sie vom [Plan-Ist-Vergleich mit Excel und ERP](/blog/plan-ist-vergleich-excel-erp/) und vom [Monatsreporting](/blog/excel-reporting-controlling-automatisieren/): Die Logik ist schnell gebaut, die dauerhafte Datenversorgung ist die eigentliche Arbeit. Wie ein automatisierter Bericht auf Basis von ERP und Bank aussieht, zeigt unsere [Live-Demo eines Monatsberichts in Power BI](/controlling/). Welche Software für Planung und Liquidität grundsätzlich infrage kommt, vergleichen wir in [Excel, Jedox, Board oder Power BI](/blog/planungssoftware-mittelstand-vergleich/).

Eine Abgrenzung: Dieser Beitrag ist eine betriebswirtschaftliche Anleitung. Bei drohender Zahlungsunfähigkeit, Covenants oder insolvenzrechtlichen Fragen sind Steuerberater, Rechtsanwälte und Ihre Bank die richtigen Ansprechpartner.

## Fazit: Der Anruf der Bank ist kein Notfall mehr

Die Thalberg-Controllerin braucht am Freitag um 16:40 Uhr keine Nachtschicht. Sie braucht eine Struktur mit vier Quellen, einen Wochenrhythmus von rund 2,5 Stunden und einen definierten Puffer. Dann schickt sie der Bank am Montag eine Vorschau, die jede Woche gegen die Realität geprüft wurde. Und die Geschäftsführung erfährt von Woche 12 in Woche 1.

## Wie wird aus Ihrer Liquiditätsvorschau ein Bericht, der sich selbst aktualisiert?

Die Vorschau läuft, der Freitagabend gehört wieder Ihnen. Mühsam wird es, sobald OP-Listen, Bankdaten und Lohnläufe automatisch zusammenfließen sollen. Auf unserer Controlling-Seite sehen Sie, [wie aus Ihrem wichtigsten Excel-Bericht ein automatisierter Power-BI-Bericht zum Fixpreis wird](/controlling/). Der Einstieg ist ein Reporting-Check für 2.900 Euro, der Ihre manuellen Schritte und Quellen erfasst.

## Häufige Fragen

**Was ist der Unterschied zwischen Liquiditätsplanung und Cashflow-Rechnung?**
Die Cashflow-Rechnung blickt zurück und erklärt, woher das Geld kam und wohin es ging. Die Liquiditätsplanung blickt nach vorn und zeigt, ob in den kommenden Wochen genug Geld auf dem Konto ist. Beide arbeiten mit Zahlungsströmen, aber mit anderem Zweck und Zeitraum.

**Wie genau muss die Planung sein?**
Genau genug, um Engpässe rechtzeitig zu sehen, nicht auf den Euro. In den ersten vier Wochen sollten Sie einzelne Zahlungen planen, danach reichen Summen je Zahlungsart. Entscheidend ist, dass Sie Abweichungen jede Woche auswerten.

**Reicht Excel für die 13-Wochen-Planung aus?**
Für ein Unternehmen mit einer Gesellschaft, wenigen Konten und überschaubarem Zahlungsvolumen ja. Grenzen zeigen sich bei mehreren Gesellschaften, Währungen oder dem Wunsch, OP-Listen und Bankdaten automatisch einzulesen.

**Wer im Unternehmen sollte die Planung verantworten?**
In der Regel das Controlling oder die Finanzleitung, mit klarer Zuarbeit der Buchhaltung. Entscheidend ist ein namentlich benannter Verantwortlicher und ein fester Termin pro Woche.

---

Sie möchten wissen, welche Ihrer Berichte sich zuerst automatisieren lassen, und wie viel Zeit das Ihrem Team bringt? In einem kostenlosen Erstgespräch gehen wir Ihre Berichtslandschaft gemeinsam durch.

<div class="col-12 flex justify-center">
  <a class="btn btn-adv" href="https://calendly.com/andreas-klostermann-alpinedata/ersttermin">Erstgespräch vereinbaren →</a>
</div>
