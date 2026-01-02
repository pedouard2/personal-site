import React, { useState, useEffect, useRef } from "react";

// 1. THE TRIGGER (Dumb Component)
export const TrackTrigger = ({ index, children }) => {
  return (
    <div
      className="track-trigger border-l-4 border-transparent hover:border-text pl-4 transition-all duration-300 cursor-pointer"
      data-track-index={index}
      data-debug-check="true"
    >
      {children}
    </div>
  );
};

// 2. THE CONTROLLER
export default function ReviewAudioController({ playlist, children }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const containerRef = useRef(null);

  const currentTrack = playlist[currentIndex] || playlist[0];

  // --- FIX: DEFINED BEFORE USEEFFECT ---
  const changeTrack = (index, forcePlay = false) => {
    setCurrentIndex((prev) => {
      if (prev === index && !forcePlay) return prev;
      return index;
    });
    if (forcePlay) setIsPlaying(true);
  };

  // --- THE DOM SCANNER ---
  useEffect(() => {
    if (!containerRef.current) return;

    // DEBUG: Did we find the triggers?
    const triggers = containerRef.current.querySelectorAll(".track-trigger");
    console.log(`[AudioController] Found ${triggers.length} triggers.`);

    if (triggers.length === 0) {
      console.warn("⚠️ No triggers found! Check markdown HTML.");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(
              entry.target.getAttribute("data-track-index"),
            );
            if (!isNaN(index)) {
              console.log(`[Audio] Triggered Track #${index}`);
              changeTrack(index); // Now this works because function is defined above
            }
          }
        });
      },
      {
        // Laser Tripwire: Middle of screen
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      },
    );

    triggers.forEach((trigger) => {
      observer.observe(trigger);
      // Click listener backup
      trigger.onclick = () => {
        const idx = parseInt(trigger.getAttribute("data-track-index"));
        changeTrack(idx, true);
      };
    });

    return () => observer.disconnect();
  }, []);

  // --- AUDIO PLAYBACK HANDLER ---
  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch((e) => console.log("Autoplay blocked", e));
    }
  }, [currentIndex, isPlaying]);

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative grid grid-cols-1 lg:grid-cols-12 gap-12"
    >
      {/* SIDEBAR PLAYER */}
      <aside className="lg:col-span-4 lg:h-[calc(100vh-100px)] lg:sticky lg:top-24 flex flex-col">
        <div className="bg-card border-2 border-text shadow-[8px_8px_0px_var(--color-primary)] p-6 transition-all duration-300">
          {/* Spinning Disc */}
          <div
            className={`
                  w-full aspect-square bg-gray-900 rounded-full border-4 border-text mb-6 flex items-center justify-center relative shadow-inner
                  ${isPlaying ? "animate-[spin_4s_linear_infinite]" : ""}
              `}
          >
            <div className="w-1/3 h-1/3 bg-primary border-2 border-text rounded-full flex items-center justify-center">
              <div className="w-2 h-2 bg-black rounded-full"></div>
            </div>
          </div>

          {/* Info */}
          <div className="text-center mb-6">
            <h3 className="font-heading italic text-2xl leading-none mb-2 truncate">
              {currentTrack?.title}
            </h3>
            <div className="text-xs font-mono uppercase tracking-widest text-text/60">
              Track {currentIndex + 1} / {playlist.length}
            </div>
          </div>

          {/* Controls */}
          <button
            onClick={togglePlay}
            className="w-full py-4 bg-text text-background font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-colors border-2 border-transparent hover:border-text"
          >
            {isPlaying ? "PAUSE" : "PLAY"}
          </button>

          <audio
            ref={audioRef}
            src={currentTrack?.src}
            onEnded={() => setIsPlaying(false)}
          />
        </div>
      </aside>

      {/* CONTENT */}
      <main className="lg:col-span-8">{children}</main>
    </div>
  );
}
