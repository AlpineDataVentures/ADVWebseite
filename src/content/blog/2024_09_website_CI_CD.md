---
title: "Webseite mit agilem Entwicklungsprozess"
meta_title: "Webseite vs Moderne Entwicklungspipeline, agiler Entwicklungsprozess, DevOps"
description: "Bei Alpine Data Ventures setzen wir auf Innovation und Struktur. Das zeigen wir auch mit unserer Webseite, die auf einem modernsten Entwicklungsprozess basiert."
date: 2024-09-24T07:00:00Z
image: "/images/blog/BTS_Website.png"
categories: ["Tech"]
author: "Carsten Hof"
tags: ["DevOps", "Webseite", "Intern"]
draft: false
summary: "Bei Alpine Data Ventures setzen wir auf Innovation & Struktur. Das zeigen wir auch mit unserer Webseite, die auf einem modernsten Entwicklungsprozess basiert, den wir auch in Daten-Projekten einsetzen."
---

Unsere kürzlich live gegangene Webseite ist für uns mehr als nur ein digitales Aushängeschild – sie zeigt, wie wir modernste Technologien und einen agilen Entwicklungsprozess (DevOps) einsetzen. Die Vorteile liegen auf der Hand: maximale Automatisierung, einfache Erweiterbarkeit und eine hohe Qualität. Viele der Bausteine sind auch Grundlage für das strukturierte Vorgehen in den Daten-Projekten gemeinsam mit unseren Kunden. 

In diesem Beitrag werfen wir einen Blick hinter die Kulissen unseres Webseiten-Projekts und zeigen wie wir automatisiert und professionell unsere Webseite entwickeln, ihre Qualität sichern und automatisch live schalten. Und das ohne eigenen Server...

### 1. Plan – Anforderungen und Struktur als Basis
Jedes erfolgreiche Projekt beginnt mit einer klaren Planung. In der Planungsphase nutzen wir Projekt-Management- und Anforderungs-Tools, um sicherzustellen, dass alle Anforderungen und Ziele klar definiert sind.

- <h6>Projektplanung</h6>
  Zu Beginn steht die strategische Projektplanung. Wir erfassen die Ziele der Webseite und definieren den Scope des Projekts. Welche Funktionen sollen implementiert werden? Wie soll die User Experience gestaltet sein?

- <h6>Anforderungen aufnehmen</h6> 
  Gemeinsam im Team erfassen wir die genauen Anforderungen an die Webseite und brechen diese in umsetzbare Aufgaben herunter.

- <h6>Aufgabenverteilung im Team</h6>
  Mit <a href="https://www.atlassian.com/de/software/jira">Jira</a> verteilen wir Aufgaben klar und strukturiert an die jeweiligen Teammitglieder, wodurch jeder stets weiß, was zu tun ist.

- <h6>Dokumentation</h6> 
  Alle Entscheidungen und Prozesse werden in <a href="https://www.atlassian.com/de/software/confluence">Confluence</a> dokumentiert, um Transparenz und Nachvollziehbarkeit zu gewährleisten.

