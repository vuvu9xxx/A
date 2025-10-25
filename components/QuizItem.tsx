import React, { useState, useRef, useEffect } from 'react';
import type { TextItem, HeadlineId, ResultStatus } from '../types';
import { HEADLINE_OPTIONS } from '../constants';

interface QuizItemProps {
  textItem: TextItem;
  selectedValue: HeadlineId | '' | undefined;
  result: ResultStatus;
  onChange: (value: HeadlineId | '') => void;
}

const QuizItem: React.FC<QuizItemProps> = ({ textItem, selectedValue, result, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  
  const resultClasses: Record<ResultStatus, string> = {
    unchecked: 'border-gray-400 focus:border-blue-500 focus:ring-blue-500',
    correct: 'border-green-500 ring-green-500 bg-green-50',
    incorrect: 'border-red-500 ring-red-500 bg-red-50',
    duplicate: 'border-orange-400 ring-orange-400 bg-orange-50',
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (value: HeadlineId | '') => {
    onChange(value);
    setIsOpen(false);
  };

  const selectedOption = HEADLINE_OPTIONS.find(opt => opt.value === selectedValue);
  const displayLabel = selectedOption ? selectedOption.label : '- Bitte wählen -';

  return (
    <article className="grid grid-cols-[auto,1fr] md:grid-cols-[60px,1fr] gap-4 items-start py-4 border-b border-gray-200 last:border-b-0">
      <div>
        <span className="inline-block bg-gray-100 border border-gray-300 rounded-full px-3 py-1 text-sm font-medium text-gray-700">
          Text {textItem.id.replace('t', '')}
        </span>
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-base text-gray-700 leading-relaxed m-0">{textItem.content}</p>
        <div className="relative w-full" ref={wrapperRef}>
            <button
                type="button"
                id={textItem.id}
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-label={`Überschrift für Text ${textItem.id.replace('t', '')}`}
                className={`w-full box-border whitespace-nowrap overflow-hidden text-ellipsis bg-gray-200 text-gray-800 border-2 rounded-lg py-2 px-3 text-[15px] font-sans transition-all duration-200 focus:outline-none focus:ring-2 text-left flex justify-between items-center ${resultClasses[result]}`}
            >
                <span className="truncate">{displayLabel}</span>
                <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 text-gray-600 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
            </button>
            {isOpen && (
                <ul
                    role="listbox"
                    aria-labelledby={textItem.id}
                    tabIndex={-1}
                    className="absolute top-full mt-1 w-full bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto focus:outline-none"
                >
                    <li
                        role="option"
                        aria-selected={!selectedValue}
                        onClick={() => handleOptionClick('')}
                        className="cursor-pointer hover:bg-gray-100 py-2 px-3 text-[15px] font-sans"
                    >
                        - Bitte wählen -
                    </li>
                    {HEADLINE_OPTIONS.map(opt => (
                        <li
                            key={opt.value}
                            role="option"
                            aria-selected={selectedValue === opt.value}
                            onClick={() => handleOptionClick(opt.value)}
                            className={`cursor-pointer hover:bg-blue-50 py-2 px-3 text-[15px] font-sans ${selectedValue === opt.value ? 'bg-blue-100 font-semibold' : ''}`}
                        >
                            {opt.label}
                        </li>
                    ))}
                </ul>
            )}
        </div>
      </div>
    </article>
  );
};

export default QuizItem;
