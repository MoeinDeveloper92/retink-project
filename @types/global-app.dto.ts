export type ModelInput = {
  prompt: string;
};

export interface ModelResponse {
  image: string;
  caption: string;
}

export type ModelError = {
  error: string;
};
