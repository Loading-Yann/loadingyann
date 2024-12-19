import React, { useRef, useEffect } from 'react';
import './_matrixbackground.scss';
import matrixConfig from '../../utils/matrixConfig';

const MatrixBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Configurations
    const { charRatios, speed, fontSize, colors } = matrixConfig;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    const generateCharacter = () => {
      const rand = Math.random();
      if (rand < charRatios.numbers) {
        return String.fromCharCode(48 + Math.floor(Math.random() * 10)); // Chiffres 0-9
      } else if (rand < charRatios.numbers + charRatios.letters) {
        return String.fromCharCode(65 + Math.floor(Math.random() * 26)); // Lettres A-Z
      } else if (rand < charRatios.numbers + charRatios.letters + charRatios.symbols) {
        const symbols = '!@#$%^&*()_+-=[]{}|;:",.<>?/`~';
        return symbols[Math.floor(Math.random() * symbols.length)];
      } else {
        return String.fromCharCode(0x4e00 + Math.floor(Math.random() * 100)); // Kanji
      }
    };

    const draw = () => {
      if (!ctx) return;

      ctx.fillStyle = colors.background;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = colors.text;
      ctx.font = `${fontSize}px Courier New`;

      drops.forEach((y, i) => {
        const text = generateCharacter();
        const x = i * fontSize;

        ctx.fillText(text, x, y * fontSize);

        if (y * fontSize > canvas.height || Math.random() > 0.95) {
          drops[i] = 0;
        }

        drops[i]++;
      });

      setTimeout(() => requestAnimationFrame(draw), Math.random() * (speed.max - speed.min) + speed.min);
    };

    draw();
  }, []);

  return <canvas ref={canvasRef} className="matrix-background" />;
};

export default MatrixBackground;
