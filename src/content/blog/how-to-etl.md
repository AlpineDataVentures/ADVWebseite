---
title: "ETL von A bis Z: Wie Daten aus CRM und ERP sauber ins Warehouse kommen"
meta_title: "ETL erklärt: Wie Daten aus CRM und ERP sauber ins Data Warehouse kommen"
description: "Extract, Transform, Load: Wir erklären wie ETL in der Praxis funktioniert, welche Tools helfen und warum die Transformation das unterschätzte Herzstück jedes Datenprojekts ist."
date: 2026-06-22T08:30:00Z
image: "/images/blog/how-to-etl.png"
categories: ["Data Warehouse"]
author: "Ben Diez"
tags: ["Data Warehouse", "Data Engineering", "Data Infrastructure", "ETL", "Data Catalog"]
draft: false
summary: "Das Warehouse steht, jetzt müssen die Daten rein. ETL klingt nach drei einfachen Schritten, ist in der Praxis aber vor allem eines: der Teil des Projekts über den hinterher alle reden."
---

*Teil 5 unserer Serie über den kompletten Aufbau eines datengetriebenen Unternehmens [Teil 4 lesen](/blog/how-to-dwh/)*

Die Architekturentscheidung ist getroffen, das Grundgerüst steht und alle Beteiligten sind stolz wie Bolle. Irgendwer hat sogar einen Screenshot vom leeren Warehouse gemacht und ihn als "epischen Meilenstein" im Team-Chat präsentiert. Unterbrochen wird die Euphorie nur von einer Person, die die unausgesprochenen, aber offensichtliche Frage in den Raum wirft:

*Wie kommen die Daten da eigentlich rein?*

Es folgt eine Stille im Raum, die jeder kennt, dem beim Elternabend rausgerutscht ist, dass das eigene Kind schonmal Zucker gekriegt habe... Der Praktikant schlägt vor, sämtliche Daten manuell reinzukopieren (und meint das ernst). Er hat sogar schon hochgerechnet, dass man das an einem langen Wochenende schaffen könnte, wenn alle mit anpacken.

So bewundernswert diese Arbeitsethik ist, die richtige Antwort auf diese Frage ist nicht das händische Laden aller Daten, sondern ein Prozess, der sich **ETL** nennt.

### Was bedeutet "ETL"?
ETL steht für *Extract, Transform, Load*: Daten aus Quellsystemen ziehen, bereinigen und vereinheitlichen, ins Warehouse laden. Wenn man es so formuliert, Klingt es recht simpel, aber der Teufel steckt wie so oft im Detail. Besonders der mittlere Schritts sorgt regelmäßig für Wutausbrüche bei allen Beteiligten. Mehr dazu weiter unten.

#### Extract: Wo die Daten herkommen

Der erste Schritt ist der vermeintlich einfache: Daten aus den Quellsystemen ziehen. "Vermeintlich", weil jedes Quellsystem seine eigene Logik hat.

**APIs** sind der komfortabelste Weg. Moderne CRM-Systeme haben gut dokumentierte APIs über die man strukturiert auf Daten zugreifen kann. Man definiert was man will, die API liefert es. Soweit die Theorie.

**Datenbankverbindungen** sind die Alternative wenn keine API vorhanden ist. Viele ERP-Systeme, gerade ältere, haben keine API, man kann aber direkt auf die Datenbank zugreifen, wenn man die richtigen Zugangsdaten und Berechtigungen hat

**Flat Files** sind der Notausgang. Dazu gehören Excel-Listen, CSV-Exporte oder manuelle Auszüge aus Systemen. Funktioniert, ist aber fehleranfällig und skaliert nicht. Wer dauerhaft auf Flat Files angewiesen ist, hat ein Quellsystem-Problem das man früher oder später lösen muss.

Bei Thalberg hat das CRM eine API, das ERP nicht. Erfreulicherweise bietet ERP-Hersteller einen kostenpflichtigen Connector an, der wenig überraschend mehr kostet als erwartet. Die Diskussion darüber dauert zwei Wochen. Am Ende kauft man ihn, weil die Alternative (manuelle CSV-Exporte jeden Montag früh) auf Dauer äußerst uncharmant ist.

#### Transform: Das unterschätzte Herzstück

Wenn man Datenprojekte mit Menschen bespricht die noch keine gemacht haben, reden alle über das Dashboard. Alle, die da Spiel schon einmal mitgespielt haben, reden über die Transformation der Daten.

Transformation ist der Schritt in dem rohe, inkonsistente oder auch widersprüchliche Daten aus verschiedenen Quellen in eine saubere, einheitliche Struktur gebracht werden. Das ist mehr oder weniger genau so technisch, wie es klingt. Der größte Zeitfresser im ganzen Prozess ist dann allerdings inhaltlicher Natur.

**Vereinheitlichung von Formaten:** Datum ist nicht gleich Datum. Im CRM steht "15.04.2026", im ERP "2026-04-15", in der Excel "Apr 15". Für die meisten Menschen kein Problem (wer schon einmal mit amerikanischen Formaten gearbeitet hat, weiß, was wir meinen), für eine Datenbank dagegen ein sehr großes.

