# Medical Text Analyzer

AI-powered clinical text analysis with confidence scores using Next.js and Hugging Face.

## Overview

This web application analyzes medical and clinical text using a fine-tuned BERT model, providing confidence scores for different clinical assertions. Built as a demonstration of Next.js fundamentals and modern web development practices.

## Features

- **Real-time Analysis**: Analyze medical text with AI-powered predictions
- **Confidence Scores**: Visual representation of prediction confidence with color-coded results
- **Analysis History**: Track your last 10 analyses with localStorage
- **Server Actions**: Modern Next.js pattern for form submissions
- **Responsive Design**: Clean, modern UI with TailwindCSS

## Tech Stack

### Frontend
- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS

### Backend
- Next.js API Routes
- Node.js Runtime
- Server Components
- RESTful API

### AI/ML
- Hugging Face Inference API
- BERT Model (Medical NLP)
- Clinical Text Classification

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn
- Hugging Face API account

### Installation

1. Clone the repository:
```bash
git clone https://github.com/stepan-khomenko//medical-text-analyzer.git
cd medical-text-analyzer
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env.local` file in the root directory:
```bash
HUGGINGFACE_API_KEY=your_api_key_here
HUGGINGFACE_MODEL_URL=https://router.huggingface.co/hf-inference/models/bvanaken/clinical-assertion-negation-bert
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Model Information

This project uses the **Clinical Assertion Negation BERT** model:
- Model ID: `bvanaken/clinical-assertion-negation-bert`
- Fine-tuned on clinical notes and medical literature
- Specializes in detecting negation and assertion in medical text
