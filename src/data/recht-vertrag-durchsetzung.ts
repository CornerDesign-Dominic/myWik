import type { Article, ArticleSection, Chapter, GlossaryTerm, RichText } from '../types';

interface Lesson {
  id: string;
  parent?: string;
  number: string;
  title: string;
  intro: string;
  parts: [id: string, title: string, ...paragraphs: string[]][];
  terms: [id: string, term: string, definition: string][];
  question: string;
  answer: string;
  sources: string[];
}

const bgb = 'BGB – amtliche Fassung: https://www.gesetze-im-internet.de/bgb/';
const hgb = 'HGB – amtliche Fassung: https://www.gesetze-im-internet.de/hgb/';
const zpo = 'ZPO – amtliche Fassung: https://www.gesetze-im-internet.de/zpo/';
const productLaw = 'ProdHaftG – amtliche Fassung: https://www.gesetze-im-internet.de/prodhaftg/';
const jurisdictionLaw = 'Gesetz zur Änderung des Zuständigkeitsstreitwerts vom 8. Dezember 2025, BGBl. 2025 I Nr. 318: https://recht.bund.de/bgbl/1/2025/318/VO';

const lessons: Lesson[] = [
  {
    id: 'vertrag-durchsetzung', number: '2', title: 'Verträge, Fristen und Durchsetzung',
    intro: 'Beim Lösen eines Vertragsfalls prüfst du zuerst den Anspruch. Danach klärst du, ob er entstanden, noch vorhanden und durchsetzbar ist und welche Verfahrensregeln gelten.',
    parts: [
      ['schritte', 'Vom Sachverhalt zum Anspruch', 'Frage, wer von wem was woraus verlangt. Eine Klage auf Zahlung kann auf § 433 Abs. 2 BGB beruhen. Prüfe dann Angebot, Annahme und Wirksamkeit, gegebenenfalls Form und Anfechtung, anschließend Einreden wie die Verjährung. Erst danach ordnest du sachliches und örtliches Gericht ein.', 'Auch beim Schadensersatz beginnt die Prüfung mit der richtigen Anspruchsgrundlage. Ansprüche wegen eines Kaufmangels richten sich gegen den Verkäufer. Eine Verletzung durch ein fehlerhaftes Produkt kann zusätzlich andere Anspruchsgrundlagen und andere Anspruchsgegner betreffen.'],
      ['themen', 'Die passenden Lernwege', 'Vertiefe [[>vertrag-angebot-annahme|Angebot und Annahme]], [[>vertrag-form|Form]], [[>vertrag-anfechtung|Anfechtung]] und [[>verjaehrung-basis|Verjährung]]. Für die spätere Durchsetzung sind das [[>mahnverfahren|Mahnverfahren]] und der [[>gerichtsstand|Gerichtsstand]] zu unterscheiden. [[>produkthaftung|Produkthaftung]] und [[>produzentenhaftung|Produzentenhaftung]] vergleichen zwei Wege zum Schadensersatz. Als nächsten Schritt zeigt [[>trennung-abstraktion|Trennungsprinzip und Abstraktionsprinzip]], wie du Kaufvertrag, Übergabe und Eigentumsübertragung einordnest.'],
    ],
    terms: [],
    question: 'Eine Lieferantin fordert Zahlung, die Bestellung wurde ausdrücklich abgelehnt. Warum prüfst du nicht zuerst die Verjährung?',
    answer: 'Zuerst muss eine Anspruchsgrundlage mit erfüllten Voraussetzungen vorliegen. Wenn mangels wirksamer Annahme kein Kaufvertrag zustande kam, fehlt ein Kaufpreisanspruch. Die Verjährung ist eine mögliche Einrede gegen einen bestehenden Anspruch.',
    sources: [bgb, zpo],
  },
  {
    id: 'vertrag-angebot-annahme', parent: 'vertrag-durchsetzung', number: '2.1', title: 'Angebot, Annahme und Bindungsfrist',
    intro: 'Ein Vertrag entsteht grundsätzlich durch zwei aufeinander bezogene, übereinstimmende Willenserklärungen. Für einen Kauf müssen insbesondere Parteien, Leistung und Gegenleistung bestimmt oder bestimmbar sein.',
    parts: [
      ['schluss', 'Das Angebot aus Sicht des Empfängers auslegen', 'Ein [[vertrag-begriff-angebot|Angebot]] oder Antrag ist so bestimmt und verbindlich, dass der andere den Vertrag mit bloßer Zustimmung schließen kann. Nach § 145 BGB bindet es grundsätzlich, wenn die Bindung nicht ausgeschlossen ist. Die [[vertrag-begriff-annahme|Annahme]] muss dem Antrag entsprechen. Sie kann ausdrücklich oder durch eindeutiges Verhalten erfolgen. Bei empfangsbedürftigen Erklärungen unter Abwesenden kommt es grundsätzlich auf den Zugang nach § 130 BGB an.', 'Eine versandte Empfangsmitteilung kann nur den Eingang bestätigen. Lies, ob die Nachricht selbst eine Annahme erklärt. Auch eine Auslieferung mit erkennbarem Leistungswillen kann unter passenden Umständen Annahme sein. Nach § 151 BGB kann der Zugang einer Annahmeerklärung entbehrlich sein, wenn er nach Verkehrssitte nicht erwartet wird oder darauf verzichtet wurde. Eine Annahmeentscheidung muss trotzdem getroffen werden.'],
      ['frist', 'Annahmefrist in der richtigen Reihenfolge prüfen', 'Ein Antrag erlischt durch Ablehnung oder nicht rechtzeitige Annahme (§ 146 BGB). Eine gesetzte Frist geht nach § 148 BGB vor. Ohne gesetzte Frist kann ein Antrag unter Anwesenden, auch im unmittelbaren Telefonat, grundsätzlich nur sofort angenommen werden (§ 147 Abs. 1 BGB). Unter Abwesenden gilt der Zeitraum, in dem eine Antwort bei gewöhnlichem Ablauf erwartet werden darf. Übermittlungsdauer, zumutbare Prüfung und Antwortweg beeinflussen ihn. Es gibt dafür keine pauschale Wochenzahl.', 'Verspätete Annahme ist grundsätzlich ein neuer Antrag (§ 150 Abs. 1 BGB). Ist die Annahme so abgesandt worden, dass sie gewöhnlich rechtzeitig angekommen wäre, und musste der Antragende dies erkennen, ist § 149 BGB zu prüfen. Bei unterlassener unverzüglicher Anzeige der Verspätung gilt sie dann nicht als verspätet. Eine Annahme mit Änderungen gilt als Ablehnung verbunden mit neuem Antrag (§ 150 Abs. 2 BGB).'],
      ['beispiele', 'Ein Datum und einen Präsenzfall auswerten', 'Eine Anbieterin setzt „Annahme durch Zugang bis 17. Juli“ fest. Geht die Zustimmung erst am 18. Juli zu, ist sie unter normalen Umständen ein neuer Antrag. Das Datum des Aussendens genügt nur, wenn das Angebot oder eine Sonderregel das trägt.', 'Ein Einkäufer erhält im Gespräch ein verbindliches Angebot über 30 Ersatzteile. Er entscheidet sich erst am nächsten Tag, ohne dass die Anbieterin eine Frist eingeräumt hat. Seine Bestellung ist ein neuer Antrag. Wenn der Anbieter ablehnt, entsteht keine Lieferungspflicht.'],
      ['weiter', 'Abgrenzung zu Angebotsaufforderung und Schweigen', 'Lies [[>vertrag-freizeichnung|Freizeichnung und invitatio ad offerendum]] sowie [[>vertrag-bestaetigungsschreiben|kaufmännisches Bestätigungsschreiben]].'],
    ],
    terms: [
      ['vertrag-begriff-angebot', 'Angebot (Antrag)', 'Empfangsbedürftige, hinreichend bestimmte und grundsätzlich bindende Willenserklärung zur Herbeiführung eines Vertrags.'],
      ['vertrag-begriff-annahme', 'Annahme', 'Zustimmung zum angebotenen Vertragsinhalt. Das Erklärungsverhalten und ein gegebenenfalls erforderlicher rechtzeitiger Zugang sind gesondert zu prüfen.'],
    ],
    question: 'Eine Lieferantin bietet 50 Kartons für 200 € an. Der Käufer antwortet fristgerecht: „Einverstanden, aber nur für 180 €“. Ist ein Vertrag geschlossen?',
    answer: 'Die abändernde Antwort ist nach § 150 Abs. 2 BGB Ablehnung und neuer Antrag über 180 €. Erst eine wirksame Annahme dieses neuen Antrags führt zu einem Vertrag. Die Antwort war zwar rechtzeitig, entsprach aber nicht dem Inhalt des Antrags.',
    sources: [bgb, '§§ 130, 145–151 BGB'],
  },
  {
    id: 'vertrag-freizeichnung', parent: 'vertrag-angebot-annahme', number: '2.1.1', title: 'Freizeichnung und Aufforderung zur Angebotsabgabe',
    intro: 'Eine Anzeige oder Preisauszeichnung kann zum Kauf einladen, ohne den Anbieter schon zu binden. Maßgeblich ist die objektive Auslegung der gesamten Erklärung.',
    parts: [
      ['einladung', 'Wann der Rechtsbindungswille fehlt', 'Die [[vertrag-begriff-invitatio|invitatio ad offerendum]] fordert andere auf, selbst ein Angebot zu machen. Eine Schaufensterauslage, ein Katalog und typischerweise eine Produktanzeige im Webshop dienen zunächst der Information. Der Shop kann die Bestellung danach ausdrücklich oder durch eindeutiges Verhalten annehmen. Plattformbedingungen und konkreter Ablauf können die Zuordnung verändern.', 'Eine Liste mit 100 verfügbaren Einheiten kann öffentlich mehr Interessenten erreichen, als beliefert werden können. Eine Gestaltung als Einladung ermöglicht Bestands- und gegebenenfalls Kundenprüfung, bevor ein Vertrag geschlossen wird. Angaben zu Preisen und Verfügbarkeit können daneben anderen rechtlichen Anforderungen unterliegen.'],
      ['vorbehalt', 'Wie weit die Bindung eingeschränkt ist', 'Eine [[vertrag-begriff-freizeichnung|Freizeichnungsklausel]] kann die Bindung ausschließen oder begrenzen. „Freibleibend“ spricht regelmäßig gegen eine sofortige Bindung. „Solange der Vorrat reicht“ betrifft in erster Linie die Verfügbarkeit. Prüfe, ob überhaupt ein Antrag vorliegt und welchen Vorbehalt der Empfänger erkennen durfte. Ein Vorratsvorbehalt führt weder zu einer Mindestbestellmenge noch automatisch zu einer bestimmten Höchstmenge je Kunde.', 'Ein Lieferant sendet eine als freibleibend bezeichnete Preisinformation über zehn Drucker. Der Kunde bestellt. Ist die Preisinformation als Aufforderung zu verstehen, gilt die Bestellung als Antrag. Liefert der Anbieter erkennbar zur Erfüllung dieser Bestellung, spricht das im Sachverhalt für Annahme. Verfügbarkeit und Preisbindung werden getrennt geprüft.'],
    ],
    terms: [
      ['vertrag-begriff-invitatio', 'Invitatio ad offerendum', 'Aufforderung an eine andere Person, ein Angebot abzugeben. Die Aufforderung enthält grundsätzlich noch keinen bindenden Antrag.'],
      ['vertrag-begriff-freizeichnung', 'Freizeichnungsklausel bei einem Angebot', 'Formulierung, die die Bindung an eine Erklärung ausschließt oder begrenzt, etwa durch einen Vorbehalt zur Verfügbarkeit.'],
    ],
    question: 'Ein Prospekt zeigt einen Grill für 249 €. Der gezeigte Grill war schon verkauft. Kann der Kunde allein aus dem Prospekt die Lieferung für 249 € verlangen?',
    answer: 'Ein öffentlicher Prospekt ist regelmäßig nur eine Aufforderung zur Angebotsabgabe. Aus ihm allein ergibt sich mangels zustande gekommenen Vertrags kein Lieferanspruch. Entscheidend sind die konkreten Erklärungen und eine etwaige Annahme.',
    sources: [bgb, '§§ 133, 145, 157 BGB'],
  },
  {
    id: 'vertrag-bestaetigungsschreiben', parent: 'vertrag-angebot-annahme', number: '2.1.2', title: 'Schweigen und kaufmännisches Bestätigungsschreiben',
    intro: 'Schweigen ist grundsätzlich keine Zustimmung. Im kaufmännischen Verkehr kann das Schweigen auf ein echtes Bestätigungsschreiben besondere Bedeutung haben.',
    parts: [
      ['pruefung', 'Voraussetzungen geordnet prüfen', 'Das [[vertrag-begriff-kbs|kaufmännische Bestätigungsschreiben]] beruht auf Handelsbrauch und Rechtsprechung. Nach hinreichend konkreten Vertragsverhandlungen fasst eine im kaufmännischen Verkehr handelnde Partei zeitnah das nach ihrem Verständnis erzielte Ergebnis zusammen. Das Schreiben muss den Verhandlungsgegenstand wiedergeben, dem geeigneten Empfänger zugehen und als Bestätigung erkennbar sein. Prüfe, ob der Absender schutzwürdig ist und der Empfänger nicht unverzüglich widersprochen hat. Eine starre allgemeine Widerspruchsfrist gibt es nicht.', 'Ein Schreiben mit einer so erheblichen Abweichung vom besprochenen Ergebnis, dass der Absender mit Billigung nicht rechnen durfte, kann nicht über das Schweigen Vertragsinhalt werden. Das Recht kann auch geschäftlich vergleichbar teilnehmende Nichtkaufleute erfassen. Die bloße Bezeichnung des Dokuments entscheidet nicht.'],
      ['abgrenzung', 'Zusammenfassung einer Verhandlung oder erstmaliges Angebot?', 'Eine Auftragsbestätigung kann eine Annahmeerklärung sein. Ein echtes Bestätigungsschreiben knüpft an vorherige konkrete Verhandlungen an. Eine unverlangt übersandte Rechnung über ein nie besprochenes Geschäft ist kein solches Schreiben.', '§ 362 HGB regelt einen davon getrennten Sonderfall. Er betrifft unter bestimmten Voraussetzungen an einen Kaufmann gerichtete Anträge auf Geschäftsbesorgung, wenn sein Gewerbe solche Besorgungen umfasst und die weitere Beziehung nach der Vorschrift besteht. Die Norm ist keine allgemeine Grundlage für Schweigen bei Warenkäufen.'],
      ['beispiel', 'Eine Abweichung zeitnah feststellen', 'Zwei Großhändler verhandeln über 400 geeignete Paletten zu einem fest besprochenen Preis. Die am nächsten Tag zugegangene Bestätigung nennt den besprochenen Umfang. Der Empfänger schweigt. Prüfe die Wirkung anhand aller Voraussetzungen. Steht überraschend die zehnfache Menge im Schreiben, spricht die erhebliche Abweichung gegen die Bindungswirkung durch Schweigen.'],
    ],
    terms: [['vertrag-begriff-kbs', 'Kaufmännisches Bestätigungsschreiben', 'Zeitnahe Bestätigung eines nach vorangegangenen Verhandlungen als geschlossen angesehenen Geschäfts. Unter bestimmten Voraussetzungen kann fehlender unverzüglicher Widerspruch Bedeutung für den Vertragsinhalt haben.']],
    question: 'Nach einem unverbindlichen Erstkontakt kommt zehn Tage später ein Schreiben mit nie besprochenen Preisen. Der Empfänger antwortet nicht. Wie prüfst du?',
    answer: 'Prüfe zuerst hinreichend konkrete Verhandlungen und ob das Schreiben deren Ergebnis bestätigt. Beides fehlt nach dem Sachverhalt. Weder das Wort „Bestätigung“ noch Schweigen ersetzt allgemein die fehlende Einigung. Prüfe gegebenenfalls, ob das Schreiben selbst ein neuer Antrag war.',
    sources: [hgb, '§ 346 HGB als Bezug zum Handelsbrauch; § 362 HGB gesonderter gesetzlicher Fall', 'BGH, Urteil vom 27.01.2011, VII ZR 186/09, zum kaufmännischen Bestätigungsschreiben und Schweigen: https://juris.bundesgerichtshof.de/cgi-bin/rechtsprechung/document.py?Art=en&Blank=1.pdf&Datum=2011-1-27&Gericht=bgh&anz=27&nr=55804&pos=22'],
  },
  {
    id: 'vertrag-form', parent: 'vertrag-durchsetzung', number: '2.2', title: 'Formfreiheit, Formarten und Formmängel',
    intro: 'Rechtsgeschäfte sind grundsätzlich formfrei. Gesetz oder Vereinbarung können jedoch vorgeben, wie eine Erklärung abgegeben werden muss.',
    parts: [
      ['freiheit', 'Formvorschrift vor der Wirkung prüfen', 'Ein normaler Kauf beweglicher Sachen kann mündlich, schriftlich oder durch schlüssiges Verhalten zustande kommen. Bei einer Formfrage bestimme zuerst das Rechtsgeschäft und die gesetzliche oder vertragliche Form. Ein Verstoß gegen die gesetzliche Form macht das Geschäft grundsätzlich nichtig, § 125 Satz 1 BGB. Bei vereinbarter Form gilt Nichtigkeit im Zweifel, Satz 2. Prüfe Sonderregeln und etwaige Heilung.', 'Eine privat unterschriebene Grundstückskaufvereinbarung erfüllt § 311b Abs. 1 BGB grundsätzlich nicht. Der Vertrag wird nach der besonderen Vorschrift seinem ganzen Inhalt nach gültig, wenn Auflassung und Eintragung in das Grundbuch erfolgen. Ein mündlicher Kauf eines gebrauchten Fahrradständers verlangt diese Form dagegen nicht.'],
      ['formen', 'Vier Formarten und elektronische Form unterscheiden', 'Bei [[begriff-schriftform|Schriftform]] ist grundsätzlich die eigenhändige Namensunterschrift erforderlich. § 126a BGB regelt den elektronischen Ersatz mit qualifizierter elektronischer Signatur, soweit das Gesetz ihn nicht ausschließt. Eine gewöhnliche E-Mail genügt dafür nicht. [[begriff-textform|Textform]] erfordert eine lesbare Erklärung mit Person des Erklärenden auf einem dauerhaften Datenträger. Dazu kann je nach Gestaltung eine gewöhnliche E-Mail genügen.', 'Bei [[vertrag-begriff-beglaubigung|öffentlicher Beglaubigung]] wird insbesondere die Echtheit der Unterschrift bescheinigt. Die [[vertrag-begriff-beurkundung|notarielle Beurkundung]] erfasst dagegen auch die Erklärung selbst und ihre Aufnahme in der notariellen Niederschrift. Bei Handelsregisteranmeldungen und Grundstücksgeschäften ist genau zwischen den jeweils vorgeschriebenen Formen zu unterscheiden.'],
      ['vertiefung', 'Rechtsgeschäft und Sonderfolge zusammenlesen', 'Lies [[>vertrag-form-sonderfaelle|Form einzelner Rechtsgeschäfte]] und [[>vertrag-teilnichtigkeit|Teilnichtigkeit und salvatorische Klauseln]].'],
    ],
    terms: [
      ['vertrag-begriff-beglaubigung', 'Öffentliche Beglaubigung', 'Öffentlicher Nachweis der Echtheit einer Unterschrift oder eines Handzeichens in der vorgesehenen Form.'],
      ['vertrag-begriff-beurkundung', 'Notarielle Beurkundung', 'Form mit Aufnahme der rechtsgeschäftlichen Erklärung durch den Notar in eine Niederschrift nach den gesetzlichen Regeln.'],
    ],
    question: 'Welche Form genügt grundsätzlich für einen Grundstückskaufvertrag: gescannte Unterschriften, Schriftform oder notarielle Beurkundung?',
    answer: '§ 311b Abs. 1 BGB verlangt notarielle Beurkundung. Schriftform und Scans erfüllen die Anforderung für sich allein nicht. Fehlt die Form, prüfe § 125 BGB und die spezielle Möglichkeit der Heilung durch Auflassung und Grundbucheintragung.',
    sources: [bgb, '§§ 125–129, 311b Abs. 1 BGB', '§ 12 HGB zur Handelsregisteranmeldung: https://www.gesetze-im-internet.de/hgb/__12.html'],
  },
  {
    id: 'vertrag-form-sonderfaelle', parent: 'vertrag-form', number: '2.2.1', title: 'Form bei Bürgschaft, Kündigung und Mietvertrag',
    intro: 'Ähnlich aussehende Rechtsgeschäfte können unterschiedliche Formvorschriften und Rechtsfolgen haben. Prüfe daher das jeweilige Spezialgesetz.',
    parts: [
      ['beispiele', 'Unterschrift, besondere Form und Ausnahmen', 'Bei Kündigung eines Arbeitsverhältnisses und Auflösungsvertrag schreibt § 623 BGB Schriftform vor und schließt die elektronische Form aus. Ein eigenhändiges Testament nach § 2247 BGB wird grundsätzlich eigenhändig geschrieben und unterschrieben. Das ist mehr als das Unterschreiben eines ausgedruckten Entwurfs. Bei einem abstrakten Schuldanerkenntnis gilt grundsätzlich § 781 BGB mit seinen Regeln und Ausnahmen.', 'Die Bürgschaftserklärung braucht nach § 766 BGB grundsätzlich Schriftform. Die elektronische Form ist ausgeschlossen. Bei einem Handelsgeschäft auf Seiten des Bürgen entfällt das Formerfordernis nach § 350 HGB. Entscheidend ist, wer die Erklärung abgibt und ob sie auf seiner Seite zum Handelsgeschäft gehört. Die reine Kaufmannseigenschaft des Gläubigers genügt dafür nicht.'],
      ['miete', 'Langfristige Mietverträge und die Rechtsfolge', 'Bei Wohnraummiete für längere Zeit als ein Jahr regelt § 550 BGB, dass der Vertrag bei fehlender Schriftform als auf unbestimmte Zeit geschlossen gilt. Das ist eine abweichende Rechtsfolge zur Nichtigkeit. Bei Grundstücken und Geschäftsräumen reicht für diese Langfristwirkung nach § 578 BGB grundsätzlich Textform. Für Altverträge waren Übergangsfragen nach Art. 229 § 70 EGBGB zu berücksichtigen.', 'Zwei Unternehmen halten einen auf fünf Jahre angelegten Ladenmietvertrag lesbar und speicherbar in identifizierbarer Korrespondenz fest. Prüfe, ob die tatsächlichen Erklärungen die Textform und die sonstigen Vertragsvoraussetzungen erfüllen. Würde ein Wohnraummietvertrag unter denselben Umständen nur in gewöhnlichen E-Mails vereinbart, ist die Anforderung aus § 550 BGB gesondert zu prüfen.'],
    ],
    terms: [],
    question: 'Ein Geschäftsführer bürgt privat per E-Mail für eine Gesellschaftsschuld. Warum hilft ihm die Kaufmannsausnahme nicht automatisch?',
    answer: 'Die Bürgschaftserklärung unterliegt grundsätzlich § 766 BGB. Die Ausnahme des § 350 HGB setzt ein Handelsgeschäft auf Seiten des Bürgen voraus. Eine bloße Stellung als Geschäftsführer macht ein eigenes privates Geschäft nicht zum Handelsgeschäft. Prüfe außerdem die konkreten Voraussetzungen und eine mögliche gesetzliche Heilung.',
    sources: [bgb, '§§ 550, 578, 623, 766, 781, 2247 BGB', '§ 350 HGB: https://www.gesetze-im-internet.de/hgb/__350.html', 'Art. 229 § 70 EGBGB: https://www.gesetze-im-internet.de/bgbeg/art_229__70.html'],
  },
  {
    id: 'vertrag-teilnichtigkeit', parent: 'vertrag-form', number: '2.2.2', title: 'Teilnichtigkeit, AGB und salvatorische Klauseln',
    intro: 'Die Unwirksamkeit eines Teils kann sich auf den restlichen Vertrag auswirken. Welche Folge eintritt, hängt von der Vorschrift und vom Vertragszusammenhang ab.',
    parts: [
      ['individualvertrag', 'Teilnichtigkeit beim Individualgeschäft', 'Nach § 139 BGB ist das ganze Rechtsgeschäft grundsätzlich nichtig, wenn ein Teil nichtig ist und nicht angenommen werden kann, dass die Parteien es auch ohne den nichtigen Teil vorgenommen hätten. Prüfe Trennbarkeit, Zweck und Bedeutung der Regelung statt nur die Anzahl der verbleibenden Paragraphen.', 'Eine [[vertrag-begriff-salvatorisch|salvatorische Klausel]] kann bei der Auslegung dafür sprechen, dass die Parteien das übrige Geschäft aufrechterhalten wollten. Sie macht den unwirksamen Inhalt nicht gültig und kann zwingende gesetzliche Grenzen nicht verschieben.'],
      ['agb', 'Bei AGB gilt eine besondere Regelung', 'Nach § 306 Abs. 1 und 2 BGB bleibt der Vertrag bei nicht einbezogenen oder unwirksamen AGB grundsätzlich im Übrigen bestehen. An die Stelle der Klausel treten die gesetzlichen Vorschriften. Ist das Festhalten am Vertrag unter Berücksichtigung dieser Änderung eine unzumutbare Härte, kann der gesamte Vertrag nach Abs. 3 unwirksam sein.', 'Prüfe beim Individualvertrag, ob ein ungültiger, austauschbarer Nebenpunkt das Gesamtgeschäft trägt. Bei einer unwirksamen vorformulierten AGB-Klausel prüfst du dagegen zunächst § 306 BGB. Eine allgemeine Ersetzungsklausel bewirkt keine freie Neufassung einer unwirksamen Klausel.'],
    ],
    terms: [['vertrag-begriff-salvatorisch', 'Salvatorische Klausel', 'Vertragsregelung zum Fortbestand der übrigen Bestimmungen und gegebenenfalls zur Behandlung einer Lücke bei unwirksamen Vertragsteilen. Ihre Wirkung hängt von den geltenden gesetzlichen Regeln ab.']],
    question: 'Eine AGB-Klausel ist wegen ihrer Benachteiligung unwirksam. Hat die Kundin automatisch überhaupt keinen Vertrag mehr?',
    answer: 'Grundsätzlich nein. § 306 BGB lässt den Vertrag im Übrigen bestehen und füllt die Lücke mit Gesetzesrecht. Das gilt vorbehaltlich eines Ausnahmefalls unzumutbarer Härte und anderer besonderer Gründe der Gesamtunwirksamkeit.',
    sources: [bgb, '§§ 139, 306 BGB'],
  },
  {
    id: 'vertrag-anfechtung', parent: 'vertrag-durchsetzung', number: '2.3', title: 'Anfechtung einer Willenserklärung prüfen',
    intro: 'Die Anfechtung ist ein Gestaltungsrecht. Eine zunächst wirksame Erklärung verliert bei wirksamer Anfechtung rückwirkend ihre Wirkung.',
    parts: [
      ['pruefweg', 'Grund, Erklärung, Gegner, Frist und Ausschluss', 'Benenne zuerst die konkrete Willenserklärung und den [[vertrag-begriff-anfechtung|Anfechtungsgrund]]. Prüfe, ob der Grund für die Abgabe ursächlich war. Danach prüfst du die eindeutige Anfechtungserklärung und den richtigen Gegner nach § 143 BGB. Beim Vertrag ist dies grundsätzlich der andere Teil. Die Erklärung muss dem Gegner zugehen. Sie braucht regelmäßig keine spezielle Bezeichnung, muss aber erkennen lassen, dass der Erklärende das Geschäft wegen des betreffenden Willensmangels nicht gelten lassen will.', 'Bei Irrtum oder unrichtiger Übermittlung verlangt § 121 BGB unverzügliches Handeln nach Kenntnis des Grundes. Unverzüglich bedeutet ohne schuldhaftes Zögern. Bei arglistiger Täuschung oder widerrechtlicher Drohung beträgt die Frist nach § 124 BGB ein Jahr, grundsätzlich ab Entdeckung der Täuschung oder Ende der Zwangslage. § 121 Abs. 2 und § 124 Abs. 3 schließen die jeweiligen Anfechtungen aus, wenn seit Abgabe der Erklärung zehn Jahre verstrichen sind. Die lange Grenze ersetzt die kürzere Frist nicht.'],
      ['folge', 'Rechtsfolge und Bestätigung auseinanderhalten', '§ 142 Abs. 1 BGB behandelt das wirksam angefochtene Rechtsgeschäft als von Anfang an nichtig. Bereits ausgetauschte Leistungen können getrennt nach Bereicherungsrecht zu prüfen sein. Bei § 119 oder § 120 BGB kann § 122 BGB den Vertrauensschaden ersetzen. Der Ersatz ist auf das Interesse an der Gültigkeit der Erklärung begrenzt. Kenntnis oder fahrlässige Unkenntnis des anderen vom Nichtigkeits- oder Anfechtungsgrund schließt ihn aus.', 'Nach § 144 BGB schließt die Bestätigung des anfechtbaren Geschäfts durch den Anfechtungsberechtigten die Anfechtung aus. Das Geschäft war bis dahin grundsätzlich wirksam. Die Bestätigung beseitigt das Anfechtungsrecht, sie ist nicht mit der Bestätigung eines nichtigen Geschäfts nach § 141 BGB gleichzusetzen. Ein vorbehaltloses Fortsetzen nach erlangtem Wissen kann je nach Umständen eine Bestätigung sein.'],
      ['weiter', 'Die Gründe getrennt lernen', 'Die [[>vertrag-anfechtungsgruende|Irrtumsfälle]] unterscheiden Erklärung, Inhalt, Eigenschaft und Übermittlung. [[>vertrag-taeuschung-drohung|Täuschung und Drohung]] haben einen eigenen Prüfweg und Fristbeginn.'],
    ],
    terms: [['vertrag-begriff-anfechtung', 'Anfechtung', 'Ausübung eines gesetzlich vorgesehenen Gestaltungsrechts, durch die eine anfechtbare Willenserklärung bei eingehaltenen Voraussetzungen rückwirkend ihre Wirkung verliert.']],
    question: 'Der Käufer entdeckt eine Verkäuferlüge und möchte prüfen, ob sofort oder innerhalb eines Jahres angefochten werden muss. Wie gehst du vor?',
    answer: 'Prüfe zunächst arglistige Täuschung nach § 123 BGB. Dafür gilt die Jahresfrist des § 124 BGB ab Entdeckung und die absolute Grenze von zehn Jahren seit Abgabe. Bei einem schlichten Irrtum nach § 119 BGB wäre § 121 BGB mit unverzüglichem Handeln einschlägig. Außerdem muss die Erklärung den richtigen Gegner erreichen und es darf keine Bestätigung vorliegen.',
    sources: [bgb, '§§ 119–124, 141–144, 812 BGB'],
  },
  {
    id: 'vertrag-anfechtungsgruende', parent: 'vertrag-anfechtung', number: '2.3.1', title: 'Irrtum und unrichtige Übermittlung',
    intro: 'Beim Irrtum prüfst du, ob sich die Person beim Erklären geirrt hat oder nur aus einem unzutreffenden Beweggrund gehandelt hat.',
    parts: [
      ['erklaerung-inhalt', 'Erklärungs- und Inhaltsirrtum unterscheiden', 'Ein [[vertrag-begriff-erklaerungsirrtum|Erklärungsirrtum]] liegt etwa vor, wenn jemand 80 Stück eintippt, obwohl er 8 eingeben will. Beim [[vertrag-begriff-inhaltsirrtum|Inhaltsirrtum]] wird das verwendete Zeichen bewusst erklärt, sein rechtlicher oder sprachlicher Sinn aber verkannt. Wer bewusst „ein Dutzend“ bestellt, aber dieses Wort als zehn Stück versteht, irrt über den Inhalt. § 119 Abs. 1 BGB verlangt zusätzlich, dass die Erklärung bei Kenntnis der Sachlage und verständiger Würdigung nicht abgegeben worden wäre.'],
      ['eigenschaft-uebermittlung', 'Eigenschaften und Übermittlung getrennt prüfen', 'Der [[vertrag-begriff-eigenschaftsirrtum|Eigenschaftsirrtum]] nach § 119 Abs. 2 BGB betrifft verkehrswesentliche Merkmale einer Person oder Sache, beispielsweise bei einem Kunstwerk die Urheberschaft. Der bloße Marktwert oder die enttäuschte Hoffnung auf Wiederverkauf sind regelmäßig keine solchen Eigenschaften. Prüfe bei bereits vollzogenem Kauf und einem Sachmangel außerdem die Konkurrenz zum kaufrechtlichen Mängelrecht.', '§ 120 BGB kann greifen, wenn ein Erklärungsbote oder eine Übermittlungseinrichtung eine bereits gebildete Erklärung falsch übermittelt. Bestellt ein Bote statt der aufgetragenen karierten Hefte linierte, ist das anders zu prüfen als bei einem Vertreter, der eine eigene Erklärung abgibt. Bei einer eigenen Kalkulation, die intern mit einem falschen Kostenwert rechnet, ist ein Anfechtungsgrund nicht allein durch einen ungünstigen Preis gegeben.'],
      ['web', 'Preisfehler im Webshop rechtlich zuordnen', 'War die Produktanzeige nur Aufforderung zur Angebotsabgabe, wird nicht die Anzeige als Angebot angefochten. Prüfe Bestellung und tatsächliche Annahme. Übernimmt eine Annahmeerklärung einen fehlerhaften Preis, kann je nach technischer und tatsächlicher Entstehung ein beachtlicher Irrtum vorliegen. Bei einer bloßen Eingangsbestätigung fehlt möglicherweise schon ein Vertrag. Leite den Irrtum aus der konkreten Erklärung ab und beachte § 121 sowie gegebenenfalls § 122 BGB.'],
    ],
    terms: [
      ['vertrag-begriff-erklaerungsirrtum', 'Erklärungsirrtum', 'Die Person verwendet ungewollt eine andere Erklärungshandlung, etwa durch Versprechen oder Vertippen.'],
      ['vertrag-begriff-inhaltsirrtum', 'Inhaltsirrtum', 'Die Person gibt die beabsichtigte Erklärung ab, versteht deren objektiven Inhalt aber anders.'],
      ['vertrag-begriff-eigenschaftsirrtum', 'Eigenschaftsirrtum', 'Irrtum über eine verkehrswesentliche Eigenschaft einer Person oder Sache nach § 119 Abs. 2 BGB.'],
    ],
    question: 'Eine Bestellung lautet aufgrund eines eigenen Tippfehlers auf 120 statt 12 Pakete. Eine zweite Bestellung wird erst durch den Boten falsch übermittelt. Welche Vorschriften prüfst du?',
    answer: 'Bei der ersten Bestellung prüfst du Erklärungsirrtum nach § 119 Abs. 1 BGB. Bei der zweiten kommt § 120 BGB für unrichtige Übermittlung in Betracht, wenn der Bote eine fremde Erklärung weitergibt. In beiden Fällen prüfst du die Voraussetzungen des Anfechtungsrechts, § 121 BGB und einen etwaigen Vertrauensschaden nach § 122 BGB.',
    sources: [bgb, '§§ 119–122, 166 BGB', 'BGH, Urteil vom 26.01.2005, VIII ZR 79/04, elektronisch verarbeitete fehlerhafte Preisangabe: https://juris.bundesgerichtshof.de/cgi-bin/rechtsprechung/document.py?Gericht=bgh&Art=en&nr=31807'],
  },
  {
    id: 'vertrag-taeuschung-drohung', parent: 'vertrag-anfechtung', number: '2.3.2', title: 'Arglistige Täuschung und widerrechtliche Drohung',
    intro: 'Wer durch vorsätzlich falsche Angaben oder durch eine widerrechtliche Drohung zur Erklärung bestimmt wird, kann nach § 123 BGB anfechten.',
    parts: [
      ['taeuschung', 'Falsche Angabe, Aufklärungspflicht und Ursächlichkeit', 'Prüfe bei [[vertrag-begriff-taeuschung|arglistiger Täuschung]], welche Tatsache falsch dargestellt wurde oder ob bei bestehender Aufklärungspflicht bewusst etwas verschwiegen wurde. Arglist verlangt mindestens bedingten Vorsatz. Die Täuschung muss die Erklärung beeinflusst haben. Hat ein Dritter getäuscht, setzt § 123 Abs. 2 BGB bei empfangsbedürftigen Erklärungen im Regelfall Kenntnis oder Kennenmüssen des Empfängers voraus. Prüfe bei einem unmittelbar begünstigten Dritten den zweiten Satz der Vorschrift.', 'Ein Händler bestätigt bewusst eine falsche maximale Nutzungsdauer eines Geräts und weiß, dass dies für den Käufer maßgeblich ist. Die Abgabe der Bestellung beruht darauf. Wird dagegen eine unverbindliche Erwartung offen als Schätzung bezeichnet und ehrlich vertreten, liegt darin für sich keine bewusst falsche Tatsachenangabe.'],
      ['drohung', 'Widerrechtlichkeit der Drohung begründen', 'Eine [[vertrag-begriff-drohung|Drohung]] stellt ein künftiges Übel in Aussicht, auf dessen Eintritt der Drohende Einfluss zu haben vorgibt. Widerrechtlich können Mittel, Zweck oder die Verbindung beider sein. Die angekündigte Durchsetzung eines berechtigten Anspruchs ist nicht allein wegen des ausgeübten Drucks widerrechtlich. Prüfe den Zusammenhang zwischen Drohung und angestrebter Erklärung.', 'Bei beiden Gründen gilt § 124 BGB. Entdeckt eine Käuferin am 5. März 2026, dass der Lieferant bewusst ungeeignete Materialien als Edelstahl ausgegeben hat, läuft die Jahresfrist grundsätzlich bis zum Ende des 5. März 2027. Bei einer Drohung beginnt die Frist erst, wenn die Zwangslage endet. Halte zusätzlich die absolute Grenze von zehn Jahren seit Abgabe ein.'],
    ],
    terms: [
      ['vertrag-begriff-taeuschung', 'Arglistige Täuschung', 'Mindestens bedingt vorsätzliche Irreführung durch Tatsachenbehauptung oder pflichtwidriges Verschweigen, die zur Erklärung bestimmt.'],
      ['vertrag-begriff-drohung', 'Widerrechtliche Drohung', 'Ankündigung eines künftigen Übels zur Herbeiführung einer Erklärung, deren Mittel, Zweck oder Mittel-Zweck-Verbindung widerrechtlich ist.'],
    ],
    question: 'Ein Unternehmer entdeckt elf Jahre nach seiner Bestellung absichtlich gefälschte Materialangaben. Reicht es, dass die Entdeckung erst gestern war?',
    answer: 'Nein. Zwar beginnt die Jahresfrist grundsätzlich mit Entdeckung. Die Anfechtung nach § 123 BGB ist aber gemäß § 124 Abs. 3 ausgeschlossen, wenn seit der Abgabe der anzufechtenden Erklärung zehn Jahre verstrichen sind. Etwaige andere Ansprüche sind getrennt zu prüfen.',
    sources: [bgb, '§§ 123–124, 143, 187–193 BGB'],
  },
  {
    id: 'verjaehrung-basis', parent: 'vertrag-durchsetzung', number: '2.4', title: 'Verjährung, Einrede und allgemeine Fristen',
    intro: 'Die Verjährung begrenzt die Durchsetzbarkeit von Ansprüchen. Sie lässt einen Anspruch grundsätzlich bestehen, gibt dem Schuldner aber ein Leistungsverweigerungsrecht.',
    parts: [
      ['frist', 'Regelfrist richtig berechnen', 'Ein Anspruch unterliegt häufig der dreijährigen regelmäßigen [[logistik-verjaehrung|Verjährung]] nach § 195 BGB. Nach § 199 Abs. 1 BGB beginnt sie grundsätzlich mit Schluss des Jahres, in dem der Anspruch entstanden ist und der Gläubiger von den anspruchsbegründenden Umständen und der Person des Schuldners Kenntnis erlangte oder ohne grobe Fahrlässigkeit hätte erlangen müssen. Prüfe beide Merkmale und spezielle Fristen vor der Rechnung.', 'Eine bekannte und fällige Kaufpreisforderung entsteht im Mai 2023. Bei gewöhnlichem Ablauf beginnt die Dreijahresfrist mit Schluss des 31. Dezember 2023 und endet mit Ablauf des 31. Dezember 2026. Ab dem 1. Januar 2027 kann sich der Schuldner grundsätzlich auf Verjährung berufen. Das Kalenderende-Muster gilt nicht automatisch für besondere Fristen.'],
      ['folge', 'Einrede und Zahlung nach Verjährung', 'Die [[vertrag-begriff-einrede|Einrede der Verjährung]] muss grundsätzlich geltend gemacht werden. Sie wird vom Zivilgericht nicht automatisch berücksichtigt. Bezahlt der Schuldner zur Befriedigung eines verjährten Anspruchs freiwillig, kann er das Geleistete nach § 214 Abs. 2 BGB grundsätzlich nicht allein wegen des Verjährungseintritts zurückfordern. Das gilt auch bei Unkenntnis der Verjährung. Eine eventuelle Aufrechnung oder ein Zurückbehaltungsrecht prüfst du gesondert anhand von § 215 BGB.'],
      ['sonderfrist', 'Zehn und dreißig Jahre einordnen', '§ 196 BGB sieht zehn Jahre unter anderem für Ansprüche auf Übertragung von Grundstückseigentum und bestimmte Rechte an Grundstücken sowie die jeweilige Gegenleistung vor. § 197 BGB sieht dreißig Jahre für bestimmte Ansprüche vor, etwa rechtskräftig festgestellte Ansprüche, Ansprüche aus vollstreckbaren Vergleichen oder Urkunden, bestimmte Insolvenzfeststellungen und bestimmte Herausgabeansprüche. Familien- oder Erbfälle führen nicht pauschal zu einer dreißigjährigen Frist.', 'Für Ansprüche außerhalb der Regelfrist gilt beim Beginn regelmäßig § 200 BGB, soweit kein anderer Beginn bestimmt ist. Für titulierte Ansprüche in den Fällen des § 197 Abs. 1 Nr. 3 bis 6 prüfst du § 201 BGB. Künftig fällige regelmäßig wiederkehrende Leistungen können nach § 197 Abs. 2 der Regelfrist unterliegen. Kenntnisunabhängige Höchstfristen für Schadensersatz und andere Ansprüche stehen in § 199 Abs. 2 bis 4 BGB. Sie sind eigenständige Grenzen.'],
      ['fristen', 'Kalenderfristen systematisch rechnen', 'Bestimme Ereignis oder Tagesbeginn als Fristbeginn nach § 187 BGB und berechne das Ende nach § 188 BGB. Bei Ereignisfristen wird der auslösende Tag nicht mitgerechnet. Prüfe bei Sonntagen, Samstagen und am Erklärungs- oder Leistungsort anerkannten allgemeinen Feiertagen § 193 BGB samt dem sachlichen Anwendungsbereich. Eine Jahresfrist ab einem Ereignis am 20. April endet unter normalen Umständen am 20. April des Folgejahres, nicht am 31. Dezember.', 'Vertiefe [[>verjaehrung-maengel|Verjährung bei Mängeln]], [[>verjaehrung-hemmung|Hemmung und Neubeginn]] und [[>mahnverfahren|gerichtliches Mahnverfahren]].'],
    ],
    terms: [
      ['vertrag-begriff-einrede', 'Einrede der Verjährung', 'Recht, nach eingetretener Verjährung die geschuldete Leistung zu verweigern. Der Anspruch erlischt dadurch grundsätzlich nicht.'],
    ],
    question: 'Eine Forderung über 960 € entsteht 2023. Gläubiger und Schuldner sind bekannt und die Leistung ist 2023 fällig. Wann endet die Regelfrist, wenn keine Besonderheiten hinzutreten?',
    answer: 'Die Frist beginnt nach §§ 195, 199 Abs. 1 BGB mit Schluss des Jahres 2023 und endet mit Ablauf des 31. Dezember 2026. Ab dem 1. Januar 2027 kann sich der Schuldner grundsätzlich auf die Einrede berufen. Zahlung allein aus Unkenntnis der Verjährung begründet grundsätzlich keine Rückforderung.',
    sources: [bgb, '§§ 187–193, 194–201, 214–215 BGB'],
  },
  {
    id: 'verjaehrung-maengel', parent: 'verjaehrung-basis', number: '2.4.1', title: 'Verjährung von Mängelansprüchen',
    intro: 'Bei Mängeln kommt es auf Vertragstyp, Gegenstand und Anspruch an. Kaufpreisforderung und Mängelanspruch folgen oft unterschiedlichen Fristen.',
    parts: [
      ['kauf', 'Kaufvertrag und Verbrauchsgüterkauf', 'Beim Kauf beweglicher Sachen verjähren kaufrechtliche Mängelansprüche in Standardfällen in zwei Jahren ab Ablieferung, § 438 Abs. 1 Nr. 3 und Abs. 2 BGB. Bei einem Bauwerk und bei einer Sache, die entsprechend üblicher Verwendungsweise für ein Bauwerk verwendet wurde und dessen Mangel verursacht hat, gilt grundsätzlich die Fünfjahresfrist. Bestimmte Rechtsmängel können dreißig Jahre auslösen. Bei arglistigem Verschweigen gilt § 438 Abs. 3 mit der dort geregelten Mindestgrenze für § 438 Abs. 1 Nr. 2.', 'Beim Verbrauchsgüterkauf ist eine Verkürzung vor Mangelmitteilung nur in den Grenzen von § 476 Abs. 2 BGB zulässig. Bei gebrauchten Waren darf die vereinbarte Frist nicht unter einem Jahr liegen. Die Verkürzung erfordert vorvertragliche eigene Information und ausdrückliche, gesonderte Vereinbarung. Gebraucht bedeutet also nicht automatisch ein Jahr. § 475e BGB kann zusätzliche Ablaufregeln vorsehen, etwa wenn sich ein Mangel innerhalb der Frist gezeigt hat.'],
      ['werk', 'Werkvertrag: Abnahme und Leistungsgegenstand zählen', 'Beim Werkvertrag gilt nach § 634a Abs. 1 Nr. 1 BGB grundsätzlich eine Zweijahresfrist für Arbeiten an einer Sache im Sinne dieser Vorschrift und zugehörige Planungs- oder Überwachungsleistungen. Bei Bauwerken sowie darauf bezogener Planung oder Überwachung gilt grundsätzlich eine Fünfjahresfrist. Beide beginnen mit [[vertrag-begriff-abnahme|Abnahme]], nicht mit Rechnung oder bloßer Fertigstellung. Im Übrigen kann die regelmäßige Frist gelten. Arglist wird in § 634a Abs. 3 gesondert geregelt.', 'Eine abgelieferte bewegliche Maschine und der Einbau einer Bauwerksanlage brauchen jeweils Prüfung von Vertragstyp und gesetzlicher Variante. „Jedes Werk verjährt nach zwei Jahren“ wäre ebenso falsch wie „Alles am Bau hat fünf Jahre“.'],
      ['fall', 'Möbel und Haus getrennt berechnen', 'Ein Verbraucher erhält gekaufte Möbel am 15. April 2025. Gelten keine Sondervorschriften, endet die Zweijahresfrist für kaufrechtliche Mängelansprüche mit Ablauf des 15. April 2027. Ein vom Bauunternehmen errichtetes Haus wird am 10. Juni 2025 abgenommen. Für einschlägige Baumängel endet die Fünfjahresfrist grundsätzlich mit Ablauf des 10. Juni 2030. Die Kaufpreisforderung für die Möbel folgt regelmäßig den §§ 195 und 199 BGB und hat bei Entstehung und Kenntnis in 2025 den Jahresendstichtag 31. Dezember 2028.'],
    ],
    terms: [['vertrag-begriff-abnahme', 'Abnahme bei einem Werk', 'Billigung des Werks als im Wesentlichen vertragsgemäß. Sie löst beim Werkvertrag wichtige Rechtsfolgen aus, unter anderem in den Fällen des § 634a Abs. 2 BGB den Verjährungsbeginn.']],
    question: 'Ein Kunde bestellt ein neues Regal und lässt daneben ein Haus errichten. Regallieferung und Hausabnahme erfolgen am gleichen Tag. Sind die Mängelfristen gleich?',
    answer: 'Beim Regal gilt grundsätzlich die kaufrechtliche Zweijahresfrist ab Ablieferung. Bei Baumängeln des errichteten Bauwerks gilt grundsätzlich die fünfjährige werkvertragliche Frist ab Abnahme. Gleiche Daten ändern die unterschiedliche Fristdauer und Anspruchsgrundlage nicht. Besondere Ablaufregeln sind im konkreten Fall getrennt zu prüfen.',
    sources: [bgb, '§§ 438, 475e, 476, 634a, 640 BGB'],
  },
  {
    id: 'verjaehrung-hemmung', parent: 'verjaehrung-basis', number: '2.4.2', title: 'Hemmung, Neubeginn und Verhandlungen',
    intro: 'Hemmung und Neubeginn verändern eine laufende Verjährung auf verschiedene Weise. Die bloße Mahnung ist dafür grundsätzlich kein eigenständiger Grund.',
    parts: [
      ['hemmung', 'Bei Hemmung bleibt die bisherige Laufzeit erhalten', 'Während einer [[vertrag-begriff-hemmung|Hemmung]] wird der gehemmte Zeitraum nach § 209 BGB nicht eingerechnet. Echte Verhandlungen über Anspruch oder anspruchsbegründende Umstände können nach § 203 BGB bis zur Verweigerung der Fortsetzung hemmen. Im Fall des § 203 tritt Verjährung frühestens drei Monate nach Ende der Hemmung ein. Eine bloße einseitige Forderung genügt nicht.', 'Weitere Hemmungsgründe ergeben sich aus § 204 BGB, etwa Klageerhebung, Zustellung eines Mahnbescheids und bestimmte Güte-, Insolvenz- oder Schiedsverfahren. Bei fristgebundener Zustellung kann § 167 ZPO auf den Antragseingang zurückwirken, wenn die Zustellung demnächst erfolgt. Prüfe Voraussetzungen, genauen Beginn und Ende. Bei § 204 ist auch die dort geregelte Sechsmonatsregel zum Hemmungsende zu beachten.'],
      ['neubeginn', 'Bei Neubeginn läuft die Frist erneut', 'Ein [[vertrag-begriff-neubeginn|Neubeginn]] nach § 212 BGB kann durch Anerkennen des Anspruchs eintreten, etwa erkennbar durch Abschlags- oder Zinszahlung, Sicherheitsleistung oder auf andere Weise. Auch Beantragung oder Vornahme einer gerichtlichen oder behördlichen Vollstreckungshandlung kann Neubeginn auslösen. Das Anerkennen ist nach dem konkreten Verhalten zu prüfen. Eine Reparatur aus Kulanz oder jede Bitte um Stundung ist nicht automatisch ein Anerkenntnis.', 'Für eine Modellrechnung beträgt die Ausgangsfrist 36 Monate. Nach 20 Monaten wird sie wirksam gehemmt. Bei einer beispielhaften Hemmung von vier Monaten bleiben danach zunächst 16 Monate Restlaufzeit. Ein wirksamer Neubeginn nach 20 Monaten lässt dagegen die einschlägige Frist erneut laufen. Gesetzliche Mindestrestfristen und kalendarische Sonderregeln sind zusätzlich zu prüfen.'],
    ],
    terms: [
      ['vertrag-begriff-hemmung', 'Hemmung der Verjährung', 'Zeitraum, in dem die Verjährungszeit aufgrund eines gesetzlichen Grundes nicht weiterläuft und der deshalb bei der Berechnung nicht mitgezählt wird.'],
      ['vertrag-begriff-neubeginn', 'Neubeginn der Verjährung', 'Erneuter Lauf der Verjährungsfrist nach einem gesetzlichen Ereignis, etwa einem wirksamen Anerkennen des Anspruchs.'],
    ],
    question: 'Der Gläubiger erinnert allein am 30. Dezember an eine Forderung. Der Schuldner reagiert weder noch zahlt er. Verhindert die Erinnerung die Verjährung?',
    answer: 'Eine private einseitige Mahnung hemmt die Verjährung grundsätzlich nicht und löst für sich keinen Neubeginn aus. § 203 verlangt Verhandlungen, § 204 einen dort genannten Hemmungsgrund und § 212 beispielsweise ein Anerkennen. Ob durch ein rechtzeitig eingeleitetes Verfahren die Frist gewahrt wird, ist gesondert zu prüfen.',
    sources: [bgb, '§§ 203–204, 209, 212 BGB', '§ 167 ZPO: https://www.gesetze-im-internet.de/zpo/__167.html'],
  },
  {
    id: 'mahnverfahren', parent: 'verjaehrung-basis', number: '2.4.3', title: 'Gerichtliches Mahnverfahren und Vollstreckungsbescheid',
    intro: 'Das gerichtliche Mahnverfahren kann eine bezifferte Geldforderung ohne vollständigen Prozess zunächst formal erfassen und zu einem Titel führen.',
    parts: [
      ['eingang', 'Vom Antrag zur Zustellung', 'Das [[vertrag-begriff-mahnverfahren|gerichtliche Mahnverfahren]] nach §§ 688 ff. ZPO setzt eine geeignete Geldforderung voraus. Formuliere den Betrag und die Forderung ausreichend eindeutig. Das zuständige Mahngericht erlässt bei erfüllten formalen Anforderungen den Mahnbescheid und stellt ihn zu. Es prüft die materielle Berechtigung der Forderung dabei grundsätzlich nicht. Von der außergerichtlichen Mahnung ist dieses Verfahren zu unterscheiden.', 'Der Mahnbescheid fordert zu Zahlung oder Widerspruch binnen zwei Wochen ab Zustellung auf (§ 692 ZPO). Ein [[vertrag-begriff-widerspruch|Widerspruch]] kann grundsätzlich noch erhoben werden, solange der Vollstreckungsbescheid nicht verfügt ist (§ 694 ZPO). Bei Widerspruch geht das Verfahren auf entsprechenden Antrag und unter den gesetzlichen Voraussetzungen an das Prozessgericht (§ 696 ZPO). Dort wird die Forderung inhaltlich geprüft. Eine volle Zahlung nimmt der verfolgten Hauptforderung insoweit die Grundlage.'],
      ['titel', 'Vollstreckungsbescheid und Einspruch', 'Wenn die Zweiwochenfrist abgelaufen ist und kein Widerspruch vorliegt, kann der Antragsteller einen [[vertrag-begriff-vollstreckungsbescheid|Vollstreckungsbescheid]] beantragen. Unterbleibt der Antrag grundsätzlich binnen sechs Monaten ab Zustellung des Mahnbescheids, fällt dessen Wirkung nach § 701 ZPO weg. Gegen den Vollstreckungsbescheid ist grundsätzlich Einspruch binnen zwei Wochen ab Zustellung möglich (§§ 700, 339 ZPO). Mit einem zulässigen Einspruch folgt ein streitiges Verfahren.', 'Der Vollstreckungsbescheid steht nach § 700 Abs. 1 ZPO einem für vorläufig vollstreckbar erklärten Versäumnisurteil gleich. Titel, Zustellung und Voraussetzungen der einzelnen Maßnahme sind zu prüfen. In Betracht kommen etwa Pfändung oder Vermögensauskunft. Rechtskräftig festgestellte Ansprüche unterliegen grundsätzlich einer dreißigjährigen Verjährung unter Beachtung der gesetzlichen Ausnahmen. Im Zivilprozess wird eine unbegründete Klage abgewiesen. „Freispruch“ passt zum Strafverfahren.'],
      ['verjaehrung', 'Mahnverfahren und laufende Verjährung verbinden', 'Zur Hemmung kommt es nach § 204 Abs. 1 Nr. 3 BGB grundsätzlich auf die Zustellung des Mahnbescheids an. § 167 ZPO kann bei demnächst erfolgender Zustellung die Wirkung auf den Antragseingang beziehen. Ein bloßer Entwurf oder eine private Mahnung genügt nicht. Prüfe auch § 204 Abs. 2 BGB, wenn das Verfahren endet oder nicht weiter betrieben wird.'],
    ],
    terms: [
      ['vertrag-begriff-mahnverfahren', 'Gerichtliches Mahnverfahren', 'Förmliches Zivilverfahren zur Geltendmachung bestimmter Geldforderungen mit Mahnbescheid und möglichem Vollstreckungsbescheid.'],
      ['vertrag-begriff-widerspruch', 'Widerspruch gegen Mahnbescheid', 'Mitteilung an das Gericht, dass die im Mahnbescheid geltend gemachte Forderung ganz oder teilweise bestritten wird.'],
      ['vertrag-begriff-vollstreckungsbescheid', 'Vollstreckungsbescheid', 'Gerichtlicher Vollstreckungstitel im Mahnverfahren, der einem für vorläufig vollstreckbar erklärten Versäumnisurteil gleichsteht.'],
    ],
    question: 'Ein Betrieb erhält erst einen Mahnbescheid, später einen Vollstreckungsbescheid. Welcher Rechtsbehelf gehört zu welchem Schritt?',
    answer: 'Gegen den Mahnbescheid erhebt er Widerspruch. Nach Zustellung des Vollstreckungsbescheids ist der Einspruch einschlägig, grundsätzlich innerhalb von zwei Wochen. Widerspruch und Einspruch können je nach Voraussetzungen den Übergang in das streitige Verfahren auslösen.',
    sources: [zpo, '§§ 167, 339, 688–703d ZPO', bgb, '§ 204 BGB'],
  },
  {
    id: 'gerichtsstand', parent: 'vertrag-durchsetzung', number: '2.5', title: 'Gerichtsstand und sachliche Zuständigkeit',
    intro: 'Die sachliche Zuständigkeit bestimmt die Gerichtsart. Der Gerichtsstand bestimmt örtlich, in welchem Bezirk der Rechtsstreit erhoben werden kann oder muss.',
    parts: [
      ['sachlich', 'Amtsgericht oder Landgericht bestimmen', 'Seit dem 1. Januar 2026 sind in bürgerlichen Rechtsstreitigkeiten mit beziffertem Streitwert nach der Grundregel Forderungen bis einschließlich 10.000 € beim Amtsgericht und darüber beim Landgericht einzuordnen (§§ 23 Nr. 1, 71 GVG). Prüfe wertunabhängige Zuweisungen zuerst, etwa Wohnraummietstreitigkeiten an das Amtsgericht. Für vor dem Stichtag anhängig gewordene Verfahren sind die Übergangsregeln zu berücksichtigen. Die ältere Grenze von 5.000 € auf der Kursfolie gilt für neue Standardfälle nicht mehr.', 'Im Zivilverfahren können Amts- oder Landgericht erste Instanz sein. Je nach Erstinstanz und Rechtsmittel folgen Landgericht oder Oberlandesgericht. Unter den jeweiligen Zulässigkeitsvoraussetzungen kommt Revision zum Bundesgerichtshof in Betracht. Berufung und Revision erfüllen unterschiedliche Prüfaufgaben. Der dargestellte Streitwert ist keine Schwelle für Strafverfahren.'],
      ['oertlich', 'Allgemeiner, besonderer und ausschließlicher Gerichtsstand', 'Der [[vertrag-begriff-gerichtsstand|Gerichtsstand]] richtet sich im allgemeinen Fall nach dem Wohnsitz natürlicher Personen bzw. dem Sitz juristischer Personen (§§ 12, 13, 17 ZPO). Der Aufenthaltsort ist kein genereller Ersatz für den Wohnsitz, sondern kann etwa nach § 16 ZPO bei fehlendem Wohnsitz eine Rolle spielen. Besondere Gerichtsstände entstehen nur bei erfülltem Tatbestand, etwa am streitigen Leistungsort nach § 29 oder am Ort der unerlaubten Handlung nach § 32 ZPO.', 'Ein ausschließlicher Gerichtsstand geht anderen örtlichen Möglichkeiten vor. § 29a ZPO ordnet für bestimmte Raum-Miet- und Pachtstreitigkeiten grundsätzlich den Ort der Räume an und enthält Ausnahmen. § 24 ZPO betrifft unter anderem bestimmte dingliche Klagen. Bei mehreren zulässigen nicht ausschließlichen Gerichten kann § 35 ZPO ein Wahlrecht eröffnen.'],
      ['vereinbarung', 'Wirksamkeit einer Gerichtsstandsklausel prüfen', 'Eine [[vertrag-begriff-prorogation|Prorogation]] kann ein an sich unzuständiges Gericht zuständig machen. Derogation bezeichnet den vertraglichen Ausschluss einer sonst zulässigen Zuständigkeit, wenn eine ausschließliche Vereinbarung wirksam getroffen wird. § 38 Abs. 1 ZPO eröffnet Vereinbarungen für bestimmte Parteien, etwa Kaufleute. Abs. 2 und 3 regeln Sonderfälle, etwa fehlenden inländischen allgemeinen Gerichtsstand oder bestimmte Vereinbarungen nach Entstehung der Streitigkeit. Prüfe außerdem, ob sich die Vereinbarung auf ein bestimmtes Rechtsverhältnis bezieht und § 40 ZPO ihr entgegensteht. Ausschließliche Zuständigkeiten sind nicht abdingbar.', 'Eine §-29-Zuständigkeit aus einer bloßen Vereinbarung des Leistungsorts kommt bei der Parteikonstellation des § 29 Abs. 2 ZPO in Betracht. Bei einer unwirksamen Klausel oder falscher Auswahl prüfst du die verbleibenden Gerichtsstände und gegebenenfalls eine Verweisung nach § 281 ZPO.'],
    ],
    terms: [
      ['vertrag-begriff-gerichtsstand', 'Gerichtsstand', 'Regel über die örtliche Zuständigkeit eines Gerichts für einen Rechtsstreit.'],
      ['vertrag-begriff-prorogation', 'Prorogation', 'Begründung einer sonst nicht bestehenden Zuständigkeit durch eine rechtlich zulässige Vereinbarung.'],
    ],
    question: 'Ein Hersteller verlangt 8.800 € aus einem gewöhnlichen Kaufvertrag. Der Käufer ist eine GmbH am Ort B. Ein besonderer Sachverhalt ist nicht ersichtlich. Wie gehst du vor?',
    answer: 'Für einen neuen gewöhnlichen Zivilfall 2026 weist der Wert bis 10.000 € grundsätzlich zum Amtsgericht. Örtlich ist grundsätzlich der Sitz der beklagten GmbH in B maßgeblich. Prüfe besondere oder ausschließliche Gerichtsstände und eine etwaige wirksame Vereinbarung gesondert.',
    sources: [zpo, '§§ 12–17, 24, 29, 29a, 32, 35, 38–40, 281 ZPO', 'GVG: https://www.gesetze-im-internet.de/gvg/', jurisdictionLaw],
  },
  {
    id: 'erfuellungsort', parent: 'gerichtsstand', number: '2.5.1', title: 'Erfüllungsort und Gefahrübergang unterscheiden',
    intro: 'Der Leistungs- oder Erfüllungsort bezeichnet den Ort der geschuldeten Leistungshandlung. Er ist von Abschlussort, Zielort und Gerichtsstand zu trennen.',
    parts: [
      ['ort', 'Erfüllungsort für jede Pflicht getrennt bestimmen', 'Der [[vertrag-begriff-erfuellungsort|Erfüllungsort]] ergibt sich vorrangig aus der Vereinbarung und den Umständen, insbesondere der Natur des Schuldverhältnisses. Fehlt ein anderer Anhaltspunkt, verweist § 269 BGB grundsätzlich auf den Wohnsitz oder die einschlägige gewerbliche Niederlassung des Schuldners bei Entstehung der Verpflichtung. Eine Operation wird typischerweise im Krankenhaus geleistet. Bei einem Kauf können für Waren- und Geldleistung unterschiedliche Orte gelten.'],
      ['schuldformen', 'Hol-, Bring- und Schickschuld auseinanderhalten', 'Bei der Holschuld hält der Schuldner die Leistung an seinem Ort bereit, bei der Bringschuld muss er sie zum Gläubiger bringen. Bei der [[vertrag-begriff-schickschuld|Schickschuld]] nimmt er die geschuldete Versandhandlung an seinem Ort vor, der Erfolg wird am Zielort erwartet. Allein die Übernahme von Versandkosten macht den Zielort nach § 269 Abs. 3 BGB nicht zum Leistungsort.', 'Geld ist nach § 270 Abs. 1 BGB im Zweifel auf Gefahr und Kosten des Schuldners zum Gläubiger zu übermitteln. § 270 Abs. 4 BGB lässt die Vorschriften über den Leistungsort unberührt. Leite daraus nicht pauschal ab, dass jede Zahlung schon mit der Überweisung erfüllt wäre.'],
      ['gefahr', 'Preisgefahr beim Transport prüfen', 'Nach § 446 BGB geht die [[vertrag-begriff-preisgefahr|Preisgefahr]] grundsätzlich mit Übergabe über. Beim Versendungskauf kann nach § 447 BGB unter den dortigen Voraussetzungen die Übergabe an die Transportperson maßgeblich sein. Beim Verbrauchsgüterkauf schränkt § 475 Abs. 2 BGB dies ein. Die Gefahr geht dort nach § 447 grundsätzlich nur über, wenn der Verbraucher die Transportperson selbst beauftragt hat, ohne dass der Unternehmer diese vorher benannt hatte.', 'Ein Feinkostbetrieb lässt auf eigenen Wunsch die Ware von einem Spediteur aus der Filiale des Lieferanten versenden. Ohne entgegenstehende Vereinbarung kann bei § 447 die Übergabe an den Spediteur entscheidend sein. Bei derselben Ware für eine Verbraucherin, die vom Unternehmer angebotenen Versand auswählt, ist § 475 Abs. 2 zu prüfen.'],
      ['bezug', 'Der Gerichtsort folgt einer eigenen Regel', '§ 29 ZPO knüpft an den Ort der streitigen Verpflichtung an. Der allgemeine Gerichtsstand nach §§ 12 ff. ZPO wird unabhängig davon bestimmt. Wer Zahlung verlangt, prüft den Leistungsort der Zahlung und nicht automatisch den der Lieferung.'],
    ],
    terms: [
      ['vertrag-begriff-erfuellungsort', 'Erfüllungsort (Leistungsort)', 'Ort, an dem der Schuldner die für die konkrete Pflicht geschuldete Leistungshandlung vorzunehmen hat.'],
      ['vertrag-begriff-schickschuld', 'Schickschuld', 'Schuld mit Versandhandlung an einem Ort und erwartetem Leistungserfolg an einem anderen Ort.'],
      ['vertrag-begriff-preisgefahr', 'Preisgefahr', 'Risiko, trotz zufälligen Untergangs oder zufälliger Verschlechterung der Kaufsache die Gegenleistung erbringen zu müssen.'],
    ],
    question: 'Eine Verbraucherin wählt im Shop den vom Händler angebotenen Paketdienst. Die Ware geht unterwegs ohne Verschulden verloren. Geht die Preisgefahr schon bei Abgabe des Pakets über?',
    answer: 'Grundsätzlich nicht. Beim Verbrauchsgüterkauf greift § 447 BGB wegen § 475 Abs. 2 nur in der eng geregelten Ausnahme einer selbst beauftragten, zuvor nicht vom Unternehmer benannten Transportperson. Der von ihm angebotene Dienst erfüllt diese Ausnahme nicht. Weitere Folgen hängen vom konkreten Leistungs- und Vertragsstand ab.',
    sources: [bgb, '§§ 269–270, 446–447, 474–475 BGB', '§ 29 ZPO: https://www.gesetze-im-internet.de/zpo/__29.html'],
  },
  {
    id: 'vertrag-fall-versand', parent: 'gerichtsstand', number: '2.5.2', title: 'Übungsfall zu Kaufvertrag, Versand und Gericht',
    intro: 'Ein Küchenbetrieb in Leipzig erhält einen Katalog eines Einrichters aus Dresden. Auf Anfrage erhält er ein bindendes Angebot über einen Arbeitstisch für 7.600 € und nimmt rechtzeitig und unverändert an.',
    parts: [
      ['lage', 'Aufgabenstellung', 'Der Leipziger Betrieb bittet um Versand per Transportfirma. Die Versandabrede begründet keine besondere Lieferpflicht zum Zielort. Beide handeln gewerblich. Eine weitere Orts- oder Gerichtsstandsklausel fehlt. Der Einrichter übergibt den Arbeitstisch vereinbarungsgemäß an den Transporteur. Der Tisch geht im weiteren Transport ohne Verschulden der Vertragsparteien verloren.', 'Prüfe, wann der Vertrag entstand, welche Pflichten beide Seiten haben, welche Leistungsorte gelten, wann die Preisgefahr überging und welches Gericht bei einer Zahlungsklage 2026 grundsätzlich in Betracht kommt.'],
      ['methodik', 'Die Prüfung schrittweise gliedern', '1. Katalog, verbindliches Einzelangebot und Annahme voneinander trennen. 2. Hauptpflichten aus § 433 BGB nennen. 3. Leistungsorte für Zahlung und Ware einzeln bestimmen. 4. Gefahrübergang anhand der Versandabrede prüfen. 5. Zuständigkeit anhand des Streitwerts und der Beklagtenseite begründen.'],
    ],
    terms: [],
    question: 'Wie lautet eine Kurzlösung für die beiden Leistungsorte, die Preisgefahr und das Gericht?',
    answer: 'Ware: grundsätzlich Dresden als Leistungsort der vereinbarten Versandhandlung. Geld: grundsätzlich Leipzig als Leistungsort des Käufers, der das Geld zum Einrichter übermitteln muss. Bei der vereinbarten B2B-Versendung greift nach dem Sachverhalt § 447 BGB mit Übergabe an den Transporteur. Für 7.600 € ist in einem gewöhnlichen neuen Zivilfall 2026 grundsätzlich das Amtsgericht zuständig, örtlich am Sitz des beklagten Betriebs in Leipzig. Der Katalog selbst war nur Einladung. Einzelangebot und rechtzeitige Annahme begründen die Pflichten aus § 433 BGB.',
    sources: [bgb, zpo, jurisdictionLaw],
  },
  {
    id: 'produkthaftung', parent: 'vertrag-durchsetzung', number: '2.6', title: 'Produkthaftung und Anspruchsgrundlagen',
    intro: 'Die Produkthaftung nach dem ProdHaftG ist eine verschuldensunabhängige Haftung für bestimmte Schäden durch fehlerhafte Produkte. Vertragsmängel und deliktische Produzentenhaftung sind eigenständig zu prüfen.',
    parts: [
      ['vergleich', 'Vier rechtliche Fragen auseinanderhalten', 'Zivilrechtlich kommen vertragliche Mängelrechte gegen den Vertragspartner, [[>produzentenhaftung|deliktische Produzentenhaftung]] etwa nach § 823 Abs. 1 BGB und verschuldensunabhängige [[vertrag-begriff-produkthaftung|Produkthaftung]] gegen die gesetzlichen Anspruchsgegner in Betracht. Ein Vertrag mit dem Hersteller ist für das ProdHaftG keine Voraussetzung. Mehrere Anspruchsgrundlagen können nebeneinander bestehen, ohne dass derselbe Schaden doppelt ersetzt wird.', 'Gesondert kann strafrechtliche Verantwortung natürlicher Personen zu prüfen sein, beispielsweise nach §§ 222 oder 229 StGB. Eine strafrechtliche Beurteilung ersetzt weder die Prüfung des zivilrechtlichen Anspruchs noch seine Voraussetzungen.'],
      ['schema', 'Prüfschema für vor dem Stichtag in Verkehr gebrachte Produkte', '1. Körper, Gesundheit oder Leben wurden beeinträchtigt oder ein erfasster Sachschaden entstand. 2. Die Ursache ist ein fehlerhaftes Produkt im Sinne der §§ 2 und 3 ProdHaftG. 3. Der Fehler verursachte den Schaden. 4. Der Anspruchsgegner fällt unter § 4. 5. Haftungsausschlüsse nach § 1 Abs. 2 und 3 sind zu prüfen. 6. Bestimme ersatzfähigen Schaden und etwaige Fristen.', 'Die Fehlerfrage richtet sich nach der berechtigten Sicherheitserwartung, unter anderem nach Darbietung, vernünftigerweise zu erwartendem Gebrauch und Zeitpunkt des Inverkehrbringens. Eine spätere Verbesserung allein beweist keinen Fehler. Die geschädigte Person trägt grundsätzlich die Beweislast für Fehler, Schaden und Ursächlichkeit. § 1 Abs. 4 regelt die Beweislast für die Ausschlussgründe gesondert.'],
      ['schaden', 'Sachschaden muss die gesetzlichen Grenzen erfüllen', 'Im bisherigen Recht muss eine andere als die fehlerhafte Sache beschädigt werden. Diese andere Sache muss ihrer Art nach gewöhnlich für privaten Ge- oder Verbrauch bestimmt und von der geschädigten Person überwiegend privat so verwendet worden sein. Der Schaden am fehlerhaften Produkt selbst ist kein solcher Sachschaden. Beim Defekt, der von einem Bauteil auf ein Endprodukt übergreift, ist die Frage nach der anderen Sache differenziert zu prüfen.', 'Beschädigt ein fehlerhafter Radiator einen privat verwendeten Tisch im Wohnraum, kann der Tischschaden erfasst sein. Die Reparatur des Radiators selbst prüfst du etwa im Vertragsrecht. Wird eine gewerblich eingesetzte Produktionsanlage beschädigt, prüfe außerhalb des bisherigen ProdHaftG gegebenenfalls Vertrags- und Deliktsrecht. Für einen erfassten Sachschaden bestimmt § 11 ProdHaftG in der bisherigen Fassung einen Selbstbehalt von 500 €. § 10 regelt einen Gesamtbetrag für bestimmte Personenschäden durch gleiche Produkte mit demselben Fehler.'],
      ['rechtsstand', 'Rechtsstand nach dem Zeitpunkt des Inverkehrbringens prüfen', 'Stand 18.11.2026. Das neue Produkthaftungsgesetz wurde bereits verkündet und gilt grundsätzlich ab 9. Dezember 2026. Nach § 23 der neuen Fassung gelten für Produkte, die davor in Verkehr gebracht oder in Betrieb genommen wurden, grundsätzlich die bis dahin geltenden Vorschriften weiter. Deshalb entscheidet der Produktstichtag über die Fassung, nicht allein das Datum des Schadens.', 'Die Neufassung erweitert unter anderem den Produktbegriff auf bestimmte Software und digitale Konstruktionsunterlagen, erfasst bestimmte Datenbeschädigungen und regelt Haftung weiterer Wirtschaftsakteure sowie Beweisoffenlegung und gesetzliche Vermutungen. Die Merkmale und Ausnahmen stehen in der neuen Fassung. Übertrage die 500-€-Grenze und die alte Paragraphennummerierung nicht auf neue Produkte ab dem Stichtag.'],
    ],
    terms: [['vertrag-begriff-produkthaftung', 'Produkthaftung', 'Verschuldensunabhängige Haftung nach dem Produkthaftungsgesetz für bestimmte durch ein fehlerhaftes Produkt verursachte Schäden.']],
    question: 'Ein fehlerhaftes Küchengerät wird vor dem 9. Dezember 2026 in Verkehr gebracht. Es beschädigt später sich selbst und einen privat genutzten Tisch. Welcher Sachschaden kommt im bisherigen ProdHaftG in Betracht?',
    answer: 'Zuerst ist die bisherige Fassung wegen des Produktstichtags zu prüfen. Der Tisch ist eine andere Sache und bei gewöhnlicher Bestimmung und überwiegend privater Nutzung grundsätzlich erfasst. Der Schaden am fehlerhaften Gerät selbst fällt nicht darunter. Es sind insbesondere Fehler, Kausalität, richtiger Anspruchsgegner und bisheriger Selbstbehalt zu prüfen.',
    sources: [productLaw, '§§ 437 ff., 823 BGB; §§ 222, 229 StGB: https://www.gesetze-im-internet.de/stgb/', 'Gesetz zur Modernisierung des Produkthaftungsrechts vom 22.10.2026, BGBl. 2026 I Nr. 321, Art. 1, Art. 17 und § 23 ProdHaftG n. F.: https://www.recht.bund.de/bgbl/1/2026/321/VO.html', 'Richtlinie (EU) 2024/2853: https://eur-lex.europa.eu/eli/dir/2024/2853/oj'],
  },
  {
    id: 'produkthaftung-rollenkette', parent: 'produkthaftung', number: '2.6.1', title: 'Hersteller, Importeur und Lieferant in der Produkthaftung',
    intro: 'Die richtige Anspruchsperson ergibt sich aus der gesetzlichen Rolle in der Lieferkette. Vertrieb, Herstellereindruck und Pflichten nach dem jeweiligen Rechtsstand sind getrennt zu prüfen.',
    parts: [
      ['rollen', 'Vier Rollen nach § 4 ProdHaftG bisheriger Fassung', 'Hersteller ist insbesondere, wer Endprodukt, Grundstoff oder Teilprodukt hergestellt hat. Ein [[vertrag-begriff-quasi-hersteller|Quasi-Hersteller]] gibt sich durch Namen, Marke oder ein anderes unterscheidungskräftiges Zeichen als Hersteller aus. Als Hersteller gilt außerdem derjenige, der ein Produkt zu einem erfassten Vertriebszweck im Rahmen seiner geschäftlichen Tätigkeit in den Europäischen Wirtschaftsraum einführt.'],
      ['lieferant', 'Auffangrolle des Lieferanten', 'Ist der Hersteller nicht feststellbar, kann nach § 4 Abs. 3 ProdHaftG der Lieferant als Hersteller gelten. Die Fiktion greift grundsätzlich nicht, wenn er der geschädigten Person innerhalb eines Monats nach Aufforderung den Hersteller oder seinen Lieferanten benennt. Bei Einfuhrprodukten gilt die Regel unter den gesetzlichen Voraussetzungen auch, wenn der Importeur nicht festgestellt werden kann.', 'Ein Händler verkauft eine Leuchte unter einer eigenen Marke. Die Vertriebsrolle allein entscheidet nicht. Prüfe zuerst, ob er sich als Hersteller ausgibt, dann Einfuhr und Auffangrolle. Für ab dem Stichtag erfasste Produkte prüfst du die differenzierte Neuregelung insbesondere §§ 3–5 und 10–13 ProdHaftG n. F.'],
      ['fristen', 'Verjährung und Erlöschen im bisherigen Gesetz trennen', '§ 12 ProdHaftG sieht im bisherigen Gesetz drei Jahre ab Kenntnis oder Kennenmüssen von Schaden, Fehler und Ersatzpflichtigem vor. Die Frist ist keine pauschale Dreijahresfrist zum Jahresende. Davon getrennt erlischt der Anspruch nach § 13 grundsätzlich zehn Jahre nach Inverkehrbringen des schädigenden Produkts durch den Ersatzpflichtigen. Beachte insbesondere die Ausnahme für bereits anhängige Verfahren.', 'Ein Produkt wird 2020 in Verkehr gebracht. Treten Schaden und Kenntnis aller Voraussetzungen erst 2028 ein, kann die Zehnjahresgrenze des § 13 dem rechnerischen Ende einer Dreijahresfrist bereits zuvorkommen. Das Datum der Kenntnis und das Datum des Inverkehrbringens müssen daher getrennt festgestellt werden.'],
    ],
    terms: [['vertrag-begriff-quasi-hersteller', 'Quasi-Hersteller', 'Wer sich durch Kennzeichnung eines Produkts mit eigenem Namen, eigener Marke oder einem sonstigen Kennzeichen als Hersteller ausgibt.']],
    question: 'Auf einer defekten Leuchte ist keine Herstellerangabe. Welche Frage stellst du dem Händler und welche Frist ist im bisherigen Gesetz maßgeblich?',
    answer: 'Prüfe, ob er Hersteller, Quasi-Hersteller oder Importeur ist. Wenn er nur Lieferant war und der Hersteller nicht feststellbar ist, fordere Auskunft an. Im bisherigen § 4 Abs. 3 kann er der Auffangrolle grundsätzlich entgehen, wenn er innerhalb eines Monats nach Aufforderung den Hersteller oder seinen eigenen Lieferanten benennt.',
    sources: [productLaw, '§§ 4, 12–13 ProdHaftG bisherige Fassung', 'Art. 1 Gesetz vom 22.10.2026 (BGBl. 2026 I Nr. 321): https://www.recht.bund.de/bgbl/1/2026/321/VO.html'],
  },
  {
    id: 'produzentenhaftung', parent: 'produkthaftung', number: '2.6.2', title: 'Deliktische Produzentenhaftung und Produktfehler',
    intro: 'Die Produzentenhaftung nach § 823 Abs. 1 BGB knüpft an die Verletzung geschützter Rechte und eine schuldhafte Pflichtverletzung an.',
    parts: [
      ['pflicht', 'Prüfe Rolle, Pflicht, Verletzung und Ursache', 'Für die [[vertrag-begriff-produzentenhaftung|Produzentenhaftung]] sind Rechtsgutverletzung, Verkehrssicherungspflicht und deren Verletzung, Ursächlichkeit, Rechtswidrigkeit, Verschulden und Schaden zu prüfen. Die Pflicht richtet sich nach der Funktion und dem Einflussbereich. Hersteller müssen notwendige und zumutbare Maßnahmen zur Gefahrenvermeidung treffen. Händler schulden nicht ohne Weiteres dieselbe Kontrolle der Konstruktion oder Fertigung. Konkrete Hinweise oder eigene Risiken können Pflichten auslösen.', 'Die Rechtsprechung kann bei Pflichten und Verschuldensfragen aus dem beherrschbaren Organisations- und Gefahrenbereich des Herstellers die Beweislast zugunsten der geschädigten Person erleichtern oder umkehren. Die geschädigte Person muss insbesondere Rechtsgutverletzung und ursächlichen Produktfehler nach den anwendbaren Regeln weiterhin darlegen und beweisen. Eine Umkehr für sämtliche Prüfungspunkte gibt es nicht.'],
      ['fehler', 'Vier typische Pflichtbereiche unterscheiden', 'Ein [[vertrag-begriff-konstruktion|Konstruktionsfehler]] betrifft das Sicherheitskonzept der Serie. Ein [[vertrag-begriff-fabrikation|Fabrikationsfehler]] bezeichnet die Abweichung eines Stückes von der geplanten sicheren Ausführung. Ein [[vertrag-begriff-instruktion|Instruktionsfehler]] betrifft fehlende oder unzureichende Hinweise zu Gebrauch und erkennbaren Risiken. Warnhinweise treten nicht ohne Weiteres an die Stelle erforderlicher konstruktiver Sicherung. Eine [[vertrag-begriff-produktbeobachtung|Produktbeobachtungspflicht]] betrifft Risiken, die sich nach dem Marktstart zeigen. Je nach Lage kommen Information, Warnung oder weitere angemessene Maßnahmen in Betracht.', 'Ein nicht erkennbares Entwicklungsrisiko, ein unvermeidbarer Fertigungsausreißer oder eine trotz guter Organisation vereinzelt auftretende Abweichung sind bei § 823 BGB und § 1 Abs. 2 ProdHaftG getrennt zu würdigen. Ein Fabrikationsfehler führt bei § 823 nicht zwingend zu feststehendem Verschulden, während das ProdHaftG grundsätzlich kein Verschulden voraussetzt.'],
      ['fallbezug', 'Zwei Urteile nach ihrem Ergebnis einordnen', 'Im Urteil VI ZR 1/12 ging es um einen explodierten Untertisch-Wassererwärmer. Der BGH hielt die bisherigen Feststellungen zu Fehler und Kausalität für unzureichend, hob auf und verwies zurück. Sicherheitszeichen und Warnhinweise sind keine automatische Entlastung. Eine bloß denkbare Ursache genügt aber ebenfalls nicht, um den Ersatzanspruch zu begründen.', 'Im Urteil VI ZR 1369/20 ging es um eine Verunreinigung eines als Düngemittel in Verkehr gebrachten Erzeugnisses. Der BGH stellte auf die tatsächliche Rolle der Lieferantin ab. Wer einem Stoff einen neuen Zweck gibt und ihn mit eigenen Produktinformationen als neues Erzeugnis erstmalig in Verkehr bringt, kann entsprechende Herstellerpflichten übernehmen. Eine physische Veränderung des Stoffes ist dafür nicht zwingend. Nicht jeder Händler ist allein wegen einer Weitergabe Hersteller.'],
    ],
    terms: [
      ['vertrag-begriff-produzentenhaftung', 'Produzentenhaftung', 'Deliktische Verantwortlichkeit nach § 823 BGB für eine schuldhafte Verletzung von Pflichten zum Schutz vor Produktgefahren.'],
      ['vertrag-begriff-konstruktion', 'Konstruktionsfehler', 'Sicherheitsmangel, der bereits in der Konzeption eines Produkts angelegt ist.'],
      ['vertrag-begriff-fabrikation', 'Fabrikationsfehler', 'Fehler eines hergestellten Stücks durch Abweichung von der vorgesehenen Beschaffenheit.'],
      ['vertrag-begriff-instruktion', 'Instruktionsfehler', 'Unzureichende Gebrauchsanweisung oder Warnung, obwohl Art und Ausmaß der Risiken entsprechende Hinweise erfordern.'],
      ['vertrag-begriff-produktbeobachtung', 'Produktbeobachtungspflicht', 'Pflicht zur angemessenen Beobachtung von Produktgefahren nach dem Inverkehrbringen und zur situationsgerechten Reaktion.'],
    ],
    question: 'Ein einzelner Ventilator hat einen Montagefehler und verletzt eine Person. Alle anderen Exemplare sind korrekt montiert. Was prüfst du in § 823 BGB anders als im ProdHaftG?',
    answer: 'Eine Stückabweichung spricht für Fabrikationsfehler. Im ProdHaftG prüfst du unter anderem Sicherheitserwartung, Schaden, Ursache und richtige Anspruchsperson, ohne Verschulden nachweisen zu müssen. Bei § 823 BGB prüfst du konkrete Verkehrssicherungspflichten und Verschulden, zum Beispiel anhand der Produktionsorganisation. Ein Ausreißer beweist Verschulden nicht automatisch. Für Kausalität müssen in beiden Wegen geeignete Belege vorliegen.',
    sources: [bgb, '§ 823 Abs. 1 BGB', productLaw, 'BGH, Urteil vom 05.02.2013, VI ZR 1/12: https://juris.bundesgerichtshof.de/cgi-bin/rechtsprechung/document.py?Art=en&Blank=1.pdf&Datum=2013-2&Gericht=bgh&Sort=1&anz=276&client=2&nr=63389&pos=20', 'BGH, Urteil vom 21.03.2023, VI ZR 1369/20: https://juris.bundesgerichtshof.de/cgi-bin/rechtsprechung/document.py?Art=en&Blank=1.pdf&Datum=2023-3-21&Gericht=bgh&anz=20&nr=133385&pos=12'],
  },
];

