import { useEffect, useState, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Gallery({ photos }: { photos: string[] }) {
  const [active, setActive] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  // Wrapped in useCallback to safely use inside useEffect
  const next = useCallback(
    () => setActive((prev) => (prev + 1) % photos.length),
    [photos.length]
  );
  const prev = useCallback(
    () => setActive((prev) => (prev - 1 + photos.length) % photos.length),
    [photos.length]
  );

  const nextLightbox = useCallback(
    () => setLightbox((v) => (v === null ? v : (v + 1) % photos.length)),
    [photos.length]
  );
  const prevLightbox = useCallback(
    () =>
      setLightbox((v) =>
        v === null ? v : (v - 1 + photos.length) % photos.length
      ),
    [photos.length]
  );

  // Robust Keyboard Navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight") lightbox !== null ? nextLightbox() : next();
      if (e.key === "ArrowLeft") lightbox !== null ? prevLightbox() : prev();
    };

    window.addEventListener("keydown", onKey);
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, next, prev, nextLightbox, prevLightbox]);

  // Swipe gesture for main carousel
  const handleDragEnd = (_e: any, { offset, velocity }: any) => {
    const swipePower = Math.abs(offset.x) * velocity.x;
    if (offset.x < -40 || swipePower < -100) next();
    else if (offset.x > 40 || swipePower > 100) prev();
  };

  return (
    <div className="relative w-full select-none py-12">
      {/* Premium Infinite Carousel Track */}
      <div
        className="relative flex h-[65vh] min-h-[500px] w-full items-center justify-center overflow-hidden"
        style={{ perspective: 1200 }}
      >
        {photos.map((src, i) => {
          let diff = i - active;
          if (diff > photos.length / 2) diff -= photos.length;
          if (diff < -photos.length / 2) diff += photos.length;

          const isActive = diff === 0;
          const isVisible = Math.abs(diff) <= 2;

          return (
            <motion.div
              key={src}
              drag={isActive ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              initial={false}
              animate={{
                x: `${diff * 85}%`,
                scale: isActive ? 1 : 0.75,
                opacity: isVisible ? (isActive ? 1 : 0.3) : 0,
                zIndex: 50 - Math.abs(diff),
                rotateY: diff * -12,
                z: Math.abs(diff) * -100,
              }}
              transition={{ duration: 0.8, ease: EASE }}
              className={
                "absolute aspect-[4/5] w-[75%] max-w-[380px] shrink-0 overflow-hidden rounded-[2rem] bg-stone-900 shadow-2xl sm:w-[45%]"
              }
            >
              {/* 1. Blurred Background Image */}
              <img
                src={src}
                alt=""
                className="absolute inset-0 h-full w-full scale-125 object-cover opacity-40 blur-xl saturate-50"
              />

              {/* 2. Wrapper perfectly constrained to the inner border area */}
              <div className="absolute inset-4 z-10 overflow-hidden rounded-[1.25rem]">
                <img
                  src={src}
                  alt={`Wedding memory ${i + 1}`}
                  loading={i < 5 ? "eager" : "lazy"}
                  className="h-full w-full object-contain drop-shadow-2xl transition-transform duration-[1500ms] ease-out hover:scale-[1.05]"
                />
              </div>

              {/* 3. Inner Border Overlay */}
              <div className="pointer-events-none absolute inset-4 z-20 rounded-[1.25rem] border border-white/20 mix-blend-overlay" />

              {/* 4. Inactive Dark Overlay */}
              <div
                className={`pointer-events-none absolute inset-0 z-30 bg-black/60 backdrop-blur-[2px] transition-all duration-700 ${
                  isActive ? "opacity-0" : "opacity-100"
                }`}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Elegant Controls */}
      <div className="mt-8 flex items-center justify-center gap-10">
        <button
          onClick={prev}
          aria-label="Previous photo"
          className="group flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-transparent text-gold backdrop-blur-md transition-all duration-500 hover:border-gold hover:bg-gold/10 active:scale-95"
        >
          <ChevronLeft className="h-5 w-5 transition-transform duration-500 group-hover:-translate-x-1" />
        </button>

        <div className="flex flex-col items-center">
          <p className="font-serif text-xl tracking-[0.2em] text-foreground">
            {String(active + 1).padStart(2, "0")}
            <span className="mx-3 font-light text-gold/40">|</span>
            {String(photos.length).padStart(2, "0")}
          </p>
        </div>

        <button
          onClick={next}
          aria-label="Next photo"
          className="group flex h-14 w-14 items-center justify-center rounded-full border border-gold/30 bg-transparent text-gold backdrop-blur-md transition-all duration-500 hover:border-gold hover:bg-gold/10 active:scale-95"
        >
          <ChevronRight className="h-5 w-5 transition-transform duration-500 group-hover:translate-x-1" />
        </button>
      </div>

      {/* Infinite Circular Thumbnail Dial */}
      <div className="relative mt-12 flex h-24 w-full items-center justify-center overflow-hidden">
        {/* Fading edges to blend the track into the background */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-30 w-1/4 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-30 w-1/4 bg-gradient-to-l from-background to-transparent" />

        {photos.map((src, i) => {
          // Mathematics for infinite wrapping on the thumbnail track
          let diff = i - active;
          if (diff > photos.length / 2) diff -= photos.length;
          if (diff < -photos.length / 2) diff += photos.length;

          const isActive = diff === 0;
          const isVisible = Math.abs(diff) <= 5; // Render 5 thumbnails on each side

          return (
            <motion.button
              key={`thumb-${src}`}
              onClick={() => setActive(i)}
              aria-label={`Go to photo ${i + 1}`}
              initial={false}
              animate={{
                x: diff * 75, // Distance between circular thumbnails
                scale: isActive ? 1.3 : 0.9,
                opacity: isVisible ? (isActive ? 1 : 0.4) : 0,
                zIndex: 20 - Math.abs(diff),
              }}
              transition={{ duration: 0.6, ease: EASE }}
              style={{ pointerEvents: isVisible ? "auto" : "none" }}
              className={`absolute h-14 w-14 shrink-0 overflow-hidden rounded-full shadow-lg transition-shadow duration-300 ${
                isActive
                  ? "ring-2 ring-gold ring-offset-4 ring-offset-background shadow-gold/20"
                  : "hover:opacity-80"
              }`}
            >
              <img src={src} alt="" className="h-full w-full object-cover" />
            </motion.button>
          );
        })}
      </div>

      {/* Cinematic Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl"
            onClick={() => setLightbox(null)}
          >
            {/* Top Bar */}
            <div className="pointer-events-none absolute left-0 right-0 top-0 z-50 flex items-center justify-between bg-gradient-to-b from-black/60 to-transparent p-6">
              <p className="font-serif tracking-widest text-white/70">
                {String(lightbox + 1).padStart(2, "0")} /{" "}
                {String(photos.length).padStart(2, "0")}
              </p>
              <button
                onClick={() => setLightbox(null)}
                className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-white/70 backdrop-blur-md transition-all hover:bg-white/20 hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Lightbox Navigation Left */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevLightbox();
              }}
              className="absolute left-4 top-1/2 z-50 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/50 backdrop-blur-md transition-all hover:scale-110 hover:bg-black/80 hover:text-white md:left-12"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* Main Lightbox Image */}
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.6, ease: EASE }}
              src={photos[lightbox]}
              alt={`Wedding memory ${lightbox + 1}`}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[90vh] max-w-[90vw] object-contain drop-shadow-2xl"
            />

            {/* Lightbox Navigation Right */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextLightbox();
              }}
              className="absolute right-4 top-1/2 z-50 flex h-14 w-14 -translate-y-1/2 items-center justify-center rounded-full border border-white/10 bg-black/50 text-white/50 backdrop-blur-md transition-all hover:scale-110 hover:bg-black/80 hover:text-white md:right-12"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
