import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1] as const;

export function Gallery({ photos }: { photos: string[] }) {
  // 1. Set default to 10th image (index 9). Fallback to 0 if less than 10 images exist.
  const [active, setActive] = useState(photos.length > 9 ? 9 : 0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const thumbTrackRef = useRef<HTMLDivElement>(null);

  // Infinite Scroll Logic: Wrap around the array securely
  const next = () => setActive((prev) => (prev + 1) % photos.length);
  const prev = () =>
    setActive((prev) => (prev - 1 + photos.length) % photos.length);

  // Auto-scroll thumbnails so the active one is always centered
  useEffect(() => {
    const track = thumbTrackRef.current;
    if (!track) return;
    const child = track.children[active] as HTMLElement;
    if (child) {
      track.scrollTo({
        left: child.offsetLeft - track.clientWidth / 2 + child.clientWidth / 2,
        behavior: "smooth",
      });
    }
  }, [active]);

  // Keyboard navigation for both Gallery and Lightbox
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
      if (e.key === "ArrowRight")
        lightbox !== null
          ? setLightbox((v) => (v === null ? v : (v + 1) % photos.length))
          : next();
      if (e.key === "ArrowLeft")
        lightbox !== null
          ? setLightbox((v) =>
              v === null ? v : (v - 1 + photos.length) % photos.length
            )
          : prev();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = lightbox !== null ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightbox, photos.length]);

  // Swipe gesture handling for the main carousel
  const handleDragEnd = (e: any, { offset, velocity }: any) => {
    const swipePower = Math.abs(offset.x) * velocity.x;
    if (offset.x < -40 || swipePower < -100) next();
    else if (offset.x > 40 || swipePower > 100) prev();
  };

  return (
    <div className="relative w-full select-none">
      {/* Premium Infinite Carousel Track */}
      <div className="relative flex h-[65vh] min-h-[450px] w-full items-center justify-center overflow-hidden py-8">
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-gold/5 to-transparent opacity-50 pointer-events-none" />

        {photos.map((src, i) => {
          // Mathematics for true infinite wrapping (Coverflow effect)
          let diff = i - active;
          if (diff > photos.length / 2) diff -= photos.length;
          if (diff < -photos.length / 2) diff += photos.length;

          const isActive = diff === 0;
          const isVisible = Math.abs(diff) <= 2; // Only render nearby images for performance

          return (
            <motion.div
              key={src}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={handleDragEnd}
              onClick={() => isActive && setLightbox(i)}
              initial={false}
              animate={{
                x: `${diff * 110}%`,
                scale: isActive ? 1 : 0.82,
                opacity: isVisible ? (isActive ? 1 : 0.4) : 0,
                zIndex: 50 - Math.abs(diff),
                rotateY: diff * -10, // Slight 3D tilt
              }}
              transition={{ duration: 0.7, ease: EASE }}
              className={`absolute aspect-[3/4] w-[70%] max-w-[320px] shrink-0 overflow-hidden rounded-3xl border border-gold/30 sm:w-[45%] ${
                isActive
                  ? "cursor-zoom-in shadow-2xl shadow-gold/20"
                  : "cursor-grab"
              }`}
              style={{ perspective: 1000 }}
            >
              <img
                src={src}
                alt={`Wedding memory ${i + 1}`}
                loading={i < 5 ? "eager" : "lazy"}
                className="h-full w-full object-cover transition-transform duration-[1200ms] ease-out hover:scale-105"
              />
              <span className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-gold/25" />
              <div
                className={`pointer-events-none absolute inset-0 bg-black/40 transition-opacity duration-700 ${
                  isActive ? "opacity-0" : "opacity-100"
                }`}
              />
            </motion.div>
          );
        })}
      </div>

      {/* Elegant Controls */}
      <div className="mt-2 flex items-center justify-center gap-8">
        <button
          onClick={prev}
          aria-label="Previous photo"
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold backdrop-blur-md transition-all duration-300 hover:bg-gold hover:text-white active:scale-90"
        >
          <ChevronLeft className="h-6 w-6 transition-transform group-hover:-translate-x-1" />
        </button>

        <div className="flex flex-col items-center">
          <p className="font-serif text-lg tracking-widest text-foreground">
            {String(active + 1).padStart(2, "0")}
            <span className="mx-2 text-gold/50">/</span>
            {String(photos.length).padStart(2, "0")}
          </p>
        </div>

        <button
          onClick={next}
          aria-label="Next photo"
          className="group flex h-12 w-12 items-center justify-center rounded-full border border-gold/40 text-gold backdrop-blur-md transition-all duration-300 hover:bg-gold hover:text-white active:scale-90"
        >
          <ChevronRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
        </button>
      </div>

      {/* Auto-scrolling Thumbnails */}
      <div
        ref={thumbTrackRef}
        className="no-scrollbar mt-8 flex justify-start gap-3 overflow-x-auto px-[50%] pb-4 sm:px-[50%]"
      >
        {photos.map((src, i) => (
          <button
            key={`thumb-${src}`}
            onClick={() => setActive(i)}
            aria-label={`Go to photo ${i + 1}`}
            className={`relative h-14 w-14 shrink-0 overflow-hidden rounded-xl transition-all duration-500 ${
              i === active
                ? "scale-110 border-2 border-gold shadow-lg shadow-gold/20"
                : "border border-gold/20 opacity-50 hover:opacity-100"
            }`}
          >
            <img src={src} alt="" className="h-full w-full object-cover" />
            {i === active && (
              <motion.div
                layoutId="active-thumb"
                className="absolute inset-0 bg-gold/10"
              />
            )}
          </button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4"
            onClick={() => setLightbox(null)}
          >
            <button
              onClick={() => setLightbox(null)}
              className="absolute top-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white backdrop-blur-md transition-colors hover:bg-gold"
            >
              <X className="h-6 w-6" />
            </button>
            <motion.img
              key={lightbox}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.5, ease: EASE }}
              src={photos[lightbox]}
              alt={`Wedding memory ${lightbox + 1}`}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[85vh] max-w-[95vw] rounded-2xl border border-white/10 object-contain shadow-2xl"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
