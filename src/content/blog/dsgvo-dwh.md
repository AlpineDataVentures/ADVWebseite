---
title: "Datenschutz im DWH: Was die DSGVO für Datenprojekte bedeutet"
meta_title: "DSGVO und Data Warehouse: Was Unternehmen wissen müssen bevor sie loslegen"
description: "Ein Data Warehouse aggregiert Daten aus vielen Quellen — und macht damit Datenschutz zur echten Herausforderung. Wir erklären die sieben DSGVO-Grundsätze, was sie für das Warehouse bedeuten und welche Maßnahmen Pflicht sind."
date: 2026-07-01T08:30:00Z
image: "/images/blog/dsgvo-dwh.png"
categories: ["Datenschutz"]
author: "Ben Diez"
tags: ["Data Warehouse", "Datenschutz", "DSGVO"]
draft: false
summary: "Das DWH steht, die ETL Pipeline läuft und plötzlich fragt jemand ob vorab eigentlich der Datenschutzbeauftragte einbezogen wurde. Spoiler: wurde er nicht."
---

*Teil 6 unserer Serie über den kompletten Aufbau eines datengetriebenen Unternehmens [Teil 5 lesen](/blog/how-to-etl/)*

Thalbergs Datenprojekt läuft mittlerweile auf Hochtouren. Das Data Warehouse steht, die Pipeline liefert Kundendaten, Kaufhistorie und Bonitätsdaten. Die ersten Auswertungen nehmen Form an, es sieht bereits jetzt nach einem Happy End aus.

Doch wie so oft im Leben lassen die ersten Wolken am Himmel nicht lange auf sich warten: wenig später sitzt der Geschäftsführer in einem Seminar über Unternehmensrisiken. Der Referent spricht über die DSGVO(Datenschutzgrundverordnung) und die drohenden Bußgelder, die Firmen bei Verstößen drohen können. Er nennt Zahlen... große Zahlen...

Am nächsten Morgen hat der Projektleiter eine E-Mail im Posteingang: *"Kurze Frage zum Data Warehouse: haben wir das eigentlich mit dem Datenschutzbeauftragten besprochen?"*

Die Gegenfrage kommt prompt: *"Haben wir überhaupt einen Datenschutzbeauftragten?"*

### Warum DSGVO im Data Warehouse ein eigenes Thema ist
Das Data Warehouse aggregiert Daten aus vielen Quellen und macht sie kombinierbar. Kaufverhalten aus dem CRM, Zahlungshistorie aus dem ERP, Kontaktdaten aus der Excel-Liste: zusammengeführt entstehen plötzlich detaillierte **Profile** über Kunden und Ansprechpartner, die in den Einzelsystemen so nie sichtbar waren.

In so einem Moment wird das Thema Datenschutz plötzlich sehr greifbar. Solange Daten in Silos leben, ist die Datenschutzfrage überschaubar — jedes System hat seine eigenen Berechtigungen, seine eigenen Verantwortlichen, seine eigene kleine Welt. Sobald alles zusammenfließt, ändert sich die Lage grundlegend.

Die DSGVO regelt das in Art. 5 mit sieben Grundsätzen, die jeder, der mit Daten arbeitet, zumindest einmal gelesen haben sollte:

#### 1. Rechtmäßigkeit, Verarbeitung nach Treu und Glauben, Transparenz
Daten dürfen nur mit einer gültigen Rechtsgrundlage verarbeitet werden, zum Beispiel auf Basis einer Einwilligung, eines Vertrag oder eines berechtigten Interesses (besonders dieser Punkt führt zu den nervenzehrendsten Debatten). Dazu muss die betroffene Person wissen, was mit ihren Daten passiert. Im Warehouse-Kontext bedeutet das: Wer Kundendaten ins Warehouse lädt, braucht eine Rechtsgrundlage dafür und muss dies auch nachweisen können.

#### 2. Zweckbindung
Daten dürfen nur für den Zweck genutzt werden für den sie ursprünglich erhoben wurden. Wer Kundendaten ausschließlich für Rechnungsstellung und Versand erhebt, darf sie nicht ohne weiteres für Marketingauswertungen verwenden. Im Warehouse ist das besonders verlockend: Die Daten sind da, die Technik kann es, warum also nicht? Kurze Antwort: Weil technische Machbarkeit und rechtliche Erlaubnis zwei verschiedene Dinge sind.

#### 3. Datensparsamkeit
Es dürfen nur die Daten verarbeitet werden die für den jeweiligen Zweck tatsächlich notwendig sind. Ein Warehouse verleitet zur Sammelwut, alleine aufgrund der Tatsache, dass Speicher heutzutage sooo günstig ist. Folglich lädt man lieber zu viel als zu wenig, weil man ja nie weiß was man später noch braucht. (Übrigens der gleich Grund, dass wir noch den Originalkarton unseres Firmen Super Nintendos im Keller stehen haben...) Das ist aus Datenschutzsicht schnell geklärt: Was nicht gebraucht wird, gehört nicht rein.

#### 4. Richtigkeit
Daten müssen sachlich korrekt und aktuell sein. Falsche oder veraltete Daten müssen korrigiert oder gelöscht werden. Im Warehouse bedeutet das: Wer Daten repliziert, repliziert auch Fehler. Eine regelmäßige Qualitätsprüfung ist nicht nur technisch sinnvoll, sondern rechtlich geboten.

