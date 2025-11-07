'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AnalysisResult } from '@/types';

export default function Home() {
  const [text, setText] = useState('');
  const [results, setResults] = useState<AnalysisResult[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getColorClasses = (score: number) => {
    const percentage = score * 100;

    const colorRanges = [
      { min: 70, border: 'border-green-500', bg: 'bg-green-500', text: 'text-green-600' },
      { min: 40, border: 'border-yellow-500', bg: 'bg-yellow-500', text: 'text-yellow-600' },
      { min: 0,  border: 'border-red-500', bg: 'bg-red-500', text: 'text-red-600' }
    ];

    return colorRanges.find(range => percentage >= range.min)!;
  };

  const exampleTexts = [
    "Patient has no signs of infection or fever",
    "Symptoms are clearly present and worsening",
    "Diagnosis is possible but requires further testing"
  ];

  const handleAnalyze = async () => {
    if (!text.trim()) {
      setError('Please enter some medical text to analyze');

      return;
    }

    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to analyze text');
      }

      setResults(data.analysis);

      // Save to localStorage for history
      const historyItem = {
        id: Date.now().toString(),
        text: text,
        results: data.analysis,
        timestamp: new Date().toISOString(),
      };

      const existingHistory = JSON.parse(localStorage.getItem('analysisHistory') || '[]');
      const updatedHistory = [historyItem, ...existingHistory].slice(0, 10); // Keep last 10

      localStorage.setItem('analysisHistory', JSON.stringify(updatedHistory));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <header className="text-center mb-12">
          <div className="flex justify-end gap-4 mb-4">
            <Link href="/about" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              About
            </Link>
            <Link href="/feedback" className="text-blue-600 hover:text-blue-700 font-medium text-sm">
              Feedback
            </Link>
            <Link href="/history" className="text-blue-600 hover:text-blue-700 font-medium text-sm inline-flex items-center gap-1">
              <span>View History</span>
            </Link>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Medical Text Analyzer
          </h1>
          <p className="text-gray-600">
            AI-powered clinical text analysis with confidence scores
          </p>
        </header>

        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <label htmlFor="medical-text" className="block text-sm font-medium text-gray-700 mb-2">
            Enter Medical Text
          </label>
          <textarea
            id="medical-text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            placeholder="Example: patient presents with fever, cough, and shortness of breath"
          />

          <div className="mt-3">
            <p className="text-xs text-gray-600 mb-2">Quick examples:</p>
            <div className="flex flex-wrap gap-2">
              {exampleTexts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => setText(example)}
                  className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors cursor-pointer"
                >
                  Example {index + 1}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={loading}
            className="mt-4 w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer transition-colors"
          >
            {loading ? 'Analyzing...' : 'Analyze Text'}
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
            <p className="font-medium">Error</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {results && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Analysis Results</h2>
            <div className="space-y-3">
              {results.map((result, index) => {
                const colors = getColorClasses(result.score);
                return (
                  <div key={index} className={`border-l-4 ${colors.border} pl-4 py-2`}>
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-medium text-gray-800">{result.label}</span>
                      <span className={`text-sm font-semibold ${colors.text}`}>
                        {(result.score * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`${colors.bg} h-2 rounded-full transition-all duration-500`}
                        style={{ width: `${result.score * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
    </>
  );
}
