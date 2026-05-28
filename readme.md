<h1 align=center>Web-Seite der Alpine Data Ventures</h1>

<p align=center>Erstellt auf Basis des <a href="https://astro.build/">Astro-Frameworks</a> inklusive TailwindCSS, TypeScript und React.</p>

<p align=center>Made by <a href="https://alpinedata.de">Alpine Data Ventures</a></p>

<p align=center>
  <a href="https://github.com/withastro/astro/releases/tag/astro%404.3.2" alt="Contributors">
    <img src="https://img.shields.io/static/v1?label=ASTRO&message=4.3&color=000&logo=astro" />
  </a>

  <a href="https://github.com/zeon-studio/astroplate/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/zeon-studio/astroplate" alt="license"></a>

  <img src="https://img.shields.io/github/languages/code-size/zeon-studio/astroplate" alt="code size">

  <a href="https://github.com/zeon-studio/astroplate/graphs/contributors">
    <img src="https://img.shields.io/github/contributors/zeon-studio/astroplate" alt="contributors"></a>
</p>

## 📌 Key Features

- 👥 Multi-Authors
- 🎯 Similar Posts Suggestion
- 🔍 Search Functionality
- 🌑 Dark Mode
- 🏷️ Tags & Categories
- 🔗 Netlify setting pre-configured
- 📞 Support contact form
- 📱 Fully responsive
- 📝 Write and update content in Markdown / MDX
- 🔳 Syntax Highlighting

### 📄 15+ Pre-designed Pages

- 🏠 Homepage
- 👤 About
- 📞 Contact
- 👥 Authors
- 👤 Author Single
- 📝 Blog
- 📝 Blog Single
- 🚫 Custom 404
- 💡 Elements
- 📄 Privacy Policy
- 🏷️ Tags
- 🏷️ Tag Single
- 🗂️ Categories
- 🗂️ Category Single
- 🔍 Search

## 🔗 Integrations

- astro/react
- astro/sitemap
- astro/tailwind

## 🚀 Getting Started

### 📦 Dependencies

- astro 4.0+
- node v20.10+
- npm v10.2+
- tailwind v3.3+

### 👉 Install Dependencies

```bash
npm install
```

### 👉 Development Command

```bash
npm run dev
```

### 👉 Build Command

```bash
npm run build
```

### 👉 Build and Run With Docker

```bash
docker build -t astroplate .
# or
# docker --build-arg INSTALLER=npm build -t astroplate .
# or
# docker --build-arg INSTALLER=pnpm build -t astroplate .

docker run -p 3000:80 astroplate
# or
# docker run --rm -p 3000:80 astroplate
```

To access the shell within the container:

```bash
docker run -it --rm astroplate ash
```

## Standardisierte UseCase Outputs

Die Outputs in den Use Cases sind auf einen festen Katalog begrenzt.
Ziel ist eine konsistente Sprache und bessere Vergleichbarkeit zwischen den Use Cases.

Aktueller Katalog (26 Labels):

- Zielbild & Strategiepapier
- Priorisierte Roadmap
- Rollen- und Governance-Modell
- Priorisierte Maßnahmenliste
- Gap- und Reifegradanalyse
- KI-Modell (Pilot)
- Data Catalog & Glossar
- KPI-Definition & Kennzahlenkatalog
- Automatisierter Workflow
- Fachbereichs-Reporting
- Monitoring- & Alerting-Setup
- Management-Dashboard
- Schulungs- und Enablement-Paket
- Handlungs- und Entscheidungsempfehlungen
- Zielarchitektur & Datenmodell
- Datenpipeline- und Integrationssetup
- Betriebs- und Supportmodell
- Risiko- und Maßnahmenkatalog
- Sicherheits- und Zugriffskonzept
- Dokumentations- und Nachweispaket
- Anomalieerkennung
- Forecasting-Modell
- Szenario- und Simulationsanalyse
- Optimierungsmodell
- Compliance-Umsetzungsplan
- Ticket- und Service-Automatisierung

Pflegeregel:

- Neue oder geänderte Use Cases sollen nur diese Labels in `outputs` verwenden.
- Pro Use Case werden weiterhin genau 3 Outputs gepflegt.

<!-- licence -->
## 📝 License

Copyright (c) 2024 - Present, Alpine Data Ventures

**Code License:**

Part of the code is developed by [Zeon Studio](https://zeon.studio/) and released under the [MIT](https://github.comzeon-studio/astroplate/blob/main/LICENSE) license.
