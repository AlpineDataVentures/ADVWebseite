---
title: "Case Study: Rückverfolgung per Knopfdruck – so hat ein Hersteller seine QS digitalisiert"
meta_title: "Case Study: Digitale Rückverfolgung und Qualitätskontrolle in der Fertigung"
description: "Wie ein mittelständischer Komponentenhersteller seine Qualitätssicherung vom Papierchaos zur digitalen Rückverfolgbarkeit geführt hat – mit enormem Effekt auf Effizienz und Vertrauen."
image: "/images/casestudies/qs-rueckverfolgung.png"
draft: false
summary: "Von Ordnerbergen zur digitalen Transparenz: Wie ein Hersteller durch die Einführung digitaler Rückverfolgung seine QS revolutionierte – und die Kundenbindung gleich mit."
---

### Ein Anruf, der alles veränderte

„Können Sie uns bitte die Produktionsdaten der Charge 211034B schicken – bis morgen früh?“

Es war einer dieser Anrufe, die keiner will. Ein Kunde hatte eine Rückmeldung zu einem fehlerhaften Bauteil gegeben. Eigentlich kein Drama – wären da nicht die Umstände gewesen:

* Die Rückverfolgung erfolgte **manuell über Papierprotokolle**
* Produktionsdaten lagen in **Excel-Dateien auf Netzlaufwerken**
* Der QS-Leiter hatte Urlaub. Natürlich.

Am Ende saßen drei Leute drei Stunden, um herauszufinden, welche Linie, welcher Mitarbeitende und welches Material im Spiel war. Es war der Moment, in dem klar wurde: **So geht das nicht weiter.**

### Der Kontext: Ein Hersteller zwischen Anspruch und Altlasten

Das Unternehmen – ein familiengeführter Mittelständler mit ca. 400 Mitarbeitenden – produziert Präzisionskomponenten für die Automotive- und Medizintechnikbranche. Qualität war immer hoch priorisiert, aber **die Prozesse dahinter blieben analog**:

* Prüfprotokolle auf Papier
* Rückverfolgbarkeit via Chargenlisten
* Viel Bauchgefühl, wenig Struktur

Dabei waren die Anforderungen der Kunden längst im 21. Jahrhundert angekommen – inklusive **IATF 16949**, regelmäßigen Audits und digitalen Schnittstellenforderungen.

### Der Auftrag: QS digitalisieren, aber bitte praxisnah

Keine Hochglanzlösung mit Beraterarmee, sondern **eine schlanke, funktionierende Architektur**, die:

* **Rückverfolgbarkeit per Knopfdruck ermöglicht**
* **Qualitätsdaten automatisiert erfasst**
* **Schnell durchsuchbar, revisionssicher und auditkonform** ist
* **Im Alltag funktioniert – auch für Mitarbeitende ohne IT-Hintergrund**

### Der Ansatz: Digitalisierung von innen heraus

#### 1. **Erfassung an der Quelle: Tablets statt Klemmbrett**

An allen relevanten Prüfstationen wurden robuste Industrie-Tablets mit Weboberfläche installiert. Die Mitarbeitenden erfassen Prüfdaten (z. B. Maße, Sichtprüfung, OK/NOK) direkt im System – per Dropdown, Touch und Scanner.

**Technologien im Einsatz:**

* React-basierte Prüf-UI
* REST-API zur Übergabe an zentrale QS-Datenbank
* Tablets mit IP65-Schutzklasse, WLAN + Offline-Pufferung

#### 2. **Automatisierte Rückverfolgung über Seriennummern und Auftragsdaten**

Jedes Teil bekommt bei Produktionsstart eine eindeutige Seriennummer (via Lasercode oder Etikett), die an alle Prüfstationen mitwandert. Damit können alle Prüfdaten automatisch **am Bauteil „angehängt“** werden.

**Datenmodell:**

* PostgreSQL mit relationaler Struktur
* Time Series Extension zur Ereignisprotokollierung
* Material- und Personenzuordnung über Fremdschlüssel

#### 3. **Zentrales QS-Cockpit – auf Abruf auditbereit**

Für die Qualitätssicherung wurde ein zentrales Dashboard entwickelt, das Rückverfolgung zum Erlebnis macht:

* Filter nach Charge, Teil, Linie, Zeitraum
* Visuelle Timeline der Prozessschritte und Prüfpunkte
* Export als PDF mit Audit-Header (u.a. QS-Verantwortlicher, Timestamp, Herkunft)

**Visualisierung:** Power BI mit Embedded Service im Intranet

#### 4. **Schnittstelle zum Kundenportal**

Langfristig gedacht: Kunden können sich bei Bedarf direkt Produktions- und Prüfdaten zu gelieferten Chargen anzeigen lassen. DSGVO-konform, zugangsgeschützt und mit einem Plus an Vertrauen.

### Der Effekt: Rückverfolgung, die wirkt

Ein halbes Jahr nach Projektstart zeigte sich die Wirkung:

* **Anfragen zur Rückverfolgung wurden von Ø 2 Stunden auf 30 Sekunden reduziert**
* **Auditaufwände halbiert**, da alles digital vorliegt
* **Kundenvertrauen gestiegen** – durch proaktive, nachvollziehbare Qualitätskommunikation

Ein QS-Mitarbeiter sagte dazu: *„Früher hatte ich Angst vor Rückfragen. Heute freue ich mich fast drauf – weil ich weiß, dass ich liefern kann.“*

### Fazit: Digitalisierung ist kein Selbstzweck – sondern Befreiung

Dieser Hersteller hat gezeigt: Rückverfolgbarkeit ist nicht nur Pflicht, sondern **Wettbewerbsvorteil** – wenn man sie richtig aufzieht. Mit klarer Architektur, einfachen Interfaces und einem Ziel: **Qualität, der man nicht glauben muss, weil man sie belegen kann.**

Und das Beste: **Sie ist jederzeit verfügbar. Mit einem Knopfdruck.**
