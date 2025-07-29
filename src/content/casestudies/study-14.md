---
title: "Von Patchwork zu Panorama: Wie ein Mittelständler seine Datenlandschaft entschlüsselte"
meta_title: "Case Study: Datenlandkarte für Klarheit und Steuerbarkeit in der Food-Branche"
description: "Ein Lebensmittelhersteller aus Oberschwaben räumt mit unklaren Systembeziehungen auf. Das Ergebnis: eine unternehmensweite Datenlandkarte mit Zuständigkeiten, Schnittstellen und echten Aha-Momenten."
image: "/images/casestudies/Panorama.png"
draft: false
summary: "Ein süddeutscher Hersteller aus der Lebensmittelbranche bringt Struktur in seine IT- und Datenlandschaft. Mit einer visuell aufbereiteten Datenlandkarte wird klar, wie alles zusammenhängt – und wo es bisher hakte."
---

In der heutigen digitalen Wirtschaft sind Daten das Rückgrat jedes Unternehmens. Doch insbesondere in etablierten mittelständischen Unternehmen, die über Jahrzehnte gewachsen sind, gleicht die IT-Landschaft oft einem unübersichtlichen Flickenteppich. Systeme wurden ad-hoc eingeführt, Schnittstellen organisch gewachsen und Zuständigkeiten blieben vage. Die SchwabenSnack GmbH, ein renommierter Hersteller von Tiefkühlprodukten für den Lebensmitteleinzelhandel, sah sich genau dieser Herausforderung gegenüber. Ihre Reise, diese komplexe "Patchwork-Landschaft" in ein klares "Panorama" zu verwandeln, bietet wertvolle Einblicke für andere Unternehmen, die vor ähnlichen Problemen stehen.

---

### Ausgangslage: Die unübersichtliche Systemwelt der SchwabenSnack GmbH

Die SchwabenSnack GmbH hatte über die Jahre hinweg eine beeindruckende Produktpalette und eine starke Marktposition aufgebaut. Parallel dazu war ihre IT-Infrastruktur organisch gewachsen, um den steigenden Anforderungen gerecht zu werden. Ein zentrales Enterprise Resource Planning (ERP)-System bildete zwar das Herzstück, wurde aber durch eine Vielzahl von Insellösungen ergänzt: ein separates Lagerverwaltungssystem (LVS), spezialisierte QS-Tools für die Qualitätssicherung und Rückverfolgbarkeit, Systeme für Produktionsplanung und -steuerung (MES), aber auch zahlreiche, individuell entwickelte Excel-Lösungen und Access-Datenbanken für spezifische Abteilungsbedürfnisse.

Das Kernproblem war nicht das Fehlen von Daten oder Systemen, sondern die **mangelnde Transparenz und die fehlenden klaren Beziehungen** zwischen ihnen. Niemand im Unternehmen hatte eine vollständige Übersicht darüber, welche Daten wo gespeichert wurden, wer für deren Pflege und Qualität verantwortlich war (Stichwort **Data Ownership**), und wie die Daten tatsächlich zwischen den verschiedenen Systemen flossen. Neue Projekte stießen regelmäßig auf unerwartete Systemabhängigkeiten, Doppel- oder Dreifacherfassungen von Daten waren an der Tagesordnung, und bei Fehlern in den Daten war die Ursachenforschung langwierig und frustrierend. Die IT-Abteilung verbrachte einen Großteil ihrer Zeit damit, Brände zu löschen, anstatt strategische Initiativen voranzutreiben. Die mangelnde Dokumentation führte zu einer hohen Abhängigkeit von Einzelwissen und erschwerte die Einarbeitung neuer Mitarbeiter erheblich.

---

### Zielsetzung: Von der Ungewissheit zur gesteuerten Transparenz

Angesichts dieser Ausgangslage formulierte die SchwabenSnack GmbH eine klare und umfassende Zielsetzung für das Projekt "Datenlandkarte":

* **Vollständige Erfassung und Klassifizierung:** Eine lückenlose Bestandsaufnahme aller relevanten IT-Systeme und ihrer Funktionen im Unternehmen.
* **Visuelle Darstellung von Datenflüssen und Schnittstellen:** Schaffung einer intuitiven, grafischen Übersicht, die zeigt, wie Daten zwischen Systemen ausgetauscht werden, und dabei auch kritische Abhängigkeiten aufzeigt.
* **Definition von Datenverantwortung (Data Ownership):** Klare Zuweisung von Verantwortlichkeiten für die Pflege, Qualität und Gültigkeit spezifischer Datenobjekte (z.B. Kundenstammdaten, Artikelstammdaten, Chargeninformationen).
* **Bewertung der Datenqualität:** Eine systematische Einschätzung der Datenqualität an den Schnittstellen und in den Quellsystemen, um Problembereiche zu identifizieren.
* **Aufbau eines "Living Data Atlas":** Etablierung eines Prozesses und einer Infrastruktur, um die erstellte Datenlandkarte nachhaltig zu pflegen und aktuell zu halten, sodass sie ein dynamisches Werkzeug und keine einmalige Momentaufnahme wird.
* **Grundlage für strategische Entscheidungen:** Bereitstellung einer verlässlichen Basis für zukünftige IT-Projekte, Systemintegrationen oder -ablösungen.

