import { Button } from '@/components/ui/button';

import Link from 'next/link';

import React from 'react';

const page = async () => {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        <h1 className="text-6xl text-white max-sm:text-2xl max-sm:text-center">
          Welcome To Image Generator Web app
        </h1>
        <h2 className="text-3xl text-white max-sm:text-xl max-sm:text-center">
          This is the Beta version of this web app.
        </h2>
        <h3 className="text-2xl text-white max-sm:text-xl max-sm:text-center">
          In the production version authentication and account management is
          mandatory.
        </h3>
        <Button size={'lg'} asChild>
          <Link href={'/generate-image'}>Lets Get Started</Link>
        </Button>
      </div>
    </div>
  );
};

export default page;
