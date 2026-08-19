---
title: "10 Wochen, ein Datenprojekt: Die wichtigsten Learnings"
meta_title: "Data Project Recap: 5 Learnings aus 10 Wochen Datenprojekt im Mittelstand"
description: "KPIs definiert, DWH aufgebaut, ETL läuft, DSB und ISB an Bord. Was Thalberg in zehn Wochen erreicht hat, was schiefgelaufen ist und warum das Projekt jetzt erst richtig beginnt."
date: 2026-08-19T08:30:00Z
image: "/images/blog/10-week-data-recap.png"
categories: ["Data Strategy"]
author: "Ben Diez"
tags: ["Data Strategy", "Data Governance"]
draft: false
summary: "Zehn Wochen sind vergangen seit Thalberg beschlossen hat das Datenchaos zu beenden. Eine ehrliche Bestandsaufnahme über die fünf wichtigsten Learnings."
---

*Teil 11 unserer Serie über den kompletten Aufbau eines datengetriebenen Unternehmens [Teil 10 lesen](/blog/identity-access-management/)*

Zehn Wochen sind vergangen seit Thalberg beschlossen hat, das Datenchaos zu beenden. Kein großes Finale, kein Konfetti, kein Clown, der aus einer Torte springt. Der Geschäftsführer sitzt an seinem Schreibtisch, schaut auf eine Liste mit offenen Punkten und stellt fest, dass sie länger ist als vor zehn Wochen (Clowntorte mitgerechnet).

Das ist kein schlechtes Zeichen. Wer anfängt hinzuschauen, findet mehr als er erwartet hat. Das ist der Punkt.

>Und noch ein kurzer Disclaimer zur Erwartungshaltung: Was Thalberg in zehn Wochen angestoßen hat, dauert in der Realität deutlich länger. Datenprojekte dieser Breite brauchen in der Praxis eher sechs bis zwölf Monate bis die ersten Ergebnisse wirklich belastbar sind, vorausgesetzt, dass alle mitziehen und keine größeren Überraschungen auftauchen. Thalberg ist eine verdichtete Version der Realität, kein Sprint-Versprechen.

### Was erreicht wurde: die Fakten

Fassen wir einmal zusammen, was in den letzen 10(-ish) Wochen so alles passiert ist:

Thalberg weiß jetzt, was es messen will. Sieben KPIs für die Geschäftsführung, ein separates Cockpit für den Vertrieb, drei Nutzergruppen mit drei verschiedenen Dashboard-Ansichten. Rückblickend klingt das alles selbstverständlich, war es vorher aber nicht.

Die Datenbasis wurde zum ersten Mal ehrlich angeschaut. Das Ergebnis war ernüchternd: vier von sieben Warnsignalen aus [Post 3](/blog/7-zeichen-datenbasis/) haben zugetroffen. Darauf folgte die Architekturentscheidung für ein Cloud-basiertes Data Warehouse, eine laufende ETL-Pipeline mit angebundenem CRM und ERP, und eine Datenbereinigung die länger gedauert hat als geplant.

Parallel dazu wurde Compliance von einem abstrakten Begriff zu einer konkreten Aufgabe. Ein Datenschutzbeauftragter ist an Bord, die DSGVO-Grundlagen sind gelegt, die NIS2-Betroffenheit ist geklärt. Thalberg fällt als Getränkehersteller unter Anlage 2. Ein Informationssicherheitsbeauftragter ist bestellt, IAM ist in Arbeit.

Fertig ist davon eigentlich noch nichts, aber es ist angestoßen. Das ist mehr als die meisten Unternehmen in einem Jahr erreichen.

### Was schiefgelaufen ist: die ehrliche Version

- Der Datenschutzbeauftragte kam zu spät. Er hätte von Anfang an dabei sein sollen, nicht erst nach dem ersten Pipeline-Run, wenn die Daten bereits fließen. Die Frage "dürfen wir das eigentlich?" gehört grundsätzlich an den Anfang eines Datenprojekts, nicht in die Mitte. Das hat Thalberg ein paar Wochen Nachsitzen gekostet.

