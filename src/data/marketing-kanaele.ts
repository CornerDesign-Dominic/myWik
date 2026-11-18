import type { Article, ArticleSection, Chapter, GlossaryTerm, RichText } from '../types';

type Lesson = {
  id: string;
  parent: string;
  number: string;
  title: string;
  intro: string;
  parts: [id: string, title: string, ...paragraphs: string[]][];
  terms: [id: string, term: string, definition: string][];
  question: string;
  answer: string;
};

const lessons: Lesson[] = [
  {
    id: 'distribution', parent: 'mix', number: '2.4', title: 'Distributionspolitik und Absatzwegwahl',
    intro: 'Distributionspolitik gestaltet, wie eine Leistung den Absatzmarkt erreicht. Sie umfasst die Wahl der Verkaufskanäle und die tatsächliche Bereitstellung.',
    parts: [
      ['aufgaben', 'Zwei Aufgabenbereiche', 'Die [[distribution-physisch|physische Distribution]] organisiert Transport, Lagerung, Verpackung, Zustellung und Rückfluss. Die [[distribution-akquisitorisch|akquisitorische Distribution]] legt fest, über welche Absatzwege und durch welche Absatzorgane der Kauf zustande kommt. Das Absatzorgan ist die beteiligte Stelle, der Absatzweg die Abfolge der Marktstufen.', 'Eine Keramikmanufaktur nimmt Bestellungen im eigenen Shop an und lässt ein Paketunternehmen zustellen. Das ist direkter Absatz mit ausgelagerter Transportleistung. Beim Verkauf an einen Einrichtungshändler, der die Ware für eigene Rechnung weiterverkauft, kommt eine Absatzstufe hinzu, auch wenn die Manufaktur physisch direkt an dessen Kunden versendet.'],
      ['auswahl', 'Kriterien für die Wahl', 'Produktseitig zählen Erklärungsbedarf, Kaufhäufigkeit, Haltbarkeit und Transportfähigkeit. Das Unternehmen prüft Größe, Finanzkraft, Standorte, Vertriebskompetenz, Programm und Positionierung. Auf Marktseite gehören räumliche Verteilung und Einkaufsgewohnheiten der Kundschaft, Stärke und Vertriebswege der Konkurrenz sowie Standorte, Sortimente, Abnahmemengen und Verhandlungsmacht geeigneter Absatzmittler in den Vergleich. Rechtliche und gesellschaftliche Rahmenbedingungen begrenzen die Gestaltung.', 'Eine regionale Großbäckerei kann ihr frisches Standardsortiment über mehrere Händler verteilen und Sonderanfertigungen über die eigene Auftragsannahme verkaufen. Vergleiche je Segment erreichbare Kunden, Servicequalität, Fixkosten, Kosten je Auftrag und die Kontrolle über die Kundenbeziehung. Prüfe bei einer Kombination von Wegen, ob deren Konditionen und Serviceversprechen zueinander passen.'],
      ['vertiefung', 'Absatzweg und Lieferung weiterdenken', 'Vertiefe [[>direkt|Direktvertrieb]], [[>indirekt|indirekten Vertrieb]] und [[>marketinglogistik|Marketinglogistik]]. Die Abstimmung mehrerer Kanäle gehört zur [[>channel|Vertriebskanalstrategie]].'],
    ],
    terms: [
      ['distribution-physisch', 'Physische Distribution', 'Planung und Ausführung des Warenflusses vom Anbieter zur Kundschaft einschließlich Transport, Lagerung, Verpackung und gegebenenfalls Rückführung.'],
      ['distribution-akquisitorisch', 'Akquisitorische Distribution', 'Gestaltung von Absatzwegen und Absatzorganen, über die Anbieter Kunden erreichen und Kaufabschlüsse herbeiführen.'],
    ],
    question: 'Ein Hersteller schreibt die Rechnung direkt an Endkunden, beauftragt aber einen Dienstleister mit Lagerung, Versand und Retouren. Ändert die Auslagerung den Absatzweg?',
    answer: 'Der Absatz bleibt direkt, sofern der Hersteller selbst an die Endkunden verkauft. Der Dienstleister übernimmt Teile der physischen Distribution. Entscheidend für den Absatzweg ist die Rolle im Verkauf, nicht die Zahl der an der Lieferung beteiligten Betriebe.',
  },
  {
    id: 'marketinglogistik', parent: 'distribution', number: '2.4.0.1', title: 'Marketinglogistik und Warenwirtschaft',
    intro: 'Marketinglogistik übersetzt das Verkaufsversprechen in eine tatsächlich verfügbare und lieferbare Leistung.',
    parts: [
      ['leistung', 'Vom Auftrag bis zur Lieferung', 'Leite aus Bedarf und Serviceversprechen ab, welches Produkt in welcher Menge und Qualität bis wann an welchem Ort verfügbar sein soll. Dann entscheide über Lagerstandorte und -bestände, Auslieferung, Transportmittel, Schutzverpackung sowie Retouren und Rückführung von Mehrwegverpackungen.', 'Ein [[warenwirtschaftssystem|Warenwirtschaftssystem]] verbindet Einkauf, Bestand, Auftrag und Verkauf. Es zeigt etwa verfügbaren statt nur physisch vorhandenen Bestand, wenn offene Bestellungen bereits Mengen reservieren. Zeitnahe Bestands- und Verkaufsdaten helfen, Nachschub, Auftragsbearbeitung und Kundeninformation abzustimmen. Die [[>logistik-supply-chain-management|Versorgungskette]] reicht darüber hinaus bis zu Beschaffungs-, Produktions- und Entsorgungsprozessen.'],
      ['abwaegung', 'Service und Kosten gemeinsam auswerten', 'Eine Spielwarenfirma verspricht Zustellung bis zum nächsten Werktag. Ein dezentrales Lager verkürzt Transportzeit, erhöht aber Bestand und Lagerkosten. Sie prüft Liefertermintreue, Kosten je Auftrag und verlorene Verkäufe gemeinsam. Ein Softwareanbieter braucht für Downloads keinen Paketversand, muss aber Zugang, Leistungskapazität und Support bereitstellen. Die physische Warenlogik lässt sich deshalb nur teilweise übertragen.'],
    ],
    terms: [['warenwirtschaftssystem', 'Warenwirtschaftssystem', 'IT-System zur Erfassung und Steuerung von Warenbewegungen und Beständen, verbunden mit Vorgängen wie Einkauf, Auftrag, Lieferung und Verkauf.']],
    question: 'Weshalb reicht es bei Abholung im Laden nicht, wenn der Webshop den physischen Ladenbestand anzeigt?',
    answer: 'Der verfügbare Bestand muss bereits reservierte, beschädigte und noch nicht eingegangene Stücke korrekt berücksichtigen. Die Bestellung muss die Ware verbindlich reservieren und bei Verkauf oder Storno beide Bestände aktualisieren. Sonst kann der Betrieb die Abholzusage trotz nominell vorhandener Ware verfehlen.',
  },
  {
    id: 'direkt', parent: 'distribution', number: '2.4.1', title: 'Direktvertrieb und eigene Verkaufsorgane',
    intro: 'Beim Direktvertrieb verkauft ein Anbieter seine Leistung ohne selbstständige Wiederverkaufsstufe an die Endabnehmer.',
    parts: [
      ['organe', 'Eigene Absatzorgane', 'Unternehmenseigene Absatzorgane sind etwa angestellte [[reisende|Reisende]] im Außendienst, Verkaufsniederlassungen oder Shops, Werksverkauf und der eigene Online-Shop. Die Geschäftsleitung kann Großaufträge oder Jahresgespräche mitgestalten. Für bedeutende Kunden können spezialisierte Kundenbetreuer die Abstimmung übernehmen.', 'Bei selbstständigen, eng gebundenen Absatzorganen variiert die fachliche Abgrenzung. Eine Vertriebsgesellschaft kann organisatorisch wie eine eigene Niederlassung wirken. Vertragshändler und [[franchising|Franchisepartner]] setzen Hersteller- oder Systemvorgaben um. Wer in eigenem Namen und auf eigene Rechnung als Wiederverkäufer auftritt, bildet nach einer transaktionsbezogenen Abgrenzung eine Absatzstufe. Nenne deinen Maßstab und prüfe Vertragsbindung, Eigentumsübergang und den tatsächlichen Vertragspartner. Beim Franchising beschleunigt ein erprobtes Konzept die Expansion, verlangt aber Qualitätsstandards und ermöglicht dem Franchisepartner nur begrenzte Gestaltungsfreiheit.'],
      ['ecommerce', 'Eigener Online-Shop und E-Commerce', '[[e-commerce|E-Commerce]] erfasst die elektronische Anbahnung und Abwicklung von Kauf- und Verkaufsvorgängen. Physische Waren werden gesondert ausgeliefert. Für Software oder einen Download kann das Internet zusätzlich der Bereitstellungskanal sein. E-Business erfasst darüber hinaus digital unterstützte Geschäftsprozesse wie Datenaustausch und Kundenbetreuung.', 'Ein Shop kann rund um die Uhr zugänglich sein, Vertrieb über Regionsgrenzen ermöglichen und zusätzliche Kundendaten verfügbar machen. Kundschaft kann Produkte jedoch nicht unmittelbar testen, persönliche Beratung muss bewusst organisiert werden und Preise sind schnell vergleichbar. Prüfe auch Werbekosten, Retouren, Lieferkapazität und technische Anforderungen.'],
      ['entscheidung', 'Wann eigener Vertrieb passt', 'Eigene Kanäle sichern direkten Kontakt, Einfluss auf Verkauf und Präsentation sowie eine verlässliche Beratung. Dem stehen Personal-, Infrastruktur- und Steuerungskosten gegenüber. Ein Hersteller kundenspezifischer Prüfstände braucht vor dem Angebot direkte technische Klärung und kann wenige große Kunden gezielt betreuen. Ein massenhaft gekauftes Standardprodukt kann über vorhandene Händler meist schneller breite Präsenz erreichen.'],
    ],
    terms: [
      ['reisende', 'Reisende im Vertrieb', 'Angestellte Außendienstmitarbeitende, die im Auftrag des Unternehmens Kunden besuchen, beraten und geschäftliche Abschlüsse vorbereiten oder tätigen.'],
      ['franchising', 'Franchising', 'Zusammenarbeit selbstständiger Partner unter einem vertraglich vereinbarten Geschäftssystem. Der Franchisegeber stellt Marke und Konzept bereit, der Partner setzt die Vorgaben gegen Entgelt um.'],
      ['e-commerce', 'E-Commerce', 'Elektronische Anbahnung und Abwicklung von Kauf- und Verkaufsvorgängen über digitale Netze.'],
    ],
    question: 'Ein Hersteller verkauft personalisierte Hörsysteme und separat standardisierte Pflegeprodukte. Für welche Leistung ist eigener Direktvertrieb eher begründbar?',
    answer: 'Für die Hörsysteme sind Beratung, Anpassung und Betreuung zentrale Gründe für den direkten Kontakt. Bei Pflegeprodukten können geeignete Handelspartner die Verfügbarkeit steigern. Für beide Wege sind Kosten, Serviceversprechen und Zielgruppe zu prüfen.',
  },
  {
    id: 'indirekt', parent: 'distribution', number: '2.4.2', title: 'Indirekter Absatz und Handelsbetriebsformen',
    intro: 'Beim indirekten Absatz verkauft mindestens eine selbstständige Zwischenstufe die Leistung weiter. Daneben unterstützen Absatzhelfer einen Verkauf, ohne selbst Waren auf eigene Rechnung einzukaufen.',
    parts: [
      ['rollen', 'Absatzmittler und Absatzhelfer', 'Ein [[absatzmittler|Absatzmittler]] wie Groß- oder Einzelhandel handelt im eigenen Namen und auf eigene Rechnung. Ein [[absatzhelfer|Absatzhelfer]] übernimmt Aufgaben der Vermittlung oder Abwicklung. Handelsvertreter vermitteln dauerhaft für ein anderes Unternehmen oder schließen Geschäfte in dessen Namen. Kommissionäre handeln im eigenen Namen auf fremde Rechnung. Makler vermitteln typischerweise einzelne Geschäfte. Prüfe beim Einsatz dieser Stellen, wer tatsächlich Vertragspartner wird. Eine zusätzliche Vermittlungsstelle ist nicht automatisch eine Wiederverkaufsstufe.', 'Ein Hersteller mit eigenem Außendienst kann Kunden direkt beraten und den Verkauf abschließen. Ein selbstständiger Handelsvertreter bringt bestehende Netzwerke und erfolgsabhängige Kosten ein, ist aber weniger unmittelbar steuerbar. Beim Großhandel kommt hingegen ein Wiederverkäufer hinzu. Der Hersteller tauscht einen Teil seiner Spanne und des Einflusses gegen Reichweite und bereits bestehende Verkaufsstrukturen.'],
      ['grosshandel', 'Großhandel nach Funktion unterscheiden', 'Großhändler verkaufen an gewerbliche Abnehmer. Abholgroßhandel und Zustellgroßhandel unterscheiden sich nach Übergabe und Lieferung, Universal- und Spezialgroßhandel nach der Breite des Sortiments. Cash-and-Carry kombiniert Abholung und Selbstbedienung für gewerbliche Kunden. Rackjobber übernehmen in fremden Läden etwa Flächenbewirtschaftung und Nachbestückung und können damit Einzelhandelsaufgaben ausüben.'],
      ['einzelhandel', 'Einzelhandel nach Sortiment und Betriebsform unterscheiden', 'Warenhäuser führen viele Warenbereiche, Kaufhäuser konzentrieren sich stärker auf ausgewählte Branchen. Fachgeschäfte führen ein branchenspezifisches und meist tiefes Sortiment mit Beratung, während Fachmärkte die Kategorie großflächig abdecken. Super- und Verbrauchermärkte führen Lebensmittel mit unterschiedlich breitem Zusatzsortiment. Discounter kombinieren ein begrenzteres Sortiment mit einer stark kosten- und preisorientierten Betriebsweise. Versandhandel verkauft über Distanz. Einkaufszentren bündeln mehrere eigenständige Betriebe an einem Standort.', 'Für Küchengeräte mit Beratung eignet sich ein Elektronikfachgeschäft eher als ein begrenzt sortierter Discounter. Eine Tapezubehörmarke kann für Standardware einen Fachmarkt wählen und professionellen Verarbeitern zusätzliche Produkte über einen Spezialgroßhandel anbieten. Entscheidend sind Kaufgewohnheit, Service und passende Reichweite.'],
    ],
    terms: [
      ['absatzmittler', 'Absatzmittler', 'Selbstständiger Wiederverkäufer, der Ware im eigenen Namen und auf eigene Rechnung beschafft und weiterverkauft.'],
      ['absatzhelfer', 'Absatzhelfer', 'Beteiligter, der Vertriebsaufgaben übernimmt, ohne die Ware wie ein Wiederverkäufer auf eigene Rechnung einzukaufen.'],
    ],
    question: 'Ein Hersteller beauftragt in Region A einen Handelsvertreter und beliefert in Region B einen Großhändler. In welcher Region liegt eindeutig eine Wiederverkaufsstufe vor?',
    answer: 'In Region B. Der Großhändler kauft und verkauft auf eigene Rechnung. Der Handelsvertreter in Region A vermittelt Geschäfte oder schließt sie für den Anbieter ab. Die genauen Verkaufsrollen sind getrennt von der vertraglichen oder organisatorischen Bindung zu betrachten.',
  },
  {
    id: 'handelswahl', parent: 'indirekt', number: '2.4.2.1', title: 'Händlerauswahl, Distributionsgrad und ECR',
    intro: 'Die Händlerauswahl entscheidet über die Zahl und Eignung der Verkaufsstellen. Distributionsgrade messen unterschiedliche Aspekte der Präsenz.',
    parts: [
      ['intensitaet', 'Intensiv, selektiv oder exklusiv wählen', 'Bei intensiver Distribution wird eine möglichst breite Abdeckung geeigneter Verkaufsstellen angestrebt. [[selektive-distribution|Selektive Distribution]] wählt Händler nach Kriterien wie Beratungsfähigkeit, Sortiment oder Standort. Exklusive Distribution beschränkt die Zahl der zugelassenen Händler besonders stark, etwa auf einen Partner je Gebiet. Prüfe bei vertraglichen Beschränkungen die einschlägigen Regeln und den konkreten Vertrag.', 'Snacks brauchen viele leicht erreichbare Kaufstellen. Eine hochwertige Kamera braucht geschulte Beratung und Vorführgeräte. Eine spezialisierte Laboranlage kann in kleinen Auslandsmärkten mit einem exklusiven Partner eingeführt werden, sofern dessen Kapazität und Service genügen.'],
      ['rechnung', 'Numerischen und gewichteten Distributionsgrad berechnen', 'Der numerische [[distributionsgrad|Distributionsgrad]] teilt die Verkaufsstellen mit dem Produkt durch alle relevanten Verkaufsstellen. Der gewichtete Grad teilt den Umsatz der relevanten Warengruppe in den führenden Verkaufsstellen durch den gesamten Warengruppenumsatz aller relevanten Stellen. Beide Ergebnisse werden mit 100 multipliziert und in Prozent angegeben. Zeitraum, Region, Warengruppe und Grundgesamtheit müssen vergleichbar sein.', 'Ein Produkt steht in 24 von 80 Fachgeschäften. Der numerische Grad beträgt 24 ÷ 80 × 100 = 30 %. Diese 24 Geschäfte erwirtschaften mit der Geräteklasse 1,8 Mio. €, alle 80 zusammen 3 Mio. €. Der gewichtete Grad beträgt 1,8 ÷ 3 × 100 = 60 %. Das Produkt ist eher in umsatzstarken Geschäften präsent. Der Nenner ist Warengruppenumsatz, nicht der Umsatz des einzelnen Produkts.', 'Zweiter Kontext. Eine Bio-Marke steht in zwölf von 30 Märkten. Numerisch sind das 40 %. Deren 0,2 Mio. € Bio-Snack-Umsatz machen von insgesamt 1 Mio. € nur 20 % aus. Mehr Verkaufsstellen sind hier nur sinnvoll, wenn ihre Warengruppenleistung und ihre Eignung zusammenpassen.'],
      ['kooperation', 'Vertikales Marketing und Efficient Consumer Response', 'Beim vertikalen Marketing koordinieren Hersteller und Handel die Maßnahmen über verschiedene Wertschöpfungsstufen hinweg. Händler können Produktschulungen, abgestimmte Verbraucherwerbung und gemeinsame Verkaufsförderung nutzen. [[ecr|Efficient Consumer Response]] entwickelt darüber hinaus die Schnittstellen im Warennachschub, Sortiment, bei Promotions und bei Produkteinführungen weiter.', 'Beispiel. Ein Getränkehersteller und ein Handelsunternehmen stimmen Verkaufsdaten, Liefertermine und Aktionsplanung ab, damit die beworbene Ware verfügbar bleibt. Die Verkaufsförderung bringt nur dann dauerhaft Nutzen, wenn Warenflüsse, Bestände und Nutzen für beide Seiten mitbetrachtet werden.'],
    ],
    terms: [
      ['selektive-distribution', 'Selektive Distribution', 'Auswahl von Absatzmittlern anhand definierter Qualifikations- oder Eignungskriterien für das Vertriebsangebot.'],
      ['distributionsgrad', 'Distributionsgrad', 'Kennzahl für die Marktpräsenz. Sie setzt die führenden Verkaufsstellen entweder nach Anzahl oder nach deren Warengruppenumsatz zur gesamten relevanten Grundgesamtheit ins Verhältnis.'],
      ['ecr', 'Efficient Consumer Response (ECR)', 'Zusammenarbeit von Herstellern und Handel zur besseren Abstimmung von Warenversorgung, Sortiment, Aktionen und Produkteinführungen auf die Kundennachfrage.'],
    ],
    question: 'Ein Hersteller erreicht 15 von 60 relevanten Läden. Diese Läden erzielen 0,9 von 2 Mio. € Warengruppenumsatz. Berechne beide Grade und beurteile das Ergebnis.',
    answer: 'Numerisch 15 ÷ 60 × 100 = 25 %. Gewichtet 0,9 ÷ 2 × 100 = 45 %. Die Auswahl erreicht im Warengruppenumsatz überdurchschnittlich starke Verkaufsstellen. Daraus folgt weder der Marktanteil des Produkts noch, dass alle übrigen Verkaufsstellen ungeeignet sind.',
  },
  {
    id: 'channel', parent: 'distribution', number: '2.4.3', title: 'Multi-, Cross- und Omnichannel-Vertrieb',
    intro: 'Die Begriffe unterscheiden, wie stark mehrere Vertriebskanäle miteinander verknüpft sind.',
    parts: [
      ['modelle', 'Stufen der Kanalintegration', 'Im [[multichannel|Multichannel-Vertrieb]] stehen mehrere Kanäle zur Wahl, etwa Laden, eigener Shop, Marktplatz, mobiler Shop oder TV-Shopping. Im engeren Buchgebrauch arbeiten sie nebeneinander. Der [[cross-channel|Cross-Channel-Vertrieb]] verbindet ausgewählte Übergänge. Kundinnen können online bestellen und im Laden abholen, dort gekauft haben und online den Service anstoßen oder zwischen Beratung und Kauf den Kanal wechseln. Im [[omnichannel|Omnichannel-Vertrieb]] greifen die relevanten Kanäle so zusammen, dass die Kundschaft den Einkaufsprozess nahezu durchgängig fortsetzen kann.', 'Ein Buchhandel betreibt zunächst getrennte Kassen und Webbestände. Danach ermöglicht er Online-Reservierung mit Abholung. Für eine stärker integrierte Kundenerfahrung verbindet er zusätzlich verfügbare Bestände, Aufträge und Servicefälle. Ein B2B-Anbieter kann ähnliche Übergänge von einer Messe über das Angebotsportal zum persönlichen Key Account schaffen.'],
      ['grenzen', 'Integration gezielt einführen', 'Gemeinsame Bestände, eine konsistente Produktinformation, abgestimmte Zuständigkeiten und eine durchgängige Abwicklung von Zahlungen und Retouren sind wesentliche Voraussetzungen. Das [[>kundenbeziehungsmanagement|Kundenbeziehungsmanagement]] führt Kontakte und Folgeprozesse zusammen, soweit die nötigen Angaben vorliegen und verwendet werden dürfen. Prüfe, wo Kunden heute abbrechen, und beginne mit einem Übergang, dessen Nutzen messbar ist. Online-Verfügbarkeit allein garantiert keine Abholung und ein Marktplatz kann die Steuerung von Kundendaten und Service begrenzen.', 'Ein Hersteller unterscheidet beim digitalen Verkauf die Rolle der Plattform. Verkauft er selbst über einen Marktplatz an die Kundschaft, kann der Absatz wirtschaftlich unmittelbar bleiben. Kauft die Plattform Ware ein und verkauft sie selbst weiter, liegt eine Zwischenstufe vor. Das digitale Umfeld bestimmt die Einordnung nicht allein.'],
    ],
    terms: [
      ['multichannel', 'Multichannel-Vertrieb', 'Angebot mehrerer Vertriebskanäle. Im engeren Sinn laufen die Kanäle parallel und sind operativ nicht miteinander verbunden.'],
      ['cross-channel', 'Cross-Channel-Vertrieb', 'Gezielte Verbindung einzelner Vertriebskanäle, etwa durch Online-Bestellung mit Abholung am Standort.'],
      ['omnichannel', 'Omnichannel-Vertrieb', 'Abgestimmte Integration der relevanten Vertriebskanäle mit durchgängigen Daten und Abläufen für den kanalübergreifenden Kauf.'],
    ],
    question: 'Ein Händler bietet eine App, einen Shop und Filialen an. Nur im Shop bestellte Ware lässt sich in einer Filiale abholen. App und Filiale führen getrennte Bestände. Was liegt vor?',
    answer: 'Es gibt mehrere Kanäle und mit der Abholung einen konkreten Cross-Channel-Übergang. Für eine durchgängige Omnichannel-Erfahrung fehlen unter anderem kanalübergreifend konsistente Bestände und abgestimmte Folgeprozesse.',
  },
  {
    id: 'kommunikation', parent: 'mix', number: '2.5', title: 'Kommunikationspolitik und Werbewirkung',
    intro: 'Kommunikationspolitik bestimmt, welche Botschaft ein Unternehmen an wen, über welche Kanäle und mit welchem Ziel vermittelt.',
    parts: [
      ['wirkung', 'Was Marktkommunikation leisten soll', '[[marktkommunikation|Marktkommunikation]] informiert über Leistung und Preis, spricht Bedürfnisse an, beeinflusst Einstellungen und kann eine Präferenz für den Anbieter aufbauen. Nach dem Kauf bestätigt etwa eine Nutzungsanleitung die Entscheidung und kann Zweifel verringern. Kommunikation kann zudem gesellschaftliche Vorstellungen prägen. Gut informierte Mitarbeitende tragen das Leistungsversprechen im Kundenkontakt mit.', 'Ein Anbieter von Fahrradreparaturen macht bisher wenig beachtete Sicherheitsprobleme sichtbar, informiert über Inspektionen und nennt eine Buchungsmöglichkeit. Nach der Inspektion erklärt der Betrieb den Kunden die ausgeführten Arbeiten. Die Kommunikationsziele ändern sich entlang der Kundenbeziehung.'],
      ['modelle', 'AIDA und ASIDAS anwenden', '[[aida|AIDA]] zerlegt die beabsichtigte Wirkung in Attention, Interest, Desire und Action. Die Botschaft gewinnt Aufmerksamkeit, weckt Interesse, lässt einen Wunsch entstehen und führt idealerweise zu einer Handlung. [[asidas|ASIDAS]] ergänzt zwischen Aufmerksamkeit und Interesse die Suche (Search) sowie nach der Handlung das Teilen von Erfahrungen (Share).', 'Für einen neuen Lernkurs kann ein kurzer Hinweis Aufmerksamkeit erzeugen, eine auffindbare Kursseite die Suche bedienen und eine kostenlose Probe Interesse und Wunsch stärken. Eine klare Anmeldung unterstützt die Aktion, eine spätere Bewertungsmöglichkeit das Teilen. Nutze die Stufen als Diagnosehilfe. Kundinnen können springen, zurückkehren oder bereits mit einer konkreten Suche beginnen.'],
      ['mix', 'Instrumente gezielt verbinden', 'Zum Kommunikationsmix gehören Werbung, Verkaufsförderung, Öffentlichkeitsarbeit, persönlicher Verkauf, Messen und Ausstellungen sowie etwa Sponsoring, Product Placement, Direktkommunikation, Event- und Online-Marketing. Eine Kombination lohnt sich, wenn die Instrumente Aufgaben übernehmen, die sich ergänzen. Ein Maschinenanbieter kann über Fachmedien Interesse wecken und auf einer Messe die technische Rückfrage klären.', 'Vertiefe [[>werbung|Werbeplanung]], [[>verkaufsfoerderung|Verkaufsförderung]], [[>pr|Öffentlichkeitsarbeit]], [[>sponsoring|Sponsoring]] und [[>online|Online-Marketing]].'],
    ],
    terms: [
      ['marktkommunikation', 'Marktkommunikation', 'Zielgerichtete Übermittlung von Botschaften zwischen einem Anbieter und aktuellen oder potenziellen Kunden, beispielsweise zur Information, Präferenzbildung oder Bestätigung nach dem Kauf.'],
      ['aida', 'AIDA', 'Modell beabsichtigter Kommunikationswirkung mit den Stufen Attention, Interest, Desire und Action.'],
      ['asidas', 'ASIDAS', 'Erweiterung der AIDA-Folge um Search nach Attention und Share nach Action.'],
    ],
    question: 'Ein Video wird häufig angesehen. Viele Menschen suchen danach nach dem Produkt, kommen aber nur auf eine allgemeine Firmenwebsite. Welche Stufe solltest du bearbeiten?',
    answer: 'Die Suche produziert bereits Nachfrage. Der Übergang von Search zu Interest ist schwach, weil keine passende Produktseite erreicht wird. Eine auffindbare Zielseite mit verständlichem Nutzen und konkretem nächsten Schritt ist geeigneter als zusätzliche Videoreichweite allein.',
  },
  {
    id: 'werbung', parent: 'kommunikation', number: '2.5.1', title: 'Werbung planen und Botschaften gestalten',
    intro: 'Werbung ist bezahlte, typischerweise nicht persönliche Kommunikation, mit der ein Anbieter Einstellungen oder Handlungen beeinflussen will.',
    parts: [
      ['ablauf', 'Die Werbeplanung Schritt für Schritt', 'Lege zuerst Zielgruppe und Ziel fest, danach das Werbeobjekt, etwa eine neue Leistung, eine Produktreihe, die Firma oder mehrere Unternehmen einer Branche. Ermittle das Budget, formuliere die Botschaft, wähle Träger und Mittel und lege die zeitliche Verteilung im Mediaplan fest. Nach der Realisierung folgt die [[>werbekontrolle|Werbeerfolgskontrolle]]. Die Entscheidungen greifen ineinander. Überarbeite Ziele und Formate, wenn ein gewähltes Medium die Botschaft nicht tragen kann.', 'Ein Fahrradladen will die gestützte Bekanntheit seines Reparaturservices in einem Quartal von 25 % auf 35 % erhöhen. Das ist ein psychografisches Ziel mit zehn Prozentpunkten Steigerung. Das übergeordnete ökonomische Ziel können mehr profitable Reparaturaufträge sein. Miss beide Ebenen, wenn du Kommunikationswirkung und kaufmännischen Beitrag auseinanderhalten willst.'],
      ['grundsaetze', 'Wahrheit, Klarheit und Glaubwürdigkeit', 'Ein Werbeversprechen sollte überprüfbar und erfüllbar sein. Formuliere es klar für die Zielgruppe, gestalte Bilder und Texte aufeinander abgestimmt, wähle wirksame Medien und halte Aufwand und Ergebnis in einem sinnvollen Verhältnis. Berücksichtige soziale Verantwortung und rechtliche Grenzen. Die formal auffälligste Gestaltung hilft wenig, wenn Bild und Ton dem behaupteten Leistungsnutzen widersprechen. Die Leitfrage beim Handel ist häufig, warum die Kundschaft gerade diese Einkaufsstätte besuchen soll. Ein Hersteller stellt eher den Nutzen seines Produkts oder seiner Marke heraus.', 'Eine isolierte technische Angabe kann in einer Fachanzeige genügen, aber eine Kaufentscheidung im Endverbrauchergeschäft braucht verständliche Angaben zum konkreten Nutzen. Gruppenwerbung kann gemeinsam eine Region oder Branche bekannter machen. Kooperative Werbung kann einen Hersteller und seine Händler mit abgestimmten Botschaften unterstützen.'],
      ['push-pull', 'Push und Pull kombinieren', 'Bei [[push-strategie|Push]] richtet der Hersteller Anreize und Betreuung an die Absatzstufe. Verkaufsschulungen und Einführungskonditionen motivieren Händler, das Produkt zu listen und aktiv anzubieten. Bei [[pull-strategie|Pull]] richtet sich die Botschaft an Endabnehmer. Deren Nachfrage bewegt den Handel dazu, das Produkt zu führen. Ein neuartiger Werkstoff kann über Großhändlerschulungen in den Kanal gelangen und über Fachvideos bei Verarbeitern nachgefragt werden.', 'Wenn Händler die Ware noch nicht zuverlässig liefern können, produziert eine Pull-Kampagne unerfüllte Nachfrage. Wird umgekehrt nur der Handel gefördert, kann ohne Nachfrage der Lagerbestand steigen. Plane beide Richtungen mit dem [[>indirekt|indirekten Absatz]] ab.'],
    ],
    terms: [
      ['push-strategie', 'Push-Strategie', 'Hersteller stimuliert den Absatz über Anreize und Unterstützung für nachgelagerte Absatzorgane.'],
      ['pull-strategie', 'Pull-Strategie', 'Hersteller richtet seine Kommunikation an Endabnehmer, deren Nachfrage das Angebot durch die Handelsstufen anstößt.'],
    ],
    question: 'Ein Unternehmen schult Fachhändler und schaltet zusätzlich eine Verbraucherkampagne für dasselbe Produkt. Welche Maßnahme ist Push, welche Pull?',
    answer: 'Die Schulung setzt beim Handel und damit bei Push an. Die Verbraucherkampagne soll Nachfrage bei Endabnehmern auslösen und gehört zu Pull. Damit sie einander verstärken, müssen Lieferbarkeit, Präsentation und Startzeitpunkt abgestimmt sein.',
  },
  {
    id: 'werbebudget', parent: 'werbung', number: '2.5.1.1', title: 'Werbebudget und Budgetierungsmethoden',
    intro: 'Das Werbebudget begrenzt die Aufwendungen für geplante Werbung in einer bestimmten Periode. Die Budgetierungsmethode bestimmt, wie dieser Betrag hergeleitet wird.',
    parts: [
      ['methoden', 'Vier Wege zum Werbebudget', 'Bei der Umsatzmethode (Percentage of Sales) wird ein Prozentsatz auf vergangenen, laufenden oder erwarteten Umsatz angewandt. Das ist leicht berechenbar, kann bei sinkenden Umsätzen aber ausgerechnet dann Mittel reduzieren, wenn die Nachfrage gezielt gestützt werden soll. Die Finanzkraftmethode (All You Can Afford) setzt bei den verfügbaren Mitteln an. Sie ist liquiditätsnah, sagt aber wenig über Zielerreichung. Beim Wettbewerbsvergleich (Competitive Parity) dienen geschätzte Konkurrenzbudgets als Orientierung. Anlässe, Ziele und Datenqualität müssen vergleichbar sein.', 'Die [[objective-and-task|Ziel-Aufgaben-Methode]] leitet Maßnahmen aus den Werbezielen ab, schätzt deren Aufwendungen und passt den Plan an die Budgetgrenze an. Sie zeigt, wofür das Geld vorgesehen ist. Sie liefert dennoch keinen sicheren Wirkungsnachweis, da Wirkung und Beitrag einzelner Medien oft nur geschätzt werden können.'],
      ['rechnung', 'Budget herleiten und einordnen', 'Ein Möbelhersteller erzielt im Vorjahr 2 Mio. € Umsatz und setzt 2 % an. Das ergibt 2.000.000 € × 0,02 = 40.000 €. Bei geplantem Umsatz von 1,5 Mio. € ergäbe derselbe Satz nur 30.000 €. Ob die Reduzierung sinnvoll ist, ergibt sich nicht aus der Formel.', 'Ein regionaler Berufsbildungsbetrieb plant nach Ziel und Aufgaben. Produktvideo 6.000 €, regionale Medien 12.000 € und Erhebung der Werbewirkung 4.000 € ergeben 22.000 €. Liegt das Budget bei 20.000 €, kann er etwa die Medien enger auf eine Region fokussieren. Das Prüfergebnis sollte die ursprüngliche Zielgruppe dann entsprechend eingrenzen.'],
    ],
    terms: [['objective-and-task', 'Ziel-Aufgaben-Methode', 'Werbebudgetierung, bei der Ziele in konkrete Werbemaßnahmen übersetzt und deren Kosten zu einem Budget addiert werden.']],
    question: 'Du erhältst drei Monate Zeit für die Einführung eines Angebots. Welche Budgetierung zeigt transparent, welche Kosten nötig sind, und wie gehst du bei einer Obergrenze vor?',
    answer: 'Setze die Ziel-Aufgaben-Methode ein. Bestimme Ziel und Zielgruppe, leite Aufgaben ab, schätze deren Kosten, bilde die Summe und priorisiere innerhalb der Obergrenze. Passe bei gekürzten Aufgaben gegebenenfalls die Reichweite oder das Ziel an und überprüfe die Wirkung.',
  },
  {
    id: 'mediaplanung', parent: 'werbung', number: '2.5.1.2', title: 'Werbeträger, Werbemittel und Mediaplan',
    intro: 'Mediaplanung übersetzt Ziel und Botschaft in eine Auswahl von Medien, Formaten und Schaltzeiten.',
    parts: [
      ['unterschied', 'Träger und Mittel auseinanderhalten', 'Ein [[werbetraeger|Werbeträger]] bringt die Botschaft zur Zielgruppe, etwa eine Fachzeitschrift, ein Radiosender, Fernsehen, eine Website, eine Plakatfläche oder ein öffentlicher Verkehrsträger. Ein [[werbemittel|Werbemittel]] ist die konkrete Gestaltung, etwa Anzeige, Radio- oder Fernsehspot, Banner, Plakat oder Fahrzeugbeschriftung. Bei der Wahl müssen Reichweite, Kontaktfrequenz, Zielgruppenpassung, darstellbarer Inhalt, Zeit und Kosten zusammenpassen.', 'Bei der [[intermediaselektion|Intermediaselektion]] wird zwischen Mediengattungen gewählt, beispielsweise Radio oder Fachmedien. Bei der [[intramediaselektion|Intramediaselektion]] werden konkrete Medien innerhalb einer Gattung ausgewählt, beispielsweise zwei Fachzeitschriften. Ein Industriebetrieb kann eine technische Grafik in Fachmedien zeigen. Bei einem regionalen Konzert kann Radio zeitnah viele lokale Menschen erreichen.'],
      ['termin', 'Schaltungen und Budget zeitlich verteilen', 'Der Mediaplan dokumentiert, welches Format wann und über welches Medium mit welchen Kosten eingesetzt wird. Gleichmäßige Verteilung eignet sich für dauerhafte Erinnerung, Schwerpunktsetzung für eine Einführung. Prozyklisch setzt Werbung in einer ohnehin starken Geschäftsphase an. Antizyklisch versucht sie, schwache Phasen zu beleben, sofern die Nachfrage tatsächlich beeinflussbar ist.', 'Für die Zielgruppenpassung helfen [[>tkp|TKP und gewichteter TKP]]. Ein Medium mit niedrigerem Preis je Kontakt kann wegen geringer Streuqualität, ungeeigneter Darstellung, hoher Mehrfachkontakte oder unpassender Schaltzeit schlechter sein.'],
    ],
    terms: [
      ['werbetraeger', 'Werbeträger', 'Medium oder Fläche, die ein Werbemittel an die Zielgruppe übermittelt.'],
      ['werbemittel', 'Werbemittel', 'Konkrete Aufbereitung der Botschaft in Schrift, Bild oder Ton, die über einen Werbeträger verbreitet wird.'],
      ['intermediaselektion', 'Intermediaselektion', 'Auswahl zwischen unterschiedlichen Mediengattungen.'],
      ['intramediaselektion', 'Intramediaselektion', 'Auswahl konkreter Werbeträger innerhalb einer Mediengattung.'],
    ],
    question: 'Zuerst vergleichst du Radio und Fachpresse, danach zwei Radiosender. Ordne beide Entscheidungen ein und nenne je eine sinnvolle Messgröße.',
    answer: 'Radio gegen Fachpresse ist Intermediaselektion, etwa anhand von Zielgruppenpräsenz und Darstellbarkeit der Botschaft. Der Vergleich zweier Radiosender ist Intramediaselektion, etwa anhand von Reichweite in der Zielgruppe und gewichtetem TKP.',
  },
  {
    id: 'tkp', parent: 'werbung', number: '2.5.1.3', title: 'Tausenderkontaktpreis und Zielgruppengenauigkeit',
    intro: 'Der Tausenderkontaktpreis macht Werbekosten je 1.000 Kontakte oder Kontaktchancen vergleichbar. Der gewichtete Wert bezieht nur die definierte Zielgruppe ein.',
    parts: [
      ['formeln', 'Beide Kennzahlen berechnen', '[[tkp-normal|TKP]] = Nettokosten in € je Schaltung ÷ Reichweite je Schaltung × 1.000. [[tkp-gewichtet|Gewichteter TKP]] = TKP ÷ Zielgruppenanteil als Dezimalzahl. Gleichwertig ist Kosten ÷ Zielgruppenkontakte × 1.000. Die Zielgruppenkontakte entsprechen Reichweite × Zielgruppenanteil. Bei 40 % setzt du deshalb 0,40 ein. Die Ergebnisse lauten € je 1.000 (Zielgruppen-)Kontakte.', 'Nutze konsistente Definitionen. Vergleiche beispielsweise erwartete Kontaktchancen mit erwarteten Kontaktchancen. Eindeutige erreichte Personen lassen sich nicht ohne Weiteres mit Mehrfachimpressionen gleichsetzen. Der Zielgruppenanteil ist der Anteil der Zielgruppe im Publikum des Mediums, nicht deren Anteil an der Bevölkerung.'],
      ['beispiel', 'Ein Medienvergleich mit wechselnder Rangfolge', 'Medium A kostet 2.400 € und erreicht 120.000 Kontakte. 2.400 ÷ 120.000 × 1.000 = 20 € TKP. Bei 40 % Zielgruppenanteil sind das 48.000 Zielgruppenkontakte. 20 ÷ 0,40 = 50 € gewichteter TKP.', 'Medium B kostet 1.800 € und erreicht 60.000 Kontakte. 1.800 ÷ 60.000 × 1.000 = 30 € TKP. Bei 75 % Zielgruppenanteil sind das 45.000 Zielgruppenkontakte. 30 ÷ 0,75 = 40 € gewichteter TKP.', 'A kostet weniger je 1.000 Gesamtkontakte. B kostet weniger je 1.000 Zielgruppenkontakte, liefert aber im Beispiel absolut weniger Zielgruppenkontakte. Für das Urteil zählen zusätzlich Budgetgrenze, benötigte Reichweite, Kontakthäufigkeit, Kontaktqualität und tatsächliche Wirkung.'],
      ['zweiter-kontext', 'Zweiter Kontext mit digitaler Werbung', 'Ein Verband bezahlt 500 € für 50.000 Impressionen einer Bannerkampagne. Bei 60 % Zielgruppenanteil sind das 30.000 passende Impressionen. Der normale TKP ist 500 ÷ 50.000 × 1.000 = 10 €. Der gewichtete TKP ist 10 ÷ 0,60 ≈ 16,67 €. Das ist eine Aussage über Kontakte. Für die letztlich angestrebten Anmeldungen prüft der Verband zusätzlich Kosten je qualifizierter Anmeldung.'],
    ],
    terms: [
      ['tkp-normal', 'Tausenderkontaktpreis (TKP)', 'Werbekosten je Schaltung geteilt durch deren Reichweite und mit 1.000 multipliziert.'],
      ['tkp-gewichtet', 'Gewichteter Tausenderkontaktpreis', 'Kosten je 1.000 Kontakte in der definierten Zielgruppe. Der einfache TKP wird durch deren Anteil an allen Kontakten als Dezimalwert geteilt.'],
    ],
    question: 'C kostet 900 € bei 45.000 Kontakten und 25 % Zielgruppenanteil. D kostet 1.200 € bei 40.000 Kontakten und 75 % Zielgruppenanteil. Welches Medium kauft Zielgruppenkontakte effizienter ein?',
    answer: 'C hat 900 ÷ 45.000 × 1.000 = 20 € TKP und 20 ÷ 0,25 = 80 € gewichteten TKP. D hat 1.200 ÷ 40.000 × 1.000 = 30 € TKP und 30 ÷ 0,75 = 40 € gewichteten TKP. D ist nach Zielgruppenkosten effizienter, sofern Qualität und Definition der Kontakte vergleichbar sind.',
  },
  {
    id: 'werbekontrolle', parent: 'werbung', number: '2.5.1.4', title: 'Werbewirkung und Werbeerfolg kontrollieren',
    intro: 'Werbeerfolgskontrolle prüft, ob eine Maßnahme zielgerecht gewirkt hat. Sie unterscheidet kommunikative Wirkung und wirtschaftliche Ergebnisse.',
    parts: [
      ['messverfahren', 'Kommunikative Wirkung messen', 'Befragung und Imageanalyse prüfen beispielsweise Bekanntheit, Vertrauen und Einstellungen. Ein [[recall|Recall-Test]] untersucht Erinnerung, etwa mit der Frage, an welche Werbung sich jemand erinnert. Ein [[recognition|Recognition-Test]] prüft Wiedererkennung eines vorgelegten Mittels. Apparative Messungen wie Blickverlauf oder körperliche Reaktionen erfassen Aufmerksamkeit oder Erregung. Diese allein beweisen weder Verständnis noch Kaufabsicht. Verfahren können vor und nach der Schaltung eingesetzt werden.', 'Bei einem Test sehen zwei Gruppen unterschiedliche Varianten eines Plakats. Mehr Betrachter erinnern sich an die Botschaft von Variante A, während B häufiger wiedererkannt wird. Für eine leicht abrufbare Kaufbotschaft kann der Recall wichtiger sein als die reine Wiedererkennung.'],
      ['wirtschaft', 'Wirtschaftlichen Zusatzbeitrag prüfen', 'Umsatz, Deckungsbeitrag und Kosten sind wirtschaftliche Ergebnisse. Das Isolierungsproblem entsteht durch gleichzeitige Preisänderungen, Händleraktionen, Saison und Konkurrenz. Beim [[carry-over|Carry-over-Effekt]] tritt Wirkung zeitversetzt auf. Beim [[spill-over|Spill-over-Effekt]] beeinflusst die Aktion andere Produkte oder Bereiche. Behandle beobachteten Mehrumsatz deshalb vorsichtig als Indiz. Geeignet sind je nach Fall ein Vergleich ähnlich entwickelter Regionen, ein kontrollierter Test und ausreichend lange Nachbeobachtung.', 'Ein Saatgutanbieter schaltet Werbung in einer Testregion. Vorher verkaufen Test- und Vergleichsregion je 100 Packungen. Nachher liegen sie bei 135 und 120. Der Unterschied der Veränderungen beträgt (135 − 100) − (120 − 100) = 15 Packungen. Das ist unter vergleichbaren Bedingungen ein Näherungswert, denn eine gleichzeitige lokale Preisaktion kann auch diesen Vergleich verzerren.'],
    ],
    terms: [
      ['recall', 'Recall-Test', 'Test, der prüft, welche Werbebotschaften oder Werbemittel Menschen aus der Erinnerung abrufen können.'],
      ['recognition', 'Recognition-Test', 'Test, der prüft, ob Befragte ein vorgelegtes Werbemittel wiedererkennen.'],
      ['carry-over', 'Carry-over-Effekt', 'Zeitliche Ausstrahlung einer Kommunikationsmaßnahme auf eine spätere Periode.'],
      ['spill-over', 'Spill-over-Effekt', 'Sachliche Ausstrahlung einer Kommunikationsmaßnahme auf andere Produkte oder Bereiche.'],
    ],
    question: 'Während einer Werbekampagne senkt der Handel den Preis. Der Absatz steigt erst im Folgemonat, auch bei einem ähnlichen Produkt. Welche Messprobleme liegen nahe?',
    answer: 'Die Preisänderung erschwert das Isolieren des Werbebeitrags. Eine Wirkung in der Folgeperiode kann Carry-over sein, die Wirkung beim ähnlichen Produkt Spill-over. Prüfe Preis, Bestände und Vergleichsdaten, bevor du den gesamten Zuwachs der Werbung zurechnest.',
  },
  {
    id: 'verkaufsfoerderung', parent: 'kommunikation', number: '2.5.2', title: 'Verkaufsförderung und Promotion',
    intro: 'Verkaufsförderung setzt zeitlich begrenzte Zusatzanreize, die Verkauf, Weiterverkauf oder Kauf beschleunigen. Sie lässt sich nach der angesprochenen Gruppe unterscheiden.',
    parts: [
      ['gruppen', 'Wer soll sein Verhalten ändern?', 'Bei der [[haendlerpromotion|Händlerpromotion]] richtet der Anbieter Maßnahmen an den Handel. Einführungskonditionen, Displays, Schulungen, Händlerwettbewerbe und Zuschüsse zur Gemeinschaftswerbung können Listung, Platzierung und aktive Empfehlung fördern. Bei der [[verbraucherpromotion|Verbraucherpromotion]] profitieren Endkunden unmittelbar, etwa durch Probierangebote, Gutscheine, Zugaben, Treueaktionen oder Vorführungen am [[pos|Point of Sale]]. Bei der [[verkaeuferpromotion|Verkäuferpromotion]] erhalten eigene Vertriebsmitarbeitende etwa Leitfäden, Trainings, Wettbewerbe oder zielgebundene Anerkennung.', 'Ein Hersteller von Klebstoffen liefert Erklärdisplays an Händler, bietet Verarbeitern ein Probierpaket und schult sein Außendienstteam. Jede Maßnahme hat einen anderen unmittelbaren Adressaten, auch wenn alle demselben Produkt dienen. Ein Dienstleister kann einem Partner ein Einführungstraining geben und Neukunden einen befristeten Probetermin anbieten.'],
      ['grenzen', 'Aktionswirkung und Kosten überprüfen', 'Plane Ziel, Zeitraum, Bestand, Kosten und Auswertung vor Start. [[sell-in|Sell-in]] misst Verkäufe des Herstellers an den Handel. [[sell-out|Sell-out]] erfasst Verkäufe des Handels an Endkunden. Ein starker Sell-in nach einem Händleranreiz kann zunächst nur Lagerbestände erhöhen. Prüfe daher den Abverkauf im selben Gebiet und Zeitraum. Vergleiche Abverkäufe und zusätzlichen Deckungsbeitrag mit Aktionskosten, möglichen Kaufvorziehungen und Kannibalisierung. Aktionserfolge können nach Ende des Anreizes zurückgehen oder eine dauerhafte Rabatt-Erwartung erzeugen.', 'Ein Händler erhält bei einer neuen Kaffeesorte mehr Aktionsware, die Verkäufe der Sorte steigen um 60, die der bisherigen Sorte fallen gleichzeitig um 45 Packungen. Damit steigen die Gesamtverkäufe der beiden Sorten zunächst um 15 Packungen. Erst der Vergleich der Deckungsbeiträge einschließlich Aktionskosten zeigt, ob die Aktion wirtschaftlich war.'],
    ],
    terms: [
      ['haendlerpromotion', 'Händlerpromotion', 'Verkaufsförderung, die Handelspartner für Listung, Präsentation und Weiterverkauf unterstützt oder motiviert.'],
      ['verbraucherpromotion', 'Verbraucherpromotion', 'Verkaufsförderung, die Endkunden mit einem befristeten oder zusätzlichen Kaufanreiz anspricht.'],
      ['verkaeuferpromotion', 'Verkäuferpromotion', 'Verkaufsförderung, die das eigene Verkaufsteam informiert, qualifiziert oder zu zielgerichteter Aktivität motiviert.'],
      ['sell-in', 'Sell-in', 'Menge oder Wert der Verkäufe vom Hersteller an den Handel.'],
      ['sell-out', 'Sell-out', 'Menge oder Wert der Verkäufe vom Handel an Endkunden.'],
      ['pos', 'Point of Sale (PoS)', 'Verkaufsort oder konkrete Stelle, an der die Kaufentscheidung unterstützt und der Kauf abgewickelt werden kann.'],
    ],
    question: 'Ein Hersteller stellt einem Händler Verkostungspersonal für dessen Markt. Welche Promotion richtet sich an wen?',
    answer: 'Die Verkostung ist Verbraucherpromotion, weil sie bei Endkunden einen Probier- und Kaufanreiz setzt. Der Hersteller kann den Händler zugleich mit Ausstattung oder Zuschüssen unterstützen. Entscheidend für die Zuordnung der einzelnen Maßnahme ist ihr unmittelbarer Adressat.',
  },
  {
    id: 'pr', parent: 'kommunikation', number: '2.5.3', title: 'Öffentlichkeitsarbeit und Public Relations',
    intro: 'Public Relations baut Beziehungen zu relevanten Öffentlichkeiten auf und pflegt Vertrauen in das Unternehmen. PR richtet sich an interne und externe Gruppen.',
    parts: [
      ['intern', 'Interne Öffentlichkeitsarbeit', '[[public-relations|Public Relations]] arbeitet beispielsweise mit Mitarbeitenden, Management, Interessenvertretungen, Anteilseignern und Geschäftspartnern. Interne Instrumente können Mitarbeiterversammlung, Intranet, Unternehmensnachrichten, Einarbeitung und Dialogformate sein. Ein gemeinsamer Informationsstand stärkt die Konsistenz zwischen dem Verhalten im Kundenkontakt und dem äußeren Auftritt.', 'Wenn eine Spedition ein neues Serviceversprechen öffentlich kommuniziert, müssen Disposition und Kundenservice vorher Rückfragen beantworten können. Eine interne Anleitung mit Ansprechpartnern ist dafür wirksamer als ein Vorstandszitat im Intranet allein.'],
      ['extern', 'Externe Öffentlichkeitsarbeit', 'Externe Öffentlichkeiten sind unter anderem Presse und weitere Medien, Kundschaft, Behörden, Nachbarschaft und Verbände. Geeignete Instrumente sind Pressegespräche, Meldungen, Veranstaltungen, Berichte, Werksbesuche sowie Krisen-PR. Eine Redaktion entscheidet selbst, ob und wie sie berichtet. Das unterscheidet die angestrebte Berichterstattung von einer bezahlten Anzeige mit kontrolliertem Veröffentlichungstext.', 'Klassische PR konzentriert sich auf das Ansehen des Unternehmens. Product Publicity kann auch ein Produkt zum Anlass machen, etwa bei einer überprüfbaren technischen Neuerung. [[csr|Corporate Social Responsibility]] betrifft verantwortliches Handeln im Unternehmen. PR kann dieses Handeln erläutern, muss dafür jedoch belegbare Leistungen kommunizieren.'],
      ['messung', 'PR planen und überprüfen', 'Definiere Gruppe, Ziel, Thema, Informationsbedarf, Verantwortung und Kanal. Eine Gemeinde interessiert sich bei einer neuen Produktionsanlage für Verkehr und Lärm, während ein Fachmedium nach technischer Neuheit fragt. Prüfe Berichterstattung, Rückfragen und Vertrauensindikatoren. Die Zahl versandter Mitteilungen misst Aktivität, die Veränderung der Wahrnehmung verlangt einen weiteren Nachweis.'],
      ['identitaet', 'Corporate Identity und Unternehmensimage', '[[corporate-identity|Corporate Identity]] verbindet das angestrebte Selbstbild des Unternehmens mit seinem Auftreten. Corporate Design umfasst das sichtbare Erscheinungsbild, Corporate Communication die abgestimmte Kommunikation, Corporate Behavior das Verhalten im Alltag und Corporate Culture die gelebten gemeinsamen Werte. Das Unternehmensimage beschreibt dagegen die tatsächliche Wahrnehmung durch andere. Ein freundliches Erscheinungsbild kann unzuverlässigen Service nicht ausgleichen.'],
    ],
    terms: [
      ['corporate-identity', 'Corporate Identity', 'Strategisch abgestimmte Identität einer Organisation, die sich in Gestaltung, Kommunikation, Verhalten und Kultur ausdrückt.'],
      ['public-relations', 'Public Relations (PR)', 'Geplante Pflege der Kommunikation und Beziehungen einer Organisation zu internen und externen Öffentlichkeiten.'],
      ['csr', 'Corporate Social Responsibility (CSR)', 'Verantwortung eines Unternehmens für gesellschaftliche und ökologische Auswirkungen seiner Tätigkeit.'],
    ],
    question: 'Eine Maschine wurde wegen eines Defekts zurückgerufen. Was sollte PR in der ersten Phase tun, und welchen Beitrag leistet interne Kommunikation?',
    answer: 'PR informiert zügig und überprüfbar über betroffene Geräte, Maßnahmen und Kontaktwege und hält weitere Informationen bereit. Mitarbeitende und Servicepartner erhalten denselben Sachstand, Abläufe und Zuständigkeiten, damit Betroffene konsistente Auskünfte und Hilfe erhalten.',
  },
  {
    id: 'sponsoring', parent: 'kommunikation', number: '2.5.4', title: 'Sponsoring auswählen und bewerten',
    intro: 'Sponsoring ist eine vereinbarte Förderung mit kommunikativer Gegenleistung. Der Sponsor kann Geld, Sachmittel, Dienstleistungen oder Know-how beisteuern.',
    parts: [
      ['gegenleistung', 'Leistung und Gegenleistung zuordnen', 'Beim [[sponsoring-vertrag|Sponsoring]] unterstützt ein Unternehmen Personen, Einrichtungen oder Veranstaltungen und erhält etwa Sichtbarkeit, Nutzungsrechte oder Zugang zu einer Zielgruppe. Die [[sponsoring-passung|Passung]] von Engagement, Zielgruppe und Unternehmensprofil bestimmt, ob der beabsichtigte Imagetransfer glaubwürdig sein kann. Eine Spende wird grundsätzlich ohne vergleichbar vereinbarte werbliche Gegenleistung gewährt.'],
      ['formen', 'Sponsoringformen am Kommunikationsziel ausrichten', 'Sportsponsoring kann Bekanntheit schaffen, Kultursponsoring eine passende lokale oder fachliche Öffentlichkeit erreichen. Soziosponsoring unterstützt soziale, wissenschaftliche oder bildungsbezogene Aktivitäten. Ökosponsoring setzt bei Umweltprojekten an. Medien- oder Programmsponsoring verknüpft einen Sponsor mit einem Format oder einer Sendung. Ziele können Sichtbarkeit, Vertrauen, Kontaktpflege und Mitarbeitermotivation sein.', 'Ein Fahrradfachhandel unterstützt ein Rollentraining und darf beim Termin sein Wartungsangebot demonstrieren. Ein Unternehmen für Arbeitsschutz fördert ein berufliches Nachwuchsprojekt und führt eine vereinbarte Schulung durch. Vergleiche Kontaktzahl und -qualität, Leistungsbezug, Gesamtkosten und Reputationsrisiko. Berücksichtige auch die Aktivierung, etwa eigenen Content oder Vor-Ort-Betreuung.'],
      ['erfolg', 'Erfolg am Ziel prüfen', 'Lege vorab fest, welche Präsenz, Inhalte und Auswertung vereinbart sind. Miss Kontakt und Erinnerung, wenn Bekanntheit das Ziel ist. Prüfe Verständnis und Vertrauen bei einem angestrebten Imagebeitrag. Umfangreiche Medienreichweite ist kein Beleg für positive Assoziationen oder zusätzliche Verkäufe.'],
    ],
    terms: [
      ['sponsoring-vertrag', 'Sponsoring', 'Förderung von Personen, Organisationen oder Veranstaltungen durch einen Sponsor gegen eine vereinbarte kommunikative Gegenleistung.'],
      ['sponsoring-passung', 'Sponsoring-Passung', 'Wahrgenommene Übereinstimmung zwischen Sponsor, gefördertem Gegenstand und Zielgruppe, welche die Wirkung des Engagements beeinflussen kann.'],
    ],
    question: 'Ein regionaler Anbieter möchte Vertrauen bei Fachkräften aufbauen. Zur Wahl stehen ein reichweitenstarkes Musikfestival und eine kleinere Berufsmeisterschaft. Wie entscheidest du?',
    answer: 'Prüfe Zielgruppenanteil, glaubwürdigen Bezug und Gestaltung der Gegenleistung. Eine Berufsmeisterschaft kann trotz geringerer Reichweite besser passen, wenn Fachkräfte dort erreichbar sind und das Unternehmen einen fachlich relevanten Beitrag leisten kann. Vereinbare anschließend geeignete Messgrößen.',
  },
  {
    id: 'online', parent: 'kommunikation', number: '2.5.5', title: 'Online-Marketing und digitale Kundenansprache',
    intro: 'Online-Marketing nutzt digitale Kontaktpunkte zur Information, Interaktion, Leadgenerierung oder Transaktion. Je nach Maßnahme entsteht das Geschäft direkt online oder erst nach Beratung.',
    parts: [
      ['landkarte', 'Instrumente nach Aufgabe ordnen', 'Die Internetpräsenz kann Kontakte informieren, eine Anfrage ermöglichen oder unmittelbar Verkäufe abwickeln. Displaywerbung, E-Mail, Online-PR, Affiliate, Suchmarketing, Content, Social Media und Mobile Marketing bringen unterschiedliche Zugänge. Abgrenzungen variieren, weil manche Ansätze auch vollständig innerhalb einer Plattform funktionieren oder mit analogen Kanälen verbunden sind.', 'Ein Maschinenbauer gewinnt über Fachbeiträge und Suchergebnisse Anfragen. Beratung, Angebot und Abschluss folgen persönlich. Ein Händler kann dagegen Produktseite und Bezahlvorgang auf einen direkten Online-Abschluss ausrichten. Für den ersten Fall sind qualifizierte Anfragen ein geeigneter Zwischenindikator, für den zweiten etwa Bestellungen und Kosten pro Bestellung.'],
      ['mobil-social', 'Mobile, Social und Content einsetzen', 'Mobiles Marketing berücksichtigt kleine Displays, schnelle Zugänge, kurze Eingaben und passende Funktionen wie Apps, Messenger, mobile Coupons, QR-Codes oder In-Game-Kommunikation. [[mobile-payment|Mobile Payment]] kann den Abschluss erleichtern, etwa per kontaktloser NFC-Zahlung am Terminal. Ein QR-Code kann alternativ eine mobile Informations- oder Zahlungsseite öffnen. Prüfe jeweils, ob die Funktion im gewählten Kaufprozess einen konkreten Schritt erleichtert. Social Media nutzt etwa Netzwerke, Blogs, Foren und Videoplattformen für Dialog, Service, Markenaufbau und die Verbreitung von Inhalten. Als [[content-marketing|Content-Marketing]] liefern Beiträge, Leitfäden oder Videos einen eigenständigen Nutzen, der Kompetenz zeigt und relevante Suchfragen bedient.', 'Ein Lebensmittelanbieter kann Nutzer in die Entwicklung neuer Sorten einbeziehen und Rückmeldungen sichtbar aufnehmen. Soziale Empfehlungen können freiwillig weitergetragen werden. Influencer-Kooperationen setzen dagegen auf beauftragte Reichweite und Vertrauen einer konkreten Community. Plane Transparenz, Kennzeichnung und Datenverarbeitung von Anfang an. Die [[>recht-uwg|wettbewerbsrechtlichen Grundlagen]] helfen bei der Einordnung von Werbung und Direktansprache.'],
      ['vertiefung', 'Suchen, Partner und Medien verbinden', 'Die [[>online-suche|Suchmaschinenoptimierung und Suchmaschinenwerbung]] bedienen gezielte Informations- oder Kaufabsichten. [[>online-partner|Affiliate und Crossmedia]] nutzen Partnerkontakte oder koordinieren mehrere Medien mit einem klaren nächsten Schritt.'],
    ],
    terms: [
      ['content-marketing', 'Content-Marketing', 'Planung und Verbreitung hilfreicher Inhalte, die bei einer relevanten Zielgruppe Aufmerksamkeit, Vertrauen oder Nachfrage aufbauen.'],
      ['mobile-payment', 'Mobile Payment', 'Zahlung mit einem mobilen Gerät, etwa kontaktlos per Near Field Communication (NFC) am Terminal oder über eine mobile Anwendung.'],
    ],
    question: 'Eine B2B-Dienstleistung ist erklärungsbedürftig, Selbsteinkauf im Web ist unmöglich. Welchen Erfolg sollte ein hilfreicher Leitfaden zuerst erzielen?',
    answer: 'Der Leitfaden soll qualifiziertes Interesse auslösen und fachlich passende Kontakte zur Beratung führen. Messe neben Reichweite etwa qualifizierte Anfragen, Rücklauf und später Abschlüsse. Beurteile den Beitrag im Zusammenhang mit Beratung und Angebot.',
  },
  {
    id: 'online-suche', parent: 'online', number: '2.5.5.1', title: 'Suchmaschinenmarketing, SEO und SEA',
    intro: 'Suchmaschinenmarketing bündelt Maßnahmen, mit denen relevante Angebote bei Suchanfragen auffindbar werden.',
    parts: [
      ['instrumente', 'Organische Auffindbarkeit und bezahlte Anzeigen', '[[sem|Search Engine Marketing (SEM)]] umfasst in der hier verwendeten Einteilung [[seo|SEO]] und [[sea|SEA]]. SEO verbessert Inhalte, technische Zugänglichkeit und Struktur für organische Ergebnisse. Nutze Wörter, die Suchabsicht und Angebot zusammenbringen, und beantworte die Suchfrage auf der Zielseite. SEA schaltet Anzeigen in Suchumfeldern. Meist steuern Suchbegriffe, Gebote, Budget und Anzeigenqualität die Auslieferung. Anzeigen können kurze Tests und planbare Reichweite unterstützen, laufende Kosten bleiben zu berücksichtigen.', 'Bei einem IT-Dienstleister kann SEO einen verständlichen Ratgeber für die Suche nach Wiederherstellungskonzepten begleiten. SEA kann vorübergehend konkrete Anfragen zur Buchung eines Sicherheitsaudits bedienen. Bei einer Werkstatt gilt dieselbe Logik, aber Standort, Öffnungszeiten und lokale Suchbegriffe sind bedeutsamer. Relevante Unternehmensprofile, Karten-, Bild- oder Videoangebote können zusätzliche Einstiege eröffnen.'],
      ['kennzahlen', 'Vom Klick zur Handlung', 'Eine Kampagne erhält 800 Anzeigenklicks zu Gesamtkosten von 640 €. Der durchschnittliche Klickpreis beträgt 640 ÷ 800 = 0,80 €. 32 qualifizierte Anfragen entsprechen 32 ÷ 800 × 100 = 4 % Conversion-Rate und 640 ÷ 32 = 20 € je Anfrage. Definiere vorher, was als Anfrage gilt. Vergleiche später Abschlussquote und Deckungsbeitrag.', 'Eine hohe Klickzahl kann bei einem zu breiten Suchwort mit wenigen brauchbaren Anfragen einhergehen. Prüfe Qualität der Suchbegriffe, Anzeigenversprechen, Zielseite, mobile Nutzbarkeit und Auswertung. Reichweite umfasst nur den Anfang des Prozesses.'],
    ],
    terms: [
      ['sem', 'Suchmaschinenmarketing (SEM)', 'Oberbegriff für organische Suchmaschinenoptimierung und bezahlte Suchmaschinenwerbung in der hier verwendeten Einteilung.'],
      ['seo', 'Suchmaschinenoptimierung (SEO)', 'Verbesserung relevanter Inhalte, Struktur und technischer Zugänglichkeit zur organischen Auffindbarkeit in Suchmaschinen.'],
      ['sea', 'Suchmaschinenwerbung (SEA)', 'Bezahlte Werbung in Suchumfeldern, die beispielsweise anhand von Suchbegriffen, Geboten und Relevanz ausgespielt wird.'],
    ],
    question: 'Eine Suchkampagne erzeugt 1.200 Klicks für 900 € und 30 qualifizierte Anfragen. Was lässt sich berechnen, und was braucht eine Rentabilitätsaussage?',
    answer: 'Klickpreis 900 ÷ 1.200 = 0,75 €. Anfragequote 30 ÷ 1.200 × 100 = 2,5 %. Kosten je Anfrage 900 ÷ 30 = 30 €. Für Rentabilität zählen zusätzlich Abschlussanteil, Deckungsbeitrag und Gesamtkosten. Dieselbe Anfrage darf nicht mehrfach zugerechnet werden.',
  },
  {
    id: 'online-partner', parent: 'online', number: '2.5.5.2', title: 'Affiliate-Marketing und Crossmedia',
    intro: 'Affiliate-Marketing nutzt Leistungen qualifizierter Partner. Crossmedia verbindet verschiedene Medien anhand eines gemeinsamen Ziels und einer konsistenten Botschaft.',
    parts: [
      ['affiliate', 'Partnerleistung und Vergütung festlegen', 'Im [[affiliate|Affiliate-Marketing]] platziert ein Vertriebspartner Links oder Werbemittel und erhält für eine vereinbarte Leistung wie Klick, Lead oder Verkauf eine Vergütung. Der werbende Anbieter wird Merchant genannt. Ein Netzwerk kann Partner, Material, Zuordnung und Abrechnung zusammenführen. Eine belastbare Vergütung braucht klar definierte Transaktionen, Stornoregeln, Qualitätskriterien und eine zulässige Zuordnung. Wiederholte Kontakte können den Beitrag des einzelnen Partners schwer messbar machen.', 'Ein Softwareanbieter vergütet 8 % auf bestätigten Nettoerlös. Ein vermittelter Auftrag über 600 € führt zunächst zu 600 € × 0,08 = 48 € Provision. Wenn der Auftrag wirksam storniert und laut Programmregeln ausgebucht wird, kann der Anspruch entfallen. Prüfe Regeln und wirtschaftlichen Mehrwert neben der gemeldeten Zahl vermittelter Käufe.'],
      ['crossmedia', 'Eine Leitidee auf mehrere Medien übertragen', '[[crossmedia|Crossmedia]] verbindet z. B. Plakat, Radio, Website, Suche, App und mobile Formate inhaltlich, gestalterisch und zeitlich. Ein einheitliches Erkennungsmerkmal stützt Wiedererkennung. Das nächste Medium bietet einen Mehrwert oder einen konkreten nächsten Schritt. Ein Veranstalter setzt ein Plakat ein, verweist mit Kurzadresse auf seine Zielseite und nutzt Suchanzeigen für die konkrete Ticketsuche. Eine Maschinenmesse kann mit Fachpresse, einer Demo-Anmeldung und einer anschließenden Beratung ähnlich arbeiten.', 'Einheitliche Botschaften dürfen medienspezifisch aufbereitet sein. Vergleiche Übergänge und Endergebnis der Kampagne. Ein bloß wiederholter Claim ohne Weg zur nächsten Handlung hilft wenig. Die analytische Kanalzuordnung bleibt unsicher, besonders wenn das erste Medium keine direkte Klickspur erzeugt.'],
    ],
    terms: [
      ['affiliate', 'Affiliate-Marketing', 'Vertriebspartnerschaft, bei der ein Partner für zugeordnete und vereinbarte Leistungen wie Klicks, Anfragen oder Verkäufe vergütet wird.'],
      ['crossmedia', 'Crossmedia', 'Koordinierte Verbindung mehrerer Kommunikationsmedien durch gemeinsame Gestaltung, Botschaft, Zeitplanung und Übergänge.'],
    ],
    question: 'Ein Radiohinweis erzeugt Produktsuchen. Das Tracking schreibt alle Käufe den Suchanzeigen zu. Welche Entscheidung wäre voreilig?',
    answer: 'Es wäre voreilig, den Radiohinweis wegen fehlender direkter Zuordnung zu streichen. Er kann die Suchnachfrage mit ausgelöst haben. Vergleiche geeignete Regionen oder Zeiträume und prüfe Suchvolumen, Übergänge und tatsächliche Abschlusskosten.',
  },
  {
    id: 'mix-anwendung', parent: 'mix', number: '2.6', title: 'Marketingmix auf ein Ziel abstimmen',
    intro: 'Der Marketingmix kombiniert geeignete Instrumente der Produkt-, Preis-, Distributions- und Kommunikationspolitik. Die Abstimmung richtet sich nach Zielgruppe, Positionierung, Ressourcen und Marketingziel.',
    parts: [
      ['ableiten', 'Vom Ziel zum abgestimmten Maßnahmenbündel', 'Grenze erst Zielmarkt und Ziel ab. Lege dann das Leistungsangebot (Product), Preis und Konditionen (Price), die Verfügbarkeit (Place) und die Kommunikation (Promotion) fest. Bei Dienstleistungen lasse Personaleinsatz, Ausstattung und Prozesse mit einfließen. Prüfe, welches Instrument unter den gegebenen Bedingungen der wichtigste Engpass ist. Es gibt keinen für alle Situationen passenden Normmix.', 'Produktpolitik gestaltet den Nutzen und das Sortiment. Preispolitik gestaltet den finanziellen Austausch und Positionierung. Distribution macht das Angebot dort verfügbar, wo die Zielgruppe kauft. Kommunikation vermittelt es, begründet den Nutzen und soll zur Handlung anregen. Aktionen sollten Vertrieb und Leistungserstellung auf die erwartete Nachfrage vorbereiten.'],
      ['anwendung', 'Widersprüche vor dem Start erkennen', 'Ein regionaler Werkzeughersteller startet ein besonders langlebiges Premiumprodukt. Produktseitig bietet er Ersatzteile und technische Beratung. Der Preis enthält dafür eine tragfähige Marge. Geschulte Händler erklären den Unterschied und haben das Produkt verfügbar. In der Werbung wird die beschriebene Nutzung nachvollziehbar gezeigt. Ein starker Dauerrabatt oder fehlende Ersatzteile würden das Versprechen unterlaufen.', 'Bei einer preisorientierten Reparaturannahme kann sich der Engpass verlagern. Einfacher Service, transparente Paketpreise, dezentrale Annahmestellen und klare Hinweise können besser zusammenpassen als aufwendige Beratung. Vergleiche Verfügbarkeit, Nachfrage, Deckungsbeitrag und Kundenrückmeldung. Passe Maßnahmen bei einer konkreten Abweichung gemeinsam an.'],
      ['weiter', 'Schwerpunkte nach Leistungstyp', 'Vergleiche den [[>mix-b2c-b2b|Marketingmix für Konsum- und Investitionsgüter]] und den [[>mix-dienstleistung-handel|Marketingmix für Dienstleistungen und Handel]]. Im [[>fall-mix|Übungsfall]] kannst du vier Maßnahmenbereiche verbinden.'],
    ],
    terms: [],
    question: 'Ein Anbieter verspricht in der Werbung sofortige Verfügbarkeit, verkauft aber über einen Partner ohne Lagerbestand. Welchen Teil des Mix musst du bearbeiten?',
    answer: 'Das Problem liegt zunächst bei Distribution und Lieferfähigkeit. Stimme Bestand, Lieferzeiten und Zuständigkeiten mit dem Partner ab oder passe das Versprechen an. Mehr Reichweite würde den Widerspruch allein vergrößern. Prüfe anschließend, ob die Positionierung und die Kosten der geänderten Lieferung tragfähig bleiben.',
  },
  {
    id: 'mix-b2c-b2b', parent: 'mix-anwendung', number: '2.6.1', title: 'Marketingmix für Konsum- und Investitionsgüter',
    intro: 'Bedarfsart, Kaufbeteiligte und Erklärungsaufwand bestimmen, wie Marketinginstrumente priorisiert werden.',
    parts: [
      ['b2c', 'Konsumgüter und privater Bedarf', 'Bei [[b2c|B2C]] entsteht der Bedarf typischerweise unmittelbar bei Verbrauchern. Viele Einzelentscheidungen, häufige Käufe und vergleichbare Produkte können Markenpflege, Zusatznutzen, Verfügbarkeit und preisliche Feinsteuerung wichtig machen. Angebote wie Beratung, Design oder Verpackung machen Unterschiede sichtbar. Dichte Handelsnetze, abgestimmte Händler- und Verbraucherkommunikation sowie eine passende digitale Präsenz stützen Reichweite und Kauf.', 'Bei einer neuen Müslisorte geht es etwa um eine klar erkennbare Rezeptur, einen wettbewerbsfähigen Preis mit Marge, zuverlässigen Nachschub und eine Probieraktion am Verkaufsort. Auf gesättigten Märkten prüft der Anbieter, ob Zusatznutzen einen echten Unterschied schafft, bevor er sein Sortiment erweitert.'],
      ['b2b', 'Investitionsgüter und abgeleiteter Bedarf', 'Bei [[b2b|B2B]] leitet sich die Nachfrage nach Produktionsmitteln häufig aus dem Absatz der damit hergestellten Leistungen ab. Beim Kauf einer Anlage wirken oft Technik, Beschaffung, Geschäftsführung und Anwender als [[buying-center|Buying Center]] mit. Performance, Individualisierung, Lebenszyklus, Service und Integration stehen dann stärker im Vordergrund.', 'Eine Sonderverpackungsanlage wird typischerweise durch persönliche Beratung, Demonstration, ein individuell kalkuliertes Angebot und Servicevereinbarungen verkauft. Fachpresse, Messen, Empfehlungen und Direktansprache können die Akquise stützen. Bei standardisierten Investitionsgütern kann dagegen ein spezialisierter Händler die Fläche kostengünstiger abdecken. Leite den Weg aus Bedarf und Beratungsaufwand ab.'],
      ['grenzen', 'Auf das konkrete Kaufverhalten achten', 'Bei komplexen B2C-Käufen kann Beratung ebenso wichtig sein wie bei B2B. Firmen kaufen umgekehrt viele Hilfsmittel routinemäßig im Standardkatalog. Die Begriffe B2C und B2B bestimmen den Käufer. Sie sind keine Vorschrift für eine bestimmte Kombination der vier Instrumente.'],
    ],
    terms: [
      ['b2c', 'Business-to-Consumer (B2C)', 'Geschäftsbeziehungen zwischen Unternehmen und privaten Endverbrauchern.'],
      ['b2b', 'Business-to-Business (B2B)', 'Geschäftsbeziehungen zwischen Unternehmen.'],
      ['buying-center', 'Buying Center', 'Gruppe der Personen und Rollen, die an einer betrieblichen Kaufentscheidung beteiligt sind oder sie beeinflussen.'],
    ],
    question: 'Dasselbe Akkugerät wird Privatkunden als Set und Industriekunden als Teil eines Wartungssystems angeboten. Wie verändert sich der Mix?',
    answer: 'Für Privathaushalte bieten sich verständliches Set, transparenter Preis, Verfügbarkeit im Fachmarkt und Nutzungskommunikation an. Beim Wartungssystem stehen technische Integration, abgestimmter Service und Kosten über die Nutzungsdauer im Vordergrund. Direktberatung oder spezialisierte Partner erreichen die betrieblichen Entscheider.',
  },
  {
    id: 'mix-dienstleistung-handel', parent: 'mix-anwendung', number: '2.6.2', title: 'Marketingmix für Dienstleistungen und Handel',
    intro: 'Dienstleistungen und Handelsangebote setzen unterschiedliche Schwerpunkte. Bei Dienstleistungen muss der Betrieb Leistung und Ablauf sichtbar machen. Im Handel entscheidet die Kombination aus Sortiment, Standort, Preis und Einkaufsumgebung.',
    parts: [
      ['dienstleistung', 'Vertrauen, Kapazität und Qualität sichern', 'Dienstleistungen sind oft immateriell, individuell und personalintensiv. Viele Leistungen entstehen erst mit Unterstützung der Kundschaft als [[externer-faktor|externem Faktor]]. Unbelegte Kapazität eines Friseursalons oder Seats eines Kurses lässt sich nach Ablauf des Termins nicht nachholen. Digitale oder standardisierte Leistungsbestandteile können sich davon unterscheiden.', 'Neben den vier Grundinstrumenten helfen People (Kompetenz und Verhalten der Mitarbeitenden), Physical Evidence oder Physical Factors (sichtbare Leistungshinweise und Ausstattung) und Process (Ablauf). Ein Weiterbildungsanbieter zeigt Qualifikation und Raumkonzept, bietet klare Buchung, Rückmeldung und Kursbeginn und macht die Leistung mit Probemodulen nachvollziehbar. Einheitliche Kurse können zu Paketpreisen angeboten, individuelle Beratungen nach Umfang kalkuliert werden. Preise und Zeitfenster können Nachfragespitzen verteilen.', 'Ein Fitnessstudio kann seine Leistung direkt vor Ort erbringen und Online-Buchungen nutzen. Ein Reisebüro kann ein erst später erbrachtes Leistungsversprechen eines anderen Dienstleisters vermitteln. Prüfe deshalb, wann und durch wen der Kontakt und die tatsächliche Leistung erbracht werden. In der Kommunikation können Referenzen, eine Demonstration und nachvollziehbare Qualitätsindikatoren Vertrauen aufbauen.'],
      ['handel', 'Sortiment, Standort und Verkaufsumgebung gestalten', 'Im Handelsmarketing stimmen Betriebe Breite und Tiefe des Sortiments, Markenmix, Service, Preisposition, Standort, Ladengestaltung und Warenpräsentation ab. Der Standort ist meist langfristig gebunden. Ein Fachgeschäft kann Spezialsortiment, Beratung, mittleres bis hohes Preisniveau und gezielte Veranstaltungen verbinden. Ein Discounter setzt auf begrenzte Auswahl, niedrige Gesamtkosten und verständliche Preisangebote.', 'Für Preis und Konditionen sind Sortiment, Wettbewerb, Spanne und Kundenbindung zu berücksichtigen. Kundenkarten können zusammen mit passenden Services einen Mehrwert bieten. Bei Werbung und Verkaufsförderung helfen regionale Medien, verkaufsnahe Aktionen oder eine abgestimmte Online-Präsenz. Prüfe Frequenz, Konversionsrate, Warenkorb, Marge und Kundenerfahrung, bevor du aus einer einzelnen Kennzahl auf Erfolg schließt.'],
    ],
    terms: [['externer-faktor', 'Externer Faktor bei Dienstleistungen', 'Beitrag der Kundschaft oder eines von ihr eingebrachten Objekts zur Leistungserstellung, etwa die aktive Teilnahme an einem Kurs.']],
    question: 'Ein Schulungsanbieter verliert viele Kunden zwischen Anmeldung und Kursteilnahme. Welche zusätzlichen drei Instrumente einer Dienstleistung kannst du einsetzen?',
    answer: 'People: Eine gut erreichbare Ansprechperson klärt Fragen. Physical Evidence: Ein nachvollziehbares Kursprogramm und erkennbare Qualifikation reduzieren Unsicherheit. Process: Buchungsbestätigung, Erinnerung und ein klarer Zugang erleichtern die tatsächliche Teilnahme. Miss die Quote der tatsächlich Teilnehmenden und die Gründe für Absagen.',
  },
  {
    id: 'fall-mix', parent: 'mix-anwendung', number: '2.6.3', title: 'Übungsfall zum Marketingmix',
    intro: 'Ein regionaler Haferdrink-Hersteller beobachtet sinkende Verkäufe seiner bisherigen Sorte. Er will eine sparsam gesüßte Barista-Linie in seiner Kernregion einführen und danach über weitere Regionen entscheiden.',
    parts: [
      ['situation', 'Ausgangslage und Ziel', 'Zielgruppe sind Haushalte mit Espressomaschine und ausgewählte Cafés. Der Betrieb kann zunächst 18.000 Packungen je Quartal liefern. Sein Nettoerlös je Packung nach regulären Händlerkonditionen beträgt 1,60 €, die variablen Kosten 1,10 €. Im Pilot sollen mindestens 9.000 Packungen mit positivem zusätzlichem Gesamtdeckungsbeitrag nach direkt zurechenbaren Aktionskosten verkauft werden. Die geplante Aktion kostet 3.600 €. Für die erste Rechnung bleiben Kannibalisierung und zusätzliche Rabatte außen vor.'],
      ['aufgabe', 'Arbeitsauftrag', 'Formuliere für jeden der vier Instrumentalbereiche ein situatives Ziel. Entwickle anschließend in jedem Bereich drei Maßnahmen, die sich gegenseitig stützen. Rechne nach, ab welcher Absatzmenge der Deckungsbeitrag die Aktionskosten deckt. Nenne zwei Voraussetzungen für eine Ausweitung.'],
      ['loesungsweg', 'So begründest du die Auswahl', 'Beginne mit dem Kundennutzen und ordne Maßnahmen einem Instrument nach ihrer Hauptwirkung zu. Ein Probierstand gehört beispielsweise zur Verbraucherpromotion, ein Training für die Verkaufsstellen zum vertriebsbezogenen Handelssupport und ein reduzierter Einkaufspreis zur Konditionengestaltung. Bei Überschneidungen zählt eine stimmige Begründung.'],
    ],
    terms: [],
    question: 'Welche Kombination ermöglicht den Pilot, und was ergibt die Rechnung bei genau 9.000 Packungen?',
    answer: 'Produktziel ist ein klar erkennbarer Nutzen für Espressozubereitung. Maßnahmen sind Rezepturtests, eine passende Packungsgröße und eine klare Kennzeichnung der Linie.\n\nPreisziel ist eine tragfähige Marge. Maßnahmen sind ein passender Nettoabgabepreis, befristete Einführungskonditionen mit Mindestmarge und klare Zahlungs- und Lieferkonditionen.\n\nDistributionsziel ist verlässliche Präsenz. Maßnahmen sind Pilotlistungen in Fachhandel und Cafés, verbindliche Bestands- und Lieferplanung und ein definiertes Vertriebsgebiet mit Betreuung.\n\nKommunikationsziel sind Bekanntheit und Probierkäufe. Maßnahmen sind regionale Produktwerbung, ein Probierangebot am Verkaufsort und eine Händlerschulung.\n\nDer Stückdeckungsbeitrag beträgt 1,60 € − 1,10 € = 0,50 €. Die Schwelle beträgt 3.600 € ÷ 0,50 €/Packung = 7.200 Packungen. Bei 9.000 Packungen verbleiben 9.000 × 0,50 € − 3.600 € = 900 €, vor verdrängten Altverkäufen oder zusätzlichen Rabatten.\n\nEine Ausweitung lässt sich etwa bei tragfähigem zusätzlichem Deckungsbeitrag und zuverlässiger Lieferfähigkeit begründen.',
  },
];

