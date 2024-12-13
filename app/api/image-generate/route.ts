import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const prompt = request.nextUrl.searchParams.get('prompt');

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required by the user' },
        { status: 400 }
      );
    }

    const imageResponse = await fetch(
      `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`
    );

    if (!imageResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch image' },
        { status: 500 }
      );
    }

    const imageUrl = imageResponse.url;

    const textResponse = await fetch(
      `https://text.pollinations.ai/Generate caption which is maximum 100 words with hashtag for instagram post for this${encodeURIComponent(
        prompt
      )}`
    );

    if (!textResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch caption' },
        { status: 500 }
      );
    }

    const stream = new ReadableStream({
      start(controller) {
        const imageJson = JSON.stringify({ image: imageUrl });
        controller.enqueue(new TextEncoder().encode(imageJson + '\n\n'));

        const reader = textResponse.body.getReader();
        function push() {
          reader.read().then(({ done, value }) => {
            if (done) {
              controller.close();
              return;
            }
            controller.enqueue(value);
            push();
          });
        }
        push();
      },
    });

    return new Response(stream, {
      headers: { 'Content-Type': 'text/plain' },
    });
  } catch (error) {
    console.log('Error', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};
