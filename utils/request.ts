import { ModelResponse } from '@/types/global-app.dto';

export const fetchDataFromModel = async (
  prompt: string,
  onCaptionChunk: (chunk: string) => void
): Promise<ModelResponse | undefined> => {
  try {
    const res = await fetch(
      `/api/image-generate?prompt=${encodeURIComponent(prompt)}`
    );

    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }

    if (!res.body) {
      throw new Error('Response body is empty');
    }

    const reader = res.body.getReader();
    const decoder = new TextDecoder();
    let imageUrl = '';
    let captionText = '';
    let isFirstChunk = true;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value, { stream: true });

      if (isFirstChunk) {
        try {
          const [imagePart, ...captionParts] = chunk.split('\n\n');
          const json = JSON.parse(imagePart);
          if (json.image) {
            imageUrl = json.image;
          }
          captionText += captionParts.join('\n\n');

          isFirstChunk = false;
        } catch (e) {
          console.error('Failed to parse image URL from chunk:', chunk);
        }
        continue;
      }

      captionText += chunk;
      onCaptionChunk(captionText);
    }

    return {
      image: imageUrl,
      caption: captionText,
    };
  } catch (error) {
    return undefined;
  }
};

export const typeCaption = (
  fullCaption: string,
  setCaption: React.Dispatch<React.SetStateAction<string>>,
  speed: number = 10
) => {
  let index = 0;
  const typingInterval = setInterval(() => {
    if (index < fullCaption.length) {
      setCaption((prev) => prev + fullCaption[index]);
      index++;
    } else {
      clearInterval(typingInterval);
    }
  }, speed);
};
