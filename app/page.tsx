'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fetchDataFromModel } from '@/utils/request';
import { ModelResponse } from '@/types/global-app.dto';
import { typeCaption } from '@/utils/request';
const HomePage = () => {
  const [prompt, setPrompt] = useState<string>('');
  const [image, setImage] = useState<string | undefined>(undefined);
  const [caption, setCaption] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | undefined>(undefined);

  const handleForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError(undefined);
    setCaption('');
    setImage('');

    try {
      const data: ModelResponse | undefined = await fetchDataFromModel(
        prompt,
        (chunk: string) => {
          setCaption((prev) => prev + chunk); // Update caption progressively
        }
      );

      if (data) {
        setImage(data.image);
        typeCaption(data.caption, setCaption);
      } else {
        setError('Failed to fetch data');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-600 overflow-hidden">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center py-5 text-5xl text-white"
      >
        Image Generator
      </motion.h1>

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
          <motion.div
            key={image}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, duration: 1 }}
          >
            <Image
              alt="Picture"
              width={500}
              height={500}
              priority={true}
              src={image}
            />
          </motion.div>
        )}
        {caption && <h1 className="mt-5 text-white text-justify">{caption}</h1>}
      </div>
    </section>
  );
};

export default HomePage;
