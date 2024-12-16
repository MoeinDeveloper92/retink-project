import axios from 'axios';
import FormData from 'form-data';
import { NextRequest } from 'next/server';

export const POST = async (request: NextRequest) => {
  const prompt = request.nextUrl.searchParams.get('prompt');
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ message: 'Method must be POST' }), {
      status: 400,
    });
  }
  const payload = {
    prompt,
    output_format: 'webp',
  };

  const response = await axios.postForm(
    `https://api.stability.ai/v2beta/stable-image/generate/core`,
    axios.toFormData(payload, new FormData()),
    {
      validateStatus: undefined,
      responseType: 'arraybuffer',
      headers: {
        Authorization: `Bearer ${process.env.STABLITY_API_KEY}`,
        Accept: 'image/*',
      },
    }
  );

  if (response.status === 200) {
    const image = response.data;
    const imageBase64 = image.toString('base64');
    return new Response(
      JSON.stringify({
        image: `data:image/png;base64,${imageBase64}`,
      }),
      { status: 200 }
    );
    // fs.writeFileSync('./lighthouse.webp', Buffer.from(response.data));
  } else {
    throw new Error(`${response.status}: ${response.data.toString()}`);
  }
};
