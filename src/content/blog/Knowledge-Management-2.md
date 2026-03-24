---
title: "Knowledge Management in der Praxis: Warum niemand das Handbuch liest"
meta_title: "Warum Knowledge Management mehr als ein Wiki-Problem ist"
description: "Tools allein retten kein Wissen. Was wirklich funktioniert und welche Fehler fast jede Organisation macht."
date: 2026-03-23T10:00:00Z
image: "/images/blog/knowledge-management-2.png"
categories: ["Knowledge Management"]
author: "Ben Diez"
tags: ["Knowledge Management", "Governance"]
draft: false
summary: "Wissen geht nicht verloren, weil das falsche Tool gewählt wurde. Es geht verloren, weil Dokumentation als Zusatzaufgabe behandelt wird statt als Teil der Arbeit."
---

*Teil 2 von 3 unserer Serie über Knowledge Management*

Zum ersten Teil der Serie: [Knowledge Management - oder: Der 1. Tag in der eigenen Wohnung](/blog/knowledge-management-1/)

Wenn Organisationen merken, dass Wissen verloren geht, ist die erste Reaktion beunruhigend oft dieselbe: ein Tool wie z. B. eine neue Plattform, ein Wiki oder ein zentrales Repository einführen. Um wirklich jeden mitzunehmen, wird diese Einführung meist begleitet von großen Ankündigungen, gegenseitigem Schulterklopfen und einer üppigen Kick Off Veranstaltung (manchmal mit, manchmal ohne musikalische Untermalung vom Wendler). 

**Keine drei Monate später dann**: Staubschicht. Niemand befüllt irgendwas, alle machen weiter wie vorher.

Leider ist dieses Szenario zu oft wahr, als dass man es als Zufall abtun könnte. Es ist vielmehr das Symptom eines grundlegenden Missverständnisses: Knowledge Management wird als Infrastrukturproblem behandelt, also als etwas, das man mit dem richtigen System löst, obwohl es in Wirklichkeit ein Verhaltensproblem ist. Man kauft das Regal, aber keiner stellt Bücher rein. *„Die Faust des Schlagers“*, das der Wendler nach der Kick Off Veranstaltung dagelassen hat, verstaubt bis auf weiteres alleine.

### Die häufigste Fehlannahme: Ein Wiki löst das Problem
Confluence, Notion, SharePoint - die Liste der Tools, die als Wissensmanagement-Lösung verkauft werden, ist lang. Und keine Frage, nützlich sind sie auch. Aber wie bereits erwähnt sind sie Werkzeuge, keine Strategie.

Das **Problem** ist folgendes: Wissen entsteht im Arbeitsalltag, nicht während des Blockers „Doku“, den man sich am Freitagnachmittag in den Kalender setzt und der eigentlich nur da ist, um heimlich eine Stunde früher auf der Autobahn zu sein. Wer Knowledge Management als separaten Schritt nach der eigentlichen Arbeit definiert, hat schon verloren, denn erfahrungsgemäß wird das nie konsequent passieren.

Der **zweite klassische Fehler**: Man dokumentiert Ergebnisse, aber nicht Entscheidungen. Eine Confluence-Seite, die erklärt was gebaut wurde, ist nützlich. Eine, die erklärt, warum eine Entscheidung getroffen wurde, wie sie getroffen wurde, ist Gold wert. Besonders für alle, die ein Jahr später dasselbe Problem neu denken und sich fragen, warum der offensichtliche Lösungsweg damals verworfen wurde. Spoiler: Es gab einen Grund, der steht aber nirgendwo.

**Ein konkretes Beispiel aus der Praxis**: Ein Entwicklungsteam migriert eine Datenbank in eine neue Datenarchitektur. Die neue Lösung A steht, die alte ist abgeschaltet, das Ticket ist geschlossen. Ein paar Jahre später fragt ein neuer Kollege, warum man damals nicht einfach Option B genommen hat, die wäre doch viel einfacher gewesen. Die Antwort kennt nur keiner mehr, da der verantwortliche Kollege das Unternehmen inzwischen verlassen hat. Option B war evaluiert worden und hatte einen kritischen Skalierungsfehler. Aber das steht nirgendwo. Also wird es noch einmal evaluiert und noch einmal verworfen. Zwei Wochen verschwendet…

### Was tatsächlich funktioniert
Erfolgreiche Wissensorganisationen haben eines gemeinsam: Sie machen Wissensteilung zur kleinsten möglichen Handlung, nicht zur größten.

Sie greifen Wissen da ab, wo es entsteht. Das bedeutet: es wird keine separate Dokumentationskultur aufgebaut. Stattdessen wird die Dokumentation in bestehende Workflows integriert. Das kann ein kurzes Entscheidungsprotokoll am Ende jedes Meetings oder eine Zeile Kontext im Ticket sein, bevor es geschlossen wird. Der Trick ist, den Aufwand so gering wie möglich zu halten. Niemand (*wirklich NIEMAND*) schreibt gerne Dokumentationen, aber fast jeder beantwortet schnell eine kurze Frage. Falls doch jemand gerne Dokus schreiben sollte, gerne eine kurze Mail an [recruiting@alpinedata.de](mailto:recruiting@alpinedata.de).

