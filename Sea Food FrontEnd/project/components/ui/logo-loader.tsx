'use client';

import Image from 'next/image';

interface LogoLoaderProps {
  fullscreen?: boolean;
}

export function LogoLoader({ fullscreen = true }: LogoLoaderProps) {
  return (
    <div
      className={
        fullscreen
          ? 'fixed inset-0 z-[9999] flex items-center justify-center bg-background/95 backdrop-blur-md'
          : 'relative flex items-center justify-center p-8'
      }
      role="status"
      aria-label="Loading"
    >
      <div className="relative flex items-center justify-center">
        {/* Soft Ambient Radial Glow Behind Rings */}
        <div
          className="absolute h-56 w-56 sm:h-72 sm:w-72 rounded-full bg-gradient-to-tr from-primary/25 via-cyan-400/20 to-blue-600/10 blur-3xl animate-pulse -z-10"
          aria-hidden="true"
        />

        {/* Ring 4: Outer Subtle Ambient Pulse Ring */}
        <div
          className="absolute -inset-12 sm:-inset-16 rounded-full border border-primary/15 animate-[pulse_3s_ease-in-out_infinite]"
          aria-hidden="true"
        />

        {/* Ring 3: Counter-Rotating Dashed Orbit Ring */}
        <div
          className="absolute -inset-8 sm:-inset-12 rounded-full border border-dashed border-cyan-500/30 animate-[spin_12s_linear_infinite_reverse]"
          aria-hidden="true"
        />

        {/* Ring 2: Sonar Ripple 1 (Expanding Ocean Wave) */}
        <div
          className="absolute -inset-4 sm:-inset-6 rounded-full border-2 border-primary/40 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"
          aria-hidden="true"
        />

        {/* Ring 1: High-Speed Spinning Gradient Accent Ring */}
        <div
          className="absolute -inset-2 rounded-full border-2 border-transparent border-t-primary border-r-cyan-400 border-b-primary/40 animate-[spin_1.5s_linear_infinite]"
          aria-hidden="true"
        />

        {/* Central Logo Bubble Card */}
        <div
          className="relative z-10 flex h-28 w-28 sm:h-36 sm:w-36 items-center justify-center rounded-full bg-card/95 border border-primary/25 shadow-[0_0_35px_rgba(15,137,246,0.35)] backdrop-blur-xl transition-transform"
        >
          {/* Breathing Logo Glow */}
          <div className="relative flex items-center justify-center p-3 animate-[pulse_2.2s_ease-in-out_infinite]">
            <Image
              src="/seafoodwala.png"
              alt="Seafood Wala"
              width={160}
              height={160}
              priority
              className="h-16 w-16 sm:h-20 sm:w-20 object-contain drop-shadow-[0_2px_12px_rgba(15,137,246,0.3)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

