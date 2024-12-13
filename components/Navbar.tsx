'use client';
import React from 'react';
import Link from 'next/link';
import useScrollDirection from '@/hook/useScrollDirection';
import { Button } from './ui/button';

const Navbar = () => {
  const { scrollingDown, atTop } = useScrollDirection();

  return (
    <div
      className={`bg-gray-400  w-full transition-transform duration-300 ${
        scrollingDown && !atTop ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="p-5 flex justify-around bg-gray-400">
        <Link href={'/'}>
          <h1 className=" font-semibold text-xl">Image Generator</h1>
        </Link>
        <Link href="/about">
          <Button>About</Button>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;