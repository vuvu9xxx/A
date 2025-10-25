
export type HeadlineId = 'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h' | 'i' | 'j';
export type TextId = 't1' | 't2' | 't3' | 't4' | 't5';

export interface Headline {
  id: HeadlineId;
  text: string;
}

export interface TextItem {
  id: TextId;
  content: string;
}

export type CorrectAnswers = Record<TextId, HeadlineId>;
export type SelectedAnswers = Partial<Record<TextId, HeadlineId | ''>>;
export type ResultStatus = 'correct' | 'incorrect' | 'duplicate' | 'unchecked';
export type Results = Record<TextId, ResultStatus>;
