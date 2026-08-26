---
title: "Data Catalog: warum ein DWH ohne Inhaltsverzeichnis nur halb fertig ist"
meta_title: "Data Catalog: Warum Daten auffindbar, dokumentiert und verantwortet sein müssen"
description: "Das Warehouse läuft, aber niemand weiß wo die Kundensegmentierung liegt. Ein Data Catalog löst dieses Problem. Wir erklären, was er enthält, wann man ihn braucht und warum OpenMetadata für den Mittelstand die pragmatischste Wahl ist."
date: 2026-08-26T08:30:00Z
image: "/images/blog/what-is-a-data-catalog.png"
categories: ["Data Governance"] 
author: "Ben Diez"
tags: ["Data Catalog", "Informationssicherheit"]
draft: false
summary: "Drei Personen, drei verschiedene Antworten auf dieselbe Frage: wo liegt die Kundensegmentierung? Die Lösung: ein Data Catalog. Was er enthält und wann man ihn wirklich braucht."
---

*Teil 12 unserer Serie über den kompletten Aufbau eines datengetriebenen Unternehmens [Teil 11 lesen](/blog/10-week-data-journey-recap/)*

Das Warehouse läuft, die Pipeline liefert, alle sind stolz. Wochenende fängt diese Woche schon am Mittwoch an.

Dann fragt die neue Marketingleiterin: "Wo finde ich eigentlich die Kundensegmentierung?"

Drei Personen schicken drei verschiedene Antworten. Eine verweist auf eine Tabelle im Warehouse. Eine andere schickt einen Excel-Export von letztem Quartal. Die dritte sagt sie glaube die sei irgendwo im CRM. Keine der drei ist eindeutig falsch. Keine ist eindeutig richtig.

Thalberg hat ein Warehouse voller Daten und keinen Plan wo was ist.

### Was ist ein Data Catalog

Ein Data Catalog ist für die eigenen Daten ungefähr das, was Google für das Internet ist. Er macht auffindbar was da ist und liefert gleich den Kontext dazu: was die Daten bedeuten, woher sie kommen und wer sie verantwortet.

