---
title: "Qualität durch Kontext: Wie eine Fertigung Datenpunkte neu zusammensetzte"
meta_title: "Case Study: Kontextuelle Qualitätsdaten – mehr Erkenntnis, weniger Ausschuss"
description: "Wie ein mittelständischer Zulieferer aus Oberfranken aus losen Datenpunkten ein nutzbares System für Qualitätssteuerung entwickelte – und damit nicht nur Ausschuss senkte, sondern auch Vertrauen gewann."
image: "/images/casestudies/Fertigung.png"
tags: ["Qualitätsdaten", "Kontextdaten", "Produktionssteuerung", "Data Lake", "MES", "ERP", "Predictive Quality", "Datenintegration"]
draft: false
summary: "Ein Zulieferer aus Oberfranken bringt Struktur in seine Qualitätsdaten: Durch Kombination mit Kontextinformationen entstehen neue Erkenntnisse – mit handfestem Einfluss auf Ausschuss und Steuerung."
---

Die kontinuierliche Verbesserung der Produktqualität ist für produzierende Unternehmen von entscheidender Bedeutung, insbesondere für Zulieferer, die in komplexen Wertschöpfungsketten agieren. Doch während viele Unternehmen reich an Daten sind, scheitert die Nutzung dieser Daten oft an mangelndem Kontext. Die König Metalltechnik GmbH, ein mittelständischer Familienunternehmen aus Oberfranken, stand vor genau dieser Herausforderung. Ihre Reise zur Transformation von isolierten Datenpunkten in ein intelligentes, kontextualisiertes Qualitätssystem bietet eine Blaupause für andere Unternehmen, die ihre Produktionsprozesse optimieren möchten.


### Ausgangslage: Datenreichtum ohne Erkenntnis

Die König Metalltechnik GmbH, spezialisiert auf Präzisionsbauteile für die Automobil- und Maschinenbauindustrie, produzierte täglich eine enorme Menge an Daten. Prüfprotokolle aus der Qualitätssicherung, Maschinendaten von CNC-Anlagen und Stanzautomaten, Materialdaten aus Wareneingang und Lager sowie Auftragsdaten aus dem Enterprise Resource Planning (ERP)-System – all diese Informationen waren vorhanden. Doch paradoxerweise blieben die Erkenntnisse gering.

Die Abteilung Qualitätssicherung (QS) war sich bewusst, dass Fehler und Abweichungen auftraten. Sie erkannten Ausschuss, dokumentierten Nacharbeiten und führten Stichprobenkontrollen durch. Doch die entscheidende Frage, *warum* Fehler auftraten, konnte selten eindeutig beantwortet werden. Ein defektes Bauteil wurde als "Fehler X" erfasst, aber der Zusammenhang zur verwendeten Materialcharge, der spezifischen Maschine, die es gefertigt hatte, oder sogar der Schicht, in der es produziert wurde, blieb oft im Verborgenen. Die Daten existierten in Silos, isoliert voneinander, wodurch eine ganzheitliche Fehleranalyse extrem zeitaufwendig und oft unvollständig war. Das manuelle Korrelieren dieser Daten war schlichtweg ineffizient und fehleranfällig, was zu langsamen Reaktionszeiten bei Qualitätsproblemen und einer suboptimalen Prozesssteuerung führte.

### Zielsetzung: Vom Datenfriedhof zur Wissensbasis

Angesichts dieser Herausforderungen formulierte die König Metalltechnik eine klare und ambitionierte Zielsetzung: Es sollte ein vernetztes Qualitätsbild entstehen, das es ermöglicht, Fehlerursachen strukturiert zu analysieren, Prozessverbesserungen evidenzbasiert abzuleiten und proaktiv auf potenzielle Qualitätsprobleme zu reagieren. Konkret bedeutete dies:

