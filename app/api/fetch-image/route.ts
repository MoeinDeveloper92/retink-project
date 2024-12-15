import { NextRequest } from 'next/server';
export const GET = async (request: NextRequest) => {
  try {
    const prompt = request.nextUrl.searchParams.get('prompt');
    if (!prompt) {
      return new Response(
        JSON.stringify({ message: 'Prmpt is required by the user!' }),
        { status: 400 }
      );
    }

    const imageResponse = await fetch(
      `https://image.pollinations.ai/prompt/${encodeURIComponent(prompt)}`
    );

    //check for respon
    if (!imageResponse.ok) {
      return new Response(JSON.stringify({ error: 'Failed to fetch Image' }), {
        status: 500,
      });
    }
    const imageUrl = imageResponse.url;

    return new Response(JSON.stringify({ image: imageUrl }), {
      headers: { 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching image:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
    });
  }
};
