---
title: "Data Knowledge: Wenn Daten sprechen, aber niemand die Sprache versteht"
meta_title: "Data Knowledge verstehen: Warum fehlendes Datenwissen zu falschen Entscheidungen führt"
description: "Viele Unternehmen haben Daten, aber kein Wissen über ihre Bedeutung. Dieser Artikel zeigt, warum Data Knowledge unc Co. entscheidend für verlässliche Analysen sind."
date: 2026-03-30T10:00:00Z
image: "/images/blog/knowledge-management-3.png"
categories: ["Knowledge Management"]
author: "Ben Diez"
tags: ["Governance", "Data Lineage"]
draft: false
summary: "Daten helfen nur, wenn man versteht, was sie bedeuten. Dieser Artikel erklärt, warum technisches, semantisches und kontextuelles Wissen über Daten entscheidend ist und welche Rolle Data Catalog, Glossar und Lineage für verlässliche Entscheidungen spielen."
---

*Teil 3 von 3 unserer Serie über Knowledge Management*

Zum ersten Teil der Serie: [Knowledge Management - oder: Der 1. Tag in der eigenen Wohnung](/blog/knowledge-management-1/)

Zum zweiten Teil der Serie: [Knowledge Management in der Praxis: Warum niemand das Handbuch liest](/blog/knowledge-management-2/)

Stell dir vor, du erbst eine riesige Bibliothek. Tausende Bücher, säuberlich in Regalen sortiert. Auf den ersten Blick beeindruckend. Auf den zweiten Blick merkst du: Die Bücher haben keine Titel auf dem Rücken. Manche sind in Sprachen, die du nicht kennst. Einige Seiten sind handschriftlich ergänzt, ohne zu wissen von wem oder wann. Der Bibliothekar, der das alles kannte, ist vor drei Monaten in Rente gegangen. Und wie wir aus Teil 2 der Serie wissen, hat der Wendler seine Biografie in irgendein Regal geschmuggelt.

Das heißt im Klartext: Du hast die Daten. Was du nicht hast, ist das Wissen, was sie bedeuten.

Dasselbe passiert Tag für Tag in Unternehmen, die fleißig Daten sammeln, aber vergessen, das Wissen über diese Daten zu pflegen. Man spricht dann von fehlendem Data Knowledge, einem der teuersten und am wenigsten sichtbaren Probleme in modernen Organisationen.

### Was ist Data Knowledge überhaupt
Data Knowledge bedeutet nicht, Daten auswerten zu können, sondern die Daten selbst zu verstehen. Dazu gehört zu wissen, woher die Daten kommen, was sie genau bedeuten, wie sie erfasst wurden, wie aktuell sie sind, wer dafür verantwortlich ist und wofür sie verwendet werden dürfen. Nur mit diesem Wissen können Daten richtig genutzt werden.

Man unterscheidet dabei grob drei Schichten:

**Technisches Wissen**: Wichtig ist ein grundlegendes Verständnis dafür, wo die Daten gespeichert sind, wie sie aufgebaut sind und wie sie zusammenhängen. Dazu gehört zu wissen, in welchem System die Daten liegen, welche Informationen erfasst werden und wie diese miteinander verbunden sind. Dieses Wissen hilft, Daten richtig zu nutzen und Fehler zu vermeiden.

**Semantisches Wissen**: Neben der Technik ist wichtig zu verstehen, was die Daten inhaltlich bedeuten. Es muss klar sein, wie Kennzahlen genau definiert sind, zum Beispiel was unter Umsatz verstanden wird, ob Stornierungen mitzählen oder wann ein Kunde als aktiv gilt. Nur wenn alle dieselbe Bedeutung zugrunde legen, lassen sich Daten richtig vergleichen und auswerten.

**Kontextuelles Wissen**: Daten lassen sich oft nur richtig verstehen, wenn man den Hintergrund kennt. Zum Beispiel warum Werte plötzlich stark abweichen, warum Daten fehlen oder warum zwei Berichte unterschiedliche Zahlen zeigen. Häufig liegen die Gründe in Änderungen am System, an der Erfassung oder an unterschiedlichen Definitionen.

