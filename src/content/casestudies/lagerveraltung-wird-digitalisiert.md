---
title: "Endlich ist klar, wie voll das Lager ist"
meta_title: "Digitale Lagerplatzverwaltung mit Qlik Sense in der Pharma-Logistik"
image: "/images/casestudies/lagerverwaltung-wird-digitalisiert.jpg"
draft: false
description: "Wie ein Pharmagroßhändler mit einer visuellen Lagerkarte in Qlik Sense endlich einen echten Überblick über sein Hochregallager bekam, als Grundlage für Reichweitenanalyse und Produktionsplanung."
summary: "Bei einem Pharmagroßhändler ließ sich eine einfache Frage nicht beantworten: wie voll ist das Lager eigentlich, und wo ist noch Platz? Wir haben aus den vorhandenen SAP-Daten eine visuelle Lagerkarte in Qlik Sense gebaut, die das Hochregallager wie eine geografische Karte zeigt, inklusive Füllgraden je Lagerplatz."
---

### Ausgangslage

Unser Kunde, ein Großhändler für Pharmaprodukte, verwaltete sein Lager über SAP. Wollte jemand wissen, wie voll ein bestimmter Bereich gerade ist, half das System kaum. Es gab jahrelange Erfahrung, welches Produkt ungefähr wo liegt. Eine Antwort auf einen Blick gab es nicht das hieß, wer sicher gehen wollte, musste aufstehen und selbst im Gang nachschauen.

Das wäre kein Problem gewesen, Wäre dieses Vorgehen die Ausnahme geblieben. Es war aber der Standard. Eine SAP-Abfrage bestätigte höchstens, dass ein Material irgendwo verbucht war. Ob der Platz noch frei war, blieb offen. Wie voll eine Palette wirklich war, auch. Und ob eine Charge in den nächsten Wochen ablief, bevor sie überhaupt gebraucht wurde, wusste auch niemand auf Anhieb.

Am teuersten wurde das bei den kleinen Dingen. Eine Restmenge, kaum noch etwas wert, blockierte trotzdem einen kompletten Lagerplatz. Monat für Monat, bis jemand zufällig draufstieß. Einkauf und Produktionsplanung liefen unterdessen eher auf Erfahrungswerten als auf Zahlen. Nicht aus Bequemlichkeit: eine verlässliche Zahl zu Bestand und Reichweite zu bekommen, kostete schlicht mehr Aufwand, als jemand nebenbei leisten konnte.

### Vorgehen

Am Anfang stand eine Entscheidung, nicht ein Tool: SAP sollte führendes System bleiben es sollte auf keinen Fall ein Parallelsystem entstehen, dem am Ende weniger vertraut wird als dem Original. Stattdessen war eine neue Sicht auf dieselben Daten das Ziel.

Wir haben die vorhandenen SAP-Daten aufbereitet. Die Datenflüsse liefen über Alteryx. Daraus haben wir in Qlik Sense eine visuelle Lagerkarte gebaut: das komplette Hochregallager mit seinen Lagerplätzen und Ebenen, dargestellt wie eine geografische Karte statt wie eine Tabelle. Wer wissen will, wo etwas liegt, schaut jetzt auf eine Karte statt in eine Ergebnisliste.

Damit die Karte mehr zeigt als nur *belegt* oder *frei*, haben wir **Füllgrade** berechnet: wie stark ein Platz oder eine Palette tatsächlich ausgelastet ist, wie viel Restkapazität dort noch steckt. Eben dieser erwähnte, halbleere, durch eine Restmenge blockierte Platz wird damit zum ersten Mal sichtbar. Vorher fiel er bei der Größe des Lagers niemandem auf.

### Ergebnisse

Wer heute wissen will, wie voll das Lager ist, muss nicht mehr in den Gang gehen und nachsehen. Ein Blick auf die Karte reicht. Restmengen und bald ablaufende Chargen fallen auf, bevor sie zum Problem werden. Blockierte Lagerplätze werden gezielt bereinigt, nicht mehr übersehen.

Die Karte blieb nicht stehen, wo sie anfing. Sie wurde zur Grundlage für alles, was danach kam. Eine Reichweitenanalyse zeigt heute, wie lange ein Bestand für die geplante Produktion reicht. Die Produktionsvorbereitung greift auf dieselben Daten zu. Die Chargenrückverfolgung nutzt dieselbe saubere Zuordnung von Material zu Lagerplatz. 

Den Anwendern musste niemand die Karte aufzwingen. Sie fanden sie von Anfang an besser als das, was sie vorher hatten.