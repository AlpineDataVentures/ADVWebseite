---
title: "7 Zeichen, dass eure Datenbasis noch nicht bereit ist"
meta_title: "Datenbasis für Dashboard prüfen: 7 Warnsignale die jeder kennen sollte"
description: "Bevor ihr ein Dashboard baut, lohnt sich ein ehrlicher Blick auf eure Datenbasis. Diese 7 Zeichen verraten ob eure Daten wirklich bereit sind — oder ob ihr auf einem morschen Fundament baut."
date: 2026-05-27T08:30:00Z
image: "/images/blog/7-zeichen-datenbasis.png"
categories: ["Business Intelligence"]
author: "Ben Diez"
tags: ["Datenqualität", "Data Warehouse", "Dashboard", "Data Strategy", "IAM"]
draft: false
summary: "Das Konzept steht, alle sind motiviert — aber sind die Daten überhaupt bereit? Wir zeigen die 7 häufigsten Warnsignale, die darauf hindeuten dass man noch nicht anfangen sollte zu bauen."
---

*Teil 3 unserer Serie über den kompletten Aufbau eines datengetriebenen Unternehmens [Teil 2 lesen](/blog/zwei-dashboards/)*

Das Konzept steht, die Nutzerprofile sind klar und wie zu Beginn jedes Posts sind natürlich alle motiviert. Der Geschäftsführer hat sogar schon eine Vorstellung davon wie sein Dashboard aussehen soll. Er hat ein Foto von einem anderen Dashboard auf seinem Handy, das er bei einem Vortrag gesneakt hat. Das zeigt er stolz jedem, der es sehen will und einigen, die gezwungen werden müssen.

Eigentlich könnte und müsste man jetzt anfangen zu bauen. Eigentlich...

Bevor Thalberg auch nur ein Feld im BI Tool ihrer Wahl platziert, stellt sich eine unbequeme Frage: **Sind die Daten überhaupt bereit dafür?** In der Praxis lautet die ehrliche Antwort meistens nein und zwar nicht weil die Daten fehlen, sondern weil niemand je wirklich hingeschaut hat. Das beste Dashboard auf schlechten Daten ist wie den Schimmel im Bad mit Alpina zu überstreichen. Sieht gut aus, bis es nicht mehr gut aussieht.

Hier sind sieben Zeichen, an denen man erkennt, dass noch ein paar Hausaufgaben zu erledigen sind, bevor man das erste Dashboard auf die Straße bringt:

#### Zeichen 1: Niemand weiß welche Version die richtige ist
Thalbergs Montagsmeeting lässt grüßen. Drei Menschen, drei Umsatzzahlen, 180.000 Euro Unterschied. Am Ende einigt man sich auf die Version des Vertriebsleiters, weil er am lautesten ist (also, richtig laut, roter Kopf und alles). In vielen Unternehmen als man denkt ist das der reguläre Ablauf.

Wenn dieselbe Kennzahl aus zwei verschiedenen Systemen zwei verschiedene Ergebnisse liefert, liegt weniger ein Dashboard-Problem als ein Datenproblem vor. Ein Dashboard macht es nicht besser, es macht es sichtbarer. Die bekannte IT Weisheit *"Shit In, Shit Out"* trifft wieder mal ins Schwarze.

#### Zeichen 2: Jede Abteilung hat ihre eigene Wahrheit, die sie bis zum letzen Mann verteidigt
Der Vertrieb rechnet Umsatz anders als die Buchhaltung. Die Buchhaltung rechnet anders als das Controlling. Und alle drei haben irgendwo Recht, denn je nach Definition, Zeitpunkt der Buchung oder ob Retouren rein- oder rausgerechnet werden, gibt es mehr als eine Wahrheit.

Oft ist das ein historisch gewachsenes Problem: Jede Abteilung hat ihre Zahl über Jahre optimiert, verteidigt und zur Grundlage ihrer eigenen Berichterstattung gemacht. Wer jetzt eine gemeinsame Definition durchsetzen will, greift in gewachsene Strukturen ein. Das tut weh und wird auf jede Menge Gegenwehr stoßen, dennoch ist es notwendig. Ein Dashboard mit drei verschiedenen Umsatzdefinitionen ist nämlich kein Dashboard, sondern perspektivisch der Auslöser für die firmeninternen Hunger Games.

#### Zeichen 3: Die Daten stimmen, aber nur wenn man sie richtig liest
"**Kunde**" im CRM, "**Debitor**" im ERP, "**KD-Nr**" in der Excel. Gemeint ist zwar eigentlich dasselbe, das wurde aber so nie aufgeschrieben. Dazu kommt: Umsatz mal mit Mehrwertsteuer, mal ohne, Menge mal in Stück, mal in Kartons. Oder ein weiterer Klassiker: Lieferdatum mal als Datum der Bestellung, mal das Datum des Versands, mal das Datum der Rechnung. Irgendwo in einer Ecke schluchzt ein Controller leise in ein Kissen...