const subjectId = 'recht';
const idFor = (id: string) => `recht-${id}`;

function richText(value: string): RichText[] {
  return value.split(/(\[\[[^\]]+\]\])/).filter(Boolean).map(span => {
    const link = /^\[\[(>?)([^|]+)\|([^\]]+)\]\]$/.exec(span);
    if (!link) return { text: span };
    const [, article, id, text] = link;
    return article ? { text, articleId: idFor(id) } : { text, termId: id.startsWith('logistik-') ? id : idFor(id) };
  });
}

export const chapters: Chapter[] = lessons.map(lesson => ({
  id: idFor(lesson.id),
  subjectId,
  ...(lesson.parent ? { parentId: idFor(lesson.parent) } : {}),
  number: lesson.number,
  title: lesson.title,
  articleId: idFor(lesson.id),
}));

export const articles: Article[] = lessons.map(lesson => {
  const sections: ArticleSection[] = lesson.parts.map(([id, title, ...paragraphs]) => ({
    id,
    title,
    paragraphs: paragraphs.map(richText),
  }));
  if (lesson.id === 'verjaehrung-maengel') {
    sections.splice(2, 0, {
      id: 'fristvergleich',
      title: 'Frist und Beginn im Vergleich',
      paragraphs: [[{ text: 'Bestimme zuerst den Vertragstyp und dann den Gegenstand. Die Übersicht zeigt typische Fälle ohne Sonderregeln.' }]],
      matrix: {
        columns: ['Bewegliche Sache', 'Bauwerk'],
        rows: ['Kauf', 'Werk'],
        cells: [
          ['2 Jahre ab Ablieferung', '5 Jahre ab Übergabe oder Ablieferung*'],
          ['2 Jahre ab Abnahme**', '5 Jahre ab Abnahme'],
        ],
        description: '* Bei Grundstücken ab Übergabe, bei anderen Kaufgegenständen ab Ablieferung. Die Fünfjahresfrist setzt einen Fall nach § 438 Abs. 1 Nr. 2 BGB voraus. ** Bei einem Werk nach § 634a Abs. 1 Nr. 1 BGB.',
      },
    });
  }
  sections.push({
    id: 'rechtsquellen',
    title: 'Rechtsquellen und Stand',
    paragraphs: ['Geprüft am 18. November 2026.', ...lesson.sources].map(text => [{ text }]),
  }, {
    id: 'transferfrage',
    title: 'Selbstkontrolle',
    paragraphs: [[{ text: lesson.question }]],
    hint: { label: 'SELBSTKONTROLLE', title: 'Musterantwort', content: lesson.answer },
  });
  return {
    id: idFor(lesson.id),
    chapterId: idFor(lesson.id),
    subjectId,
    number: lesson.number,
    title: lesson.title,
    intro: lesson.intro,
    sections,
    updatedAt: Date.UTC(2026, 10, 18),
    version: 1,
  };
});

export const glossary: GlossaryTerm[] = lessons.flatMap(lesson => lesson.terms.map(([id, term, definition]) => ({
  id: idFor(id),
  articleId: idFor(lesson.id),
  subjectId,
  term,
  definition,
})));
