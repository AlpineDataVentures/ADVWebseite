---
title: "Case Study: Wie ein Mittelständler durch Zeitdaten die Nachbearbeitung halbiert hat"
meta_title: "Produktivität steigern mit Zeitdaten – ein Praxisbeispiel aus dem Mittelstand"
description: "Wie ein Produktionsbetrieb aus Bayern mit präziser Zeiterfassung, BI-Integration und einem klaren Ziel die Nachbearbeitung in der Fertigung um 50 % reduzieren konnte."
image: "/images/casestudies/zeitdaten-alpenblick.png"
draft: false
summary: "Effizientere Produktion durch clevere Nutzung von Zeitdaten: Wie ein bayrisches Unternehmen die Nachbearbeitungsquote halbiert hat – mit BI-Tools, Shopfloor-Daten und einem klaren Fokus auf Veränderung."
---

### Vom Bauchgefühl zur belastbaren Zahl

Die Sache begann – wie so oft – mit einem mulmigen Gefühl in der Produktionsleitung. Es gab keine Katastrophen, keine Stillstände, keine lauten Beschwerden. Aber auch keinen echten Überblick.

Die Nachbearbeitungskosten in der Fertigung stiegen seit Monaten leicht, aber stetig. Die Fehlerquote? Angeblich unter Kontrolle. Die Maschinenlaufzeiten? Im grünen Bereich. Und trotzdem: *"Irgendwas passt hier nicht."*

Was fehlte, war der Blick auf den Takt der Dinge – im Wortsinn. Also ging der Mittelständler (ein Hersteller von Präzisionsbauteilen mit rund 300 Mitarbeitenden in Oberbayern) das Thema **Zeitdaten** an. Was danach passierte, war nicht nur effizient, sondern auch ziemlich lehrreich.

### Die Frage, die alles verändert hat

*"Woher wissen wir eigentlich, wie lange ein Teil wirklich braucht – und warum?"*

Diese eine Frage löste eine interne Welle aus. Denn während Auftragsdaten, Stückzahlen und Ausschussquoten verfügbar waren, blieb eine zentrale Größe diffus: **die tatsächliche Bearbeitungszeit je Arbeitsschritt.**

Klar, es gab ein MES (Manufacturing Execution System). Und natürlich wurde dort auch irgendetwas zum Thema Zeit erfasst. Aber diese Daten lagen tief vergraben, wenig strukturiert und ohne klaren Bezug zu den BI-Reports der Unternehmensleitung.

Also wurde aufgeräumt. Mit Technik. Und mit Haltung.

### Die Lösung: Drei Komponenten, ein Ziel

#### 1. **Detaillierte Zeiterfassung auf dem Shopfloor**

Zuerst wurde das bestehende MES angebunden und durch gezielte **Erweiterungen in der BDE (Betriebsdatenerfassung)** aufgewertet. Mitarbeitende an Maschinen konnten per Touch-Terminal den Start, Unterbruch und Abschluss eines jeden Bearbeitungsschritts erfassen – automatisiert ergänzt durch Sensorwerte (z. B. Maschinenlaufzeit, Stillstand, Störung).

Verwendete Technologien:
- **MES**: Forcam Force MES
- **Industrie-PCs** mit RFID-Login
- **Sensorintegration via OPC UA** zur Maschinenzustands-Erfassung

#### 2. **BI-Integration mit Echtzeit-Datenfluss**

Im zweiten Schritt wurde die zentrale BI-Plattform – basierend auf **Microsoft Power BI** und einem **Azure SQL Datawarehouse** – direkt mit dem MES verheiratet. Keine täglichen Exporte mehr, keine Excel-Zwischenwelt. Stattdessen: **nahezu Echtzeit-Auswertungen** der Bearbeitungszeiten je Teil, Auftrag und Mitarbeitergruppe.

Key Features:
- Power BI Dashboards mit Drilldown auf Arbeitsschritte
- KPI-Monitoring: Bearbeitungszeit vs. Sollzeit
- Ursachenanalyse von Zeitabweichungen

#### 3. **Feedbackschleifen & Change Management**

Die Daten allein bewirken wenig, wenn sie nicht *besprochen* werden. Daher wurden **wöchentliche Shopfloor-Meetings** eingeführt, in denen Teams gemeinsam ihre Kennzahlen sichteten. Dabei half ein einfaches Prinzip: *Nicht die Abweichung ist das Problem – sondern das Nichterklärenkönnen.*

Die Folge: Mitarbeitende begannen selbst, Muster zu erkennen. Werkzeuge wurden besser vorbereitet, Umrüstungen verkürzt, Transportwege optimiert. Und bei bestimmten Fertigungsschritten stellte man schlicht fest: Die geplante Zeit war von Anfang an zu sportlich.

### Das Ergebnis: 52 % weniger Nachbearbeitung in 6 Monaten

Nach einem halben Jahr zeigte sich ein klarer Trend:
- Die **durchschnittliche Nachbearbeitungsquote** sank von 7,8 % auf **3,7 %**
- Der **Ausschuss** blieb stabil – das Problem lag also nicht in der Qualität, sondern in der **Effizienz der Erstbearbeitung**
- Die **Transparenz über Bearbeitungszeiten** half, besser zu planen, zu disponieren – und Mitarbeitende gezielter zu schulen

Die Projektleitung brachte es in der Retrospektive auf den Punkt:  
*"Früher wussten wir nur, dass es klemmt. Jetzt wissen wir wann, wo – und meistens auch warum."*

### Warum das Ganze mehr war als ein Tool-Projekt

Technologie war wichtig. Aber entscheidend war die Veränderung im Kopf. Der Gedanke, dass **Zeit eine Kennzahl mit Aussagekraft** ist – und nicht nur eine Pflichtangabe für die Lohnabrechnung.

Der Mittelständler hat mit überschaubarem Aufwand und vorhandenen Systemen einen echten Effizienzhebel aktiviert. Ohne Beraterarmee, ohne Millionenbudget, aber mit klarem Fokus und dem Mut, **Zeit nicht mehr zu verschwenden – auch nicht bei der Analyse.**

---

Du willst mehr solcher Use Cases sehen – oder deine eigene Effizienz auf den Prüfstand stellen?  
Dann melde dich gern bei uns. Vielleicht ist dein Bauchgefühl ja gar nicht so falsch.

**Stichwort: Zeit ist keine Schätzung.**
