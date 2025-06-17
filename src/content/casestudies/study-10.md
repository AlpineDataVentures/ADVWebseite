---
title: "Case Study: Wie ein Getränkehersteller KPI-Chaos in Steuerbarkeit verwandelte"
meta_title: "Case Study: Vom KPI-Chaos zur Steuerbarkeit in der Getränkeproduktion"
description: "Wie ein führender Mittelständler in der Getränkeindustrie seine KPIs neu definierte, Verantwortung verteilte und dadurch die operative Steuerung revolutionierte."
image: "/images/casestudies/getraenke-kpi-chaos.png"
draft: false
summary: "Eine echte Transformation: Wie ein Getränkehersteller sein verworrenes KPI-System neu aufstellte – und so Transparenz, Fokus und Steuerbarkeit gewann."
---

### Wenn jeder eine andere Wahrheit hat

Montagmorgen, Geschäftsleitungsrunde bei einem Getränkehersteller mit rund 500 Mitarbeitenden. Der Produktionsleiter zeigt stolz: *„Unsere Effizienzquote liegt bei 87 %.“* Der Werkscontroller ergänzt: *„Laut meiner Auswertung sind’s eher 74 %.“* Die Vertriebsleiterin grinst trocken: *„Komisch, ich hab gestern 65 % im Monatsreport gesehen.“*

Drei Leute, drei KPIs – ein Problem.

Das Unternehmen produzierte über mehrere Werke hinweg Mineralwasser, Limonaden und Schorlen. Die Absatzmärkte waren anspruchsvoll, die Margen dünn. Steuerung war eigentlich Pflicht – doch die Datenlage war ein Puzzle. Jeder baute sich seinen KPI so, wie es gerade passte.

### Der Anfang: Diagnose statt Dashboard

Wir wurden von der Geschäftsführung beauftragt, das **KPI-Chaos zu entwirren**. Keine leichte Aufgabe, denn der Wildwuchs war nicht nur technisch, sondern vor allem kulturell:

* **Jedes Werk hatte eigene Definitionen** für OEE, Ausschussquote und Durchsatz
* **Zahlreiche Excel-Auswertungen** mit individuellen Logiken existierten nebeneinander
* Die BI-Abteilung war **reine Datenlieferantin**, nicht steuernd
* **Verantwortlichkeiten waren diffus** – KPIs hatten selten klare Owner

Wir starteten nicht mit einem neuen Tool, sondern mit einer simplen Frage: **Was wollt ihr eigentlich steuern – und warum?**

### Schritt 1: KPI-Governance – endlich Klarheit schaffen

Gemeinsam mit Produktionsleitung, Controlling und Vertrieb entwickelten wir ein einheitliches **KPI-Governance-Modell**:

* **Definitionen wurden standardisiert**: Was heißt „Effizienz“? Wie wird sie berechnet? Wann zählt eine Flasche als Ausschuss?
* **Datenquellen wurden harmonisiert**: MES-Daten, ERP und manuelle Rückmeldungen wurden über eine zentrale Logik (ETL in Azure Data Factory) zusammengeführt
* **Jeder KPI bekam einen Owner** – nicht nur technisch, sondern fachlich: eine Person, die für Qualität, Verständnis und Interpretation zuständig ist

### Schritt 2: Business-gerechtes KPI-Design

Die bisherigen Dashboards waren hübsch – aber nutzlos. Viel zu viele Details, keine Entscheidungsrelevanz. Also entwickelten wir **rollenspezifische Cockpits**:

* **Für das Management**: Fokussierte Steuerungs-KPIs (z. B. Ausschuss in € je Abfülllinie)
* **Für die Werke**: Tägliche Performance-Monitorings mit automatisierten Alerts
* **Für das Controlling**: Drilldowns und Plausibilitätsprüfungen

Technologisch setzte das Team auf **Power BI**, gekoppelt an ein zentrales Datenmodell in Azure SQL. Die Governance wurde in **Power BI Dataflows und Datasets** eingebettet, um Konsistenz zu garantieren.

### Schritt 3: Change durch Dialog

Doch der größte Hebel war nicht technologisch – sondern menschlich. Wir etablierten eine monatliche **KPI-Review-Routine**, in der die Bereichsverantwortlichen ihre Zahlen gemeinsam diskutierten:

* Nicht zur Kontrolle, sondern zur gemeinsamen Einordnung
* Abweichungen wurden **nicht abgestraft, sondern analysiert**
* Die Runde entwickelte sich zu einem echten Steuerungsgremium

Das Ergebnis: KPI-Transparenz wurde zum Motor für Eigenverantwortung.

### Der Effekt: Aus Zahlen wurde Führung

Nach sechs Monaten war aus KPI-Wildwuchs ein **gemeinsames Steuerungssystem** geworden:

* **Alle Bereiche arbeiteten mit denselben Definitionen**
* Die **Diskussionen verlagerten sich vom „Was stimmt?“ zum „Was tun wir?“**
* Die Geschäftsführung nutzte die Dashboards **täglich – und nicht nur zur Berichtslegung**

Die Wirkung war spürbar:

* Die Nachbearbeitung sank um 18 %
* Ausschusskosten wurden um 12 % reduziert
* Schichtverantwortliche begannen, **proaktiv auf ihre KPIs einzuwirken** – statt nur rückblickend zu reagieren

### Fazit: KPI-Ordnung ist kein Excel-Thema, sondern Führungsarbeit

Wer glaubt, ein BI-Tool alleine macht aus KPI-Chaos steuerbare Prozesse, hat das Problem nicht verstanden. **Es geht um Governance, Verantwortung, Sprachregelung.**

Dieser Getränkehersteller hat es geschafft – nicht mit einem neuen System, sondern mit einem neuen Selbstverständnis: **KPIs sind keine Zahlenfriedhöfe – sie sind das Rückgrat der Steuerung. Wenn man sie ernst nimmt.**
