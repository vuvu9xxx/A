import React, { useState, useCallback } from 'react';
import type { HeadlineId, TextId, SelectedAnswers, Results, ResultStatus } from './types';
import { HEADLINES, TEXTS, CORRECT_ANSWERS } from './constants';
import HeadlineList from './components/HeadlineList';
import QuizItem from './components/QuizItem';

const initialAnswers: SelectedAnswers = {};
const initialResults: Results = TEXTS.reduce((acc, text) => {
    acc[text.id] = 'unchecked';
    return acc;
}, {} as Results);


const App: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<SelectedAnswers>(initialAnswers);
  const [results, setResults] = useState<Results>(initialResults);
  const [score, setScore] = useState<number | null>(null);
  const [showKey, setShowKey] = useState<boolean>(false);

  const handleSelectChange = (textId: TextId, value: HeadlineId | '') => {
    setSelectedAnswers(prev => ({ ...prev, [textId]: value }));
    // Reset results when user changes an answer after grading
    if (score !== null) {
        setResults(initialResults);
        setScore(null);
        setShowKey(false);
    }
  };

  const handleGrade = useCallback(() => {
    // FIX: Explicitly type the arguments of the reduce callback to prevent `val` from being inferred as `unknown`.
    const counts = Object.values(selectedAnswers).reduce((acc: Record<string, number>, val: HeadlineId | '') => {
      if (val) acc[val] = (acc[val] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const newResults: Results = {} as Results;
    let correctCount = 0;

    TEXTS.forEach(textItem => {
      const textId = textItem.id;
      const selected = selectedAnswers[textId];
      
      if (!selected) {
        newResults[textId] = 'unchecked';
        return;
      }

      if (counts[selected] > 1) {
        newResults[textId] = 'duplicate';
      } else if (selected === CORRECT_ANSWERS[textId]) {
        newResults[textId] = 'correct';
        correctCount++;
      } else {
        newResults[textId] = 'incorrect';
      }
    });
    
    setResults(newResults);
    setScore(correctCount);
    setShowKey(false);
  }, [selectedAnswers]);

  const handleReset = useCallback(() => {
    setSelectedAnswers(initialAnswers);
    setResults(initialResults);
    setScore(null);
    setShowKey(false);
  }, []);

  const handleShowKey = useCallback(() => {
    setShowKey(prev => !prev);
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-8 font-sans">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Leseverstehen Teil 1
        </h1>
        <div className="text-lg text-gray-600 space-y-2">
            <p>Lesen Sie die Überschriften a–j und die Texte 1–5. Finden Sie für jeden Text die passende Überschrift.</p>
            <p>Sie können jede Überschrift nur einmal benutzen.</p>
            <p>Markieren Sie Ihre Lösungen für die Aufgaben 1–5.</p> 
        </div>
      </header>

      <main className="grid grid-cols-1 lg:grid-cols-2 lg:gap-8 gap-y-8">
        <HeadlineList headlines={HEADLINES} />
        
        <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <h2 className="text-xl font-bold text-gray-800 m-0 mb-4">Texte & Zuordnung</h2>
          <div>
            {TEXTS.map(textItem => (
              <QuizItem
                key={textItem.id}
                textItem={textItem}
                selectedValue={selectedAnswers[textItem.id]}
                result={results[textItem.id]}
                onChange={(value) => handleSelectChange(textItem.id, value)}
              />
            ))}
          </div>
          
          <div className="flex flex-wrap items-center gap-4 mt-6">
            <button
              onClick={handleGrade}
              className="px-5 py-2.5 font-semibold text-white bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg shadow-md hover:from-blue-700 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-transform transform hover:scale-105"
            >
              Auswerten
            </button>
            <button
              onClick={handleReset}
              className="px-5 py-2.5 font-semibold text-gray-700 bg-gray-200 border border-gray-300 rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors"
            >
              Zurücksetzen
            </button>
            {score !== null && (
              <button
                onClick={handleShowKey}
                className="px-5 py-2.5 font-semibold text-blue-600 bg-blue-100 border border-blue-200 rounded-lg hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400 transition-colors"
              >
                {showKey ? 'Lösungen ausblenden' : 'Lösungen anzeigen'}
              </button>
            )}
            {score !== null && (
              <div className="font-bold text-lg p-2.5">
                Ergebnis:
                <span className={score === TEXTS.length ? 'text-green-600' : 'text-red-600'}>
                  {' '}{score}/{TEXTS.length}
                </span>
              </div>
            )}
          </div>
          
          {showKey && (
            <div className="mt-6 p-4 bg-gray-100 border border-gray-200 rounded-lg">
              <h3 className="font-bold text-gray-800 mb-2">Lösungen:</h3>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                {Object.entries(CORRECT_ANSWERS).map(([key, value]) => (
                  <div key={key} className="text-sm">
                    <span className="font-semibold">Text {key.replace('t', '')}</span> → <code className="bg-gray-200 p-1 rounded-md text-blue-800 font-mono">{value}</code>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
      
      <footer className="text-center text-gray-500 text-sm mt-12">
        <p>Hinweis: Sie können diese Seite speichern und zur Offline-Nutzung im Browser öffnen.</p>
      </footer>
    </div>
  );
};

export default App;