Die ersten beiden Schichten lassen sich noch halbwegs dokumentieren. Die dritte steckt meistens in den Köpfen der Belegschaft und ist damit genauso flüchtig wie jedes andere implizite Wissen.

### Warum das ein größeres Problem ist als es aussieht

Der Schaden, den schlechtes Data Knowledge anrichten kann, ist heimtückisch, weil er oft unsichtbar bleibt. Niemand bemerkt, dass eine Kennzahl falsch interpretiert wird, bis eine wichtige Entscheidung auf deren Basis getroffen wurde. Niemand merkt, dass zwei Teams dieselbe Metrik unterschiedlich berechnen, bis sie sich in einem Meeting/Handgemenge mit zwei verschiedenen Zahlen gegenüberstehen und keiner erklären kann, woher die Unterschiede kommen.

Das Vertrauen in Daten ist schnell verspielt und schwer zurückzugewinnen. Wenn ein Führungsteam einmal erlebt hat, dass ein Dashboard falsche Zahlen gezeigt hat, oder dass dieselbe Frage je nach Ansprechpartner unterschiedliche Antworten liefert, entsteht eine nachvollziehbare, aber lähmende Skepsis. Plötzlich werden Zahlen nicht mehr als Entscheidungsgrundlage genutzt, sondern als Startpunkt für eine Grundsatzdiskussion über Datenqualität.

Dazu kommt: Data Knowledge veraltet schneller als das meiste Wissen. Berechnungslogiken ändern sich still und heimlich. Felder werden umbenannt. Neue Datenquellen kommen hinzu und werden mit alten zusammengeführt, ohne dass jemand dokumentiert, was dabei passiert ist. Jede dieser Veränderungen hinterlässt eine kleine Lücke im kollektiven Verständnis, sodass nach ein paar Jahren das Fundament nur noch aus Lücken und Workarounds besteht.

### Der Data Catalog: Mehr als ein Datenlexikon

Die naheliegende Antwort auf fehlendes Data Knowledge ist ein Data Catalog, ein zentrales Verzeichnis, das beschreibt, welche Daten eine Organisation hat, was sie bedeuten und wo sie zu finden sind. Klingt in der Theorie simpel, ist in der praktischen Umsetzung aber das genaue Gegenteil.

Ein Data Catalog, der nur technische Metadaten enthält, wie z. B. Tabellennamen, Feldtypen, Zeilenzahlen, ist zwar besser als kein Data Catalog, aber nicht viel. Der eigentliche Wert entsteht erst, wenn semantisches und kontextuelles Wissen hinzukommt: Beschreibungen in menschlicher Sprache, Beispielwerte, bekannte Einschränkungen oder Zuständigkeiten.

Hier liegt das Problem, das jedem bekannt vorkommt, der Teil 2 dieser Serie gelesen hat: Ein Data Catalog ist ein Tool. Kein Tool löst ein Kulturproblem. Wer einen Data Catalog einführt und darauf wartet, dass er sich von selbst füllt, wartet lang und vergeblich.

Was funktioniert, ist dasselbe Prinzip wie im allgemeinen Knowledge Management: Dokumentation muss dort entstehen, wo die Arbeit passiert. Das bedeutet konkret, dass Data Engineers und Analysten Beschreibungen idealerweise direkt in dem Moment schreiben, in dem sie einen Datensatz erstellen oder verändern und nicht irgendwann später, wenn die Erinnerung langsam verblasst. Es bedeutet, dass Datendefinitionen nicht in einem separaten Dokument leben, sondern direkt am Datensatz hängen. Und es bedeutet, dass jemand die Verantwortung für die Pflege übernimmt, der sogenannte Data Owner. Der weiß nicht nur, was die Daten bedeuten, sondern sorgt auch dafür, dass dieses dokumentierte Wissen aktuell bleibt.

### Datendefinitionen: Die unterschätzte Grundlage

Einer der wirkungsvollsten, am häufigsten unterschätzten Schritte im Data Knowledge Management ist die konsequente Definition von Begriffen. Was klingt wie eine akademische Übung, ist in der Praxis brandgefährlich, wenn es fehlt.

