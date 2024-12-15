import { NextRequest } from 'next/server';

export const GET = async (request: NextRequest) => {
  try {
    const prompt = request.nextUrl.searchParams.get('prompt');
    if (!prompt) {
      return new Response(
        JSON.stringify({ message: 'Prmpt is required by the user' }),
        { status: 400 }
      );
    }

    const textResponse = await fetch(
      `https://text.pollinations.ai/Generate caption which is maximum 100 words with hashtag for instagram post for this${encodeURIComponent(
        prompt
      )}`
    );
    //validate res
    if (!textResponse.ok) {
      return new Response(
        JSON.stringify({ error: 'Model Failed at generating Caption' }),
        { status: 500 }
      );
    }
    const caption = await textResponse.text();
    return new Response(JSON.stringify({ caption }), { status: 200 });
  } catch (error) {
    console.error('Error fetching caption:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
};
