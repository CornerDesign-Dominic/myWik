import type { Lesson } from './logistik';

export const logisticsPractice: Lesson[] = [
  {
    id: 'digitale-schnittstellen', parent: 'grundlagen', number: '1.1.8', title: 'ERP, WMS und TMS im selben Auftrag',
    intro: 'Wenn mehrere Systeme an einem Auftrag arbeiten, müssen Kennungen und Statusübergaben eindeutig sein.',
    sections: [
      ['Aufgaben der Systeme', 'Ein ERP verknüpft kaufmännische und betriebliche Vorgänge wie Bestellung, Auftrag und Rechnung. Ein WMS verwaltet beispielsweise Lagerplätze und Lagerbewegungen. Ein TMS plant oder verfolgt Transporte. Funktionen können in einem System gebündelt oder unterschiedlich verteilt sein.'],
      ['Daten und Rückmeldungen verbinden', 'Eine gemeinsame Auftrags- oder Sendungsreferenz ordnet Bestellung, Packstück, Avis und Ablieferbeleg einander zu. Vereinbare, welches System welche Daten führt und wie Korrekturen, fehlende Meldungen oder doppelte Übertragungen erkannt werden. EDI bezeichnet den strukturierten elektronischen Austausch von Geschäftsdaten zwischen Systemen.'],
      ['Über Unternehmensgrenzen zusammenarbeiten', 'Efficient Consumer Response (ECR) beschreibt die abgestimmte Zusammenarbeit von Handel und Herstellern, um Kundenbedarf früh zu erkennen und Prozesse daran auszurichten. Geteilte Abverkaufsdaten können helfen, Quellen und Senken eines Warenstroms gezielter zu verbinden. Eine Quelle gibt Material ab, eine Senke nimmt es auf oder verbraucht es.'],
    ],
    example: 'Das ERP übergibt den Auftrag ans WMS. Das WMS meldet die tatsächlich bereitgestellten Packstücke. Das TMS nutzt diese Daten zur Übergabe und gibt Zustellzeit sowie Belegreferenz zurück.',
    question: 'Warum sollte der Versand die tatsächliche Packstückzahl aus dem WMS übernehmen?',
    answer: 'Die Sollmenge aus dem Auftrag kann von der tatsächlichen Sendung abweichen. Die bestätigte Packstückzahl hält Transportauftrag und physische Übergabe konsistent.',
    glossary: ['EDI', 'Strukturierter elektronischer Austausch vereinbarter Geschäftsdaten zwischen Systemen oder Unternehmen.'],
  },
  {
    id: 'lieferkettenstoerung', parent: 'beschaffung', number: '1.2.14', title: 'Lieferkettenrisiken und Notfallplanung',
    intro: 'Eine Störung wird kritisch, wenn die Zeit bis zum Ausfall kürzer ist als die Zeit bis zur wirksamen Gegenmaßnahme.',
    sections: [
      ['Abhängigkeiten bewerten', 'Sammle je kritischem Teil bekannte Bezugsquellen, gemeinsame Vorlieferanten, freigegebene Alternativen und Wiederbeschaffungszeiten. Bewerte Wahrscheinlichkeit und Wirkung eines Ausfalls. Ein seltenes Risiko kann Vorrang haben, wenn Stillstand oder Kundenausfall drohen.'],
      ['Reaktion planen', 'Vergleiche Bestandsreichweite mit der Vorlaufzeit der Alternativen. Prüfe Eilbezug, Materialersatz, Verlagerung, Produktionsreihenfolge oder Bestandsaufbau. Lege Verantwortliche, Auslöser und Kommunikationswege fest.'],
    ],
    example: 'Der Vorrat eines Sonderclips reicht vier Arbeitstage. Ein freigegebener Ersatzlieferant braucht sechs Arbeitstage. Für ausgewählte Aufträge gibt es eine technisch zugelassene Alternative.',
    question: 'Warum genügt die Ersatzquelle allein nicht und welche Maßnahme kann die Lücke verkürzen?',
    answer: 'Zwischen Bestandsende und Ersatzlieferung liegen zwei Arbeitstage. Der Betrieb kann zulässige Alternativteile einsetzen, Aufträge umpriorisieren oder eine nachweislich schnellere Lieferung prüfen.',
  },
  {
    id: 'otif', parent: 'materialwirtschaft', number: '2.1.5', title: 'OTIF und Lieferkennzahlen richtig kombinieren',
    intro: 'OTIF steht für On Time In Full. Eine Lieferung zählt im gewählten Modell nur dann, wenn sie pünktlich und vollständig ist.',
    sections: [
      ['Verlässliche Bezugsgröße wählen', 'Lege fest, ob du Aufträge, Lieferungen oder Positionen zählst und welches Zeitfenster als pünktlich gilt. Mögliche Kennzahl: pünktlich und vollständig erfüllte Aufträge ÷ fällige Aufträge × 100. Warenverfügbarkeit, Termintreue und Vollständigkeit helfen bei der Ursachenanalyse.'],
      ['Gemeinsame Erfüllung zählt', 'Für OTIF brauchst du die Schnittmenge der pünktlichen und vollständigen Fälle. Zwei separat gemessene Prozentwerte bestimmen ohne Einzelfalldaten nicht automatisch die gemeinsame Quote.'],
    ],
    example: '100 Aufträge sind fällig. 92 sind pünktlich und 95 vollständig. 89 erfüllen beide Kriterien.',
    calculation: 'OTIF = 89 ÷ 100 × 100 = 89 %. Die einzelne Termintreue beträgt 92 %, die Vollständigkeit 95 %.',
    question: 'Zählt ein pünktlicher Auftrag mit fehlender Ware für OTIF?',
    answer: 'Nein. Er zählt für Termintreue, verfehlt aber die gemeinsame Anforderung aus Pünktlichkeit und Vollständigkeit.',
    glossary: ['OTIF', 'On Time In Full. Kennzahl für gemeinsam pünktlich und vollständig erfüllte Aufträge oder Lieferungen.'],
  },
  {
    id: 'cross-docking', parent: 'distribution', number: '3.4.9', title: 'Cross-Docking und direkter Umschlag',
    intro: 'Cross-Docking verbindet Wareneingang und Warenausgang mit möglichst wenig Zwischenlagerung.',
    sections: [
      ['Direkt durch den Umschlagpunkt', 'Beim Cross-Docking wird eintreffende Ware einer ausgehenden Sendung zugeordnet. Je nach Konzept ist sie bereits passend vorsortiert oder wird im Umschlagpunkt sortiert und gebündelt. Zeitfenster, eindeutige Kennzeichnung und zuverlässige Avise sind entscheidend.'],
      ['Einlagerung als Alternative', 'Ein reguläres Lager kann ungleichmäßige Ankunft und Abfahrt puffern. Direkter Umschlag spart Ein- und Auslagerung, reagiert aber empfindlicher auf fehlende Ware, verspätete Fahrzeuge oder nicht abgestimmte Abfahrten.'],
    ],
    example: 'Ware von drei Lieferanten trifft morgens im Umschlaglager ein und wird nach Filialen auf fest eingeplante Fahrzeuge verteilt. Eine verspätete Lieferung kann den Abfahrtsplan beeinflussen.',
    question: 'Welche Voraussetzung spart Zeit und welches Risiko steigt beim Cross-Docking?',
    answer: 'Abgestimmte Anlieferungen, Abfahrten und Sendungsdaten erlauben direkten Umschlag. Der geringere Lagerpuffer macht Verspätungen und Fehlmengen schneller wirksam.',
    glossary: ['Cross-Docking', 'Umschlagkonzept, bei dem eintreffende Ware mit keiner oder nur kurzer Zwischenlagerung dem Versand zugeführt wird.'],
  },
  {
    id: 'transportkosten-co2', parent: 'transportsysteme', number: '3.2.5', title: 'Verkehrsträgerwahl nach Kosten, Zeit und CO₂e',
    intro: 'Ein Transportvergleich wird fair, wenn dieselbe Sendung und die gesamte Strecke einschließlich Vorlauf, Hauptlauf und Nachlauf betrachtet werden.',
    sections: [
      ['Messbasis bestimmen', 'Vergleiche Kosten je Sendung, Laufzeit und Treibhausgasemissionen in CO₂-Äquivalenten. Bei gemeinsamen Fahrten werden Kosten und Emissionen nach einer nachvollziehbaren Methode aufgeteilt. Leerfahrten, Terminalbewegungen und Anschlüsse können das Ergebnis verändern.'],
      ['Anforderungen zuerst prüfen', 'Eliminiere Optionen, die eine zwingende Anforderung wie einen Liefertermin verfehlen. Rechne bei den verbleibenden Optionen vergleichbar. Faktoren, Systemgrenze und Datenqualität müssen erkennbar sein.'],
    ],
    example: 'Für dieselbe Sendung gelten fiktive Vergleichswerte. Direktfahrt: 540 €, 1 Tag, 160 kg CO₂e. Sammelgut: 390 €, 2 Tage, 110 kg. Kombinierter Verkehr: 420 €, 3 Tage, 80 kg. Der Kunde erlaubt maximal 2 Tage.',
    calculation: 'Kombinierter Verkehr scheidet für diese Frist aus. Sammelgut spart gegenüber der Direktfahrt 150 € und 50 kg CO₂e, also 31,25 % der Vergleichsemissionen der Direktfahrt.',
    question: 'Warum ist die Option mit den niedrigsten Emissionen in diesem Fall nicht die geeignete Auswahl?',
    answer: 'Die zulässige Laufzeit ist eine Mindestanforderung. Der kombinierte Verkehr verfehlt sie. Unter den verbleibenden Optionen ist das Sammelgut im Beispiel günstiger und emissionsärmer.',
  },
  {
    id: 'fall-nachbestellrechnung', parent: 'lager', number: '2.4', title: 'Übungsfall: Bestellzeitpunkt, Bestellmenge und Kostensenkung',
    practiceCase: true,
    intro: 'Ein Lagerbetrieb will vom bisherigen Bestelllos auf eine wirtschaftlichere Menge umstellen. Die Versorgung muss dabei unverändert gesichert bleiben.',
    sections: [
      ['Bestand und Verbrauch', 'Der Jahresbedarf liegt bei 12.000 Stück an 250 Arbeitstagen. Der aktuelle Bestand beträgt 552 Stück, offene Bestellungen gibt es nicht. Die Wiederbeschaffungszeit beträgt vier Arbeitstage und der Sicherheitsbestand 120 Stück. Der Verbrauch ist gleichmäßig.'],
      ['Kosten und bisherige Menge', 'Eine Bestellung kostet 60 €. Die Lagerhaltung kostet 4 € je Stück und Jahr. Bisher bestellt der Betrieb 1.200 Stück je Bestellung. Der Einstandspreis und der Sicherheitsbestand bleiben beim Vergleich unverändert.'],
    ],
    example: 'Verwende beim Kostenvergleich nur jährliche Bestell- und Lagerhaltungskosten. Rechne für die Ersparnis mit den bisherigen Kosten als Basis.',
    question: '1. Ermittle den Meldebestand und den Arbeitstag, an dem bei unverändertem Verbrauch bestellt werden muss.\n2. Berechne optimale Bestellmenge und jährliche Bestellhäufigkeit.\n3. Vergleiche die jährlichen Kosten beider Mengen und berechne die prozentuale Ersparnis.',
    answer: '1. Tagesbedarf = 12.000 ÷ 250 = 48 Stück. Meldebestand = 4 × 48 + 120 = 312 Stück. (552 − 312) ÷ 48 = 5 Arbeitstage.\n2. Optimales Los = √(2 × 12.000 × 60 ÷ 4) = 600 Stück. Häufigkeit = 12.000 ÷ 600 = 20 Bestellungen im Jahr.\n3. Alt: 10 × 60 € + (1.200 ÷ 2 + 120) × 4 € = 3.480 €. Neu: 20 × 60 € + (600 ÷ 2 + 120) × 4 € = 2.880 €. Ersparnis = 600 € ÷ 3.480 € × 100 ≈ 17,24 %.',
  },
  {
    id: 'fall-verladung', parent: 'wertschoepfung', number: '3.14', title: 'Übungsfall: Verladung und Verantwortlichkeiten',
    practiceCase: true,
    intro: 'Bei einem innerdeutschen Straßentransport sollen drei verpackte Maschinen abgeholt werden. An der Rampe werden offene Punkte vor der Übergabe festgestellt.',
    sections: [
      ['Ausgangslage', 'Der Absender stellt die Ladeeinheiten bereit. Eine Einheit kann sich auf ihrem Träger bewegen. Die Disposition hat zudem eine Position vorgeschlagen, die der eingesetzte Frachtführer für die Lastverteilung beanstandet. Für die Rolle der Parteien werden keine abweichenden Zuständigkeiten unterstellt.'],
      ['Zusätzliche Abweichung', 'An einer Kiste wird vor der Übernahme ein äußerlich erkennbarer Schaden entdeckt. Warenzustand und Übernahme sollen nachvollziehbar bleiben.'],
    ],
    example: 'Ordne zuerst die Sicherheitsfragen zu. Entscheide dann, wie der Zustand bei Übergabe dokumentiert werden soll.',
    question: '1. Erkläre beförderungssichere und betriebssichere Verladung an den beiden Auffälligkeiten.\n2. Was ist vor Abfahrt zu tun?\n3. Wie hältst du die sichtbare Beschädigung bei der Übernahme fest?',
    answer: '1. Die bewegliche Einheit betrifft die sichere Verladung des Guts. Die beanstandete Position betrifft die Betriebssicherheit des Fahrzeugs. Für das Grundmodell sind die Rollen nach § 412 HGB und die Pflichten im Straßenverkehr getrennt zu beachten.\n2. Ladeeinheit und Fahrzeugposition prüfen, Mängel beheben und erst nach geeigneter Sicherung und Freigabe abfahren.\n3. Zustand konkret dokumentieren, Packstück und Sendung eindeutig benennen und den Vermerk in den Übernahmeunterlagen festhalten.',
  },
  {
    id: 'fall-zoll-veredelung', parent: 'rechtsaspekte', number: '5.7', title: 'Übungsfall: Zolltarif und aktive oder passive Veredelung',
    practiceCase: true,
    intro: 'Ein Maschinenbauer vergleicht zwei Lieferketten für die Bearbeitung von Metallteilen.',
    sections: [
      ['Variante A', 'Nicht-Unionswaren sollen aus einem Drittland zur Beschichtung in die EU gelangen und danach wieder ausgeführt werden. Der Betrieb prüft, welches Zollverfahren für die vorübergehende Bearbeitung passt.'],
      ['Variante B', 'Unionswaren sollen vorübergehend aus der EU zur Beschichtung in ein Drittland gelangen und anschließend wieder eingeführt werden. Der Betrieb muss das Verfahren und die benötigten Unterlagen vorab klären.'],
    ],
    example: 'Beginne mit Warenstatus und Bewegungsrichtung. Ordne dann TARIC und ATLAS dem passenden Arbeitsschritt zu.',
    question: '1. Welche Funktion haben TARIC und ATLAS?\n2. Welche Veredelungsart kommt für Variante A und welche für Variante B infrage?\n3. Was muss der Betrieb zusätzlich vor der Umsetzung prüfen?',
    answer: '1. TARIC liefert Informationen zu tariflichen und handelspolitischen Maßnahmen. ATLAS ist das elektronische Verfahren der deutschen Zollverwaltung zur Abwicklung des konkreten Vorgangs.\n2. A ist aktive Veredelung, da Nicht-Unionswaren zur Bearbeitung in die EU gelangen. B ist passive Veredelung, da Unionswaren zur Bearbeitung vorübergehend hinausgehen.\n3. Unter anderem Verfahrensvoraussetzungen, etwaige Bewilligung, Kennzeichnung oder Zuordnung der Ware, Fristen und die Regeln für die Erledigung beziehungsweise Wiedereinfuhr.',
  },
];