Nehmen wir den Begriff „Conversion Rate". Klingt erst einmal einfach. Außer: Zählt man Besucher oder Sessions im Nenner? Zählt ein Kauf, der später storniert wird, als Conversion? Was ist mit Käufen über mehrere Geräte hinweg, zählen die einmal oder mehrfach? Je nach Antwort kann dieselbe Kennzahl um mehrere Prozentpunkte abweichen.

Ein Business Glossary, also ein kontrolliertes Vokabular, das zentrale Begriffe eindeutig definiert, ist in Organisationen kein nice-to-have, sondern eine Voraussetzung für valide Kommunikation. Es soll auch gar nicht darum gehen, bürokratisch jedes Wort festzuzurren, sondern darum, bei den Begriffen, die wirklich wichtig sind und regelmäßig zu Missverständnissen führen, Klarheit zu schaffen.

### Data Lineage: Wissen, woher die Daten kommen

Eine weitere Dimension von Data Knowledge, die in (wachsenden) Organisationen schnell kritisch wird: Data Lineage, das Wissen darüber, wie Daten von ihrer Quelle bis zum Dashboard oder Report geflossen sind.

Wenn eine Zahl im Bericht falsch ist, muss jemand verstehen können, wo der Fehler entstanden ist. In einer einfachen Datenwelt ist das trivial. In einer Realität, in der Daten durch fünf verschiedene Systeme, drei Transformationsschritte und zwei Datenmodelle laufen, bevor sie irgendwo auftauchen, ist das schon fast ein Vollzeitjob. Ohne dokumentierte Lineage wird Fehlersuche zum Detektivroman – mit dem Unterschied, dass am Ende nicht immer jemand den Täter findet.

Data Lineage zu dokumentieren ist aufwendig. Aber moderne Data-Stack-Tools – dbt, Apache Atlas, DataHub und andere – machen einen Teil davon automatisch sichtbar, wenn sie konsequent eingesetzt werden. Das ist einer der wenigen Bereiche, in dem die richtigen Tools tatsächlich einen Großteil der Arbeit abnehmen können, wenn sie von Anfang an eingeplant werden.

### Eine Kultur der Datenmündigkeit

Am Ende läuft auch Data Knowledge im Speziellen auf dieselbe Erkenntnis hinaus wie Knowledge Management im Allgemeinen: Tools und Prozesse sind notwendig, aber nicht alles. Was eine Organisation wirklich braucht, ist eine Kultur, in der der Umgang mit Daten als gemeinsame Verantwortung verstanden wird, nicht als Aufgabe des Data Teams allein.

Das bedeutet, dass Business-Seite und Data-Seite gemeinsam Definitionen erarbeiten, statt aneinander vorbeizureden. Es bedeutet, dass Fragen wie „Woher kommt diese Zahl?" und „Wie sicher sind wir, dass das stimmt?" als Zeichen von Kompetenz gelten, nicht als Zweifel an der Arbeit anderer.

Datenmündigkeit ist kein Zustand, den man einmal erreicht. Es ist eine Praxis, die täglich gepflegt werden muss, genau wie die Bibliothek, die man geerbt hat. Man kann die Bücher beschriften, eine Systematik einführen, einen Bibliothekar einstellen. Aber wenn niemand das Regal in Ordnung hält, steht man irgendwann wieder vor Büchern ohne Titel und einer leeren Stelle, wo das Wissen war.

### Fazit der Serie

Drei Artikel, ein gemeinsamer Gedanke: Wissen – ob in Köpfen, in Dokumenten oder in Daten – verschwindet, wenn man es nicht aktiv pflegt. Das klingt offensichtlich. Es wird trotzdem täglich ignoriert.

Knowledge Management ist keine einmalige Initiative, kein Tool-Rollout, kein Projekt mit einem Enddatum. Es ist eine Entscheidung, wie eine Organisation mit dem umgeht, was sie weiß. Wer diese Entscheidung bewusst trifft, baut etwas auf, das bleibt. Wer sie nicht trifft, verlässt sich darauf, dass das Wissen „schon irgendwie“ da ist… bis es eines Tages nicht mehr da ist.
