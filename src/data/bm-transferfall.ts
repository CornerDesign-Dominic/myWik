import { lesson, topic, type ManagementLesson } from './bm-artikel';

export const managementTransferCase: ManagementLesson = {
  slug: 'transferfall', number: '4.5', title: 'Übungsfall: Statusmeldungen im Transportbetrieb',
  intro: 'Ein mittelständischer Transportbetrieb nutzt externe Frachtführer und will Abholmeldungen zuverlässiger erhalten. Du prüfst den Ausgangswert, beurteilst die Varianten und entwirfst einen realistischen Pilot mit Lern- und Projektzielen.',
  sections: [
    topic('daten', 'Ausgangslage und Ziele',
      'Im selben Monat gingen 96 von 120 Abholmeldungen im Nahverkehr und 66 von 100 im Fernverkehr innerhalb von 30 Minuten ein. Alle fälligen Fälle wurden erfasst. Der angestrebte Gesamtwert liegt bei mindestens 90 %. Der Betrieb will zugleich die Disposition entlasten und den Zugriff auf Sendungsdaten auf berechtigte Personen begrenzen.',
      'Variante A ist eine automatisch ausgelöste Erinnerung mit Rückmeldung im bestehenden Portal. Variante B ist eine manuelle Eskalation mit geschulten Vertretungen. Beide erfüllen die Muss-Anforderungen. Auf der Skala 1 bis 5 werden Nutzen, Kosten und Umsetzbarkeit mit 50 %, 30 % und 20 % gewichtet. A erhält 5, 3 und 3 Punkte. B erhält 3, 4 und 5 Punkte. Höhere Kostenpunkte bedeuten geringere Kosten.'),
    topic('aufgaben', 'Aufgaben für die Entscheidungsvorlage',
      'Berechne die gemeinsame Ausgangsquote und die zusätzlich benötigten rechtzeitigen Meldungen bei unverändertem Volumen. Rechne beide Nutzwerte aus und nenne eine Information, die für die Entscheidung noch fehlt.',
      'Entwirf anschließend eine gültige Informationsquelle, eine organisatorische Regel, ein Lernziel und ein Testverfahren. Plane den Pilot mit Verantwortlichen, einer Freigabe und einer Regel, an der die Leitung eine Ausweitung oder Anpassung entscheidet.'),
    topic('bezug', 'Methoden nachschlagen', [
      lesson('betriebsstatistik', 'Betriebsstatistik'), ' · ', lesson('entscheidungstechniken', 'Nutzwertanalyse'), ' · ',
      lesson('pe-umsetzung', 'Transfer und Evaluation'), ' · ', lesson('it-quellen', 'Datenqualität'), ' · ',
      lesson('projektsteuerung', 'Projektsteuerung'),
    ]),
  ],
  checks: [
    ['Wie lauten gemeinsame Ausgangsquote, Meldelücke und Nutzwerte?', '162 ÷ 220 ≈ 73,6 %. Für 90 % braucht der Betrieb 198 rechtzeitige Meldungen, also 36 zusätzlich. A = 2,50 + 0,90 + 0,60 = 4,00 Punkte. B = 1,50 + 1,20 + 1,00 = 3,70. A führt unter den Annahmen. Prüfe zum Beispiel Erreichbarkeit externer Partner, technische Lieferzeiten und Robustheit des Rankings.'],
    ['Nach vier Wochen liegt die Quote bei 91 %, doch Rückfragen und Nacharbeit steigen. Wie würdest du entscheiden?', 'Prüfe Fallabgrenzung, Partnerstruktur, Zeitstempel und Gründe der Nacharbeit. Beobachte als Gegenkennzahl z. B. manuelle Nacharbeit je 100 Abholungen. Sichere gültige Statusquelle und Eskalationsrolle. Ein Lernziel prüft etwa die richtige Behandlung von vier aus fünf Ausnahmefällen. Die fachliche Leitung entscheidet über Ausweitung anhand der 90-%-Quote, einer vorab festgelegten Nacharbeitsgrenze und nachgewiesener Handlungsfähigkeit. Bei Überschreitung der Grenze den Pilot gezielt anpassen.'],
  ],
};