- Das Wunschkonzert beim Dashboard-Workshop hat länger gedauert als geplant. Je mehr Menschen einbezogen wurden, desto länger wurde die Wunschliste. Die Lektion: Aufnahmekriterien für KPIs und Dashboard-Inhalte müssen von Anfang an kommuniziert und konsequent durchgehalten werden, auch wenn es unbequem ist.

- Der ETL-Connector für das ERP hat zwei Wochen länger gedauert als geplant, da sich externe Abhängigkeiten oft nicht beschleunigen lassen, egal wie gut man plant. Der Hersteller hatte seinen eigenen Zeitplan, die interne IT andere Prioritäten. Das ist eher der Normalzustand als der Ausnahmefall in Integrationsprojekten. Wer sowas einplant, bleibt bei Verzögerungen gelassen.

- NIS2 und IAM wurden zu spät thematisiert. Beide Themen hätten früher auf dem Tisch sein müssen und nicht als Überraschungsgast in Woche acht und zehn auftauchen dürfen. Compliance darf kein Einmalprojekt sein, sondern ein begleitender Projektbestandteil von Anfang an.

### Die fünf wichtigsten Learnings

1. **Datenprojekte sind immer auch Organisationsprojekte.**

Die Technik ist selten das eigentliche Problem. Wer die Daten verantwortet, Entscheidungen trifft, Zugriffsrechte vergibt oder wer bei Konflikten zwischen Abteilungen moderiert sind Fragen, die Projekte verlangsamen oder scheitern lassen. Solche Dinge von Anfang an mitzudenken, spart im Verlauf erheblichen Aufwand.

2. **Compliance gehört von Anfang an ins Boot**

DSGVO, NIS2, IAM beeinflussen Architekturentscheidungen, Datenselektion und Zugriffskonzepte. Werden sie erst nachträglich einbaut, sind größere Anpassungen am Gesamtkonstrukt oft nicht zu vermeiden.

3. **Datenqualität ist nie "eigentlich ganz okay"**

Das haben wir in [Post 3](/blog/7-zeichen-datenbasis/) gelernt und Thalberg hat es am eigenen Leib erfahren. Baut man ein Dashboard auf schlechten Daten auf, baut ein Dashboard, dem niemand vertraut. Und Vertrauen in Daten zurückzugewinnen ist eine Disziplin für sich...

4. **Ein Dashboard ohne Nutzerakzeptanz ist wertlos**

Technik die niemand nutzt, löst kein Problem. Die Frage wer das Dashboard nutzt, welche Entscheidung es ermöglichen soll und woran man festmacht, dass es genutzt wird, muss beantwortet sein, bevor die ersten Diagramme gebaut werden.

5. **Jede Entscheidung zieht kommt mit ihrem eigenen Rattenschwanz**

Cloud statt On-Premises beeinflusst die ETL-Toolwahl. Die ETL-Toolwahl beeinflusst die Transformationslogik. Die Transformationslogik beeinflusst das Datenmodell. Sorgfältige Planung von Anfang an erspart nach hinten raus die eine oder andere unangenehme Überraschung.

### Was als nächstes kommt

Thalberg ist nicht fertig, das Projekt beginnt jetzt erst richtig.

Die Dashboards müssen gebaut werden! Power BI steht bereit, das Datenmodell wartet. Eine Data Culture muss entwickelt werden, damit die Menschen im Unternehmen die Dashboards auch wirklich nutzen. Das ISMS muss aufgebaut werden, NIS2-Anforderungen umgesetzt, IAM vollständig implementiert.

In den nächsten Wochen und Monaten begleiten wir Thalberg weiter durch den Dashboard-Bau, durch die ersten Versuche mit Data Literacy und Schulungen, durch den Aufbau eines Sales Forecasts und irgendwann durch die Frage ob Machine Learning für Thalberg wirklich Sinn ergibt.

### Wo steht euer Unternehmen?

Wer diese elf Posts gelesen hat, kennt die Reise. Die Frage ist nicht ob die eigene Datenlage perfekt ist... das ist sie nie, wahrscheinlich nicht mal bei Amazon und Co. Die eigentliche Frage ist, ob man bereit ist den ersten Schritt zu machen. 

Wer noch nicht so weit ist, weiß jetzt zumindest wo man anfängt. Und wer dabei [Unterstützung möchte](mailto:info@alpinedata.de), weiß wo er uns findet.