---
title: "Ob ein Bauteil gut, mittel oder schlecht war, hing vom Prüfer ab"
meta_title: "Automatisierte Sichtprüfung mit Computer Vision in der Bauteilprüfung"
image: "/images/casestudies/automatisierte-sichtpruefung-mit-computer-vision.jpg"
draft: false
description: "Wie ein Hersteller technischer Bauteile mit automatisierter Bildanalyse subjektive Sichtprüfungen durch reproduzierbare, quantitative Messungen ersetzt hat."
summary: "Bei einem Hersteller technischer Bauteile wurden Materialtests bisher per Augenschein bewertet, in Kategorien wie 'gut', 'mittel' oder 'schlecht'. Wir haben eine automatisierte Bildanalyse entwickelt, die Abrieb, Risslänge und Rissdichte objektiv und reproduzierbar misst, unabhängig davon, wer die Prüfung durchführt."
---

### Ausgangslage

Unser Kunde, ein Hersteller technischer Bauteile, prüfte jedes Testmuster von Hand. Ein Mitarbeiter fotografierte das Bauteil nach dem Test, sah sich Abrieb und Rissbild an und traf ein Urteil: gut, mittel oder schlecht. Jahrelange Erfahrung steckte in diesem Blick. Eine Messung war es nicht.

Solange die Unterschiede deutlich waren, reichte das. Bei feinen Veränderungen wurde es schwierig. Zwei Prüfer sahen dasselbe Bauteil und kamen zu unterschiedlichen Einschätzungen. Derselbe Prüfer bewertete dieselbe Art von Schaden an zwei verschiedenen Tagen nicht immer gleich. Das lag nicht an mangelnder Sorgfalt. Nach vielen Bauteilen am Stück lässt bei jedem Menschen irgendwann die Konzentration nach, und ein Detail rutscht durch. Das passiert dem erfahrensten Prüfer genauso wie dem neuen Kollegen.

Besonders schwierig wurde es bei komplexen Rissbildern. Mehrere Risse liefen sternförmig von einem Punkt aus auseinander, unterschiedlich lang, unterschiedlich dicht. Eine einfache Risslänge als Maßstab griff hier zu kurz. Ob ein Bauteil im zweiten Test wirklich schlechter abschnitt oder zwei Prüfer dieselbe Stelle nur unterschiedlich gelesen hatten, ließ sich im Nachhinein nicht mehr klären. Ein Ergebnis, dem man vertrauen konnte, unabhängig davon, wer die Prüfung durchführte, gab es so nicht.

> **Was ist Computer Vision?**
> Software, die ein Foto nicht nur anzeigt, sondern auswertet: Formen, Farben, Strukturen, Muster. Statt dass ein Mensch ein Bild ansieht und einschätzt, misst ein Programm, was tatsächlich zu sehen ist, jedes Mal nach denselben Regeln, ohne müde zu werden oder einen schlechten Tag zu haben.

### Vorgehen

Wir haben eine automatisierte Bildanalyse entwickelt, hauptsächlich mit Python. Der erste Schritt war, den Blick eines Prüfers durch eine systematische Auswertung zu ersetzen. Statt ein Foto als Ganzes zu betrachten, teilt das Programm es in viele kleine Ausschnitte und wertet jeden einzeln aus: wie hell oder dunkel eine Stelle ist, wie stark sich die Farbe verändert. Abrieb zeigt sich zum Beispiel als aufgeraute, leicht andersfarbige Fläche. Genau das macht das Programm messbar, unabhängig davon, aus welchem Winkel oder bei welchem Licht das Foto entstanden ist.

Rissstrukturen brauchten einen eigenen Ansatz. Ein Rissbild mit mehreren Ausläufern, die sternförmig auseinanderlaufen, lässt sich nicht mit einer einzigen Länge beschreiben. Wir nutzen dafür ein Verfahren namens Skeletonisierung. Es reduziert ein verzweigtes Rissbild auf seine Grundlinien, ähnlich wie eine Landkarte, die nur noch die Hauptflüsse zeigt und die kleinen Rinnsale drumherum weglässt. Übrig bleibt die eigentliche Struktur des Risses. Daraus berechnen wir Risslänge, Rissdichte und Rissverteilung, für jeden einzelnen Riss und für das Bauteil insgesamt.

Eine Messung nützt wenig, wenn sie sich nicht wiederholen lässt. Deshalb haben wir zusätzlich eine Weboberfläche gebaut, in der ein Mitarbeiter die Parameter und Empfindlichkeiten für ein Produkt einmal festlegt. Jeder folgende Test läuft dann unter denselben Bedingungen, egal wer ihn durchführt oder wie viel Zeit dazwischenliegt. Erst dadurch werden zwei Messungen über Wochen oder Produktgenerationen hinweg überhaupt vergleichbar.

### Ergebnisse

Eine klassische Kennzahl wie eine Zeitersparnis oder eine veränderte Ausschussquote gibt es bei diesem Projekt nicht. Die geprüften Bauteile sind Einzelstücke, kein Serienprozess mit hohen Stückzahlen, an dem sich so etwas ablesen ließe. Der Wert liegt woanders.

Aus einer Einschätzung nach Augenmaß ist eine reproduzierbare, dokumentierte Messung geworden. Ob ein Bauteil im zweiten Test wirklich schlechter war als im ersten, lässt sich heute sauber belegen, mit denselben Kennzahlen, unabhängig vom Prüfer und vom Zeitpunkt der Messung. Anders als ein Mensch wird das Programm dabei nicht müde und lässt sich nicht von der Tagesform beeinflussen: Bauteil eins und Bauteil hundert werden nach genau denselben Regeln bewertet. Zwei Prüfer, die dasselbe Bauteil beurteilen, kommen heute zum selben Ergebnis, weil beide dasselbe Verfahren nutzen und keine persönliche Einschätzung.

Ob ein Bauteil gut, mittel oder schlecht ist, hängt damit nicht mehr davon ab, wer gerade prüft.