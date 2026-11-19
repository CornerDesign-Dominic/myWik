import { section, check } from './rw-standard';
import { functionsSource, type BwlTopic } from './bwl-standard';

export const functionCases: BwlTopic[] = [
  {
    id: 'bwl-zusammenwirken', parentId: 'bwl-grundlagen', number: '1.2', title: 'Das Zusammenwirken der betrieblichen Funktionen',
    intro: 'Zusammenwirken bedeutet, Teilentscheidungen über gemeinsame Mengen, Termine, Ressourcen und Ziele abzustimmen. Ein durchgängiger Auftrag zeigt, weshalb jede Funktion Informationen der anderen braucht.',
    sections: [
      section('fall', 'Ein neuer Auftrag verbindet alle Funktionen',
        'Nordlicht plant monatlich 1.000 Leuchten zu 100 € netto. Je Leuchte fallen 60 € variable Kosten und 0,5 Montagestunden an. 600 nutzbare Stunden stehen bereit; andere Stationen sind im Modell nicht enger. Ein Händler fragt 150 zusätzliche Leuchten zu 90 € an und zahlt erst im Folgemonat. Der reguläre Absatz bleibt unverändert.'),
      section('entscheidungen', 'Entscheidung, Information und Rückmeldung',
        'Marketing klärt Absatzchance, Preis und Terminwunsch und meldet 150 Stück verbindlichen Bedarf. Produktion benötigt diese Menge und die zugesagte Qualität: 150 × 0,5 = 75 h zusätzlich, zusammen 575 von 600 h. Sie bestätigt die technische Machbarkeit vorbehaltlich Material und Personal.',
        'Logistik prüft 150 Modulsätze, Bestand, Liefertermin und Transportkosten und meldet bestätigte Verfügbarkeit. Personal prüft, ob die 575 h mit den verfügbaren Qualifikationen abdeckbar sind; die 600 h dürfen keine ungesicherten Überstunden enthalten.',
        'Rechnungswesen liefert Zusatzkosten und prüft, ob 60 €/Stück alle relevanten variablen Kosten enthalten. Zusatzdeckungsbeitrag = (90 − 60) × 150 = 4.500 €. Finanzierung klärt Zahlungstermine: Werden 9.000 € Kosten vor dem Kundeneingang bezahlt, muss diese Lücke gedeckt sein. Controlling bündelt Beitrag, Puffer, Qualitäts- und Zahlungsausfallrisiko für die Leitung.'),
      section('entscheidung', 'Bedingte Zusage und Rückkopplung',
        'Die Leitung kann zusagen, wenn Material, Personal, Bonität und Vorfinanzierung gesichert sind und reguläre Aufträge nicht verdrängt werden. Marketing bestätigt dann den Termin. Bei Verzögerung meldet Logistik den neuen Termin sofort an Produktion und Vertrieb; ein alter Plan darf nicht still weiterlaufen.',
        'Zielkonflikte sind konkret: Mehr Absatz erhöht den Beitrag, verringert aber den Zeitpuffer von 100 auf 25 h und bindet Geld. Große Lose sparen Rüsten, können Termine anderer Modelle verschieben. Verantwortliche, Datenstand und Eskalation müssen an Übergaben feststehen. Der [[a:rw-planungsinhalt|integrierte Teilplan]] vertieft die Abstimmung.'),
      section('grenzen', 'Was die Rechnung offenlässt',
        'Freie Montage ersetzt weder eine Materialzusage noch einen Kreditrahmen. Preiszugeständnisse können Stammkunden beeinflussen. Entstehen Sonderprüfung, Versand oder Ausfallrisiken zusätzlich, sind sie einzurechnen. Die folgende [[a:bwl-fall-funktionen|Übung]] verändert Kapazität und Zahlungsbedarf.'),
      functionsSource(),
      ...check('Was muss vor einer verbindlichen Lieferzusage zusammengeführt werden?', 'Kundenbedarf, Materialtermin, qualifizierte Kapazität aller Engpassstationen, wirtschaftliche Zusatzwirkung und gesicherte Liquidität. Die Leitung entscheidet über verbleibende Risiken.',
        'Der Händler verlangt 250 zusätzliche Leuchten. Was ändert sich zuerst?', 'Stundenbedarf = 500 + 125 = 625 h; 25 h mehr als verfügbar. Vor Zusage sind Terminverschiebung, zusätzliche Kapazität oder Fremdbezug samt Kosten zu prüfen.'),
    ],
  },
  {
    id: 'bwl-fall-funktionen', parentId: 'bwl-grundlagen', number: '1.3', title: 'Übungsfall: Zusatzauftrag, Engpass und Zahlungsbedarf',
    intro: 'Ein Zusatzauftrag ist entscheidbar, wenn Ergebnis, Kapazität und Zahlungszeitpunkte zusammen geprüft sind. Dieser eigenständige Fall kombiniert alle sieben Grundfunktionen.',
    sections: [
      section('auftrag', 'Ausgangslage und Arbeitsauftrag',
        'Nordlicht plant 1.000 Leuchten/Monat, 0,5 h je Stück, 600 nutzbare Montagestunden. Ein Neukunde bestellt zusätzlich 300 Stück zu 90 € netto. Variable Kosten: 60 €/Stück, vollständig vor Kundenzahlung im Folgemonat zahlbar. Fremdmontage ist für beliebig viele Zusatzleuchten möglich; ihr Aufpreis von 8 €/Stück kommt zu den unveränderten 60 € hinzu. Gesicherter freier Liquiditätsspielraum nach allen regulären Verpflichtungen: 12.000 €. Kein fertiger Anfangsbestand. Weitere Zusatzkosten, Steuern, Ausfälle und andere Engpässe bleiben im Modell außen vor.',
        '1. Ermittle Engpass und Fremdmenge. 2. Berechne den Zusatzdeckungsbeitrag. 3. Ermittle die Finanzierungslücke. 4. Begründe eine Entscheidung mit mindestens einer benötigten Information je Grundfunktion. Bearbeite den Fall vor dem Aufklappen.'),
      {
        ...section('musterloesung', 'Lösung des Gesamtfalls', 'Vergleiche Rechenweg, Bedingungen und Entscheidung mit deiner Lösung.'),
        hint: { label: 'ÜBUNGSFALL', title: 'Musterlösung aufklappen', content: '1. Regulärer Bedarf = 1.000 × 0,5 = 500 h. Frei = 100 h = 200 Stück. Für 300 Zusatzstücke fehlen 100 Stück beziehungsweise 50 h; mindestens 100 Stück fremdmontieren.\n\n2. Zusatzerlös = 300 × 90 = 27.000 €. Kosten = 300 × 60 + 100 × 8 = 18.800 €. Zusatzdeckungsbeitrag = 8.200 €.\n\n3. Vorfinanzierung 18.800 €, gedeckt 12.000 €: Lücke 6.800 €.\n\n4. Nur bedingt zusagen: Marketing bestätigt Menge, Preis und Zahlungsziel; Produktion 200 interne Zusatzstücke; Logistik 300 Modulsätze und Fremdtransport; Personal qualifizierte 600 h; Rechnungswesen Zusatzkostenvollständigkeit. Finanzierung sichert weitere 6.800 € oder eine geeignete Anzahlung; Controlling überwacht Beitrag, Termine und Qualität. Die Leitung entscheidet nach gesicherten Zusagen und Risikoprüfung.' },
      },
      section('auswertung', 'Ein positiver Beitrag genügt nicht',
        'Die 8.200 € verbessern das Ergebnis nur ohne verdrängte reguläre Beiträge und weitere Kosten. Eine ungedeckte Zahlungslücke verhindert möglicherweise die Durchführung. Kreditkosten verkleinern den Vorteil. Fremdmontage braucht Qualitäts- und Terminabsicherung; der eigene Zeitpuffer ist aufgebraucht.',
        'Typische Fehler: alle 300 Stück intern planen, 8 € für alle statt nur 100 Stück ansetzen oder Umsatz vor Fälligkeit als Geld behandeln. Im Service gilt dieselbe Logik für knappe Fachstunden und externe Leistungen.'),
      functionsSource(),
      ...check('Warum bleibt der reguläre Fixkostenblock bei dieser Zusatzentscheidung unverändert?', 'Der Fall unterstellt unveränderte Fixkosten und reguläre Aufträge. Es zählt der zusätzliche Erlös abzüglich aller zusätzlichen Kosten. Neue Fixkosten müssten ebenfalls berücksichtigt werden.',
        'Der Kunde bestellt nur 200 zusätzliche Stück. Alle sonstigen Angaben bleiben gleich. Was folgt?', '200 Stück passen in 100 freie Stunden. Kein Fremdaufschlag. Erlös 18.000 €, Kosten 12.000 €, Zusatzdeckungsbeitrag 6.000 €. Der freie Spielraum deckt die Vorfinanzierung genau, ohne zusätzlichen Reservepuffer.'),
    ],
  },
];
