import Link from 'next/link';
import { getModelInfo } from '@/lib/api';

export default async function AboutPage() {
  const modelInfo = await getModelInfo();

  const techStack = [
    {
      category: 'Frontend',
      technologies: [
        'Next.js 15 (App Router)',
        'React 19',
        'TypeScript',
        'Tailwind CSS',
      ],
    },
    {
      category: 'Backend',
      technologies: [
        'Next.js API Routes',
        'Node.js Runtime',
        'Server Components',
        'RESTful API',
      ],
    },
    {
      category: 'AI/ML',
      technologies: [
        'Hugging Face Inference API',
        'BERT Model (Medical NLP)',
        'Clinical Text Classification',
      ],
    }
  ];

  return (
    <>
      <header className="mb-8">
          <Link href="/" className="text-blue-600 hover:text-blue-700 text-sm mb-4 inline-flex items-center gap-1">
            <span className="translate-y-[-2px]">←</span>
            <span>Back to Analyzer</span>
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">About This App</h1>
          <p className="text-gray-600">
            Learn about the technology powering this medical text analyzer
          </p>
        </header>

        <div className="space-y-6">
          {/* App Info */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">What is this?</h2>
            <p className="text-gray-700 leading-relaxed">
              This is a Next.js application that demonstrates modern web development with AI integration.
              It uses machine learning to analyze medical text and provide confidence scores for different
              clinical assertions.
            </p>
          </div>

          {/* Model Info */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">AI Model</h2>
            <div className="space-y-3">
              <div>
                <span className="font-semibold text-gray-700">Model:</span>
                <p className="text-gray-600">{modelInfo.modelName}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Model ID:</span>
                <p className="text-gray-600 text-sm font-mono bg-gray-50 p-2 rounded">
                  {modelInfo.modelId}
                </p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Description:</span>
                <p className="text-gray-600">{modelInfo.description}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Capabilities:</span>
                <ul className="list-disc list-inside text-gray-600 mt-2 space-y-1">
                  {modelInfo.capabilities.map((capability, index) => (
                    <li key={index}>{capability}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Performance */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Performance</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="font-semibold text-gray-700">Accuracy:</span>
                <p className="text-2xl font-bold text-green-600">{modelInfo.performance.accuracy}</p>
              </div>
              <div>
                <span className="font-semibold text-gray-700">Training Data:</span>
                <p className="text-gray-600">{modelInfo.performance.trainingData}</p>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Technology Stack</h2>
            <div className="grid grid-cols-3 gap-4">
              {techStack.map((stack, index) => (
                <div key={index}>
                  <span className="font-semibold text-blue-600">{stack.category}:</span>
                  <ul className="text-gray-600 mt-1">
                    {stack.technologies.map((tech, techIndex) => (
                      <li key={techIndex}>• {tech}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
      </div>
    </>
  );
}
