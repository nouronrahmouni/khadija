'use client';

import { useEffect, useState } from 'react';

export default function BubbleBackground() {
  const [bubbles, setBubbles] = useState<{ id: number; size: number; left: number; duration: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate random bubbles
    const bubbleCount = 20;
    const newBubbles = Array.from({ length: bubbleCount }).map((_, i) => ({
      id: i,
      size: Math.random() * 40 + 20, // 20px - 60px
      left: Math.random() * 100, // 0% - 100%
      duration: Math.random() * 10 + 10, // 10s - 20s
      delay: Math.random() * 20, // 0s - 20s
    }));
    setBubbles(newBubbles);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}%`,
            animationDuration: `${bubble.duration}s`,
            animationDelay: `${bubble.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
