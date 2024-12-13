export type ModelInput = {
  prompt: string;
};

export type ModelResponse = {
  prompt: string;
  image: string;
  caption: string;
};

export type ModelError = {
  error: string;
};
