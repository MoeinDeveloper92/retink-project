'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import Spinner from '@/components/Spinner';
import ShareButtons from '@/components/ShareButtons';
import LoadingButton from '@/components/LoadingButton';
import { Button } from '@/components/ui/button';
import { fetchCaption, fetchImage, typeCaption } from '@/utils/request';
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
      const imageUrl = await fetchImage(prompt);

      const captionText = await fetchCaption(prompt);

      setImage(imageUrl);

      typeCaption(captionText, setCaption);

      setPrompt('');
    } catch (error: any) {
      console.error(error);
      setError('Server timeOut');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  const handleReset = () => {
    setPrompt('');
    setCaption('');
    setImage('');
  };

  return (
    <section className="min-h-screen bg-gradient-to-tr from-blue-100 to-slate-500 overflow-hidden max-lg:flex max-lg:flex-col p-5 max-lg:items-center max-lg:gap-8">
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
          className="border-[1px] border-black w-[300px] max-lg:w-[200px] max-lg:p-2 p-3"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          type="text"
        />
        <LoadingButton
          loading={loading}
          className="bg-green-500 max-lg:p-2 border-[1px] border-black text-white"
          type="submit"
          disabled={loading}
        >
          {loading ? 'loading' : 'Generate'}
        </LoadingButton>
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
          <h1 className="mt-5 font-serif max-lg:max-w-[300px] max-lg:mb-12 mb-6 text-black text-justify">
            Prepared Caption: {caption}
          </h1>
        )}
        {caption && <ShareButtons />}
        {caption && (
          <div>
            <Button onClick={handleReset}>Reset</Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default HomePage;
