import { ModelResponse } from '@/@types/global-app.dto';

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

export const fetchImage = async (prompt: string): Promise<string> => {
  console.log('PROMPT COMMINGF FROM UI =>>>>, prompt');
  const response = await fetch(
    `/api/fetch-image?prompt=${encodeURIComponent(prompt)}`,
    {
      method: 'POST',
    }
  );
  if (!response.ok) {
    throw new Error('Failed to fetch image');
  }
  const data = await response.json();
  return data.image;
};

export const fetchCaption = async (
  prompt: string,
  setResponsText: React.Dispatch<React.SetStateAction<string>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  try {
    const response: Response = await fetch(
      `/api/fetch-caption?prompt=${encodeURIComponent(prompt)}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // <-- Corrected content type (typo: "application-json" to "application/json")
        },
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong');
    }

    const reader = response.body?.getReader();
    if (!reader) {
      throw new Error('Unable to read response body.');
    }

    const decoder = new TextDecoder();

    while (true) {
      const { done, value } = await reader.read(); // Ensure this returns a ReadableStreamReadResult<Uint8Array>

      if (done) break;

      if (value) {
        const chunkOfText = decoder.decode(value, { stream: true }); // Added `{ stream: true }` for efficient streaming
        setResponsText((pre) => pre + chunkOfText);
      }
    }
  } catch (error) {
    console.log(error);
    setResponsText('Cannot retrieve Response from Gemini API');
  } finally {
    setLoading(false);
  }
};

// const response = await fetch(
//   `/api/fetch-caption?prompt=${encodeURIComponent(prompt)}`
// );
// if (!response.ok) {
//   throw new Error('Failed to fetch caption');
// }
// const data = await response.json();
// return data.caption;
