import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import Link from 'next/link';

import React from 'react';

const page = async () => {
  const date = new Date();
  return (
    <div className="h-screen flex flex-col  justify-center items-center">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8 flex-1 mt-32">
        <h1 className="text-6xl text-white max-sm:text-2xl max-sm:text-center">
          Welcome To Image Generator Web app.
        </h1>
        <h2 className="text-2xl text-white max-sm:text-xl max-sm:text-center">
          In the production version authentication and account management will
          be integrated by Google OAuth.
        </h2>
        <h2 className="text-3xl text-white max-sm:text-xl max-sm:text-center">
          This is the Beta version of this web app Developed By Moein Samani.
        </h2>
        <Button size={'lg'} asChild>
          <Link href={'/generate-image'}>Lets Get Started</Link>
        </Button>
      </div>
      <footer className="h-[80px] bg-blue-400 self-stretch flex justify-center gap-16 items-center max-sm:flex-col max-sm:items-center max-sm:gap-4">
        <p className="font-sans font-semibold">{date.toDateString()}</p>
        <p>
          <span className="font-semibold">This app is developed by?</span>
          <span className="bg-black hover:bg-transparent max-sm:inline-block max-sm:text-center max-sm:mx-auto">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="ml-2">
                  <Link
                    target="_blank"
                    href={'https://github.com/MoeinDeveloper92'}
                  >
                    Moein Samani Nejad
                  </Link>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Visit My github</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </span>
        </p>
      </footer>
    </div>
  );
};

export default page;
