---
title: "Wer darf was? Identity & Access Management einfach erklärt"
meta_title: "Identity & Access Management im Mittelstand: Zugriffsrechte, Offboarding und Rollenkonzepte"
description: "Ein ehemaliger Mitarbeiter hat noch immer Zugriff, der Außendienst sieht die Gehaltsliste, drei Personen teilen sich einen Admin-Account. IAM-Probleme sind im Mittelstand die Regel, nicht die Ausnahme und sie sind einfacher zu lösen als gedacht."
date: 2026-08-12T08:30:00Z
image: "/images/blog/identity-access-management.png"
categories: ["Informationssicherheit"]
author: "Ben Diez"
tags: ["IAM", "Informationssicherheit"]
draft: false
summary: "Thalbergs neuer ISB braucht keinen langen ersten Arbeitstag um sein erstes Problem zu finden. Was Identity & Access Management ist, welche vier Fehler im Mittelstand am häufigsten vorkommen und was man konkret dagegen tun kann."
---

*Teil 10 unserer Serie über den kompletten Aufbau eines datengetriebenen Unternehmens [Teil 9 lesen](/blog/isb-aufgaben/)*

Thalbergs neuer ISB braucht keine 20 Minuten, um das erste Problem zu finden (so gut ist der!): Ein ehemaliger Vertriebsmitarbeiter hat nach acht Monaten noch immer einen aktiven CRM-Account. Der Außendienst sieht die Gehaltsliste der Abteilung, weil sie mal irgendwo abgelegt wurde und niemand die Berechtigungen angepasst hat. Und drei Personen teilen sich einen Admin-Account, weil das schon immer so war (classic).

"Jeder hat Zugriff auf das, was er braucht", hatte der Geschäftsführer gesagt.

Auf das und vieles, vieles mehr...

### Was IAM ist und warum es mehr ist als Passwörter

Identity & Access Management - kurz: IAM - regelt, wer im Unternehmen auf welche Systeme, Anwendungen und Daten zugreifen darf und sinnvollerweise auch wer nicht. Es definiert wie Accounts angelegt, verwaltet und deaktiviert werden. Und es stellt sicher dass diese Regeln nicht nur auf dem Papier existieren, sondern tatsächlich durchgesetzt werden.

**Passwörter** sind dabei nur die sichtbarste Schicht. Darunter liegen Fragen, die viel grundlegender sind: Welche Rolle hat diese Person im Unternehmen? Was braucht sie für ihre Arbeit wirklich (Betonung auf "wirklich")? Was darf sie auf keinen Fall sehen? Und was passiert, sollte sie das Unternehmen verlassen?

Dazu kommt die Frage der Authentifizierung: Wie stellt man sicher, dass derjenige, der sich einloggt auch wirklich derjenige ist, der er vorgibt zu sein? Ein Passwort allein reicht dafür heute nicht mehr. Zwei-Faktor-Authentifizierung — also die Kombination aus Passwort und einem zweiten Faktor wie einer App oder einem SMS-Code — ist inzwischen kein optionales Extra, sondern der Mindeststandard für alle Systeme, die sensible Daten enthalten.

### Was passiert, wenn es schiefgeht

IAM-Schwachstellen sind einer der häufigsten Einfallstore für Cyberangriffe. Das Szenario ist meistens dasselbe: Ein Angreifer gelangt an die Zugangsdaten eines Mitarbeiters, oft durch eine Phishing-Mail, ein schwaches Passwort (1234, password oder ADV4president) oder einen Datenleak bei einem anderen Dienst. Was dann passiert, hängt davon ab, welche Rechte dieser Account hat.

Hat der Account nur Zugriff auf das, was der Mitarbeiter wirklich für seine Arbeit benötigt, ist der Schaden begrenzt. Hat er — wie so oft — deutlich mehr Rechte als nötig, kann der Angreifer sich im System ausbreiten, Daten abziehen, Ransomware installieren oder Datenbanken verschlüsseln.

Bei Thalberg würde der kompromittierte Account des ehemaligen Vertriebsmitarbeiters theoretisch noch immer Zugriff auf alle aktuellen Kundendaten ermöglichen. Acht Monate nach seinem Austritt... Das ist schon kein hypothetisches Risiko mehr, sondern eigentlich schon ein offenes Fenster.

### Das Prinzip der minimalen Rechte

Das Grundprinzip von IAM wurde oben bereits genannt und ist in der Theorie wie die Pflegeanleitung für einen Gremlin: sehr simpel. Jeder bekommt ausschließlich die Zugriffsrechte, die er für seine Arbeit tatsächlich braucht, mehr aber auch nicht.

In der Praxis sieht es meistens anders aus. Neue Mitarbeiter bekommen dieselben Rechte wie ihr Vorgänger, weil das schneller geht als neu zu überlegen. Wer eine neue Aufgabe übernimmt bekommt zusätzliche Rechte, die alten werden selten entzogen. Und wer das Unternehmen verlässt, dessen Account wird oft vergessen bis jemand zufällig drüber stolpert.