---

### Umsetzung: Ein methodischer Sprint zur Datenklarheit

Die SchwabenSnack GmbH entschied sich für einen intensiven, fokussierten 8-wöchigen Projektsprint, um die Datenlandkarte zu entwickeln. Das Projektteam setzte sich aus Vertretern der IT, der Fachabteilungen (Produktion, QS, Einkauf, Vertrieb) und externen Experten für Enterprise Architecture Management (EAM) zusammen.

#### Phase 1: Systeminventur und Klassifizierung (Woche 1-2)

* **Identifikation aller Systeme:** Zunächst wurden in Workshops und durch Interviews mit den Fachabteilungen *alle* im Einsatz befindlichen IT-Systeme erfasst. Dies umfasste nicht nur offizielle Lösungen wie SAP ERP oder das LVS, sondern auch weniger offensichtliche, aber kritische Anwendungen wie Excel-gestützte Produktionsplaner, Access-Datenbanken für Rezepturverwaltung oder externe Cloud-Dienste für CRM.
* **Kategorisierung und Steckbriefe:** Jedes System erhielt einen "Steckbrief", der folgende Informationen umfasste:
    * **Systemtyp:** (z.B. ERP, MES, LVS, CAQ, BI, DMS)
    * **Primäre Funktion:** Was leistet das System primär?
    * **Hauptnutzer:** Welche Abteilungen nutzen das System primär?
    * **Technologie:** (z.B. .NET-Anwendung, Java-basiert, Cloud-Service, Datenbank-Typ)
    * **Lizenzmodell / Betreiber:**
    * **Kritikalität:** Bewertung der Bedeutung des Systems für den Geschäftsbetrieb (z.B. "kritisch", "wichtig", "unterstützend").
* **Tools und Techniken:** Für die Erfassung und Verwaltung dieser Metadaten wurde ein spezialisiertes EAM-Tool (z.B. LeanIX, Ardoq oder eine Eigenentwicklung auf Basis eines Wiki-Systems wie Confluence mit strukturierten Seiten) eingesetzt.

#### Phase 2: Schnittstellen- und Datenflussanalyse (Woche 3-5)

Dies war die aufwendigste, aber auch erkenntnisreichste Phase.

* **Workshop-Reihen zur Datenreise:** In gezielten Workshops wurden End-to-End-Prozesse (z.B. "vom Auftrag zum Versand") analysiert, um die Reise kritischer Datenobjekte durch die Systemlandschaft zu verfolgen. Fragen waren: Wo entstehen Daten? Welches System ist die "führende" Instanz für ein bestimmtes Datum? Wohin fließen sie und warum?
* **Identifikation von Schnittstellen:** Jede Schnittstelle zwischen Systemen wurde dokumentiert:
    * **Technologie:** (z.B. Dateiaustausch (CSV, XML), API-Aufrufe (REST, SOAP), Datenbank-Direktzugriffe, EDI)
    * **Frequenz:** (z.B. Echtzeit, stündlich, täglich, manuell)
    * **Datenvolumen:** Geschätztes Volumen der ausgetauschten Daten.
    * **Datenobjekte:** Welche spezifischen Daten (z.B. Artikelnummern, Bestellmengen, Qualitätsparameter) werden ausgetauscht?
* **Visualisierung der Datenflüsse:** Für die visuelle Darstellung wurden spezialisierte Diagramm-Tools (z.B. Microsoft Visio, draw.io oder direkt im EAM-Tool) verwendet. Es wurden sowohl hoch-levelige Architekturübersichten als auch detaillierte Datenflussdiagramme für einzelne kritische Prozesse erstellt. Die **Ampelbewertung zur Datenqualität** wurde direkt in diese Diagramme integriert, indem Schnittstellen farblich markiert wurden:
    * **Grün:** Hohe Datenqualität, verlässlich.
    * **Gelb:** Bekannte Schwachstellen, manuelle Nachbearbeitung erforderlich oder gelegentliche Fehler.
    * **Rot:** Häufige Datenfehler, manuelle Eingriffe, hohes Risiko.
* **Dokumentation von Redundanzen und Medienbrüchen:** Hier wurden Doppel- oder Dreifacherfassungen identifiziert sowie Medienbrüche (z.B. Daten werden ausgedruckt und manuell in ein anderes System eingegeben) festgehalten.

#### Phase 3: Rollenverteilung und Data Ownership (Woche 6-7)

* **Identifikation von Datenobjekten:** Kritische Datenobjekte (z.B. Kundenstammdaten, Artikelstammdaten, Chargennummern, Prüfparameter, Lieferantenstammdaten, Rezepturen) wurden definiert.
* **Zuweisung von Data Owners:** Für jedes dieser Datenobjekte wurde ein **Data Owner** festgelegt – eine Person oder Abteilung, die für die Definition, Pflege und Qualität des Datenobjekts über alle Systeme hinweg verantwortlich ist. Dies war ein entscheidender Schritt zur Etablierung von **Data Governance**.
* **Definition von Daten-Nutzungskontexten:** Es wurde dokumentiert, welche Abteilungen welche Datenobjekte zu welchem Zweck nutzen dürfen und welche Einschränkungen (z.B. Datenschutz, Zugriffsrechte) dabei gelten.