#### 5. Speicherbegrenzung
Personenbezogene Daten dürfen nicht länger gespeichert werden als für den jeweiligen Zweck notwendig. Warehouses tendieren dazu, alles für immer aufzuheben, da Speicher wie erwähnt günstig ist und man historische Daten für Analysen braucht. Das ist legitim, solange man definiert hat wie lange welche Daten aufbewahrt werden dürfen und dieses Konzept auch umsetzt. Darüber hinaus gelten für bestimmte Daten auch rechtliche Aufbewahrungspflichten.

#### 6. Integrität und Vertraulichkeit
Daten müssen durch geeignete technische und organisatorische Maßnahmen (TOMs) gegen unbefugten Zugriff, Verlust oder Zerstörung geschützt werden. Verschlüsselung, Zugriffsrechte, Protokollierung sind keine optionalen Features, sondern Pflicht.

#### 7. Rechenschaftspflicht
Der Verantwortliche (in unserem Fall die Firma Thalberg) muss die Einhaltung aller Grundsätze nicht nur sicherstellen, sondern auch nachweisen können. Dokumentation ist Pflicht!. Wer im Zweifel nicht zeigen kann wie Daten verarbeitet werden, hat bei einem überraschenden Audit ein Problem, unabhängig davon ob er es tatsächlich richtig gemacht hat.

### Welche Daten sind überhaupt personenbezogen?
Mehr als die meisten denken. Name und Adresse sind offensichtlich. Aber auch Kundennummern die auf natürliche Personen zurückführbar sind, Kaufverhalten, das Rückschlüsse auf Einzelpersonen erlaubt (sog. Proxies), und IP-Adressen fallen unter den Schutzbereich der DSGVO.

Im B2B-Kontext überrascht das viele: Kontaktdaten von Ansprechpartnern bei Geschäftskunden sind personenbezogen. Max Mustermann, Einkaufsleiter bei der Mustermann GmbH, ist eine natürliche Person, auch wenn Thalberg ihn primär als Geschäftskontakt betrachtet.

### Zugriffsrechte und Protokollierung
Wer darf welche Daten sehen und wer hat wann draufgeschaut? Das ist nicht nur eine UX-, sondern vor allem eine Datenschutzfrage. Row-Level Security, die wir in Post 3 bereits als technisches Konzept eingeführt haben, ist gleichzeitig eine der wichtigsten technischen Datenschutzmaßnahmen im Warehouse.
Dazu kommt die Protokollierung: Jeder Zugriff auf personenbezogene Daten sollte nachvollziehbar sein. Das hat weniger mit Misstrauen zu tun, als mit Rechenschaftspflicht.

### Pseudonymisierung und Anonymisierung
**Pseudonymisierung** bedeutet: Der echte Name oder die Kundennummer wird durch einen Code ersetzt, zum Beispiel "K-4471" statt "Max Mustermann". Wer den Schlüssel hat, kann den Code wieder entschlüsseln. Die Daten gelten weiterhin als personenbezogen, sind aber deutlich besser geschützt als im Klartext.

**Anonymisierung** geht weiter: Die Daten werden so verändert, dass kein Weg mehr zurück zu einer konkreten Person führt. Erst dann fallen sie nicht mehr unter die DSGVO. In der Praxis ist echte Anonymisierung jedoch schwieriger als sie klingt, denn oft reichen wenige Merkmale wie Alter, Postleitzahl und Branche um jemanden wieder zu identifizieren.

Für ein Warehouse empfiehlt sich Pseudonymisierung als Mindeststandard: Klarnamen raus, Codes rein, und der Zugriff auf den Schlüssel ist nur berechtigeten Personen gewährt.

### Was Thalberg tun muss
Vier konkrete Schritte die nicht optional sind und schnellmöglich angegangen werden sollten:
1. Eine **Datenschutzfolgenabschätzung**. Vereinfacht gesagt handelt es sich dabei um eine strukturierte Risikoanalyse, die dokumentiert, welche personenbezogenen Daten verarbeitet werden, warum, und welche Schutzmaßnahmen dafür getroffen werden. Die DSGVO schreibt sie vor wenn ein System systematisch große Mengen personenbezogener Daten verarbeitet. Ein Data Warehouse erfüllt dieses Kriterium fast immer.
2. Das **Verzeichnis von Verarbeitungstätigkeiten (VVT)** nach Art. 30 DSGVO, das dokumentiert welche Daten zu welchem Zweck wie lange verarbeitet werden.
3. Die oben bereits erwähnten **technischen und organisatorischen Maßnahmen (TOMs)**: Verschlüsselung, Zugriffsrechte, Protokollierung.
4. den **Datenschutzbeauftragten** ins Projekt holen und zwar zappzarapp.

Der Datenschutzbeauftragte wird vier Wochen nachdem er hätte einbezogen werden sollen ins Projekt geholt. Er ist verständlicherweise nicht begeistert.

Der Praktikant hat in der Zwischenzeit einen vollständigen Export aller Kundendaten als Excel auf seinem privaten Google Drive gespeichert, damit er auch von zuhause drauf kann. Er findet das praktisch. Es ist ein Datenschutzvorfall.

### Datenschutz ist kein Projekthindernis
Wer Datenschutz als Bremse betrachtet, hat ihn noch nie als Qualitätsmerkmal erlebt. Ein Warehouse das sauber dokumentiert, Zugriffsrechte konsequent umsetzt und Daten nur so lange aufbewahrt wie nötig, ist nicht nur rechtskonform, es ist auch besser wartbar, vertrauenswürdiger und im Zweifel krisenfester.

Und eine letzte Frage bleibt offen: Braucht Thalberg überhaupt den erwähnten Datenschutzbeauftragten überhaupt? Und wenn ja, was macht der eigentlich den ganzen Tag? Darum geht es nächste Woche.