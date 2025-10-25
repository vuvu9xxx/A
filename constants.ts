
import type { Headline, TextItem, CorrectAnswers, HeadlineId } from './types';

export const HEADLINES: Headline[] = [
  { id: 'a', text: 'Immer mehr deutsche Familien reisen mit der Bahn' },
  { id: 'b', text: 'Buchtipp: Hilfe bei Schlafproblemen' },
  { id: 'c', text: 'Der Computer: Liebstes Hobby von Deutschlands Frauen' },
  { id: 'd', text: 'Neu bei der Bahn: Spezielle Informationen und Angebote für Radfahrer' },
  { id: 'e', text: 'Neu am Markt: Billige Schlaftabletten' },
  { id: 'f', text: 'Familien reisen billiger' },
  { id: 'g', text: 'Urlaub mit dem Fahrrad in Deutschland immer beliebter' },
  { id: 'h', text: 'Kultur im Urlaub: Interessen je nach Alter unterschiedlich' },
  { id: 'i', text: 'Umfrage: Wer verwendet den Computer am häufigsten?' },
  { id: 'j', text: 'Deutschland: Immer mehr Touristen reisen in den Westen' },
];

export const TEXTS: TextItem[] = [
  {
    id: 't1',
    content: 'Wer ist der typische Computerfan? Das B.A.T. Freizeitforschungsinstitut Hamburg ermittelte einige Eigenschaften: Er ist männlich, jung und hat einen höheren Schulabschluss. Bei der Beschäftigung am heimischen Computer stehen Textverarbeitung und Spiele ganz oben, es folgen private Buchhaltung, Grafikprogramme und Tabellenkalkulation.'
  },
  {
    id: 't2',
    content: '„Bahn&Bike" heißt ein 222-seitiger Prospekt, den die Deutsche Bahn AG in Zusammenarbeit mit der Deutschen Zentrale für Tourismus herausgebracht hat. Er enthält umfangreiche Informationen für alle, die ihren Radurlaub mit Bahnfahrten verbinden wollen: Angaben zu Streckenlängen und Wegbeschaffenheit, Adressen von Verleihstationen, Hinweise zu Sehenswürdigkeiten sowie Unterkünfte – ergänzt durch Karten. Erhältlich in Buchhandlungen oder DB Reisezentren.'
  },
  {
    id: 't3',
    content: 'Ausführliche Informationen zum Thema „Schlafstörungen" finden Sie im gleichnamigen Patient-Ratgeber von Dr. med. Fritz Hohagen. Sie erfahren, was den Schlaf stört und was Sie dagegen unternehmen können. Für 9,95 Euro im Buchhandel oder direkt beim Verlag.'
  },
  {
    id: 't4',
    content: 'Jetzt wird für Familien Reisen mit der Bahn zwischen Ostsee und Bodensee ein gutes Stück günstiger. Ab dem 6. Oktober gibt es den Familien-SuperSparpreis. Kinder bis zum vollendeten 17. Lebensjahr reisen kostenlos mit, sofern mindestens ein Eltern- oder Großelternteil mitfährt.'
  },
  {
    id: 't5',
    content: 'Touristen zwischen 14 und 29 Jahren besuchen besonders gerne Discos, während die Gruppe der 30- bis 39‑jährigen häufiger Theater und Museen wählt. Eine neue Analyse zeigt außerdem: Einkommen und Schulbildung beeinflussen die Auswahl der Ziele, and viele Urlauber möchten Kultur, Land and Leute kennenlernen.'
  }
];

export const CORRECT_ANSWERS: CorrectAnswers = {
  t1: 'i',
  t2: 'd',
  t3: 'b',
  t4: 'f',
  t5: 'h'
};

export const HEADLINE_OPTIONS: { value: HeadlineId; label: string }[] = HEADLINES.map(h => ({
  value: h.id,
  label: `${h.id} - ${h.text}`
}));
