'use client';
import { useState, useEffect } from 'react';

const useScrollDirection = () => {
  const [scrollingDown, setScrollingDown] = useState<boolean>(false);
  const [lastScrollY, setLastScrollY] = useState<number>(0);
  const [atTop, setAtTop] = useState<boolean>(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY === 0) {
        setAtTop(true);
      } else {
        setAtTop(false);
      }

      if (window.scrollY > lastScrollY && !atTop) {
        setScrollingDown(true);
      } else {
        setScrollingDown(false);
      }

      setLastScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, atTop]);

  return { scrollingDown, atTop };
};

export default useScrollDirection;
