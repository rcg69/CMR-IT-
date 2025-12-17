// src/hooks/homereveal.js
import { useEffect, useRef, useState } from 'react';

const useHomeReveal = () => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.25 }
    );

    observer.observe(node);
    return () => node && observer.unobserve(node);
  }, []);

  return { ref, isVisible };
};

export default useHomeReveal;
