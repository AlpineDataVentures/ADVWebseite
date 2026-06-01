---
title: "Data Warehouse aufbauen: Cloud, On-Prem oder Hybrid?"
meta_title: "Data Warehouse aufbauen: Cloud, On-Prem oder Hybrid? Eine ehrliche Entscheidungshilfe"
description: "Cloud klingt modern, On-Prem klingt sicher, Hybrid klingt nach dem besten aus beiden Welten. Wir erklären welche Architektur für welches Unternehmen wirklich passt — und warum die Antwort meistens einfacher ist als gedacht."
date: 2026-06-01T08:30:00Z
image: "/images/blog/how-to-dwh.png"
categories: ["Data Architecture"]
author: "Ben Diez"
tags: ["Data Warehouse", "Cloud", "On-Premises", "Azure", "Data Engineering", "Data Infrastructure", "Digitale Souveränität"]
draft: false
summary: "On-Prem, Cloud oder Hybrid — bevor Thalberg auch nur eine Zeile baut, muss diese Frage beantwortet sein. Wir zeigen welche Kriterien wirklich zählen und warum der Praktikant mit seinem Server-Vorschlag diesmal nicht weitergekommen ist."
---

*Teil 4 unserer Serie über den kompletten Aufbau eines datengetriebenen Unternehmens [Teil 3 lesen](/https://alpinedata.de/blog/7-zeichen-datenbasis/)*

Der Datenbasis-Audit ist abgeschlossen. Thalberg weiß jetzt wo die Probleme liegen, wer die Daten hält, wer nicht rankommt und auch, wo der Praktikant aufgeräumt hat. Der nächste Schritt scheint klar: ein **Data Warehouse**.

Und sofort stellt jemand die Frage, die erfahrungsgemäß in 9 von 10 Fällen als erstes kommt, oft bevor wirklich verstanden wurde worum es geht: *"Können wir nicht einfach Azure nehmen?"*

Bevor wir daher zur Architekturentscheidung kommen, lohnt es sich noch einmal einen Schritt zurückzugehen.

### Was ein Data Warehouse eigentlich
Ein Data Warehouse ist eine zentrale Datenbasis, die Daten aus verschiedenen Quellsystemen zusammenführt, bereinigt und für Auswertungen bereitstellt. Es ersetzt weder das ERP noch das CRM, sondern ermöglicht die Nutzung von deren Daten zu Analysezwecken. Dabei arbeitet ein Data Warehouse ausschließlich mit strukturierten Daten, d.h. Daten die wie eine große Exceltabelle in einem definierten Format vorliegen, zum Beispiel Tabellen mit klar benannten Spalten und einheitlichen Datentypen. Eine Umsatztabelle mit Datum, Kunde und Betrag ist strukturiert. Ein PDF-Angebot, eine E-Mail oder ein Sprachprotokoll vom Außendienst sind es nicht.

Der Unterschied zum **direkten Reporting** aus dem ERP: Das ERP ist für Transaktionen gebaut, nicht für Analysen. Wer komplexe Auswertungen direkt daraus zieht, bremst das System und bekommt trotzdem oft nicht was er braucht, weil die Datenstruktur nicht für analytische Fragen optimiert ist.

Der Unterschied zum **Data Lake**: Ein Data Lake speichert alles, roh und unstrukturiert, und überlässt die Interpretation demjenigen, der die Daten später nutzt. Das ist mächtig, aber es setzt voraus dass jemand mit diesen rohen Daten umgehen kann. Für Thalberg fällt die Wahl deshalb auf ein klassisches Data Warehouse: die Anforderungen sind klar strukturiert und die Nutzer brauchen konkrete Berichte.

### Die drei Optionen im Überblick
Wer ein Data Warehouse aufbauen will, stößt früher oder später auf dieselbe Grundsatzfrage: **Wo soll das Ding eigentlich laufen?** 

Grob gibt es drei Antworten:

- **On-Premises** bedeutet: die Hardware steht im eigenen Rechenzentrum oder Serverraum, wird von der IT betrieben und gewartet. Der Vorteil ist die volle Kontrolle über die Daten, allerdings zum Preis der vollen Verantwortung für sämtliche Securitythemen etc.
- **Cloud** bedeutet: die Infrastruktur liegt bei einem Anbieter wie Microsoft Azure, AWS oder Google Cloud. Man mietet Rechenleistung und Speicher, der Anbieter kümmert sich um Betrieb, Updates und Verfügbarkeit. Gezahlt wird nach tatsächlicher Nutzung.
- **Hybrid** bedeutet: eine Kombination aus beidem. Bestimmte Daten oder Workloads bleiben On-Premises, andere wandern in die Cloud. Das klingt nach dem besten aus beiden Welten, bedeutet in der Praxis allerdings oft eher das komplexeste aus beiden Welten.

### Was die Entscheidung wirklich beeinflusst
Auf die Frage, welche Lösung die richtige ist, gibt keine universell richtige Antwort. Es gibt jedoch Kriterien, die die Entscheidung erheblich vereinfachen.

- **IT-Kapazität**: Wer kein dediziertes IT-Team hat das Server betreiben, warten und absichern kann, hat mit On-Premise ein dauerhaftes Ressourcenproblem. Der Umzug in die Cloud kann diese Last spürbar abfedern.
- **Datenschutz und Compliance**: Bestimmte Branchen und Datentypen unterliegen strengen Anforderungen. Wer sensitive Daten nicht in eine Public Cloud geben darf oder will, hat weniger Spielraum. Wobei: die großen Cloud-Anbieter haben inzwischen europäische Rechenzentren und umfangreiche Compliance-Zertifizierungen.
- **Digitale Souveränität**: Wer seine Daten nicht in der Hand amerikanischer Hyperscaler wissen will, hat dafür zunehmend gute Gründe. Vertragsklauseln, der Cloud Act der US-Behörden theoretisch Zugriff auf Daten amerikanischer Anbieter ermöglicht, und eine wachsende geopolitische Unsicherheit lassen manche Unternehmen bewusst auf europäische Anbieter oder On-Premises setzen. Das ist eine legitime Risikoabwägung. Wer diesen Weg geht, sollte sich allerdings bewusst sein dass europäische Alternativen in Funktionsumfang und Reife oft noch nicht mit Azure, AWS oder GCP mithalten können.
- **Budget**: On-Premises bedeutet hohe Anfangsinvestitionen in Hardware, Cloud bedeutet laufende Betriebskosten. Welches Modell günstiger ist, hängt von Größe und Nutzungsintensität ab. Für die meisten Mittelständler ist Cloud mittelfristig günstiger, weil keine teure Hardware angeschafft und gewartet werden muss.
- **Skalierungsbedarf**: Wächst das Unternehmen, wachsen die Datenmengen. Cloud skaliert flexibel, On-Premises erfordert neue Hardware.
- **Bestehende Infrastruktur**: Wer bereits in Microsoft-Produkte investiert hat, hat mit Azure einen natürlichen Startpunkt. Wer auf Google Workspace setzt, schaut eher in Richtung BigQuery. Bestehende Verträge und Kenntnisse sind ein legitimes Entscheidungskriterium.

### Wann was sinnvoll ist
Für einen Mittelständler mit kleiner IT-Abteilung, klaren Reporting-Anforderungen und ohne spezifische Datenschutzhürden ist Cloud fast immer die richtige Wahl. Sie ist schneller aufzusetzen, einfacher zu betreiben und flexibel skalierbar.

On-Premises macht Sinn wenn eine leistungsfähige IT-Abteilung vorhanden ist, bestehende Hardware genutzt werden soll, regulatorische Anforderungen einen bestimmten Datenspeicherort vorschreiben, oder wenn die Abhängigkeit von amerikanischen Anbietern ein echtes Risiko darstellt das man nicht eingehen will.

Hybrid ist eine legitime Option für Unternehmen die bereits On-Premises-Investitionen haben, die noch nicht abgeschrieben sind, aber gleichzeitig von Cloud-Diensten profitieren wollen. Als Einstiegsmodell empfiehlt es sich nicht.

### Was Thalberg entscheidet
Thalberg geht in die Cloud. Genauer gesagt: Microsoft Azure mit einem Azure Synapse Analytics Warehouse. Der Hauptgrund hier ist recht simpel: die IT-Abteilung besteht aktuell aus zwei Personen, die bereits vollständig ausgelastet sind. Zudem nutzt Thalberg bereits Microsoft 365 und niemand möchte einen Server kaufen, in einen Schrank stellen und die nächsten fünf Jahre betreiben.

Der Praktikant hatte On-Premises vorgeschlagen. Er hatte irgendwo gelesen dass man damit "mehr Kontrolle" hat, und er hatte außerdem schon mal einen Server gesehen. Sein Vorschlag wurde freundlich zur Kenntnis genommen.

### Was als nächstes kommt
Das Warehouse steht, zumindest architektonisch. Jetzt müssen die Daten rein. Aus dem CRM, aus dem ERP und den Excel-Listen die immer noch zahlreich vorhanden sind.
Nächste Woche: ETL von A bis Z. Wie Daten aus verschiedenen Quellen ins Warehouse kommen, welche Tools dabei helfen, und warum Datenbereinigung das unterschätzte Herzstück des ganzen Projekts ist.