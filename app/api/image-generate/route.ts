import { NextRequest, NextResponse } from 'next/server';

export const GET = async (request: NextRequest): Promise<NextResponse> => {
  try {
    // 1. Get the prompt from the client
    const prompt = request.nextUrl.searchParams.get('prompt');
    console.log('PROMPT is,', prompt);

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required by the user' },
        { status: 400 }
      );
    }

    // 2. Call image generator API
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

    // 3. Call caption generator
    const textResponse = await fetch(
      `https://text.pollinations.ai/Generate caption which is 100 words with hashtag for instagram post for this${encodeURIComponent(
        prompt
      )}`
    );

    if (!textResponse.ok) {
      return NextResponse.json(
        { error: 'Failed to fetch caption' },
        { status: 500 }
      );
    }

    const caption = await textResponse.text();

    return NextResponse.json(
      {
        prompt,
        image: imageUrl,
        caption, // ✅ Caption instead of "text"
      },
      { status: 200 }
    );
  } catch (error) {
    console.log('Error', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
};
