'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnalysisResult, HistoryItem } from '@/types';

export default function HistoryPage() {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('analysisHistory');

    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('analysisHistory');
    setHistory([]);
  };

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString('fr-FR', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getTopPrediction = (results: AnalysisResult[]) =>
    results.reduce((prev, current) =>
      (prev.score > current.score) ? prev : current
    );

  return (
    <>
      <header className="mb-8">
          <div className="flex gap-4 mb-4">
            <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm inline-flex items-center gap-1">
              <span className="translate-y-[-2px]">←</span>
              <span>Back to Analyzer</span>
            </Link>
            <Link href="/about" className="text-blue-600 hover:text-blue-700 text-sm">
              About
            </Link>
          </div>
          <div className="flex justify-between items-center">
            <h1 className="text-4xl font-bold text-gray-800">Analysis History</h1>
            {history.length > 0 && (
              <button onClick={clearHistory} className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm transition-colors cursor-pointer">
                Clear History
              </button>
            )}
          </div>
          <p className="text-gray-600 mt-2">Your last {history.length} analyses</p>
        </header>

        {history.length === 0 ? (
          <div className="bg-white rounded-lg shadow-lg p-12 text-center">
            <p className="text-gray-500 mb-4">No analysis history yet</p>
            <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium">
              Analyze your first text →
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {history.map((item) => {
              const topPrediction = getTopPrediction(item.results);
              return (
                <div key={item.id} className="bg-white rounded-lg shadow-lg p-6">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <p className="text-gray-700 mb-2">{item.text}</p>
                      <p className="text-xs text-gray-500">{formatDate(item.timestamp)}</p>
                    </div>
                    <div className="ml-4 text-right">
                      <span className="text-sm font-semibold text-blue-600">
                        {topPrediction.label}
                      </span>
                      <p className="text-xs text-gray-500">
                        {(topPrediction.score * 100).toFixed(1)}% confidence
                      </p>
                    </div>
                  </div>

                  <details className="mt-3">
                    <summary className="text-sm text-blue-600 cursor-pointer hover:text-blue-700">
                      View all results
                    </summary>
                    <div className="mt-3 space-y-2">
                      {item.results.map((result, index) => (
                        <div key={index} className="flex justify-between text-sm">
                          <span className="text-gray-700">{result.label}</span>
                          <span className="text-gray-600">{(result.score * 100).toFixed(1)}%</span>
                        </div>
                      ))}
                    </div>
                  </details>
                </div>
              );
            })}
          </div>
        )}
    </>
  );
}