### 2. Create – Die Entwicklung
Für die Umsetzung der Webseite setzen wir auf [Astro](https://astro.build/), ein modernes Web-Framework, das speziell für inhaltsreiche  Webseiten optimiert ist. Es erlaubt uns, extrem schnelle und flexible Webseiten zu bauen, die zukunftssicher und leicht erweiterbar sind. Astro lädt nur das, was für die aktuelle Seite benötigt wird. Das macht die Webseite nicht nur schneller, sondern auch effizienter.

### 3. Build – Automatisierter Build-Prozess und Qualitätssicherung
Sobald die Entwicklung voranschreitet, greifen unsere automatisierten Build- und Testprozesse. Der gesamte Workflow ist so optimiert, dass jede Codeänderung nahtlos in unser System integriert wird. Hier setzen wir auf den dreistufigen Ansatz:

- <h6>Entwicklung (DEV)</h6> 
  Unser Prozess besteht aus einer Entwicklungsumgebung (DEV), in der die Entwickler lokal
  arbeiten, den Quellcode versionieren <a href="https://git-scm.com/">Git</a> und auf ihrem Rechner auch gleich die gesamte Webseite und ihre Änderungen einsehen. 

- <h6>Qualitätssicherung (INT)</h6> 
  Ist die Entwicklung von neuen Features oder das Schreiben eines neuen Blog-Artikels abgeschlossen, so werden die Änderungen in den Integrations-Branch (INT) auf <a href="https://github.com/">GitHub</a> gepusht. Dadurch wird ein automatisierter Build angestoßen und die Webseite zur internen Qualitätssicherung bereitgestellt. 
  
- <h6> Produktion (PROD)</h6>
  Nach Freigabe und etwaigen Korrekturen wird der Code in den Produktions-Branch (PROD) übertragen. Diese triggert wiederum die Build & Deploy-Kette: ohne händisches Zutun wird die Webseite erstellt, serverless über <a href="https://www.netlify.com/">Netlify</a> bereitgestellt und damit auch gleich live geschaltet.

### 4. Run – Betrieb und kontinuierliche Verbesserung
Nach dem Launch der Webseite endet unsere Arbeit nicht. Im Run-Modus nutzen wir fortlaufend die Daten aus Web-Analytics-Tools, um die Performance der Webseite zu überwachen und kontinuierlich Verbesserungen vorzunehmen. Unser Ansatz der datengetriebenen Entscheidungen hilft uns, nicht nur kurzfristige Optimierungen vorzunehmen, sondern die Webseite langfristig auf Erfolgskurs zu halten.

Die folgende Grafik gibt eine übersicht über alle Einzelschritte und zeigt wie sie im Zusammenwirken zur Entwicklung unserer Webseite beitragen:

![Übersicht: DevOps-Prozess unserer Webseite](/images/blog/2024_09_website_CICD.png)

### Vorteile des Ansatzes
Der agile Entwicklungsprozess für Webseiten und die automatisierte Bereitstellung mittels der oben dargestellten Tool-Kette bietet eine ganze Reihe von Vorteilen. Für uns sind die folgenden Punkte entscheidend:  
- <h6>Maximale Automatisierung</h6>
  Ganz nach der obersten Maxime "Don't repeat yourself" werden alle sich wiederholenden Tätigkeiten bei uns automatisiert. So braucht es keinen Build-Monkey, der Schritte manuell ausführt oder gar nicht verfügbar ist, wenn gerade eine Änderung an der Webseite ansteht. 

- <h6>Einfache Erweiterung der Webseite um neue Inhalte durch alle ADV'ler</h6>
  Der Aufbau des agilen Entwicklungsprozesses inklusive Tool-Kette bedarf einer gewissen Expertise. Einmal eingerichtet können neue Webseiten-Inhalte wie Blog-Posts oder Casestudies durch alle ADV'ler erstellt werden. Eine gemeinschaftliche Gestaltung und Identifikation mit unserer Webseite steht nichts im Wege.    

- <h6>Innovation & iterative Weiterentwicklung</h6>
  Durch den Einsatz von Standard-Systemen, die zum größten Teil sogar Open Source sind, profitieren wir von einer ganzen Community an IT-Enthusiasten, die kontinuierlich Neues entwickeln und auch die Sicherheit der Systeme gewährleisten. 

- <h6>Robust & Qualitätsgesichert</h6>
  Durch den aus der klassischen Software-Entwicklung bekannten Dreiklang aus Entwicklungs-, Integrations- und Produktions-Umgebung können wir parallel an Neuerungen arbeiten und diese gleich in einem nur für ADV zugängigen Bereich, der identisch zur Produktiv-Umgebung ist, testen und korrekturlesen. Die Zeiten von "It work's on my machine" sind vorbei.     

- <h6>Keine eigene Hardware</h6>
  Wo früher erst mal ein eigener Server gemietet werden musste, ist es heute durch eine Vielzahl an professioneller Cloud-basierter Lösungen (SaaS) möglich einen agilen Entwicklungsprozess aufzusetzen, der außer einem persönlichen Laptop keinerlei Hardware benötigt. Der Punkt ist gerade für uns als wachsendes Unternehmen wichtig und erlaubt es uns flexibel zu agieren.  


## Fazit 
Skin in the Game – Wir leben, was wir predigen: Mit unserer neuen Webseite zeigen wir, wie wir mit agilen, strukturierten und datenbasierten Prinzipien, auch unseren Kunden helfen können ihre Ziele effizient zu erreichen. Wir setzen auf stabile Abläufe, modernste Technologien und kontinuierliche Optimierung – die Basis für jedes datengetriebene Unternehmen.
