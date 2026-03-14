export interface OpenAIAnalyzeRequest {
  prospectBio: string;
}

export interface OpenAIGenerateRequest {
  discProfile: object;
  serviceDescription: string;
  prospectName?: string;
}

export interface OpenAIResponse<T> {
  data: T | null;
  error: string | null;
}
