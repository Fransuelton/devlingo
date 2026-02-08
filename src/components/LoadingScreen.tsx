import { useEffect, useState } from 'react';
import devlingoLoader from '../assets/images/devlingo-loader.png';
import './LoadingScreen.css';

const LoadingScreen = () => {
  const [shouldRender, setShouldRender] = useState(true);
  const [animationClass, setAnimationClass] = useState('fade-in');

  useEffect(() => {
    // Após 0.8s (fadeIn) + 2s (permanência) = 2.8s, inicia fadeOut
    const fadeOutTimer = setTimeout(() => {
      setAnimationClass('fade-out');
    }, 2800);

    // Após 2.8s + 0.8s (fadeOut) = 3.6s, remove o componente
    const removeTimer = setTimeout(() => {
      setShouldRender(false);
    }, 3600);

    return () => {
      clearTimeout(fadeOutTimer);
      clearTimeout(removeTimer);
    };
  }, []);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      className={`fixed inset-0 z-[9999] w-screen h-screen bg-purple-600 flex items-center justify-center flex-col gap-8 ${animationClass}`}
    >
      <img
        src={devlingoLoader}
        alt="Devlingo Loading"
        className="w-40 h-40 float-animation"
      />
      <h1 className="text-5xl font-bold text-white">Devlingo</h1>
    </div>
  );
};

export default LoadingScreen;