* **Integration heterogener Datenquellen:** Zusammenführung von Daten aus MES (Manufacturing Execution System), ERP, diversen Prüfsoftware-Lösungen (z.B. für optische Vermessung, Rauheitsmessung) und Sensordaten von Maschinen.
* **Schaffung von Datenkontext:** Verknüpfung jedes Prüfdatensatzes mit relevanten Kontextinformationen wie Auftrag, Produktvariante, Materialcharge, verwendeter Maschine, Werkzeugsatz, Bediener und Produktionszeitpunkt.
* **Echtzeit-Transparenz:** Bereitstellung von aussagekräftigen, interaktiven Visualisierungen, die einen schnellen Überblick über die Qualitätslage bieten und Drill-down-Analysen ermöglichen.
* **Ursachenanalyse unterstützen:** Entwicklung von Mechanismen, die die systematische Identifizierung von Fehlerursachen beschleunigen und die Ableitung von Korrekturmaßnahmen erleichtern.
* **Wissensmanagement:** Aufbau einer zentralen Wissensbasis, die gesammelte Erkenntnisse über Fehlerursachen und deren Behebung für zukünftige Fälle nutzbar macht.

### Umsetzung: Ein mehrstufiger Ansatz mit technischer Tiefe

Das interne Projektteam der König Metalltechnik, unterstützt durch externe Data-Science-Experten, entschied sich für einen methodischen, mehrstufigen Ansatz, um diese komplexen Ziele zu erreichen.

#### Phase 1: Aufbau einer zentralen Dateninfrastruktur (Data Lake)

Der Grundstein für die kontextuelle Datenanalyse war die Schaffung einer zentralen, skalierbaren Dateninfrastruktur. Statt eines klassischen Data Warehouses, das starre Schemata erfordert, wählte man einen **Data Lake**-Ansatz.

* **Technologie-Stack:** Als Basis für den Data Lake wurde eine Kombination aus Open-Source-Technologien gewählt. **Apache Kafka** wurde als verteilte Streaming-Plattform implementiert, um Daten von den Quellsystemen in nahezu Echtzeit zu erfassen. Für die langfristige Speicherung und Verarbeitung der Rohdaten kam ein **Hadoop Distributed File System (HDFS)** zum Einsatz, ergänzt durch **Apache Parquet** für die effiziente Speicherung großer tabellarischer Datensätze. Für die Datenverarbeitung und -transformation wurde **Apache Spark** eingesetzt.
* **Konnektoren und ETL-Prozesse:** Spezifische Konnektoren wurden entwickelt, um Daten aus den heterogenen Quellsystemen zu extrahieren:
    * **MES (Manufacturing Execution System):** Über standardisierte APIs und Datenbank-Replikation (z.B. MS SQL Server) wurden Maschinendaten (Produktionszeiten, Stillstände, Werkzeugwechsel), Auftragsstatus und Personalzuordnungen erfasst.
    * **ERP (Enterprise Resource Planning):** SAP Business One diente als Quelle für Auftragsdaten, Materialstammdaten, Lieferanteninformationen und Stücklisten. Hierfür wurden OData-Feeds und direkte Datenbankabfragen genutzt.
    * **Prüfsoftware:** Daten aus verschiedenen Prüfständen (z.B. CAQ-Systeme wie Babtec, spezifische Software für 3D-Koordinatenmessgeräte oder Oberflächenrauheitsmessgeräte) wurden über CSV-Exporte, Datenbank-Views oder spezialisierte Schnittstellen integriert. Hier lag eine besondere Herausforderung in der Normalisierung der unterschiedlichen Datenformate und Maßeinheiten.
* **Daten-Governance und -Qualität:** Frühzeitig wurde ein Konzept für Daten-Governance etabliert, das die Definition von Datenhoheit, Datenstandards und Qualitätssicherungsmaßnahmen umfasste. Automatische Validierungsroutinen wurden implementiert, um fehlende Werte, Ausreißer oder Inkonsistenzen direkt bei der Ingestion zu erkennen und zu protokollieren.