Das Ergebnis sind über Jahre gewachsene Berechtigungsstrukturen, die niemand mehr vollständig überblickt und die im Ernstfall zum ernsthaften Problem werden können.

### Die vier häufigsten IAM-Fehler

1. **Zu viele Adminrechte**: Admin-Zugänge sind mächtig und deshalb gleichzeitig begehrt und gefährlich. Wer Admin-Rechte hat, kann im Zweifel alles sehen, alles ändern und alles löschen (wer schonmal feststellen durfte, dass über Nacht die Hälfte des Data Warehouses verschwunden ist, wird hier mit Tränen in den Augen nicken). In vielen Mittelständlern haben deutlich mehr Personen Admin-Rechte als nötig, weil es bequemer ist als individuelle Berechtigungen zu vergeben. Bei Thalberg haben vier Personen Admin-Zugang zum Warenwirtschaftssystem, zwei davon wissen nicht mal, was das Tool überhaupt macht.

2. **Kein Offboarding-Prozess**: Wenn ein Mitarbeiter das Unternehmen verlässt, sollte sein Account am letzten Arbeitstag in allen Systemen deaktiviert werden. In der Praxis passiert das selten vollständig. CRM, E-Mail, Cloud-Speicher, externe Tools, jedes System muss einzeln gecheckt werden, und ohne einen definierten Prozess bleibt immer irgendwo ein Account aktiv.

3. **Geteilte Accounts**: Ein Account, mehrere Nutzer, weil es einfacher ist, weil Lizenzen teuer sind oder natürlich, weil es schon immer so war. Das Problem: Wenn etwas schiefgeht, weiß niemand wer es war. Nachvollziehbarkeit ist damit unmöglich - und Nachvollziehbarkeit ist genau das was DSGVO, NIS2 und ISO 27001 verlangen.

4. **Keine regelmäßige Überprüfung**: Berechtigungen wachsen über Zeit. Wer sie nie überprüft, hat irgendwann eine Struktur die niemand mehr versteht und die mit der tatsächlichen Organisationsstruktur nichts mehr zu tun hat. Eine jährliche Überprüfung aller Zugriffsrechte ist kein großer Aufwand, wird aber erschreckend selten gemacht.

### Zusammenhang zwischen IAM und Compliance

Wer die letzten Posts gelesen hat, erkennt das Muster: DSGVO verlangt dass nur berechtigte Personen auf personenbezogene Daten zugreifen können. NIS2 verlangt nachweisbare Zugriffskontrollen als Teil des Risikomanagements. ISO 27001 definiert Zugriffsrechte als einen der zentralen Kontrollbereiche.

IAM ist damit die technische und organisatorische Grundlage für alle drei. Wer IAM sauber umsetzt, erfüllt automatisch einen wesentlichen Teil dieser Anforderungen. Wer es nicht tut, hat bei jeder Prüfung eine als Problem verpackte Herausforderung.

Der ISB bringt es auf den Punkt: "Ihr habt ein Warehouse gebaut, eine Pipeline eingerichtet und Dashboards gebaut, ui toll. Aber ihr habt nie systematisch geregelt, wer auf diese Daten zugreifen darf. Das ist so als würdet ihr ein neues Haus bauen und die Schlüssel zusammen mit den bekannten McDonald´s Gutscheinen in allen Briefkästen der Nachbarschaft verteilen."

### Was Thalberg konkret tun muss

Die gute Nachricht ist, dass IAM oft kein monatelanges IT-Projekt ist. Die meisten Maßnahmen sind organisatorischer Natur und brauchen keine neue Software, sondern klare Prozesse und jemanden, der sie durchsetzt.

- **Bestandsaufnahme aller Accounts**: Welche Accounts existieren, in welchen Systemen, und wem gehören sie? Das klingt trivial, dauert in der Praxis aber meistens länger als erwartet, weil niemand eine vollständige Liste hat.

- **Offboarding-Prozess einführen**: Ein einfacher, verbindlicher Prozess der sicherstellt, dass beim Austritt eines Mitarbeiters alle Accounts in allen Systemen deaktiviert werden. Checkliste, Verantwortlicher, Dokumentation, das Übliche.

- **Adminrechte bereinigen**: Wer braucht wirklich Admin-Zugang, und wer hat ihn nur, weil niemand je gefragt hat? Adminrechte auf das notwendige Minimum reduzieren und Zwei-Faktor-Authentifizierung für alle privilegierten Accounts einführen.

- **Rollenkonzept einführen**: Statt individuelle Berechtigungen für jeden Mitarbeiter zu vergeben, werden Rollen definiert — Vertrieb, Buchhaltung, Geschäftsführung — und jede Rolle bekommt die passenden Zugriffsrechte. Wenn jemand die Rolle wechselt, wechseln die Rechte mit.

### Was als nächstes kommt

Nächste Woche ist Recap-Zeit. Was hat Thalberg in den ersten Wochen wirklich erreicht, was ist schiefgelaufen, und warum das Projekt jetzt erst richtig beginnt.