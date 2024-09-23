---
title: "Webseite vs Moderne Entwicklungspipeline"
meta_title: "Webseite vs Moderne Entwicklungspipeline"
description: "Bei Alpine Data Ventures setzen wir auf Innovation und Struktur. Das zeigen wir auch mit unserer Webseite, die auf einem modernsten Entwicklungsprozess basiert."
date: 2024-09-23T07:00:00Z
image: "/images/blog/2024_09_website_CICD.png"
categories: ["Tech"]
author: "Carsten Hof"
tags: ["DevOps", "Webseite"]
draft: false
summary: "Bei Alpine Data Ventures setzen wir auf Innovation und Struktur. Das zeigen wir auch mit unserer Webseite, die auf einem modernsten Entwicklungsprozess basiert, den wir auch in Daten-Projekten einsetzen."
---

Unsere kürzlich live gegangene Webseite ist mehr als nur ein digitales Aushängeschild – sie zeigt, wie wir modernste Technologien und innovative Arbeitsprozesse effizient einsetzen. Viele der Bausteine sind auch Grundlage für das strukturierte Vorgehen in den Data-Projekten gemeinsam mit unseren Kunden. 

In diesem Beitrag möchten wir einen Blick hinter die Kulissen unseres Webseiten-Projekts werfen und zeigen, mit welchem Tech-Stack und welchen agilen Entwicklungsprozess wir automatisiert und professionell unser Webseite entwickeln, qualitätssichern und automatisch live-schalten. Und das Ganze ohne eigenen Server...

### 1. Plan – Anforderungen und Struktur als Basis
Jedes erfolgreiche Projekt beginnt mit einer klaren Planung. In der Planungsphase nutzen wir Tools wie Confluence und JIRA, um sicherzustellen, dass alle Anforderungen und Ziele klar definiert sind.

- Projektplanung: 
  Zu Beginn steht die strategische Projektplanung. Wir erfassen die Ziele der Webseite und definieren den Scope des Projekts. Welche Funktionen sollen implementiert werden? Wie soll die User Experience gestaltet sein?

- Anforderungen aufnehmen: 
  Gemeinsam im Team erfassen wir die genauen Anforderungen an die Webseite und brechen diese in umsetzbare Aufgaben herunter.

- Aufgabenverteilung im Team:
  Mit JIRA verteilen wir Aufgaben klar und strukturiert an die jeweiligen Teammitglieder, wodurch jeder stets weiß, was zu tun ist.

- Dokumentation: 
  Alle Entscheidungen und Prozesse werden dokumentiert, um Transparenz und Nachvollziehbarkeit zu gewährleisten.

### 2. Create – Die Entwicklung
Für die Umsetzung der Webseite setzen wir auf Astro, ein modernes Web-Framework, das speziell für inhaltsreiche  Webseiten optimiert ist. Es erlaubt uns, extrem schnelle und flexible Webseiten zu bauen, die zukunftssicher und leicht erweiterbar sind. Astro lädt nur das, was für die aktuelle Seite benötigt wird. Das macht die Webseite nicht nur schneller, sondern auch effizienter.

### 3. Build – Automatisierter Build-Prozess und Qualitätssicherung
Sobald die Entwicklung voranschreitet, greifen unsere automatisierten Build- und Testprozesse. Der gesamte Workflow ist so optimiert, dass jede Codeänderung nahtlos in unser System integriert wird. Hier setzen wir auf den dreistufigen Ansatz:

- Entwicklung (DEV): 
  Unser Prozess besteht aus einer Entwicklungsumgebung (DEV), in der die Entwickler lokal
  arbeiten, den Quellcode versionieren (Git) und auf ihrem Rechner auch gleich die gesamte Webseite und ihre Änderungen einsehen. 

- Qualitätssicherung (INT): 
  Ist die Entwicklung von neuen Features oder das Schreiben eines neuen Blog-Artikels abgeschlossen, so werden die Änderungen in den Integrations-Branch (INT) gepusht. Dadurch wird ein automatisierter Build angestoßen und die Webseite zur internen Qualitätssicherung bereitgestellt. 
  
- Produktion (PROD): 
  Nach Freigabe und etwaigen Korrekturen wird der Code in den Produktions-Branch übertragen. Diese triggert wiederum die Build & Deploy-Kette: ohne händisches Zutun wird die Webseite erstellt, serverless bereitgestellt und damit auch gleich live geschaltet.

### 4. Run – Betrieb und kontinuierliche Verbesserung
Nach dem Launch der Webseite endet unsere Arbeit nicht. Im Run-Modus nutzen wir fortlaufend die Daten aus Web-Analytics-Tools, um die Performance der Webseite zu überwachen und kontinuierlich Verbesserungen vorzunehmen. Unser Ansatz der datengetriebenen Entscheidungen hilft uns, nicht nur kurzfristige Optimierungen vorzunehmen, sondern die Webseite langfristig auf Erfolgskurs zu halten.

![Übersicht: DevOps-Prozess unserer Webseite](/images/blog/2024_09_website_CICD.png)

## Fazit 
Skin in the Game – Wir leben, was wir predigen: Mit unserer Webseite zeigen wir, dass wir die agilen, strukturierten und datenbasierten Prinzipien, die wir unseren Kunden empfehlen, selbst umsetzen. Wir setzen auf stabile Abläufe, modernste Technologien und kontinuierliche Optimierung – die Basis für jedes datengetriebene Unternehmen.
