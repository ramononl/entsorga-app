<a href="https://www.chur.ch/">
    <img src="https://entsorga.ramon.onl/assets/github/entsorga_icon.png" alt="entsorga Logo" title="entsorga" align="right" height="60" />
</a>

entsorga App
======================
![Major](https://img.shields.io/badge/major-media%20applications-blue)
![Version](https://img.shields.io/badge/version-beta-orange)
![Plattform](https://img.shields.io/badge/platform-ios%2Fandroid-green)

Die entsorga App beinhaltet Informationen, Tipps und Hinweise rund um das einfache und ökologische Entsorgen in Chur.

![Header](https://entsorga.ramon.onl/assets/github/header.png)

## Inhaltsverzeichnis

- [Funktionen](#funktionen)
- [Ressourcen](#ressourcen)
- [Installation](#installation)
  - [NativeScript](#nativescript)
  - [Nutzung](#nutzung)
- [Aufbau](#aufbau)
  - [Grundlagen](#grundlagen)
  - [Komponenten](#komponenten)
  - [Mixins](#mixins)
  - [Daten](#daten)
  - [Styling](#styling)
- [Simulator/Local Release Build](#simulatorlocal-release-build)
- [Bugs](#bugs)
- [Verbesserungspotenzial](#verbesserungspotenzial)

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

| Name                             | Beschreibung                            | Typ           |
| :------------------------------- | :-------------------------------------- | :------------ |
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

- [Installation - NativeScriptVue](https://nativescript-vue.org/en/docs/getting-started/installation/)
- [NativeScript Advanced Setup: macOS](https://docs.nativescript.org/start/ns-setup-os-x)
- [Blog-Beitrag (teilweise veraltet)](https://www.nativescript.org/blog/setting-up-a-robust-nativescript-vue-development-environment)

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

- [Smooth NativeScript Environment Setup on Mac, 25.12.2019](https://www.youtube.com/watch?v=AT2GEwdJD0k)

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

Wie mit Vue.js üblich, bauen NativeScript-Vue Apps auf Komponenten auf. Neben den integrierten Modulen/Komponenten kann das Template und die Logik beliebig in Komponenten aufgeteilt werden. Die Kommunikation zwischen Komponenten ist identisch zu Vue.js im Web. Im entsorga App kommen zur Kommunikation Props, Custom Events ($emit) und Vuex zum Einsatz.

<details><summary><b>General</b></summary>

#### App.vue
`entsorga-app/app/components/App.vue`

#### Setup.vue
`entsorga-app/app/components/Setup.vue`

#### LogoBar.vue
`entsorga-app/app/components/common/LogoBar.vue`

</details>

<details><summary><b>Tabs</b></summary>

#### HomeTab.vue
`entsorga-app/app/components/HomeTab.vue`

#### PlacesTab.vue
`entsorga-app/app/components/PlacesTab.vue`

#### InfosTab.vue
`entsorga-app/app/components/InfosTab.vue`

#### SettingsTab.vue
`entsorga-app/app/components/SettingsTab.vue`

</details>

<details><summary><b>Setup</b></summary>

#### AppInfo.vue
`entsorga-app/app/components/setup/AppInfo.vue`

#### SetupStreetSelect.vue
`entsorga-app/app/components/setup/SetupStreetSelect.vue`

#### SetupStreetNumberSelect.vue
`entsorga-app/app/components/setup/SetupStreetNumberSelect.vue`

#### SetupPushSelect.vue
`entsorga-app/app/components/setup/SetupPushSelect.vue`

#### SetupPushTimeSelect.vue
`entsorga-app/app/components/setup/SetupPushTimeSelect.vue`

</details>

<details><summary><b>Secondary</b></summary>

#### StreetSelect.vue
`entsorga-app/app/components/secondary/StreetSelect.vue`

#### StreetNumberSelect.vue
`entsorga-app/app/components/secondary/StreetNumberSelect.vue`

#### PushTimeSelect.vue
`entsorga-app/app/components/secondary/PushTimeSelect.vue`

</details>

### Mixins

Können in beliebig vielen Komponenten wiederverwendet werden (Referenz: https://vuejs.org/v2/guide/mixins.html)

#### filterStreetNames.js
`entsorga-app/app/mixins/filterStreetNames.js`

Import von `ranges.json`, Computed Property filtert Liste von Strassennamen basiernd auf Inhalt von `searchBar`, wird in Setup und Einstellungen verwendet

#### pushHandling.js
`entsorga-app/app/mixins/pushHandling.js`

Import von `nativescript-local-notifications` und `dates.json`, Methoden für folgende Funktionen:

- **permissionGranted:** Abfrage, ob Push-Nachrichten gestattet sind
- **createNotifications:** Erstellung von benutzerdefinierten Push-Benachrichtigungen, Erstellung von Push-Benachrichtigungen für Papier- und/oder Kartonsammlungen (Inhalt: `id`, `title`, `body`, `image`, `forceShowWhenInForeground`, `at`)
- **cancelAllNotifications:** Entfernt alle geplanten Benachrichtigungen
- **requestNotificationPermission:** Prompt für Erlaubnis von Push-Benachrichtigungen

#### pushTime.js
`entsorga-app/app/mixins/pushTime.js`

Generiert `newPushDay`, `newPushHour` und `newPushMinute`, erster Wert aus Store oder Default-Wert, Änderungen mit Computed Setter und Methode `selectedIndexChanged`, Abruf der Auswahlmöglichkeiten der Liste von möglichen Tagen für Mitteilung, wird in Setup und Einstellungen verwendet

#### resetSettings.js
`entsorga-app/app/mixins/resetSettings.js`

Methode zum Zurücksetzen der App nach Confirm-Dialog (wenn bestätigt), Navigation zu Setup-Screen, Löschen von ApplicationSettings, Commit von Vuex Mutation `resetState`, Löschen aller geplanten Benachrichtigungen

### Daten

Für den Prototypen der App wurden die Daten als JSON-Files hinterlegt. Während der Entwicklung wurde auch eine Lösung mit «Firebase» getestet. Dies hatte jedoch Schwierigkeiten mit den Push-Notifications zur Folge, welche dann ebenfalls über einen (kostenpflichtigen) Third-Party Push Service erstellt werden müssen.

#### dates.json
`entsorga-app/app/assets/dates.json`

Beinhaltet Daten der Sammeltermin für Papier und Karton nach Tour (1, 2 oder 3)

#### infos.json
`entsorga-app/app/assets/infos.json`

Beinhaltet Daten für Info-Tab mit Informationen zur korrekten Entsorgung verschiedener Wertstoffe

#### places.json
`entsorga-app/app/assets/places.json`

Beinhaltet Daten für Standorte-Tab mit Titel, Abfalltypen, Koordinaten und URL zu Google-Maps 

#### ranges.json
`entsorga-app/app/assets/ranges.json`

Beinhaltet Daten der Strassen mit Zuweisung der Touren, folgende Strassen sind in weiter nach Strassenabschnitt unterteilt:

- Giacomettistrasse
- Gürtelstrasse
- Kasernenstrasse
- Quaderstrasse
- Ringstrasse
- Untere Plessurstrasse

### Styling

![Farben](https://entsorga.ramon.onl/assets/github/colors.png)

NativeScript Applikation können, ähnlich wie Websites, mit CSS gestaltet werden. Jedoch wird nur ein Subset von CSS untersützt. Auch Layouts sind ein Spezialfall, welche in NativeScript auf eine andere Art und Weise implementiert sind.

#### variables.scss

In dieser Datei werden die Farben festgelegt, welche als Schrift- und Hintergrundfarben eingesetzt werden können. Weiter werden bestimmte Farben anderen Variablen zugeordnet, wodurch Grundelemente, wie die ActionBar, beeinflusst werden.

#### app.scss

Import von `variables.scss` und Core Theme, globales Styling mit Utility-First Ansatz (Naming-Convetion [Tailwind CSS](https://tailwindcss.com/), NativeScript Custom Elements und Custom Class Components für einzelne Anwendungen

#### Rancho-Regular.ttf

![Farben](https://entsorga.ramon.onl/assets/github/type.png)

Schriftfamilie für App Icon/Logo Bar, Quelle: [Google Fonts](https://fonts.google.com/specimen/Rancho)

## Simulator/Local Release Build

Die Entwicklung der App mit dem Simulator kann einfach über die Kommandozeile mit den genannten Befehlen gestartet werden. Spätestens wenn die App auf ein angeschlossenes Gerät übertragen werden soll, sollte jedoch auf die Companion App «NativeScript Sidekick» zurückgegriffen werden. Das Programm macht die Erstellung eines Certificate Signing Requests, das Hinterlegen einer iOS Provision und des Zertifikat sehr viel einfacher.

Es besteht auch eine Funktion zum automatischen, kostenlosen Generieren der benötigten Profile und Zertifikate. Zum Zeitpunkt der Entwicklung war diese Option jedoch fehlerhaft (Updates dazu auf [GitHub](https://github.com/NativeScript/sidekick-feedback/issues/435)). Aus diesem Grund muss zum Testen auf iOS-Geräten zwingend ein Apple Developer Account erstellt werden. Im Developer Account sind ein Identifier (ch.mma.entsorga), die verwendeten Geräte (mit UDID) und ein Profil für iOS Development hinterlegt. Die entsprechenden Zertifikate müssen auf dem lokalen Computer, welcher für die Entwicklung verwendet wird, hinterlegt werden.

## Bugs

### Notification Image

In der aktuellen Version des Plugin `nativescript-local-notifications` wird eine veraltete native iOS-Funktion verwendet, um Bilder zu Push-Benachrichtigung hinzuzufügen. Je nach Gerät und Version wird bei Mitteilungen deshalb teilweise kein Bild dargestellt. Da es sich dabei nur um eine symbolische Zusatzinformation handelt und sich alle Informationen bereits im Mitteilungs-Text befinden, ist dies nicht weiter tragisch. Das Bild würde bei der Mitteilung als kleines Thumbnail und beim längeren Drücken grösser dargestellt werden. Mit einem Update des Plugins wird dieses Problem hoffentlich bald gelöst.

## Verbesserungspotenzial

### Handling von Daten

Die Daten für die Zuweisung zu Touren, Standorten und Abfallarten sind als einfache JSON-Files hinterlegt. Müssten diese nach der Veröffentlichung geändert werden, müsste auch die App geupdatet werden. Alternativ könnten diese Daten in einer externen Datenbank erfasst werden (z.B. Firebase).

### Weisser Screen beim Start

Beim ersten Start der App ersheint nach dem Splash Screen manchmal für den Bruchteil einer Sekunde ein weisser Screen, welcher bisher nicht identifiziert werden konnte. Dieser ist etwas störend, beeinflusst die Benutzerführung aber nicht weiter. Vermutlich handelt es sich dabei um den Zeitpunkt, zu dem die Route (Setup-Screen oder Home-Screen) noch nicht definiert ist.

### Push-Mitteilungen

Für Papier- und Kartonsammlungen könnte die Auswahl von unterschiedlichen Zeitpunkten der Erinnerungen implementiert werden. Weiter wäre auch das wiederholte Erinnern an einen Termin denkbar.

### Technisches Handling von Push-Mitteilungen

Die Push-Mitteilungen werden einfachheitshalber lokal erstellt. Alternative könnte dafür ein Third-Party Service konfiguriert werden (z.B. Firebase Cloud Messaging). Evtl. kommen damit aber auch andere Probleme auf, sodass User sich registrieren müssten. Dies kam bis anhin bewusst nicht in Frage.

### Optimierung für Android

Ein grosser Vorteil von NativeScript ist, dass Native Apps für iOS und Android aus einer Codebase erstellt werden können. Damit die entsorga App auch auf Android läuft, müssten jedoch trotzdem noch einige kleine Änderungen vorgenommen werden.

### Inhaltssuche

In den Tabs «Standorte» und «Infos» könnte eine Suchfunktion implementiert werden, um die Inhalte zu filtern/durchsuchen.