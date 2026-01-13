export interface AnalysisResult {
  label: string;
  score: number;
}

export interface HistoryItem {
  id: string;
  text: string;
  results: AnalysisResult[];
  timestamp: string;
}
