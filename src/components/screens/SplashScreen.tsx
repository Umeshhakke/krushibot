import React, { useEffect, useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import logo from '@/assets/krishi-bot-logo.png';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const { t } = useLanguage();
  const [phase, setPhase] = useState<'logo' | 'text' | 'fadeout'>('logo');

  useEffect(() => {
    // Phase 1: Logo appears (0-1s)
    const textTimer = setTimeout(() => setPhase('text'), 1000);
    
    // Phase 2: Text appears (1-2.5s)
    const fadeTimer = setTimeout(() => setPhase('fadeout'), 2500);
    
    // Phase 3: Fade out and complete (3s)
    const completeTimer = setTimeout(() => onComplete(), 3000);

    return () => {
      clearTimeout(textTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div 
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-br from-primary/90 via-primary to-accent/80 transition-opacity duration-500 ${
        phase === 'fadeout' ? 'opacity-0' : 'opacity-100'
      }`}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-accent/20 rounded-full blur-3xl animate-pulse-slow delay-500" />
      </div>

      {/* Logo with animation */}
      <div 
        className={`relative z-10 transition-all duration-700 ease-out ${
          phase === 'logo' ? 'scale-100 opacity-100' : 'scale-110 opacity-100'
        }`}
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-white/30 rounded-full blur-2xl scale-150 animate-pulse-slow" />
          
          {/* Logo container */}
          <div className="relative w-32 h-32 bg-white rounded-3xl shadow-2xl p-4 animate-float">
            <img 
              src={logo} 
              alt="KrishiBot AI" 
              className="w-full h-full object-contain"
            />
          </div>

          {/* Leaf animation circles */}
          <div className="absolute -top-2 -right-2 w-6 h-6 bg-accent rounded-full animate-bounce delay-300" />
          <div className="absolute -bottom-1 -left-3 w-4 h-4 bg-secondary rounded-full animate-bounce delay-500" />
        </div>
      </div>

      {/* App name */}
      <h1 
        className={`mt-8 text-4xl font-bold text-white drop-shadow-lg transition-all duration-500 ${
          phase !== 'logo' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        KrishiBot AI
      </h1>

      {/* Tagline with animation */}
      <p 
        className={`mt-4 text-lg text-white/90 font-medium transition-all duration-500 delay-200 ${
          phase === 'text' || phase === 'fadeout' ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        {t('smartFarming')}
      </p>

      {/* Growing plant animation */}
      <div 
        className={`mt-8 flex items-end gap-1 transition-all duration-700 ${
          phase !== 'logo' ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {[1, 2, 3, 4, 5].map((i) => (
          <div
            key={i}
            className="w-2 bg-white/80 rounded-full origin-bottom"
            style={{
              height: `${12 + i * 6}px`,
              animation: `grow 0.5s ease-out ${i * 0.1}s forwards`,
              transform: 'scaleY(0)',
            }}
          />
        ))}
      </div>

      {/* Loading dots */}
      <div className="absolute bottom-12 flex gap-2">
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="w-2 h-2 bg-white/70 rounded-full animate-bounce"
            style={{ animationDelay: `${i * 0.2}s` }}
          />
        ))}
      </div>

      <style>{`
        @keyframes grow {
          from { transform: scaleY(0); }
          to { transform: scaleY(1); }
        }
      `}</style>
    </div>
  );
};

export default SplashScreen;