Die Daten sind technisch befüllt, aber was genau damit gemeint ist, steht nirgendwo. Ob "Kunde" im CRM dasselbe ist wie "Debitor" im ERP, weiß nur wer lang genug dabei ist. Wer neu ins Projekt kommt, fängt an zu raten. Und wer rät, liegt früher oder später falsch.

#### Zeichen 4: Die Daten leben in Excels die nur eine Person kennt
Jedes Unternehmen hat sie: Dieses eine Excel-File, das über Jahre gewachsen ist und das keiner anfassen will, weil niemand weiß was passiert wenn man etwas ändert, und die genau eine Person wirklich versteht. Diese Person ist für gewöhnlich gerade im Urlaub oder hat das Unternehmen verlassen.

Natürlich hat der Praktikant die Datei letzte Woche aufgeräumt, gerade rechtzeitig vor der großen Messe, auf der Thalberg einen Stand hat. Er hat alle Zeilen, in denen es leere Felder gibt gelöscht, weil die ja eh keine Daten enthalten, 40% der Kundendaten sind weg. Er findet, das sei eine erhebliche Verbesserung der Übersichtlichkeit.

Daten die nur auf Laptops von Einzelpersonen leben, sind keine Unternehmensdaten, eher persönliche Daten, die zufällig auch für das Unternehmen relevant sind. Der Unterschied wird spätestens dann schmerzhaft klar, wenn diese Person nicht mehr da ist (oder der vielgescholtene Praktikant zuschlägt).

#### Zeichen 5: Die Daten existieren, aber niemand kommt ran
Das System hat die Daten. Theoretisch. Praktisch braucht man dafür einen Zugang den nur die IT vergeben kann. Die IT hat gerade ein Ticket-Backlog von sechs Wochen, wenig Motivation solche Anfragen zu priorisieren und der einzige, der den direkten Datenbankzugang hatte war ein externer Dienstleister dessen Vertrag vor einem Jahr ausgelaufen ist.

Datenzugang ist in vielen Unternehmen über Jahre gewachsen, und was organisch wächst, wächst selten ordentlich. Wer erstmals systematisch auf Daten zugreifen will, stößt auf veraltete Berechtigungen, vergessene Passwörter und Systeme für die sich niemand mehr zuständig fühlt. Bis überhaupt geklärt ist wer den Zugang eigentlich vergeben darf, sind schon wieder vier Wochen Projektzeit weg.

#### Zeichen 6: Es gibt keine Historie
Man kann sagen wie es heute ist. Wie es sich entwickelt hat, da scheiden sich die Geister. Das System speichert nur den aktuellen Stand, historische Werte werden bei jeder Aktualisierung überschriebenr. Oder es speichert die Historie, aber niemand hat je eine Zeitreihe daraus gebaut. Oder es gibt eine Zeitreihe, aber sie beginnt erst nach der Systemmigration vor 6 Monaten.

Ein Dashboard ohne Zeitreihen ist eine Momentaufnahme. Nützlich, aber begrenzt. Will man Trends erkennen, Forecasts bauen und Entwicklungen steuern, braucht man die Geschichte. Ohne Geschichte kein Kontext, ohne Kontext keine Entscheidung. Simple.

#### Zeichen 7: Die Datenqualität ist "eigentlich ganz okay"
Oft der gefährlichste Satz in jedem Datenprojekt. Nicht unbedingt, weil er gelogen wäre, sondern weil er meistens bedeutet: so genau haben wir da noch nie hingeschaut.

**"Eigentlich ganz okay"** heißt einfach gesagt: Es ist noch nie jemand deswegen gestorben. Was es nicht heißt: Die Daten sind verlässlich genug um darauf Entscheidungen zu bauen. Wer das nicht unterscheidet, merkt den Unterschied spätestens dann, wenn das Dashboard live ist und der Geschäftsführer fragt warum der ausgewiesene Umsatz größer ist als das Bruttosozialprodukt Chinas.

Die Antwort "eigentlich sollten die Daten ganz okay sein" wird er da wirklich nicht befriedigend finden.

### Was tun wenn man sich wiedererkennt?
Nicht in Panik verfallen. Alle diese Probleme sind lösbar, aber sie lösen sich nicht von selbst, und sie lösen sich auch nicht dadurch dass man einfach anfängt zu bauen und hofft dass es schon irgendwie passt. Eine externe Sicht kann auch nicht schaden, wie zum Beispiel die von Alpine Data Ventures... hust.

Thalberg erkennt sich in vier der sieben Punkte wieder. Das ist unangenehm, aber es ist der ehrlichste Moment des gesamten Projekts. Lieber jetzt als nach drei Monaten Entwicklungsarbeit.

Der nächste Schritt ist ein Data Warehouse, eine zentrale Datenbasis die all diese Probleme strukturell löst. Wie man das aufbaut, welche Architektur für welches Unternehmen passt, und warum die Cloud nicht immer die Antwort ist: darum geht es nächste Woche.