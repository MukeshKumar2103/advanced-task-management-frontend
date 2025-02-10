import { useEffect, useRef, RefObject } from 'react';

const useOutsideClick = (
  callback: () => void
): RefObject<HTMLDivElement | null> => {
  const elementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: Event) => {
      if (
        elementRef.current &&
        !elementRef.current.contains(event.target as Node)
      ) {
        callback();
      }
    };

    function handler(e: KeyboardEvent) {
      if (elementRef.current) {
        if (e.key === 'Escape') callback();
      }
    }

    document.addEventListener('keydown', handler);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handler);
    };
  }, [callback]);

  return elementRef;
};

export default useOutsideClick;