Auch, wenn das nach Peak-Bürokratie klingt, ist es eher das Gegenteil. Wer kein Inhaltsverzeichnis hat, verbringt einen erheblichen Teil seiner Zeit damit Daten zu suchen, statt mit ihnen zu arbeiten. Eine [Forrester-Studie](https://www.cdpinstitute.org/news/knowledge-workers-lose-30-of-time-looking-for-data-forrester-study/) schätzt sogar, dass Knowledge Worker bis zu 30 Prozent ihrer Zeit mit der Suche nach den richtigen Daten verbringen.

Ein Data Catalog löst das nicht allein durch Technologie. Die Technik hilft beim Auffinden und Strukturieren, was die Daten allerdings bedeuten, wer sie verantwortet und wofür sie genutzt werden dürfen, das muss das Unternehmen selbst entscheiden und dokumentieren. Er beantwortet somit die Fragen die sich jeder stellt der neu in ein Datenprojekt einsteigt: Was haben wir? Wo liegt es? Was bedeutet es? Und darf ich es für meinen Zweck nutzen?

### Was ein Data Catalog konkret enthält

- **Technische Metadaten**
	- Wo liegen die Daten, in welchem Format und wie sind sie strukturiert: Tabellennamen, Spaltenbezeichnungen, Datentypen, etc.
	- Aktualisierungsfrequenz und aus welchem Quellsystem die Daten stammen

- **Business Metadaten**
	- Fachliche, nichttechnische Beschreibung, was ein Datensatz oder eine Tabelle bedeutet
	- Konkrete Person als benannter Verantwortlicher auf Tabellen- oder Datensatzebene, die bei Fragen und Problemen ansprechbar ist
	- Ein "Approval-Status" als Qualitätsindikator, damit jeder, der einen Datensatz sucht weiß, dass die Daten verlässlich sind.
	- Nutzungszweck, für welche Analysen und Zwecke diese Daten freigegeben sind

- **Data Lineage**
	- Woher kommen die Daten und welche Transformationen haben sie durchlaufen?
	- Was ändedrt sich, wenn ein Quellsystem wegfällt oder sich ändert

- **Glossar**
	- Einheitliche Definitionen aller Begriffe, die im Unternehmen verwendet werden
	- Einheitliche KPI-Definitionen: "Umsatz" mit oder ohne MwSt.? Was ist ein "Aktiver Kunde", seit wann? Diese Entscheidungen werden einmal getroffen, dokumentiert und gelten ab dann firmenweit
	- Vordefinierte Queries für häufig genutzte Kennzahlen, damit alle Werte auf dieselbe Art abgefragt werden
	- Verlinkung zu BI Reports: jeder Wert der in einem Dashboard erscheint kann direkt im Catalog nachgeschlagen und nachvollzogen werden

### Wann braucht man das wirklich?

Ja, wenn auch nicht von Anfang an. Ein Data Catalog für ein Warehouse mit drei Tabellen ist Overkill, es gibt aber klare Signale, dass der richtige Zeitpunkt gekommen ist.

Wenn z. B. verschiedene Personen dieselbe Frage unterschiedlich beantworten und beide Recht haben, weil sie unterschiedliche Datenquellen nutzen. Wenn neue Mitarbeiter Wochen brauchen, um zu verstehen welche Daten es gibt und wie man sie findet. Oder wenn niemand mehr sagen kann, woher eine bestimmte Zahl im Dashboard kommt.

Thalberg hat nach zwölf Wochen alle drei Signale. Das Warehouse ist gewachsen, neue Personen sind ins Projekt eingestiegen, und die praktisch keiner findet auf Anhieb, was er sucht.

### Der Zusammenhang mit Data Governance

Ein Data Catalog ist nicht nur ein technisches Werkzeug. Er ist einer der Grundsteine für eine solide Data Governance, nämlich der, der klärt, wer im Unternehmen für welche Daten verantwortlich ist und wie mit ihnen umgegangen wird.

Wer weiß was er hat, kann dokumentieren, wer fachlicher Eigentümer welcher Daten ist und hat eine klare Antwort wenn jemand fragt, wer bei einem Datenproblem zuständig ist. Wer Data Lineage pflegt, kann bei einem Fehler im Dashboard nachvollziehen, wo er herkommt statt blind in der Pipeline zu suchen.

Und was wäre saubere Data Governance ohne DSGVO: Wer nachweisen muss welche personenbezogenen Daten wo verarbeitet werden, braucht genau das, was ein Data Catalog liefert. Kein Verzeichnis von Verarbeitungstätigkeiten ohne Überblick über die eigenen Daten.

### Das Tool: OpenMetadata

Es gibt viele Data Catalog Tools: von teuren Enterprise-Lösungen wie Collibra (richtig teuer) bis zu einfachen Wiki-Ansätzen. Für Mittelständler wie Thalberg empfehlen wir OpenMetadata: open source, aktiv weiterentwickelt, und funktional auf Augenhöhe mit deutlich kostspieligeren Alternativen.

OpenMetadata kann automatisch Metadaten aus Datenbanken, Data Warehouses und ETL-Pipelines einlesen, was einen Großteil der manuellen Erfassung erspart. Es hat eine verständliche Oberfläche die auch für nicht-technische Nutzer funktioniert und es unterstützt Data Lineage, Glossare und fachliche Eigentümerschaft out of the box.

Der Einstieg ist überschaubar: OpenMetadata kann selbst gehostet werden, der Betrieb ist mit etwas technischem Know-how machbar. Wer das nicht intern stemmen will, kann auf eine gemanagte Version zurückgreifen.

Was OpenMetadata nicht ist: ein Selbstläufer. Ein Data Catalog ist so gut wie die Disziplin mit der er gepflegt wird. Wer ihn einführt und dann nicht befüllt, hat ein leeres Inhaltsverzeichnis. Das ist schlimmer als keins, weil es ein falsches Gefühl von Sicherheit erzeugt.

*PS: wir werden für diesen Absatz nicht bezahlt, wir finden das Tool einfach nur cool.*

### Was Thalberg entscheidet

Thalberg führt OpenMetadata ein mit einem klaren Scope, der eh bei Datenprojekten gelten sollte: Nicht alles auf einmal. Die wichtigsten Datensätze zuerst: Kundenstammdaten, Umsatzdaten, die KPIs aus dem Dashboard. Fachliche Eigentümer werden benannt, Glossareinträge für die zehn häufigsten Begriffskonflikte werden geschrieben, und die ersten Queries werden vordefiniert damit alle ab sofort dieselben Zahlen sehen.

Der Rest wächst mit. Ein Data Catalog ist kein Projekt mit Abnahme, sondern ein lebendiges Dokument, das stetig weiterwächst.

### Was als nächstes kommt

Thalberg weiß jetzt zumindest für die wichtigsten Datensätze, was es hat. Aber damit ist das nächste Problem sichtbar geworden: Dieselben Kunden tauchen unter verschiedenen Namen auf, Produktbezeichnungen variieren je nach System, und niemand weiß, welche Version die richtige ist.

Nächste Woche: Stammdatenmanagement — warum "Kunde" nicht gleich "Kunde" ist und was man dagegen tun kann.

> Ihr wollt einen Data Catalog einführen und wisst nicht wo ihr anfangen sollt? Wir helfen beim Aufbau, von der Tool-Auswahl bis zur ersten befüllten Struktur.
→ [Mehr zum Data Catalog](/products/data-catalog/)