#### Phase 2: Kontextualisierung und Datenmodellierung

Dies war die kritische Phase, in der die losen Datenpunkte miteinander verknüpft und in ein sinnvolles Kontextmodell überführt wurden.

* **Eindeutige Identifikatoren und Master Data Management (MDM):** Die größte Herausforderung bestand darin, eindeutige Verknüpfungen zwischen den verschiedenen Datenquellen herzustellen. Hierfür wurden **globale, eindeutige IDs** für Aufträge, Chargen, Maschinen, Werkzeuge und Produkte eingeführt. Wo diese IDs in den Altsystemen fehlten oder inkonsistent waren, wurden Algorithmen zur Datenbereinigung und -normalisierung entwickelt. Ein leichtgewichtiges MDM-System (z.B. auf Basis einer PostgreSQL-Datenbank mit spezifischen Tabellen für Masterdaten) wurde implementiert, um die Konsistenz dieser Schlüsselattribute zu gewährleisten.
* **Relationale Zuordnung:** Im Data Lake wurden die Rohdaten angereichert. Ein Datensatz einer Prüfung wurde nun nicht mehr nur mit einem Messwert versehen, sondern um folgende Attribute erweitert:
    * `auftrags_id`: Verknüpfung zum Fertigungsauftrag
    * `produkt_id`: Zugehöriges Endprodukt
    * `material_charge_id`: Verwendete Materialcharge
    * `maschine_id`: Maschine, auf der gefertigt wurde
    * `werkzeug_id`: Spezifisches Werkzeug
    * `schicht_id`: Produktionsschicht
    * `bediener_id`: Identifikator des Bedieners
    * `produktionszeitpunkt`: Exakter Zeitstempel der Fertigung
    Diese Verknüpfung erfolgte über SQL-ähnliche Joins oder Spark-Transformationen, basierend auf den Masterdaten und den Zeitstempeln der Ereignisse.

#### Phase 3: Interaktive Visualisierung und explorative Analyse

Um die neuen Erkenntnisse für die Mitarbeiter in QS und Produktion zugänglich zu machen, wurde ein interaktives Dashboard entwickelt.

* **Dashboard-Technologie:** Als Frontend wurde **Tableau** (oder eine vergleichbare Business-Intelligence-Plattform wie Power BI / Looker Studio) gewählt, da es intuitive Drill-down-Funktionen und eine flexible Gestaltung ermöglicht. Die Verbindung erfolgte über den Data Lake (z.B. über Presto oder Hive-Schnittstellen zu HDFS/Parquet).
* **Key Performance Indicators (KPIs):** Das Dashboard zeigte zentrale KPIs wie Ausschussquoten pro Produkt, Maschine, Schicht oder Materialcharge. Trendanalysen über die Zeit ermöglichten das schnelle Erkennen von Verschlechterungen oder Verbesserungen.
* **Interaktive Filter:** Die Benutzer konnten nun mühelos nach verschiedenen Dimensionen filtern (z.B. "Zeige alle Fehler vom Typ X auf Maschine Y in Schicht Z"). Dies ermöglichte eine schnelle Eingrenzung potenzieller Problembereiche.
* **Kausaldiagramme (Ishikawa/Fischgrät-Diagramme):** Ein besonderer Fokus lag auf der Integration einfacher, filterbarer Kausaldiagramme. Zunächst wurden diese Diagramme manuell (oder semi-automatisch durch Vorlagen) im Dashboard erstellt, um die Ursache-Wirkungs-Beziehungen zu visualisieren. In einer späteren Ausbaustufe wurde überlegt, hier Ansätze von **Knowledge Graphs** oder **Graph-Datenbanken** (z.B. Neo4j) zu nutzen, um die komplexen Beziehungen zwischen Fehlerursachen und -wirkungen maschinell besser abbilden und analysieren zu können. Dies würde eine noch präzisere Identifizierung von Root Causes ermöglichen.

