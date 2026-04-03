// Tipos da aplicação

export interface Feedback {
  id: string;
  session_id: number;
  text: string;
  created_at: string;
}

export interface WordCloudWord {
  text: string;
  value: number;
}

export interface InsertFeedback {
  session_id: number;
  text: string;
}