#### Phase 4: Einführung eines "Living Data Atlas" (Woche 8)

* **Tool-Auswahl und Implementierung:** Die gesamte Dokumentation (Systemsteckbriefe, Schnittstellenbeschreibungen, Datenflüsse, Data Owners) wurde in einem zentralen, webbasierten Tool zugänglich gemacht. Die Wahl fiel auf eine Kombination aus dem EAM-Tool und einem Unternehmens-Wiki, um eine einfache Pflege und Zugänglichkeit für alle Mitarbeiter zu gewährleisten.
* **Definition von Pflegeprozessen:** Es wurden klare Prozesse und Verantwortlichkeiten definiert, wer den "Living Data Atlas" bei Systemänderungen, neuen Schnittstellen oder Änderungen in der Data Ownership aktualisiert. Regelmäßige Review-Meetings wurden etabliert.
* **Schulung und Kommunikation:** Umfassende Schulungen für Schlüsselmitarbeiter in allen relevanten Abteilungen wurden durchgeführt. Der Nutzen des Data Atlas wurde aktiv kommuniziert, um die Akzeptanz zu fördern.

---

### Ergebnis: Die Datenlandschaft wird zur strategischen Ressource

Das 8-wöchige Projekt hatte weitreichende positive Auswirkungen auf die SchwabenSnack GmbH und transformierte ihre Herangehensweise an IT und Datenmanagement grundlegend:

* **Vollständige Übersicht über 21 Systeme und 47 Schnittstellen:** Erstmals hatte das Unternehmen eine transparente und visualisierte Landkarte seiner gesamten IT-Infrastruktur. Dies schloss auch die Schatten-IT (wie die erwähnten Excel-Lösungen) mit ein, was die Risikobewertung erheblich verbesserte.
* **Deutlich reduzierte Systemabhängigkeiten in neuen Projekten:** Mit der klaren Übersicht konnten neue Projekte von Anfang an besser geplant werden. Unerwartete Abhängigkeiten wurden frühzeitig erkannt und vermieden, was zu schnelleren Implementierungszyklen und geringeren Projektkosten führte. Die Notwendigkeit der Integration wurde exakt bewertet, und die Auswahl neuer Tools konnte gezielter erfolgen.
* **Klare Ownership-Strukturen für Datenobjekte etabliert:** Die Einführung von Data Owners eliminierte die bisherige Unklarheit bezüglich der Datenverantwortung. Dies führte zu einer signifikanten Verbesserung der Datenqualität, da nun klar war, wer bei Fehlern oder Inkonsistenzen angesprochen werden musste und wer für die Korrektur zuständig war. Die Diskussionen um die "richtige" Datenquelle gehörten der Vergangenheit an.
* **Identifikation von Effizienzpotenzialen:** Die Datenlandkarte zeigte deutlich auf, wo Redundanzen, Medienbrüche und ineffiziente manuelle Prozesse bestanden. Dies ermöglichte es der SchwabenSnack GmbH, gezielt Optimierungsprojekte anzustoßen, um diese Engpässe zu beseitigen.
* **Verbessertes Risikomanagement:** Die Transparenz über Systemkritikalität und Schnittstellenrisiken ermöglichte ein proaktiveres Risikomanagement, insbesondere im Hinblick auf IT-Sicherheit und Disaster Recovery.
* **Kulturwandel in der IT und den Fachabteilungen:** Das Projekt förderte eine Kultur der Zusammenarbeit und des Verständnisses zwischen IT und den Fachabteilungen. Die Fachbereiche erkannten den Wert von strukturierten Daten, und die IT konnte ihre Dienstleistungen besser auf die tatsächlichen Geschäftsanforderungen ausrichten.

Der Projektleiter fasste den tiefgreifenden Wandel prägnant zusammen:

„Früher war unsere IT ein Flickenteppich, aus vielen einzelnen Stücken ohne echtes Muster. Wir haben ständig versucht, ein Loch hier und ein Loch dort zu stopfen. Heute ist sie ein nachvollziehbares Netz – wir wissen genau, welche Fäden wo verbunden sind, wo die Belastungspunkte sind und wo wir ansetzen müssen, um etwas zu verbessern. Das hat uns nicht nur Transparenz gebracht, sondern unsere gesamte IT-Strategie und damit das Unternehmen endlich steuerbar gemacht.“

Die SchwabenSnack GmbH hat mit diesem Projekt nicht nur eine technische Herausforderung gemeistert, sondern einen grundlegenden Schritt in Richtung **Data Governance** und **digitaler Reife** vollzogen. Der "Living Data Atlas" ist nun ein unverzichtbares Werkzeug, das die Grundlage für zukünftiges Wachstum und kontinuierliche Prozessoptimierung bildet.