#### Phase 4: Integration in den Arbeitsalltag und Schulung

Die beste Technologie ist nutzlos, wenn sie nicht akzeptiert und korrekt angewendet wird.

* **Schulungen:** Umfassende Schulungen wurden für Mitarbeiter der QS, der Produktion und des Managements durchgeführt. Der Fokus lag nicht nur auf der Bedienung des Dashboards, sondern auch auf der Interpretation der Daten und der Ableitung von Maßnahmen.
* **Pilotprojekte:** Das System wurde zunächst in kleineren Pilotbereichen eingeführt und kontinuierlich auf Basis des Feedbacks der Anwender optimiert.
* **Prozessanpassungen:** Die neuen Datenmöglichkeiten führten auch zu einer Anpassung der internen Qualitätsprozesse, von der Fehlererfassung bis zur Ursachenanalyse und Maßnahmenverfolgung.


### Ergebnis: Quantifizierbarer Erfolg und Kulturwandel

Die Implementierung des kontextualisierten Qualitätssystems führte bei der König Metalltechnik GmbH zu beeindruckenden und messbaren Ergebnissen:

* **Reduktion von Qualitätsabweichungen um 18%:** Durch die präzise Identifizierung von Fehlerursachen konnten gezielte Maßnahmen ergriffen werden, die den Ausschuss und die Nacharbeitsquoten signifikant senkten. Beispielsweise konnte festgestellt werden, dass eine bestimmte Kombination aus Materialcharge und Maschinenparameter unter bestimmten Umweltbedingungen zu erhöhten Toleranzabweichungen führte. Diese Erkenntnis führte zur Anpassung von Materialspezifikationen und Prozessparametern.
* **Halbierung der Durchlaufzeit der Ursachenanalyse:** Was früher Tage oder Wochen dauern konnte (manuelles Suchen in verschiedenen Systemen, Abgleich von Protokollen), kann nun innerhalb von Stunden oder Minuten durch Filter und Drill-downs im Dashboard erfolgen. Die QS-Experten konnten ihre Zeit von der Datensuche auf die Problemlösung verlagern.
* **Etablierung neuer Standards für Datennutzung in QS und Produktion:** Das Projekt initiierte einen Paradigmenwechsel. Daten werden nicht mehr als lästige Pflicht, sondern als wertvolles Gut und Entscheidungsgrundlage wahrgenommen. Die Zusammenarbeit zwischen QS und Produktion verbesserte sich erheblich, da beide Abteilungen nun auf einer gemeinsamen, transparenten Datenbasis diskutieren konnten.
* **Gestärktes Vertrauen und proaktives Handeln:** Die Fähigkeit, Fehlerursachen schnell und transparent zu identifizieren, stärkte nicht nur das interne Vertrauen in die eigenen Prozesse, sondern auch das Vertrauen der Kunden in die Lieferfähigkeit und Qualität der König Metalltechnik. Zudem ermöglicht das System nun Ansätze der **Predictive Quality** – durch die Korrelation von Prozessparametern mit Qualitätsmerkmalen können Abweichungen potenziell vorhergesagt werden, noch bevor sie zu Ausschuss führen.

Ein QS-Experte fasste den Wandel treffend zusammen:

„Vorher hatten wir Daten. Jetzt haben wir Antworten. Und das ist der entscheidende Unterschied zwischen reiner Datenerfassung und echter Datenintelligenz. Wir können jetzt sehen, nicht nur *was* passiert ist, sondern *warum* es passiert ist und *wie* wir es zukünftig verhindern können.“

Die König Metalltechnik GmbH hat bewiesen, dass der wahre Wert von Daten in ihrem Kontext liegt. Durch die Schaffung eines intelligenten, vernetzten Systems wurde nicht nur die Qualität verbessert und Kosten gesenkt, sondern auch eine Kultur der datengestützten Entscheidungsfindung etabliert, die das Unternehmen zukunftssicher macht.