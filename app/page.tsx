import { Button } from '@/components/ui/button';
import { auth } from '@clerk/nextjs/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';

const page = async () => {
  const { userId } = await auth();

  if (userId) {
    redirect('/generate-image');
  }
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-8">
        <h1 className="text-6xl text-white">
          Welcome To Image Generator Web app
        </h1>
        <h2 className="text-3xl text-white">
          To use This web app you must need to first Authenticated.
        </h2>
        <h3 className="text-2xl text-white">
          Authenticatio is simply mage by Google OAuth
        </h3>
        <Button size={'lg'} asChild>
          <Link href={'/sign-in'}>Let's Get Started</Link>
        </Button>
      </div>
    </div>
  );
};

export default page;
