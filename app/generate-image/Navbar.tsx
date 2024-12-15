'use client';
import React from 'react';
import Link from 'next/link';
import useScrollDirection from '@/hook/useScrollDirection';
import { Button } from '../../components/ui/button';

const Navbar = () => {
  const { scrollingDown, atTop } = useScrollDirection();

  return (
    <div
      className={`bg-sky-300  w-full transition-transform duration-300 ${
        scrollingDown && !atTop ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="p-5 flex justify-around bg-blue-50">
        <Link href={'/'}>
          <h1 className=" font-semibold text-xl">Image Generator</h1>
        </Link>
        <div className="flex items-center gap-5">
          <Link href="/about">
            <Button>About</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
