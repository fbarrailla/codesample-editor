import { useEffect, useState } from 'react';

export default (onChange = () => {}) => {
  const [fileInput] = useState(() => {
    const input = document.createElement('input');
    input.type = 'file';
    return input;
  });

  useEffect(() => {
    const handleChange = evt => {
      const [file] = [...fileInput.files];
      if (file) {
        const reader = new FileReader();
        reader.onload = e => {
          onChange(e.target.result);
        };
        reader.readAsDataURL(file);
      }
      fileInput.value = null;
    };

    fileInput.addEventListener('change', handleChange);

    return () => fileInput.removeEventListener('change', handleChange);
  }, []);

  return () => {
    fileInput.click();
  };
};