- **Architecture Decision Records**: Wer in der IT arbeitet, kennt das Problem der verlorenen Entscheidungen besonders gut. ADRs sind eine elegante Lösung: kurze, strukturierte Dokumente, die festhalten welches Problem vorlag, welche Optionen evaluiert wurden, warum man sich wie entschieden hat inkl. der bekannten Konsequenzen dieser Entscheidung. Das muss auch kein Roman mit Einleitung, Hauptteil, Schluss sein, oft reicht eine halbe Seite. Aber in zwei Jahren, wenn das Team dreimal gewechselt hat, ist diese halbe Seite mehr wert als jeder Kommentar im Code.
- **Pull statt Push**: Die meisten Wissenssysteme funktionieren nach dem Push-Prinzip: Jemand schreibt etwas und hofft, dass es jemand anderes findet. Funktioniert, aber eher selten. Besser ist ein System, das Wissen dorthin bringt, wo es gebraucht wird durch klare Strukturen, gute Suchbarkeit, und vor allem durch eine Kultur, in der man lieber fragt bevor man das Rad neu erfindet. Das klingt banal, ist aber ein echter Game Changer.
- **Verantwortung benennen**: Wissen veraltet ohne einen Owner. Wenn niemand dafür verantwortlich ist, eine Seite aktuell zu halten, ist sie nach sechs Monaten Altpapier, mit dem Unterschied, dass Altpapier wenigstens niemanden in die Irre führt und man daraus lustige Hüte falten kann. Jedes kritische Dokument braucht eine Person, die es pflegt, und ein Datum, ab dem es als veraltet gilt. Manche Organisationen arbeiten mit einem einfachen Ampelsystem: grün bedeutet aktuell und geprüft, gelb bedeutet möglicherweise veraltet, rot bedeutet nicht mehr verlässlich. Das klingt nach Overkill, spart aber Zeit, die man sonst damit verbringt herauszufinden, ob man einer Seite noch trauen kann.
- **Communities of Practice**: Einer der unterschätzten Hebel im Knowledge Management ist nicht die Dokumentation, sondern der direkte Austausch zwischen Menschen, die ähnliche Probleme lösen. Communities of Practice - regelmäßige, informelle Runden von Leuten mit ähnlichen Themengebieten - sorgen dafür, dass implizites Wissen zirkuliert, ohne dass es jemand aufschreiben muss. Was in der Kaffeeküche früher organisch passiert ist, muss in hybriden und verteilten Teams aktiv organisiert werden. Firmen, die das ignorieren, verlieren genau den Wissensaustausch, der nie in einem Wiki landen würde.

### So fängt man konkret an
Kommen wir jetzt zu dem Teil, den die meisten Artikel überspringen. Prinzipien klingen gut, aber wie sieht der erste Tag aus, an dem man Knowledge Management wirklich angehen will?

**Schritt 1: Den größten Schmerzpunkt finden**</br> Statt der Frage „Was sollten wir alles dokumentieren?", besser anfangen mit „Welche Wissenslücke kostet uns gerade am meisten Zeit, Geld oder Nerven?" Das kann zum Beispiel die Frage sein, die neue Mitarbeiter immer wieder stellen. Es kann der Prozess sein, der nur einer Person wirklich bekannt ist. Es kann das System sein, dessen Logik niemand mehr vollständig versteht. Diesen einen Punkt nehmen und dort anfangen, nicht überall gleichzeitig.

**Schritt 2: Eine Struktur wählen und dabei bleiben**</br> Confluence, Notion, ein geteiltes Google Drive, was genau genutzt wird, spielt am Anfang eine eher untergeordnete Rolle. Was hingegen eine Rolle spielt: eine konsistente Struktur, die jeder versteht und die nicht ständig umgebaut wird. Eine bewährte Grundstruktur für Teams sieht so aus: ein Bereich für laufende Projekte, ein Bereich für abgeschlossene Projekte mit Learnings, ein Bereich für wiederkehrende Prozesse und Standards, und ein Bereich für Entscheidungen. Das reicht für den Anfang locker aus.

**Schritt 3: Vorlagen einführen, keine leeren Seiten**</br> Eine leere Seite ist der Feind der Dokumentation. Wer vor einem leeren Editor sitzt, schreibt entweder zu viel oder gar nichts. Vorlagen lösen dieses Problem: Sie geben Struktur vor, reduzieren die kognitive Last, und sorgen dafür, dass Dokumente vergleichbar und durchsuchbar bleiben. Für Projekte, für Entscheidungen, für Retrospektiven, für Prozessbeschreibungen – jeweils eine einfache Vorlage reicht. Die muss nicht perfekt sein, sie muss nur existieren.

