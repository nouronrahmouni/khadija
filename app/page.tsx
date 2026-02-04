'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import BubbleBackground from '@/components/BubbleBackground';

export default function Home() {
  const [yesClicked, setYesClicked] = useState(false);
  const [noHoverCount, setNoHoverCount] = useState(0);
  const [noButtonPosition, setNoButtonPosition] = useState({ top: 0, left: 0, position: 'static' as 'static' | 'absolute' });
  const [swordPosition, setSwordPosition] = useState<{ top: string; left: string } | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleYesClick = () => {
    setYesClicked(true);
  };

  const moveNoButton = (e?: React.MouseEvent | React.TouchEvent) => {
    if (!containerRef.current) return;

    // Get current button position for the sword *before* moving
    const btn = e?.currentTarget as HTMLElement;
    if (btn) {
      const rect = btn.getBoundingClientRect();
      setSwordPosition({
        top: `${rect.top}px`,
        left: `${rect.left}px`
      });
    }

    setNoHoverCount((prev) => prev + 1);

    const containerRect = containerRef.current.getBoundingClientRect();

    // Position relative to the card center
    const centerX = containerRect.width / 2;
    // The image area is the middle of the card
    const centerY = containerRect.height / 2 + 20;

    // Randomly choose one of 4 directions: 0=Top, 1=Bottom, 2=Left, 3=Right
    const direction = Math.floor(Math.random() * 4);

    const distance = 240; // Distance from center (fits tight around the 380px image)
    const jitter = (Math.random() - 0.5) * 40; // Small jitter to keep it organic

    let newTop = centerY;
    let newLeft = centerX;

    switch (direction) {
      case 0: // Top
        newTop = centerY - distance;
        newLeft = centerX + jitter;
        break;
      case 1: // Bottom
        newTop = centerY + distance;
        newLeft = centerX + jitter;
        break;
      case 2: // Left
        newLeft = centerX - distance;
        newTop = centerY + jitter;
        break;
      case 3: // Right
        newLeft = centerX + distance;
        newTop = centerY + jitter;
        break;
    }

    setNoButtonPosition({
      position: 'absolute',
      top: newTop,
      left: newLeft,
    });
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden text-center z-10 selection:bg-pink-300">
      <BubbleBackground />

      {yesClicked ? (
        <div className="z-20 bg-white/90 backdrop-blur-md p-10 rounded-[3rem] shadow-2xl animate-fade-in border-4 border-pink-100 relative overflow-hidden">
          {/* Success Confetti/Hearts */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <span
                key={i}
                className="absolute text-3xl animate-float-slow"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  opacity: 0.6
                }}
              >
                ❤️
              </span>
            ))}
          </div>

          <h1 className="text-5xl font-bold text-pink-600 mb-6 animate-bounce relative z-10">
            Yay! I knew it! ❤️
          </h1>
          <div className="relative inline-block z-10">
            <Image
              src="/image1.jpeg"
              alt="Celebrating"
              width={300}
              height={300}
              className="rounded-full shadow-2xl mx-auto border-8 border-white animate-wiggle"
            />
            <span className="absolute -top-4 -right-4 text-6xl animate-pulse">🌸</span>
            <span className="absolute -bottom-4 -left-4 text-6xl animate-pulse delay-100">🌸</span>
          </div>
          <p className="mt-8 text-2xl text-gray-700 font-serif font-semibold italic relative z-10">
            "Kanabghik bzaaaaaaf a Khadija! 💖"
          </p>
        </div>
      ) : (
        <div className="z-20 flex flex-col items-center max-w-lg w-full relative min-h-[600px] justify-center">

          {/* Main Card with "White Cover" style */}
          <div ref={containerRef} className="bg-white/70 backdrop-blur-xl p-8 rounded-[3rem] shadow-[0_20px_50px_rgba(255,182,193,0.5)] relative border-4 border-white w-full flex flex-col items-center transition-all duration-500 overflow-visible">

            {/* Flower Decorations (Big Cover for flower) */}
            <div className="absolute -top-10 -left-10 text-6xl animate-bounce pointer-events-none select-none">🌸</div>
            <div className="absolute -top-10 -right-10 text-6xl animate-bounce delay-150 pointer-events-none select-none">🌺</div>
            <div className="absolute -bottom-10 -left-10 text-6xl animate-bounce delay-300 pointer-events-none select-none">🌹</div>
            <div className="absolute -bottom-10 -right-10 text-6xl animate-bounce delay-500 pointer-events-none select-none">🌻</div>

            {/* Question Bubble */}
            <div className="absolute -top-16 bg-white py-5 px-8 rounded-full shadow-2xl border-2 border-pink-200 w-[95%] md:w-auto animate-wiggle z-30 transform hover:scale-110 transition-transform">
              <p className="text-xl md:text-2xl font-black text-pink-700 font-serif leading-tight">
                Khadija, wach katabghi Nour driyaf?
              </p>
              <div className="absolute bottom-[-15px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-t-[15px] border-t-white border-r-[15px] border-r-transparent drop-shadow-lg"></div>
            </div>

            {/* Image with white cover/glow */}
            <div className="mt-14 mb-10 relative group">
              <div className="absolute -inset-4 bg-white/40 blur-2xl rounded-full group-hover:bg-pink-100/50 transition-colors duration-700 animate-pulse"></div>
              <Image
                src="/image1.jpeg"
                alt="Our Picture"
                width={380}
                height={380}
                className="rounded-2xl shadow-2xl border-8 border-white mx-auto object-cover aspect-square relative z-10 transition-transform duration-500 hover:rotate-2 hover:scale-105"
                priority
              />
              {/* Little Flower Overlays */}
              <div className="absolute top-2 left-2 z-20 text-3xl opacity-80 animate-spin-slow">🌸</div>
              <div className="absolute bottom-2 right-2 z-20 text-3xl opacity-80 animate-spin-slow-reverse">🌸</div>
            </div>

            <div className="flex justify-center gap-12 items-center w-full min-h-[100px] relative">
              <button
                onClick={handleYesClick}
                className="bg-gradient-to-br from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-black py-4 px-10 rounded-full text-2xl shadow-[0_10px_20px_rgba(239,68,68,0.4)] transform active:scale-90 transition-all hover:scale-115 z-20"
              >
                Yes
              </button>

              <button
                onMouseEnter={moveNoButton}
                onTouchStart={moveNoButton}
                onClick={moveNoButton}
                style={{
                  position: noButtonPosition.position,
                  top: noButtonPosition.position === 'absolute' ? noButtonPosition.top : 'auto',
                  left: noButtonPosition.position === 'absolute' ? noButtonPosition.left : 'auto',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)', // Snappy spring
                  transform: noButtonPosition.position === 'absolute' ? 'translate(-50%, -50%)' : 'none',
                }}
                className="bg-white/80 backdrop-blur-sm border-2 border-gray-200 hover:bg-white text-gray-500 hover:text-gray-700 font-bold py-4 px-10 rounded-full text-2xl shadow-xl z-50 whitespace-nowrap cursor-pointer select-none transition-colors"
              >
                No
              </button>
            </div>
          </div>

          {/* Sword Section - Appears at the NO button's PREVIOUS position */}
          {swordPosition && (
            <div
              className="fixed z-[100] pointer-events-none flex flex-col items-center animate-ping-once transition-opacity duration-300"
              style={{
                top: swordPosition.top,
                left: swordPosition.left,
                transform: 'translate(-30%, -30%) scale(1.2)'
              }}
            >
              <Image
                src="/image2.png"
                alt="Sword"
                width={120}
                height={120}
                className="drop-shadow-[0_0_15px_rgba(0,0,0,0.3)] animate-wiggle"
              />
              <div className="bg-yellow-100 border-2 border-yellow-400 px-3 py-1 rounded-xl text-sm font-black text-yellow-800 mt-2 whitespace-nowrap animate-bounce shadow-lg">
                Tbrki 3la no n9sa 🔪
              </div>
            </div>
          )}

        </div>
      )}
    </main>
  );
}
