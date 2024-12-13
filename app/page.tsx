'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { ModelResponse } from '@/types/global-app.dto';
import { fetchDataFromModel } from '@/utils/request';
const HomePage = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [image, setImage] = useState<string | undefined>(undefined);
  const [caption, setCaption] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(undefined);
    try {
      const data = await fetchDataFromModel(prompt);

      setCaption(data?.caption);
      setImage(data?.image);
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.log('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleForm} className="mt-5 space-x-3 ml-5 outline-none">
        <input
          aria-label="Type your Text"
          placeholder="Type your Text..."
          className="border-[1px] border-black w-[300px] p-3"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
        />
        <button
          className="bg-green-500 p-3 border-[1px] border-black text-white"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Generate'}
        </button>
      </form>

      {error && <p className="text-red-500 mt-3">{error}</p>}

      {loading && <p className="mt-3">Loading...</p>}
      <div className="max-w-[800px] mx-auto flex flex-col items-center gap-10">
        {image && (
          <Image
            alt="Picure"
            width={500}
            height={500}
            priority={true}
            src={image}
          />
        )}
        {caption && <h1 className="mt-5">{caption}</h1>}
      </div>
    </>
  );
};

export default HomePage;
