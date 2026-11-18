import { check, law, section, type AccountingTopic } from './rw-standard';

export const accountingFinance: AccountingTopic[] = [
  {
    id: 'rw-fibu', number: '2.1', title: 'Aufgaben, Bereiche und Adressaten der Finanzbuchhaltung',
    intro: 'Die Finanzbuchhaltung erfasst Belege systematisch und dokumentiert Vermögen, Schulden und Erfolg. Normalerweise führt der Weg vom Grundbuch über das Hauptbuch in den Jahresabschluss.',
    terms: [
      ['rw-hauptbuch', 'Hauptbuch', 'Sachliche Ordnung der Geschäftsvorfälle nach Konten. Das Grundbuch ordnet sie chronologisch.'],
      ['rw-nebenbuch', 'Nebenbuch', 'Detaillierte Aufzeichnungen für einen Teilbereich der Buchführung, etwa nach Kunden, Lieferanten oder Anlagen.'],
    ],
    sections: [
      section('adressaten', 'Wer nutzt die Finanzbuchhaltung und wofür?',
        'Geschäftsleitung und Eigentümer nutzen Zahlen für Vermögensübersicht, Ergebnisbeurteilung, Ausschüttung und Entscheidungen. Banken interessieren sich für Bonität und Schuldendienst, Lieferanten für Zahlungsfähigkeit, Finanzbehörden für die Besteuerungsgrundlagen. Abschlussprüfer benötigen einen durchgängigen Prüfpfad. Öffentlichkeit und andere Anspruchsgruppen erhalten Informationen im Umfang veröffentlichter Abschlüsse.',
        'Die Finanzbuchhaltung dokumentiert Geschäftsvorfälle, weist Forderungen und Schulden nach, ermöglicht Rechenschaft und liefert Daten für Abschluss, Steuern und interne Auswertungen. Die Geschäftsleitung benötigt zusätzlich aktuelle operative Angaben. Eine alte Bilanz kann beispielsweise keinen tagesaktuellen Zahlungsstatus ersetzen.'),
      section('buecher', 'Grundbuch, Hauptbuch und Nebenbücher',
        'Das Grundbuch erfasst Geschäftsvorfälle chronologisch, das [[t:rw-hauptbuch|Hauptbuch]] systematisiert sie sachlich auf Konten. Ein [[t:rw-nebenbuch|Nebenbuch]] kann einzelne Kunden, Lieferanten, Anlagen oder Löhne detailliert abbilden. Die Summe der Kundenforderungen im Debitorennebenbuch stimmt bei gleicher Abgrenzung mit dem Sammelkonto im Hauptbuch überein.',
        'Eine Ausgangsrechnung über 3.000 € netto erzeugt eine Forderung und Umsatzerlös. Im Debitorennebenbuch erscheinen Kunde, Fälligkeit und offener Posten. Bei Geldeingang wird der Posten ausgeglichen. Stimmt das Sammelkonto nicht mit der Liste überein, prüfst du unter anderem Abstimmstichtag, Schnittstellen und Direktbuchungen. Bei Anlagen sind entsprechende Kontrollen zwischen Anlagenspiegel und Hauptbuch möglich.'),
      ...check('Welches Buch zeigt Geschäftsvorfälle nach Zeit, welches nach Konten?', 'Das Grundbuch zeigt sie zeitlich, das Hauptbuch nach Konten.',
        'Eine Bank fragt nach Bonität und die Disposition nach offenen Rechnungen eines Kunden. Welche Daten verwendest du?', 'Für die Bank eignen sich aufbereitete Abschlusszahlen, ergänzt um aktuelle Liquiditäts- und Schuldendienstdaten. Für die Disposition ist das abgestimmte Debitorennebenbuch mit Fälligkeiten geeignet.'),
    ],
  },
  {
    id: 'rw-bilanz', number: '2.2.1', title: 'Inventur, Inventar und Aufbau der Bilanz',
    intro: 'Die Bilanz zeigt Vermögen und Kapital zu einem Stichtag. Das Inventar liefert eine detaillierte Bestandsübersicht und wird aus Büchern und Inventur abgeleitet.',
    terms: [
      ['rw-inventur', 'Inventur', 'Stichtagsbezogene Bestandsaufnahme von Vermögen und Schulden durch körperliche Aufnahme oder geeignete Buch- und Belegnachweise.'],
      ['rw-bilanz-begriff', 'Bilanz', 'Stichtagsbezogene Gegenüberstellung von Vermögen und Kapital. Aktiva und Passiva ergeben dieselbe Summe.'],
    ],
    sections: [
      section('inventur', 'Vom Bestand zur gegliederten Übersicht',
        'Bei der [[t:rw-inventur|Inventur]] werden körperliche Bestände gezählt, gemessen oder gewogen. Bank, Forderungen und Schulden werden anhand geeigneter Unterlagen festgestellt. Die Aufnahme muss auch wirtschaftlich fremde Bestände und Bestände bei Dritten korrekt zuordnen. Eine Bestandsdifferenz wird untersucht und nachvollziehbar korrigiert. Neben der Stichtagsinventur kommen unter den gesetzlichen Voraussetzungen etwa permanente Inventur durch laufende Bestandsaufzeichnungen, zeitverschobene Inventur mit Fortschreibung oder Rückrechnung und anerkannte Stichprobenverfahren in Betracht. Die Auswahl hängt von Bestandsqualität, Zugang zu Belegen und vertretbarer Genauigkeit ab.',
        'Das Inventar führt Bestände ausführlich nach Art, Menge und Wert auf. Die [[t:rw-bilanz-begriff|Bilanz]] verdichtet diese Positionen. Aktiva zeigen die Mittelverwendung, insbesondere Anlage- und Umlaufvermögen. Passiva zeigen die Herkunft der Mittel, unter anderem Eigenkapital, Rückstellungen und Verbindlichkeiten. Rechnungsabgrenzungsposten und weitere Positionen folgen dem einschlägigen Schema. § 266 HGB regelt die Gliederung für Kapitalgesellschaften mit größenabhängigen Erleichterungen.'),
      section('bilanzgleichung', 'Bilanzgleichung und vier Veränderungen',
        'Ein Unternehmen hat Maschinen von 70.000 €, Vorräte von 20.000 € und Bankmittel von 10.000 €. Aktiva = 100.000 €. Bei 40.000 € Fremdkapital ergeben sich 60.000 € Eigenkapital. Ein Maschinenkauf per Bank verschiebt Aktivposten (Aktivtausch). Wird eine Lieferantenschuld durch ein Bankdarlehen abgelöst, verschieben sich Passivposten (Passivtausch).',
        'Ein Wareneinkauf auf Ziel erhöht Vorräte und Schulden gleichermaßen (Bilanzverlängerung). Die spätere Überweisung vermindert Bank und Lieferantenschulden gleichermaßen (Bilanzverkürzung). Diese Beispiele sind unmittelbar erfolgsneutral. Andere Vorgänge verändern über ihren Erfolg das Eigenkapital.'),
      law('§§ 240–242 und 266 HGB. https://www.gesetze-im-internet.de/hgb/'),
      ...check('Wie hängen Inventur, Inventar und Bilanz zusammen?', 'Die Inventur ermittelt Bestände. Das Inventar dokumentiert sie einzeln. Die Bilanz fasst sie zum Stichtag in Positionen zusammen.',
        'Ein Betrieb zahlt 5.000 € eines Darlehens per Bank zurück. Wie ändert sich die Bilanz?', 'Bank und Darlehensschuld sinken jeweils um 5.000 €. Die Bilanzsumme sinkt um 5.000 €, das Eigenkapital bleibt bei reiner Tilgung gleich.'),
    ],
  },
  {
    id: 'rw-konten', number: '2.2.2', title: 'Bestandskonten, Erfolgskonten und Buchungssätze',
    intro: 'Doppelte Buchführung bildet jeden Geschäftsfall in Soll und Haben ab. Bestandskonten erklären Veränderungen der Bilanz, Erfolgskonten führen Erträge und Aufwendungen in die GuV.',
    terms: [
      ['rw-bestandskonto', 'Bestandskonto', 'Konto für einen Bilanzposten. Aktivkonten nehmen im Soll zu, Passivkonten im Haben.'],
      ['rw-erfolgskonto', 'Erfolgskonto', 'Konto für Aufwendungen oder Erträge einer Periode. Es wird über die Gewinn-und-Verlust-Rechnung abgeschlossen.'],
    ],
    sections: [
      section('systematik', 'Kontoseite aus der Kontoart ableiten',
        'Auf einem aktiven [[t:rw-bestandskonto|Bestandskonto]] stehen Anfangsbestand und Zugänge im Soll, Abgänge im Haben. Passivkonten funktionieren umgekehrt. Auf [[t:rw-erfolgskonto|Erfolgskonten]] stehen Aufwendungen im Soll und Erträge im Haben. Soll und Haben bezeichnen Kontoseiten. Bei einem Buchungssatz steht das Sollkonto vor „an“ und das Habenkonto dahinter. Die Summen beider Seiten müssen gleich sein. Die [[a:rw-bilanz|Bilanz]] hilft bei der Einordnung eines Bestandskontos.',
        'Eröffnung: Aktivkonto an Eröffnungsbilanzkonto, Eröffnungsbilanzkonto an Passivkonto. Abschluss: Schlussbilanzkonto an Aktivkonto, Passivkonto an Schlussbilanzkonto. Erfolgskonten starten ohne Anfangsbestand. Abschluss: GuV an Aufwandskonto und Ertragskonto an GuV. Ein Gewinn wird im vereinfachten Schema mit GuV an Eigenkapital abgeschlossen, ein Verlust umgekehrt.'),
      section('beispiel', 'Frachtrechnung und Zahlung getrennt buchen',
        'Ein Unternehmen erbringt eine Leistung für 1.000 € netto auf Ziel. Unterstellt sind 19 % Umsatzsteuer sowie Erfassung von Forderung und Steuer mit der Rechnung. Buchung: Forderungen 1.190 € an Umsatzerlöse 1.000 € und Umsatzsteuer 190 €. Der spätere Eingang lautet Bank 1.190 € an Forderungen 1.190 €. Er erzeugt keinen neuen Umsatz.',
        'Für eine bezogene Leistung über 400 € netto und 76 € abziehbare Vorsteuer lautet die Buchung Fremdleistungen 400 € und Vorsteuer 76 € an Verbindlichkeiten 476 €. Die Zahlung lautet Verbindlichkeiten 476 € an Bank 476 €. Vorsteuer und Umsatzsteuer sind im Beispiel erfolgsneutral. Eine Zahlung auf eine verkehrte Kundennummer fällt möglicherweise erst beim Abgleich offener Posten auf, obwohl Soll und Haben insgesamt stimmen.'),
      ...check('Wo steht der Zugang auf einem Verbindlichkeitenkonto?', 'Im Haben, weil es sich um ein Passivkonto handelt.',
        'Eine bereits gebuchte Lieferantenschuld von 714 € wird vollständig überwiesen. Wie buchst du und wie wirkt der Vorgang auf die GuV?', 'Verbindlichkeiten 714 € an Bank 714 €. Beide Bestandskonten sinken. Die Zahlung erzeugt keinen neuen Aufwand.'),
    ],
  },
  {
    id: 'rw-guv', number: '2.2.3', title: 'Gewinn-und-Verlust-Rechnung und Periodenabschluss',
    intro: 'Die GuV stellt Erträge und Aufwendungen eines Geschäftsjahrs gegenüber. Sie erklärt den Jahreserfolg und ergänzt die stichtagsbezogene Bilanz.',
    terms: [
      ['rw-guv-begriff', 'Gewinn-und-Verlust-Rechnung', 'Zeitraumbezogene Gegenüberstellung von Erträgen und Aufwendungen zur Ermittlung des Jahresüberschusses oder Jahresfehlbetrags.'],
      ['rw-rap', 'Rechnungsabgrenzungsposten', 'Bilanzposten für Ausgaben oder Einnahmen vor dem Stichtag, die Aufwand oder Ertrag für eine bestimmte Zeit nach dem Stichtag darstellen.'],
    ],
    sections: [
      section('periodenabschluss', 'Erfolg der richtigen Periode zuordnen',
        'Die [[t:rw-guv-begriff|Gewinn-und-Verlust-Rechnung]] ermittelt den Jahreserfolg unabhängig vom Zahlungszeitpunkt. Bilanz und GuV bilden nach § 242 HGB den Jahresabschluss. Für Kapitalgesellschaften gelten ergänzende Vorgaben insbesondere zu Anhang und gegebenenfalls Lagebericht. Der Lagebericht ist rechtlich ein gesondertes Berichtsinstrument.',
        'Vorausgezahlte Januar-Miete im Dezember führt bei Vorliegen von § 250 HGB zu einem aktiven [[t:rw-rap|Rechnungsabgrenzungsposten]]. Vorausvereinnahmte Miete für Januar führt zum passiven RAP. Eine im Dezember bezogene, erst im Januar fällige Leistung gehört als Aufwand in den Dezember. Bei feststehender Schuld wird eine Verbindlichkeit erfasst, bei qualifizierter Ungewissheit ist eine Rückstellung zu prüfen. Wird etwa vor dem Stichtag ein Gewährleistungsfall verursacht, dessen voraussichtliche Erfüllung 5.000 € kostet, kann der Aufwand bereits in dieser Periode entstehen. Ansatz und notwendiger Erfüllungsbetrag werden nach den Voraussetzungen aus § 249 und § 253 HGB beurteilt.'),
      section('verfahren', 'Gesamt- und Umsatzkostenverfahren vergleichen',
        'Das Gesamtkostenverfahren nach § 275 HGB gliedert die betrieblichen Aufwendungen nach Arten und berücksichtigt Bestandsänderungen und andere aktivierte Eigenleistungen. Das Umsatzkostenverfahren ordnet Kosten nach Funktionen zu und stellt den Umsatzerlösen die Herstellungskosten der abgesetzten Leistungen gegenüber. Bei gleicher Bewertung und vollständiger Zuordnung stimmen die Ergebnisse überein.',
        'Ein Unternehmen produziert 100 Stück für je 40 € Herstellkosten und verkauft 80 Stück für je 70 €. Vertriebskosten betragen 500 €, weitere Positionen bleiben außen vor. Gesamtkostenverfahren: 5.600 € Umsatz + 800 € Bestandserhöhung − 4.000 € Herstellaufwand − 500 € Vertrieb = 1.900 €. Umsatzkostenverfahren: 5.600 € − 3.200 € Herstellkosten des Absatzes − 500 € Vertrieb = 1.900 €. Die 800 € Bestandserhöhung sind kein Geldeingang.'),
      law('§§ 242, 249, 250, 264 und 275 HGB. https://www.gesetze-im-internet.de/hgb/'),
      ...check('Warum berücksichtigt das Gesamtkostenverfahren Bestandserhöhungen?', 'Die Produktionsaufwendungen betreffen die gesamte Produktion. Die Bestandserhöhung berücksichtigt den Wert der produzierten, noch nicht verkauften Einheiten.',
        'Ein Unternehmen zahlt am 1. Dezember 12.000 € für zwölf Monate Versicherung. Wie viel Aufwand gehört ins laufende Kalenderjahr?', '1.000 € entfallen auf Dezember. 11.000 € sind als aktiver RAP abzugrenzen und im Folgejahr aufzulösen.'),
    ],
  },
  {
    id: 'rw-fall-fibu', number: '2.3', title: 'Übungsfall: Vom Frachtauftrag zum Jahresabschluss',
    intro: 'Ein Transport im Dezember wird erst im Januar bezahlt. Gleichzeitig muss die Spedition eine Vorauszahlung und eine ausstehende Lieferantenrechnung abgrenzen.',
    sections: [
      section('fall', 'Ausgangslage und Auftrag',
        'Eine Spedition fakturiert im Dezember einen vollständig erbrachten Transport für 9.000 € netto auf Ziel. Ein Unternehmer hat im Dezember eine zugehörige Leistung von 5.000 € erbracht. Die in Höhe und Grund feststehende Schuld ist im Januar fällig. Im Dezember fließen außerdem 1.200 € Versicherung für Januar bis März ab. Für den Fall bleibt die Umsatzsteuer außen vor.',
        'Formuliere die Dezemberbuchungen, ermittle Ergebnis und Zahlungsmitteländerung aus den Vorgängen und erkläre die Januarwirkung, wenn Kunde und Unternehmer zahlen beziehungsweise bezahlt werden.'),
      section('loesung', 'Buchungssätze und Abschlusswirkung',
        'Forderungen 9.000 € an Umsatzerlöse 9.000 €. Fremdleistungen 5.000 € an Verbindlichkeiten 5.000 €. Aktiver RAP 1.200 € an Bank 1.200 €. Ergebnis im Dezember = 9.000 € − 5.000 € = 4.000 €. Die einzige Zahlung im Dezember ist der Versicherungsabfluss von 1.200 €.',
        'Im Januar werden Bank an Forderungen mit 9.000 € und Verbindlichkeiten an Bank mit 5.000 € gebucht. Zusätzlich wird der Januar-Anteil Versicherungsaufwand 400 € an aktiven RAP 400 € erfasst. Der Zahlungssaldo aus den beschriebenen Januarvorgängen beträgt +4.000 €, das Januarergebnis daraus −400 €.'),
      ...check('Welche Beträge aus dem Fall stehen am Dezemberstichtag in der Bilanz?', 'Forderung 9.000 €, Verbindlichkeit 5.000 €, aktiver RAP 1.200 € und ein um 1.200 € gesunkener Bankbestand. Der Dezembererfolg von 4.000 € erhöht im vereinfachten Fall das Eigenkapital.',
        'Der Kunde zahlt im Januar nur 6.000 € an. Wie ändert sich die Auswertung gegenüber der vollständigen Zahlung?', 'Die Forderung bleibt mit 3.000 € offen. Der Januar-Zahlungssaldo beträgt +1.000 €. Der Zahlungsvorgang verändert die GuV weiterhin nicht.'),
    ],
  },
];