const subjectId = 'marketing';
const articleId = (id: string) => id.startsWith('logistik-') ? id : `marketing-${id}`;

function paragraph(value: string): RichText[] {
  return value.split(/(\[\[[^\]]+\]\])/).filter(Boolean).map(span => {
    const link = /^\[\[(>?)([^|]+)\|([^\]]+)\]\]$/.exec(span);
    if (!link) return { text: span };
    const [, article, id, text] = link;
    return article ? { text, articleId: articleId(id) } : { text, termId: articleId(id) };
  });
}

export const chapters: Chapter[] = lessons.map(lesson => ({
  id: articleId(lesson.id),
  subjectId,
  parentId: articleId(lesson.parent),
  number: lesson.number,
  title: lesson.title,
  articleId: articleId(lesson.id),
}));

export const articles: Article[] = lessons.map(lesson => {
  const sections: ArticleSection[] = lesson.parts.map(([id, title, ...paragraphs]) => ({
    id,
    title,
    paragraphs: paragraphs.map(paragraph),
  }));
  sections.push({
    id: 'transferfrage',
    title: 'Selbstkontrolle',
    paragraphs: [[{ text: lesson.question }]],
    hint: { title: 'Musterantwort', content: lesson.answer },
  });
  return {
    id: articleId(lesson.id),
    subjectId,
    chapterId: articleId(lesson.id),
    number: lesson.number,
    title: lesson.title,
    intro: lesson.intro,
    sections,
    updatedAt: Date.UTC(2026, 10, 18),
    version: 1,
  };
});

export const glossary: GlossaryTerm[] = lessons.flatMap(lesson => lesson.terms.map(([id, term, definition]) => ({
  id: articleId(id),
  subjectId,
  articleId: articleId(lesson.id),
  term,
  definition,
})));
