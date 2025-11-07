export async function getModelInfo() {
  // Simulating async data fetch on server: In real app, this could be a database query or API call
  await new Promise(resolve => setTimeout(resolve, 100));

  return {
    modelName: 'Clinical Assertion Negation BERT',
    modelId: 'bvanaken/clinical-assertion-negation-bert',
    description: 'A BERT-based model fine-tuned for clinical text analysis, specialized in detecting assertion status in medical notes.',
    capabilities: [
      'Detects presence/absence of medical conditions',
      'Identifies possible diagnoses requiring further testing',
      'Analyzes clinical assertion in medical text'
    ],
    performance: {
      accuracy: '94.2%',
      trainingData: 'Clinical notes and medical literature'
    }
  };
}
