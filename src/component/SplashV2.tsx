import { motion, AnimatePresence } from "framer-motion";

const ease = [0.22, 1, 0.36, 1] as const;

function Sprig({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 60"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M100 52c-16 0-30-8-40-18M100 52c16 0 30-8 40-18"
        stroke="currentColor"
        strokeWidth="0.9"
        opacity="0.8"
      />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i} opacity={0.8 - i * 0.07}>
          <path
            d={`M${94 - i * 11} ${
              48 - i * 4.4
            }c-4-9-13-13-21-11 2 9 12 15 21 11Z`}
            fill="currentColor"
          />
          <path
            d={`M${106 + i * 11} ${
              48 - i * 4.4
            }c4-9 13-13 21-11-2 9-12 15-21 11Z`}
            fill="currentColor"
          />
        </g>
      ))}
      <circle cx="100" cy="50" r="2.6" fill="currentColor" opacity="0.85" />
      <path
        d="M100 46c2.4-3.2 2.4-7.2 0-10.4-2.4 3.2-2.4 7.2 0 10.4Z"
        fill="currentColor"
        opacity="0.75"
      />
    </svg>
  );
}

function FrameCorner({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M4 34V4h30"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.8"
      />
      <path
        d="M10 40V10h30"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.55"
      />
      <path
        d="M4 62c26 0 44-18 44-44"
        stroke="currentColor"
        strokeWidth="0.5"
        opacity="0.4"
      />
      <path
        d="M40 24c0-7 7-12 14-9-5 2-7 6-7 11 6-3 11 0 12 6-5-4-10-2-13 3-1-6-4-9-6-11Z"
        fill="currentColor"
        opacity="0.6"
      />
      <circle cx="52" cy="52" r="1.8" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

export function Splash({
  open,
  onOpen,
}: {
  open: boolean;
  onOpen: () => void;
}) {
  return (
    <AnimatePresence>
      {!open && (
        <motion.div
          key="splash"
          // Reduced outer padding slightly to maximize screen real estate on smaller laptops
          className="invite-stage invite-grain fixed inset-0 z-[60] flex items-center justify-center overflow-hidden px-4 py-4 sm:px-6 sm:py-6"
          exit={{ opacity: 0, transition: { duration: 0.9, ease } }}
        >
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ scale: 1.12, opacity: 0, filter: "blur(10px)", y: -20 }}
            transition={{ duration: 1.1, ease }}
            // 1. Changed overflow-y-auto to overflow-hidden so the borders never scroll
            className="invite-paper relative flex max-h-full w-full max-w-md flex-col items-center overflow-hidden rounded-[2rem] text-center sm:max-w-lg"
          >
            {/* Ornamental frame - Locked to the edges */}
            <span className="pointer-events-none absolute inset-3 z-10 rounded-[1.6rem] border border-champagne/60 sm:inset-4" />
            <span className="pointer-events-none absolute inset-[0.9rem] z-10 rounded-[1.35rem] border border-champagne/30 sm:inset-[1.15rem]" />
            <FrameCorner className="pointer-events-none absolute top-4 left-4 z-10 h-12 w-12 text-champagne-deep/70 sm:h-16 sm:w-16" />
            <FrameCorner className="pointer-events-none absolute top-4 right-4 z-10 h-12 w-12 scale-x-[-1] text-champagne-deep/70 sm:h-16 sm:w-16" />
            <FrameCorner className="pointer-events-none absolute bottom-4 left-4 z-10 h-12 w-12 scale-y-[-1] text-champagne-deep/70 sm:h-16 sm:w-16" />
            <FrameCorner className="pointer-events-none absolute right-4 bottom-4 z-10 h-12 w-12 scale-[-1] text-champagne-deep/70 sm:h-16 sm:w-16" />

            {/* 
              2. Inner Content Wrapper: Handles the scrolling but visually hides the scrollbar.
              3. Tightened padding (py-8 sm:py-10) so it easily clears a 13-inch laptop height.
            */}
            <div className="relative z-20 flex w-full flex-col items-center overflow-y-auto px-6 py-8 [container-type:inline-size] sm:px-12 sm:py-10 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
              <Sprig className="h-8 w-36 rotate-180 text-champagne-deep/80 sm:h-10 sm:w-44" />

              <p className="mt-4 font-body text-[0.6rem] tracking-luxe text-ink-soft uppercase sm:mt-5 sm:text-[0.68rem]">
                Bismillahir Rahmanir Raheem
              </p>

              <p className="mt-4 font-display text-base text-ink-soft italic sm:mt-5 sm:text-lg">
                Together with their families
              </p>

              <h1 className="mt-2 w-full min-w-0 text-center whitespace-nowrap overflow-visible font-script leading-[1.15] text-champagne-gradient text-[clamp(1.1rem,8.5cqw,3.75rem)] sm:mt-3">
                <span className="inline-block">Zeeshan</span>

                <span className="mx-1.5 font-display text-[0.65em] not-italic sm:mx-3">
                  &amp;
                </span>

                <span className="inline-block">Sanobar</span>
              </h1>

              <p className="mt-2 font-body text-[0.6rem] tracking-luxe text-ink-soft uppercase sm:mt-3 sm:text-[0.65rem]">
                request the pleasure of your company
              </p>

              <div className="mt-5 flex w-full items-center justify-center gap-3 sm:mt-6">
                <span className="champagne-rule w-full max-w-[5rem]" />
                <span className="font-body text-[0.55rem] tracking-luxe text-champagne-deep uppercase">
                  Dawat-e-Walima
                </span>
                <span className="champagne-rule w-full max-w-[5rem]" />
              </div>

              <div className="mt-5 flex items-stretch justify-center gap-4 sm:mt-6 sm:gap-5">
                <div className="flex flex-col justify-center">
                  <p className="font-body text-[0.6rem] tracking-[0.22em] text-ink-soft uppercase">
                    Saturday
                  </p>
                </div>
                <span className="w-px bg-champagne-deep/40" />
                <div>
                  <p className="font-display text-4xl leading-none text-ink sm:text-5xl">
                    14
                  </p>
                  <p className="mt-1 font-body text-[0.6rem] tracking-[0.22em] text-ink-soft uppercase">
                    November
                  </p>
                </div>
                <span className="w-px bg-champagne-deep/40" />
                <div className="flex flex-col justify-center">
                  <p className="font-body text-[0.6rem] tracking-[0.22em] text-ink-soft uppercase">
                    2026
                  </p>
                  <p className="font-body text-[0.6rem] tracking-[0.22em] text-ink-soft uppercase">
                    7:00 PM
                  </p>
                </div>
              </div>

              <div className="mt-5 sm:mt-6">
                <p className="font-display text-xl text-ink sm:text-2xl">
                  Blessings Banquet Hall
                </p>
                <p className="mt-1 font-body text-[0.62rem] tracking-[0.24em] text-ink-soft uppercase">
                  Doharra Mafi · Aligarh
                </p>
              </div>

              <Sprig className="mt-5 h-8 w-36 text-champagne-deep/80 sm:mt-6 sm:h-10 sm:w-44" />

              <motion.button
                type="button"
                onClick={onOpen}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                className="group mt-5 inline-flex items-center gap-3 rounded-full border border-champagne-deep/50 bg-paper px-8 py-3.5 font-body text-[0.62rem] tracking-luxe text-champagne-deep uppercase shadow-[0_14px_30px_-18px_oklch(0.36_0.021_72/60%)] transition-colors hover:bg-paper-deep sm:mt-6"
              >
                <motion.span
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 2.6, repeat: Infinity }}
                >
                  Tap to Open
                </motion.span>
                <svg
                  viewBox="0 0 24 16"
                  fill="none"
                  aria-hidden="true"
                  className="h-3.5 w-5 text-champagne-deep transition-transform duration-300 group-hover:-translate-y-0.5"
                >
                  <path
                    d="M1 15V5l11-4 11 4v10H1Z"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path
                    d="M1 5l11 7 11-7"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                </svg>
              </motion.button>

              <p className="mt-3 font-body text-[0.55rem] tracking-[0.2em] text-ink-soft/80 uppercase sm:mt-4">
                Open for full invitation · music will play
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
