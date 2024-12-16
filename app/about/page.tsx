'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const page = () => {
  return (
    <section className=" container mx-auto flex flex-col items-start gap-16  overflow-x-hidden">
      <div className="relative top-10">
        <Button asChild className="max-sm:ml-5">
          <Link href={`/generate-image`}>Back</Link>
        </Button>
      </div>
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-20 ml-4 self-center text-8xl max-sm:text-3xl text-white "
      >
        About This App
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-3xl max-sm:text-xl max-sm:text-center"
      >
        This app is just a simple version of Image generation with correspondign
        caption prepared to get posted on Instagram. This web tool utlizes two
        different APIs for image and text generation.
      </motion.p>
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="flex flex-col text-3xl items-start  gap-8 max-sm:text-xl max-sm:items-center "
      >
        <li className="text-white max-sm:text-center  self-center ">
          <span className="font-bold text-black px-3">
            Generate Image (POST):
          </span>
          <br />
          For Image Generation I have used Stablity ai and its documentation as
          a resource to genreate Image.
        </li>
        <li className="text-white max-sm:text-center">
          <span className="font-bold px-3 text-black">
            Generate Text(POST):
          </span>
          <br />I have used Gemini Api for text generation as LLM model.
        </li>
      </motion.ul>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: 1,
          duration: 0.5,
          ease: 'circInOut',
        }}
        className=" max-sm:text-center mb-4"
      >
        <h1 className="text-xl text-white">Area of Improvments</h1>
        <p className="flex flex-col gap-3">
          <span className="mt-2"> 1- Authentication must be integrated </span>
          <span>
            2-API keys and secrurity purposes to limit api call should be
            integrated
          </span>
          <span>
            3-This API lacks security purposes because of no requirements of APi
            ky
          </span>
        </p>
      </motion.div>
    </section>
  );
};

export default page;
