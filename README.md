<a href="https://www.chur.ch/">
    <img src="https://entsorga.ramon.onl/assets/github/entsorga_icon.png" alt="entsorga Logo" title="entsorga" align="right" height="60" />
</a>

entsorga App
======================
![Total Downloads](https://img.shields.io/badge/major-media%20applications-blue)

Die entsorga App beinhaltet Informationen, Tipps und Hinweise rund um das einfache und ökologische Entsorgen in Chur.

## Inhaltsverzeichnis

- [Funktionen](#funktionen)
- [Ressourcen](#ressourcemn)
- [Installation](#installation)
  - [NativeScript](#nativescript)
  - [Nutzung](#nutzung)
- [Aufbau](#aufbau)
  - [Grundlagen](#grundlagen)
  - [Komponenten](#komponenten)
  - [Mixins](#mixins)
  - [Daten](#daten)
  - [Styling](#styling)
- [Simulator/Build](#simulator-build)

## Funktionen

- Startscreen mit Informationen zur App
- Setup-Prozess für erste Einrichtung
- Auswahl der Wohnadresse (Hausnr. je nach Strasse)
- Mittelungen für Papier- und Kartonsammlungen
  - Lokale Push-Mitteilungen
  - Optional, individuell auswählbar
  - Festlegung des Zeitpunktes der Mitteilung
- Übersicht über nächste Sammeltermine
- Daten in JSON-Files
- Entsorgungsstellen in Listen- und Kartenansicht
- Informationen zu korrekter Entsorgung
- Einstellungen jederzeit änderbar
- «App zurücksetzen»

## Ressourcen

| Ressource                        | Beschreibung                            | Typ           |
| -------------------------------- | --------------------------------------- | ------------- |
| nativescript-vue                 | Native Apps mit Vue.js und NativeScript | Dependency    |
| nativescript-carousel            | Karussell Komponente für NativeScript   | Plugin        |
| nativescript-local-notifications | Lokale Hintergrund-Mitteilungen         | Plugin        |
| nativescript-mapbox              | Native OpenGL Karten mit Mapbox         | Plugin        |
| @nativescript/theme              | NativeScript Base-Style Theme           | Theme         |
| vuex                             | State Management für Vue.js             | Dependency    |
| webpack                          | Module Bundler für JavaScript           | Dependency    |
| Babel                            | JavaScript Kompatibilitäts-Compiler     | Dependency    |
| node-sass                        | SCSS zu CSS Compiler                    | Dependency    |
| Rancho                           | Brush Script (Google Fonts)             | Typeface      |
| Font Awesome                     | Vector Icons für Tabs                   | Icons         |
| SF Symbols                       | Apple Icon Set (San Francisco Pro Text) | Icons         |
| Charco                           | Charcoal-Style Illustrationen           | Illustrations |

## Installation

Die Einrichtung der Entwicklungsumgebung für die lokale Entwicklung mit NativeScript ist nicht ganz ohne und kann relativ viel Zeit in Anspruch nehmen.

### NativeScript

Um NativeScript zum Laufen zu bringen können folgende Anleitungen hilfreich sein:

- https://nativescript-vue.org/en/docs/getting-started/installation/
- macOS: https://docs.nativescript.org/start/ns-setup-os-x
- NativeScript-Vue: https://www.nativescript.org/blog/setting-up-a-robust-nativescript-vue-development-environment

Die aktuellen Systemanforderungen für macOS (zwingend für iOS-Entwicklung) sehen folgendermassen aus:
- macOS High Sierra or later
- The latest stable official release of Node.js (LTS) 10.x.
- (Optional) Homebrew to simplify the installation of dependencies
- For iOS development
  - Latest Xcode
  - Command-line tools for Xcode
  - xcodeproj ruby gem
  - CocoaPods
  - The six python package
- For Android development
  - JDK 8 or later
  - Latest official release of Android SDK
  - Android Support Repository
  - (Optional) Google Repository
  - Android SDK Build-tools 28.0.3 or later

Bei der Installation sind bei uns verschiedenste Fehler aufgetreten, obwohl die Anleitungen befolgt wurden. Je nach Setup unterscheiden sich die Reihenfolge der Schritte und möglichen Problemen. Die Fehlermeldungen sind teilweise sehr kryptisch, deshalb sollte für die komplette Installation der Entwicklungsumgebung genügend Zeit eingeplant werden.

In folgendem kürzlich veröffentlichten Video wird das Setup auf macOS sehr gut erläutert und ist ein guter Startpunkt:

- https://www.youtube.com/watch?v=AT2GEwdJD0k

Bis zum Schluss hat der Einsatz der Vue DevTools nicht funktioniert, bzw. zu Problemen geführt. Deshalb wurde nach langem Testen schlussendlich auf den Einsatz der Vue DevTools verzichtet, obwohl diese in der Entwicklung eine grosse Hilfe wären.

Um die Installation zu testen, kann folgender Befehl der NativeScript CLI verwendet werden:

``` bash
# Testet Systemkonfiguration und zeigt allfällige Probleme auf
tns doctor
```

### Nutzung

Nach dem Klonen des Projekts von GitHub müssen die Dependencies installiert werden und sichergestellt werden, dass das System für die Entwicklung mit NativeScript konfiguriert ist. Anschliessend kann ein Xcode-Simulator gestartet werden.

Immer wieder kam es bei der Entwicklung vor, dass im Simulator Änderungen nicht mehr abgebildet wurden. In diesem Fall schafft das Beenden des Simulators, Entfernen des «platforms»-Ordners und ein anschliessender Neustart des Simulators abhilfe.

``` bash
# Dependencies installieren
npm install

# App auf iPhone 8 Simulator starten und Änderungen abwarten
tns run ios --device "iPhone 8"

# Plattformen entfernen (anschliessend wieder "tns run ...")
rm -rf platforms
```

## Aufbau

Bei NativeScript handelt es sich um ein Open Source Framework, welches die Erstellung von JavaScript-Native-Apps ermöglicht. Daraus resultieren bestimmte Vorteile gegenüber hybriden Apps (Preformance, native APIs) und Native-Apps (nur eine Codebase). NativeScript kann mit Vanilla JavaScript/TypScript, Angular, Vue.js und bald auch React verwendet werden.

Für unser App (entsorga) haben wir uns für die Kombination von NativeScript und Vue.js entschieden. Verglichen mit Vue.js fürs Web gibt es bei NativeScript-Vue drei grosse Unterschiede:

- **Library:** NativeScript-Vue Package statt Standard Vue.js Library
- **DOM-Manipulation:** Vue-Instanz wird keinem Element zugewiesen
- **Templates:** NativeScript-Module mit XML statt semantisches HTML

### Grundlagen

#### main.js
`entsorga-app/app/main.js`

Startpunkt des Projekts, Import von globalen Plugins/Modulen, Registrierung von benutzerdefinierten Vue-Elementen, Import von Custom-Routing auf Setup- oder Homescreen basierend auf lokalen ApplicationSettings-Store, Erstellung Vue-Instanz

#### index.js
`entsorga-app/app/routes/index.js`

Import von Hauptkomponenten und Zuweisung zu Routen für main.js (Vue Router wird nicht unterstützt)

#### store.js
`entsorga-app/app/store.js`

Vuex Store für State Management währenddem die App gestartet ist, enthält Default-State für erste Einrichtung und Zurücksetzen der App, Mutations für Benutzerdaten, Reset und "load"-mutation um Store aus Application-Settings auszulesen, sofern diese bereits erfasst sind

#### App_Resources
`entsorga-app/app/App_Resources/iOS`

Icons und Bilder in jeweils drei Grössen (1x, 2x, 3x), Dateinamen müssen identisch mit Android-Versionen sein

`entsorga-app/app/App_Resources/iOS/Assets.xcassets`

App Icons und Launch Screen Bilder in unterschiedlichen Grössen

`entsorga-app/app/App_Resources/Android/src/main/res`

Icons und Bilder in sechs Grössen (hdpi, ldpi, mdpi, xhdpi, xxhdpi, xxxhdpi), dürfen nicht in Unterordner sortiert werden, keine Sonderzeichen in Dateinamen

### Komponenten

### Mixins

#### filterStreetNames.js

#### pushHandling.js

#### pushTime.js

#### resetSettings.js

### Daten

#### dates.json

#### infos.json

#### places.json

#### ranges.json

### Styling

#### variables.scss

#### app.scss

#### Rancho-Regular.ttf