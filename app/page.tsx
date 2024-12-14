'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { fetchDataFromModel } from '@/utils/request';
import { ModelResponse } from '@/@types/global-app.dto';
import { typeCaption } from '@/utils/request';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';
import ShareButtons from '@/components/ShareButtons';

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
          setCaption((prev) => prev + chunk);
        }
      );

      if (data) {
        setImage(data.image);
        typeCaption(data.caption, setCaption);
        setPrompt('');
      } else {
        setError('Prompt cannot be empty');
      }
    } catch (error) {
      console.log(error);
      setError('An error occurred. Please try again.');
      console.error('Error:', error);
    } finally {
      setLoading(false);
      setPrompt('');
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <section className="min-h-screen bg-gray-600 overflow-hidden max-lg:flex max-lg:flex-col p-5 max-lg:items-center max-lg:gap-8">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        className="text-center py-5 max-lg:text-2xl text-5xl text-white"
      >
        Type the description of your desired picture
      </motion.h1>

      <form
        onSubmit={handleForm}
        className="mt-5 flex items-center mb-10 justify-center space-x-3 ml-5 outline-none"
      >
        <input
          aria-label="Type your Text"
          placeholder="Type your Text..."
          className="border-[1px]  border-black w-[300px] max-lg:w-[200px] max-lg:p-2 p-3"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
        />
        <button
          className="bg-green-500  max-lg:p-2 p-3 border-[1px] border-black text-white"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Generate'}
        </button>
      </form>

      {loading && <Spinner loading={loading} />}

      <div className="max-w-[800px] mx-auto flex flex-col items-center gap-10">
        {image && (
          <motion.div
            key={image}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 2 }}
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
        {caption && (
          <h1 className="mt-5 max-lg:max-w-[300px] max-lg:mb-12 mb-6 text-white text-justify">
            {caption}
          </h1>
        )}
        {caption && <ShareButtons />}
      </div>
    </section>
  );
};

export default HomePage;
