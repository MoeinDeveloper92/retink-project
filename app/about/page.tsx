'use client';
import React from 'react';
import { motion } from 'framer-motion';
const page = () => {
  return (
    <section className=" container mx-auto flex flex-col items-start gap-16">
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mt-20 ml-4 self-center text-8xl text-white "
      >
        About This App
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="text-3xl"
      >
        This app is just a simple version of Image generation with correspondign
        caption prepared to get posted on Instagram. This web tool utlizes two
        different APIs for image and text generation.
      </motion.p>
      <motion.ul
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="flex flex-col text-3xl items-start gap-8 "
      >
        <br />
        <li className="text-white ">
          <span className="font-bold text-black">Generate Image (GET):</span> `
          https://image.pollinations.ai/prompt/prompt` - Params: prompt*, model,
          seed, width, height, nologo, private, enhance, safe - Return: Image
          file
        </li>
        <li className="text-white">
          <span className="font-bold text-black">Generate Text(GET):</span> `
          https://text.pollinations.ai/prompt` - Params: prompt*, model, seed,
          json, system - Return: Generated text
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
        className=""
      >
        <h1 className="text-xl text-white">Area of Improvments</h1>
        <p className="flex flex-col gap-3">
          <span className="mt-2"> 1- Authentication must be integrated </span>
          <span>
            2-API keys and secrurity purposes to limit api call should be
            integrated
          </span>{' '}
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
