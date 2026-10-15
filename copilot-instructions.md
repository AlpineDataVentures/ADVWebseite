---
applyTo: "**"
---

# Projektkontext
- Dieses Repository ist die Website von Alpine Data Ventures GmbH auf Basis von Astro.
- Hauptfokus ist schnelle, sichere Weiterentwicklung mit Copilot im bestehenden Code.
- Priorität hat Lead-Generierung über klare CTAs und saubere Kontaktpfade.

# Stack und Arbeitsweise
- Astro mit TypeScript, React-Komponenten, Tailwind/CSS.
- Inhalte liegen primär unter src/content.
- Seitenrouting liegt unter src/pages.
- Wiederverwendbare Layoutteile liegen unter src/layouts.
- Styles liegen unter src/styles.
- Build und lokale Entwicklung erfolgen über **npm** (NICHT yarn).
- Package Manager: npm mit package-lock.json (kein yarn.lock).

# Bevorzugte Befehle
- npm install (Abhängigkeiten aktualisieren)
- npm run dev (lokaler Dev-Server)
- npm run build (Production Build)
- npm run preview (Build Preview)
- npm run format (Code formatieren)
- npm run generate-json (JSON-Skript für Konfiguration)

# Regeln für Änderungen
- Nur die für die Aufgabe notwendigen Dateien ändern.
- Bestehende Struktur und Benennungen respektieren.
- Keine ungefragten Refactorings oder Umstrukturierungen.
- Bei UI-Änderungen mobile Darstellung mitdenken.
- Bei Text- und CTA-Änderungen auf Conversion-Klarheit achten.
- Bei Unsicherheit zuerst kleine, reversible Änderungen vorschlagen.
- **IMMER npm verwenden, NIEMALS yarn!** (package-lock.json ist die Source of Truth)

# Dokumentationsrichtlinien
- Neu erzeugter oder wesentlich geänderter Code muss so dokumentiert sein, dass sein Zweck und seine Verwendung verständlich sind.
- Dokumentiere Komponenten, Module und Funktionen dort, wo ihr Zweck oder Zusammenspiel nicht bereits aus dem Code klar hervorgeht.
- Dokumentiere öffentliche Props, Parameter, Rückgabewerte und Konfigurationsoptionen, wenn ihre Bedeutung oder Einschränkungen nicht offensichtlich sind.
- Erkläre bei nicht-trivialer Logik, Workarounds und Seiteneffekten vor allem das Warum und relevante Annahmen – nicht lediglich, was die nächste Codezeile tut.
- Halte Kommentare kurz, aktuell und in Englisch; folge einer bestehenden abweichenden Sprachkonvention in einem Bereich.
- Kommentiere keinen offensichtlichen Code und nicht jede einzelne Zeile. Einfache Markup- und Styling-Änderungen brauchen keine Kommentare, wenn Zweck und Verhalten klar sind.
- Aktualisiere README oder passende Projektdokumentation, wenn eine Änderung Einrichtung, Nutzung, Konfiguration oder extern sichtbares Verhalten beeinflusst.
- Dokumentation muss mit dem tatsächlichen Verhalten übereinstimmen; entferne oder passe veraltete Kommentare an, wenn du den zugehörigen Code änderst.

# Qualitätscheck vor Abschluss
- Projekt baut erfolgreich mit npm run build.
- Betroffene Seite funktioniert lokal im Dev-Server.
- Keine offensichtlichen Konsolenfehler auf betroffenen Seiten.
- Keine unbeabsichtigten Änderungen ausserhalb des Scopes.

# Fokusbereiche im Projekt
- Career-Seite gezielt weiterentwickeln.
- Kontaktstrecke von Startseite, Career und Contact verbessern.
- Redesign schrittweise vorbereiten, kein Big-Bang-Umbau.

# Erwartetes Copilot-Verhalten
- Erst kurz den geplanten Ansatz nennen, dann Änderungen umsetzen.
- Bei größeren Aufgaben in kleine Schritte aufteilen.
- Risiken und mögliche Nebenwirkungen transparent benennen.
- Konkrete Verifikation nach Änderungen mitliefern.
