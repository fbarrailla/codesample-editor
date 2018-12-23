import React, { useRef, useEffect, useState } from 'react';
import canvasImageCoverPosition from '../libs/canvasImageCoverPosition';

const Image = ({ data, width, height }) => {
  const canvasRef = useRef();
  const [rect, setRect] = useState({ width, height });
  const [image, setImage] = useState(null);

  useEffect(() => {
    const img = document.createElement('img');
    img.src = data;
    img.onload = setImage(img);
  }, []);

  useEffect(
    () => {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      ctx.clearRect(0, 0, rect.width, rect.height);
      setRect({ width, height });
    },
    [width, height]
  );

  useEffect(
    () => {
      if (!image) {
        return;
      }
      requestAnimationFrame(draw);
    },
    [rect.with, rect.height, image]
  );

  const draw = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const {
      width: canvasWidth,
      height: canvasHeight,
    } = canvas.getBoundingClientRect();
    const {
      offsetLeft,
      offsetTop,
      width: imgWidth,
      height: imgHeight,
    } = canvasImageCoverPosition(
      image.width,
      image.height,
      canvasWidth,
      canvasHeight,
      0.5,
      0.5
    );
    ctx.drawImage(image, offsetLeft, offsetTop, imgWidth, imgHeight);
  };

  return <canvas ref={canvasRef} width={rect.width} height={rect.height} />;
};

export default Image;
