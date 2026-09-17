---
title: "Schluss mit dem Warten auf Auswertungen"
meta_title: "Einführung eines Data Mesh Ansatzes"
image: "/images/casestudies/einfuehrung-data-mesh.jpg"
draft: false
description: "Wie ein FMCG-Unternehmen die Datenverantwortung aus einer zentralen Fachabteilung heraus- und in die Fachbereiche hineinverlagert hat, gestützt auf Databricks und ein Data-Mesh-Modell."
summary: "Ein FMCG-Unternehmen kannte das Problem aus jedem Meeting: die eine Abteilung hatte diese Zahl, die andere eine andere, weil sich jeder seine eigene Excel-Tabelle gebaut hatte. Wir haben die Datenverantwortung dahin zurückgegeben, wo die Daten entstehen: in die Fachbereiche selbst."
---

### Ausgangslage

Bei unserem Kunden, einem FMCG-Unternehmen, lief jede Datenauswertung über ein einziges **zentrales Team**. Wollte der Vertrieb wissen, wie sich eine Kampagne auf den Abverkauf ausgewirkt hat, oder das Marketing eine Zielgruppenanalyse brauchte, ging eine Anfrage an dieses Team. Eine Antwort kam, wenn Zeit war. Häufig dauerte das **Tage**, weil sich die Anfragen stapelten.

In den Fachbereichen war das längst Alltag geworden. Wer schneller an Zahlen kommen wollte, baute sich seine eigene Excel-Tabelle, mit eigener Logik und eigenen Annahmen oder musste da Data Team bestechen. Zwei Abteilungen konnten bei derselben Frage auf unterschiedliche Zahlen kommen, ohne dass jemand merkte, woran es lag, bis in einem Meeting zwei widersprüchliche Auswertungen aufeinandertrafen.

Für das zentrale Team selbst war die Lage nicht besser. Neben dem täglichen Anfragenstau blieb keine Zeit, die eigene Infrastruktur weiterzuentwickeln oder in den Fachbereichen Kompetenz aufzubauen, die den Druck auf Dauer genommen hätte. Jede neue Anfrage verstärkte nur das bestehende Muster, und niemand außerhalb des Teams hatte einen Überblick, wo welche Daten lagen und wer für ihre Qualität geradestand.

> Ein **[Data Mesh](/products/data-mesh/)** verteilt die Verantwortung für Daten von einer zentralen IT- oder Datenabteilung auf die Fachbereiche, die diese Daten täglich erzeugen und nutzen. Jeder Fachbereich pflegt seine eigenen Datenprodukte, mit einem klaren Verantwortlichen und einem definierten Qualitätsstandard. Eine gemeinsame **Datenplattform** sorgt dafür, dass trotzdem alle auf derselben Basis arbeiten, statt in isolierten Insellösungen.

### Vorgehen

Statt das Problem unternehmensweit auf einmal anzugehen, sind wir mit drei Fachbereichen als ersten Domänen gestartet. Eine **Domäne** als Fachbegriff im Data Mesh Umfeld bezeichnet dabei nichts anderes als eine bestehende Abteilung oder Organisationseinheit. In jeder dieser Domänen haben wir gemeinsam mit den Führungskräften vor Ort zwei bis drei Mitarbeiter aus dem bestehenden Team als künftige **Data-Product-Owner** ausgewählt, niemand wurde dafür neu eingestellt. Ausschlaggebend war nicht das größte Fachwissen, sondern Motivation. Aus unserer Erfahrung haben wir die Lehre gezogen, dass sich ein solches Vorhaben leichter mit interessierten Mitarbeitern stemmen lässt, denen man im Verlauf das notwendige Fachwissen an die Hand gibt statt andersrum.

Als gemeinsame Plattform haben wir **Databricks** eingeführt. Geschult haben wir die neuen Data-Product-Owner direkt an echten Datensätzen ihrer eigenen Domäne, nicht an Beispieldaten aus einem Lehrbuch, damit vom ersten Tag an ein sichtbares Ergebnis für die eigene Abteilung dabei herauskam. Parallel haben wir das Prinzip **"Data as a Product"** vermittelt: jedes Datenprodukt (z. B. ein BI Dashboard, ein Report oder eine Tabelle mit individuell aggregierten Daten) bekommt einen Owner, eine Qualitätsdefinition und einen Verantwortlichen für seinen gesamten Lebenszyklus.

Die Geschäftsführung war von Anfang an eingebunden, nicht nur zur Freigabe des Budgets, sondern in regelmäßigen Updates zum Fortschritt. Das hat uns die Rückendeckung gegeben, die für die Umsetzung notwendig war. Beispielsweise, als in den ersten Wochen Widerstand von Mitarbeitern im zentralen Data Team aufkam, die ungern Verantwortung abgaben, die bisher exklusiv bei ihnen lag.

### Ergebnisse

Drei Fachbereiche verantworten heute ihre eigenen Daten selbst, mithilfe ihrer internen Data-Product-Owner. Wer eine **Standardauswertung** braucht, wartet nicht mehr auf das zentrale Team, sondern ruft sie selbst aus dem gemeinsamen Dashboard ab.

Das allein spart den Fachbereichen **4 bis 5 Personentage im Monat**, Zeit, die vorher in wiederkehrende manuelle Auswertungen floss und jetzt für Analysen frei ist, für die vorher schlicht keine Kapazität da war. Die Excel-Insellösungen aus der Zeit vor dem Data Mesh sind in den drei Domänen verschwunden, ebenso die Diskussionen darüber, wessen Zahl nun stimmt.

Weitere Domänen sind bereits in Vorbereitung, der Rollout läuft nach demselben Muster weiter.

> Durch die Dezentralisierung der Datenverantwortung und das 'Data as a Product'-Prinzip sind wir deutlich effizienter geworden. Die bessere Datenqualität und -verfügbarkeit zahlen sich direkt in schnelleren, besseren Entscheidungen aus."
> — Chief Digital Officer