**Behandlung von Duplikaten:** Derselbe Kunde taucht im CRM dreimal auf, weil er dreimal angelegt wurde, einmal mit Firmennamen, einmal ohne, einmal mit Tippfehler. Welcher davon ist der richtige? Das muss definiert werden, bevor es automatisiert werden kann.

**Fehlende Werte:** Was passiert wenn ein Pflichtfeld leer ist? Weglassen? Mit einem Standardwert füllen? Fehler werfen? Jede Entscheidung hat Konsequenzen, und keine ist universell richtig. So langsam sollte klar werden, warum die Kaffeemaschine im Data Engineering regelmäßig in die Knie geht.

**Business-Logik abbilden:** Umsatz mit oder ohne MwSt.? Retouren rein oder raus? Ab welchem Datum gilt ein Kunde als aktiv? Das sind keine technischen Fragen, sondern inhaltliche Entscheidungen die jemand treffen muss und die natürlich dokumentiert werden müssen, damit man auch in 6 Monaten noch weiß, warum so entschieden wurde.

#### Load: Ins Warehouse laden

Der dritte Schritt ist technisch am klarsten, aber auch hier muss noch eine wichtige Entscheidung getroffen werden.

**Full Load bedeutet:** Bei jedem Ladelauf werden *alle* Daten neu geladen. Das ist einfach, robust, aber vergleichsweise teuer bei großen Datenmengen. Und langsam, langsam hätten wir fast vergessen.

**Incremental Load bedeutet:** Es werden nur die Daten geladen die sich seit dem letzten Durchlauf geändert haben. Effizienter, aber komplexer, denn man muss wissen, welche Datensätze neu oder geändert sind.

Für den Start empfiehlt sich meistens der Full Load, solange die Datenmengen überschaubar sind. Sobald die Pipeline täglich läuft und die Tabellen wachsen, lohnt sich der Umstieg auf Incremental.

### Tool-Auswahl: Was passt zu welchem Stack
Wie so oft im Leben gibt es auch hier keine universell richtige Antwort.

Orchestrierungstools wie *Apache Airflow* oder *Prefect* koordinieren, wann welche Pipeline läuft, in welcher Reihenfolge und was passiert wenn etwas schiefgeht. Mächtig, aber mit Lernkurve (neudeutsch für: das ist mit einer Menge Arbeit verbunden).

Managed Connectors wie *Fivetran* oder *Airbyte* nehmen die Arbeit der Extraktion ab. Vorgefertigte Konnektoren für hunderte Quellsysteme, wenig Aufwand, dafür laufende Kosten. Für Teams ohne tiefe Daten-Engineering-Kapazität oft die pragmatischste Wahl.

Transformations-Frameworks wie *dbt* haben sich als Standard für die Transform-Schicht etabliert. Wer saubere, nachvollziehbare Transformationen bauen will, kommt an dbt kaum vorbei.

*Cloud-native ETL-Dienste* der großen Anbieter sind oft die naheliegendste Wahl wenn man bereits in deren Ökosystem ist. Sie sind gut integriert, skalieren automatisch und erfordern wenig eigene Infrastruktur.

Empfehlung aus unserer Erfahrung heraus: Wer klein anfängt, sollte nicht mit der komplexesten Toolchain starten. Lieber eine einfache Pipeline die läuft, als eine elegante die niemand versteht.

### Warum ETL-Projekte länger dauern als geplant

Kurzantwort: Weil Datenbereinigung nie wirklich fertig ist.

Quellsysteme ändern sich, ein Feld wird umbenannt, eine neue Produktkategorie wird eingeführt oder - besonders gut für den Blutdruck - jemand ändert das Datumsformat im ERP weil es ihm "so besser gefällt". Jede dieser Änderungen kann eine Pipeline zum Absturz bringen, wenn niemand sie dokumentiert und kommuniziert.

Dazu kommt: Je tiefer man in die Daten schaut, desto mehr Probleme findet man. Das ist jedoch kein Zeichen dass das Projekt schlecht läuft, sondern vielmehr, dass jemand endlich richtig hinschaut. Das sollte entsprechend eingeplant werden, sonst bricht bei jedem noch so kleinen Finding kollektive Verunsicherung aus.

Die pragmatische Antwort auf diese Punkte: Monitoring einbauen von Anfang an. Automatische Tests die prüfen ob die Daten das erwartete Format haben, Pflichtfelder befüllt sind oder die Zeilenzahl plausibel ist. Eine Pipeline ohne Monitoring ist eine Pipeline die still scheitert.

### Was als nächstes kommt
Thalbergs Daten fließen bis auf weiteres. Nicht perfekt, aber gut genug um weiterzumachen. Das CRM ist angebunden, das ERP auch, und die Excel-Listen werden vorerst noch manuell eingespielt weil die Verhandlung über den automatischen Export gerade in stockt.

Dabei ist den Verantowrtlichen aufgefallen: Im CRM stecken Kundenadressen, Ansprechpartner, Kaufhistorien, im ERP Konditionen, Zahlungsverhalten, Bonitätsdaten. All das fließt jetzt in ein zentrales Warehouse und plötzlich fragt jemand völlig zurecht: *Dürfen wir das überhaupt?*

Nächste Woche: **Datenschutz im Data Warehouse**. Was die *DSGVO* für Datenprojekte bedeutet, welche Daten wie behandelt werden müssen und warum man diese Frage besser vor dem ersten Pipeline-Run stellt als danach.