**Schritt 4: Das erste Wissensinterview führen**</br> Wenn eine erfahrene Person das Team verlässt oder eine kritische Rolle wechselt, ist ein strukturiertes Wissensinterview die schnellste Methode, implizites Wissen zu sichern. Das muss kein stundenlanges Verhör sein, meist reichen die folgenden fünf Fragen: 
-	Was machst du, das nirgendwo dokumentiert ist?
-	Welche Entscheidungen hast du regelmäßig getroffen und warum?
-	Wo sind die nicht offensichtlichen Fallstricke in deinem Bereich?
-	Wen muss man kennen, wenn man deine Aufgaben übernimmt?
-	Was würdest du deinem Nachfolger als erstes sagen? **„Lauf“** ist keine gültige Antwort…

Die Antworten auf diese fünf Fragen sind mehr wert als jedes Organigramm.

**Schritt 5: Einen Rhythmus etablieren**</br> Wissensmanagement darf nicht als Einmalaktion gesehen werden, sondern als Gewohnheit. Das bedeutet: feste Zeitpunkte, zu denen Wissen aktiv gesichert wird. Ein Sprint-Review mit einer festen Frage zu Learnings. Ein monatlicher „Knowledge Day", an dem Teams ihre wichtigsten Dokumente aktualisieren. Eine quartalsweise Überprüfung, welche Seiten veraltet sind und entweder aktualisiert oder gelöscht werden sollten. Löschen ist dabei genauso wichtig wie Schreiben, denn ein System voller veralteter Informationen ist schlimmer als ein leeres, weil es aktiv irreführt.

**Schritt 6: Sichtbar machen, was dokumentiert wurde.**</br> Wissen, das existiert, aber niemand findet, ist fast so nutzlos wie Wissen, das nicht existiert. Das bedeutet: neue Dokumente werden aktiv geteilt, nicht nur abgelegt. In einem kurzen Update im Team-Meeting erwähnen, dass es jetzt eine Dokumentation zu Thema X gibt. Oder in Tickets und Issues direkt auf relevante Seiten verlinken. Darüber hinaus ist es im Hinblick auf das Etablieren einer wissensorientierten Kultur empfehlenswert, Onboarding-Unterlagen direkt so zu gestalten, dass neue Mitarbeiter von Tag eins lernen, wo Wissen zu finden ist.

### Die unbequeme Wahrheit: Es ist eine Kulturfrage
Hier wird es unangenehm. Denn das beste Tool, der durchdachteste Prozess, die schönste Confluence-Struktur nützt nichts, wenn die Unternehmenskultur Wissensteilung nicht belohnt. Oder schlimmer, implizit bestraft.

In manchen Organisationen ist Wissen Macht. Wer es hat, hat Einfluss. Wer es teilt, verliert seinen Vorsprung. Das ist selten so drastisch formuliert, wird aber oft so gelebt. In solchen Umgebungen wird kein Knowledge-Management-Tool der Welt etwas verändern, weil das Problem nicht technisch ist.

Führungskräfte haben hier eine Vorbildfunktion, die unterschätzt wird. Wenn das Management selbst keine Entscheidungen dokumentiert, keine Learnings teilt, und Knowledge Management als nice-to-have behandelt, wird das Team das genauso handhaben. Kultur entsteht nicht durch Ankündigungen, sondern durch Verhalten und zwar durch das Verhalten derer, die oben sitzen.

Das bedeutet konkret: Wer möchte, dass sein Team Wissen teilt, muss das selbst vorleben. Eigene Entscheidungen transparent machen. Eigene Fehler dokumentieren. Offen fragen, statt so zu tun, als wüsste man alles. Das ist unbequem. Es ist aber auch der einzige Weg, der funktioniert.

### Was das mit dem Regal zu tun hat
Erinnert ihr euch an das Regal von weiter oben? Das Problem war nie das Regal. Das Problem war, dass niemand erklärt hat, warum man Bücher reinstellen soll, wer das tut, wann das passiert, und was danach damit geschieht.

Ein Wissenssystem funktioniert dann, wenn drei Dinge zusammenkommen: die richtige Struktur, klare Verantwortlichkeiten, und eine Kultur, in der Teilen selbstverständlicher ist als Horten. Fehlt eines davon, steht das Regal leer (sofern einer das Buch vom Wendler wegwirft, aber das Problem sollte sich von allein lösen)

### Ausblick auf Teil 3
Wir haben jetzt geklärt, warum Knowledge Management scheitert und was es braucht, damit es funktioniert. Im dritten und letzten Teil der Serie gehen wir eine Ebene tiefer: zu den Daten selbst. Was ist Data Knowledge, warum ist es oft das am stärksten vernachlässigte Wissen in einer Organisation und wie baut man einen Data Catalog, den tatsächlich jemand benutzt?
