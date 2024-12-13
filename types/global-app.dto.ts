export type ModelInput = {
  prompt: string;
};

export interface ModelResponse {
  image: string; // Image URL
  caption: string; // Caption text
}

export type ModelError = {
  error: string;
};
