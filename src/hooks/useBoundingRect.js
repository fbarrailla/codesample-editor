import { useState, useEffect } from 'react';
import debouce from 'lodash.debounce';

export default ref => {
  const [size, setSize] = useState({});
  useEffect(
    () => {
      setSize(ref.current.getBoundingClientRect());
      const onResize = debouce(() => {
        setSize(ref.current.getBoundingClientRect());
      }, 300);
      window.addEventListener('resize', onResize);
      return () => window.removeEventListener('resize', onResize);
    },
    [ref]
  );
  return size;
};
