'use client';

import { useState } from 'react';
import Link from 'next/link';
import { submitFeedback } from '@/app/actions';

export default function FeedbackPage() {
  const [pending, setPending] = useState(false);
  const [result, setResult] = useState<{ success: boolean; message?: string; error?: string } | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;  // Save reference before async!

    setPending(true);
    setResult(null);

    const formData = new FormData(form);

    // Call Server Action directly!
    const response = await submitFeedback(formData);

    setPending(false);
    setResult(response);

    if (response.success) {
      // Reset form on success
      form.reset();
    }
  };

  return (
    <>
      <header className="mb-8">
        <Link
          href="/"
          className="text-blue-600 hover:text-blue-700 text-sm mb-4 inline-flex items-center gap-1"
        >
          <span className="translate-y-[-2px]">←</span>
          <span>Back to Analyzer</span>
        </Link>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">Send Feedback</h1>
        <p className="text-gray-600">
          Help us improve the Medical Text Analyzer
        </p>
      </header>

      <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="your.email@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              placeholder="Share your thoughts, suggestions, or report issues"
            />
          </div>

          <button
            type="submit"
            disabled={pending}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors cursor-pointer"
          >
            {pending ? 'Sending...' : 'Send Feedback'}
          </button>
        </form>

        {result && (
          <div className={`mt-4 p-4 rounded-lg ${
            result.success
              ? 'bg-green-50 border border-green-200 text-green-700'
              : 'bg-red-50 border border-red-200 text-red-700'
          }`}>
            <p className="font-medium">
              {result.success ? '✓ Success' : '✗ Error'}
            </p>
            <p className="text-sm mt-1">
              {result.success ? result.message : result.error}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
