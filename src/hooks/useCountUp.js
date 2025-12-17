import { useEffect, useState } from 'react';

const useCountUp = (end, duration = 1500, startWhen = true) => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!startWhen) return;
    let start = 0;
    const startTime = performance.now();

    const step = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const current = Math.floor(progress * end);

      if (current !== start) {
        start = current;
        setValue(current);
      }
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [end, duration, startWhen]);

  return value;
};

export default useCountUp;
