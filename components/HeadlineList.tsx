import React from 'react';
import type { Headline } from '../types';

interface HeadlineListProps {
  headlines: Headline[];
}

const HeadlineList: React.FC<HeadlineListProps> = ({ headlines }) => {
  return (
    <section className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <h2 className="text-xl font-bold text-gray-800 m-0">Überschriften (a–j)</h2>
        <span className="text-xs font-medium text-blue-800 bg-blue-100 border border-blue-200 rounded-full px-3 py-1">
          Jede Überschrift nur einmal
        </span>
      </div>
      <div className="grid grid-cols-[auto,1fr] gap-x-4 gap-y-3 mt-5">
        {headlines.map(({ id, text }) => (
          <React.Fragment key={id}>
            <b className="font-semibold text-gray-700 text-right">{id}</b>
            <div className="text-gray-600">{text}</div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default HeadlineList;
