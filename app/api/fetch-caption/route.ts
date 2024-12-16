import { geminiModel } from '@/utils/gemini';
import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  try {
    if (request.method !== 'POST') {
      return new Response(
        JSON.stringify({ message: 'This must be a POSt request' }),
        { status: 400 }
      );
    }
    let prompt = request.nextUrl.searchParams.get('prompt');
    prompt =
      'Generate an instagram caption whihc would be maximum 100 words for this with appropriate hashtags ====> ' +
      prompt;
    const result = await geminiModel.generateContentStream(prompt);
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of result.stream) {
            const chunkOfText = chunk.text();
            console.log('Sending Chunk Of Data');
            controller.enqueue(encoder.encode(chunkOfText));
          }
          controller.close();
        } catch (error) {
          console.error('Error while streaming:', error);
          controller.error(error);
        }
      },
    });
    return new Response(stream, {
      headers: {
        'Content-Type': 'text/plain',
        'Cache-Control': 'no-cache',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.log('Error in handler:', error);
    return new Response(JSON.stringify({ message: 'Something went wrong' }), {
      status: 500,
    });
  }
};
