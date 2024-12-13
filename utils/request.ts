import { ModelInput, ModelResponse } from '@/types/global-app.dto';

export const fetchDataFromModel = async (
  prompt: string
): Promise<ModelResponse | undefined> => {
  try {
    const res = await fetch(
      `/api/image-generate?prompt=${encodeURIComponent(prompt)}`
    );
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    if (res.status === 200) {
      const data: ModelResponse = await res.json();
      return data;
    }
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
