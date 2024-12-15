import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const prompt = request.nextUrl.searchParams.get('prompt');

    if (!prompt) {
      return new Response(
        JSON.stringify({ message: 'Prompt is required by the user' }),
        { status: 400 }
      );
    }

    const imageResponse = await fetch(
      `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`
    );

    if (!imageResponse.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch image' }), {
        status: 500,
      });
    }

    const imageUrl = imageResponse.url;

    const textResponse = await fetch(
      `https://text.pollinations.ai/Generate caption which is maximum 100 words with hashtag for instagram post for this${encodeURIComponent(
        prompt
      )}`
    );

    if (!textResponse.ok) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch caption' }),
        { status: 500 }
      );
    }

    if (textResponse.body === null) {
      return new Response(
        JSON.stringify({ error: 'Failed to fetch caption body' }),
        { status: 500 }
      );
    }

    const reader = (
      textResponse.body as ReadableStream<Uint8Array>
    ).getReader();

    const stream = new ReadableStream({
      start(controller) {
        const imageJson = JSON.stringify({ image: imageUrl });
        controller.enqueue(new TextEncoder().encode(imageJson + '\n\n'));

        function push() {
          readers
            .read()
            .then(({ done, value }) => {
              if (done) {
                controller.close();
                return;
              }

              controller.enqueue(value);
              push();
            })
            .catch((error) => {
              console.error('Stream reading error:', error);
              controller.close();
            });
        }

        push();
      },
    });

    console.log('STREAAAM-=>>>.', stream);
    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch (error) {
    console.error('Internal server error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
};
