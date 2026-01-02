import React, { useState, useEffect, useRef } from "react";

// 1. THE TRIGGER COMPONENT (Use this inside your MDX/Text)
export const TrackTrigger = ({ index, children, onVisible }) => {
  const triggerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // When this section crosses the center of the screen...
        if (entry.isIntersecting) {
          onVisible(index);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }, // Trigger exactly in the middle
    );

    if (triggerRef.current) observer.observe(triggerRef.current);
    return () => observer.disconnect();
  }, [index, onVisible]);

  return (
    <div ref={triggerRef} className={`transition-opacity duration-500`}>
      {children}
    </div>
  );
};

// 2. THE MAIN WRAPPER & PLAYER
export default function ReviewAudioController({ playlist, children }) {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  const currentTrack = playlist[currentTrackIndex];

  // Handle Track Changes
  useEffect(() => {
    if (audioRef.current) {
      // Simple cut for now.
      // For a "Crossfade", we would need two audio elements blending volumes.
      // This implementation switches sources and plays immediately if already playing.
      audioRef.current.src = currentTrack.src;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentTrackIndex]);

  const togglePlay = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12">
      {/* --- LEFT: STICKY PLAYER --- */}
      <aside className="lg:col-span-4 lg:h-[calc(100vh-100px)] lg:sticky lg:top-24 flex flex-col">
        {/* The Tape Deck UI */}
        <div className="bg-card border-2 border-text shadow-[8px_8px_0px_var(--color-primary)] p-6 relative overflow-hidden group">
          {/* Spinning Cassette / Visual Decor */}
          <div
            className={`
                w-full aspect-square bg-gray-900 rounded-full border-4 border-text mb-6 flex items-center justify-center relative
                ${isPlaying ? "animate-[spin_4s_linear_infinite]" : ""}
            `}
          >
            <div className="w-1/3 h-1/3 bg-card border-2 border-text rounded-full"></div>
            {/* Tape markers */}
            <div className="absolute top-2 bottom-2 w-1 bg-text/20"></div>
            <div className="absolute left-2 right-2 h-1 bg-text/20"></div>
          </div>

          {/* Track Info */}
          <div className="text-center mb-6">
            <h3 className="font-heading italic text-2xl leading-none mb-2">
              {currentTrack.title}
            </h3>
            <div className="text-xs font-mono uppercase tracking-widest text-text/60">
              Track {currentTrackIndex + 1} / {playlist.length}
            </div>
          </div>

          {/* Controls */}
          <button
            onClick={togglePlay}
            className="w-full py-4 bg-text text-background font-bold uppercase tracking-widest hover:bg-primary hover:text-white transition-colors border-2 border-transparent hover:border-text"
          >
            {isPlaying ? "PAUSE" : "PLAY TAPE"}
          </button>

          {/* Hidden Audio Element */}
          <audio ref={audioRef} loop={false} />
        </div>

        {/* Visualizer / Note */}
        <div className="mt-6 border-l-4 border-text/20 pl-4 hidden lg:block">
          <p className="text-sm text-text/60 italic">
            Scroll to change tracks.
            <br />
            Turn volume up.
          </p>
        </div>
      </aside>

      {/* --- RIGHT: SCROLLY CONTENT --- */}
      <main className="lg:col-span-8">
        {/* We clone the children (the MDX content) to inject the 'onVisible' prop 
           Wait... MDX is static. We need to wrap the MDX sections manually.
        */}
        {/* Actually, to make this easier for you:
            We will render the 'TrackTrigger' inside the MDX, 
            but we need to pass the 'setCurrentTrackIndex' down to them.
            
            The cleanest way in Astro + React hybrid is to pass a function 
            to the children if they are React components, 
            BUT since MDX renders as static HTML mostly, 
            we will use a Render Prop pattern for the content area.
         */}

        {/* Simple solution: Render children, but use a Context or a mapped wrapper */}
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              onVisible: setCurrentTrackIndex,
            });
          }
          return child;
        })}
      </main>
    </div>
  );
}
